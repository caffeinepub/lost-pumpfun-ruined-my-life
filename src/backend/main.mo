import Map "mo:core/Map";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
    xHandle : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  type StoryData = {
    timestamp : Int;
    xHandle : Text;
    story : Text;
  };

  type StorySubmission = {
    xHandle : Text;
    story : Text;
  };

  var nextStoryId = 0;

  let stories = Map.empty<Nat, StoryData>();

  public shared ({ caller }) func submitStory(storySubmission : StorySubmission) : async Nat {
    let id = nextStoryId;
    let story = {
      storySubmission with
      timestamp = Time.now();
    };

    stories.add(id, story);
    nextStoryId += 1;
    id;
  };

  public query ({ caller }) func getAllStories() : async [StoryData] {
    let storiesArray = stories.values().toArray();
    storiesArray.sort(
      func(story1 : StoryData, story2 : StoryData) : Order.Order {
        Int.compare(story2.timestamp, story1.timestamp);
      },
    );
  };

  public query ({ caller }) func findStoriesByXHandle(handle : Text) : async [StoryData] {
    let filtered = stories.values().toArray().filter(
      func(story : StoryData) : Bool {
        Text.equal(story.xHandle, handle);
      },
    );
    filtered.sort(
      func(story1 : StoryData, story2 : StoryData) : Order.Order {
        Int.compare(story2.timestamp, story1.timestamp);
      },
    );
  };

  public shared ({ caller }) func deleteStory(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete stories");
    };

    if (not (stories.containsKey(id))) {
      Runtime.trap("Story not found");
    };
    stories.remove(id);
  };
};

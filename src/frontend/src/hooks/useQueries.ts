import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { StoryData, StorySubmission } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllStories() {
  const { actor, isFetching } = useActor();
  return useQuery<StoryData[]>({
    queryKey: ["stories"],
    queryFn: async () => {
      if (!actor) return [];
      const stories = await actor.getAllStories();
      return [...stories].sort(
        (a, b) => Number(b.timestamp) - Number(a.timestamp),
      );
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitStory() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (submission: StorySubmission) => {
      if (!actor) throw new Error("No actor");
      return actor.submitStory(submission);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
  });
}

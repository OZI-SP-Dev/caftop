import { useMutation, useQueryClient } from "@tanstack/react-query";
import { spWebContext } from "@api/SPWebContext";
import { deleteCAFTOP } from "@api/CAFTOP//SampleData";

export const useDeleteCAFTOP = () => {
  const queryClient = useQueryClient();
  const updateFunc = async (id: number) => {
    if (!import.meta.env.DEV) {
      return spWebContext.web.lists
        .getByTitle("caftops")
        .items.getById(id)
        .recycle();
    } else {
      return new Promise((resolve: (value: string) => void) => {
        setTimeout(() => {
          const result = deleteCAFTOP(id);
          resolve(result);
        }, 1000);
      });
    }
  };

  return useMutation([`caftop-delete`], updateFunc, {
    onSuccess: () => {
      void queryClient.invalidateQueries(["fp-paged-requests"]);
      void queryClient.invalidateQueries(["paged-requests"]);
    },
  });
};

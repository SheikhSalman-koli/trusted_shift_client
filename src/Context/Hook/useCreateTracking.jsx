// src/hooks/useCreateTracking.js
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Swal from "sweetalert2";
import UseAxiosSecure from "./UseAxiosSecure";

const useCreateTracking = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  const { mutate: createTracking, isPending } = useMutation({
    
    mutationKey: ["create-tracking"],
    mutationFn: async (trackingData) => {
      const res = await axiosSecure.post("/tracking", trackingData);
      return res.data;
    },
    onSuccess: (data, variables) => {
      Swal.fire(" Success", "Tracking updated successfully", "success");

      // Invalidate timeline of this parcel
      queryClient.invalidateQueries({
        queryKey: ["tracking", variables.parcelId],
      });

      // Optionally refetch parcel list
      queryClient.invalidateQueries({ queryKey: ["parcels"] });
    },
    onError: (err) => {
      Swal.fire(" Error", err.message || "Failed to create tracking", "error");
    },
  });

  return { createTracking, isPending };
};

export default useCreateTracking;

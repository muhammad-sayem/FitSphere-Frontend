import { httpClient } from "@/lib/axios/httpClient";

export const trainerServices = {
  getAllTrainers: async () => {
    try {
      const trainers = await httpClient.get("/trainer-profiles");
      return trainers;
    }

    catch (error) {
      console.error("Error fetching trainers:", error);
      return {
        data: null,
        error: { message: "Failed to fetch trainers" }
      };
    }
  }
}
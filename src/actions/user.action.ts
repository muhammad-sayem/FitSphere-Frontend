"use server";

import { userServices } from "@/services/user.services";

export const getLoggedInUser = async () => {
  const result = await userServices.getLoggedInUser();
  return result;
}
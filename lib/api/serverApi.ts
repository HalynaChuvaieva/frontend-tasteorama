import { nextServer } from "./api";
import { cookies } from "next/headers";
import { User } from "@/types/user";


export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/users/current", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

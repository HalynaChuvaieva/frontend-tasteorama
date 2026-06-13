import { NewNoteContent, Note } from "@/types/note";
import { nextServer } from "./api";
import { cookies } from "next/headers";
import { FetchNotesResponse } from "./clientApi";
import { User } from "@/types/user";

export async function fetchNoteById(id: string) {
  const cookieStore = cookies();
  const cookieString = cookieStore.toString();

  const res = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieString,
    },
  });

  return res.data;
}

export async function fetchNotes(query: string, page: number, tag?: string) {
  const params = { search: query, page, perPage: 12, tag: tag };
  const { data } = await nextServer.get<FetchNotesResponse>("/notes", {
    params,
  });
  return data;
}

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
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

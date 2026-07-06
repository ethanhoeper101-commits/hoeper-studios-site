"use server";

import { revalidatePath } from "next/cache";
import { isAuthed } from "@/lib/portal-auth";
import { setLeadRead, deleteLead } from "@/lib/redis";

async function requireAuth() {
  if (!isAuthed()) {
    throw new Error("Unauthorized");
  }
}

export async function markLeadReadAction(id: string, read: boolean) {
  await requireAuth();
  await setLeadRead(id, read);
  revalidatePath("/portal");
}

export async function deleteLeadAction(id: string) {
  await requireAuth();
  await deleteLead(id);
  revalidatePath("/portal");
}

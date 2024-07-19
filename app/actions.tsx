'use server'; // Note: must have for revalidatePath(); to work

import { config } from '@/config';
import { revalidatePath } from "next/cache";
import PocketBase from "pocketbase";

const db = new PocketBase(config.pocketbaseAPIBaseUrl);

async function addNote(data: any) {
  await db.collection("notes").create(data);
  revalidatePath("/notes");
}

export { addNote };
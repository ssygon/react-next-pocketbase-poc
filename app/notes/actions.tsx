'use server'; // Note: must have for revalidatePath(); to work

import { config } from '@/config';
import { revalidatePath } from "next/cache";
import PocketBase from "pocketbase";

const db = new PocketBase(config.pocketbaseAPIBaseUrl);

// Checks if the PocketBase server is running
const checkPocketbaseServerisOnline = async () => {
  try {
    await db.health.check();
    console.error('PocketBase server running');
    return true;
  } catch (error) {
    console.error('PocketBase server is not running:', error);
    return false;
  }
};

// Get Notes
const getNotes = async () => {
  try {
    const data = await db.collection('notes').getList(1, 30, { cache: 'no-store' });
    console.log(data);
    return data?.items || [];
  } catch (error) {
    console.error('Error fetching notes:', error);
    return [];
  }
};

// Create a new note
const addNote = async (data: any) => {
  try {
    await db.collection("notes").create(data);
    revalidatePath("/notes");
  }
  catch (error) {
    console.error('Error creating notes', error);
  }
};

export { checkPocketbaseServerisOnline, getNotes, addNote };

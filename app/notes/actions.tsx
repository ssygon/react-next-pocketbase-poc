'use server'; // Note: must have for revalidatePath(); to work

import { config } from '@/config';
import { revalidatePath } from "next/cache";
import PocketBase from "pocketbase";

const db = new PocketBase(config.pocketbaseAPIBaseUrl);

// Checks if the PocketBase server is running
const checkPocketbaseServerisOnline = async () => {
  let status = false;

  try {
    // There is currently an issue with pocketbase db status check() method always returning true when server has not started!
    // const response = await db.health.check();
    // console.log(response);
    // if (response.code === 200) {
    //   console.log('PocketBase server is running');
    //   return true;
    // }

    // http://127.0.0.1:8090/api/health
    const response = await fetch(`${config.pocketbaseAPIBaseUrl}/api/health`, { cache: 'no-store' });
    const data = await response.json();
    
    if (data.code === 200) {
      console.log('PocketBase server is running');
      return true;
    } else {
      console.error('PocketBase server returned an error:', data.message);
      return false;
    }
  } catch (error) {
    console.error('PocketBase server returned an error:', error);
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

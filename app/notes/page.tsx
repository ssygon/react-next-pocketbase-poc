import { config } from '../../config';
import PocketBase from "pocketbase";
import Note from "../components/Note/Note";
import CreateNote from "../components/CreateNote/CreateNote";

const getNotes = async () => {
  try {
    // const res = await fetch(`{config.pocketbaseAPIBaseUrl}/api/collections/notes/records?page=1&perPage=30`, { cache: 'no-store' });  // no-store is important
    // const data = await res.json();
    const db = new PocketBase(config.pocketbaseAPIBaseUrl);
    const data = await db.collection('notes').getList(1, 30, { cache: 'no-store' });

    console.log(data);

    return data?.items || [];
  } catch (error) {
    console.error('Error fetching notes:', error);
    return [];
  }
}

const NotesPage = async () => {
  const notes = await getNotes();

  return(
    <>
      <h1>Notes Page</h1>
      {notes.length === 0 ? (
        <>
          <p>
            Please run in terminal: <code>$ ./pocketbase serve</code> to start the pocketbase db server.
          </p>
          <p>
            Then refresh page to see the list of notes.
          </p>
        </>
      ) : (
        <>
        <CreateNote />
        <div className="grid gap-x-4 gap-y-4 grid-cols-2 mt-4 sm:grid-cols-3 md:grid-cols-4">
          {notes.map((note) => (
              <Note key={note.id} id={note.id} title={note?.title} content={note?.content}/>
          ))}
        </div>
        </>
      )}
    </>
  );
}

export default NotesPage;
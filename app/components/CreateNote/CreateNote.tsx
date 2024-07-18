'use client';

import { config } from '../../../config';
import PocketBase from "pocketbase";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const router = useRouter();

  const create = async () => {
    try {
      const db = new PocketBase(config.pocketbaseAPIBaseUrl);

      const record = await db.collection('notes').create({
        title,
        content,
      });

      setContent('');
      setTitle('');

      closeDialog();

      router.push('/notes', {});
    } catch (error) {
      console.error('Error creating a note:', error);
    }
  }

  const closeDialog = () => {
    setDialogOpen(false);
  }

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
  }

  return (
    <>
      <button className="btn" onClick={toggleDialog}>Add a Note</button>
      {dialogOpen && (
        <div className="dialog">
          <form onSubmit={create}>
            <div className="flex flex-col px-4 py-3">
              <h3>Add a Note</h3>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="px-4 py-3 sm:flex sm:justify-end sm:px-6">
              <button className="btn" type="submit">
                Create note
              </button>
              <button className="btn-cancel mt-3 sm:ml-3 sm:mt-0" type="button" onClick={closeDialog}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default CreateNote;
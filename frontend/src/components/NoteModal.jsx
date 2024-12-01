import React, { useEffect, useState } from 'react';

export const NoteModal = ({ closeModal, addNote, currentNote, editNote }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
    }
  }, [currentNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
    
      alert("Both title and description are required.");
      return;
    }
    
    if (currentNote) {
      editNote(currentNote._id, title, description);
    } else {
      addNote(title, description);
    }


    closeModal();
  };

  const handleClose = () => {

    setTitle('');
    setDescription('');
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div
        className="bg-white p-8 rounded-lg border-2 border-gray-400 bg-opacity-80"
       
      >
        <h2 className="text-xl font-bold mb-4 text-black">
          {currentNote ? "Edit Note" : "Add New Note"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="border p-2 w-full mb-4 rounded text-black"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Note Description"
            className="border p-2 w-full mb-4 rounded text-black"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-black p-2 w-full rounded"
          >
            {currentNote ? "Update Note" : "Add Note"}
          </button>
        </form>
        <button
          type="button"

          className="mt-4 text-red-500"
          onClick={handleClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NoteModal;

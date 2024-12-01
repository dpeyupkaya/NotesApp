import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const NoteCard = ({ note, onEdit, deleteNote }) => {
  return (
    <div className="bg-white bg-opacity-60 p-4 rounded-lg shadow-md border border-gray-300 hover:bg-opacity-80 transition duration-300">
      <h2 className="text-xl font-bold text-gray-800">{note.title}</h2>
      <p className="text-gray-700">{note.description}</p>
      <div className="flex justify-end mt-2">
        <button
          className="text-blue-500 hover:text-blue-700 hover:scale-105 transition duration-200 mr-2"
          onClick={() => onEdit(note)}
        >
          <FaEdit />
        </button>
        <button
          className="text-red-500 hover:text-red-700 hover:scale-105 transition duration-200"
          onClick={() => deleteNote(note._id)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;

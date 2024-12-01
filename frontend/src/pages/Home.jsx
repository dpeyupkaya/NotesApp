import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { NoteModal } from '../components/NoteModal';
import NoteCard from '../components/NoteCard';
import axios from 'axios';
import { toast } from 'react-toastify';
import notesAppImage from '../images/notes_app.jpg'



export const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [filteredNotes, setFilteredNote] = useState(false);
  const [notes , setNotes]=  useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [query , setQuery] = useState('')

  useEffect(() => {
    
    fetchNotes()

  },[])  
  useEffect(() => {
    setFilteredNote(
      notes.filter((note) => {
       
        const titleMatch = note.title && note.title.toLowerCase().includes(query.toLowerCase());
        const descriptionMatch = note.description && note.description.toLowerCase().includes(query.toLowerCase());
  
        return titleMatch || descriptionMatch;
      })
    );
  }, [query, notes]);
  
  

const fetchNotes =async() => {
  try{
    const {data} = await  axios.get("http://localhost:5000/api/note",{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
    setNotes(data.notes)
  }
  catch{
    console.log(error)

  }
}



  const closeModalOpen = () => {
    setModalOpen(false);
  };

  const onAddNewNote = () => {
    setCurrentNote(null); // Yeni bir not eklemek için currentNote'u sıfırla
    setModalOpen(true);
  };
  const onEdit = (note) => {
    setCurrentNote(note)
    setModalOpen(true)
  }

  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/note/add',
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.data.success) {
        fetchNotes();
     
        closeModalOpen();
      }
    } catch (error) {
      if (error.response) {
      
        console.log('Response Data:', error.response.data);
        console.log('Response Status:', error.response.status);
        console.log('Response Headers:', error.response.headers);
      } else if (error.request) {
     
        console.log('Request:', error.request);
      } else {
        
        console.log('Error Message:', error.message);
      }
    }
  };
const deleteNote = async (id) => {
  try {
    const response = await axios.delete(
     ` http://localhost:5000/api/note/${id}`,
      
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    if (response.data.success) {
      toast.success("note deleted")
      fetchNotes();
   
    }
  } catch (error) {
    if (error.response) {
    
      console.log('Response Data:', error.response.data);
      console.log('Response Status:', error.response.status);
      console.log('Response Headers:', error.response.headers);
    } else if (error.request) {
     
      console.log('Request:', error.request);
    } else {
      
      console.log('Error Message:', error.message);
    }
  }
}
const editNote = async(id, title, description)=>{
  try {
    const response = await axios.put(
     ` http://localhost:5000/api/note/${id}`,
      { title, description },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    if (response.data.success) {
      fetchNotes();
      closeModalOpen();
    }
  } catch (error) {
    if (error.response) {
    
      console.log('Response Data:', error.response.data);
      console.log('Response Status:', error.response.status);
      console.log('Response Headers:', error.response.headers);
    } else if (error.request) {
      
      console.log('Request:', error.request);
    } else {
    
      console.log('Error Message:', error.message);
    }
  }
}

  return (
    <div
    className="min-h-screen bg-cover bg-center"
    style={{ backgroundImage: `url(${notesAppImage})` }}  
  >
      <Navbar setQuery={setQuery}/>
    <div className='px-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-6'>
    { filteredNotes.length > 0 ?  filteredNotes.map(note => (
      <NoteCard
      note={note}
      deleteNote={deleteNote}
      onEdit={onEdit}
      />
    )) : <p>No Notes </p>
  }

    </div>
<button
  onClick={onAddNewNote} 
  className="fixed right-4 bottom-4 text-2xl bg-teal-500 text-white font-bold p-4 rounded-full animate-move-left-right shadow-glow-blue hover:shadow-none"
>
  <i className="fas fa-pen"></i>
</button>








      {isModalOpen && (
        <NoteModal
          closeModal={closeModalOpen}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}
        />
      )}
    </div>
  );
};

export default Home;

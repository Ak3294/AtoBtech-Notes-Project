import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import NoteCard from '../components/NoteCard';
import { getNotes } from '../api/notes';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, [searchTerm, selectedSubject]);

  const loadNotes = async () => {
    try {
      const data = await getNotes(searchTerm, selectedSubject);
      setNotes(data);
    } catch (error) {
      console.error('Error loading notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const subjects = ['all', ...new Set(notes.map(note => note.subject))];

  return (
    <>
      {/* Hero Section */}
      <div className="bg-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">
            Quality Study Notes for Better Learning
          </h1>
          <p className="mt-4 text-xl text-center text-indigo-100">
            Access comprehensive study materials from top students and educators
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-xl">
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject.charAt(0).toUpperCase() + subject.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-16">
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.length > 0 ? (
              notes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                No notes found matching your search criteria
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default NotesPage;

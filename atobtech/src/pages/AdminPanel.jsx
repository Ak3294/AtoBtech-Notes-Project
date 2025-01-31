import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";
import { createNote, getNotes, deleteNote, updateNote } from "../api/notes";

const AdminPanel = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    pdfUrl: "",
    thumbnail: "",
  });

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (error) {
      console.error("Error loading notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateNote(editingId, formData);
      } else {
        await createNote(formData);
      }
      setFormData({
        title: "",
        description: "",
        subject: "",
        pdfUrl: "",
        thumbnail: "",
      });
      setEditingId(null);
      loadNotes();
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleEdit = (note) => {
    setEditingId(note.id);
    setFormData({
      title: note.title,
      description: note.description,
      subject: note.subject,
      pdfUrl: note.pdfUrl,
      thumbnail: note.thumbnail,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await deleteNote(id);
        loadNotes();
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Form Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {editingId ? "Edit Note" : "Add New Note"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Subject</label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">PDF URL</label>
            <input
              type="url"
              value={formData.pdfUrl}
              onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Thumbnail URL</label>
            <input
              type="url"
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              {editingId ? <Save size={18} /> : <Plus size={18} />}
              {editingId ? "Update Note" : "Add Note"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    title: "",
                    description: "",
                    subject: "",
                    pdfUrl: "",
                    thumbnail: "",
                  });
                }}
                className="flex items-center gap-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
              >
                <X size={18} />
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Notes List */}
      <div className="bg-white shadow-lg rounded-lg">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Manage Notes</h3>
        </div>
        <div>
          {loading ? (
            <p className="text-center py-4">Loading...</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {notes.map((note) => (
                <li key={note.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-indigo-600">{note.title}</h4>
                    <p className="text-sm text-gray-500">{note.subject}</p>
                    <p className="text-sm text-gray-900 truncate">{note.description}</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(note)}
                      className="p-2 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition"
                    >
                      <Pencil size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

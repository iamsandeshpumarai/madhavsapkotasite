import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, Save, Calendar, MapPin, Link as LinkIcon, Info, LayoutDashboard } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getAllEvents, updateEvent, createEvent, deleteEvent } from '../../../utils/function.js';

const EventsAdmin = () => {
  const queryClient = useQueryClient();

  // 1. Fetch Data
  const { data: serverEvents, isLoading } = useQuery({
    queryKey: ['eventsdata'],
    queryFn: getAllEvents
  });

  // 2. Local State for UI
  const [events, setEvents] = useState([]);
  const [activeModal, setActiveModal] = useState(false);
  const [editId, setEditId] = useState(null);

  // Form State
  const [form, setForm] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    category: 'Legislative',
    status: 'Recent',
    link: ''
  });

  // Sync server data to local state
  useEffect(() => {
    if (serverEvents) {
      setEvents(serverEvents);
    }
  }, [serverEvents]);

  // 3. Mutations
  const mutation = useMutation({
    mutationFn: (payload) => {
        // Logic: If editId exists, update; else create
        return editId 
            ? updateEvent(editId, payload) 
            : createEvent(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['eventsdata']);
      setActiveModal(false);
      resetForm();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => queryClient.invalidateQueries(['eventsdata'])
  });

  // 4. Handlers
  const resetForm = () => {
    setForm({ title: '', date: '', location: '', description: '', category: 'Legislative', status: 'Recent', link: '' });
    setEditId(null);
  };

  const handleEdit = (event) => {
    setEditId(event._id || event.id);
    setForm(event);
    setActiveModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  if (isLoading) return <div className="p-10 text-center font-bold">Loading Events...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
            <Calendar className="text-indigo-600" /> Event Management
          </h1>
          <p className="text-slate-500">Manage legislative, political, and climate events</p>
        </div>
        <button 
          onClick={() => { resetForm(); setActiveModal(true); }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg transition-all"
        >
          <Plus size={20} /> Add New Event
        </button>
      </header>

      <main className="max-w-6xl mx-auto grid gap-4">
        {events.map((event) => (
          <div key={event._id || event.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group hover:border-indigo-200 transition-all">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase">{event.category}</span>
                <span className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded uppercase">{event.status}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800">{event.title}</h3>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-400">
                <span className="flex items-center gap-1"><Calendar size={14}/> {event.date}</span>
                <span className="flex items-center gap-1"><MapPin size={14}/> {event.location}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button onClick={() => handleEdit(event)} className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                <Edit2 size={18} />
              </button>
              <button 
                onClick={() => { if(confirm('Delete event?')) deleteMutation.mutate(event._id || event.id) }} 
                className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* MODAL */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-slate-800">{editId ? 'Edit Event' : 'Create New Event'}</h2>
              <button onClick={() => setActiveModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase ml-2">Event Title</label>
                <input required className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 ring-indigo-500 transition-all" 
                  value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-2">Date</label>
                  <input placeholder="e.g. June 6, 2025" required className="w-full bg-slate-50 border-none p-4 rounded-2xl" 
                    value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-2">Location</label>
                  <input required className="w-full bg-slate-50 border-none p-4 rounded-2xl" 
                    value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-2">Category</label>
                  <select className="w-full bg-slate-50 border-none p-4 rounded-2xl" 
                    value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                    <option>Legislative</option>
                    <option>Economy</option>
                    <option>Climate</option>
                    <option>Political</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-2">Status</label>
                  <select className="w-full bg-slate-50 border-none p-4 rounded-2xl" 
                    value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                    <option>Past</option>
                    <option>Recent</option>
                    <option>International</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase ml-2">Reference Link (URL)</label>
                <input type="url" className="w-full bg-slate-50 border-none p-4 rounded-2xl" 
                  value={form.link} onChange={e => setForm({...form, link: e.target.value})} />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase ml-2">Description</label>
                <textarea rows="4" className="w-full bg-slate-50 border-none p-4 rounded-2xl" 
                  value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
              </div>

              <button 
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-indigo-600 text-white py-5 rounded-3xl font-bold text-lg shadow-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
              >
                <Save size={22}/> {mutation.isPending ? 'Processing...' : 'Save Event Details'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsAdmin;
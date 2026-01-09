import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, Save, Newspaper, Link as LinkIcon, Tag, ExternalLink } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllNews, updateNews, createNews, deleteNews } from '../../../utils/function.js';
import Loading from '../Loading.jsx';

const AdminNews = () => {
  const queryClient = useQueryClient();

  // Fetch Data
  const { data: serverNews, isLoading } = useQuery({
    queryKey: ['newsdata'],
    queryFn: getAllNews
  });

  const [news, setNews] = useState([]);
  const [activeModal, setActiveModal] = useState(false);
  const [editId, setEditId] = useState(null);

  // Form State
  const [form, setForm] = useState({
    title: '', date: '', summary: '', tag: 'Governance', type: 'Article', link: ''
  });

  useEffect(() => {
    if (serverNews) setNews(serverNews);
  }, [serverNews]);

  // Mutations
  const mutation = useMutation({
    mutationFn: (payload) => editId ? updateNews(editId, payload) : createNews(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['newsdata']);
      setActiveModal(false);
      resetForm();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNews,
    onSuccess: () => queryClient.invalidateQueries(['newsdata'])
  });

  const resetForm = () => {
    setForm({ title: '', date: '', summary: '', tag: 'Governance', type: 'Article', link: '' });
    setEditId(null);
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setForm(item);
    setActiveModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  if (isLoading) return <Loading/>;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
            <Newspaper className="text-red-600" /> News Management
          </h1>
          <p className="text-slate-500">Manage articles, speeches, and media mentions</p>
        </div>
        <button onClick={() => { resetForm(); setActiveModal(true); }} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg transition-all">
          <Plus size={20} /> Add News Item
        </button>
      </header>

      <main className="max-w-6xl mx-auto space-y-4">
        {news.map((item) => (
          <div key={item._id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start gap-4 hover:border-red-200 transition-all">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black bg-red-50 text-red-600 px-2 py-0.5 rounded uppercase">{item.tag}</span>
                <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase">{item.type}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
              <p className="text-sm text-slate-400 mt-1">{item.date}</p>
            </div>
            
            <div className="flex gap-2">
              <a href={item.link} target="_blank" rel="noreferrer" className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-blue-600"><ExternalLink size={18}/></a>
              <button onClick={() => handleEdit(item)} className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-red-50 hover:text-red-600"><Edit2 size={18} /></button>
              <button onClick={() => confirm('Delete?') && deleteMutation.mutate(item._id)} className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-red-50 hover:text-red-600"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </main>

      {/* MODAL */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-black text-slate-800 mb-6">{editId ? 'Edit News' : 'Add News'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input placeholder="Title" required className="w-full bg-slate-50 border-none p-4 rounded-2xl" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Date (e.g., Aug 5, 2025)" className="w-full bg-slate-50 border-none p-4 rounded-2xl" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                <input placeholder="Tag (e.g., Governance)" className="w-full bg-slate-50 border-none p-4 rounded-2xl" value={form.tag} onChange={e => setForm({...form, tag: e.target.value})} />
              </div>
              <select className="w-full bg-slate-50 border-none p-4 rounded-2xl" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                <option>Article</option>
                <option>Video</option>
              </select>
              <input placeholder="URL Link" type="url" className="w-full bg-slate-50 border-none p-4 rounded-2xl" value={form.link} onChange={e => setForm({...form, link: e.target.value})} />
              <textarea placeholder="Summary" rows="3" className="w-full bg-slate-50 border-none p-4 rounded-2xl" value={form.summary} onChange={e => setForm({...form, summary: e.target.value})} />
              <button type="submit" className="w-full bg-red-600 text-white py-5 rounded-3xl font-bold shadow-lg flex items-center justify-center gap-2">
                <Save size={22}/> {mutation.isPending ? 'Saving...' : 'Save News Item'}
              </button>
              <button type="button" onClick={() => setActiveModal(false)} className="w-full text-slate-400 font-bold">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNews;
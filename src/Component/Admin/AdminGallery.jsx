import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, Edit2, X, Eye, Image as ImageIcon, Video, Save, Upload, Film } from 'lucide-react';
import { CreateGallery, deleteGalleryData, getGalleryData, updateGalleryData } from '../../../utils/function.js';
import Loading from '../Loading.jsx';

const AdminGallery = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const categories = ["Legislative", "Community", "Climate", "Political", "Events"];

  const [form, setForm] = useState({
    title: '',
    category: 'Political',
    description: '',
    coverPhoto: null,
    media: [] 
  });

  // 1. Updated Fetching Logic
  const { data: collections, isLoading, isError } = useQuery({
    queryKey: ['galleryData'],
    queryFn: async () => {
      const response = await getGalleryData();
      
      /** * DATA FLATTENING:
       * Your response is: [ {_id, galleryCollections: [...]}, {_id, galleryCollections: [...]} ]
       * We use .flatMap() to pull all items from all galleryCollections arrays into one single list.
       */
      console.log(response,"is the response")
      const allItems = response?.flatMap(doc => 
      doc.galleryCollections.map(item => ({
        ...item,
        parentDocId: doc._id // Carry the real MongoDB ID here
      }))
    ) || [];
    return allItems
    }
  });

  console.log(collections)
const deleteMutation = useMutation({
    mutationFn: deleteGalleryData,
    onSuccess: () => {
      queryClient.invalidateQueries(['galleryData']);
      alert("Deleted successfully");
    },
    onError: (err) => console.error("Delete failed", err)
  });

const mutation = useMutation({
  mutationFn: async (payload) => {
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('category', payload.category);
    formData.append('description', payload.description);
    
    if (payload.coverPhoto instanceof File) {
      formData.append('coverPhotoFile', payload.coverPhoto);
    } else {
      formData.append('coverPhotoUrl', payload.coverPhoto);
    }

    // FIXED: Properly handle both files and URLs
    payload.media.forEach((item) => {
      formData.append('mediaTypes', item.type);
      formData.append('mediaCaptions', item.caption);
      
      if (item.file instanceof File) {
        // New file uploaded
        formData.append('mediaSources', 'file');
        formData.append('mediaFiles', item.file);
      } else if (item.src) {
        // Existing URL (not changed)
        formData.append('mediaSources', 'url');
        formData.append('mediaUrls', item.src);
      }
    });

    if (editId) {
      return await updateGalleryData(editId, formData);
    } else {
      return await CreateGallery(formData);
    }
  },
  onSuccess: () => {
    queryClient.invalidateQueries(['galleryData']);
    setIsModalOpen(false);
    resetForm();
  }
});
  const resetForm = () => {
    setForm({ title: '', category: 'Political', description: '', coverPhoto: null, media: [] });
    setEditId(null);
  };
const handleEdit = (col) => {
  // Use parentDocId (the 24-char MongoDB ID) instead of col.id (the timestamp)
  setEditId(col.parentDocId); 
  
  setForm({
    title: col.title,
    category: col.category,
    description: col.description,
    coverPhoto: col.coverPhoto,
    media: col.media || []
  });
  setIsModalOpen(true);
};

  const handleFileSelect = (e, index = null) => {
    const file = e.target.files[0];
    if (!file) return;

    if (index === null) {
      setForm({ ...form, coverPhoto: file });
    } else {
      const updatedMedia = [...form.media];
      updatedMedia[index].file = file;
      updatedMedia[index].src = URL.createObjectURL(file); 
      setForm({ ...form, media: updatedMedia });
    }
  };

  const addMediaRow = () => {
    setForm({ ...form, media: [...form.media, { type: 'image', file: null, src: '', caption: '' }] });
  };

  if (isLoading) return <Loading/>
  if (isError) return <div className="p-10 text-center text-red-500">Error fetching data.</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Gallery Admin</h1>
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg hover:bg-indigo-700 transition-all active:scale-95"
        >
          <Plus size={20} /> New Collection
        </button>
      </header>

      {/* Grid Display */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections.map((col) => (
          <div key={col._id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 group hover:shadow-xl transition-all">
            <div className="h-56 relative overflow-hidden bg-slate-200">
              <img 
                src={col.coverPhoto instanceof File ? URL.createObjectURL(col.coverPhoto) : col.coverPhoto} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                alt={col.title}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button onClick={() => handleEdit(col)} className="p-3 bg-white rounded-full hover:bg-indigo-50 text-indigo-600 shadow-lg"><Edit2 size={20}/></button>
                <button
                onClick={()=>{
                  deleteMutation.mutate(col.parentDocId)
                }}
                className="p-3 bg-white text-red-500 rounded-full hover:bg-red-50 
                shadow-lg"><Trash2 size={20}/></button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{col.category}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">{col.media?.length || 0} Items</span>
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-2 truncate">{col.title}</h3>
              <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">{col.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-8 border-b flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-slate-900">{editId ? 'Edit Gallery' : 'Create New Gallery'}</h2>
                <p className="text-slate-400 text-sm">Fill in the details below to update your website gallery.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X/></button>
            </div>

            <form className="p-8 overflow-y-auto space-y-8" onSubmit={(e) => { e.preventDefault(); mutation.mutate(form); }}>
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 ml-1">Title</label>
                  <input required className="w-full bg-slate-50 p-4 rounded-2xl border-2 border-transparent focus:border-indigo-500 focus:bg-white outline-none transition-all" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 ml-1">Category</label>
                  <select className="w-full bg-slate-50 p-4 rounded-2xl border-2 border-transparent focus:border-indigo-500 focus:bg-white outline-none transition-all appearance-none" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Cover Photo */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase text-slate-400 ml-1">Cover Photo</label>
                <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                  <div className="w-32 h-32 bg-white rounded-2xl overflow-hidden shadow-inner flex-shrink-0 border">
                    {form.coverPhoto ? (
                      <img src={form.coverPhoto instanceof File ? URL.createObjectURL(form.coverPhoto) : form.coverPhoto} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300"><ImageIcon size={40}/></div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-500 font-medium">Upload a high-resolution cover image for the collection.</p>
                    <label className="inline-flex items-center gap-2 bg-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm border hover:bg-slate-50 cursor-pointer transition-all">
                      <Upload size={16}/> Choose File
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileSelect(e)} />
                    </label>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 ml-1">Description</label>
                <textarea rows="3" className="w-full bg-slate-50 p-4 rounded-2xl border-2 border-transparent focus:border-indigo-500 focus:bg-white outline-none transition-all" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
              </div>

              {/* Media Items */}
              <div className="space-y-6">
                <div className="flex justify-between items-center px-1">
                  <h3 className="font-black text-lg text-slate-900">Media Content</h3>
                  <button type="button" onClick={addMediaRow} className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-indigo-100 transition-colors">
                    + Add Image/Video
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {form.media?.map((m, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-[1.5rem] border-2 border-slate-100 flex flex-col md:flex-row gap-4 items-center">
                      <select className="p-3 rounded-xl bg-slate-50 border-none text-xs font-bold w-full md:w-32" value={m.type} onChange={e => {
                        const updated = [...form.media]; updated[idx].type = e.target.value; setForm({...form, media: updated});
                      }}>
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                      </select>

                      <div className="flex-1 flex flex-col md:flex-row items-center gap-4 w-full">
                         <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center overflow-hidden border">
                            {m.src ? (m.type === 'image' ? <img src={m.src} className="w-full h-full object-cover"/> : <Film size={20} className="text-indigo-400"/>) : <ImageIcon size={20} className="text-slate-300"/>}
                         </div>
                         <input type="file" className="text-xs flex-1" accept={m.type === 'image' ? 'image/*' : 'video/*'} onChange={(e) => handleFileSelect(e, idx)} />
                         <input placeholder="Enter caption..." className="bg-slate-50 p-3 rounded-xl text-xs flex-1 outline-none border-2 border-transparent focus:border-indigo-500 transition-all" value={m.caption} onChange={e => {
                           const updated = [...form.media]; updated[idx].caption = e.target.value; setForm({...form, media: updated});
                         }} />
                      </div>
                      
                      <button type="button" onClick={() => {
                         const updated = form.media.filter((_, i) => i !== idx); setForm({...form, media: updated});
                         alert("this is the data delte")
                      }} className="text-red-400 hover:text-red-500 hover:bg-red-50 p-3 rounded-xl transition-all"><Trash2 size={20}/></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 flex gap-4">
                <button 
                  type="submit" 
                  disabled={mutation.isPending}
                  className="flex-[2] bg-indigo-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all disabled:bg-indigo-300 flex items-center justify-center gap-2"
                >
                  {mutation.isPending ? 'Processing...' : <><Save size={20}/> Save Changes</>}
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
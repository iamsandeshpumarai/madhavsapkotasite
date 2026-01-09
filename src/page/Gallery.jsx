import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Layers } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getGalleryData } from "../../utils/function";
import Loading from "../Component/Loading";

const Gallery = () => {
  // 1. Fetch data from backend
  const { data: rawData, isLoading, isError } = useQuery({
    queryKey: ['galleryData'], // Added queryKey for caching
    queryFn: getGalleryData
  });

  // 2. Process/Flatten the data
  // This takes your nested structure and turns it into a single list of albums
  const galleryCollections = rawData?.flatMap(doc => 
    doc.galleryCollections.map(item => ({
      ...item,
      parentDocId: doc._id // Reference to the MongoDB document ID
    }))
  ) || [];

  const [filter, setFilter] = useState("All");
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [fullScreenMedia, setFullScreenMedia] = useState(null);

  const categories = ["All", "Legislative", "Community", "Climate", "Political", "Events"];

  // 3. Filter the dynamic data
  const filteredAlbums = filter === "All" 
    ? galleryCollections 
    : galleryCollections.filter(album => album.category === filter);

  // Handle Loading and Error states
  if (isLoading) return <Loading/>
  if (isError) return <div className="h-screen flex items-center justify-center text-red-500">Error loading images.</div>;

  return (
    <div className="bg-white min-h-screen py-24 px-6 md:px-12">
      {/* FILTER BAR */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
              filter === cat ? "bg-red-600 text-white shadow-lg shadow-red-200" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ALBUM GRID (Cover Photos from DB) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAlbums.map((album) => (
          <motion.div
            layout
            key={album.id} // Use the timestamp ID from your data
            onClick={() => setSelectedAlbum(album)}
            className="group cursor-pointer relative rounded-[3rem] overflow-hidden bg-slate-100 aspect-[4/5] shadow-sm hover:shadow-2xl transition-all"
          >
            <img src={album.coverPhoto} alt={album.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            
            <div className="absolute bottom-0 p-10 text-white">
              <span className="bg-red-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">{album.category}</span>
              <h3 className="text-3xl font-black mb-2">{album.title}</h3>
              <p className="text-slate-300 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{album.description}</p>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-400">
                <Layers size={16} /> View {album.media?.length || 0} items
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* SUB-GALLERY OVERLAY */}
      <AnimatePresence>
        {selectedAlbum && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white overflow-y-auto p-6 md:p-20"
          >
            <button onClick={() => setSelectedAlbum(null)} className="fixed top-10 right-10 z-50 bg-slate-900 text-white p-4 rounded-full hover:bg-red-600 transition-colors">
              <X size={24} />
            </button>

            <div className="max-w-7xl mx-auto">
              <div className="mb-12">
                <span className="text-red-600 font-black uppercase tracking-[0.3em] text-xs">{selectedAlbum.category} Collection</span>
                <h2 className="text-5xl font-black text-slate-900 mt-2">{selectedAlbum.title}</h2>
              </div>

              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {selectedAlbum.media?.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: idx * 0.1 }}
                    onClick={() => setFullScreenMedia(item)}
                    className="relative group rounded-3xl overflow-hidden cursor-zoom-in border border-slate-100"
                  >
                    {item.type === "image" ? (
                      <img src={item.src} alt="" className="w-full h-auto" />
                    ) : (
                      <div className="aspect-video bg-slate-900 flex items-center justify-center relative">
                        <img src={selectedAlbum.coverPhoto} className="absolute inset-0 w-full h-full object-cover opacity-40" alt="" />
                        <Play size={48} className="text-white relative z-10" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white font-bold text-xs uppercase tracking-widest">{item.caption}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL SCREEN LIGHTBOX */}
      <AnimatePresence>
        {fullScreenMedia && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[60] bg-black flex items-center justify-center p-4 md:p-10"
          >
            <button onClick={() => setFullScreenMedia(null)} className="absolute top-10 right-10 text-white hover:text-red-500">
              <X size={40} />
            </button>
            
            <div className="max-w-5xl w-full">
              {fullScreenMedia.type === "image" ? (
                <img src={fullScreenMedia.src} className="w-full h-auto max-h-[80vh] object-contain rounded-xl" alt="" />
              ) : (
                <iframe src={fullScreenMedia.src} className="w-full aspect-video rounded-xl shadow-2xl" allowFullScreen title="video" />
              )}
              <p className="text-white text-center mt-6 font-medium text-lg italic tracking-wide">"{fullScreenMedia.caption}"</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
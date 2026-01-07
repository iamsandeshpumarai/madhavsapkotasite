import React, { useState, useRef, useEffect } from "react";
import { Save, Upload, Trash2, Plus, Landmark, CheckCircle, User, Award, Loader2 } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAboutData, sendAboutData } from "../../../utils/function";
import toast from "react-hot-toast";

const AdminAbout = () => {
  const fileInputRef = useRef(null);
  
  // 1. Fetch Data
  const { data: aboutData, isLoading } = useQuery({
    queryKey: ['aboutdata'],
    queryFn: getAboutData
  });

  // 2. Mutation
  const mutation = useMutation({
    mutationFn: sendAboutData,
    onSuccess: () => toast.success("Profile updated successfully!")
  });

  // 3. Local State
  const [data, setData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // 4. Sync Query Data to Local State
  useEffect(() => {
    if (aboutData && aboutData.length > 0) {
      const fetched = aboutData[0]; // Extract first item from array
      setData({
        profile: fetched.profile,
        politicalPositions: fetched.politicalPositions || [],
        impacts: fetched.impacts || []
      });
      setPreviewUrl(fetched.profile.photoUrl);
    }
  }, [aboutData]);

  // --- Handlers ---
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, profile: { ...prev.profile, [name]: value } }));
  };

  const handlePositionChange = (idx, field, value) => {
    const updated = [...data.politicalPositions];
    updated[idx][field] = value;
    setData({ ...data, politicalPositions: updated });
  };

  const addPosition = () => {
    const newPos = { role: "", period: "", level: "Federal", description: "", details: [] };
    setData({ ...data, politicalPositions: [newPos, ...data.politicalPositions] });
  };

  const handleImpactChange = (idx, value) => {
    const updated = [...data.impacts];
    updated[idx] = value;
    setData({ ...data, impacts: updated });
  };

  const addImpact = () => setData({ ...data, impacts: ["", ...data.impacts] });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (selectedFile) formData.append("image", selectedFile);
    
    // We remove _id and timestamps before sending to avoid MongoDB conflicts if updating
    const cleanData = { ...data };
    formData.append("allData", JSON.stringify(cleanData));

    mutation.mutate(formData);
  };

  // Loading State
  if (isLoading || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-slate-500">
        <Loader2 className="animate-spin text-red-600" size={40} />
        <p className="font-bold animate-pulse">Loading Profile Data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-10">
      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-8">
        
        {/* TOP ACTION BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-100 sticky top-4 z-10 gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Admin Panel: <span className="text-red-600">About Page</span></h1>
          </div>
          <button 
            type="submit" 
            disabled={mutation.isPending}
            className="bg-red-600 hover:bg-red-700 disabled:bg-slate-400 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-red-100"
          >
            {mutation.isPending ? <Loader2 className="animate-spin" size={20}/> : <Save size={20} />}
            {mutation.isPending ? "Saving..." : "Save All Changes"}
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: PROFILE DATA */}
          <div className="lg:col-span-4 space-y-6">
            <section className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Profile Media & Identity</h3>
              
              <div className="relative group w-full aspect-[4/5] rounded-3xl overflow-hidden bg-slate-100 mb-6">
                <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                <button type="button" onClick={() => fileInputRef.current.click()} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-all">
                  <Upload size={30} />
                  <span className="font-bold text-xs mt-2">Replace Photo</span>
                </button>
              </div>
              <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />

              <div className="space-y-4">
                <AdminInput label="Status" name="status" value={data.profile.status} onChange={handleProfileChange} />
                <div className="grid grid-cols-2 gap-3">
                    <AdminInput label="First Name" name="firstName" value={data.profile.firstName} onChange={handleProfileChange} />
                    <AdminInput label="Last Name" name="lastName" value={data.profile.lastName} onChange={handleProfileChange} />
                </div>
                <AdminInput label="Alias" name="alias" value={data.profile.alias} onChange={handleProfileChange} />
                <AdminInput label="Birth Date" name="birthDate" value={data.profile.birthDate} onChange={handleProfileChange} />
                <AdminInput label="Party" name="party" value={data.profile.party} onChange={handleProfileChange} />
                <AdminInput label="Constituency" name="constituency" value={data.profile.constituency} onChange={handleProfileChange} />
                <AdminInput label="Total Votes" name="totalVotes" value={data.profile.totalVotes} onChange={handleProfileChange} />
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: POSITIONS & IMPACTS */}
          <div className="lg:col-span-8 space-y-8">
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-black text-slate-800 flex items-center gap-2"><Landmark className="text-red-600" size={20}/> Political Journey</h2>
                <button type="button" onClick={addPosition} className="text-red-600 font-bold text-sm flex items-center gap-1 hover:bg-red-50 px-3 py-1 rounded-lg transition-all">
                  <Plus size={16}/> Add Position
                </button>
              </div>
              
              {data.politicalPositions.map((pos, idx) => (
                <div key={idx} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 relative group">
                  <button type="button" onClick={() => setData({...data, politicalPositions: data.politicalPositions.filter((_, i) => i !== idx)})} className="absolute top-6 right-6 text-slate-300 hover:text-red-600">
                    <Trash2 size={18} />
                  </button>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <AdminInput label="Role" value={pos.role} onChange={(e) => handlePositionChange(idx, "role", e.target.value)} />
                    <AdminInput label="Period" value={pos.period} onChange={(e) => handlePositionChange(idx, "period", e.target.value)} />
                  </div>
                  <AdminInput label="Description" value={pos.description} onChange={(e) => handlePositionChange(idx, "description", e.target.value)} isTextArea />
                </div>
              ))}
            </section>

            <section className="space-y-4">
               <div className="flex justify-between items-center">
                <h2 className="text-xl font-black text-slate-800 flex items-center gap-2"><CheckCircle className="text-red-600" size={20}/> Key Impacts</h2>
                <button type="button" onClick={addImpact} className="text-red-600 font-bold text-sm flex items-center gap-1 hover:bg-red-50 px-3 py-1 rounded-lg transition-all">
                  <Plus size={16}/> Add Impact
                </button>
              </div>
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 space-y-3">
                {data.impacts.map((impact, idx) => (
                  <div key={idx} className="flex gap-2 group">
                    <input 
                      value={impact} 
                      onChange={(e) => handleImpactChange(idx, e.target.value)}
                      className="flex-1 bg-slate-50 border border-slate-100 p-3 rounded-xl text-sm focus:ring-1 focus:ring-red-500 outline-none"
                    />
                    <button type="button" onClick={() => setData({...data, impacts: data.impacts.filter((_, i) => i !== idx)})} className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-600">
                      <Trash2 size={18}/>
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </form>
    </div>
  );
};

const AdminInput = ({ label, isTextArea, ...props }) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">{label}</label>
    {isTextArea ? (
      <textarea {...props} rows="3" className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-sm focus:ring-1 focus:ring-red-500 outline-none w-full" />
    ) : (
      <input {...props} className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-sm focus:ring-1 focus:ring-red-500 outline-none w-full" />
    )}
  </div>
);

export default AdminAbout;
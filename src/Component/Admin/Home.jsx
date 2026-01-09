import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  User, BarChart3, Briefcase, Save, Plus, Trash2, 
  Loader2, Image as ImageIcon, Upload, X 
} from "lucide-react";
import { getHomeData, sendHomedata } from "../../../utils/function";
import toast from "react-hot-toast";
import Loading from "../Loading";

const HomeAdmin = () => {
  const queryClient = useQueryClient();

  // 1. Fetch Data
  const { data: serverData, isLoading } = useQuery({
    queryKey: ['homedata'],
    queryFn: getHomeData
  });

  // 2. Initial Empty State
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    role: "",
    constituency: "",
    tagline: "",
    images: [], // Mixture of Strings (URLs) and File Objects
    stats: [],
    professionalExperience: []
  });

  // 3. Sync Server Data to Form State
  useEffect(() => {
    if (serverData) {
      setFormData({
        name: serverData.name || "",
        nickname: serverData.nickname || "",
        role: serverData.role || "",
        constituency: serverData.constituency || "",
        tagline: serverData.tagline || "",
        images: serverData.images || [], // Existing URLs
        stats: serverData.stats || [],
        professionalExperience: serverData.professionalExperience || []
      });
    }
  }, [serverData]);

  const mutation = useMutation({
    mutationFn: sendHomedata,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["homedata"] });
      toast.success("Profile Saved Successfully!");
    },
    onError: (error) => toast.error("Upload failed: " + error.message)
  });

  // --- Handlers ---
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    // Keep existing images (URLs) and add new ones (Files)
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const updateArrayItem = (index, field, value, section) => {
    const newArray = [...formData[section]];
    newArray[index][field] = value;
    setFormData({ ...formData, [section]: newArray });
  };

  const addArrayItem = (section, template) => {
    setFormData({ ...formData, [section]: [...formData[section], template] });
  };

  const removeArrayItem = (index, section) => {
    setFormData({ ...formData, [section]: formData[section].filter((_, i) => i !== index) });
  };

  if (isLoading) return (
    <Loading/>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm sticky top-4 z-20">
        <h1 className="text-xl font-bold text-gray-800">Edit Homepage Content</h1>
        <button 
          onClick={() => mutation.mutate(formData)}
          disabled={mutation.isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl flex items-center gap-2 transition-all disabled:opacity-50"
        >
          {mutation.isPending ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          {mutation.isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* 1. Basic Identity */}
      <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <h2 className="flex items-center gap-2 font-bold text-gray-700 border-b pb-4"><User size={20}/> Basic Identity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Full Name" name="name" value={formData.name} onChange={handleInputChange} />
          <Field label="Nickname" name="nickname" value={formData.nickname} onChange={handleInputChange} />
          <Field label="MP Role" name="role" value={formData.role} onChange={handleInputChange} />
          <Field label="Constituency" name="constituency" value={formData.constituency} onChange={handleInputChange} />
          <div className="md:col-span-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Tagline</label>
            <textarea name="tagline" value={formData.tagline} onChange={handleInputChange} className="w-full mt-2 border rounded-xl p-4 h-24 focus:ring-2 focus:ring-blue-100 outline-none" />
          </div>
        </div>
      </section>

      {/* 2. Image Gallery (Handles both URLs and Files) */}
      <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="flex items-center gap-2 font-bold text-gray-700"><ImageIcon size={20}/> Profile Photos</h2>
          <label className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-sm font-bold cursor-pointer hover:bg-blue-100">
            <input type="file" multiple className="hidden" onChange={handleFileChange} />
            + Upload from Computer
          </label>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {formData.images.map((img, i) => (
            <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border">
              <img 
                src={img instanceof File ? URL.createObjectURL(img) : img} 
                className="w-full h-full object-cover" 
                alt="preview" 
              />
              <button onClick={() => removeArrayItem(i, 'images')} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600">
                <X size={12}/>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Hero Stats */}
      <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="flex items-center gap-2 font-bold text-gray-700"><BarChart3 size={20}/> Hero Stats</h2>
          <button onClick={() => addArrayItem("stats", {label: "", value: ""})} className="text-blue-600 text-sm font-bold">+ Add Stat</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {formData.stats.map((stat, i) => (
            <div key={i} className="flex items-end gap-2 bg-gray-50 p-4 rounded-2xl relative group">
              <Field label="Label" value={stat.label} onChange={(e) => updateArrayItem(i, 'label', e.target.value, 'stats')} />
              <Field label="Value" value={stat.value} onChange={(e) => updateArrayItem(i, 'value', e.target.value, 'stats')} />
              <button onClick={() => removeArrayItem(i, 'stats')} className="text-red-400 hover:text-red-600 pb-2"><Trash2 size={18}/></button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Experience */}
      <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="flex items-center gap-2 font-bold text-gray-700"><Briefcase size={20}/> Professional Experience</h2>
          <button onClick={() => addArrayItem("professionalExperience", {year: "", role: "", organization: "", description: ""})} className="text-blue-600 text-sm font-bold">+ Add Entry</button>
        </div>
        {formData.professionalExperience.map((exp, i) => (
          <div key={i} className="p-6 border rounded-2xl space-y-4 bg-gray-50/50 relative">
            <button onClick={() => removeArrayItem(i, 'professionalExperience')} className="absolute top-4 right-4 text-red-400 hover:text-red-600"><Trash2 size={20}/></button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="Year Range" value={exp.year} onChange={(e) => updateArrayItem(i, 'year', e.target.value, 'professionalExperience')} />
              <Field label="Designation" value={exp.role} onChange={(e) => updateArrayItem(i, 'role', e.target.value, 'professionalExperience')} />
              <Field label="Organization" value={exp.organization} onChange={(e) => updateArrayItem(i, 'organization', e.target.value, 'professionalExperience')} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Job Description</label>
              <textarea value={exp.description} onChange={(e) => updateArrayItem(i, 'description', e.target.value, 'professionalExperience')} className="w-full mt-1 border rounded-xl p-3 text-sm h-24 focus:ring-1 focus:ring-blue-400 outline-none" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

const Field = ({ label, ...props }) => (
  <div className="w-full">
    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
    <input {...props} className="w-full mt-1 border-b border-gray-200 focus:border-blue-500 py-2 outline-none bg-transparent transition-all" />
  </div>
);

export default HomeAdmin;
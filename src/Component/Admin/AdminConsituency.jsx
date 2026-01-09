import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, X, Save, LayoutDashboard } from 'lucide-react';
import { getAllConstituencyData, sendConstituencyData } from '../../../utils/function';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from 'react-hot-toast';
import Loading from '../Loading';

const AdminConstituency = () => {
  const clientData = useQueryClient();

  // 1. Fetching Data
  const { data, isLoading, isError } = useQuery({
    queryKey: ['constituencydata'],
    queryFn: getAllConstituencyData
  });

  // 2. Local State (Initialized with empty structures)
  const [constituency, setConstituency] = useState({
    stats: [],
    projects: [],
    localLevels: []
  });

  // 3. Sync Query data to Local State when it arrives
  useEffect(() => {
    if (data) {
      // If data is an array (sometimes APIs return an array of objects), take the first one
      const actualData = Array.isArray(data) ? data[0] : data;
      
      setConstituency({
        stats: actualData.stats || [],
        projects: actualData.projects || [],
        localLevels: actualData.localLevels || []
      });
    }
  }, [data]);

  // 4. Mutation for saving
  const mutation = useMutation({
    mutationFn: sendConstituencyData,
    onSuccess: () => {
      clientData.invalidateQueries(['constituencydata']);
      toast.success("Changes saved successfully to the database!");
    },
    onError: (error) => {
      toast.error("Error saving data: " + error.message);
    }
  });

  // UI Control States
  const [activeModal, setActiveModal] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  
  // Temp Form States
  const [projectForm, setProjectForm] = useState({ title: '', category: '', status: 'Ongoing', description: '' });
  const [localForm, setLocalForm] = useState({ name: '', type: 'Municipality' });
  const [statsForm, setStatsForm] = useState([]);

  // --- SAVE TO DATABASE ---
  const handleFinalSave = () => {
    const payload = {
      stats: constituency.stats,
      projects: constituency.projects,
      localLevels: constituency.localLevels
    };
    
    // Call the mutation
    mutation.mutate(payload);
  };

  // --- LOCAL LEVELS HANDLERS ---
  const openLocalModal = (index = null) => {
    setEditIndex(index);
    setLocalForm(index !== null ? constituency.localLevels[index] : { name: '', type: 'Municipality' });
    setActiveModal('localLevel');
  };

  const saveLocalLevel = () => {
    let updatedLevels = [...constituency.localLevels];
    if (editIndex !== null) updatedLevels[editIndex] = localForm;
    else updatedLevels.push(localForm);
    
    setConstituency({ ...constituency, localLevels: updatedLevels });
    setActiveModal(null);
  };

  // --- PROJECTS HANDLERS ---
  const openProjectModal = (index = null) => {
    setEditIndex(index);
    setProjectForm(index !== null ? constituency.projects[index] : { title: '', category: '', status: 'Ongoing', description: '' });
    setActiveModal('project');
  };

  const saveProject = () => {
    let updatedProjects = [...constituency.projects];
    if (editIndex !== null) updatedProjects[editIndex] = projectForm;
    else updatedProjects.push(projectForm);

    setConstituency({ ...constituency, projects: updatedProjects });
    setActiveModal(null);
  };

  // Loading and Error States
  if (isLoading) return <Loading/>
  if (isError) return <div className="p-10 text-center text-red-500">Error fetching data. Check your API.</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
            <LayoutDashboard className="text-indigo-600" size={32} /> Admin Constituency
          </h1>
          <p className="text-slate-500">Syncing with Mongoose Database</p>
        </div>
        <button 
          onClick={handleFinalSave}
          disabled={mutation.isPending}
          className={`${mutation.isPending ? 'bg-slate-400' : 'bg-emerald-600 hover:bg-emerald-700'} text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg transition-all`}
        >
          <Save size={20} /> {mutation.isPending ? 'Saving...' : 'Save All Changes'}
        </button>
      </header>

      <main className="max-w-7xl mx-auto space-y-8">
        {/* Stats Grid */}
        <section>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-slate-700 uppercase tracking-wider">Region Statistics</h2>
                <button onClick={() => { setStatsForm([...constituency.stats]); setActiveModal('stats'); }} className="text-indigo-600 text-sm font-bold hover:underline">Edit Stats</button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {constituency.stats.map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                </div>
            ))}
            </div>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Projects Table */}
          <div className="xl:col-span-2">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-black">Initiatives</h2>
                <button onClick={() => openProjectModal()} className="bg-indigo-50 text-indigo-600 p-2 rounded-lg hover:bg-indigo-100 transition-colors"><Plus size={20}/></button>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-500 border-b">
                  <tr>
                    <th className="px-6 py-4">Title & Category</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {constituency.projects.map((p, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-800">{p.title}</p>
                        <p className="text-xs text-indigo-500 font-medium">{p.category}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-black bg-slate-100 px-2 py-1 rounded-md">{p.status}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => openProjectModal(i)} className="p-2 text-slate-400 hover:text-indigo-600"><Edit2 size={16}/></button>
                          <button onClick={() => {
                              const filtered = constituency.projects.filter((_, index) => index !== i);
                              setConstituency({...constituency, projects: filtered});
                          }} className="p-2 text-slate-400 hover:text-red-600"><Trash2 size={16}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Local Units Sidebar */}
          <div className="xl:col-span-1">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-black">Local Units</h2>
                <button onClick={() => openLocalModal()} className="bg-indigo-50 text-indigo-600 p-2 rounded-lg hover:bg-indigo-100 transition-colors"><Plus size={20}/></button>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
                {constituency.localLevels.map((local, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl group">
                        <div>
                            <p className="font-bold text-slate-700 text-sm">{local.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">{local.type}</p>
                        </div>
                        <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => openLocalModal(i)} className="p-1 text-slate-400 hover:text-indigo-600"><Edit2 size={14}/></button>
                            <button onClick={() => {
                                const filtered = constituency.localLevels.filter((_, index) => index !== i);
                                setConstituency({...constituency, localLevels: filtered});
                            }} className="p-1 text-slate-400 hover:text-red-600"><Trash2 size={14}/></button>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </main>

      {/* --- MODALS (Code remains same as yours) --- */}
      {/* Stats Modal */}
      {activeModal === 'stats' && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl">
                <h3 className="text-xl font-black mb-6">Edit Dashboard Stats</h3>
                <div className="space-y-4">
                    {statsForm.map((s, i) => (
                        <div key={i} className="flex gap-3">
                            <input className="flex-1 bg-slate-50 border p-3 rounded-xl text-sm" value={s.label} onChange={(e) => {
                                const copy = [...statsForm]; copy[i].label = e.target.value; setStatsForm(copy);
                            }} />
                            <input className="w-24 bg-slate-100 border p-3 rounded-xl text-sm font-bold text-indigo-600" value={s.value} onChange={(e) => {
                                const copy = [...statsForm]; copy[i].value = e.target.value; setStatsForm(copy);
                            }} />
                        </div>
                    ))}
                </div>
                <button onClick={() => { setConstituency({...constituency, stats: statsForm}); setActiveModal(null); }} className="w-full bg-indigo-600 text-white py-4 rounded-xl mt-8 font-bold">Update Stats</button>
              </div>
          </div>
      )}

      {/* Local Level Modal */}
      {activeModal === 'localLevel' && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl w-full max-w-sm p-8">
                <h3 className="text-xl font-black mb-6">{editIndex !== null ? 'Edit Unit' : 'Add Unit'}</h3>
                <div className="space-y-4">
                    <input placeholder="Name" className="w-full bg-slate-50 border p-3 rounded-xl" value={localForm.name} onChange={e => setLocalForm({...localForm, name: e.target.value})} />
                    <select className="w-full bg-slate-50 border p-3 rounded-xl" value={localForm.type} onChange={e => setLocalForm({...localForm, type: e.target.value})}>
                        <option>Municipality</option>
                        <option>Rural Municipality</option>
                    </select>
                </div>
                <div className="flex gap-2 mt-8">
                    <button onClick={() => setActiveModal(null)} className="flex-1 text-slate-400 font-bold">Cancel</button>
                    <button onClick={saveLocalLevel} className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold">Save</button>
                </div>
              </div>
          </div>
      )}

      {/* Project Modal */}
      {activeModal === 'project' && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl w-full max-w-lg p-8">
                <h3 className="text-xl font-black mb-6">Initiative Details</h3>
                <div className="space-y-4">
                    <input placeholder="Title" className="w-full bg-slate-50 border p-3 rounded-xl font-bold" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} />
                    <div className="grid grid-cols-2 gap-4">
                        <input placeholder="Category" className="bg-slate-50 border p-3 rounded-xl text-sm" value={projectForm.category} onChange={e => setProjectForm({...projectForm, category: e.target.value})} />
                        <select className="bg-slate-50 border p-3 rounded-xl text-sm" value={projectForm.status} onChange={e => setProjectForm({...projectForm, status: e.target.value})}>
                            <option>In Progress</option>
                            <option>Completed</option>
                            <option>Ongoing</option>
                        </select>
                    </div>
                    <textarea placeholder="Description" rows="4" className="w-full bg-slate-50 border p-3 rounded-xl text-sm" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} />
                </div>
                <div className="flex gap-2 mt-8">
                    <button onClick={() => setActiveModal(null)} className="flex-1 text-slate-400 font-bold">Cancel</button>
                    <button onClick={saveProject} className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold">Save Initiative</button>
                </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default AdminConstituency;
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Save, Plus, Trash2, MapPin, Clock, Calendar } from 'lucide-react';
import { getContactData, updateContactData } from '../../../utils/function';
import toast from 'react-hot-toast';

const AdminContact = () => {
  const queryClient = useQueryClient();
  const [form, setForm] = useState(null);

  // 1. Fetch Data
  const { data, isLoading } = useQuery({
    queryKey: ['contactData'],
    queryFn: getContactData,
  });

  // Initialize form with database data or initial structure
  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);

  // 2. Mutation
  const mutation = useMutation({
    mutationFn: (payload) => updateContactData(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['contactData']);
      toast.success("Contact information updated successfully!");
    }
  });

  if (isLoading || !form) return <div className="p-10 text-center">Loading Settings...</div>;

  // --- Handlers ---
  const handleOfficeChange = (index, field, value) => {
    const updatedOffices = [...form.offices];
    updatedOffices[index][field] = value;
    setForm({ ...form, offices: updatedOffices });
  };

  const addHoliday = () => {
    const updatedHolidays = [...form.schedule.upcomingHolidays, { date: "", name: "" }];
    setForm({ ...form, schedule: { ...form.schedule, upcomingHolidays: updatedHolidays } });
  };

  const removeHoliday = (index) => {
    const updatedHolidays = form.schedule.upcomingHolidays.filter((_, i) => i !== index);
    setForm({ ...form, schedule: { ...form.schedule, upcomingHolidays: updatedHolidays } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8">
        
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Contact Settings</h1>
            <p className="text-slate-500">Manage office locations and working hours</p>
          </div>
          <button 
            type="submit" 
            disabled={mutation.isPending}
            className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg disabled:bg-slate-300"
          >
            <Save size={20} /> {mutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </header>

        {/* OFFICES SECTION */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-indigo-600 font-bold mb-4">
            <MapPin size={20} /> <h2>Office Locations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {form.offices.map((office, idx) => (
              <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-slate-400 uppercase text-xs tracking-widest">{office.title}</h3>
                <input 
                  className="w-full bg-slate-50 p-3 rounded-xl border border-transparent focus:border-indigo-500 outline-none"
                  placeholder="Location Name"
                  value={office.locationName}
                  onChange={(e) => handleOfficeChange(idx, 'locationName', e.target.value)}
                />
                <input 
                  className="w-full bg-slate-50 p-3 rounded-xl border border-transparent focus:border-indigo-500 outline-none text-sm"
                  placeholder="Address"
                  value={office.address}
                  onChange={(e) => handleOfficeChange(idx, 'address', e.target.value)}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input 
                    className="bg-slate-50 p-3 rounded-xl border border-transparent focus:border-indigo-500 outline-none text-sm"
                    placeholder="Phone"
                    value={office.phone}
                    onChange={(e) => handleOfficeChange(idx, 'phone', e.target.value)}
                  />
                  <input 
                    className="bg-slate-50 p-3 rounded-xl border border-transparent focus:border-indigo-500 outline-none text-sm"
                    placeholder="Email"
                    value={office.email}
                    onChange={(e) => handleOfficeChange(idx, 'email', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SCHEDULE SECTION */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-indigo-600 font-bold">
              <Clock size={20} /> <h2>Working Hours</h2>
            </div>
            <div className="space-y-4">
              {['summer', 'winter', 'friday', 'weekend'].map((time) => (
                <div key={time}>
                  <label className="block text-xs font-black uppercase text-slate-400 mb-1 ml-1">{time}</label>
                  <input 
                    className="w-full bg-slate-50 p-3 rounded-xl border border-transparent focus:border-indigo-500 outline-none"
                    value={form.schedule[time]}
                    onChange={(e) => setForm({
                      ...form, 
                      schedule: { ...form.schedule, [time]: e.target.value }
                    })}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* HOLIDAYS SECTION */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-indigo-600 font-bold">
                <Calendar size={20} /> <h2>Upcoming Holidays</h2>
              </div>
              <button type="button" onClick={addHoliday} className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition-colors">
                <Plus size={20} />
              </button>
            </div>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
              {form.schedule.upcomingHolidays.map((holiday, idx) => (
                <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl">
                  <input 
                    className="flex-1 bg-white p-2 rounded-lg text-sm border-none outline-none"
                    placeholder="Date (e.g. Jan 15)"
                    value={holiday.date}
                    onChange={(e) => {
                      const h = [...form.schedule.upcomingHolidays];
                      h[idx].date = e.target.value;
                      setForm({...form, schedule: {...form.schedule, upcomingHolidays: h}});
                    }}
                  />
                  <input 
                    className="flex-[2] bg-white p-2 rounded-lg text-sm border-none outline-none"
                    placeholder="Holiday Name"
                    value={holiday.name}
                    onChange={(e) => {
                      const h = [...form.schedule.upcomingHolidays];
                      h[idx].name = e.target.value;
                      setForm({...form, schedule: {...form.schedule, upcomingHolidays: h}});
                    }}
                  />
                  <button type="button" onClick={() => removeHoliday(idx)} className="text-red-400 p-2 hover:bg-red-50 rounded-lg">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </form>
    </div>
  );
};

export default AdminContact;
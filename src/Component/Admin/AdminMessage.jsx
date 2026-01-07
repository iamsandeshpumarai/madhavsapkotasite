import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2, Mail, User, Clock, Inbox, CheckCircle } from 'lucide-react';
import { getMessages, deleteMessage } from '../../../utils/function.js';

const AdminMessages = () => {
  const queryClient = useQueryClient();

  // 1. Fetch Messages
  const { data: messages, isLoading, isError } = useQuery({
    queryKey: ['messages'],
    queryFn: getMessages,
  });

  // 2. Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: deleteMessage,
    onSuccess: () => {
      queryClient.invalidateQueries(['messages']);
    },
    onError: () => {
      alert("Failed to delete message");
    }
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <div className="p-10 text-center font-bold">Loading Inbox...</div>;
  if (isError) return <div className="p-10 text-center text-red-500">Error loading messages.</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header & Stats */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
              <Inbox className="text-indigo-600" /> Message Inbox
            </h1>
            <p className="text-slate-500 mt-1">You have {messages?.length || 0} total inquiries</p>
          </div>
          
          <div className="flex gap-4">
             <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-200">
                <span className="text-[10px] font-black uppercase text-slate-400 block">Unread</span>
                <span className="text-xl font-bold text-indigo-600">
                    {messages?.filter(m => m.status === 'unread').length}
                </span>
             </div>
          </div>
        </header>

        {/* Message List */}
        <div className="grid gap-6">
          {messages?.length === 0 ? (
            <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-medium">No messages found in the inbox.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div 
                key={msg._id} 
                className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative group"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Sender Info */}
                  <div className="md:w-1/4 space-y-2">
                    <div className="flex items-center gap-2 text-slate-900 font-bold">
                      <User size={16} className="text-slate-400" />
                      <span className="truncate">{msg.fullname}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <Mail size={16} className="text-slate-400" />
                      <span className="truncate">{msg.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest pt-2">
                      <Clock size={14} />
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className="md:w-2/3">
                    <div className="bg-slate-50 p-5 rounded-2xl text-slate-700 leading-relaxed text-sm italic">
                      "{msg.message}"
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex md:flex-col justify-end items-center gap-3">
                    <button 
                      onClick={() => handleDelete(msg._id)}
                      disabled={deleteMutation.isPending}
                      className="p-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                      title="Delete Message"
                    >
                      <Trash2 size={20} />
                    </button>
                    {msg.status === 'unread' && (
                        <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" title="New Message"></div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
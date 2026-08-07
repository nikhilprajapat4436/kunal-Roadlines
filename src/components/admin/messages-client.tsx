"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Mail, MessageSquare, Phone, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteContactMessage, updateMessageStatus } from "@/actions/contact-messages";

interface Message {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  message: string;
  status: string;
  createdAt?: string;
}

interface MessagesClientProps {
  messages: Message[];
}

const STATUS_STYLES: Record<string, string> = {
  new: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  read: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  replied: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  archived: "bg-white/5 text-white/40 border-white/10",
};

export function MessagesClient({ messages }: MessagesClientProps) {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const handleStatusChange = async (id: string, status: string) => {
    const result = await updateMessageStatus(id, status as "new" | "read" | "replied" | "archived");
    if (result.success) {
      toast.success(`Message marked as ${status}`);
    } else {
      toast.error(result.error || "Failed to update status");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete message from "${name}"? This action cannot be undone.`)) {
      return;
    }

    const formData = new FormData();
    formData.append("id", id);
    await deleteContactMessage(formData);
    toast.success("Message deleted successfully");
    setSelectedMessage(null);
  };

  const formatDate = (date?: string) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-white">
          Contact Messages
        </h1>
        <p className="mt-2 text-white/60">
          {messages.length} messages received
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "New", value: messages.filter((m) => m.status === "new").length, color: "text-amber-400" },
          { label: "Read", value: messages.filter((m) => m.status === "read").length, color: "text-blue-400" },
          { label: "Replied", value: messages.filter((m) => m.status === "replied").length, color: "text-emerald-400" },
          { label: "Archived", value: messages.filter((m) => m.status === "archived").length, color: "text-white/40" },
        ].map((stat) => (
          <div key={stat.label} className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="mt-1 text-sm text-white/50">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Messages List */}
      {messages.length === 0 ? (
        <div className="text-center py-16 rounded-2xl bg-white/5 border border-white/10">
          <MessageSquare className="h-16 w-16 mx-auto text-white/20" />
          <h3 className="mt-4 text-lg font-semibold text-white">No messages yet</h3>
          <p className="mt-2 text-white/50">
            Messages from the contact form will appear here.
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-4">
          {messages.map((message) => (
            <div
              key={message._id}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors cursor-pointer"
              onClick={() => setSelectedMessage(message)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white font-semibold">
                    {message.name.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <p className="font-medium text-white">{message.name}</p>
                    <p className="text-xs text-white/40">{message.service}</p>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                    STATUS_STYLES[message.status] || ""
                  }`}
                >
                  {message.status}
                </span>
              </div>

              <p className="mt-4 text-sm text-white/70 line-clamp-3">
                {message.message}
              </p>

              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-white/40">
                  {formatDate(message.createdAt)}
                </span>
                <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                  <select
                    value={message.status}
                    onChange={(e) => handleStatusChange(message._id, e.target.value)}
                    className="text-xs bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white/60 focus:outline-none"
                  >
                    <option value="new" className="bg-slate-900">New</option>
                    <option value="read" className="bg-slate-900">Read</option>
                    <option value="replied" className="bg-slate-900">Replied</option>
                    <option value="archived" className="bg-slate-900">Archived</option>
                  </select>
                  <button
                    onClick={() => handleDelete(message._id, message.name)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/10 text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors"
                    aria-label="Delete message"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Message Details Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedMessage(null)}
          />
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-white/10 p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Message Details</h2>
              <button
                onClick={() => setSelectedMessage(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/60 hover:text-white"
                aria-label="Close"
              >
                <span className="text-lg">×</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white font-bold">
                  {selectedMessage.name.charAt(0).toUpperCase()}
                </span>
                <div>
                  <p className="font-semibold text-white">{selectedMessage.name}</p>
                  <p className="text-sm text-white/50">{selectedMessage.service}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-white/40 flex items-center gap-1.5">
                    <Mail className="h-3 w-3" /> Email
                  </p>
                  <p className="mt-1 text-sm text-white/80">{selectedMessage.email}</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-white/40 flex items-center gap-1.5">
                    <Phone className="h-3 w-3" /> Phone
                  </p>
                  <p className="mt-1 text-sm text-white/80">{selectedMessage.phone}</p>
                </div>
              </div>

              {selectedMessage.company && (
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-white/40 flex items-center gap-1.5">
                    <User className="h-3 w-3" /> Company
                  </p>
                  <p className="mt-1 text-sm text-white/80">{selectedMessage.company}</p>
                </div>
              )}

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-white/40">Message</p>
                <p className="mt-2 text-sm text-white/80 leading-relaxed">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={() => handleStatusChange(selectedMessage._id, "replied")}
                  className="flex-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                >
                  Mark as Replied
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleDelete(selectedMessage._id, selectedMessage.name)}
                  className="rounded-full border-red-500/20 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <Trash2 className="mr-1.5 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
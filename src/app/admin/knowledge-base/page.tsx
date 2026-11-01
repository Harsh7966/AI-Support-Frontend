"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import ActionButtons from "@/component/ActionButtons";
import Table, { TableColumn } from "@/component/Table";
import { getApiErrorMsg } from "@/services/aiService";
import {
    createKnowledge,
    deleteKnowledge,
    getKnowledgeList,
    KnowledgeEntry,
    reindexKnowledge,
    updateKnowledge,
} from "@/services/admin/knowledgeService";

const MAX_TITLE = 200;
const MAX_CONTENT = 4000;

const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";
const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

const emptyForm = { title: "", category: "", content: "" };

// Admin: knowledge base (FAQ / policy entries). Customer AI assistant isi se jawab deta hai.
// Ek entry = ek searchable chunk. (PDF upload + chunking baad me judega.)
export default function KnowledgeBasePage() {
    const [entries, setEntries] = useState<KnowledgeEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [reindexing, setReindexing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState(emptyForm);
    const hasFetched = useRef(false);

    const loadEntries = async () => {
        try {
            const res = await getKnowledgeList();
            if (res?.status) setEntries(res.data ?? []);
        } catch (err) {
            toast.error(getApiErrorMsg(err, "Could not load knowledge base"));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        loadEntries();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setForm(emptyForm);
        setEditingId(null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (form.title.trim().length < 3) return toast.error("Title must be at least 3 characters");
        if (form.content.trim().length < 20) return toast.error("Content must be at least 20 characters");

        try {
            setSaving(true);
            const payload = { title: form.title, content: form.content, category: form.category };
            const res = editingId ? await updateKnowledge(editingId, payload) : await createKnowledge(payload);
            if (res?.status) {
                toast.success(res.msg || "Saved");
                resetForm();
                await loadEntries();
            } else {
                toast.error(res?.msg || "Could not save");
            }
        } catch (err) {
            toast.error(getApiErrorMsg(err, "Could not save (AI service error)"));
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (entry: KnowledgeEntry) => {
        setEditingId(entry._id);
        setForm({ title: entry.title, category: entry.category === "general" ? "" : entry.category, content: entry.content });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (entry: KnowledgeEntry) => {
        if (!window.confirm(`Delete "${entry.title}"? The AI assistant will stop using it.`)) return;
        try {
            const res = await deleteKnowledge(entry._id);
            if (res?.status) {
                toast.success(res.msg || "Deleted");
                setEntries((prev) => prev.filter((e) => e._id !== entry._id));
                if (editingId === entry._id) resetForm();
            } else {
                toast.error(res?.msg || "Could not delete");
            }
        } catch (err) {
            toast.error(getApiErrorMsg(err, "Could not delete"));
        }
    };

    const handleReindex = async () => {
        try {
            setReindexing(true);
            const res = await reindexKnowledge();
            if (res?.status) toast.success(res.msg || "Re-indexed");
            else toast.error(res?.msg || "Re-index failed");
        } catch (err) {
            toast.error(getApiErrorMsg(err, "Re-index failed"));
        } finally {
            setReindexing(false);
        }
    };

    const columns: TableColumn<KnowledgeEntry>[] = [
        { header: "Title", accessor: "title", className: "font-medium text-slate-800" },
        { header: "Category", accessor: "category" },
        {
            header: "Content",
            accessor: (row) => (row.content.length > 120 ? `${row.content.slice(0, 120)}...` : row.content),
            className: "max-w-md text-slate-500",
        },
        { header: "Added", accessor: (row) => new Date(row.createdAt).toLocaleDateString() },
    ];

    return (
        <div className="p-8">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Knowledge Base</h2>
                    <p className="mt-1 text-sm text-slate-500">
                        The customer AI assistant answers only from these entries. Write one topic per entry.
                    </p>
                </div>
                <button
                    type="button"
                    disabled={reindexing || entries.length === 0}
                    onClick={handleReindex}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {reindexing ? "Re-indexing..." : "Re-index all"}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-base font-semibold text-slate-800">
                    {editingId ? "Edit entry" : "Add new entry"}
                </h3>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div className="sm:col-span-2">
                        <label htmlFor="title" className={labelClass}>Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            maxLength={MAX_TITLE}
                            placeholder="e.g. Refund policy"
                            className={inputClass}
                            value={form.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className={labelClass}>Category (optional)</label>
                        <input
                            id="category"
                            name="category"
                            type="text"
                            maxLength={50}
                            placeholder="e.g. Billing"
                            className={inputClass}
                            value={form.category}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="content" className={labelClass}>Content</label>
                        <textarea
                            id="content"
                            name="content"
                            rows={6}
                            maxLength={MAX_CONTENT}
                            placeholder="Write the answer or policy in clear, simple sentences."
                            className={inputClass}
                            value={form.content}
                            onChange={handleChange}
                            required
                        />
                        <p className="mt-1 text-right text-xs text-slate-400">
                            {form.content.length}/{MAX_CONTENT}
                        </p>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-end gap-3">
                    {editingId && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                            Cancel edit
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={saving}
                        className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {saving ? "Saving..." : editingId ? "Update entry" : "Add to Knowledge Base"}
                    </button>
                </div>
            </form>

            <Table
                columns={columns}
                data={entries}
                keyExtractor={(row) => row._id}
                loading={loading}
                emptyMessage="No knowledge entries yet. Add your first one above."
                actions={(row) => (
                    <ActionButtons onEdit={() => handleEdit(row)} onDelete={() => handleDelete(row)} />
                )}
            />
        </div>
    );
}


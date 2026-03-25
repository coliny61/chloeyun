import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { LogoFull } from '../components/ui/Logo';
import Button from '../components/ui/Button';
import {
  verifyPassword,
  setAdminPassword,
  adminList,
  adminCreate,
  adminUpdate,
  adminDelete,
  enrichPlace,
} from '../lib/adminApi';

type Tab = 'spots' | 'events' | 'vlogs' | 'stats' | 'batch';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'select' | 'date';
  required?: boolean;
  options?: string[];
  placeholder?: string;
}

const SPOT_FIELDS: FormField[] = [
  { name: 'name', label: 'Restaurant Name', type: 'text', required: true },
  { name: 'rating', label: 'Rating (1-5)', type: 'number', required: true },
  { name: 'review', label: 'Your Review', type: 'textarea', required: true },
  { name: 'tiktok_url', label: 'TikTok URL', type: 'text' },
  { name: 'instagram_url', label: 'Instagram URL', type: 'text' },
  { name: 'cuisine_type', label: 'Cuisine Type', type: 'text', placeholder: 'e.g. Korean, Mexican, Mediterranean' },
  { name: 'filter_category', label: 'Filter Category', type: 'text', placeholder: 'e.g. Asian, Latin, European, American, Sweet Treats' },
  { name: 'price_range', label: 'Price Range', type: 'select', options: ['$', '$$', '$$$', '$$$$'] },
  { name: 'date_reviewed', label: 'Date Reviewed', type: 'date' },
  { name: 'is_featured', label: 'Featured?', type: 'select', options: ['false', 'true'] },
];

const EVENT_FIELDS: FormField[] = [
  { name: 'name', label: 'Event Name', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'event_date', label: 'Event Date', type: 'date' },
  { name: 'tiktok_url', label: 'TikTok URL', type: 'text' },
  { name: 'instagram_url', label: 'Instagram URL', type: 'text' },
];

const VLOG_FIELDS: FormField[] = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'tiktok_url', label: 'TikTok URL', type: 'text' },
  { name: 'instagram_url', label: 'Instagram URL', type: 'text' },
  { name: 'city', label: 'City / Location Tag', type: 'text', placeholder: 'e.g. DFW, Houston, NYC' },
];

const STAT_KEYS = [
  { key: 'tiktok_followers', label: 'TikTok Followers' },
  { key: 'tiktok_likes', label: 'TikTok Likes' },
  { key: 'total_views', label: 'Total Views' },
  { key: 'instagram_followers', label: 'Instagram Followers' },
  { key: 'engagement_rate', label: 'Engagement Rate' },
  { key: 'audience_women_pct', label: 'Audience % Women' },
  { key: 'audience_18_34_pct', label: 'Audience % Ages 18-34' },
  { key: 'audience_dfw_pct', label: 'Audience % DFW Area' },
];

// ============================================================
// Login Screen
// ============================================================

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const valid = await verifyPassword(password);
    if (valid) {
      setAdminPassword(password);
      onLogin();
    } else {
      setError('Invalid password');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full">
        <div className="flex justify-center mb-6">
          <LogoFull />
        </div>
        <h1 className="font-heading text-2xl font-bold text-[#2D2424] text-center mb-2">
          Admin Login
        </h1>
        <p className="text-[#2D2424]/60 text-center text-sm mb-6">
          Enter your admin password to manage content.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 border border-[#FFF5F7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F8A5B8] bg-[#FAF6F0]"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Checking...' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  );
}

// ============================================================
// Generic Form
// ============================================================

function AdminForm({
  fields,
  initialData,
  onSubmit,
  onCancel,
  submitLabel = 'Save',
}: {
  fields: FormField[];
  initialData?: Record<string, unknown>;
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
}) {
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    fields.forEach((f) => {
      init[f.name] = initialData?.[f.name] != null ? String(initialData[f.name]) : '';
    });
    return init;
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data: Record<string, unknown> = {};
    fields.forEach((f) => {
      const val = formData[f.name];
      if (f.name === 'is_featured') {
        data[f.name] = val === 'true';
      } else if (f.name === 'rating' && val) {
        data[f.name] = parseFloat(val);
      } else if (val) {
        data[f.name] = val;
      }
    });
    await onSubmit(data);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-[#2D2424] mb-1">
            {field.label} {field.required && <span className="text-[#F8A5B8]">*</span>}
          </label>
          {field.type === 'textarea' ? (
            <textarea
              value={formData[field.name]}
              onChange={(e) => setFormData((p) => ({ ...p, [field.name]: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F8A5B8] text-sm"
              required={field.required}
              placeholder={field.placeholder}
            />
          ) : field.type === 'select' ? (
            <select
              value={formData[field.name]}
              onChange={(e) => setFormData((p) => ({ ...p, [field.name]: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F8A5B8] text-sm"
            >
              <option value="">Select...</option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              value={formData[field.name]}
              onChange={(e) => setFormData((p) => ({ ...p, [field.name]: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F8A5B8] text-sm"
              required={field.required}
              placeholder={field.placeholder}
              step={field.name === 'rating' ? '0.1' : undefined}
              min={field.name === 'rating' ? '1' : undefined}
              max={field.name === 'rating' ? '5' : undefined}
            />
          )}
        </div>
      ))}
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : submitLabel}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

// ============================================================
// Content Manager (CRUD list + form)
// ============================================================

function ContentManager({
  table,
  fields,
  nameField,
  onEnrich,
}: {
  table: string;
  fields: FormField[];
  nameField: string;
  onEnrich?: (id: string) => Promise<void>;
}) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [message, setMessage] = useState('');

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminList(table);
      setItems(res.data || []);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to load');
    }
    setLoading(false);
  }, [table]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { loadItems(); }, [loadItems]);

  const handleCreate = async (data: Record<string, unknown>) => {
    try {
      await adminCreate(table, data);
      setShowAdd(false);
      setMessage('Created successfully!');
      await loadItems();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to create');
    }
  };

  const handleUpdate = async (data: Record<string, unknown>) => {
    if (!editingId) return;
    try {
      await adminUpdate(table, editingId, data);
      setEditingId(null);
      setMessage('Updated successfully!');
      await loadItems();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to update');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await adminDelete(table, id);
      setMessage('Deleted successfully!');
      await loadItems();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to delete');
    }
  };

  const editingItem = items.find((i) => (i as { id: string }).id === editingId);

  return (
    <div>
      {message && (
        <div className="mb-4 p-3 bg-[#FFF5F7] text-[#2D2424] rounded-lg text-sm flex justify-between">
          <span>{message}</span>
          <button onClick={() => setMessage('')} className="text-[#F8A5B8] font-bold">×</button>
        </div>
      )}

      {showAdd ? (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-heading text-lg font-semibold text-[#2D2424] mb-4">Add New</h3>
          <AdminForm fields={fields} onSubmit={handleCreate} onCancel={() => setShowAdd(false)} submitLabel="Add" />
        </div>
      ) : editingId && editingItem ? (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-heading text-lg font-semibold text-[#2D2424] mb-4">Edit</h3>
          <AdminForm
            fields={fields}
            initialData={editingItem as Record<string, unknown>}
            onSubmit={handleUpdate}
            onCancel={() => setEditingId(null)}
            submitLabel="Update"
          />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-[#2D2424]/60">{items.length} items</p>
            <Button size="sm" onClick={() => setShowAdd(true)}>+ Add New</Button>
          </div>

          {loading ? (
            <p className="text-[#2D2424]/60 text-center py-8">Loading...</p>
          ) : items.length === 0 ? (
            <p className="text-[#2D2424]/60 text-center py-8">No items yet. Add your first one!</p>
          ) : (
            <div className="space-y-2">
              {items.map((item) => {
                const id = (item as { id: string }).id;
                const name = String(item[nameField] || 'Untitled');
                return (
                  <div key={id} className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm border border-gray-50">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-[#2D2424] truncate">{name}</p>
                      <p className="text-xs text-[#2D2424]/50 mt-0.5">
                        {(item as { created_at?: string }).created_at
                          ? new Date((item as { created_at: string }).created_at).toLocaleDateString()
                          : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {onEnrich && (
                        <button
                          onClick={async () => {
                            setMessage('Enriching...');
                            try {
                              await onEnrich(id);
                              setMessage('Enrichment complete!');
                              await loadItems();
                            } catch (err) {
                              setMessage(err instanceof Error ? err.message : 'Enrichment failed');
                            }
                          }}
                          className="text-xs text-blue-500 hover:text-blue-700 font-medium"
                        >
                          Enrich
                        </button>
                      )}
                      <button
                        onClick={() => setEditingId(id)}
                        className="text-xs text-[#F8A5B8] hover:text-[#E8919F] font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(id, name)}
                        className="text-xs text-red-400 hover:text-red-600 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ============================================================
// Stats Manager
// ============================================================

function StatsManager() {
  const [stats, setStats] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await adminList('site_settings');
        const map: Record<string, string> = {};
        (res.data || []).forEach((s: { key: string; value: string }) => {
          map[s.key] = s.value || '';
        });
        setStats(map);
      } catch {
        setMessage('Failed to load stats');
      }
      setLoading(false);
    })();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const { key } of STAT_KEYS) {
        await adminUpdate('site_settings', key, { value: stats[key] || '' });
      }
      setMessage('Stats updated!');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to save');
    }
    setSaving(false);
  };

  if (loading) return <p className="text-[#2D2424]/60 text-center py-8">Loading...</p>;

  return (
    <div>
      {message && (
        <div className="mb-4 p-3 bg-[#FFF5F7] text-[#2D2424] rounded-lg text-sm flex justify-between">
          <span>{message}</span>
          <button onClick={() => setMessage('')} className="text-[#F8A5B8] font-bold">×</button>
        </div>
      )}
      <div className="space-y-4">
        {STAT_KEYS.map(({ key, label }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-[#2D2424] mb-1">{label}</label>
            <input
              type="text"
              value={stats[key] || ''}
              onChange={(e) => setStats((p) => ({ ...p, [key]: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F8A5B8] text-sm"
              placeholder={`e.g. 27000`}
            />
          </div>
        ))}
        <Button onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Update Stats'}
        </Button>
      </div>
    </div>
  );
}

// ============================================================
// Batch Import
// ============================================================

function BatchImport() {
  const [input, setInput] = useState('');
  const [progress, setProgress] = useState<{ done: number; total: number; errors: string[] } | null>(null);
  const [running, setRunning] = useState(false);

  const handleImport = async () => {
    const lines = input.trim().split('\n').filter(Boolean);
    if (lines.length === 0) return;

    setRunning(true);
    const result = { done: 0, total: lines.length, errors: [] as string[] };
    setProgress({ ...result });

    for (const line of lines) {
      const parts = line.split('|').map((s) => s.trim());
      if (parts.length < 2) {
        result.errors.push(`Invalid line: "${line}"`);
        result.done++;
        setProgress({ ...result });
        continue;
      }

      const [name, tiktok_url, cuisine_type, price_range, ratingStr, ...reviewParts] = parts;
      const data: Record<string, unknown> = {
        name,
        tiktok_url: tiktok_url || undefined,
        cuisine_type: cuisine_type || 'Other',
        price_range: price_range || '$$',
        rating: ratingStr ? parseFloat(ratingStr) : undefined,
        review: reviewParts.join('|') || undefined,
        date_reviewed: new Date().toISOString(),
      };

      try {
        const res = await adminCreate('places', data);
        // Trigger enrichment
        try {
          await enrichPlace(res.data.id);
        } catch { /* enrichment failure is non-blocking */ }
      } catch (err) {
        result.errors.push(`Failed: ${name} — ${err instanceof Error ? err.message : 'unknown'}`);
      }

      result.done++;
      setProgress({ ...result });
    }

    setRunning(false);
  };

  return (
    <div>
      <p className="text-sm text-[#2D2424]/70 mb-4">
        Paste one entry per line: <code className="bg-[#FFF5F7] px-1 rounded text-xs">name | TikTok URL | cuisine | price | rating | review</code>
      </p>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={8}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F8A5B8] text-sm font-mono"
        placeholder="Don Sarang KBBQ | https://tiktok.com/... | Korean | $$$ | 4.8 | Amazing flat grill KBBQ!"
        disabled={running}
      />
      {progress && (
        <div className="mt-4">
          <div className="flex justify-between text-sm text-[#2D2424] mb-1">
            <span>{progress.done} of {progress.total} complete</span>
            <span>{Math.round((progress.done / progress.total) * 100)}%</span>
          </div>
          <div className="h-2 bg-[#FFF5F7] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#F8A5B8] rounded-full transition-all duration-300"
              style={{ width: `${(progress.done / progress.total) * 100}%` }}
            />
          </div>
          {progress.errors.length > 0 && (
            <div className="mt-3 text-sm text-red-500">
              {progress.errors.map((err, i) => <p key={i}>{err}</p>)}
            </div>
          )}
        </div>
      )}
      <div className="mt-4">
        <Button onClick={handleImport} disabled={running || !input.trim()}>
          {running ? `Importing... (${progress?.done}/${progress?.total})` : 'Start Import'}
        </Button>
      </div>
    </div>
  );
}

// ============================================================
// Main Admin Page
// ============================================================

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('spots');

  if (!authenticated) {
    return <LoginScreen onLogin={() => setAuthenticated(true)} />;
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'spots', label: 'Food Spots' },
    { id: 'events', label: 'Events' },
    { id: 'vlogs', label: 'Vlogs' },
    { id: 'stats', label: 'Media Kit Stats' },
    { id: 'batch', label: 'Batch Import' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF6F0]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <LogoFull />
            </Link>
            <span className="text-xs bg-[#F8A5B8]/10 text-[#F8A5B8] px-2 py-0.5 rounded-full font-medium">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-[#2D2424]/60 hover:text-[#2D2424]">
              ← Back to Site
            </Link>
            <button
              onClick={() => setAuthenticated(false)}
              className="text-sm text-[#2D2424]/60 hover:text-[#2D2424]"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-lg p-1 shadow-sm mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#F8A5B8] text-white'
                  : 'text-[#2D2424] hover:bg-[#FFF5F7]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'spots' && (
          <ContentManager
            table="places"
            fields={SPOT_FIELDS}
            nameField="name"
            onEnrich={async (id) => {
              const res = await enrichPlace(id);
              return res;
            }}
          />
        )}
        {activeTab === 'events' && (
          <ContentManager table="events" fields={EVENT_FIELDS} nameField="name" />
        )}
        {activeTab === 'vlogs' && (
          <ContentManager table="vlogs" fields={VLOG_FIELDS} nameField="title" />
        )}
        {activeTab === 'stats' && <StatsManager />}
        {activeTab === 'batch' && <BatchImport />}
      </div>
    </div>
  );
}

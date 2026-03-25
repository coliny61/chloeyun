// Admin API client — all requests require password auth

let adminPassword = '';

export function setAdminPassword(pw: string) {
  adminPassword = pw;
}

export function getAdminPassword() {
  return adminPassword;
}

async function adminFetch(url: string, body: Record<string, unknown>) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-password': adminPassword,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export async function verifyPassword(password: string): Promise<boolean> {
  try {
    const res = await fetch('/api/admin-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function adminList(table: string) {
  return adminFetch('/api/admin', { action: 'list', table });
}

export async function adminCreate(table: string, data: Record<string, unknown>) {
  return adminFetch('/api/admin', { action: 'create', table, data });
}

export async function adminUpdate(table: string, id: string, data: Record<string, unknown>) {
  return adminFetch('/api/admin', { action: 'update', table, id, data });
}

export async function adminDelete(table: string, id: string) {
  return adminFetch('/api/admin', { action: 'delete', table, id });
}

export async function enrichPlace(placeId: string, forceRefresh = false) {
  return adminFetch('/api/enrich', { placeId, forceRefresh });
}

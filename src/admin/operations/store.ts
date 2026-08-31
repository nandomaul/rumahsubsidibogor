import type { OperationsState } from './types';

const STORAGE_KEY = 'rumah-subsidi-admin-ops-v1';

export const defaultState: OperationsState = {
  attendance: [],
  todos: [
    { id: 'todo-demo-1', title: 'Follow-up lead yang belum dibalas', priority: 'high', done: false, createdAt: new Date().toISOString() },
    { id: 'todo-demo-2', title: 'Upload 1 konten progres pembangunan', priority: 'medium', done: false, createdAt: new Date().toISOString() },
  ],
  social: [
    { platform: 'Instagram', followers: 0, reach: 0, views: 0, likes: 0, comments: 0, shares: 0, saves: 0 },
    { platform: 'TikTok', followers: 0, reach: 0, views: 0, likes: 0, comments: 0, shares: 0, saves: 0 },
    { platform: 'Facebook', followers: 0, reach: 0, views: 0, likes: 0, comments: 0, shares: 0, saves: 0 },
  ],
  sales: { incomingChats: 0, repliedChats: 0, followUps: 0, surveyBookings: 0 },
  content: { planned: 0, recorded: 0, edited: 0, published: 0, notes: '' },
};

export function loadOperationsState(): OperationsState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    return { ...defaultState, ...JSON.parse(raw) } as OperationsState;
  } catch {
    return defaultState;
  }
}

export function saveOperationsState(state: OperationsState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function resetOperationsState() {
  localStorage.removeItem(STORAGE_KEY);
}

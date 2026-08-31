export type AttendanceType = 'check_in' | 'check_out';
export type AttendanceStatus = 'on_time' | 'late' | 'early_leave' | 'normal';

export type GeoPoint = {
  latitude: number;
  longitude: number;
  accuracy: number;
};

export type AttendanceRecord = {
  id: string;
  type: AttendanceType;
  createdAt: string;
  status: AttendanceStatus;
  minutesDelta: number;
  location: GeoPoint;
  distanceMeters: number;
  photoName: string;
};

export type TodoPriority = 'low' | 'medium' | 'high';

export type TodoItem = {
  id: string;
  title: string;
  dueDate?: string;
  priority: TodoPriority;
  done: boolean;
  createdAt: string;
};

export type SocialPlatform = 'Instagram' | 'TikTok' | 'Facebook';

export type SocialMetric = {
  platform: SocialPlatform;
  followers: number;
  reach: number;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
};

export type DailySalesOps = {
  incomingChats: number;
  repliedChats: number;
  followUps: number;
  surveyBookings: number;
};

export type DailyContentOps = {
  planned: number;
  recorded: number;
  edited: number;
  published: number;
  notes: string;
};

export type OperationsState = {
  attendance: AttendanceRecord[];
  todos: TodoItem[];
  social: SocialMetric[];
  sales: DailySalesOps;
  content: DailyContentOps;
};

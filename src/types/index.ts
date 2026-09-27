export type DocumentCategory = 
  | 'all'
  | 'nong_nghiep'
  | 'chuyen_doi_so'
  | 'phap_luat'
  | 'y_te_suc_khoe'
  | 'nghe_nong_thon'
  | 'giao_duc_khac';

export interface DocumentItem {
  id: string;
  title: string;
  codeNumber: string;
  category: Exclude<DocumentCategory, 'all'>;
  categoryLabel: string;
  issuer: string;
  author: string;
  publishDate: string;
  summary: string;
  content: string;
  keyTakeaways: string[];
  fileFormat: 'PDF' | 'DOCX' | 'PPTX';
  fileSize: string;
  pageCount: number;
  downloadCount: number;
  views: number;
  isPinned?: boolean;
  targetAudience: string;
  fileName: string;
  isOfficialApproved: boolean;
}

export type AnnouncementPriority = 'urgent' | 'important' | 'normal';
export type AnnouncementType = 'chieu_sinh' | 'hoi_thao' | 'chinh_sach' | 'hoat_dong_chung';

export interface AnnouncementItem {
  id: string;
  title: string;
  codeNumber: string;
  publishDate: string;
  priority: AnnouncementPriority;
  type: AnnouncementType;
  typeLabel: string;
  issuer: string;
  summary: string;
  content: string;
  isPinned?: boolean;
  relatedClassId?: string;
  relatedDocumentId?: string;
  attachments?: { name: string; size: string; type: string }[];
}

export type ClassStatus = 'sap_dien_ra' | 'dang_dien_ra' | 'da_ket_thuc';

export interface ClassScheduleItem {
  id: string;
  title: string;
  topicCategory: Exclude<DocumentCategory, 'all'>;
  topicLabel: string;
  instructor: string;
  instructorTitle: string;
  venue: string;
  addressNote: string;
  startDate: string;
  endDate: string;
  timeSlot: string;
  sessionDays: string;
  totalHours: number;
  capacity: number;
  registeredCount: number;
  fee: string;
  targetAudience: string;
  status: ClassStatus;
  description: string;
  curriculum: string[];
  contactPhone: string;
}

export interface RegistrationItem {
  id: string;
  classId: string;
  classTitle: string;
  fullName: string;
  phoneNumber: string;
  hamlet: string;
  yearOfBirth?: string;
  note?: string;
  registeredAt: string;
}

export type UserRole = 'citizen' | 'admin';

export interface AdminUser {
  username: string;
  fullName: string;
  roleTitle: string;
  agency: string;
  loginAt: string;
}

export type MainNavTab = 'overview' | 'documents' | 'upload' | 'announcements' | 'schedules';


import { 
  DocumentItem, 
  AnnouncementItem, 
  ClassScheduleItem, 
  RegistrationItem,
  AdminUser,
  StaffMember,
  FeedbackItem,
  FeedbackOfficialResponse
} from '../types';
import { 
  INITIAL_DOCUMENTS, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_CLASSES, 
  INITIAL_REGISTRATIONS,
  INITIAL_STAFF_MEMBERS,
  INITIAL_FEEDBACK
} from '../data/initialData';

const STORAGE_KEYS = {
  DOCUMENTS: 'longho_learning_center_documents_v1',
  ANNOUNCEMENTS: 'longho_learning_center_announcements_v1',
  CLASSES: 'longho_learning_center_classes_v1',
  REGISTRATIONS: 'longho_learning_center_registrations_v1',
  STAFF: 'longho_learning_center_staff_v1',
  FEEDBACK: 'longho_learning_center_feedback_v1',
  ADMIN_SESSION: 'longho_learning_center_admin_session_v1',
};

const VALID_ADMINS = [
  {
    username: 'admin',
    passwords: ['123456', 'longho2026', 'admin123'],
    fullName: 'Đ/c Nguyễn Thị Mỹ Hạnh',
    roleTitle: 'Giám đốc TTHTCĐ · Phó Chủ tịch UBND xã Long Hồ',
    agency: 'Ban Giám đốc TT HTCĐ Xã Long Hồ',
  },
  {
    username: 'luoquoctru',
    passwords: ['123456', 'longho2026'],
    fullName: 'Đ/c Lưu Quốc Trụ',
    roleTitle: 'Phó Giám đốc TTHTCĐ · Chủ tịch Hội Khuyến học',
    agency: 'Ban Giám đốc TT HTCĐ Xã Long Hồ',
  },
  {
    username: 'nguyenvannho',
    passwords: ['123456', 'longho2026'],
    fullName: 'Đ/c Nguyễn Văn Nho',
    roleTitle: 'Phó Giám đốc TTHTCĐ · Hiệu trưởng THCS Long Phước A',
    agency: 'Ban Giám đốc TT HTCĐ Xã Long Hồ',
  },
  {
    username: 'bql_longho',
    passwords: ['123456', 'longho2026'],
    fullName: 'Đ/c Phạm Thị Thiên Hương',
    roleTitle: 'Cán bộ Quản lý Trung tâm · Quản lý phòng máy',
    agency: 'Bộ phận Quản lý & Trợ lý TT HTCĐ Xã Long Hồ',
  },
  {
    username: 'ketoan_longho',
    passwords: ['123456', 'longho2026'],
    fullName: 'Đ/c Nguyễn Thị Mỹ Trang',
    roleTitle: 'Kế toán TTHTCĐ · Kế toán VP HĐND & UBND',
    agency: 'Bộ phận Quản lý & Trợ lý TT HTCĐ Xã Long Hồ',
  }
];

export const storageService = {
  // Admin Session & Authentication
  getAdminSession: (): AdminUser | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
      if (!data) return null;
      return JSON.parse(data);
    } catch {
      return null;
    }
  },

  setAdminSession: (user: AdminUser | null) => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
      }
    } catch (e) {
      console.error('Error saving admin session', e);
    }
  },

  verifyAdminCredentials: (username: string, password: string): { success: boolean; user?: AdminUser; error?: string } => {
    const trimmedUser = username.trim().toLowerCase();
    const trimmedPass = password.trim();

    const matched = VALID_ADMINS.find(
      (a) => a.username.toLowerCase() === trimmedUser && a.passwords.includes(trimmedPass)
    );

    if (matched) {
      const adminUser: AdminUser = {
        username: matched.username,
        fullName: matched.fullName,
        roleTitle: matched.roleTitle,
        agency: matched.agency,
        loginAt: new Date().toISOString(),
      };
      storageService.setAdminSession(adminUser);
      return { success: true, user: adminUser };
    }

    return { 
      success: false, 
      error: 'Tài khoản hoặc mật khẩu quản trị không chính xác. Vui lòng kiểm tra lại.' 
    };
  },

  logoutAdmin: () => {
    storageService.setAdminSession(null);
  },
  // Documents
  getDocuments: (): DocumentItem[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(INITIAL_DOCUMENTS));
        return INITIAL_DOCUMENTS;
      }
      const existing: DocumentItem[] = JSON.parse(data);
      const existingIds = new Set(existing.map(d => d.id));
      const missing = INITIAL_DOCUMENTS.filter(d => !existingIds.has(d.id));
      if (missing.length > 0) {
        const merged = [...missing, ...existing];
        localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(merged));
        return merged;
      }
      return existing;
    } catch {
      return INITIAL_DOCUMENTS;
    }
  },

  saveDocuments: (docs: DocumentItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(docs));
    } catch (e) {
      console.error('Error saving documents', e);
    }
  },

  addDocument: (doc: DocumentItem): DocumentItem[] => {
    const list = storageService.getDocuments();
    const updated = [doc, ...list];
    storageService.saveDocuments(updated);
    return updated;
  },

  updateDocument: (doc: DocumentItem): DocumentItem[] => {
    const list = storageService.getDocuments();
    const updated = list.map(item => item.id === doc.id ? doc : item);
    storageService.saveDocuments(updated);
    return updated;
  },

  deleteDocument: (id: string): DocumentItem[] => {
    const list = storageService.getDocuments();
    const updated = list.filter(item => item.id !== id);
    storageService.saveDocuments(updated);
    return updated;
  },

  incrementDocViews: (id: string) => {
    const list = storageService.getDocuments();
    const updated = list.map(item => {
      if (item.id === id) {
        return { ...item, views: (item.views || 0) + 1 };
      }
      return item;
    });
    storageService.saveDocuments(updated);
  },

  incrementDocDownloads: (id: string) => {
    const list = storageService.getDocuments();
    const updated = list.map(item => {
      if (item.id === id) {
        return { ...item, downloadCount: (item.downloadCount || 0) + 1 };
      }
      return item;
    });
    storageService.saveDocuments(updated);
  },

  // Announcements
  getAnnouncements: (): AnnouncementItem[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(INITIAL_ANNOUNCEMENTS));
        return INITIAL_ANNOUNCEMENTS;
      }
      const existing: AnnouncementItem[] = JSON.parse(data);
      const existingIds = new Set(existing.map(a => a.id));
      const missing = INITIAL_ANNOUNCEMENTS.filter(a => !existingIds.has(a.id));
      if (missing.length > 0) {
        const merged = [...missing, ...existing];
        localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(merged));
        return merged;
      }
      return existing;
    } catch {
      return INITIAL_ANNOUNCEMENTS;
    }
  },

  saveAnnouncements: (items: AnnouncementItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving announcements', e);
    }
  },

  addAnnouncement: (item: AnnouncementItem): AnnouncementItem[] => {
    const list = storageService.getAnnouncements();
    const updated = [item, ...list];
    storageService.saveAnnouncements(updated);
    return updated;
  },

  deleteAnnouncement: (id: string): AnnouncementItem[] => {
    const list = storageService.getAnnouncements();
    const updated = list.filter(item => item.id !== id);
    storageService.saveAnnouncements(updated);
    return updated;
  },

  // Classes
  getClasses: (): ClassScheduleItem[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CLASSES);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(INITIAL_CLASSES));
        return INITIAL_CLASSES;
      }
      const existing: ClassScheduleItem[] = JSON.parse(data);
      const existingIds = new Set(existing.map(c => c.id));
      const missing = INITIAL_CLASSES.filter(c => !existingIds.has(c.id));
      if (missing.length > 0) {
        const merged = [...missing, ...existing];
        localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(merged));
        return merged;
      }
      return existing;
    } catch {
      return INITIAL_CLASSES;
    }
  },

  saveClasses: (items: ClassScheduleItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving classes', e);
    }
  },

  addClass: (item: ClassScheduleItem): ClassScheduleItem[] => {
    const list = storageService.getClasses();
    const updated = [item, ...list];
    storageService.saveClasses(updated);
    return updated;
  },

  updateClass: (item: ClassScheduleItem): ClassScheduleItem[] => {
    const list = storageService.getClasses();
    const updated = list.map(c => c.id === item.id ? item : c);
    storageService.saveClasses(updated);
    return updated;
  },

  deleteClass: (id: string): ClassScheduleItem[] => {
    const list = storageService.getClasses();
    const updated = list.filter(item => item.id !== id);
    storageService.saveClasses(updated);
    return updated;
  },

  // Registrations
  getRegistrations: (): RegistrationItem[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(INITIAL_REGISTRATIONS));
        return INITIAL_REGISTRATIONS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_REGISTRATIONS;
    }
  },

  addRegistration: (reg: RegistrationItem): { registrations: RegistrationItem[]; classes: ClassScheduleItem[] } => {
    const currentRegs = storageService.getRegistrations();
    const updatedRegs = [reg, ...currentRegs];
    try {
      localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(updatedRegs));
    } catch (e) {
      console.error(e);
    }

    // Increment class registration count
    const currentClasses = storageService.getClasses();
    const updatedClasses = currentClasses.map(c => {
      if (c.id === reg.classId) {
        return { ...c, registeredCount: Math.min(c.capacity, c.registeredCount + 1) };
      }
      return c;
    });
    storageService.saveClasses(updatedClasses);

    return { registrations: updatedRegs, classes: updatedClasses };
  },

  // Staff Members
  getStaff: (): StaffMember[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STAFF);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(INITIAL_STAFF_MEMBERS));
        return INITIAL_STAFF_MEMBERS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_STAFF_MEMBERS;
    }
  },

  // Citizen Feedback / Ý kiến
  getFeedback: (): FeedbackItem[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FEEDBACK);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(INITIAL_FEEDBACK));
        return INITIAL_FEEDBACK;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_FEEDBACK;
    }
  },

  addFeedback: (item: FeedbackItem): FeedbackItem[] => {
    const current = storageService.getFeedback();
    const updated = [item, ...current];
    try {
      localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving feedback', e);
    }
    return updated;
  },

  replyFeedback: (feedbackId: string, reply: FeedbackOfficialResponse): FeedbackItem[] => {
    const current = storageService.getFeedback();
    const updated = current.map(f => {
      if (f.id === feedbackId) {
        return {
          ...f,
          status: 'da_tra_loi' as const,
          officialResponse: reply
        };
      }
      return f;
    });
    try {
      localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(updated));
    } catch (e) {
      console.error('Error updating feedback reply', e);
    }
    return updated;
  },

  deleteFeedback: (feedbackId: string): FeedbackItem[] => {
    const current = storageService.getFeedback();
    const updated = current.filter(f => f.id !== feedbackId);
    try {
      localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(updated));
    } catch (e) {
      console.error('Error deleting feedback', e);
    }
    return updated;
  },

  // Reset to initial sample data
  resetAllData: () => {
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(INITIAL_DOCUMENTS));
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(INITIAL_ANNOUNCEMENTS));
    localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(INITIAL_CLASSES));
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(INITIAL_REGISTRATIONS));
    localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(INITIAL_STAFF_MEMBERS));
    localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(INITIAL_FEEDBACK));
  }
};

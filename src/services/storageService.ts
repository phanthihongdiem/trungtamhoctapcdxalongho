import { 
  DocumentItem, 
  AnnouncementItem, 
  ClassScheduleItem, 
  RegistrationItem,
  AdminUser
} from '../types';
import { 
  INITIAL_DOCUMENTS, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_CLASSES, 
  INITIAL_REGISTRATIONS 
} from '../data/initialData';

const STORAGE_KEYS = {
  DOCUMENTS: 'longho_learning_center_documents_v1',
  ANNOUNCEMENTS: 'longho_learning_center_announcements_v1',
  CLASSES: 'longho_learning_center_classes_v1',
  REGISTRATIONS: 'longho_learning_center_registrations_v1',
  ADMIN_SESSION: 'longho_learning_center_admin_session_v1',
};

const VALID_ADMINS = [
  {
    username: 'admin',
    passwords: ['123456', 'longho2026', 'admin123'],
    fullName: 'Đ/c Nguyễn Văn Hùng',
    roleTitle: 'Phó Chủ tịch UBND Xã kiêm Giám đốc TT HTCĐ',
    agency: 'Ban Giám đốc TT HTCĐ Xã Long Hồ',
  },
  {
    username: 'bql_longho',
    passwords: ['123456', 'longho2026'],
    fullName: 'Đ/c Lê Thị Tuyết Nga',
    roleTitle: 'Cán bộ Thường trực Phụ trách Học tập',
    agency: 'Bộ phận Văn hóa - Xã hội & TT HTCĐ',
  },
  {
    username: 'chuyendoiso',
    passwords: ['123456', 'longho2026'],
    fullName: 'Đ/c Phan Minh Trí',
    roleTitle: 'Tổ trưởng Tổ Công nghệ Số Cộng đồng',
    agency: 'Đoàn Thanh niên & Tổ CĐS Xã Long Hồ',
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

  // Reset to initial sample data
  resetAllData: () => {
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(INITIAL_DOCUMENTS));
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(INITIAL_ANNOUNCEMENTS));
    localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(INITIAL_CLASSES));
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(INITIAL_REGISTRATIONS));
  }
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  DocumentItem, 
  AnnouncementItem, 
  ClassScheduleItem, 
  RegistrationItem, 
  MainNavTab, 
  UserRole 
} from './types';
import { storageService } from './services/storageService';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { OverviewSection } from './components/OverviewSection';
import { DocumentLibrary } from './components/DocumentLibrary';
import { DocumentModal } from './components/DocumentModal';
import { UploadDocumentModal } from './components/UploadDocumentModal';
import { AnnouncementsView } from './components/AnnouncementsView';
import { ScheduleView } from './components/ScheduleView';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { Footer } from './components/Footer';

export default function App() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [classes, setClasses] = useState<ClassScheduleItem[]>([]);
  const [registrations, setRegistrations] = useState<RegistrationItem[]>([]);
  
  const [activeTab, setActiveTab] = useState<MainNavTab>('overview');
  const [userRole, setUserRole] = useState<UserRole>('citizen');
  
  const [activeDocument, setActiveDocument] = useState<DocumentItem | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState('');
  const [highlightClassId, setHighlightClassId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load data on mount
  useEffect(() => {
    setDocuments(storageService.getDocuments());
    setAnnouncements(storageService.getAnnouncements());
    setClasses(storageService.getClasses());
    setRegistrations(storageService.getRegistrations());
  }, []);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  }, []);

  // Global Keyboard Shortcut: Ctrl+K / Cmd+K / /
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers for Documents
  const handleOpenDocument = (doc: DocumentItem) => {
    storageService.incrementDocViews(doc.id);
    setDocuments((prev) =>
      prev.map((d) => (d.id === doc.id ? { ...d, views: d.views + 1 } : d))
    );
    setActiveDocument(doc);
  };

  const handleDownloadDocument = (doc: DocumentItem) => {
    storageService.incrementDocDownloads(doc.id);
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === doc.id ? { ...d, downloadCount: d.downloadCount + 1 } : d
      )
    );

    // Generate downloadable text content representing the official document
    const fileContent = `===============================================================
CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc
---------------------------------------------------------------
TRUNG TÂM HỌC TẬP CỘNG ĐỒNG XÃ LONG HỒ
Địa chỉ: Đường số 3, TT. Hành chính Xã Long Hồ, Tỉnh Vĩnh Long
Điện thoại: 0270.3852.114

SỐ HIỆU: ${doc.codeNumber}
CHUYÊN MỤC: ${doc.categoryLabel}
NGÀY BAN HÀNH: ${doc.publishDate}
CƠ QUAN / ĐƠN VỊ: ${doc.issuer}
TÁC GIẢ BIÊN SOẠN: ${doc.author}
ĐỐI TƯỢNG PHỤC VỤ: ${doc.targetAudience}

TIÊU ĐỀ TÀI LIỆU:
${doc.title.toUpperCase()}
===============================================================

I. TÓM TẮT NỘI DUNG:
${doc.summary}

II. CÁC NỘI DUNG CỐT LÕI CẦN NẮM RÕ:
${(doc.keyTakeaways || []).map((t, i) => `${i + 1}. ${t}`).join('\n')}

III. TOÀN VĂN TÀI LIỆU HỌC TẬP:
${doc.content}

---------------------------------------------------------------
Tài liệu số hóa lưu trữ tại Cổng TTĐT Trung tâm HTCĐ Xã Long Hồ
Trân trọng phục vụ việc học tập suốt đời của bà con nhân dân.
===============================================================`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = doc.fileName || `${doc.title}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(`Đã bắt đầu tải về tệp: ${doc.fileName}`);
  };

  const handleAddDocument = (newDoc: DocumentItem) => {
    const updated = storageService.addDocument(newDoc);
    setDocuments(updated);
    showToast(`Đã đưa tài liệu "${newDoc.title}" lên web thành công!`);
  };

  const handleTogglePinDocument = (id: string) => {
    const doc = documents.find((d) => d.id === id);
    if (!doc) return;
    const updatedDoc = { ...doc, isPinned: !doc.isPinned };
    const updated = storageService.updateDocument(updatedDoc);
    setDocuments(updated);
    showToast(updatedDoc.isPinned ? 'Đã ghim tài liệu lên đầu' : 'Đã gỡ ghim tài liệu');
  };

  const handleDeleteDocument = (id: string) => {
    const updated = storageService.deleteDocument(id);
    setDocuments(updated);
    showToast('Đã xóa tài liệu khỏi danh mục.');
  };

  // Handlers for Announcements
  const handleAddAnnouncement = (newNotice: AnnouncementItem) => {
    const updated = storageService.addAnnouncement(newNotice);
    setAnnouncements(updated);
    showToast('Đã đăng thông báo mới lên website.');
  };

  const handleDeleteAnnouncement = (id: string) => {
    const updated = storageService.deleteAnnouncement(id);
    setAnnouncements(updated);
    showToast('Đã xóa thông báo.');
  };

  // Handlers for Classes
  const handleAddClass = (newClass: ClassScheduleItem) => {
    const updated = storageService.addClass(newClass);
    setClasses(updated);
    showToast(`Đã thêm lớp học "${newClass.title}" vào lịch.`);
  };

  const handleDeleteClass = (id: string) => {
    const updated = storageService.deleteClass(id);
    setClasses(updated);
    showToast('Đã xóa lớp học khỏi lịch đào tạo.');
  };

  const handleRegisterCitizen = (reg: RegistrationItem) => {
    const result = storageService.addRegistration(reg);
    setRegistrations(result.registrations);
    setClasses(result.classes);
    showToast(`Đăng ký thành công cho học viên: ${reg.fullName}!`);
  };

  // Reset Data to sample
  const handleResetData = () => {
    if (window.confirm('Quý cán bộ có chắc muốn khôi phục lại toàn bộ dữ liệu mẫu chuẩn của Xã Long Hồ?')) {
      storageService.resetAllData();
      setDocuments(storageService.getDocuments());
      setAnnouncements(storageService.getAnnouncements());
      setClasses(storageService.getClasses());
      setRegistrations(storageService.getRegistrations());
      showToast('Đã khôi phục dữ liệu mẫu ban đầu thành công!');
    }
  };

  // Navigation Helpers
  const handleJumpToClass = (classId: string) => {
    setActiveTab('schedules');
    setHighlightClassId(classId);
    setTimeout(() => {
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }, 100);
  };

  const handleJumpToDoc = (docId: string) => {
    const doc = documents.find((d) => d.id === docId);
    if (doc) {
      handleOpenDocument(doc);
    }
  };

  const handleHeroSearch = (query: string) => {
    setSearchInitialQuery(query);
    setActiveTab('documents');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-stone-900 selection:bg-amber-200 selection:text-amber-950 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white border border-stone-700 px-4 py-3 rounded-lg shadow-xl text-xs sm:text-sm font-medium flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        userRole={userRole}
        onToggleUserRole={() => {
          const nextRole = userRole === 'citizen' ? 'admin' : 'citizen';
          setUserRole(nextRole);
          showToast(
            nextRole === 'admin'
              ? 'Đã chuyển sang chế độ Ban Quản lý (Được phép thêm, sửa, xóa, ghim tài liệu)'
              : 'Đã chuyển sang chế độ Học viên & Người dân'
          );
        }}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenUploadModal={() => setIsUploadModalOpen(true)}
        pendingNoticeCount={announcements.filter((a) => a.priority === 'urgent').length}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {/* Hero is shown on Overview or can be toggled */}
        {activeTab === 'overview' && (
          <>
            <HeroBanner
              onSelectTab={setActiveTab}
              onOpenUpload={() => setIsUploadModalOpen(true)}
              onSearchSubmit={handleHeroSearch}
              totalDocuments={documents.length}
              totalClasses={classes.length}
              totalRegistrations={registrations.length}
            />

            <OverviewSection
              documents={documents}
              announcements={announcements}
              classes={classes}
              onSelectTab={setActiveTab}
              onOpenDocument={handleOpenDocument}
              onDownloadDocument={handleDownloadDocument}
              onSelectAnnouncement={(ann) => {
                setActiveTab('announcements');
              }}
              onSelectClass={(cls) => {
                handleJumpToClass(cls.id);
              }}
            />
          </>
        )}

        {activeTab === 'documents' && (
          <DocumentLibrary
            documents={documents}
            userRole={userRole}
            onOpenDocument={handleOpenDocument}
            onDownloadDocument={handleDownloadDocument}
            onOpenUploadModal={() => setIsUploadModalOpen(true)}
            onTogglePin={handleTogglePinDocument}
            onDeleteDocument={handleDeleteDocument}
            initialSearchQuery={searchInitialQuery}
          />
        )}

        {activeTab === 'announcements' && (
          <AnnouncementsView
            announcements={announcements}
            userRole={userRole}
            onAddAnnouncement={handleAddAnnouncement}
            onDeleteAnnouncement={handleDeleteAnnouncement}
            onSelectClassById={handleJumpToClass}
            onSelectDocById={handleJumpToDoc}
          />
        )}

        {activeTab === 'schedules' && (
          <ScheduleView
            classes={classes}
            registrations={registrations}
            userRole={userRole}
            onAddClass={handleAddClass}
            onDeleteClass={handleDeleteClass}
            onRegisterCitizen={handleRegisterCitizen}
            highlightClassId={highlightClassId}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onSelectTab={setActiveTab} onResetData={handleResetData} />

      {/* Modals */}
      {/* 1. Document Reader Modal */}
      <DocumentModal
        document={activeDocument}
        onClose={() => setActiveDocument(null)}
        onDownload={handleDownloadDocument}
      />

      {/* 2. Upload Document Modal */}
      <UploadDocumentModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onAddDocument={handleAddDocument}
      />

      {/* 3. Fast Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        documents={documents}
        announcements={announcements}
        classes={classes}
        onSelectDocument={handleOpenDocument}
        onSelectAnnouncement={(ann) => {
          setActiveTab('announcements');
        }}
        onSelectClass={(cls) => {
          handleJumpToClass(cls.id);
        }}
      />
    </div>
  );
}

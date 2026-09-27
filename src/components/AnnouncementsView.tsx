import React, { useState } from 'react';
import { AnnouncementItem, AnnouncementPriority, AnnouncementType, UserRole } from '../types';
import { 
  Bell, 
  PlusCircle, 
  Calendar, 
  Building2, 
  FileText, 
  Pin, 
  Trash2, 
  Download, 
  ExternalLink, 
  X, 
  AlertTriangle, 
  CheckCircle,
  Megaphone
} from 'lucide-react';

interface AnnouncementsViewProps {
  announcements: AnnouncementItem[];
  userRole: UserRole;
  onAddAnnouncement: (item: AnnouncementItem) => void;
  onDeleteAnnouncement: (id: string) => void;
  onSelectClassById: (classId: string) => void;
  onSelectDocById: (docId: string) => void;
}

export const AnnouncementsView: React.FC<AnnouncementsViewProps> = ({
  announcements,
  userRole,
  onAddAnnouncement,
  onDeleteAnnouncement,
  onSelectClassById,
  onSelectDocById,
}) => {
  const [selectedType, setSelectedType] = useState<'all' | AnnouncementType>('all');
  const [activeNoticeModal, setActiveNoticeModal] = useState<AnnouncementItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Notice Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCodeNumber, setNewCodeNumber] = useState(`TB-2026/LH-${Math.floor(10 + Math.random() * 90)}`);
  const [newType, setNewType] = useState<AnnouncementType>('chieu_sinh');
  const [newPriority, setNewPriority] = useState<AnnouncementPriority>('normal');
  const [newIssuer, setNewIssuer] = useState('Trung tâm Học tập Cộng đồng Xã Long Hồ');
  const [newSummary, setNewSummary] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newIsPinned, setNewIsPinned] = useState(false);

  const typeTabs: { id: 'all' | AnnouncementType; label: string }[] = [
    { id: 'all', label: 'Tất cả thông báo' },
    { id: 'chieu_sinh', label: 'Chiêu sinh lớp học' },
    { id: 'hoi_thao', label: 'Hội thảo khuyến nông' },
    { id: 'hoat_dong_chung', label: 'Hoạt động cộng đồng' },
    { id: 'chinh_sach', label: 'Chính sách & Khuyến học' },
  ];

  const filteredAnnouncements = announcements
    .filter((item) => selectedType === 'all' || item.type === selectedType)
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    });

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSummary.trim()) return;

    const typeLabels: Record<AnnouncementType, string> = {
      chieu_sinh: 'Chiêu sinh lớp học',
      hoi_thao: 'Hội thảo khuyến nông',
      hoat_dong_chung: 'Hoạt động cộng đồng',
      chinh_sach: 'Chính sách & Khuyến học',
    };

    const created: AnnouncementItem = {
      id: `ann-${Date.now()}`,
      title: newTitle.trim(),
      codeNumber: newCodeNumber.trim(),
      publishDate: new Date().toISOString().split('T')[0],
      priority: newPriority,
      type: newType,
      typeLabel: typeLabels[newType],
      issuer: newIssuer.trim(),
      summary: newSummary.trim(),
      content: newContent.trim() || newSummary.trim(),
      isPinned: newIsPinned,
    };

    onAddAnnouncement(created);
    setIsAddModalOpen(false);
    // Reset form
    setNewTitle('');
    setNewSummary('');
    setNewContent('');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            Bảng tin & Thông cáo chính thức
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Thông Báo Từ Trung Tâm & Ban Ngành Xã
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Thông tin chiêu sinh các lớp bồi dưỡng, lịch tập huấn khuyến nông và các hoạt động văn hóa học tập cộng đồng
          </p>
        </div>

        {userRole === 'admin' && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors shadow-xs whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Đăng thông báo mới</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="mt-6 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {typeTabs.map((tab) => {
          const isActive = selectedType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedType(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50/50'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Announcements List */}
      <div className="mt-6 space-y-4">
        {filteredAnnouncements.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500 text-sm">
            Hiện chưa có thông báo mới trong danh mục này.
          </div>
        ) : (
          filteredAnnouncements.map((notice) => (
            <div
              key={notice.id}
              className={`bg-white rounded-xl border p-5 transition-all duration-200 hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                notice.isPinned
                  ? 'border-blue-400 bg-blue-50/20'
                  : 'border-slate-200 hover:border-blue-300'
              }`}
            >
              <div className="space-y-2 flex-1">
                {/* Unboxed Metadata Line */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="font-mono text-blue-900 font-semibold">{notice.codeNumber}</span>
                  <span aria-hidden="true">·</span>
                  <span>{notice.typeLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{new Date(notice.publishDate).toLocaleDateString('vi-VN')}</span>
                  
                  {notice.priority === 'urgent' && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-red-700 font-semibold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-red-600" />
                        Khẩn cấp
                      </span>
                    </>
                  )}
                  {notice.priority === 'important' && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-800 font-semibold">
                        Quan trọng
                      </span>
                    </>
                  )}
                  {notice.isPinned && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-blue-700 font-semibold flex items-center gap-1">
                        <Pin className="w-3 h-3 fill-blue-700" />
                        Ghim
                      </span>
                    </>
                  )}
                </div>

                {/* Notice Title */}
                <h3
                  onClick={() => setActiveNoticeModal(notice)}
                  className="font-serif font-bold text-lg text-slate-900 hover:text-blue-600 transition-colors cursor-pointer leading-snug"
                >
                  {notice.title}
                </h3>

                {/* Summary */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-4xl line-clamp-2">
                  {notice.summary}
                </p>

                {/* Issuer */}
                <div className="text-[11px] text-slate-400">
                  Cơ quan phát hành: <span className="text-slate-600 font-medium">{notice.issuer}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                <button
                  onClick={() => setActiveNoticeModal(notice)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shadow-2xs"
                >
                  Xem chi tiết
                </button>

                {notice.relatedClassId && (
                  <button
                    onClick={() => onSelectClassById(notice.relatedClassId!)}
                    className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap"
                  >
                    Xem lớp học
                  </button>
                )}

                {userRole === 'admin' && (
                  <button
                    onClick={() => onDeleteAnnouncement(notice.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Xóa thông báo này"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Notice Detail Modal */}
      {activeNoticeModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div 
            className="relative w-full max-w-3xl bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white border-b border-blue-700">
              <div className="flex items-center gap-2 text-xs truncate">
                <span className="font-mono text-sky-300 font-semibold">{activeNoticeModal.codeNumber}</span>
                <span>/</span>
                <span>{activeNoticeModal.typeLabel}</span>
              </div>
              <button
                onClick={() => setActiveNoticeModal(null)}
                className="p-1 text-slate-300 hover:text-white rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 sm:p-8 bg-slate-50 space-y-6 flex-1">
              <div className="border-b border-slate-200 pb-4 text-center space-y-1">
                <div className="text-xs uppercase font-bold tracking-widest text-slate-500">
                  {activeNoticeModal.issuer}
                </div>
                <div className="text-xs text-slate-400">
                  Số: {activeNoticeModal.codeNumber} · Ngày {new Date(activeNoticeModal.publishDate).toLocaleDateString('vi-VN')}
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-slate-900 leading-tight">
                  {activeNoticeModal.title}
                </h2>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 leading-relaxed italic">
                {activeNoticeModal.summary}
              </div>

              <div className="space-y-4 text-slate-800 text-sm whitespace-pre-line leading-relaxed font-sans border-t border-slate-200 pt-4">
                {activeNoticeModal.content}
              </div>

              {/* Attachments */}
              {activeNoticeModal.attachments && activeNoticeModal.attachments.length > 0 && (
                <div className="pt-4 border-t border-slate-200 space-y-2">
                  <div className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                    Tệp đính kèm văn bản:
                  </div>
                  <div className="space-y-1.5">
                    {activeNoticeModal.attachments.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-lg text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span className="font-medium text-slate-800">{file.name}</span>
                          <span className="text-slate-400">({file.size})</span>
                        </div>
                        <button
                          onClick={() => alert(`Đang tải tệp: ${file.name}`)}
                          className="text-blue-700 hover:underline font-semibold flex items-center gap-1"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Tải về
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                Ủy ban Nhân dân Xã Long Hồ - Trung tâm Học tập Cộng đồng
              </div>
              <div className="flex items-center gap-2">
                {activeNoticeModal.relatedClassId && (
                  <button
                    onClick={() => {
                      const cid = activeNoticeModal.relatedClassId!;
                      setActiveNoticeModal(null);
                      onSelectClassById(cid);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold"
                  >
                    Đăng ký lớp học liên quan
                  </button>
                )}
                <button
                  onClick={() => setActiveNoticeModal(null)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-semibold"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Add Notice Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div 
            className="relative w-full max-w-2xl bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white border-b border-blue-700">
              <div className="font-serif font-bold text-base">
                Tạo Thông Báo Mới Lên Bảng Tin Cổng Thông Tin
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNotice} className="p-6 space-y-4 overflow-y-auto flex-1 bg-slate-50">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tiêu đề thông báo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ví dụ: Chiêu sinh lớp nghề may công nghiệp..."
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Số hiệu thông báo
                  </label>
                  <input
                    type="text"
                    value={newCodeNumber}
                    onChange={(e) => setNewCodeNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Loại thông báo
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as AnnouncementType)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                  >
                    <option value="chieu_sinh">Chiêu sinh lớp học</option>
                    <option value="hoi_thao">Hội thảo khuyến nông</option>
                    <option value="hoat_dong_chung">Hoạt động cộng đồng</option>
                    <option value="chinh_sach">Chính sách & Khuyến học</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mức độ ưu tiên
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as AnnouncementPriority)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                  >
                    <option value="normal">Thông thường</option>
                    <option value="important">Quan trọng</option>
                    <option value="urgent">Khẩn cấp</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Đơn vị phát hành
                  </label>
                  <input
                    type="text"
                    value={newIssuer}
                    onChange={(e) => setNewIssuer(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tóm tắt nội dung <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nội dung đầy đủ văn bản thông báo
                </label>
                <textarea
                  rows={5}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="pinNoticeCheckbox"
                  checked={newIsPinned}
                  onChange={(e) => setNewIsPinned(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <label htmlFor="pinNoticeCheckbox" className="text-xs text-slate-700 font-medium">
                  Ghim thông báo lên đầu danh sách
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs"
                >
                  Đăng thông báo lên web
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

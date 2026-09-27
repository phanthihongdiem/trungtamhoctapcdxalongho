import React, { useState, useEffect, useRef } from 'react';
import { DocumentItem, AnnouncementItem, ClassScheduleItem } from '../types';
import { Search, X, FileText, Bell, Calendar, ArrowRight } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  documents: DocumentItem[];
  announcements: AnnouncementItem[];
  classes: ClassScheduleItem[];
  onSelectDocument: (doc: DocumentItem) => void;
  onSelectAnnouncement: (ann: AnnouncementItem) => void;
  onSelectClass: (cls: ClassScheduleItem) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  documents,
  announcements,
  classes,
  onSelectDocument,
  onSelectAnnouncement,
  onSelectClass,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard shortcut ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchedDocs = q
    ? documents.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.summary.toLowerCase().includes(q) ||
          d.codeNumber.toLowerCase().includes(q) ||
          d.author.toLowerCase().includes(q)
      )
    : [];

  const matchedAnnouncements = q
    ? announcements.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.codeNumber.toLowerCase().includes(q)
      )
    : [];

  const matchedClasses = q
    ? classes.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.instructor.toLowerCase().includes(q) ||
          c.venue.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
      )
    : [];

  const totalResults = matchedDocs.length + matchedAnnouncements.length + matchedClasses.length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 p-3 sm:p-4 animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white text-stone-900 rounded-xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-200 bg-stone-50 flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Gõ từ khóa cần tra cứu: bưởi, VNeID, đan đát, lịch học, tiêm chủng..."
            className="w-full bg-transparent text-sm sm:text-base text-stone-900 placeholder-stone-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-700 text-xs px-2"
            >
              Xóa
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="overflow-y-auto p-4 space-y-6 flex-1 bg-white text-xs">
          {!q ? (
            <div className="text-center py-10 text-stone-400 space-y-2">
              <p>Nhập từ khóa bất kỳ để tra cứu nhanh toàn bộ cổng thông tin.</p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <span className="text-stone-500 font-medium">Gợi ý tìm kiếm:</span>
                {['Bưởi da xanh', 'VNeID', 'Đất đai', 'Nghề lục bình', 'Tin học'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-2 py-1 bg-stone-100 hover:bg-stone-200 rounded text-stone-700"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-12 text-stone-500">
              Không tìm thấy kết quả nào cho "<strong>{query}</strong>". Bà con vui lòng thử từ khóa khác.
            </div>
          ) : (
            <>
              {/* Matched Documents */}
              {matchedDocs.length > 0 && (
                <div className="space-y-2">
                  <div className="font-semibold text-stone-500 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-amber-700" />
                    <span>Tài liệu học tập ({matchedDocs.length})</span>
                  </div>
                  <div className="space-y-1">
                    {matchedDocs.map((doc) => (
                      <div
                        key={doc.id}
                        onClick={() => {
                          onSelectDocument(doc);
                          onClose();
                        }}
                        className="p-2.5 rounded-lg border border-stone-100 hover:border-amber-400 hover:bg-amber-50/40 cursor-pointer transition-colors flex items-center justify-between"
                      >
                        <div>
                          <div className="font-semibold text-stone-900">{doc.title}</div>
                          <div className="text-stone-500 text-[11px] truncate max-w-lg">
                            {doc.codeNumber} · {doc.issuer} · {doc.categoryLabel}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Classes */}
              {matchedClasses.length > 0 && (
                <div className="space-y-2">
                  <div className="font-semibold text-stone-500 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Lớp học & Khóa bồi dưỡng ({matchedClasses.length})</span>
                  </div>
                  <div className="space-y-1">
                    {matchedClasses.map((cls) => (
                      <div
                        key={cls.id}
                        onClick={() => {
                          onSelectClass(cls);
                          onClose();
                        }}
                        className="p-2.5 rounded-lg border border-stone-100 hover:border-emerald-400 hover:bg-emerald-50/40 cursor-pointer transition-colors flex items-center justify-between"
                      >
                        <div>
                          <div className="font-semibold text-stone-900">{cls.title}</div>
                          <div className="text-stone-500 text-[11px]">
                            {cls.timeSlot} · {cls.venue} · {cls.instructor}
                          </div>
                        </div>
                        <span className="text-[11px] font-semibold text-emerald-800 shrink-0">
                          Xem lịch học
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Announcements */}
              {matchedAnnouncements.length > 0 && (
                <div className="space-y-2">
                  <div className="font-semibold text-stone-500 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Bell className="w-3.5 h-3.5 text-blue-700" />
                    <span>Thông báo chính thức ({matchedAnnouncements.length})</span>
                  </div>
                  <div className="space-y-1">
                    {matchedAnnouncements.map((ann) => (
                      <div
                        key={ann.id}
                        onClick={() => {
                          onSelectAnnouncement(ann);
                          onClose();
                        }}
                        className="p-2.5 rounded-lg border border-stone-100 hover:border-blue-400 hover:bg-blue-50/40 cursor-pointer transition-colors flex items-center justify-between"
                      >
                        <div>
                          <div className="font-semibold text-stone-900">{ann.title}</div>
                          <div className="text-stone-500 text-[11px] truncate max-w-lg">
                            {ann.codeNumber} · {ann.issuer}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-stone-100 border-t border-stone-200 text-stone-500 text-[11px] flex items-center justify-between">
          <span>Nhấn ESC để đóng cửa sổ tra cứu</span>
          <span>Trung tâm Học tập Cộng đồng Xã Long Hồ</span>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { DocumentItem, DocumentCategory, UserRole } from '../types';
import { 
  Search, 
  Filter, 
  FileText, 
  Download, 
  Eye, 
  PlusCircle, 
  Pin, 
  Trash2, 
  Building2, 
  Calendar,
  FileCheck2,
  ArrowUpDown,
  BookOpen,
  Lock
} from 'lucide-react';

interface DocumentLibraryProps {
  documents: DocumentItem[];
  userRole: UserRole;
  isAdmin: boolean;
  onRequestAdminLogin: () => void;
  onOpenDocument: (doc: DocumentItem) => void;
  onDownloadDocument: (doc: DocumentItem) => void;
  onOpenUploadModal: () => void;
  onTogglePin: (id: string) => void;
  onDeleteDocument: (id: string) => void;
  initialSearchQuery?: string;
}

export const DocumentLibrary: React.FC<DocumentLibraryProps> = ({
  documents,
  userRole,
  isAdmin,
  onRequestAdminLogin,
  onOpenDocument,
  onDownloadDocument,
  onOpenUploadModal,
  onTogglePin,
  onDeleteDocument,
  initialSearchQuery = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory>('all');
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [sortBy, setSortBy] = useState<'date' | 'views' | 'downloads'>('date');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleUploadTrigger = () => {
    if (!isAdmin) {
      onRequestAdminLogin();
    } else {
      onOpenUploadModal();
    }
  };

  const categories: { id: DocumentCategory; label: string }[] = [
    { id: 'all', label: 'Tất cả tài liệu' },
    { id: 'nong_nghiep', label: 'Nông nghiệp & Khuyến nông' },
    { id: 'chuyen_doi_so', label: 'Chuyển đổi số & Dịch vụ công' },
    { id: 'phap_luat', label: 'Chính sách & Pháp luật' },
    { id: 'y_te_suc_khoe', label: 'Y tế & Sức khỏe' },
    { id: 'nghe_nong_thon', label: 'Nghề thủ công & Khởi nghiệp' },
    { id: 'giao_duc_khac', label: 'Giáo dục thường xuyên' },
  ];

  // Filter & Sort
  const filteredDocuments = useMemo(() => {
    return documents
      .filter((doc) => {
        const matchesCategory =
          selectedCategory === 'all' || doc.category === selectedCategory;
        const matchesQuery =
          !searchQuery.trim() ||
          doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.codeNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.issuer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        // Pinned documents on top first
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;

        if (sortBy === 'views') {
          return b.views - a.views;
        }
        if (sortBy === 'downloads') {
          return b.downloadCount - a.downloadCount;
        }
        // Default sort by date
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      });
  }, [documents, selectedCategory, searchQuery, sortBy]);

  const handleDelete = (id: string) => {
    onDeleteDocument(id);
    setDeleteConfirmId(null);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            Kho tri thức số cộng đồng
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Quản Lý & Tra Cứu Tài Liệu Học Tập
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Toàn bộ tài liệu, giáo trình tập huấn và sổ tay hướng dẫn phục vụ bà con xã Long Hồ tải về miễn phí
          </p>
        </div>

        {/* Upload Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleUploadTrigger}
            title={isAdmin ? 'Đưa tài liệu mới lên web' : 'Chỉ tài khoản quản trị mới có quyền đưa tài liệu lên'}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors shadow-xs whitespace-nowrap border ${
              isAdmin
                ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
                : 'bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border-slate-300'
            }`}
          >
            {isAdmin ? (
              <PlusCircle className="w-4 h-4 text-white" />
            ) : (
              <Lock className="w-4 h-4 text-blue-600" />
            )}
            <span>Đưa tài liệu mới lên web {isAdmin ? '' : '(Dành cho Quản trị)'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Filter Tabs & Controls */}
      <div className="mt-6 space-y-4">
        {/* Category Segmented Control */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50/50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search & Sort Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-2 bg-slate-100/90 rounded-xl border border-slate-200">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm theo tên tài liệu, tác giả, cơ quan ban hành, số hiệu..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-slate-900"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-700 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            <span>Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'views' | 'downloads')}
              className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="date">Mới phát hành nhất</option>
              <option value="views">Lượt xem nhiều nhất</option>
              <option value="downloads">Lượt tải nhiều nhất</option>
            </select>
          </div>
        </div>
      </div>

      {/* Admin Quick Banner */}
      {isAdmin && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-950 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-blue-600" />
            <span>
              <strong>Chế độ Ban Quản lý:</strong> Quý cán bộ có thể ghim văn bản ưu tiên, xóa tài liệu hết hiệu lực, hoặc đưa tài liệu mới lên website.
            </span>
          </div>
          <button
            onClick={handleUploadTrigger}
            className="text-blue-700 underline font-semibold hover:text-blue-900 shrink-0"
          >
            + Tải lên ngay
          </button>
        </div>
      )}

      {/* Document Grid */}
      <div className="mt-6">
        {filteredDocuments.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200 p-8 space-y-3">
            <FileText className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-serif font-bold text-lg text-slate-800">
              Không tìm thấy tài liệu phù hợp
            </h3>
            <p className="text-slate-500 text-xs max-w-md mx-auto">
              Không có tài liệu nào khớp với từ khóa "{searchQuery}" trong chuyên mục đã chọn. Bà con vui lòng thử từ khóa khác hoặc nhấn xem tất cả.
            </p>
            <div className="pt-2 flex items-center justify-center gap-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-3 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-medium hover:bg-slate-900 transition-colors"
              >
                Xóa bộ lọc tra cứu
              </button>
              <button
                onClick={handleUploadTrigger}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors"
              >
                Đưa tài liệu mới lên
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className={`bg-white rounded-xl border transition-all duration-200 hover:shadow-md flex flex-col justify-between overflow-hidden ${
                  doc.isPinned
                    ? 'border-blue-400 bg-blue-50/20'
                    : 'border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className="p-5 space-y-3">
                  {/* Clean Unboxed Metadata Line */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="font-mono font-semibold text-blue-900">{doc.codeNumber}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{doc.categoryLabel}</span>
                    </div>

                    {doc.isPinned && (
                      <span className="flex items-center gap-1 text-blue-700 font-semibold shrink-0">
                        <Pin className="w-3 h-3 fill-blue-700" />
                        Ghim đầu trang
                      </span>
                    )}
                  </div>

                  {/* Title in High Legibility Heading */}
                  <h3
                    onClick={() => onOpenDocument(doc)}
                    className="font-serif font-bold text-base sm:text-lg text-slate-900 hover:text-blue-600 transition-colors cursor-pointer leading-snug line-clamp-2"
                  >
                    {doc.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                    {doc.summary}
                  </p>

                  {/* Issuing & File Spec metadata (Unboxed) */}
                  <div className="pt-2 border-t border-slate-100 space-y-1 text-[11px] text-slate-500">
                    <div className="flex items-center justify-between">
                      <span className="truncate">Cơ quan: {doc.issuer}</span>
                      <span className="shrink-0">{new Date(doc.publishDate).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Định dạng: {doc.fileFormat} ({doc.fileSize}) · {doc.pageCount} trang</span>
                      <span className="tabular-nums flex items-center gap-2">
                        <span>{doc.views} xem</span>
                        <span>·</span>
                        <span>{doc.downloadCount} tải</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Bottom Actions */}
                <div className="px-5 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenDocument(doc)}
                      className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shadow-2xs"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Đọc tài liệu</span>
                    </button>

                    <button
                      onClick={() => onDownloadDocument(doc)}
                      className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title={`Tải xuống ${doc.fileName}`}
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Admin controls */}
                  {isAdmin && (
                    <div className="flex items-center gap-1 border-l border-slate-200 pl-2">
                      <button
                        onClick={() => onTogglePin(doc.id)}
                        className={`p-1.5 rounded-md transition-colors ${
                          doc.isPinned
                            ? 'text-blue-700 hover:bg-blue-100'
                            : 'text-slate-400 hover:text-blue-700 hover:bg-blue-50'
                        }`}
                        title={doc.isPinned ? 'Bỏ ghim' : 'Ghim tài liệu'}
                      >
                        <Pin className="w-3.5 h-3.5" />
                      </button>

                      {deleteConfirmId === doc.id ? (
                        <div className="flex items-center gap-1 bg-red-50 p-0.5 rounded border border-red-200">
                          <button
                            onClick={() => handleDelete(doc.id)}
                            className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded font-bold"
                          >
                            Xóa
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="text-[10px] text-slate-600 px-1 py-0.5"
                          >
                            Hủy
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(doc.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Xóa tài liệu khỏi cổng"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { DocumentItem, DocumentCategory, AdminUser } from '../types';
import { 
  X, 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Paperclip,
  ShieldAlert,
  ShieldCheck,
  Lock
} from 'lucide-react';

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDocument: (doc: DocumentItem) => void;
  isAdmin: boolean;
  currentAdmin: AdminUser | null;
  onRequestLogin: () => void;
}

export const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({
  isOpen,
  onClose,
  onAddDocument,
  isAdmin,
  currentAdmin,
  onRequestLogin,
}) => {
  const [title, setTitle] = useState('');
  const [codeNumber, setCodeNumber] = useState(`TL-2026/LH-${Math.floor(100 + Math.random() * 900)}`);
  const [category, setCategory] = useState<Exclude<DocumentCategory, 'all'>>('nong_nghiep');
  const [issuer, setIssuer] = useState(currentAdmin?.agency || 'Trung tâm Học tập Cộng đồng Xã Long Hồ');
  const [author, setAuthor] = useState(currentAdmin?.fullName || '');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [targetAudience, setTargetAudience] = useState('Bà con nhân dân và đoàn thể xã Long Hồ');
  const [keyTakeawaysText, setKeyTakeawaysText] = useState('');
  const [fileFormat, setFileFormat] = useState<'PDF' | 'DOCX' | 'PPTX'>('PDF');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('2.4 MB');
  const [pageCount, setPageCount] = useState(12);
  const [isPinned, setIsPinned] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (currentAdmin) {
      if (!author) setAuthor(currentAdmin.fullName);
      if (!issuer || issuer === 'Trung tâm Học tập Cộng đồng Xã Long Hồ') {
        setIssuer(currentAdmin.agency);
      }
    }
  }, [currentAdmin]);

  if (!isOpen) return null;

  // ACCESS DENIED VIEW IF NOT LOGGED IN AS ADMIN
  if (!isAdmin) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
        <div 
          className="relative w-full max-w-lg bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col p-6 sm:p-8 text-center space-y-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto border border-red-100">
            <Lock className="w-7 h-7" />
          </div>

          <h3 className="font-serif font-bold text-xl text-slate-900">
            Yêu Cầu Quyền Quản Trị Viên
          </h3>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Chức năng <strong>đưa tài liệu và bài giảng lên cổng thông tin</strong> được bảo vệ và chỉ dành riêng cho tài khoản quản trị của <strong>Ban Quản lý Trung tâm Học tập Cộng đồng Xã Long Hồ</strong>.
          </p>

          <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-200 text-left space-y-1">
            <div>• Học viên & Người dân: Chỉ được quyền tra cứu, đọc và tải tài liệu miễn phí.</div>
            <div>• Quản trị viên: Có quyền kiểm duyệt, biên tập và xuất bản tài liệu mới.</div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                onClose();
                onRequestLogin();
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Đăng nhập tài khoản Quản trị</span>
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors border border-slate-200"
            >
              Đóng lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  const categoryLabels: Record<Exclude<DocumentCategory, 'all'>, string> = {
    nong_nghiep: 'Nông nghiệp & Khuyến nông',
    chuyen_doi_so: 'Chuyển đổi số & Dịch vụ công',
    phap_luat: 'Chính sách & Pháp luật',
    y_te_suc_khoe: 'Y tế & Sức khỏe cộng đồng',
    nghe_nong_thon: 'Nghề nông thôn & Khởi nghiệp',
    giao_duc_khac: 'Giáo dục thường xuyên & Khác',
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      setFileName(file.name);
      
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setFileSize(`${sizeMb} MB`);

      const ext = file.name.split('.').pop()?.toUpperCase();
      if (ext === 'PDF' || ext === 'DOCX' || ext === 'PPTX') {
        setFileFormat(ext as 'PDF' | 'DOCX' | 'PPTX');
      }

      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!title.trim()) {
      setErrorMessage('Vui lòng nhập tiêu đề tài liệu.');
      return;
    }
    if (!summary.trim()) {
      setErrorMessage('Vui lòng nhập tóm tắt ngắn về tài liệu để bà con dễ tra cứu.');
      return;
    }

    const takeaways = keyTakeawaysText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      title: title.trim(),
      codeNumber: codeNumber.trim(),
      category,
      categoryLabel: categoryLabels[category],
      issuer: issuer.trim() || currentAdmin?.agency || 'Trung tâm Học tập Cộng đồng Xã Long Hồ',
      author: author.trim() || currentAdmin?.fullName || 'Ban biên soạn TT HTCĐ',
      publishDate: new Date().toISOString().split('T')[0],
      summary: summary.trim(),
      content: content.trim() || summary.trim(),
      keyTakeaways: takeaways.length > 0 ? takeaways : [summary.trim()],
      fileFormat,
      fileSize: fileSize || '1.8 MB',
      pageCount: pageCount || 10,
      downloadCount: 0,
      views: 1,
      isPinned,
      targetAudience: targetAudience.trim() || 'Nhân dân địa phương',
      fileName: fileName || `${title.toLowerCase().replace(/\s+/g, '-')}.${fileFormat.toLowerCase()}`,
      isOfficialApproved: true,
    };

    onAddDocument(newDoc);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
      setTitle('');
      setSummary('');
      setContent('');
      setKeyTakeawaysText('');
      setUploadedFile(null);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Admin Privilege Badge */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#0c2f54] to-[#164e87] text-white border-b border-blue-900/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-sky-300">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif font-bold text-lg text-white">
                  Đưa Tài Liệu Lên Web
                </h2>
                <span className="px-2 py-0.5 bg-blue-400/20 border border-blue-300/30 text-blue-200 text-[10px] font-semibold rounded uppercase tracking-wider">
                  Quyền Quản Trị
                </span>
              </div>
              <p className="text-xs text-blue-200/80">
                Cán bộ quản trị: {currentAdmin?.fullName} ({currentAdmin?.roleTitle})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-blue-200/80 hover:text-white hover:bg-white/10 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1 bg-slate-50/50">
          {success && (
            <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-lg flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <div className="font-semibold text-sm">Đã đưa tài liệu lên web thành công!</div>
                <div className="text-xs text-emerald-700">Tài liệu đã được lưu vào kho lưu trữ số và sẵn sàng cho nhân dân tra cứu.</div>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form id="uploadDocForm" onSubmit={handleSubmit} className="space-y-5">
            {/* File Upload Zone */}
            <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-white p-5 rounded-lg text-center transition-colors">
              <input
                type="file"
                id="docFileInput"
                accept=".pdf,.docx,.doc,.pptx,.ppt"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="docFileInput" className="cursor-pointer block space-y-2">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-600">
                  <Paperclip className="w-6 h-6" />
                </div>
                <div className="text-sm font-semibold text-slate-800">
                  {uploadedFile ? (
                    <span className="text-blue-700 font-bold">Tệp đã chọn: {uploadedFile.name}</span>
                  ) : (
                    <span>Nhấp để chọn tệp tài liệu (PDF, Word, PowerPoint)</span>
                  )}
                </div>
                <div className="text-xs text-slate-500">
                  Hỗ trợ định dạng PDF, DOCX, dung lượng tối đa 50MB
                </div>
              </label>
            </div>

            {/* Title & Code */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tiêu đề tài liệu <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ví dụ: Kỹ thuật ghép bưởi da xanh vụ nghịch 2026..."
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mã / Số hiệu văn bản
                </label>
                <input
                  type="text"
                  value={codeNumber}
                  onChange={(e) => setCodeNumber(e.target.value)}
                  placeholder="TL-2026/NN-01"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Category & Issuing Body */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Lĩnh vực / Chuyên mục <span className="text-red-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Exclude<DocumentCategory, 'all'>)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                >
                  <option value="nong_nghiep">Nông nghiệp & Khuyến nông</option>
                  <option value="chuyen_doi_so">Chuyển đổi số & Dịch vụ công</option>
                  <option value="phap_luat">Chính sách & Pháp luật</option>
                  <option value="y_te_suc_khoe">Y tế & Sức khỏe cộng đồng</option>
                  <option value="nghe_nong_thon">Nghề nông thôn & Khởi nghiệp</option>
                  <option value="giao_duc_khac">Giáo dục thường xuyên & Khác</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Cơ quan ban hành / Phối hợp
                </label>
                <input
                  type="text"
                  value={issuer}
                  onChange={(e) => setIssuer(e.target.value)}
                  placeholder="UBND Xã, Hội Nông dân, Trạm Y tế..."
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Author & Target Audience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tác giả / Báo cáo viên biên soạn
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Ví dụ: Kỹ sư Võ Văn Kiệt..."
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Đối tượng phục vụ
                </label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="Ví dụ: Nhà vườn, phụ nữ nông nhàn, người cao tuổi..."
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Summary */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tóm tắt nội dung chính <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={2}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Tóm tắt ngắn 2-3 câu giúp bà con hiểu ngay nội dung và giá trị thực tế của tài liệu..."
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
              />
            </div>

            {/* Key takeaways */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Điểm cốt lõi cần nhớ (Mỗi dòng 1 ý)
              </label>
              <textarea
                rows={2}
                value={keyTakeawaysText}
                onChange={(e) => setKeyTakeawaysText(e.target.value)}
                placeholder="Ví dụ:&#10;• Xử lý ra hoa nghịch vụ bằng xiết nước&#10;• Sử dụng 100% túi bao trái sạch&#10;• Giảm 35% chi phí phân bón"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 font-sans"
              />
            </div>

            {/* Full text content */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nội dung chi tiết tài liệu học tập
              </label>
              <textarea
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Nhập hoặc dán nội dung đầy đủ của bài giảng, thông tư hoặc cẩm nang hướng dẫn..."
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 font-sans"
              />
            </div>

            {/* File format & Size details */}
            <div className="grid grid-cols-3 gap-3 p-3 bg-slate-100/90 rounded-md border border-slate-200 text-xs">
              <div>
                <label className="block font-medium text-slate-600 mb-1">Định dạng</label>
                <select
                  value={fileFormat}
                  onChange={(e) => setFileFormat(e.target.value as 'PDF' | 'DOCX' | 'PPTX')}
                  className="w-full p-1.5 bg-white border border-slate-300 rounded text-xs"
                >
                  <option value="PDF">PDF</option>
                  <option value="DOCX">DOCX (Word)</option>
                  <option value="PPTX">PPTX (PowerPoint)</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-600 mb-1">Số trang ước tính</label>
                <input
                  type="number"
                  min={1}
                  value={pageCount}
                  onChange={(e) => setPageCount(parseInt(e.target.value) || 1)}
                  className="w-full p-1.5 bg-white border border-slate-300 rounded text-xs"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-600 mb-1">Dung lượng tệp</label>
                <input
                  type="text"
                  value={fileSize}
                  onChange={(e) => setFileSize(e.target.value)}
                  className="w-full p-1.5 bg-white border border-slate-300 rounded text-xs"
                />
              </div>
            </div>

            {/* Pin to top */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="pinCheckbox"
                checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <label htmlFor="pinCheckbox" className="text-xs text-slate-700 font-medium cursor-pointer">
                Ghim tài liệu quan trọng lên đầu trang chủ để bà con tiện theo dõi
              </label>
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md text-xs font-semibold transition-colors border border-slate-200"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            form="uploadDocForm"
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Xuất bản tài liệu lên web</span>
          </button>
        </div>
      </div>
    </div>
  );
};


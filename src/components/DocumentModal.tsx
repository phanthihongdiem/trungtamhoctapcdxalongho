import React, { useState } from 'react';
import { DocumentItem } from '../types';
import { 
  X, 
  Download, 
  Printer, 
  Share2, 
  Eye, 
  FileText, 
  Calendar, 
  User, 
  Building2, 
  Check, 
  ZoomIn, 
  ZoomOut,
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface DocumentModalProps {
  document: DocumentItem | null;
  onClose: () => void;
  onDownload: (doc: DocumentItem) => void;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({
  document,
  onClose,
  onDownload,
}) => {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  if (!document) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-lg leading-relaxed';
      case 'xlarge':
        return 'text-xl leading-loose';
      default:
        return 'text-base leading-relaxed';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-stone-50 text-stone-900 rounded-xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-stone-900 text-stone-100 border-b border-stone-800">
          <div className="flex items-center gap-2 text-xs truncate max-w-md">
            <span className="font-mono text-amber-400 font-semibold">{document.codeNumber}</span>
            <span className="text-stone-500">/</span>
            <span className="truncate text-stone-300">{document.categoryLabel}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Font size adjustment for rural seniors */}
            <div className="hidden sm:flex items-center gap-1 bg-stone-800 rounded-md p-0.5 text-xs text-stone-300">
              <button 
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded ${fontSize === 'normal' ? 'bg-stone-700 text-white font-bold' : 'hover:text-white'}`}
                title="Cỡ chữ tiêu chuẩn"
              >
                A
              </button>
              <button 
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded ${fontSize === 'large' ? 'bg-stone-700 text-white font-bold' : 'hover:text-white'}`}
                title="Cỡ chữ vừa"
              >
                A+
              </button>
              <button 
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-1 rounded ${fontSize === 'xlarge' ? 'bg-stone-700 text-white font-bold' : 'hover:text-white'}`}
                title="Cỡ chữ lớn cho người cao tuổi"
              >
                A++
              </button>
            </div>

            <button
              onClick={() => onDownload(document)}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
              title="Tải tài liệu về máy"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tải về ({document.fileSize})</span>
            </button>

            <button
              onClick={handlePrint}
              className="p-1.5 text-stone-300 hover:text-white hover:bg-stone-800 rounded transition-colors"
              title="In văn bản"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={handleShare}
              className="p-1.5 text-stone-300 hover:text-white hover:bg-stone-800 rounded transition-colors"
              title="Sao chép liên kết"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded transition-colors ml-2"
              aria-label="Đóng cửa sổ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Content Canvas */}
        <div className="overflow-y-auto px-4 sm:px-8 lg:px-12 py-8 bg-[#fdfbf7] flex-1">
          {/* Official Document Emblem Header */}
          <div className="border-b border-stone-200 pb-6 mb-8 text-center space-y-2">
            <div className="text-xs uppercase font-semibold tracking-widest text-stone-600">
              CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </div>
            <div className="text-xs font-serif italic text-stone-600">
              Độc lập - Tự do - Hạnh phúc
            </div>
            <div className="w-24 h-0.5 bg-amber-700 mx-auto my-2" />
            <div className="text-xs text-stone-500 flex items-center justify-center gap-2 pt-1">
              <span>{document.issuer}</span>
              <span>·</span>
              <span>Long Hồ, ngày {new Date(document.publishDate).toLocaleDateString('vi-VN')}</span>
            </div>
          </div>

          {/* Document Title */}
          <div className="mb-6 space-y-3">
            <div className="text-xs font-medium text-amber-800 uppercase tracking-wider">
              {document.categoryLabel} · SỐ HIỆU: {document.codeNumber}
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
              {document.title}
            </h2>
            
            {/* Metadata Bar */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-stone-500 pt-2 border-t border-stone-200/60">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-stone-400" />
                {document.issuer}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-stone-400" />
                {document.author}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-stone-400" />
                {document.pageCount} trang ({document.fileFormat})
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-stone-400" />
                <span className="tabular-nums">{document.views} lượt xem</span>
              </span>
            </div>
          </div>

          {/* Executive Summary Card */}
          <div className="mb-8 p-4 bg-stone-100/80 rounded-lg border border-stone-200">
            <div className="text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
              Tóm tắt nội dung tài liệu
            </div>
            <p className="text-stone-700 text-sm leading-relaxed">
              {document.summary}
            </p>
          </div>

          {/* Key Takeaways */}
          {document.keyTakeaways && document.keyTakeaways.length > 0 && (
            <div className="mb-8 p-4 bg-amber-50/70 rounded-lg border border-amber-200/60">
              <div className="text-xs font-bold text-amber-900 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-amber-700" />
                <span>Nội dung cốt lõi người dân cần nắm rõ</span>
              </div>
              <ul className="space-y-1.5 text-sm text-amber-950">
                {document.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-700 font-bold shrink-0 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Main Full Body Content */}
          <div className="space-y-6 pt-4 border-t border-stone-200">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Nội dung chi tiết tài liệu học tập
            </div>
            <div className={`text-stone-800 whitespace-pre-line font-sans ${getFontSizeClass()}`}>
              {document.content}
            </div>
          </div>

          {/* Signoff / Authority Footer */}
          <div className="mt-12 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-stone-500 gap-4">
            <div>
              <div>Đối tượng áp dụng: <span className="text-stone-700">{document.targetAudience}</span></div>
              <div>Tệp lưu trữ: <span className="font-mono text-stone-600">{document.fileName}</span></div>
            </div>
            <div className="text-right sm:text-right">
              <div className="font-semibold text-stone-700">TRUNG TÂM HỌC TẬP CỘNG ĐỒNG</div>
              <div className="text-stone-500 italic">Lưu trữ và phát hành điện tử</div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="px-6 py-3.5 bg-stone-100 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-stone-500">
            Mọi thắc mắc về nội dung tài liệu xin liên hệ Thường trực TT HTCĐ qua điện thoại: <span className="font-semibold text-stone-700">0270.3852.114</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onDownload(document)}
              className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded font-medium flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Tải tệp đính kèm ({document.fileSize})
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded font-medium transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

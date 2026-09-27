import React, { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Upload, 
  Search, 
  MapPin, 
  Clock, 
  Award, 
  Users, 
  Sparkles,
  ArrowRight,
  Lock
} from 'lucide-react';
import { MainNavTab } from '../types';

interface HeroBannerProps {
  onSelectTab: (tab: MainNavTab) => void;
  onOpenUpload: () => void;
  onSearchSubmit: (query: string) => void;
  isAdmin: boolean;
  totalDocuments: number;
  totalClasses: number;
  totalRegistrations: number;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSelectTab,
  onOpenUpload,
  onSearchSubmit,
  isAdmin,
  totalDocuments,
  totalClasses,
  totalRegistrations,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchSubmit(searchInput.trim());
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-[#094074] via-[#125899] to-[#0c4782] text-white overflow-hidden border-b border-blue-800 shadow-md">
      {/* Background Graphic & Texture */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <img
          src="/src/assets/images/hero_long_ho_center_1790480536646.jpg"
          alt="Trung tâm Học tập Cộng đồng Xã Long Hồ"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter saturate-100 brightness-110"
          onError={(e) => {
            // Elegant CSS fallback
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#094074] via-[#094074]/80 to-[#125899]/50" />
      </div>

      {/* Radiant blue glow decorative spots */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-400/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="max-w-3xl space-y-6">
          {/* Headline in Editorial Serif with balance */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight drop-shadow-xs">
            Trung Tâm Học Tập Cộng Đồng Xã Long Hồ
          </h1>

          <p className="text-blue-100/90 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
            Cổng số hoá thông tin giáo dục cộng đồng, kho lưu trữ tài liệu khuyến nông, cẩm nang chuyển đổi số, thông báo chiêu sinh và lịch học nghề miễn phí cho nhân dân 13 ấp trên địa bàn xã.
          </p>

          {/* Search Bar for immediate access - Crisp & Bright White */}
          <form onSubmit={handleSearch} className="max-w-xl">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Tìm tài liệu ghép bưởi, ứng dụng VNeID, lịch học nghề, đất đai..."
                className="w-full pl-12 pr-28 py-3.5 bg-white border border-blue-200/50 hover:border-blue-400 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-xl transition-all"
              />
              <button
                type="submit"
                className="absolute right-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shadow-sm"
              >
                Tra cứu
              </button>
            </div>
          </form>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onSelectTab('documents')}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl transition-all flex items-center gap-2 shadow-md hover:shadow-lg whitespace-nowrap"
            >
              <BookOpen className="w-4 h-4" />
              <span>Tra cứu tài liệu số</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onSelectTab('schedules')}
              className="px-5 py-2.5 bg-white/15 hover:bg-white/25 text-white font-medium text-sm rounded-xl border border-white/25 backdrop-blur-sm transition-all flex items-center gap-2 whitespace-nowrap shadow-xs"
            >
              <Calendar className="w-4 h-4 text-sky-200" />
              <span>Xem lịch học & Đăng ký</span>
            </button>

            <button
              onClick={onOpenUpload}
              title={isAdmin ? 'Đưa tài liệu lên web' : 'Chỉ tài khoản quản trị mới có quyền đưa tài liệu lên'}
              className="px-4 py-2.5 bg-transparent hover:bg-white/10 text-sky-200 hover:text-white font-medium text-sm rounded-xl border border-sky-300/30 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              {isAdmin ? (
                <Upload className="w-4 h-4 text-sky-200" />
              ) : (
                <Lock className="w-4 h-4 text-sky-300" />
              )}
              <span>Đưa tài liệu lên web {isAdmin ? '' : '(Quản trị)'}</span>
            </button>
          </div>
        </div>

        {/* Operational Utility Strip */}
        <div className="mt-12 pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-blue-100">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md transition-colors">
            <MapPin className="w-4 h-4 text-sky-300 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white">Địa điểm Trung tâm</div>
              <div className="text-blue-100/80">Đường số 3, Trung tâm Hành chính Xã Long Hồ</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md transition-colors">
            <Clock className="w-4 h-4 text-sky-300 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white">Thời gian làm việc</div>
              <div className="text-blue-100/80">Thứ 2 - Thứ 7 (07:30 - 17:00)</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md transition-colors">
            <Award className="w-4 h-4 text-sky-300 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white">Chi phí tham gia</div>
              <div className="text-blue-100/80">100% Miễn phí toàn bộ khóa học và tài liệu</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md transition-colors">
            <Users className="w-4 h-4 text-sky-300 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white">Cơ sở dữ liệu số</div>
              <div className="text-blue-100/80 tabular-nums">
                {totalDocuments} tài liệu · {totalClasses} lớp học · {totalRegistrations} lượt đăng ký
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

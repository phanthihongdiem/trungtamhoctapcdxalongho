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
    <div className="relative bg-stone-900 text-stone-100 overflow-hidden border-b border-stone-800">
      {/* Background Graphic & Texture */}
      <div className="absolute inset-0 z-0 opacity-25">
        <img
          src="/src/assets/images/hero_long_ho_center_1790480536646.jpg"
          alt="Trung tâm Học tập Cộng đồng Xã Long Hồ"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter saturate-75 brightness-75"
          onError={(e) => {
            // Elegant CSS fallback
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/80 to-stone-950/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="max-w-3xl space-y-6">
          {/* Institutional Kicker (unboxed clean text) */}
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
            <span>UBND TỈNH VĨNH LONG</span>
            <span aria-hidden="true">·</span>
            <span>UBND HUYỆN LONG HỒ</span>
            <span aria-hidden="true">·</span>
            <span>XÃ ĐẠT CHUẨN NÔNG THÔN MỚI NÂNG CAO</span>
          </div>

          {/* Headline in Editorial Serif with balance */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Trung Tâm Học Tập Cộng Đồng Xã Long Hồ
          </h1>

          <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
            Cổng số hoá thông tin giáo dục cộng đồng, kho lưu trữ tài liệu khuyến nông, cẩm nang chuyển đổi số, thông báo chiêu sinh và lịch học nghề miễn phí cho nhân dân 08 ấp trên địa bàn xã.
          </p>

          {/* Search Bar for immediate access */}
          <form onSubmit={handleSearch} className="max-w-xl">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Tìm tài liệu ghép bưởi, ứng dụng VNeID, lịch học nghề, đất đai..."
                className="w-full pl-12 pr-28 py-3.5 bg-stone-800/90 border border-stone-700 hover:border-stone-500 focus:border-amber-500 rounded-lg text-sm text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 backdrop-blur-sm transition-all"
              />
              <button
                type="submit"
                className="absolute right-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-md transition-colors whitespace-nowrap shadow-sm"
              >
                Tra cứu
              </button>
            </div>
          </form>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onSelectTab('documents')}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-medium text-sm rounded-lg transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap"
            >
              <BookOpen className="w-4 h-4" />
              <span>Tra cứu tài liệu số</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onSelectTab('schedules')}
              className="px-5 py-2.5 bg-stone-800/90 hover:bg-stone-700 text-stone-200 hover:text-white font-medium text-sm rounded-lg border border-stone-700 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Calendar className="w-4 h-4" />
              <span>Xem lịch học & Đăng ký</span>
            </button>

            <button
              onClick={onOpenUpload}
              title={isAdmin ? 'Đưa tài liệu lên web' : 'Chỉ tài khoản quản trị mới có quyền đưa tài liệu lên'}
              className="px-4 py-2.5 bg-transparent hover:bg-stone-800 text-amber-300 font-medium text-sm rounded-lg border border-amber-600/40 hover:border-amber-500 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              {isAdmin ? (
                <Upload className="w-4 h-4" />
              ) : (
                <Lock className="w-4 h-4 text-amber-400" />
              )}
              <span>Đưa tài liệu lên web {isAdmin ? '' : '(Quản trị)'}</span>
            </button>
          </div>
        </div>

        {/* Operational Utility Strip */}
        <div className="mt-12 pt-6 border-t border-stone-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-stone-300">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-stone-950/40 border border-stone-800/50">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white">Địa điểm Trung tâm</div>
              <div className="text-stone-400">Đường số 3, Trung tâm Hành chính Xã Long Hồ</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-stone-950/40 border border-stone-800/50">
            <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white">Thời gian làm việc</div>
              <div className="text-stone-400">Thứ 2 - Thứ 7 (07:30 - 17:00)</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-stone-950/40 border border-stone-800/50">
            <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white">Chi phí tham gia</div>
              <div className="text-stone-400">100% Miễn phí toàn bộ khóa học và tài liệu</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-stone-950/40 border border-stone-800/50">
            <Users className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white">Cơ sở dữ liệu số</div>
              <div className="text-stone-400 tabular-nums">
                {totalDocuments} tài liệu · {totalClasses} lớp học · {totalRegistrations} lượt đăng ký
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

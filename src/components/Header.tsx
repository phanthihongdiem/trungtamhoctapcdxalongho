import React, { useState } from 'react';
import { MainNavTab, UserRole } from '../types';
import { 
  BookOpen, 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  Menu, 
  X, 
  PlusCircle, 
  Calendar, 
  Bell, 
  Files,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  activeTab: MainNavTab;
  onSelectTab: (tab: MainNavTab) => void;
  userRole: UserRole;
  onToggleUserRole: () => void;
  onOpenSearch: () => void;
  onOpenUploadModal: () => void;
  pendingNoticeCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  userRole,
  onToggleUserRole,
  onOpenSearch,
  onOpenUploadModal,
  pendingNoticeCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: MainNavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Trang chủ', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'documents', label: 'Tài liệu học tập', icon: <Files className="w-4 h-4" /> },
    { id: 'schedules', label: 'Lịch học & Đăng ký', icon: <Calendar className="w-4 h-4" /> },
    { id: 'announcements', label: 'Thông báo', icon: <Bell className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-900 text-stone-100 border-b border-stone-800 shadow-sm backdrop-blur-md bg-stone-900/95">
      {/* Utility Notice Banner */}
      <div className="bg-amber-900/70 border-b border-amber-700/40 text-amber-200 text-xs py-1.5 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 truncate">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
          <span className="truncate">
            Cổng học tập số hoá phục vụ nhân dân Xã Long Hồ, Huyện Long Hồ, Tỉnh Vĩnh Long
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 shrink-0 text-amber-200/80">
          <span>Đường dây nóng: 0270.3852.114</span>
          <span>·</span>
          <span>Thứ Hai - Thứ Bảy: 07:30 - 17:00</span>
        </div>
      </div>

      {/* Main Navigation - 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Wordmark in Display Face */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectTab('overview')}
              className="text-left group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm"
            >
              <div className="w-9 h-9 rounded-md bg-amber-600 flex items-center justify-center text-white font-serif font-bold text-lg shadow-inner">
                LH
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-base sm:text-lg font-semibold tracking-tight text-white group-hover:text-amber-300 transition-colors whitespace-nowrap">
                  TT HTCĐ XÃ LONG HỒ
                </span>
                <span className="text-[11px] text-stone-400 tracking-wider uppercase font-medium">
                  Học Tập Suốt Đời
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Clean 4-6 Text Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors relative whitespace-nowrap flex items-center gap-1.5 rounded-md ${
                    isActive
                      ? 'text-white bg-stone-800'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800/50'
                  }`}
                >
                  {item.label}
                  {item.id === 'announcements' && pendingNoticeCount > 0 && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-amber-500 rounded-full" />
                  )}
                </button>
              );
            })}

            {/* Quick Upload action in nav */}
            <button
              onClick={onOpenUploadModal}
              className="ml-2 px-3 py-1.5 text-xs font-semibold text-amber-300 bg-amber-950/60 border border-amber-600/40 rounded-md hover:bg-amber-900/60 transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Đưa tài liệu lên
            </button>
          </nav>

          {/* Zone 3: 1-2 Primary Actions (Search & Admin Switcher) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenSearch}
              aria-label="Tìm kiếm nhanh tài liệu và lịch học"
              className="p-2 text-stone-300 hover:text-white hover:bg-stone-800 rounded-md transition-colors flex items-center gap-1.5 text-xs font-medium"
            >
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline text-stone-400">Tìm kiếm (Ctrl+K)</span>
            </button>

            {/* Role Switcher */}
            <button
              onClick={onToggleUserRole}
              title={userRole === 'admin' ? 'Đang ở chế độ Ban Quản lý' : 'Nhấp để chuyển sang Ban Quản lý'}
              className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all flex items-center gap-1.5 whitespace-nowrap ${
                userRole === 'admin'
                  ? 'bg-amber-600/90 text-white border-amber-500 shadow-sm'
                  : 'bg-stone-800 text-stone-300 border-stone-700 hover:border-stone-500 hover:text-white'
              }`}
            >
              {userRole === 'admin' ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-200" />
                  <span>Ban Quản lý</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-3.5 h-3.5 text-stone-400" />
                  <span className="hidden sm:inline">Chế độ người dân</span>
                  <span className="sm:hidden">Người dân</span>
                </>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-300 hover:text-white hover:bg-stone-800 rounded-md"
              aria-label="Mở thực đơn di động"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-800 bg-stone-900 px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium ${
                activeTab === item.id
                  ? 'bg-amber-600 text-white'
                  : 'text-stone-300 hover:bg-stone-800'
              }`}
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.id === 'announcements' && pendingNoticeCount > 0 && (
                <span className="px-1.5 py-0.2 bg-amber-400 text-stone-950 text-[10px] font-bold rounded">
                  {pendingNoticeCount} mới
                </span>
              )}
            </button>
          ))}

          <button
            onClick={() => {
              onOpenUploadModal();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-amber-900/60 border border-amber-600/40 text-amber-200 rounded-md text-sm font-medium mt-2"
          >
            <PlusCircle className="w-4 h-4" />
            Đưa tài liệu lên web
          </button>
        </div>
      )}
    </header>
  );
};

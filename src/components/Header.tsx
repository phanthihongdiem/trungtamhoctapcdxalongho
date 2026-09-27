import React, { useState } from 'react';
import { MainNavTab, UserRole, AdminUser } from '../types';
import { 
  BookOpen, 
  Search, 
  ShieldCheck, 
  Menu, 
  X, 
  PlusCircle, 
  Calendar, 
  Bell, 
  Files,
  Lock,
  LogOut,
  UserCheck
} from 'lucide-react';

interface HeaderProps {
  activeTab: MainNavTab;
  onSelectTab: (tab: MainNavTab) => void;
  userRole: UserRole;
  currentAdmin: AdminUser | null;
  onOpenAdminLogin: () => void;
  onLogoutAdmin: () => void;
  onOpenSearch: () => void;
  onOpenUploadModal: () => void;
  pendingNoticeCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  userRole,
  currentAdmin,
  onOpenAdminLogin,
  onLogoutAdmin,
  onOpenSearch,
  onOpenUploadModal,
  pendingNoticeCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  const navItems: { id: MainNavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Trang chủ', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'documents', label: 'Tài liệu học tập', icon: <Files className="w-4 h-4" /> },
    { id: 'schedules', label: 'Lịch học & Đăng ký', icon: <Calendar className="w-4 h-4" /> },
    { id: 'announcements', label: 'Thông báo', icon: <Bell className="w-4 h-4" /> },
  ];

  const handleUploadClick = () => {
    if (!currentAdmin) {
      onOpenAdminLogin();
    } else {
      onOpenUploadModal();
    }
  };

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

            {/* Upload action with permission indication */}
            <button
              onClick={handleUploadClick}
              title={currentAdmin ? 'Đưa tài liệu mới lên cổng thông tin' : 'Chỉ tài khoản quản trị mới có quyền đưa tài liệu lên'}
              className={`ml-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap border ${
                currentAdmin
                  ? 'text-amber-200 bg-amber-900/80 border-amber-600 hover:bg-amber-800'
                  : 'text-stone-300 bg-stone-800 border-stone-700 hover:border-amber-500/60 hover:text-amber-200'
              }`}
            >
              {currentAdmin ? (
                <>
                  <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Đưa tài liệu lên</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Đưa tài liệu lên (Quản trị)</span>
                </>
              )}
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

            {/* Admin Authentication Status */}
            {currentAdmin ? (
              <div className="relative">
                <button
                  onClick={() => setAdminMenuOpen(!adminMenuOpen)}
                  className="px-3 py-1.5 text-xs font-medium rounded-md bg-amber-600/90 text-white border border-amber-500 shadow-sm flex items-center gap-1.5 whitespace-nowrap hover:bg-amber-600 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-200" />
                  <span className="max-w-[120px] sm:max-w-[160px] truncate">{currentAdmin.fullName}</span>
                </button>

                {adminMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white text-stone-900 rounded-lg shadow-xl border border-stone-200 p-3 z-50 animate-fadeIn text-xs space-y-2.5">
                    <div className="border-b border-stone-100 pb-2">
                      <div className="font-semibold text-stone-900">{currentAdmin.fullName}</div>
                      <div className="text-[11px] text-amber-800">{currentAdmin.roleTitle}</div>
                      <div className="text-[10px] text-stone-500 mt-0.5">{currentAdmin.agency}</div>
                    </div>
                    <div className="flex flex-col gap-1 text-[11px]">
                      <button
                        onClick={() => {
                          setAdminMenuOpen(false);
                          onOpenUploadModal();
                        }}
                        className="w-full text-left px-2 py-1.5 hover:bg-stone-100 rounded text-stone-800 flex items-center gap-2"
                      >
                        <PlusCircle className="w-3.5 h-3.5 text-amber-700" />
                        <span>Đưa tài liệu mới lên web</span>
                      </button>
                      <button
                        onClick={() => {
                          setAdminMenuOpen(false);
                          onLogoutAdmin();
                        }}
                        className="w-full text-left px-2 py-1.5 hover:bg-red-50 text-red-600 rounded flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Đăng xuất quyền Quản trị</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                title="Đăng nhập tài khoản Quản trị viên để đưa tài liệu và quản lý thông báo"
                className="px-3 py-1.5 text-xs font-medium rounded-md border border-stone-700 bg-stone-800 text-stone-300 hover:border-amber-500 hover:text-white transition-all flex items-center gap-1.5 whitespace-nowrap"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Đăng nhập Quản trị</span>
                <span className="sm:hidden">Quản trị</span>
              </button>
            )}

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
              handleUploadClick();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-amber-900/60 border border-amber-600/40 text-amber-200 rounded-md text-sm font-medium mt-2"
          >
            {currentAdmin ? <PlusCircle className="w-4 h-4" /> : <Lock className="w-4 h-4 text-amber-400" />}
            <span>Đưa tài liệu lên web {currentAdmin ? '' : '(Yêu cầu quản trị)'}</span>
          </button>
        </div>
      )}
    </header>
  );
};


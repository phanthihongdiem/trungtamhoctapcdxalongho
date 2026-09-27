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
  UserCheck,
  Users
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
    { id: 'about_feedback', label: 'Giới thiệu & Ý kiến', icon: <Users className="w-4 h-4" /> },
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
    <header className="sticky top-0 z-40 bg-white/95 text-slate-800 border-b border-slate-200/90 shadow-xs backdrop-blur-md">
      {/* Utility Notice Banner */}
      <div className="bg-blue-800 border-b border-blue-700/80 text-blue-100 text-xs py-1.5 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 truncate">
          <span className="inline-block w-2 h-2 rounded-full bg-sky-400 animate-pulse shrink-0"></span>
          <span className="truncate font-medium">
            Cổng học tập số hoá phục vụ nhân dân Xã Long Hồ, Huyện Long Hồ, Tỉnh Vĩnh Long
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 shrink-0 text-blue-200/90">
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
              className="text-left group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-serif font-bold text-lg shadow-xs">
                LH
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-base sm:text-lg font-bold tracking-tight text-blue-950 group-hover:text-blue-600 transition-colors whitespace-nowrap">
                  TT HTCĐ XÃ LONG HỒ
                </span>
                <span className="text-[11px] text-blue-600 tracking-wider uppercase font-semibold">
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
                  className={`px-3 py-1.5 text-sm font-medium transition-colors relative whitespace-nowrap flex items-center gap-1.5 rounded-lg ${
                    isActive
                      ? 'text-blue-700 bg-blue-50/90 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:text-blue-700 hover:bg-slate-100/80'
                  }`}
                >
                  {item.label}
                  {item.id === 'announcements' && pendingNoticeCount > 0 && (
                    <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              );
            })}

            {/* Upload action with permission indication */}
            <button
              onClick={handleUploadClick}
              title={currentAdmin ? 'Đưa tài liệu mới lên cổng thông tin' : 'Chỉ tài khoản quản trị mới có quyền đưa tài liệu lên'}
              className={`ml-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap border ${
                currentAdmin
                  ? 'text-white bg-blue-600 border-blue-600 hover:bg-blue-700 shadow-xs'
                  : 'text-slate-700 bg-slate-100 border-slate-200 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700'
              }`}
            >
              {currentAdmin ? (
                <>
                  <PlusCircle className="w-3.5 h-3.5 text-white" />
                  <span>Đưa tài liệu lên</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-blue-600" />
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
              className="p-2 text-slate-600 hover:text-blue-700 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium border border-slate-200"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span className="hidden xl:inline text-slate-600">Tìm kiếm (Ctrl+K)</span>
            </button>

            {/* Admin Authentication Status */}
            {currentAdmin ? (
              <div className="relative">
                <button
                  onClick={() => setAdminMenuOpen(!adminMenuOpen)}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-700 text-white border border-blue-600 shadow-xs flex items-center gap-1.5 whitespace-nowrap hover:bg-blue-800 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-200" />
                  <span className="max-w-[120px] sm:max-w-[160px] truncate">{currentAdmin.fullName}</span>
                </button>

                {adminMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white text-slate-900 rounded-xl shadow-xl border border-slate-200 p-3 z-50 animate-fadeIn text-xs space-y-2.5">
                    <div className="border-b border-slate-100 pb-2">
                      <div className="font-semibold text-slate-900">{currentAdmin.fullName}</div>
                      <div className="text-[11px] text-blue-700">{currentAdmin.roleTitle}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{currentAdmin.agency}</div>
                    </div>
                    <div className="flex flex-col gap-1 text-[11px]">
                      <button
                        onClick={() => {
                          setAdminMenuOpen(false);
                          onOpenUploadModal();
                        }}
                        className="w-full text-left px-2 py-1.5 hover:bg-blue-50 hover:text-blue-700 rounded-md text-slate-800 flex items-center gap-2"
                      >
                        <PlusCircle className="w-3.5 h-3.5 text-blue-600" />
                        <span>Đưa tài liệu mới lên web</span>
                      </button>
                      <button
                        onClick={() => {
                          setAdminMenuOpen(false);
                          onLogoutAdmin();
                        }}
                        className="w-full text-left px-2 py-1.5 hover:bg-red-50 text-red-600 rounded-md flex items-center gap-2"
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
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-50/70 transition-all flex items-center gap-1.5 whitespace-nowrap"
              >
                <Lock className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">Đăng nhập Quản trị</span>
                <span className="sm:hidden">Quản trị</span>
              </button>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-blue-700 hover:bg-slate-100 rounded-lg"
              aria-label="Mở thực đơn di động"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.id === 'announcements' && pendingNoticeCount > 0 && (
                <span className="px-1.5 py-0.2 bg-sky-200 text-blue-900 text-[10px] font-bold rounded">
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
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg text-sm font-medium mt-2"
          >
            {currentAdmin ? <PlusCircle className="w-4 h-4 text-blue-600" /> : <Lock className="w-4 h-4 text-blue-600" />}
            <span>Đưa tài liệu lên web {currentAdmin ? '' : '(Yêu cầu quản trị)'}</span>
          </button>
        </div>
      )}
    </header>
  );
};


import React, { useState } from 'react';
import { AdminUser } from '../types';
import { storageService } from '../services/storageService';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  Eye, 
  EyeOff,
  KeyRound,
  Building2
} from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AdminUser) => void;
  actionReason?: string; // Reason prompt, e.g. "để đưa tài liệu học tập lên trang web"
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  actionReason = 'để quản lý và đưa tài liệu lên trang web',
}) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const result = storageService.verifyAdminCredentials(username, password);
      setLoading(false);

      if (result.success && result.user) {
        onLoginSuccess(result.user);
        onClose();
      } else {
        setError(result.error || 'Đăng nhập không thành công.');
      }
    }, 350);
  };

  const handleQuickFill = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white border-b border-blue-700">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-white">
                Xác Thực Quyền Quản Trị
              </h3>
              <p className="text-[11px] text-sky-200">
                Ban Quản lý Trung tâm HTCĐ Xã Long Hồ
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-300 hover:text-white rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reason Warning Banner */}
        <div className="p-4 bg-blue-50 border-b border-blue-200 text-xs text-blue-950 leading-relaxed flex items-start gap-2.5">
          <Lock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <strong>Yêu cầu phân quyền:</strong> Quý cán bộ cần đăng nhập tài khoản quản trị <span className="font-medium underline">{actionReason}</span>. Người dân chỉ được xem và tải tài liệu miễn phí.
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-slate-50">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2 text-xs">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tài khoản quản trị viên <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin hoặc bql_longho"
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Mật khẩu xác thực <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu quản trị..."
                className="w-full pl-9 pr-10 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-700"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quick preset credentials for testing */}
          <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-2">
            <div className="font-semibold text-slate-700 flex items-center justify-between">
              <span>Tài khoản cán bộ quản trị mặc định:</span>
              <span className="text-[10px] text-blue-600">Bấm để điền nhanh</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickFill('admin', '123456')}
                className="px-2 py-1 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 rounded text-[11px] font-mono text-slate-800 transition-colors"
              >
                admin (Mật khẩu: 123456)
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('bql_longho', 'longho2026')}
                className="px-2 py-1 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 rounded text-[11px] font-mono text-slate-800 transition-colors"
              >
                bql_longho (Mật khẩu: longho2026)
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{loading ? 'Đang xác thực...' : 'Đăng nhập Quản trị'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

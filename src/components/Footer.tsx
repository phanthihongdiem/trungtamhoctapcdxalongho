import React from 'react';
import { MainNavTab } from '../types';
import { BookOpen, MapPin, Phone, Mail, Clock, Shield, RefreshCw } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: MainNavTab) => void;
  onResetData: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onResetData }) => {
  return (
    <footer className="bg-[#0b1f3a] text-slate-300 border-t border-blue-950 text-xs mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Identity */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-serif font-bold text-sm shadow-xs">
                LH
              </div>
              <div>
                <div className="font-serif font-bold text-base text-white">
                  TRUNG TÂM HỌC TẬP CỘNG ĐỒNG XÃ LONG HỒ
                </div>
                <div className="text-[11px] text-sky-400 font-semibold tracking-wide">
                  UBND XÃ LONG HỒ · HUYỆN LONG HỒ · TỈNH VĨNH LONG
                </div>
              </div>
            </div>

            <p className="text-slate-300/80 leading-relaxed text-xs max-w-lg">
              Đơn vị sự nghiệp giáo dục thường xuyên cấp cơ sở có nhiệm vụ tổ chức các hoạt động học tập suốt đời, phổ biến khoa học kỹ thuật nông nghiệp, nâng cao dân trí và chuyển đổi số cho người dân trên địa bàn 13 ấp.
            </p>

            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <div>Phụ trách: Ban Giám đốc Trung tâm Học tập Cộng đồng Xã Long Hồ</div>
              <div>Chỉ đạo: Đảng ủy & Ủy ban Nhân dân Xã Long Hồ</div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Chuyên mục chính
            </div>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button
                  onClick={() => onSelectTab('overview')}
                  className="hover:text-sky-300 transition-colors"
                >
                  Trang chủ & Tổng quan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('about_feedback')}
                  className="hover:text-sky-300 transition-colors"
                >
                  Giới thiệu tổ chức & Ý kiến nhân dân
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('documents')}
                  className="hover:text-sky-300 transition-colors"
                >
                  Kho tài liệu học tập & Sách số
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('schedules')}
                  className="hover:text-sky-300 transition-colors"
                >
                  Lịch học & Đăng ký trực tuyến
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('announcements')}
                  className="hover:text-sky-300 transition-colors"
                >
                  Thông báo chiêu sinh & Tin tức
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Data Control */}
          <div className="space-y-3">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Thông tin liên hệ
            </div>
            <div className="space-y-2 text-slate-300 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span>Đường số 3, Trung tâm Hành chính Xã Long Hồ, Huyện Long Hồ, Tỉnh Vĩnh Long</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>0270.3852.114 (Bộ phận Một cửa & HTCĐ)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>tt_htcd.longho@vinhlong.gov.vn</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>07:30 - 17:00 (Thứ Hai - Thứ Bảy)</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onResetData}
                title="Khôi phục lại toàn bộ dữ liệu mẫu ban đầu của Xã Long Hồ"
                className="px-2.5 py-1.5 rounded-lg bg-blue-950/80 hover:bg-blue-900 border border-blue-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-[11px]"
              >
                <RefreshCw className="w-3 h-3 text-sky-400" />
                <span>Khôi phục dữ liệu mẫu ban đầu</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hairline Divider & Bottom Copyright */}
        <div className="mt-10 pt-6 border-t border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} Trung tâm Học tập Cộng đồng Xã Long Hồ. Giữ toàn quyền.
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span>Tiêu chuẩn Nông thôn mới nâng cao</span>
            <span>·</span>
            <span>Chuyển đổi số toàn dân</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

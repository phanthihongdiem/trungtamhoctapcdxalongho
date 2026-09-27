import React from 'react';
import { 
  DocumentItem, 
  AnnouncementItem, 
  ClassScheduleItem, 
  MainNavTab 
} from '../types';
import { 
  BookOpen, 
  Calendar, 
  Bell, 
  ArrowRight, 
  Download, 
  Check, 
  Pin, 
  Clock, 
  MapPin, 
  Users, 
  Sparkles,
  Building,
  Monitor,
  GraduationCap
} from 'lucide-react';

interface OverviewSectionProps {
  documents: DocumentItem[];
  announcements: AnnouncementItem[];
  classes: ClassScheduleItem[];
  onSelectTab: (tab: MainNavTab) => void;
  onOpenDocument: (doc: DocumentItem) => void;
  onDownloadDocument: (doc: DocumentItem) => void;
  onSelectAnnouncement: (ann: AnnouncementItem) => void;
  onSelectClass: (cls: ClassScheduleItem) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  documents,
  announcements,
  classes,
  onSelectTab,
  onOpenDocument,
  onDownloadDocument,
  onSelectAnnouncement,
  onSelectClass,
}) => {
  const pinnedOrRecentDocs = documents.slice(0, 3);
  const urgentAnnouncements = announcements.slice(0, 3);
  const upcomingClasses = classes.slice(0, 3);

  return (
    <div className="space-y-16 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 3 Pillars Quick Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => onSelectTab('documents')}
          className="bg-white p-6 rounded-xl border border-stone-200 hover:border-amber-500/80 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-amber-800 transition-colors">
            Kho Tài Liệu Học Tập
          </h3>
          <p className="text-xs text-stone-600 mt-2 leading-relaxed">
            Hơn 120+ đầu tài liệu, sổ tay khuyến nông, cẩm nang dịch vụ công VNeID, pháp luật đất đai và tài liệu nghề nông thôn.
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-amber-800">
            <span>Tra cứu & đọc tài liệu</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div 
          onClick={() => onSelectTab('schedules')}
          className="bg-white p-6 rounded-xl border border-stone-200 hover:border-amber-500/80 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <Calendar className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-amber-800 transition-colors">
            Lịch Học & Đào Tạo Nghề
          </h3>
          <p className="text-xs text-stone-600 mt-2 leading-relaxed">
            Lớp học trực tiếp tại Hội trường xã và Nhà văn hóa 08 ấp. Người dân đăng ký tham gia trực tuyến hoàn toàn miễn phí.
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-amber-800">
            <span>Xem lịch & đăng ký học</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div 
          onClick={() => onSelectTab('announcements')}
          className="bg-white p-6 rounded-xl border border-stone-200 hover:border-amber-500/80 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <Bell className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-amber-800 transition-colors">
            Thông Báo Chiêu Sinh
          </h3>
          <p className="text-xs text-stone-600 mt-2 leading-relaxed">
            Cập nhật kịp thời kế hoạch khai giảng, hội thảo đầu bờ nông nghiệp, chính sách khuyến học và các hoạt động cộng đồng.
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-amber-800">
            <span>Xem thông báo mới nhất</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Featured Documents Section */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-stone-200 pb-4">
          <div>
            <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
              Tài liệu khuyến nghị
            </div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Tài Liệu Tiêu Biểu Dành Cho Nhân Dân Xã
            </h2>
          </div>
          <button
            onClick={() => onSelectTab('documents')}
            className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1"
          >
            <span>Xem tất cả {documents.length} tài liệu</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pinnedOrRecentDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-xl border border-stone-200 hover:border-stone-300 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
            >
              <div className="p-5 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-stone-500">
                  <span className="font-mono text-stone-700 font-semibold">{doc.codeNumber}</span>
                  <span>{doc.categoryLabel}</span>
                </div>

                <h3
                  onClick={() => onOpenDocument(doc)}
                  className="font-serif font-bold text-base text-stone-900 hover:text-amber-800 cursor-pointer leading-snug line-clamp-2"
                >
                  {doc.title}
                </h3>

                <p className="text-stone-600 text-xs leading-relaxed line-clamp-3">
                  {doc.summary}
                </p>

                <div className="text-[11px] text-stone-400 pt-2 border-t border-stone-100 flex items-center justify-between">
                  <span>{doc.issuer}</span>
                  <span>{doc.fileFormat} ({doc.fileSize})</span>
                </div>
              </div>

              <div className="px-5 py-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
                <button
                  onClick={() => onOpenDocument(doc)}
                  className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Đọc tài liệu</span>
                </button>
                <button
                  onClick={() => onDownloadDocument(doc)}
                  className="p-1.5 text-stone-600 hover:text-amber-800 rounded transition-colors"
                  title="Tải về máy"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Classes Section */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-stone-200 pb-4">
          <div>
            <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
              Chiêu sinh & Khai giảng
            </div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Lớp Học & Khóa Bồi Dưỡng Sắp Khai Giảng
            </h2>
          </div>
          <button
            onClick={() => onSelectTab('schedules')}
            className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1"
          >
            <span>Xem toàn bộ lịch học ({classes.length} lớp)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingClasses.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-stone-200 hover:border-stone-300 hover:shadow-md transition-all p-5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-semibold text-amber-800">{item.topicLabel}</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-semibold">
                    {item.fee}
                  </span>
                </div>

                <h3 
                  onClick={() => onSelectClass(item)}
                  className="font-serif font-bold text-base text-stone-900 hover:text-amber-800 cursor-pointer leading-snug"
                >
                  {item.title}
                </h3>

                <div className="space-y-1.5 text-xs text-stone-600 pt-1">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{item.timeSlot} ({item.sessionDays})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="truncate">{item.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="tabular-nums">Đã có {item.registeredCount}/{item.capacity} học viên đăng ký</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-stone-500 font-medium">
                  Khai giảng: {new Date(item.startDate).toLocaleDateString('vi-VN')}
                </span>
                <button
                  onClick={() => onSelectClass(item)}
                  className="px-3.5 py-1.5 bg-amber-700 hover:bg-amber-600 text-white rounded text-xs font-semibold transition-colors"
                >
                  Đăng ký ngay
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Institutional Profile & Infrastructure Box */}
      <section className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-10 border border-stone-800">
        <div className="max-w-3xl space-y-4">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            Cơ sở vật chất & Mạng lưới học tập
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-white">
            Trung Tâm Học Tập Cộng Đồng Xã Long Hồ - Điểm Hẹn Tri Thức Của Mọi Nhà
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
            Được thành lập với mục tiêu phổ cập kiến thức, chuyển giao khoa học kỹ thuật cho nhà vườn và xây dựng xã hội học tập cơ sở. Trung tâm duy trì các điểm học tập tại Nhà văn hóa 08 ấp, hỗ trợ trang thiết bị, kết nối internet tốc độ cao phục vụ nhân dân đến đọc sách và tiếp cận công nghệ thông tin.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-stone-800">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400 shrink-0">
              <Monitor className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-white">Phòng máy vi tính mở</div>
              <div className="text-xs text-stone-400 mt-1">
                20 máy tính kết nối cáp quang internet miễn phí cho người lớn tuổi và thanh thiếu niên tra cứu.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400 shrink-0">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-white">Điểm vệ tinh tại 08 ấp</div>
              <div className="text-xs text-stone-400 mt-1">
                Nhà văn hóa ấp An Lạc, Long Thuận, Phước Ngươn... thường xuyên tổ chức tập huấn đầu bờ lưu động.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400 shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-white">Đội ngũ báo cáo viên</div>
              <div className="text-xs text-stone-400 mt-1">
                Quy tụ các kỹ sư nông nghiệp, bác sĩ chuyên khoa, nghệ nhân làng nghề và chuyên gia công nghệ số.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

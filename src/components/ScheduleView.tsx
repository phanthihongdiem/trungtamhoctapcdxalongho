import React, { useState } from 'react';
import { 
  ClassScheduleItem, 
  RegistrationItem, 
  DocumentCategory, 
  UserRole 
} from '../types';
import { HAMLETS_LIST } from '../data/initialData';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Users, 
  Phone, 
  CheckCircle, 
  PlusCircle, 
  Check, 
  Trash2, 
  X, 
  Download, 
  Sparkles,
  BookOpen,
  Eye,
  Filter
} from 'lucide-react';

interface ScheduleViewProps {
  classes: ClassScheduleItem[];
  registrations: RegistrationItem[];
  userRole: UserRole;
  onAddClass: (item: ClassScheduleItem) => void;
  onDeleteClass: (id: string) => void;
  onRegisterCitizen: (reg: RegistrationItem) => void;
  highlightClassId?: string | null;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  classes,
  registrations,
  userRole,
  onAddClass,
  onDeleteClass,
  onRegisterCitizen,
  highlightClassId,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<'all' | DocumentCategory>('all');
  const [registeringClass, setRegisteringClass] = useState<ClassScheduleItem | null>(null);
  const [viewingRegistrationsClass, setViewingRegistrationsClass] = useState<ClassScheduleItem | null>(null);
  const [isAddClassModalOpen, setIsAddClassModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'timeline'>('cards');

  // Registration Form State
  const [regFullName, setRegFullName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regHamlet, setRegHamlet] = useState(HAMLETS_LIST[0]);
  const [regBirthYear, setRegBirthYear] = useState('');
  const [regNote, setRegNote] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);

  // New Class Form State
  const [newTitle, setNewTitle] = useState('');
  const [newTopic, setNewTopic] = useState<Exclude<DocumentCategory, 'all'>>('nong_nghiep');
  const [newInstructor, setNewInstructor] = useState('');
  const [newInstructorTitle, setNewInstructorTitle] = useState('Báo cáo viên chuyên đề');
  const [newVenue, setNewVenue] = useState('Hội trường UBND Xã Long Hồ');
  const [newAddress, setNewAddress] = useState('Đường số 3, Trung tâm Hành chính Xã Long Hồ');
  const [newStartDate, setNewStartDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');
  const [newTimeSlot, setNewTimeSlot] = useState('08:00 - 11:00');
  const [newSessionDays, setNewSessionDays] = useState('Thứ Bảy, Chủ Nhật');
  const [newCapacity, setNewCapacity] = useState(30);
  const [newDescription, setNewDescription] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('0270.3852.114');

  const topicTabs: { id: 'all' | DocumentCategory; label: string }[] = [
    { id: 'all', label: 'Tất cả các lớp' },
    { id: 'nong_nghiep', label: 'Khuyến nông & Làm vườn' },
    { id: 'chuyen_doi_so', label: 'Chuyển đổi số & Tin học' },
    { id: 'nghe_nong_thon', label: 'Đào tạo nghề nông thôn' },
    { id: 'y_te_suc_khoe', label: 'Sức khỏe & Sơ cấp cứu' },
  ];

  const filteredClasses = classes
    .filter((c) => selectedTopic === 'all' || c.topicCategory === selectedTopic)
    .sort((a, b) => {
      // Prioritize highlighted class
      if (highlightClassId && a.id === highlightClassId) return -1;
      if (highlightClassId && b.id === highlightClassId) return 1;
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registeringClass || !regFullName.trim() || !regPhone.trim()) return;

    const newReg: RegistrationItem = {
      id: `reg-${Date.now()}`,
      classId: registeringClass.id,
      classTitle: registeringClass.title,
      fullName: regFullName.trim(),
      phoneNumber: regPhone.trim(),
      hamlet: regHamlet,
      yearOfBirth: regBirthYear.trim() || undefined,
      note: regNote.trim() || undefined,
      registeredAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };

    onRegisterCitizen(newReg);
    setRegSuccess(true);
    setTimeout(() => {
      setRegSuccess(false);
      setRegisteringClass(null);
      setRegFullName('');
      setRegPhone('');
      setRegNote('');
    }, 1500);
  };

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newInstructor.trim()) return;

    const topicLabels: Record<Exclude<DocumentCategory, 'all'>, string> = {
      nong_nghiep: 'Kỹ thuật nông nghiệp',
      chuyen_doi_so: 'Chuyển đổi số & Tin học',
      phap_luat: 'Phổ biến pháp luật',
      y_te_suc_khoe: 'Sức khỏe cộng đồng',
      nghe_nong_thon: 'Nghề thủ công & Khởi nghiệp',
      giao_duc_khac: 'Giáo dục thường xuyên',
    };

    const newClassItem: ClassScheduleItem = {
      id: `class-${Date.now()}`,
      title: newTitle.trim(),
      topicCategory: newTopic,
      topicLabel: topicLabels[newTopic],
      instructor: newInstructor.trim(),
      instructorTitle: newInstructorTitle.trim(),
      venue: newVenue.trim(),
      addressNote: newAddress.trim(),
      startDate: newStartDate || new Date().toISOString().split('T')[0],
      endDate: newEndDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      timeSlot: newTimeSlot.trim(),
      sessionDays: newSessionDays.trim(),
      totalHours: 12,
      capacity: newCapacity || 30,
      registeredCount: 0,
      fee: 'Miễn phí 100%',
      targetAudience: 'Toàn thể nhân dân trên địa bàn xã Long Hồ',
      status: 'sap_dien_ra',
      description: newDescription.trim() || 'Lớp bồi dưỡng kỹ năng thực hành phục vụ cộng đồng.',
      curriculum: [
        'Phần 1: Giới thiệu kiến thức và quy trình chuẩn bị.',
        'Phần 2: Cầm tay chỉ việc thực hành tại chỗ.',
        'Phần 3: Trao đổi hỏi đáp và giải quyết vướng mắc cụ thể.'
      ],
      contactPhone: newContactPhone.trim() || '0270.3852.114',
    };

    onAddClass(newClassItem);
    setIsAddClassModalOpen(false);
    // Reset form
    setNewTitle('');
    setNewInstructor('');
    setNewDescription('');
  };

  const currentClassAttendees = viewingRegistrationsClass
    ? registrations.filter((r) => r.classId === viewingRegistrationsClass.id)
    : [];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Classroom Spotlight Banner - Radiant Civic Blue */}
      <div className="bg-gradient-to-br from-[#094074] via-[#125899] to-[#0c4782] rounded-2xl overflow-hidden border border-blue-800 text-white mb-10 shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="p-6 sm:p-8 lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-300 uppercase tracking-wider">
              <span>Học tập thực chất</span>
              <span>·</span>
              <span>Cầm tay chỉ việc</span>
              <span>·</span>
              <span>100% Miễn phí học phí</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
              Lịch Đào Tạo Nghề & Các Lớp Bồi Dưỡng Cộng Đồng
            </h2>

            <p className="text-blue-100/90 text-sm leading-relaxed">
              Các khóa học khuyến nông, tin học ứng dụng và truyền nghề thủ công được tổ chức linh hoạt vào ban đêm và cuối tuần tại Nhà văn hóa 13 ấp để bà con tiện sắp xếp công việc đồng áng.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {userRole === 'admin' ? (
                <button
                  onClick={() => setIsAddClassModalOpen(true)}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors shadow-sm"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Mở lớp học mới lên lịch</span>
                </button>
              ) : (
                <div className="text-xs text-blue-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                  <span>Bà con chọn lớp bên dưới và bấm nút <strong>"Đăng ký tham gia"</strong> để giữ chỗ học.</span>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 h-56 lg:h-full relative overflow-hidden bg-blue-900">
            <img
              src="/src/assets/images/community_learning_class_1790480552310.jpg"
              alt="Lớp học cộng đồng xã Long Hồ"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter saturate-100 brightness-105"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#094074]/90 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#094074] lg:via-transparent lg:to-transparent" />
          </div>
        </div>
      </div>

      {/* Filter Tabs & View Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {topicTabs.map((tab) => {
            const isActive = selectedTopic === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTopic(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50/50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-slate-200/70 p-1 rounded-lg text-xs shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              viewMode === 'cards' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            Dạng lưới
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              viewMode === 'timeline' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            Thời khóa biểu
          </button>
        </div>
      </div>

      {/* Class Items Display */}
      <div className="mt-8">
        {filteredClasses.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500 text-sm">
            Hiện chưa có lớp học thuộc chuyên mục này. Quý bà con có thể đề xuất nhu cầu học với Trung tâm.
          </div>
        ) : viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredClasses.map((item) => {
              const remaining = item.capacity - item.registeredCount;
              const isFull = remaining <= 0;
              const isHighlighted = highlightClassId === item.id;

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-xl border overflow-hidden transition-all duration-200 flex flex-col justify-between ${
                    isHighlighted
                      ? 'ring-2 ring-blue-500 border-blue-500 shadow-md'
                      : 'border-slate-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <div className="p-6 space-y-4">
                    {/* Unboxed Metadata Header */}
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="font-semibold text-blue-800">{item.topicLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.sessionDays}</span>
                      </div>
                      
                      <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {item.fee}
                      </span>
                    </div>

                    {/* Class Title */}
                    <h3 className="font-serif font-bold text-xl text-slate-900 leading-snug">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    {/* Key Details Grid */}
                    <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-700">
                      <div className="flex items-start gap-2.5">
                        <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-slate-800">{item.timeSlot}</div>
                          <div className="text-slate-500">
                            Từ ngày {new Date(item.startDate).toLocaleDateString('vi-VN')} đến {new Date(item.endDate).toLocaleDateString('vi-VN')}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-slate-800">{item.venue}</div>
                          <div className="text-slate-500">{item.addressNote}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <User className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-slate-800">{item.instructor}</span>
                          <span className="text-slate-500"> ({item.instructorTitle})</span>
                        </div>
                      </div>
                    </div>

                    {/* Capacity and Registration Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Sĩ số & Số chỗ còn lại:</span>
                        <span className="tabular-nums font-semibold text-slate-800">
                          {item.registeredCount} / {item.capacity} học viên
                          {remaining > 0 ? (
                            <span className="text-blue-700 ml-1.5 font-normal">(còn {remaining} chỗ)</span>
                          ) : (
                            <span className="text-red-600 ml-1.5 font-normal">(Đã đủ chỉ tiêu)</span>
                          )}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            isFull ? 'bg-red-500' : 'bg-blue-600'
                          }`}
                          style={{ width: `${Math.min(100, (item.registeredCount / item.capacity) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Controls */}
                  <div className="px-6 py-4 bg-slate-50/90 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs text-slate-500 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>Tư vấn: {item.contactPhone}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {userRole === 'admin' && (
                        <>
                          <button
                            onClick={() => setViewingRegistrationsClass(item)}
                            className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
                            title="Xem danh sách học viên đăng ký"
                          >
                            <Users className="w-3.5 h-3.5" />
                            <span>Học viên ({item.registeredCount})</span>
                          </button>

                          <button
                            onClick={() => onDeleteClass(item.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                            title="Xóa lớp học này"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}

                      <button
                        disabled={isFull}
                        onClick={() => setRegisteringClass(item)}
                        className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs ${
                          isFull
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{isFull ? 'Đã đủ số lượng' : 'Đăng ký tham gia'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Timeline / Table View */
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-800 uppercase font-semibold border-b border-slate-200 text-[11px]">
                  <tr>
                    <th className="px-4 py-3">Lớp học & Chuyên đề</th>
                    <th className="px-4 py-3">Thời gian học</th>
                    <th className="px-4 py-3">Địa điểm</th>
                    <th className="px-4 py-3">Giảng viên / Báo cáo viên</th>
                    <th className="px-4 py-3 text-center">Đã đăng ký</th>
                    <th className="px-4 py-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredClasses.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3.5 font-medium text-slate-900 max-w-xs">
                        <div className="font-semibold text-sm">{item.title}</div>
                        <div className="text-[11px] text-blue-700 font-medium">{item.topicLabel}</div>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="font-semibold text-slate-800">{item.timeSlot}</div>
                        <div className="text-slate-500 text-[11px]">{item.sessionDays}</div>
                      </td>
                      <td className="px-4 py-3.5 max-w-xs">
                        <div className="text-slate-800">{item.venue}</div>
                        <div className="text-slate-400 text-[11px]">{item.addressNote}</div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="font-medium text-slate-800">{item.instructor}</div>
                        <div className="text-slate-400 text-[11px]">{item.instructorTitle}</div>
                      </td>
                      <td className="px-4 py-3.5 text-center whitespace-nowrap tabular-nums">
                        <span className="font-semibold text-slate-800">{item.registeredCount}</span>
                        <span className="text-slate-400"> / {item.capacity}</span>
                      </td>
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <button
                          onClick={() => setRegisteringClass(item)}
                          disabled={item.registeredCount >= item.capacity}
                          className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-lg text-xs font-semibold transition-colors shadow-2xs"
                        >
                          Đăng ký
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Citizen Registration Modal */}
      {registeringClass && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div 
            className="relative w-full max-w-lg bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white border-b border-blue-700">
              <div>
                <h3 className="font-serif font-bold text-base text-white">
                  Đăng Ký Tham Gia Lớp Học
                </h3>
                <p className="text-xs text-sky-200">
                  {registeringClass.title}
                </p>
              </div>
              <button
                onClick={() => setRegisteringClass(null)}
                className="text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 bg-slate-50">
              {regSuccess ? (
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-lg text-center space-y-2">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                  <div className="font-bold text-emerald-900 text-base">
                    Đăng ký học thành công!
                  </div>
                  <p className="text-xs text-emerald-700">
                    Cảm ơn cô/chú/anh/chị <strong>{regFullName}</strong>. Ban Quản lý sẽ liên hệ qua số điện thoại để thông báo lịch tập trung cụ thể.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1">
                    <div><strong>Thời gian:</strong> {registeringClass.timeSlot} ({registeringClass.sessionDays})</div>
                    <div><strong>Địa điểm:</strong> {registeringClass.venue}</div>
                    <div><strong>Học phí:</strong> Hoàn toàn miễn phí 100%</div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Họ và tên người học <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={regFullName}
                      onChange={(e) => setRegFullName(e.target.value)}
                      placeholder="Ví dụ: Nguyễn Văn Hai..."
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Số điện thoại liên hệ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="0918.xxx.xxx"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Năm sinh (tùy chọn)
                      </label>
                      <input
                        type="text"
                        value={regBirthYear}
                        onChange={(e) => setRegBirthYear(e.target.value)}
                        placeholder="Ví dụ: 1978"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Ấp cư trú trên địa bàn Xã Long Hồ <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={regHamlet}
                      onChange={(e) => setRegHamlet(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500"
                    >
                      {HAMLETS_LIST.map((h) => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nguyện vọng / Câu hỏi gửi giảng viên (nếu có)
                    </label>
                    <textarea
                      rows={2}
                      value={regNote}
                      onChange={(e) => setRegNote(e.target.value)}
                      placeholder="Ví dụ: Nhà có vườn cam sành đang bị vàng lá, muốn hỏi thêm cách khắc phục..."
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setRegisteringClass(null)}
                      className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-semibold"
                    >
                      Đóng
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs"
                    >
                      Xác nhận đăng ký học
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Admin View Attendees Modal */}
      {viewingRegistrationsClass && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div 
            className="relative w-full max-w-3xl bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white border-b border-blue-700">
              <div>
                <h3 className="font-serif font-bold text-base text-white">
                  Danh Sách Học Viên Đăng Ký ({currentClassAttendees.length} người)
                </h3>
                <div className="text-xs text-sky-200 truncate max-w-lg">
                  {viewingRegistrationsClass.title}
                </div>
              </div>
              <button
                onClick={() => setViewingRegistrationsClass(null)}
                className="text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {currentClassAttendees.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs">
                  Chưa có lượt đăng ký trực tuyến nào cho lớp học này.
                </div>
              ) : (
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left text-xs text-slate-800">
                    <thead className="bg-slate-100 font-semibold text-slate-700 border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2.5">STT</th>
                        <th className="px-3 py-2.5">Họ và tên</th>
                        <th className="px-3 py-2.5">Số điện thoại</th>
                        <th className="px-3 py-2.5">Ấp cư trú</th>
                        <th className="px-3 py-2.5">Năm sinh</th>
                        <th className="px-3 py-2.5">Thời gian ĐK</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {currentClassAttendees.map((att, idx) => (
                        <tr key={att.id} className="hover:bg-slate-50">
                          <td className="px-3 py-2.5 text-slate-400 tabular-nums">{idx + 1}</td>
                          <td className="px-3 py-2.5 font-semibold text-slate-900">{att.fullName}</td>
                          <td className="px-3 py-2.5 font-mono text-slate-700">{att.phoneNumber}</td>
                          <td className="px-3 py-2.5">{att.hamlet}</td>
                          <td className="px-3 py-2.5 tabular-nums text-slate-500">{att.yearOfBirth || '-'}</td>
                          <td className="px-3 py-2.5 text-slate-400 text-[11px] tabular-nums">{att.registeredAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                Xuất file danh sách phục vụ điểm danh và cấp chứng nhận hoàn thành.
              </span>
              <button
                onClick={() => alert('Đã sao chép danh sách học viên vào bộ nhớ tạm để dán vào Excel!')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Sao chép danh sách Excel</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Add Class Modal */}
      {isAddClassModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div 
            className="relative w-full max-w-2xl bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white border-b border-blue-700">
              <h3 className="font-serif font-bold text-base text-white">
                Mở Lớp Học / Chuyên Đề Mới Lên Lịch Học
              </h3>
              <button
                onClick={() => setIsAddClassModalOpen(false)}
                className="text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateClass} className="p-6 space-y-4 overflow-y-auto flex-1 bg-slate-50">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tên lớp học / Chuyên đề bồi dưỡng <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ví dụ: Kỹ thuật trồng nấm rơm trong nhà..."
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Lĩnh vực đào tạo
                  </label>
                  <select
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value as Exclude<DocumentCategory, 'all'>)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                  >
                    <option value="nong_nghiep">Kỹ thuật nông nghiệp</option>
                    <option value="chuyen_doi_so">Chuyển đổi số & Tin học</option>
                    <option value="nghe_nong_thon">Nghề thủ công & Khởi nghiệp</option>
                    <option value="y_te_suc_khoe">Sức khỏe cộng đồng</option>
                    <option value="phap_luat">Pháp luật</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Chỉ tiêu tuyển sinh (Sĩ số tối đa)
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={200}
                    value={newCapacity}
                    onChange={(e) => setNewCapacity(parseInt(e.target.value) || 30)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Giảng viên / Báo cáo viên phụ trách <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newInstructor}
                    onChange={(e) => setNewInstructor(e.target.value)}
                    placeholder="Ví dụ: Kỹ sư Lê Văn Bình..."
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Học vị / Đơn vị công tác
                  </label>
                  <input
                    type="text"
                    value={newInstructorTitle}
                    onChange={(e) => setNewInstructorTitle(e.target.value)}
                    placeholder="Ví dụ: Cán bộ Trạm Khuyến nông..."
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Khung giờ học
                  </label>
                  <input
                    type="text"
                    value={newTimeSlot}
                    onChange={(e) => setNewTimeSlot(e.target.value)}
                    placeholder="07:30 - 11:30 hoặc 18:30 - 20:30"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Các ngày học trong tuần
                  </label>
                  <input
                    type="text"
                    value={newSessionDays}
                    onChange={(e) => setNewSessionDays(e.target.value)}
                    placeholder="Thứ Bảy, Chủ Nhật hoặc Thứ Ba, Năm, Bảy"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Địa điểm tổ chức
                  </label>
                  <input
                    type="text"
                    value={newVenue}
                    onChange={(e) => setNewVenue(e.target.value)}
                    placeholder="Hội trường UBND Xã, Nhà sinh hoạt Ấp..."
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Địa chỉ cụ thể
                  </label>
                  <input
                    type="text"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mô tả mục tiêu khóa học & quyền lợi học viên
                </label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Mô tả tóm tắt kỹ năng đạt được sau khóa học..."
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddClassModalOpen(false)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs"
                >
                  Đăng lịch học lên web
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

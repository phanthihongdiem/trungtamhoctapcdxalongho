import React, { useState } from 'react';
import { StaffMember, FeedbackItem, FeedbackOfficialResponse, UserRole, AdminUser } from '../types';
import { HAMLETS_LIST } from '../data/initialData';
import { 
  Users, 
  MessageSquare, 
  Phone, 
  Building2, 
  CheckCircle2, 
  Clock, 
  Send, 
  FileText, 
  Award, 
  ShieldCheck, 
  PlusCircle, 
  ChevronRight, 
  AlertCircle,
  HelpCircle,
  Sparkles,
  Search,
  MessageCircle,
  UserCheck
} from 'lucide-react';

interface AboutFeedbackViewProps {
  staffMembers: StaffMember[];
  feedbackList: FeedbackItem[];
  userRole: UserRole;
  currentAdmin: AdminUser | null;
  onSubmitFeedback: (newFeedback: FeedbackItem) => void;
  onReplyFeedback: (feedbackId: string, reply: FeedbackOfficialResponse) => void;
  onDeleteFeedback: (feedbackId: string) => void;
  onRequestAdminLogin: () => void;
}

export const AboutFeedbackView: React.FC<AboutFeedbackViewProps> = ({
  staffMembers,
  feedbackList,
  userRole,
  currentAdmin,
  onSubmitFeedback,
  onReplyFeedback,
  onDeleteFeedback,
  onRequestAdminLogin,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'organization' | 'feedback_form' | 'feedback_list'>('all');
  
  // Feedback Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [hamlet, setHamlet] = useState(HAMLETS_LIST[0]);
  const [targetRecipient, setTargetRecipient] = useState('Toàn thể Ban Giám đốc TTHTCĐ');
  const [topic, setTopic] = useState('Đề xuất mở lớp đào tạo nghề tại ấp');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  // Admin Reply State
  const [replyingFeedback, setReplyingFeedback] = useState<FeedbackItem | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [responderName, setResponderName] = useState(
    currentAdmin?.fullName || 'Đ/c Nguyễn Thị Mỹ Hạnh'
  );
  const [responderTitle, setResponderTitle] = useState(
    currentAdmin?.roleTitle || 'Giám đốc TTHTCĐ · Phó Chủ tịch UBND xã Long Hồ'
  );

  // Official Document Modal
  const [isOfficialDocModalOpen, setIsOfficialDocModalOpen] = useState(false);

  // Filter feedback
  const [feedbackFilter, setFeedbackFilter] = useState<'all' | 'da_tra_loi' | 'dang_xu_ly'>('all');

  const filteredFeedback = feedbackList.filter(f => {
    if (feedbackFilter === 'all') return true;
    return f.status === feedbackFilter;
  });

  const banGiamDoc = staffMembers.filter(s => s.group === 'ban_giam_doc');
  const canBoQuanLy = staffMembers.filter(s => s.group === 'can_bo_quan_ly');

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim()) {
      setFormError('Vui lòng nhập họ và tên của Quý công dân.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 9) {
      setFormError('Vui lòng nhập số điện thoại liên hệ hợp lệ.');
      return;
    }
    if (!title.trim()) {
      setFormError('Vui lòng nhập tiêu đề ý kiến hoặc kiến nghị.');
      return;
    }
    if (!content.trim()) {
      setFormError('Vui lòng nhập nội dung ý kiến đóng góp.');
      return;
    }

    const newItem: FeedbackItem = {
      id: `fb-${Date.now()}`,
      fullName: fullName.trim(),
      phoneNumber: phone.trim(),
      hamlet,
      targetRecipient,
      topic,
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'dang_xu_ly',
    };

    onSubmitFeedback(newItem);
    setSubmitSuccess(true);
    setFullName('');
    setPhone('');
    setTitle('');
    setContent('');

    setTimeout(() => {
      setSubmitSuccess(false);
      setActiveSubTab('feedback_list');
    }, 2200);
  };

  const handleOpenReplyModal = (item: FeedbackItem) => {
    if (userRole !== 'admin') {
      onRequestAdminLogin();
      return;
    }
    setReplyingFeedback(item);
    setReplyContent(item.officialResponse?.content || '');
    setResponderName(currentAdmin?.fullName || 'Đ/c Nguyễn Thị Mỹ Hạnh');
    setResponderTitle(currentAdmin?.roleTitle || 'Giám đốc TTHTCĐ · Phó Chủ tịch UBND xã Long Hồ');
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyingFeedback || !replyContent.trim()) return;

    const reply: FeedbackOfficialResponse = {
      responderName: responderName.trim(),
      responderTitle: responderTitle.trim(),
      responseDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      content: replyContent.trim(),
    };

    onReplyFeedback(replyingFeedback.id, reply);
    setReplyingFeedback(null);
    setReplyContent('');
  };

  const maskPhone = (phoneNumber: string) => {
    if (userRole === 'admin') return phoneNumber;
    if (phoneNumber.length <= 6) return phoneNumber;
    return phoneNumber.substring(0, 4) + '.xxx.' + phoneNumber.substring(phoneNumber.length - 3);
  };

  return (
    <div className="pb-16">
      {/* 1. Header Banner - Civic Royal Blue */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white border-b border-blue-700/60 shadow-md">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#93c5fd_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-200 text-xs font-medium backdrop-blur-sm border border-white/15">
              <Building2 className="w-3.5 h-3.5 text-sky-300" />
              <span>Hồ sơ minh chứng Chỉ số 1 – Tiêu chí 5.2 về Nông thôn mới</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Giới Thiệu Bộ Máy Tổ Chức & Hòm Thư Ý Kiến Nhân Dân
            </h1>

            <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed font-light">
              Công khai danh sách Ban Giám đốc, cán bộ quản lý và trợ lý Trung tâm Học tập Cộng đồng Xã Long Hồ. 
              Kênh tiếp nhận trực tuyến các ý kiến, góp ý, phản ánh và đề xuất của bà con 13 ấp nhằm xây dựng xã hội học tập cơ sở.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsOfficialDocModalOpen(true)}
                className="px-4 py-2.5 bg-white text-blue-900 hover:bg-blue-50 text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-blue-700" />
                <span>Xem văn bản quyết định tổ chức bộ máy</span>
              </button>

              <button
                onClick={() => setActiveSubTab('feedback_form')}
                className="px-4 py-2.5 bg-blue-600/90 hover:bg-blue-600 text-white text-xs font-semibold rounded-lg shadow-sm transition-all border border-blue-400/30 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Gửi ý kiến đóng góp cho Ban Giám đốc</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Ribbon */}
        <div className="bg-blue-950/60 border-t border-white/10 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto gap-2 py-2.5 scrollbar-none text-xs">
              <button
                onClick={() => setActiveSubTab('all')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeSubTab === 'all'
                    ? 'bg-white text-blue-950 font-bold shadow-xs'
                    : 'text-blue-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tất cả nội dung</span>
              </button>

              <button
                onClick={() => setActiveSubTab('organization')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeSubTab === 'organization'
                    ? 'bg-white text-blue-950 font-bold shadow-xs'
                    : 'text-blue-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Ban Giám đốc & Cán bộ quản lý (08 đ/c)</span>
              </button>

              <button
                onClick={() => setActiveSubTab('feedback_form')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeSubTab === 'feedback_form'
                    ? 'bg-white text-blue-950 font-bold shadow-xs'
                    : 'text-blue-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Gửi ý kiến / Góp ý</span>
              </button>

              <button
                onClick={() => setActiveSubTab('feedback_list')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeSubTab === 'feedback_list'
                    ? 'bg-white text-blue-950 font-bold shadow-xs'
                    : 'text-blue-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Ý kiến nhân dân đã tiếp nhận ({feedbackList.length})</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: BAN GIÁM ĐỐC & CÁN BỘ QUẢN LÝ */}
        {(activeSubTab === 'all' || activeSubTab === 'organization') && (
          <section className="space-y-8 animate-fadeIn">
            {/* Header info bar */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>Cơ cấu tổ chức bộ máy</span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
                  I. Ban Giám Đốc Trung Tâm Học Tập Cộng Đồng Xã Long Hồ
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Chỉ đạo, điều hành toàn diện công tác khuyến học, khuyến tài và phổ biến tri thức khoa học tại 13 ấp
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="inline-block text-[11px] bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-md font-semibold">
                  Ngày ban hành: 18/9/2026
                </span>
              </div>
            </div>

            {/* Ban Giám Đốc Cards (3 Members) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {banGiamDoc.map((leader) => (
                <div 
                  key={leader.id}
                  className="bg-white rounded-xl border border-blue-200/80 hover:border-blue-400 hover:shadow-lg transition-all p-6 flex flex-col justify-between relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full pointer-events-none" />
                  
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-700 text-white font-serif font-bold text-lg flex items-center justify-center shadow-md ring-4 ring-blue-50">
                        {leader.avatarInitials}
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                        STT 0{leader.stt}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                        {leader.roleInCenter}
                      </div>
                      <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                        {leader.fullName}
                      </h3>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Chức vụ chính quyền / Đơn vị công tác:</span>
                        <span className="font-semibold text-slate-800">{leader.roleInGovernment}</span>
                      </div>

                      {leader.responsibilities && (
                        <div>
                          <span className="text-slate-400 block text-[11px]">Phân công nhiệm vụ:</span>
                          <span className="text-slate-600 leading-relaxed">{leader.responsibilities}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={`tel:${leader.phone}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 hover:text-blue-900 px-3 py-1.5 rounded-lg transition-colors border border-blue-200/60"
                    >
                      <Phone className="w-3.5 h-3.5 text-blue-600" />
                      <span>{leader.phone}</span>
                    </a>

                    <button
                      onClick={() => {
                        setTargetRecipient(`Đ/c ${leader.fullName} (${leader.roleInCenter})`);
                        setActiveSubTab('feedback_form');
                      }}
                      className="text-xs text-slate-500 hover:text-blue-700 font-medium inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Gửi góp ý</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* SECTION 2: CÁN BỘ QUẢN LÝ VÀ TRỢ LÝ (5 Members) */}
            <div className="pt-6">
              <div className="border-b border-slate-200 pb-3 mb-6">
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  II. Cán Bộ Quản Lý, Kế Toán Và Thủ Quỹ
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Đội ngũ chuyên trách điều phối lớp học, vận hành phòng máy vi tính và đảm bảo chính sách hỗ trợ học viên
                </p>
              </div>

              {/* Grid 5 cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {canBoQuanLy.map((staff) => (
                  <div
                    key={staff.id}
                    className="bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 font-semibold text-sm flex items-center justify-center border border-slate-200">
                            {staff.avatarInitials}
                          </div>
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block">
                              {staff.roleInCenter}
                            </span>
                            <div className="font-bold text-slate-900 text-sm">
                              {staff.fullName}
                            </div>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                          #{staff.stt}
                        </span>
                      </div>

                      <div className="text-xs space-y-1.5 pt-2 border-t border-slate-100">
                        <div>
                          <span className="text-slate-400 text-[11px]">Đơn vị công tác:</span>
                          <div className="text-slate-700 font-medium">{staff.roleInGovernment}</div>
                        </div>
                        {staff.responsibilities && (
                          <div>
                            <span className="text-slate-400 text-[11px]">Nhiệm vụ:</span>
                            <div className="text-slate-600 text-[11px] leading-relaxed">{staff.responsibilities}</div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <a
                        href={`tel:${staff.phone}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-700 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-blue-600" />
                        <span>{staff.phone}</span>
                      </a>

                      <button
                        onClick={() => {
                          setTargetRecipient(`Đ/c ${staff.fullName} (${staff.roleInCenter})`);
                          setActiveSubTab('feedback_form');
                        }}
                        className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        Ý kiến trực tiếp
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Table summary format (Exact match with uploaded administrative document) */}
            <div className="mt-6 bg-slate-50 rounded-xl border border-slate-200 p-5 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-700" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Bảng trích yếu Danh sách phân công công tác
                  </span>
                </div>
                <button
                  onClick={() => setIsOfficialDocModalOpen(true)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <span>Xem định dạng văn bản gốc</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3 w-12 text-center">STT</th>
                      <th className="py-2.5 px-3">Họ và tên</th>
                      <th className="py-2.5 px-3">Chức vụ tại TTHTCĐ</th>
                      <th className="py-2.5 px-3">Chức vụ chính quyền / Đơn vị công tác</th>
                      <th className="py-2.5 px-3">Số điện thoại</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="bg-blue-50/60 font-semibold text-blue-950">
                      <td colSpan={5} className="py-2 px-3 uppercase text-[11px] tracking-wider">
                        I. BAN GIÁM ĐỐC TRUNG TÂM HỌC TẬP CỘNG ĐỒNG
                      </td>
                    </tr>
                    {banGiamDoc.map(b => (
                      <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 px-3 text-center font-mono font-medium text-slate-500">{b.stt}</td>
                        <td className="py-2.5 px-3 font-semibold text-slate-900">{b.fullName}</td>
                        <td className="py-2.5 px-3 text-blue-700 font-medium">{b.roleInCenter}</td>
                        <td className="py-2.5 px-3 text-slate-600">{b.roleInGovernment}</td>
                        <td className="py-2.5 px-3 font-mono text-slate-700">{b.phone}</td>
                      </tr>
                    ))}

                    <tr className="bg-blue-50/60 font-semibold text-blue-950">
                      <td colSpan={5} className="py-2 px-3 uppercase text-[11px] tracking-wider">
                        II. CÁN BỘ QUẢN LÝ VÀ TRỢ LÝ
                      </td>
                    </tr>
                    {canBoQuanLy.map(c => (
                      <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 px-3 text-center font-mono font-medium text-slate-500">{c.stt}</td>
                        <td className="py-2.5 px-3 font-semibold text-slate-900">{c.fullName}</td>
                        <td className="py-2.5 px-3 text-blue-700 font-medium">{c.roleInCenter}</td>
                        <td className="py-2.5 px-3 text-slate-600">{c.roleInGovernment}</td>
                        <td className="py-2.5 px-3 font-mono text-slate-700">{c.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 2: FORM TIẾP NHẬN Ý KIẾN & GÓP Ý CỦA BÀ CON */}
        {(activeSubTab === 'all' || activeSubTab === 'feedback_form') && (
          <section className="bg-white rounded-2xl border border-blue-200/90 shadow-sm p-6 sm:p-8 animate-fadeIn">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
                <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                <span>Hòm thư điện tử công dân</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                Gửi Ý Kiến, Kiến Nghị & Đề Xuất Đến Ban Giám Đốc
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Mọi ý kiến của nhân dân trên địa bàn 13 ấp về nhu cầu mở lớp dạy nghề, góp ý tài liệu học tập, phản ánh cơ sở vật chất hay khiếu nại kiến nghị đều được Ban Giám đốc tiếp nhận và phúc đáp công khai hoặc liên hệ trực tiếp.
              </p>
            </div>

            {submitSuccess ? (
              <div className="mt-6 p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Gửi ý kiến đóng góp thành công!</h4>
                  <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                    Cảm ơn Quý công dân đã gửi ý kiến. Trung tâm Học tập Cộng đồng Xã Long Hồ đã ghi nhận vào sổ theo dõi và chuyển đến bộ phận chuyên trách xử lý, trả lời sớm nhất.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitFeedback} className="mt-8 space-y-5">
                {formError && (
                  <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Họ và tên của Quý công dân <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ví dụ: Nguyễn Văn Nam"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Số điện thoại liên hệ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ví dụ: 0918.xxx.xxx"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Ấp cư trú trên địa bàn Xã Long Hồ <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={hamlet}
                      onChange={(e) => setHamlet(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
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
                      Bộ phận / Người tiếp nhận ý kiến
                    </label>
                    <select
                      value={targetRecipient}
                      onChange={(e) => setTargetRecipient(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                    >
                      <option value="Toàn thể Ban Giám đốc TTHTCĐ">Toàn thể Ban Giám đốc TTHTCĐ</option>
                      <option value="Đ/c Nguyễn Thị Mỹ Hạnh (Giám đốc kiêm PCT UBND Xã)">
                        Đ/c Nguyễn Thị Mỹ Hạnh (Giám đốc kiêm PCT UBND Xã)
                      </option>
                      <option value="Đ/c Lưu Quốc Trụ (Phó Giám đốc kiêm Chủ tịch Hội Khuyến học)">
                        Đ/c Lưu Quốc Trụ (Phó Giám đốc kiêm Chủ tịch Hội Khuyến học)
                      </option>
                      <option value="Đ/c Nguyễn Văn Nho (Phó Giám đốc phụ trách chuyên môn)">
                        Đ/c Nguyễn Văn Nho (Phó Giám đốc phụ trách chuyên môn)
                      </option>
                      <option value="Bộ phận Cán bộ Quản lý & Phòng máy vi tính">
                        Bộ phận Cán bộ Quản lý & Phòng máy vi tính
                      </option>
                      <option value="Bộ phận Kế toán - Thủ quỹ (Chính sách hỗ trợ học viên)">
                        Bộ phận Kế toán - Thủ quỹ (Chính sách hỗ trợ học viên)
                      </option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Chủ đề ý kiến đóng góp
                    </label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                    >
                      <option value="Đề xuất mở lớp đào tạo nghề tại ấp">Đề xuất mở lớp đào tạo nghề tại ấp</option>
                      <option value="Chương trình & Tài liệu học tập">Chương trình & Tài liệu học tập</option>
                      <option value="Cơ sở vật chất & Nhà văn hóa">Cơ sở vật chất & Nhà văn hóa ấp</option>
                      <option value="Chính sách hỗ trợ học viên">Chính sách hỗ trợ học viên (tiền ăn, đi lại)</option>
                      <option value="Thời gian & Địa điểm lớp học">Thời gian & Địa điểm lớp học</option>
                      <option value="Ý kiến kiến nghị khác">Ý kiến kiến nghị khác</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tiêu đề tóm tắt ý kiến <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Ví dụ: Đề nghị mở lớp bồi dưỡng kỹ thuật ghép bưởi tại ấp..."
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nội dung chi tiết ý kiến / kiến nghị <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Mô tả chi tiết nguyện vọng, địa điểm đề xuất, đối tượng tham gia hoặc các vấn đề cần Trung tâm hỗ trợ..."
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all leading-relaxed"
                  />
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                    <span>* Thông tin số điện thoại của Quý công dân được bảo mật theo quy định tiếp nhận công vụ.</span>
                    <span>{content.length} ký tự</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Gửi ý kiến đóng góp</span>
                  </button>
                </div>
              </form>
            )}
          </section>
        )}

        {/* SECTION 3: DANH SÁCH Ý KIẾN ĐÃ TIẾP NHẬN & PHÚC ĐÁP */}
        {(activeSubTab === 'all' || activeSubTab === 'feedback_list') && (
          <section className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Công khai tiếp nhận & phúc đáp</span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
                  Ý Kiến & Kiến Nghị Của Nhân Dân Đã Được Xử Lý
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Minh bạch dân chủ cơ sở - kết quả trả lời của Ban Giám đốc Trung tâm HTCĐ Xã Long Hồ
                </p>
              </div>

              {/* Status filter tabs */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs self-start sm:self-auto">
                <button
                  onClick={() => setFeedbackFilter('all')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    feedbackFilter === 'all'
                      ? 'bg-white font-semibold text-blue-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tất cả ({feedbackList.length})
                </button>
                <button
                  onClick={() => setFeedbackFilter('da_tra_loi')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    feedbackFilter === 'da_tra_loi'
                      ? 'bg-white font-semibold text-emerald-800 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Đã có phúc đáp ({feedbackList.filter(f => f.status === 'da_tra_loi').length})
                </button>
                <button
                  onClick={() => setFeedbackFilter('dang_xu_ly')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    feedbackFilter === 'dang_xu_ly'
                      ? 'bg-white font-semibold text-amber-800 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Đang xử lý ({feedbackList.filter(f => f.status === 'dang_xu_ly').length})
                </button>
              </div>
            </div>

            {/* List Cards */}
            {filteredFeedback.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400 text-xs">
                Chưa có ý kiến nào trong danh mục này.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFeedback.map((fb) => (
                  <div
                    key={fb.id}
                    className="bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all p-5 sm:p-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                            fb.status === 'da_tra_loi'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {fb.status === 'da_tra_loi' ? (
                              <>
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>Đã có văn bản trả lời</span>
                              </>
                            ) : (
                              <>
                                <Clock className="w-3 h-3 text-amber-600" />
                                <span>Đang tiếp nhận xử lý</span>
                              </>
                            )}
                          </span>

                          <span className="text-[11px] font-medium bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                            {fb.topic}
                          </span>

                          <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                            {fb.hamlet}
                          </span>
                        </div>

                        <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900">
                          {fb.title}
                        </h3>
                      </div>

                      <div className="text-right shrink-0 text-xs text-slate-400 tabular-nums">
                        {fb.createdAt}
                      </div>
                    </div>

                    <div className="mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/80 p-3.5 rounded-lg border border-slate-100">
                      <div className="text-[11px] font-medium text-slate-500 mb-1 flex items-center gap-2">
                        <span>Người gửi: <strong>{fb.fullName}</strong> ({maskPhone(fb.phoneNumber)})</span>
                        <span>·</span>
                        <span>Gửi đến: <strong className="text-blue-700">{fb.targetRecipient}</strong></span>
                      </div>
                      <p>{fb.content}</p>
                    </div>

                    {/* Official Response Box if available */}
                    {fb.officialResponse && (
                      <div className="mt-4 p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 relative">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-blue-700" />
                            <span className="text-xs font-bold text-blue-900">
                              Ý kiến phản hồi từ: {fb.officialResponse.responderName}
                            </span>
                            <span className="text-[11px] text-blue-600 font-medium">
                              ({fb.officialResponse.responderTitle})
                            </span>
                          </div>
                          <span className="text-[11px] text-blue-600 tabular-nums font-mono">
                            {fb.officialResponse.responseDate}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                          {fb.officialResponse.content}
                        </p>
                      </div>
                    )}

                    {/* Admin Actions */}
                    {userRole === 'admin' && (
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2 text-xs">
                        <button
                          onClick={() => handleOpenReplyModal(fb)}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-1.5 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{fb.officialResponse ? 'Sửa phúc đáp' : 'Phúc đáp ý kiến này'}</span>
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm('Quý cán bộ có chắc muốn xóa ý kiến này?')) {
                              onDeleteFeedback(fb.id);
                            }
                          }}
                          className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-medium transition-colors"
                        >
                          Xóa
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>

      {/* MODAL 1: BẢNG TRÍCH YẾU VĂN BẢN CHÍNH THỨC (QUYẾT ĐỊNH TỔ CHỨC BỘ MÁY) */}
      {isOfficialDocModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
            {/* Modal Top Bar */}
            <div className="bg-blue-900 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-sky-300" />
                <span className="font-serif font-bold text-sm sm:text-base">
                  Văn Bản Hồ Sơ Minh Chứng Nông Thôn Mới (Chỉ số 1 – Tiêu chí 5.2)
                </span>
              </div>
              <button
                onClick={() => setIsOfficialDocModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Official Document Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto text-slate-800 text-xs sm:text-sm">
              {/* Header Decree */}
              <div className="grid grid-cols-2 gap-4 text-center border-b border-slate-200 pb-5">
                <div>
                  <div className="font-bold uppercase tracking-wider text-xs">UBND XÃ LONG HỒ</div>
                  <div className="font-bold uppercase tracking-wider text-xs text-blue-900">TRUNG TÂM HỌC TẬP CỘNG ĐỒNG</div>
                  <div className="text-[11px] text-slate-500 mt-1">***</div>
                </div>
                <div>
                  <div className="font-bold uppercase tracking-wider text-xs">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
                  <div className="text-xs font-semibold">Độc lập - Tự do - Hạnh phúc</div>
                  <div className="text-[11px] italic text-slate-600 mt-1">Long Hồ, ngày 18 tháng 9 năm 2026</div>
                </div>
              </div>

              {/* Title */}
              <div className="text-center space-y-1 py-2">
                <h3 className="font-serif font-bold text-base sm:text-lg uppercase text-slate-900">
                  DANH SÁCH
                </h3>
                <p className="font-serif font-bold text-sm uppercase text-blue-900">
                  BAN GIÁM ĐỐC, CÁN BỘ QUẢN LÝ VÀ GIÁO VIÊN/BÁO CÁO VIÊN
                </p>
                <p className="text-xs italic text-slate-600">
                  (Phục vụ hồ sơ minh chứng Chỉ số 1 – Tiêu chí 5.2 về Nông thôn mới)
                </p>
              </div>

              {/* Section I */}
              <div>
                <h4 className="font-bold text-xs sm:text-sm uppercase text-blue-900 mb-2">
                  I. BAN GIÁM ĐỐC TRUNG TÂM HỌC TẬP CỘNG ĐỒNG
                </h4>
                <div className="border border-slate-300 rounded-lg overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100 border-b border-slate-300 font-bold">
                      <tr>
                        <th className="p-2 border-r border-slate-300 text-center w-12">STT</th>
                        <th className="p-2 border-r border-slate-300">Họ và tên</th>
                        <th className="p-2 border-r border-slate-300">Chức vụ tại TTHTCĐ</th>
                        <th className="p-2 border-r border-slate-300">Chức vụ chính quyền / Đơn vị công tác</th>
                        <th className="p-2 text-center">Số điện thoại</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-normal">
                      {banGiamDoc.map(item => (
                        <tr key={item.id} className="hover:bg-slate-50">
                          <td className="p-2 border-r border-slate-200 text-center font-semibold">{item.stt}</td>
                          <td className="p-2 border-r border-slate-200 font-semibold text-slate-900">{item.fullName}</td>
                          <td className="p-2 border-r border-slate-200 text-blue-800">{item.roleInCenter}</td>
                          <td className="p-2 border-r border-slate-200">{item.roleInGovernment}</td>
                          <td className="p-2 font-mono text-center font-medium">{item.phone}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section II */}
              <div>
                <h4 className="font-bold text-xs sm:text-sm uppercase text-blue-900 mb-2">
                  II. CÁN BỘ QUẢN LÝ VÀ TRỢ LÝ
                </h4>
                <div className="border border-slate-300 rounded-lg overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100 border-b border-slate-300 font-bold">
                      <tr>
                        <th className="p-2 border-r border-slate-300 text-center w-12">STT</th>
                        <th className="p-2 border-r border-slate-300">Họ và tên</th>
                        <th className="p-2 border-r border-slate-300">Nhiệm vụ phân công</th>
                        <th className="p-2 border-r border-slate-300">Chức vụ chính quyền / Đơn vị công tác</th>
                        <th className="p-2 text-center">Số điện thoại</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-normal">
                      {canBoQuanLy.map(item => (
                        <tr key={item.id} className="hover:bg-slate-50">
                          <td className="p-2 border-r border-slate-200 text-center font-semibold">{item.stt}</td>
                          <td className="p-2 border-r border-slate-200 font-semibold text-slate-900">{item.fullName}</td>
                          <td className="p-2 border-r border-slate-200 text-blue-800">{item.roleInCenter}</td>
                          <td className="p-2 border-r border-slate-200">{item.roleInGovernment}</td>
                          <td className="p-2 font-mono text-center font-medium">{item.phone}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Notes */}
              <div className="bg-blue-50 p-4 rounded-xl text-xs text-blue-900 space-y-1 border border-blue-200">
                <div className="font-bold">Ghi chú thực hiện:</div>
                <p>
                  Danh sách được ban hành phục vụ công tác thanh kiểm tra, lưu trữ hồ sơ công nhận xã đạt chuẩn Nông thôn mới nâng cao tiêu chí 5.2 về Giáo dục và Học tập cộng đồng. Mọi thay đổi về nhân sự kiêm nhiệm được cập nhật thường xuyên tại cổng thông tin này.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-end">
              <button
                onClick={() => setIsOfficialDocModalOpen(false)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-lg transition-colors"
              >
                Đóng văn bản
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: ADMIN PHÚC ĐÁP Ý KIẾN CỦA DÂN */}
      {replyingFeedback && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-blue-900 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-sky-300" />
                <span className="font-serif font-bold text-sm">
                  Phúc Đáp Ý Kiến Của Quý Công Dân
                </span>
              </div>
              <button
                onClick={() => setReplyingFeedback(null)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendReply} className="p-6 space-y-4">
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs space-y-1">
                <div>Người gửi: <strong>{replyingFeedback.fullName}</strong> ({replyingFeedback.hamlet})</div>
                <div>Tiêu đề: <strong>{replyingFeedback.title}</strong></div>
                <div className="text-slate-600 italic">"{replyingFeedback.content}"</div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Người đại diện trả lời
                </label>
                <input
                  type="text"
                  value={responderName}
                  onChange={(e) => setResponderName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Chức vụ
                </label>
                <input
                  type="text"
                  value={responderTitle}
                  onChange={(e) => setResponderTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nội dung phúc đáp chính thức <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Ghi rõ biện pháp giải quyết, kế hoạch tổ chức lớp học hoặc giải thích cho công dân..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs leading-relaxed"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setReplyingFeedback(null)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm"
                >
                  Lưu & Xuất bản phúc đáp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

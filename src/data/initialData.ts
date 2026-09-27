import { DocumentItem, AnnouncementItem, ClassScheduleItem, RegistrationItem } from '../types';

export const HAMLETS_LIST = [
  'Ấp An Lạc',
  'Ấp Long Thuận',
  'Ấp Phước Ngươn',
  'Ấp Phú Hưng',
  'Ấp Thạnh Hưng',
  'Ấp Bình Hòa',
  'Ấp Tân Hưng',
  'Khu vực Thị tứ Long Hồ',
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-001',
    title: 'Sổ tay Kỹ thuật Trồng & Chăm sóc Bưởi Da Xanh Đạt Chuẩn VietGAP',
    codeNumber: 'ST-01/NN-LH2026',
    category: 'nong_nghiep',
    categoryLabel: 'Nông nghiệp & Khuyến nông',
    issuer: 'Hội Nông Dân Xã & Trạm Khuyến Nông',
    author: 'Kỹ sư Võ Văn Kiệt',
    publishDate: '2026-03-15',
    summary: 'Tài liệu hướng dẫn toàn diện quy trình thâm canh bưởi da xanh thích ứng với biến đổi khí hậu vùng đồng bằng sông Cửu Long, kỹ thuật tạo cành tán, xử lý ra hoa nghịch vụ và phòng chống rệp sáp, sâu đục trái.',
    content: `CHƯƠNG I: ĐẶC TÍNH SINH HỌC VÀ CHUẨN BỊ ĐẤT TRỒNG
1. Yêu cầu thổ nhưỡng: Cây bưởi da xanh thích hợp với đất phù sa bồi, độ pH từ 5.5 - 6.5. Đắp mô cao từ 0.6m - 0.8m tránh ngập úng vào mùa triều cường tháng 9-10 âm lịch.
2. Thiết kế mương vườn: Mương rộng 2-3m, sâu 1.2-1.5m, lắp đặt cống điều tiết triều cường có nắp bọng tự động.

CHƯƠNG II: QUY TRÌNH BÓN PHÂN HỮU CƠ SINH HỌC
- Bón lót: Mỗi hố bón 15-20kg phân chuồng hoai mục ủ trichoderma kết hợp 0.5kg lân nung chảy.
- Thời kỳ kinh doanh: Giảm 30% phân hóa học, tăng cường phân bón hữu cơ vi sinh và dịch trùn quế định kỳ 45 ngày/lần.

CHƯƠNG III: QUẢN LÝ DỊCH HẠI THEO PHƯƠNG PHÁP IPM
- Bao trái sớm khi đường kính trái đạt 4-5cm bằng túi vải chuyên dụng giúp ngăn ruồi đục trái và sâu đục vỏ không cần dùng thuốc hóa học độc hại.
- Duy trì thảm cỏ xuyến chi hoặc cỏ lạc dại giữ ẩm vườn, hạn chế xói mòn và tạo nơi cư trú cho thiên địch có ích.`,
    keyTakeaways: [
      'Xử lý ra hoa nghịch vụ bằng biện pháp xiết nước kết hợp tỉa cành thông thoáng.',
      'Sử dụng 100% túi bao trái đạt chuẩn bảo vệ thực vật sạch.',
      'Ứng dụng phân ủ vi sinh bản địa giảm 35% chi phí đầu vào.'
    ],
    fileFormat: 'PDF',
    fileSize: '4.2 MB',
    pageCount: 36,
    downloadCount: 342,
    views: 1280,
    isPinned: true,
    targetAudience: 'Hội viên nông dân, nhà vườn trồng cây ăn trái trên địa bàn xã Long Hồ',
    fileName: 'So-Tay-Ky-Thuat-Buoi-Da-Xanh-VietGAP-LongHo.pdf',
    isOfficialApproved: true,
  },
  {
    id: 'doc-002',
    title: 'Cẩm nang Hướng dẫn Sử dụng Ứng dụng VNeID & Dịch vụ Công Trực tuyến Mức độ Toàn trình',
    codeNumber: 'HD-04/CĐS-LH2026',
    category: 'chuyen_doi_so',
    categoryLabel: 'Chuyển đổi số & Dịch vụ công',
    issuer: 'Tổ Công nghệ Số Cộng đồng Xã Long Hồ',
    author: 'Tổ Biên soạn CĐS Xã',
    publishDate: '2026-02-28',
    summary: 'Hướng dẫn từng bước bằng hình ảnh minh họa cách kích hoạt tài khoản định danh điện tử Mức 2, nộp hồ sơ xin cấp đổi giấy tờ hộ tịch, đăng ký lưu trú và tích hợp bảo hiểm y tế trên điện thoại thông minh.',
    content: `MỤC I: KÍCH HOẠT VÀ BẢO MẬT TÀI KHOẢN VNeID CẤP 2
1. Đến trực tiếp Công an Xã Long Hồ hoặc Bộ phận Một cửa để chụp ảnh và lăn vân tay cấp mức 2.
2. Thiết lập mật khẩu mạnh và mã passcode 6 số bảo mật. Tuyệt đối không cung cấp mã OTP cho bất kỳ ai xưng danh công an gọi điện thoại.

MỤC II: THỰC HIỆN CÁC THỦ TỤC DỊCH VỤ CÔNG TRỰC TUYẾN PHỔ BIẾN
1. Thủ tục xác nhận tình trạng hôn nhân, đăng ký khai sinh, khai tử.
2. Đăng ký tạm trú, thông báo lưu trú khi người thân ở lại nhà.
3. Xuất trình thẻ Căn cước và Thẻ BHYT số khi đi khám chữa bệnh tại Trạm Y tế Xã Long Hồ hoặc Trung tâm Y tế huyện mà không cần mang thẻ giấy.

MỤC III: THANH TOÁN KHÔNG DÙNG TIỀN MẶT TIỀN ĐIỆN, NƯỚC VÀ HỌC PHÍ
- Quét mã VietQR trên hóa đơn hàng tháng nhanh chóng qua ứng dụng ngân hàng số hoặc ví viễn thông Viettel Money.`,
    keyTakeaways: [
      'Đi khám bệnh tại Trạm Y tế chỉ cần quét mã QR trên ứng dụng VNeID.',
      'Nộp hồ sơ trực tuyến tại nhà tiết kiệm thời gian đi lại cho bà con các ấp.',
      'Cảnh giác phòng ngừa thủ đoạn lừa đảo công nghệ cao qua điện thoại.'
    ],
    fileFormat: 'PDF',
    fileSize: '6.8 MB',
    pageCount: 28,
    downloadCount: 512,
    views: 2190,
    isPinned: true,
    targetAudience: 'Toàn thể nhân dân, cán bộ công chức và đoàn viên thanh niên xã',
    fileName: 'Cam-Nang-VNeID-Dich-Vu-Cong-Xa-Long-Ho.pdf',
    isOfficialApproved: true,
  },
  {
    id: 'doc-003',
    title: 'Điểm mới của Luật Đất đai năm 2024 liên quan trực tiếp đến Quyền sử dụng Đất Nông nghiệp',
    codeNumber: 'PL-02/TTPBGDPL-LH',
    category: 'phap_luat',
    categoryLabel: 'Chính sách & Pháp luật',
    issuer: 'Hội đồng Phối hợp Phổ biến GDPL Xã Long Hồ',
    author: 'Cán bộ Tư pháp - Hộ tịch',
    publishDate: '2026-01-20',
    summary: 'Tập hợp các quy định pháp luật mới nhất về chuyển mục đích sử dụng đất, cấp đổi giấy chứng nhận quyền sử dụng đất nông thôn, mở rộng hạn mức nhận chuyển quyền đất nông nghiệp và quyền lợi của hộ gia đình cá nhân.',
    content: `I. MỞ RỘNG HẠN MỨC NHẬN CHUYỂN QUYỀN SỬ DỤNG ĐẤT NÔNG NGHIỆP
- Hạn mức nhận chuyển quyền sử dụng đất nông nghiệp của cá nhân được mở rộng lên không quá 15 lần hạn mức giao đất, tạo điều kiện thuận lợi cho mô hình kinh tế tập thể, tích tụ ruộng đất làm vườn quy mô trang trại lớn.

II. BỎ KHUNG GIÁ ĐẤT VÀ XÂY DỰNG BẢNG GIÁ ĐẤT ĐỊNH KỲ
- Việc bồi thường, hỗ trợ tái định cư khi Nhà nước thu hồi đất bảo đảm công khai, minh bạch, sát với giá thị trường thực tế.

III. CẤP GIẤY CHỨNG NHẬN CHO HỘ ĐANG SỬ DỤNG ĐẤT ỔN ĐỊNH KHÔNG CÓ TRANH CHẤP
- Hướng dẫn điều kiện và hồ sơ xem xét công nhận quyền sử dụng đất đối với diện tích đất do khai hoang, sử dụng lâu đời trước ngày 01/7/2014 không có tranh chấp tại địa bàn xã.`,
    keyTakeaways: [
      'Tạo hành lang thông thoáng cho chuyển đổi cây trồng vật nuôi trên đất vườn.',
      'Bảo vệ quyền thừa kế và tặng cho đất đai trong gia đình theo quy định mới.',
      'Rõ ràng trình tự hòa giải tranh chấp đất đai tại UBND cấp xã.'
    ],
    fileFormat: 'DOCX',
    fileSize: '1.9 MB',
    pageCount: 22,
    downloadCount: 198,
    views: 890,
    isPinned: false,
    targetAudience: 'Hộ gia đình, chủ hộ canh tác nông nghiệp, tổ trưởng các tổ tự quản',
    fileName: 'Diem-Moi-Luat-Dat-Dai-2024-Nguoi-Dan-Nong-Thon.docx',
    isOfficialApproved: true,
  },
  {
    id: 'doc-004',
    title: 'Tài liệu Hướng dẫn Phòng ngừa Bệnh Mãn tính và Sơ cấp cứu Ban đầu tại Gia đình',
    codeNumber: 'YT-03/TYT-LH2026',
    category: 'y_te_suc_khoe',
    categoryLabel: 'Y tế & Sức khỏe cộng đồng',
    issuer: 'Trạm Y Tế Xã Long Hồ',
    author: 'Bác sĩ CK I Trần Thị Mai',
    publishDate: '2026-03-05',
    summary: 'Cung cấp kiến thức chăm sóc người cao tuổi bị tăng huyết áp, tiểu đường; chế độ dinh dưỡng giảm muối đường và kỹ năng xử trí tai biến ngã té, đuối nước vùng sông nước Cửu Long.',
    content: `1. KIỂM SOÁT HUYẾT ÁP VÀ PHÒNG NGỪA ĐỘT QUỴ MÙA NẮNG NÓNG
- Giữ thói quen đo huyết áp mỗi buổi sáng sau khi thức dậy 15 phút.
- Nguyên tắc ăn nhạt: Giảm lượng nước mắm, cá kho khô mặn trong bữa cơm hàng ngày.
- Uống đủ 1.5 - 2 lít nước mỗi ngày, tránh tắm đêm đột ngột sau khi đi lao động ngoài đồng về.

2. CÁC DẤU HIỆU CẢNH BÁO ĐỘT QUỴ SỚM (F.A.S.T)
- F (Face): Miệng bị méo, lệch một bên khi cười.
- A (Arm): Một bên tay hoặc chân yếu, không nâng lên nổi.
- S (Speech): Giọng nói ngọng, líu lưỡi hoặc không nói được tròn câu.
- T (Time): Gọi ngay số cấp cứu 115 hoặc chuyển nhanh đến cơ sở y tế gần nhất trong giờ vàng (trước 4.5 giờ).

3. SƠ CỨU ĐUỐI NƯỚC Ở TRẺ EM VÙNG KÊNH RẠCH
- Tuyệt đối không dốc ngược nạn nhân chạy vòng tròn. Đặt nằm ngửa trên nền cứng, hà hơi thổi ngạt kết hợp ép tim ngoài lồng ngực ngay lập tức.`,
    keyTakeaways: [
      'Ghi nhớ quy tắc F.A.S.T để cứu sống người thân khi nghi ngờ đột quỵ.',
      'Khám sàng lọc tiểu đường và huyết áp miễn phí hàng tháng tại Trạm Y tế xã.',
      'Trang bị phao cứu sinh và giám sát trẻ nhỏ tại khu vực cầu khỉ, bờ kinh.'
    ],
    fileFormat: 'PDF',
    fileSize: '3.5 MB',
    pageCount: 18,
    downloadCount: 284,
    views: 940,
    isPinned: false,
    targetAudience: 'Người cao tuổi, phụ nữ có con nhỏ, cộng tác viên y tế các ấp',
    fileName: 'So-Tay-Suc-Khoe-Gia-Dinh-Va-So-Cap-Cuu.pdf',
    isOfficialApproved: true,
  },
  {
    id: 'doc-005',
    title: 'Giáo trình Kỹ thuật Đan Đát Lục Bình & Thủ Công Mỹ Nghệ Xuất Khẩu',
    codeNumber: 'GT-05/TTHTCĐ-LH',
    category: 'nghe_nong_thon',
    categoryLabel: 'Nghề nông thôn & Khởi nghiệp',
    issuer: 'Trung tâm Học tập Cộng đồng Xã Long Hồ',
    author: 'Nghệ nhân Nguyễn Thị Lệ',
    publishDate: '2026-02-12',
    summary: 'Tài liệu hướng dẫn kỹ thuật thu hoạch, phơi sấy lục bình đạt chuẩn chống ẩm mốc; phương pháp đan nan, khung sắt làm giỏ xuất khẩu, thảm trải sàn tạo thêm thu nhập 4-6 triệu đồng/tháng cho phụ nữ nông nhàn.',
    content: `BÀI 1: THU HOẠCH VÀ SƠ CHẾ CỌNG LỤC BÌNH
- Chọn cọng lục bình già đạt chiều dài từ 50-70cm ở các tuyến kênh rạch tự nhiên.
- Cắt bỏ phần gốc đen và lá ngọn, phơi dưới nắng giòn từ 4-5 nắng cho đến khi cọng đạt độ ẩm dưới 12%.
- Xử lý xông lưu huỳnh hoặc ngâm dung dịch muối sinh học chống mối mọt trước khi tiến hành đan.

BÀI 2: CÁC KIỂU ĐAN CƠ BẢN VÀ NÂNG CAO
- Đan hạt gạo: Dùng cho các mặt túi xách thời trang cao cấp.
- Đan nong mốt, nong hai: Dùng cho lót khay đựng hoa quả, sọt chứa đồ gia dụng xuất khẩu sang thị trường Nhật Bản và Châu Âu.
- Kỹ thuật siết mép và tra quai da công nghiệp.

BÀI 3: LIÊN KẾT ĐẦU RA SẢN PHẨM VỚI HỢP TÁC XÃ
- Trung tâm HTCĐ phối hợp cùng HTX Thủ công Mỹ nghệ bao tiêu 100% thành phẩm đạt tiêu chuẩn kỹ thuật sau khi hoàn thành khóa học.`,
    keyTakeaways: [
      'Tận dụng nguồn nguyên liệu lục bình dồi dào trên hệ thống sông ngòi Long Hồ.',
      'Làm việc tại nhà trong thời gian rảnh rỗi giữa các vụ mùa.',
      'Sản phẩm được hợp tác xã thu mua định kỳ hàng tuần ngay tại ấp.'
    ],
    fileFormat: 'PDF',
    fileSize: '5.1 MB',
    pageCount: 30,
    downloadCount: 420,
    views: 1450,
    isPinned: false,
    targetAudience: 'Hội viên phụ nữ, lao động nông nhàn các ấp trên địa bàn xã',
    fileName: 'Giao-Trinh-Dan-Luc-Binh-Xuat-Khau-Long-Ho.pdf',
    isOfficialApproved: true,
  },
  {
    id: 'doc-006',
    title: 'Kỹ thuật Ủ Phân Hữu cơ Vi sinh từ Phế phụ phẩm Nông nghiệp & Rơm Rạ',
    codeNumber: 'KT-06/NN-LH2026',
    category: 'nong_nghiep',
    categoryLabel: 'Nông nghiệp & Khuyến nông',
    issuer: 'Ban Khuyến Nông Xã Long Hồ',
    author: 'KS. Lê Hoàng Phúc',
    publishDate: '2026-03-01',
    summary: 'Giải pháp biến rơm rạ mục, lục bình khô, vỏ sầu riêng và phân gia súc gia cầm thành nguồn phân bón hữu cơ giàu mùn cho vườn cây ăn trái, vừa bảo vệ môi trường vừa giảm giá thành sản xuất.',
    content: `1. NGUYÊN VẬT LIỆU CHUẨN BỊ CHO 1 TẤN PHÂN Ủ
- Rơm rạ mục hoặc lục bình băm nhỏ: 500kg.
- Phân chuồng (bò, gà, heo đã ủ khô): 300kg.
- Men vi sinh bản địa IMO kết hợp nấm đối kháng Trichoderma: 2kg.
- Cám gạo và rỉ đường: 5 lít pha loãng.

2. CÁC BƯỚC THỰC HIỆN
- Trộn đều các lớp vật liệu dày 20-30cm, tưới ẩm đạt 50-60% (nắm chặt trong tay thấy nước rịn qua kẽ ngón tay).
- Đánh đống ủ cao 1.2m - 1.5m, phủ bạt kín giữ nhiệt.
- Sau 10-15 ngày nhiệt độ đống ủ lên tới 55-60 độ C giúp tiêu diệt mầm bệnh và hạt cỏ dại.
- Tiến hành đảo đống ủ định kỳ 2 tuần/lần, sau 35-45 ngày phân hoai mục hoàn toàn có mùi đất thơm.`,
    keyTakeaways: [
      'Không đốt rơm rạ ngoài đồng, chấm dứt khói bụi gây ô nhiễm không khí.',
      'Cung cấp vi sinh vật có ích phục hồi đất bị chua phèn và thoái hóa.',
      'Chi phí tự ủ chỉ bằng 25% so với mua phân hóa học ngoài thị trường.'
    ],
    fileFormat: 'PDF',
    fileSize: '3.1 MB',
    pageCount: 16,
    downloadCount: 310,
    views: 1120,
    isPinned: false,
    targetAudience: 'Bà con nông dân làm vườn và canh tác lúa - hoa màu',
    fileName: 'Huong-Dan-U-Phan-Huu-Co-Vi-Sinh.pdf',
    isOfficialApproved: true,
  },
  {
    id: 'doc-007',
    title: 'Kế hoạch Hoạt động & Quy chế Vận hành Trung tâm Học tập Cộng đồng Năm 2026',
    codeNumber: 'KH-01/QĐ-UBND-LH',
    category: 'giao_duc_khac',
    categoryLabel: 'Giáo dục thường xuyên & Khác',
    issuer: 'UBND Xã Long Hồ',
    author: 'Ban Giám Đốc TT HTCĐ',
    publishDate: '2026-01-10',
    summary: 'Văn bản quy định chức năng, nhiệm vụ, cơ cấu tổ chức và chỉ tiêu mở các lớp học bồi dưỡng kiến thức, kỹ năng nghề, nâng cao chất lượng đời sống văn hóa cho nhân dân xã Long Hồ năm 2026.',
    content: `ĐIỀU 1: MỤC TIÊU TỔNG QUÁT NĂM 2026
1. Duy trì 100% ấp có điểm học tập vệ tinh tại Nhà sinh hoạt văn hóa cộng đồng.
2. Mở tối thiểu 24 chuyên đề tập huấn nông nghiệp, chuyển đổi số và nâng cao đời sống dân trí.
3. 85% người trưởng thành trên địa bàn biết sử dụng điện thoại thông minh tra cứu kiến thức và làm thủ tục hành chính công.

ĐIỀU 2: CÁC NGUỒN LỰC VÀ ĐIỀU KIỆN CƠ SỞ VẬT CHẤT
- Phòng máy vi tính trung tâm: 20 máy tính kết nối cáp quang internet phục vụ miễn phí.
- Hội trường đa năng 150 chỗ ngồi trang bị máy chiếu, âm thanh hội nghị.
- Tủ sách pháp luật và nông nghiệp với hơn 1.200 đầu sách giấy và kho tài liệu số trên website.`,
    keyTakeaways: [
      'Tất cả các lớp học tại trung tâm đều hoàn toàn miễn phí cho người dân.',
      'Cấp giấy chứng nhận tham gia cho học viên hoàn thành các khóa bồi dưỡng nghề.',
      'Phát huy vai trò của dòng họ học tập và gia đình hiếu học.'
    ],
    fileFormat: 'PDF',
    fileSize: '2.4 MB',
    pageCount: 14,
    downloadCount: 145,
    views: 680,
    isPinned: false,
    targetAudience: 'Cán bộ ban ngành đoàn thể, ban giám hiệu các trường và nhân dân',
    fileName: 'Ke-Hoach-Hoat-Dong-TTHTCD-LongHo-2026.pdf',
    isOfficialApproved: true,
  }
];

export const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-001',
    title: 'Chiêu sinh Khóa Đào tạo "Kỹ năng Số & Bán hàng Nông sản Trực tuyến" Khóa I/2026',
    codeNumber: 'TB-08/TB-HTCĐ',
    publishDate: '2026-03-24',
    priority: 'urgent',
    type: 'chieu_sinh',
    typeLabel: 'Chiêu sinh lớp học',
    issuer: 'Ban Giám Đốc TT HTCĐ Xã Long Hồ',
    summary: 'Thông báo mở lớp đào tạo miễn phí kỹ năng chụp ảnh sản phẩm bưởi, cam sành, sầu riêng và lập gian hàng bán lẻ trên TikTok Shop, Zalo Mini App dành cho thanh niên và nhà vườn.',
    content: `Căn cứ kế hoạch hoạt động chuyển đổi số năm 2026 của UBND Xã Long Hồ;
Trung tâm Học tập Cộng đồng trân trọng thông báo chiêu sinh khóa đào tạo ngắn hạn:

1. Tên chuyên đề: "Ứng dụng Kỹ năng số trong Quảng bá & Tiêu thụ Nông sản Đặc sản Địa phương".
2. Thời gian học: 03 buổi tối (Thứ Ba, Thứ Năm, Thứ Bảy từ 18:30 đến 21:00), khai giảng ngày 07/04/2026.
3. Địa điểm: Phòng máy tính Trung tâm HTCĐ Xã Long Hồ (Lầu 1, Trụ sở UBND xã).
4. Quyền lợi học viên:
- Được thực hành trực tiếp trên máy tính bảng và điện thoại cá nhân.
- Hướng dẫn thiết kế hình ảnh, video ngắn giới thiệu vườn cây và đóng gói giao hàng.
- Học phí: Hoàn toàn MIỄN PHÍ.
5. Cách thức đăng ký: Trực tiếp trên Cổng thông tin điện tử mục "Lịch học & Đăng ký" hoặc liên hệ đồng chí phụ trách Trung tâm (SĐT: 0270.3852.114).`,
    isPinned: true,
    relatedClassId: 'class-001',
    attachments: [
      { name: 'Thong-Bao-Chieu-Sinh-Ban-Hang-Online.pdf', size: '1.2 MB', type: 'PDF' }
    ]
  },
  {
    id: 'ann-002',
    title: 'Hội thảo Đầu bờ: Kỹ thuật Ghép Đọt & Phòng chống Rệp Sáp, Sâu Đục Thân trên Cây Có Múi',
    codeNumber: 'TB-07/TB-HND',
    publishDate: '2026-03-20',
    priority: 'important',
    type: 'hoi_thao',
    typeLabel: 'Hội thảo khuyến nông',
    issuer: 'Hội Nông Dân phối hợp Trạm Khuyến Nông',
    summary: 'Tập huấn trực tiếp tại vườn mẫu Ấp An Lạc với sự tham gia của các chuyên gia nông nghiệp hàng đầu Viện Cây ăn quả miền Nam.',
    content: `Kính gửi: Toàn thể bà con nông dân và hội viên nhà vườn Xã Long Hồ.

Nhằm chuẩn bị tốt cho vụ thu hoạch bưởi và cây có múi vụ hè thu sắp tới, Hội Nông dân xã phối hợp cùng Trạm Khuyến nông huyện tổ chức buổi Hội thảo đầu bờ thực tế:
- Thời gian: 08h00 sáng Thứ Bảy, ngày 04/04/2026.
- Địa điểm tập trung: Nhà văn hóa Ấp An Lạc, sau đó di chuyển ra vườn mẫu ông Ba Đạt.
- Nội dung trọng tâm:
  + Thực hành kỹ thuật ghép cải tạo vườn bưởi già cỗi.
  + Hướng dẫn sử dụng chế phẩm sinh học trị rệp sáp rễ không để lại tồn dư hóa chất.
  + Trao tặng 50 phần quà men vi sinh Trichoderma cho bà con tham dự sớm.
Kính mời bà con nông dân sắp xếp thời gian đến tham dự đầy đủ.`,
    isPinned: true,
    relatedClassId: 'class-002',
    attachments: [
      { name: 'Lich-Trinh-Hoi-Thao-Dau-Bo.pdf', size: '850 KB', type: 'PDF' }
    ]
  },
  {
    id: 'ann-003',
    title: 'Thông báo Lịch Hỗ trợ Công dân Cài đặt & Sử dụng Dịch vụ Công tại Nhà Văn Hóa các Ấp',
    codeNumber: 'TB-06/TCS-LH',
    publishDate: '2026-03-12',
    priority: 'normal',
    type: 'hoat_dong_chung',
    typeLabel: 'Hoạt động cộng đồng',
    issuer: 'Đoàn Thanh Niên & Tổ Chuyển Đổi Số Cộng Đồng',
    summary: 'Đội hình lưu động thanh niên tình nguyện sẽ trực tiếp về từng ấp hỗ trợ bà con cài đặt VNeID Mức 2 và hướng dẫn tra cứu hồ sơ đất đai trực tuyến.',
    content: `Lịch công tác cụ thể của Đội lưu động như sau:
- Thứ Bảy (28/03): Trực tại Nhà sinh hoạt Ấp Phước Ngươn (08:00 - 11:30).
- Chủ Nhật (29/03): Trực tại Nhà sinh hoạt Ấp Long Thuận (08:00 - 11:30).
- Thứ Bảy (04/04): Trực tại Nhà sinh hoạt Ấp Thạnh Hưng (08:00 - 11:30).
Bà con khi đi vui lòng mang theo Căn cước công dân gắn chíp và điện thoại thông minh có gắn SIM chính chủ.`,
    isPinned: false,
    relatedDocumentId: 'doc-002',
  },
  {
    id: 'ann-004',
    title: 'Phát động Phong trào "Gia Đình Học Tập - Dòng Họ Học Tập Suốt Đời" Năm 2026',
    codeNumber: 'TB-05/TB-HKH',
    publishDate: '2026-02-25',
    priority: 'normal',
    type: 'chinh_sach',
    typeLabel: 'Chính sách & Khuyến học',
    issuer: 'Hội Khuyến Học Xã Long Hồ',
    summary: 'Triển khai tiêu chí thi đua công nhận danh hiệu Gia đình học tập, Dòng họ học tập và Cộng đồng học tập tiêu biểu gắn liền với xây dựng Nông thôn mới nâng cao.',
    content: `Hội Khuyến học xã phát động đợt đăng ký thi đua đến toàn thể 07 ấp. Các gia đình có con em vượt khó học giỏi, người lớn tích cực tham gia các lớp bồi dưỡng kiến thức tại Trung tâm HTCĐ sẽ được tuyên dương khen thưởng trong Ngày hội Khuyến học sắp tới.`,
    isPinned: false,
  }
];

export const INITIAL_CLASSES: ClassScheduleItem[] = [
  {
    id: 'class-001',
    title: 'Kỹ năng Bán hàng Nông sản qua Mạng Xã hội & Zalo Mini App',
    topicCategory: 'chuyen_doi_so',
    topicLabel: 'Chuyển đổi số nông nghiệp',
    instructor: 'ThS. Nguyễn Hoàng Nam',
    instructorTitle: 'Chuyên gia Chuyển đổi số Nông nghiệp',
    venue: 'Phòng Máy tính TT HTCĐ Xã Long Hồ',
    addressNote: 'Lầu 1, Trụ sở UBND Xã Long Hồ',
    startDate: '2026-04-07',
    endDate: '2026-04-16',
    timeSlot: '18:30 - 20:30',
    sessionDays: 'Thứ Ba, Thứ Năm, Thứ Bảy',
    totalHours: 12,
    capacity: 25,
    registeredCount: 18,
    fee: 'Miễn phí 100%',
    targetAudience: 'Nhà vườn, thanh niên khởi nghiệp, chủ cơ sở kinh doanh tại địa phương',
    status: 'sap_dien_ra',
    description: 'Khóa học cầm tay chỉ việc giúp học viên tự tin chụp hình vườn cây đẹp mắt, viết bài giới thiệu trái cây sạch, tạo mã thanh toán VietQR và livestream giới thiệu đặc sản Long Hồ.',
    curriculum: [
      'Buổi 1: Tổng quan kinh tế số và cách xây dựng thương hiệu cá nhân nhà vườn.',
      'Buổi 2: Kỹ năng chụp ảnh sản phẩm, quay video ngắn bằng điện thoại thông minh.',
      'Buổi 3: Lập gian hàng, gắn giỏ hàng và quy trình nhận đơn giao hàng.',
      'Buổi 4: Quản lý khách hàng quen thuộc qua nhóm Zalo Chăm sóc Khách hàng.'
    ],
    contactPhone: '0270.3852.114',
  },
  {
    id: 'class-002',
    title: 'Kỹ thuật Cắt tỉa Tạo tán & Xử lý Ra hoa Nghịch vụ Cây Có Múi',
    topicCategory: 'nong_nghiep',
    topicLabel: 'Kỹ thuật nông nghiệp',
    instructor: 'Kỹ sư Võ Văn Kiệt',
    instructorTitle: 'Phó Trạm Trưởng Trạm Khuyến Nông',
    venue: 'Hội trường UBND Xã & Vườn thực nghiệm Ấp An Lạc',
    addressNote: 'Đường số 3, Trung tâm Hành chính Xã Long Hồ',
    startDate: '2026-04-04',
    endDate: '2026-04-05',
    timeSlot: '07:30 - 11:30',
    sessionDays: 'Thứ Bảy, Chủ Nhật',
    totalHours: 8,
    capacity: 40,
    registeredCount: 32,
    fee: 'Miễn phí 100%',
    targetAudience: 'Hội viên nông dân canh tác cam sành, bưởi năm roi, bưởi da xanh',
    status: 'sap_dien_ra',
    description: 'Trang bị kỹ năng tỉa cành thông thoáng đón ánh sáng, khống chế chiều cao cây để dễ bao trái và phun thuốc sinh học, tính toán thời điểm xiết nước đón giá bưởi Tết cao.',
    curriculum: [
      'Phần lý thuyết: Cơ chế kích thích mầm hoa và nhu cầu dinh dưỡng thời kỳ nuôi trái.',
      'Phần thực hành: Cầm kéo trực tiếp cắt tỉa tại vườn thực nghiệm, kỹ thuật quét vôi ngừa nấm bệnh.'
    ],
    contactPhone: '0918.452.339',
  },
  {
    id: 'class-003',
    title: 'Nghề Đan Thủ công Lục Bình Mỹ nghệ Xuất khẩu (Khóa 2/2026)',
    topicCategory: 'nghe_nong_thon',
    topicLabel: 'Nghề truyền thống & Việc làm',
    instructor: 'Nghệ nhân Nguyễn Thị Lệ',
    instructorTitle: 'Chủ nhiệm Hợp tác xã Thủ công Mỹ nghệ',
    venue: 'Nhà Văn hóa Sinh hoạt Cộng đồng Ấp Long Thuận',
    addressNote: 'Tổ 5, Ấp Long Thuận, Xã Long Hồ',
    startDate: '2026-03-20',
    endDate: '2026-04-10',
    timeSlot: '13:30 - 16:30',
    sessionDays: 'Thứ Hai đến Thứ Sáu',
    totalHours: 45,
    capacity: 30,
    registeredCount: 27,
    fee: 'Miễn phí 100%',
    targetAudience: 'Lao động nữ nông nhàn, người khuyết tật có nguyện vọng học nghề tại nhà',
    status: 'dang_dien_ra',
    description: 'Đào tạo kỹ năng đan sọt, thảm và túi xách từ sợi lục bình khô. Học viên được hỗ trợ toàn bộ nguyên phụ liệu trong suốt quá trình học và bao tiêu sản phẩm đầu ra sau kiểm tra tay nghề.',
    curriculum: [
      'Tuần 1: Kỹ thuật chọn sợi và đan các nan cơ bản.',
      'Tuần 2: Ráp khung thép và hoàn thiện hoa văn.',
      'Tuần 3: Xử lý màu sắc, chống ẩm mốc và may lót phụ kiện.'
    ],
    contactPhone: '0939.812.504',
  },
  {
    id: 'class-004',
    title: 'Tập huấn Sơ cấp cứu Ban đầu & Chăm sóc Người cao tuổi tại Gia đình',
    topicCategory: 'y_te_suc_khoe',
    topicLabel: 'Sức khỏe & Đời sống',
    instructor: 'Bác sĩ CK I Trần Thị Mai',
    instructorTitle: 'Trưởng Trạm Y Tế Xã Long Hồ',
    venue: 'Hội trường Trạm Y Tế Xã Long Hồ',
    addressNote: 'Khu dân cư Ấp Phú Hưng, Xã Long Hồ',
    startDate: '2026-04-12',
    endDate: '2026-04-12',
    timeSlot: '08:00 - 11:30',
    sessionDays: 'Chủ Nhật',
    totalHours: 4,
    capacity: 50,
    registeredCount: 22,
    fee: 'Miễn phí 100%',
    targetAudience: 'Người chăm sóc gia đình, tình nguyện viên chữ thập đỏ, hội viên người cao tuổi',
    status: 'sap_dien_ra',
    description: 'Thực hành hô hấp nhân tạo, xử trí hạ đường huyết, băng bó vết thương hở và các bài tập vận động nhẹ nhàng hồi phục chức năng cho người lớn tuổi.',
    curriculum: [
      'Chuyên đề 1: Nhận diện sớm dấu hiệu tai biến mạch máu não và các bước xử trí khẩn.',
      'Chuyên đề 2: Thực hành ép tim thổi ngạt và cố định gãy xương.',
      'Chuyên đề 3: Tư vấn dinh dưỡng lành mạnh ít muối cho người bệnh tim mạch.'
    ],
    contactPhone: '0270.3852.120',
  },
  {
    id: 'class-005',
    title: 'Phổ cập Tin học Cơ bản & Khai thác Internet An toàn cho Người Lớn Tuổi',
    topicCategory: 'chuyen_doi_so',
    topicLabel: 'Tin học cộng đồng',
    instructor: 'Đ/c Phan Minh Trí',
    instructorTitle: 'Bí thư Đoàn Xã - Trưởng Tổ CĐS Trẻ',
    venue: 'Phòng Máy tính TT HTCĐ Xã Long Hồ',
    addressNote: 'Lầu 1, Trụ sở UBND Xã Long Hồ',
    startDate: '2026-04-18',
    endDate: '2026-04-26',
    timeSlot: '08:30 - 10:30',
    sessionDays: 'Thứ Bảy, Chủ Nhật hàng tuần',
    totalHours: 8,
    capacity: 20,
    registeredCount: 14,
    fee: 'Miễn phí 100%',
    targetAudience: 'Các chú bác cán bộ hưu trí, người cao tuổi trên địa bàn xã',
    status: 'sap_dien_ra',
    description: 'Khóa học thân thiện, tốc độ chậm rãi giúp các cô chú đọc báo điện tử, gọi điện video thăm hỏi con cháu ở xa, tra cứu kết quả xét nghiệm bệnh viện và nhận biết chiêu trò lừa đảo qua mạng.',
    curriculum: [
      'Bài 1: Làm quen với điện thoại thông minh, điều chỉnh cỡ chữ lớn dễ đọc.',
      'Bài 2: Gọi video miễn phí qua Zalo và tìm kiếm tin tức trên Youtube.',
      'Bài 3: Cách tra cứu thông tin y tế, lịch xe buýt và cảnh giác tin giả mạo lừa gạt.'
    ],
    contactPhone: '0978.223.119',
  }
];

export const INITIAL_REGISTRATIONS: RegistrationItem[] = [
  {
    id: 'reg-001',
    classId: 'class-001',
    classTitle: 'Kỹ năng Bán hàng Nông sản qua Mạng Xã hội & Zalo Mini App',
    fullName: 'Lê Văn Thanh',
    phoneNumber: '0918.234.567',
    hamlet: 'Ấp An Lạc',
    yearOfBirth: '1988',
    note: 'Nhà có 5 công bưởi da xanh muốn học bán trực tiếp.',
    registeredAt: '2026-03-24 14:20',
  },
  {
    id: 'reg-002',
    classId: 'class-001',
    classTitle: 'Kỹ năng Bán hàng Nông sản qua Mạng Xã hội & Zalo Mini App',
    fullName: 'Nguyễn Thị Hồng Hạnh',
    phoneNumber: '0939.567.890',
    hamlet: 'Ấp Long Thuận',
    yearOfBirth: '1995',
    note: 'Muốn học cách tạo video Tiktok giới thiệu mứt dừa địa phương.',
    registeredAt: '2026-03-25 09:15',
  },
  {
    id: 'reg-003',
    classId: 'class-002',
    classTitle: 'Kỹ thuật Cắt tỉa Tạo tán & Xử lý Ra hoa Nghịch vụ Cây Có Múi',
    fullName: 'Trần Văn Đực',
    phoneNumber: '0908.765.432',
    hamlet: 'Ấp Phước Ngươn',
    yearOfBirth: '1972',
    note: 'Mong muốn học cách xử lý ra hoa bưởi nghịch vụ bán dịp Tết.',
    registeredAt: '2026-03-23 16:45',
  }
];

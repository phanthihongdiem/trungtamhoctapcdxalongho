import { DocumentItem, AnnouncementItem, ClassScheduleItem, RegistrationItem, StaffMember, FeedbackItem } from '../types';

export const HAMLETS_LIST = [
  'Ấp An Lạc',
  'Ấp Long Thuận',
  'Ấp Phước Ngươn',
  'Ấp Phú Hưng',
  'Ấp Thạnh Hưng',
  'Ấp Bình Hòa',
  'Ấp Tân Hưng',
  'Ấp An Hiệp',
  'Ấp An Thành',
  'Ấp Long Hòa',
  'Ấp Phú Mỹ',
  'Ấp Phước Yên',
  'Ấp Long Hưng',
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  // --- TÀI LIỆU VỪA CẬP NHẬT TỪ HỒ SƠ CHÍNH THỨC CỦA XÃ LONG HỒ ---
  {
    id: 'doc-mobifone-ai-giao-trinh',
    title: 'Giáo trình Đào tạo AI cho Công chức, Viên chức, Người lao động Phường/Xã – Đề cương 1: AI Hỗ trợ Công việc Hằng ngày',
    codeNumber: 'GT-01/AI-MBFVL2026',
    category: 'chuyen_doi_so',
    categoryLabel: 'Chuyển đổi số & Dịch vụ công',
    issuer: 'Trung tâm Kinh doanh Giải pháp số - MobiFone Vĩnh Long',
    author: 'MobiFone Vĩnh Long',
    publishDate: '2026-07-01',
    summary: 'Giáo trình toàn diện của MobiFone Vĩnh Long hướng dẫn ứng dụng Trí tuệ nhân tạo (AI) trong công việc hành chính cấp xã: viết Prompt 5 thành phần, soạn thảo văn bản hành chính chuẩn mực, tóm tắt tài liệu dài bằng Google NotebookLM, tạo bài thuyết trình bằng Gamma.app và quy trình an toàn bảo mật dữ liệu công vụ.',
    content: `LỜI NÓI ĐẦU:
Trong bối cảnh công cuộc Chuyển đổi số quốc gia đang diễn ra mạnh mẽ, việc hiện đại hóa nền hành chính cấp cơ sở là nhiệm vụ chiến lược hàng đầu. Đối với tỉnh Vĩnh Long, nâng cao năng lực số cho đội ngũ công chức, viên chức, người lao động cấp xã/phường chính là chìa khóa để xây dựng một chính quyền phục vụ Nhân dân tinh gọn, hiệu lực và hiệu quả.
Tài liệu được xây dựng theo phương châm “Dễ hiểu – Thiết thực – Ứng dụng ngay”, tập trung hướng dẫn làm chủ kỹ năng viết câu lệnh khoa học để ứng dụng trực tiếp vào công việc văn phòng hằng ngày.

CHƯƠNG 1. TỔNG QUAN VỀ AI TRONG CÔNG VIỆC HÀNH CHÍNH XÃ/PHƯỜNG
1. Bản chất lý thuyết của AI: 4 nhóm năng lực cốt lõi gồm: Tư duy như con người, Hành vi như con người, Tư duy hợp lý, Hành vi hợp lý.
2. Ứng dụng thực tế:
- Hỗ trợ soạn thảo khung văn bản, cải thiện văn phong hành chính trang trọng, kiểm tra lỗi chính tả và ngữ pháp trước khi trình ký.
- Tóm tắt và hỏi đáp trực tiếp với các tài liệu quy phạm pháp luật, chỉ thị, nghị quyết dài hàng chục trang.
- Tạo slide thuyết trình, sơ đồ tư duy quy trình thủ tục hành chính, tạo hình ảnh minh họa phục vụ cổ động, tuyên truyền trực quan.
3. Việc NÊN và KHÔNG NÊN:
- NÊN: Rà soát tóm tắt văn bản cũ - mới, lên khung thông báo, thư mời, dịch thuật phổ thông, kiểm tra lỗi chính tả lặp đi lặp lại.
- KHÔNG NÊN: Ra quyết định hành chính có tính pháp lý (phê duyệt hồ sơ, xử phạt, ký đóng dấu bắt buộc phải do con người kiểm tra và chịu trách nhiệm); Xử lý công việc cần sự thấu cảm (hòa giải tranh chấp đất đai, tiếp dân khiếu nại); Tuyệt đối không nhập văn bản mật của Đảng, Nhà nước, thông tin định danh cá nhân nhạy cảm lên AI công cộng.

CHƯƠNG 2. CÁCH VIẾT PROMPT HIỆU QUẢ TRONG CÔNG VIỆC HÀNH CHÍNH
Cấu trúc Prompt 5 thành phần cốt lõi:
1. Vai trò (Role): Gán cho AI một danh tính cụ thể (Ví dụ: "Bạn là Chánh văn phòng UBND xã", "Bạn là chuyên gia lưu trữ").
2. Nhiệm vụ (Task): Nói rõ hành động cần thực hiện bằng động từ mạnh (Soạn thảo, tóm tắt, kiểm tra lỗi, lập kế hoạch).
3. Dữ liệu đầu vào (Inputs): Cung cấp thông tin nền, tài liệu, số liệu hoặc bối cảnh (không để AI tự đoán).
4. Yêu cầu đầu ra (Outputs): Quy định hình thức thể hiện (mẫu văn bản hành chính, dạng bảng, gạch đầu dòng, độ dài).
5. Tiêu chí kiểm tra (Constraints): Giới hạn, quy tắc bắt buộc tuân thủ (ngôn từ trang trọng, khách quan, không dùng từ địa phương, không tự ý bịa số liệu).

CHƯƠNG 3. ỨNG DỤNG AI TRONG SOẠN THẢO VĂN BẢN HÀNH CHÍNH
- Hướng dẫn soạn Thông báo, Kế hoạch ngắn, Báo cáo tuần/tháng, Thư mời/Giấy mời, Lịch công tác tuần.
- Kỹ năng nâng cao: Sử dụng từ khóa hiệu chỉnh để ép AI vào giọng văn hành chính công quyền (nghiêm túc, trang trọng, lược bỏ từ ngữ bay bổng sáo rỗng).

CHƯƠNG 4. TÓM TẮT VÀ HỎI ĐÁP TÀI LIỆU DÀI VỚI GOOGLE NOTEBOOKLM
- Nguyên tắc "Chỉ nói có sách, mách có chứng": AI chỉ trả lời dựa trên đúng tài liệu tải lên kèm số trích dẫn chính xác đến từng dòng, loại bỏ hiện tượng ảo giác.
- Hỗ trợ đa dạng nguồn: PDF, DOCX, TXT, link YouTube, file âm thanh ghi âm.
- Tính năng Audio Overview: Tự động chuyển đổi tài liệu thành podcast thảo luận giữa 2 chuyên gia AI.

CHƯƠNG 5. TẠO SLIDE, SƠ ĐỒ BẰNG CÔNG CỤ GAMMA (GAMMA.APP)
- Quy trình 3 bước: Chuẩn bị tài liệu nguồn -> Tinh giản nội dung -> Chọn công cụ Gamma và viết prompt tạo slide trình chiếu chuyên nghiệp.

CHƯƠNG 6. AN TOÀN DỮ LIỆU KHI DÙNG AI TẠI CƠ QUAN CẤP XÃ
- 4 nguyên tắc sử dụng AI an toàn:
1. Không đưa dữ liệu thật lên AI công cộng (ẩn tên, xóa số CCCD, địa chỉ, số điện thoại).
2. Kiểm chứng mọi thông tin do AI tạo ra với văn bản quy phạm pháp luật.
3. Sử dụng tài khoản bảo mật cao, mật khẩu mạnh và bật MFA.
4. Chỉ sử dụng các nền tảng AI được cơ quan nhà nước cho phép.
- Quy trình 5 bước sử dụng AI: Xác định mục đích -> Kiểm tra dữ liệu đầu vào -> Sử dụng AI -> Rà soát kết quả -> Lưu trữ và quản lý kết quả.`,
    keyTakeaways: [
      'Làm chủ công thức Prompt chuẩn 5 thành phần: Vai trò + Nhiệm vụ + Dữ liệu đầu vào + Yêu cầu đầu ra + Tiêu chí kiểm tra.',
      'Sử dụng Google NotebookLM để đọc hiểu, trích dẫn văn bản quy phạm pháp luật không bị sai lệch hoặc ảo giác.',
      'Ứng dụng Gamma.app tạo slide báo cáo hành chính, sơ đồ quy trình thủ tục chỉ trong vài phút.',
      'Tuyệt đối tuân thủ 4 nguyên tắc bảo đảm an toàn dữ liệu công vụ, không nhập thông tin mật và dữ liệu cá nhân của công dân lên AI công cộng.'
    ],
    fileFormat: 'PDF',
    fileSize: '8.4 MB',
    pageCount: 30,
    downloadCount: 456,
    views: 1820,
    isPinned: true,
    targetAudience: 'Cán bộ, công chức, người hoạt động không chuyên trách cấp xã/phường, đoàn thể địa phương',
    fileName: 'Giao-Trinh-Dao-Tao-AI-Cong-Chuc-Xa-MobiFone-Vinh-Long-2026.pdf',
    isOfficialApproved: true,
  },
  {
    id: 'doc-slide-ai-thuc-hanh-can-bo-xa',
    title: 'Bài giảng Slide: AI Thực hành cho Cán bộ Cấp Xã – Soạn thảo, Khai thác Tài liệu, Hỗ trợ Dữ liệu và Tuân thủ Số',
    codeNumber: 'BG-05/AI-MBF5G',
    category: 'chuyen_doi_so',
    categoryLabel: 'Chuyển đổi số & Dịch vụ công',
    issuer: 'MobiFone 5G Vĩnh Long phối hợp UBND Xã Long Hồ',
    author: 'Tổ Chuyên gia Giải pháp số MobiFone Vĩnh Long',
    publishDate: '2026-07-20',
    summary: 'Bộ tài liệu trình chiếu trực quan phục vụ lớp tập huấn chuyển đổi số xã Long Hồ: Giới thiệu hệ sinh thái AI (Gemini, ChatGPT, Claude, Canva, Copilot), các bài tập thực hành viết prompt thực tế (soạn bài tuyên truyền sốt xuất huyết, phòng chống ma túy học đường, đăng ký khai sinh trực tuyến) và cẩm nang bảo đảm an ninh mạng.',
    content: `BỘ BÀI GIẢNG ĐÀO TẠO TRỰC QUAN GỒM 5 CHƯƠNG CHÍNH:

CHƯƠNG 1: TỔNG QUAN VỀ AI VÀ HỆ SINH THÁI CÔNG CỤ
- Phân biệt các công cụ phổ biến: ChatGPT, Google Gemini, Claude, Canva, Gamma AI, Copilot.
- Quét mã QR tham gia nhóm Zalo hỗ trợ kỹ thuật "Xã Long Hồ_Tập huấn chuyển đổi số".

CHƯƠNG 2: AN TOÀN DỮ LIỆU KHI DÙNG AI
- Nhận diện hiện tượng ảo giác (Hallucination) trong AI: AI tạo thông tin nghe hợp lý nhưng hoàn toàn bịa đặt.
- Trách nhiệm pháp lý và đạo đức của công chức khi kiểm duyệt văn bản.
- Danh mục dữ liệu tuyệt đối cấm nhập lên AI công cộng: Bí mật nhà nước, dữ liệu nội bộ cơ quan, dữ liệu cá nhân nhạy cảm, hồ sơ đất đai, hộ tịch, khiếu nại tố cáo.

CHƯƠNG 3: CẤU TRÚC PROMPT VÀ BÀI TẬP TÌNH HUỐNG
- Khung Prompt mẫu 5 thành phần cho văn phòng xã.
- Bài tập mẫu 1: Viết bài tuyên truyền phòng chống sốt xuất huyết dưới 300 từ cho loa truyền thanh và Zalo ấp với thông điệp "Không có lăng quăng, không có sốt xuất huyết".
- Bài tập mẫu 2: Viết bài tuyên truyền nhận biết ma túy mới núp bóng bánh kẹo, trà sữa, nước vui và thuốc lá điện tử.
- Bài tập mẫu 3: Soạn bài hướng dẫn công dân nộp hồ sơ đăng ký khai sinh trực tuyến trên Cổng dịch vụ công quốc gia, nhận kết quả tại nhà qua bưu điện.

CHƯƠNG 4: AI VÀ QUẢN LÝ TRI THỨC VỚI GEMINI NOTEBOOK / NOTEBOOKLM
- Trợ lý đọc tài liệu tiết kiệm 80% thời gian nghiên cứu báo cáo dài.
- 4 bước khởi tạo, nạp tài liệu và viết câu hỏi truy vấn trực tiếp.

CHƯƠNG 5: NHẬN DIỆN VÀ PHÒNG TRÁNH LỪA ĐẢO TRỰC TUYẾN
- Các thủ đoạn phổ biến: Giả danh công an/cơ quan nhà nước gọi đe dọa, giả mạo tin nhắn ngân hàng/điện lực, chiêu trò làm nhiệm vụ nạp tiền đầu tư hoa hồng cao.
- 3 nguyên tắc vàng phòng tránh: Không nhấp đường link lạ; Không cung cấp OTP, mật khẩu cho bất kỳ ai; Xác minh trực tiếp với cơ quan công an địa phương.`,
    keyTakeaways: [
      'Trực quan hóa toàn bộ kỹ năng thực hành AI cho công chức xã qua 26 slide bài giảng.',
      'Bộ bài tập mẫu gắn liền với nghiệp vụ hàng ngày của cán bộ tư pháp, văn hóa, công an xã.',
      'Trang bị bộ lọc an ninh mạng, nhận diện chiêu trò lừa đảo qua không gian mạng cho bà con.'
    ],
    fileFormat: 'PPTX',
    fileSize: '15.8 MB',
    pageCount: 26,
    downloadCount: 388,
    views: 1420,
    isPinned: true,
    targetAudience: 'Cán bộ công chức UBND xã, bí thư chi bộ, trưởng các ấp và tổ công nghệ số cộng đồng',
    fileName: 'Slide-Tap-Huan-AI-Thuc-Hanh-Can-Bo-Xa-Long-Ho.pptx',
    isOfficialApproved: true,
  },
  {
    id: 'doc-kh-binh-dan-hoc-vu-so',
    title: 'Kế hoạch số 149/KH-UBND: Tập huấn Kỹ năng Số cho Người dân Trưởng thành & Thực hiện Phong trào "Bình dân Học vụ Số" trên Địa bàn Xã Long Hồ',
    codeNumber: '149/KH-UBND',
    category: 'chuyen_doi_so',
    categoryLabel: 'Chuyển đổi số & Dịch vụ công',
    issuer: 'Ủy Ban Nhân Dân Xã Long Hồ',
    author: 'TM. UBND Xã - KT. Chủ tịch - Phó Chủ tịch Nguyễn Thị Mỹ Hạnh',
    publishDate: '2026-07-15',
    summary: 'Kế hoạch trọng điểm của UBND Xã Long Hồ thực hiện Nghị quyết 57-NQ/TW của Bộ Chính trị: Phổ cập kỹ năng số cho 100% người dân trưởng thành tại 13 ấp từ ngày 16/7 đến 24/7/2026; cẩm nang hướng dẫn chi tiết cách đăng nhập Nền tảng Bình dân học vụ số (MOOC Bộ Công An) qua VNeID, tham gia các khóa học Đề án 06 và làm bài thi nhận chứng nhận.',
    content: `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập – Tự do – Hạnh Phúc
ỦY BAN NHÂN DÂN XÃ LONG HỒ
Số: 149/KH-UBND, ngày 15 tháng 7 năm 2026

KẾ HOẠCH TẬP HUẤN KỸ NĂNG SỐ CHO NGƯỜI DÂN TRONG ĐỘ TUỔI TRƯỞNG THÀNH VÀ THỰC HIỆN PHONG TRÀO "BÌNH DÂN HỌC VỤ SỐ" TRÊN ĐỊA BÀN XÃ LONG HỒ

I. MỤC ĐÍCH, YÊU CẦU:
- Trang bị kiến thức cơ bản và kỹ năng ứng dụng về chuyển đổi số giúp người dân kết nối, tương tác và phát triển kỹ năng số để sử dụng các nền tảng, dịch vụ số thiết yếu.
- Phấn đấu 100% người dân trưởng thành có tri thức cơ bản về chuyển đổi số, sử dụng tốt thiết bị thông minh; trên 85% người dân trong độ tuổi trưởng thành được xác nhận đạt chuẩn phổ cập kỹ năng số trên nền tảng VNeID; 85% người lao động trong HTX có kỹ năng số.

II. NỘI DUNG VÀ TỔ CHỨC:
- Thời gian: Tổ chức lớp từ ngày 16/7/2026 đến 24/7/2026 trên địa bàn tất cả các ấp của xã Long Hồ.
- Địa điểm: Trụ sở Nhà sinh hoạt văn hóa các ấp.
- Hình thức: Tập huấn trực tiếp "Cầm tay chỉ việc", hỗ trợ đặc biệt nhóm người cao tuổi và nhóm yếu thế.

PHẦN HƯỚNG DẪN THỰC HÀNH NỀN TẢNG BÌNH DÂN HỌC VỤ SỐ:
1. Đăng nhập hệ thống qua VNeID:
- Cách 1: Điền số định danh cá nhân (CCCD) và mật khẩu -> Nhận mã code xác nhận trên ứng dụng VNeID -> Nhập mã passcode xác nhận chia sẻ.
- Cách 2: Mở ứng dụng VNeID trên điện thoại, chọn biểu tượng Quét mã QR trên màn hình máy tính -> Bấm xác nhận đăng nhập thành công.
2. Cập nhật thông tin học viên:
- Khai báo email liên lạc và kiểm tra chính xác "Họ tên đầy đủ" để hệ thống tự động xuất Chứng nhận điện tử sau khi hoàn thành.
3. Học tập theo Module bài giảng:
- Truy cập khóa học "Nâng cao nhận thức Chuyển đổi số hỗ trợ triển khai Đề án 06".
- Nghiên cứu tài liệu đọc trước (PDF/Slide), sau đó xem video bài giảng theo lộ trình từng bài. Trả lời các câu hỏi kiểm soát lồng ghép trong video để mở khóa bài tiếp theo.
4. Làm bài kiểm tra đánh giá cuối khóa:
- Bài kiểm tra trắc nghiệm tổng hợp gồm 20 câu hỏi tính giờ trong 30 phút. Học viên đạt yêu cầu sẽ được cấp Chứng nhận hoàn thành khóa học của Bộ Công An.`,
    keyTakeaways: [
      'Mục tiêu phổ cập kỹ năng số cho 100% công dân trưởng thành và trên 85% đạt chuẩn VNeID.',
      'Tập huấn trực tiếp luân phiên tại trụ sở các ấp từ ngày 16/7 đến 24/7/2026.',
      'Quy trình đăng nhập Nền tảng Bình dân học vụ số bằng VNeID và làm bài kiểm tra trắc nghiệm 20 câu lấy chứng nhận.'
    ],
    fileFormat: 'PDF',
    fileSize: '5.8 MB',
    pageCount: 11,
    downloadCount: 624,
    views: 2450,
    isPinned: true,
    targetAudience: 'Toàn thể người dân trong độ tuổi trưởng thành, đoàn viên thanh niên và người lao động tại 13 ấp',
    fileName: 'Ke-Hoach-149-Binh-Dan-Hoc-Vu-So-Xa-Long-Ho.pdf',
    isOfficialApproved: true,
  },
  {
    id: 'doc-kh-ngay-thu-bay-vi-dan',
    title: 'Kế hoạch số 01/KH-TTPVHCC: Thực hiện Mô hình Ngày Thứ Bảy "Vì Dân Phục Vụ" – Dịch Vụ Công Đến Mọi Nhà',
    codeNumber: '01/KH-TTPVHCC',
    category: 'phap_luat',
    categoryLabel: 'Chính sách & Pháp luật',
    issuer: 'Trung tâm Phục vụ Hành chính công Xã Long Hồ',
    author: 'KT. Giám đốc - Phó Giám đốc Trần Thị Thanh Nghĩa',
    publishDate: '2026-08-12',
    summary: 'Mô hình đột phá vì dân của Xã Long Hồ: Bắt đầu từ ngày 05/9/2026, định kỳ sáng thứ Bảy hàng tuần (07h30 - 11h00), tổ công tác lưu động xuống trực tiếp trụ sở các ấp để tiếp nhận, giải quyết TTHC (hộ tịch, khai sinh, kết hôn, chứng thực, đất đai, bảo trợ xã hội) và hướng dẫn sử dụng Smart Vĩnh Long, VNeID giúp bà con không phải đi lại xa.',
    content: `TRUNG TÂM PHỤC VỤ HÀNH CHÍNH CÔNG XÃ LONG HỒ
Số: 01/KH-TTPVHCC, ngày 12 tháng 8 năm 2026

KẾ HOẠCH THỰC HIỆN MÔ HÌNH NGÀY THỨ BẢY “VÌ DÂN PHỤC VỤ” - DỊCH VỤ CÔNG ĐẾN MỌI NHÀ TRÊN ĐỊA BÀN XÃ LONG HỒ

I. MỤC ĐÍCH, YÊU CẦU:
1. Đổi mới phương thức phục vụ, chuyển từ trạng thái “chờ người dân đến cơ quan thực hiện TTHC” sang chủ động đi đến gần dân, hướng dẫn và phục vụ dân tại địa bàn.
2. Thúc đẩy chuyển đổi số cộng đồng, trực tiếp cầm tay chỉ việc, hướng dẫn người dân nộp hồ sơ trực tuyến, thanh toán trực tuyến và sử dụng các ứng dụng số (VNeID, Sổ sức khoẻ điện tử, Smart Vĩnh Long...).
3. Hỗ trợ đối tượng đặc thù: Người cao tuổi, người khuyết tật, người lao động bận rộn trong tuần không có điều kiện đến trụ sở UBND xã vào giờ hành chính.

II. NỘI DUNG, THỜI GIAN VÀ ĐỊA ĐIỂM:
1. Nội dung thực hiện:
- Tiếp nhận và giải quyết TTHC lưu động: Các thủ tục thiết yếu như khai sinh, khai tử, kết hôn, xác nhận tình trạng hôn nhân, chứng thực chữ ký/bản sao, bảo trợ xã hội, biến động đất đai thông thường...
- Hướng dẫn thực hiện trực tuyến toàn trình, nộp lệ phí không dùng tiền mặt qua VietQR.
- Tuyên truyền cảnh giác phòng chống tội phạm lừa đảo trên không gian mạng.
2. Thời gian: Từ ngày 05/9/2026, tần suất định kỳ vào sáng thứ Bảy hàng tuần (từ 07 giờ 30 phút đến 11 giờ 00 phút). Luân phiên mỗi tuần thực hiện tại 01 trụ sở ấp trên địa bàn xã theo lịch cụ thể từng tháng.
3. Địa điểm: Tại Trụ sở Nhà sinh hoạt văn hóa các ấp.

III. LỢI ÍCH CỦA MÔ HÌNH:
- Tiết kiệm chi phí, thời gian di chuyển cho nhân dân.
- Xóa bỏ rào cản công nghệ cho các cô chú lớn tuổi không rành sử dụng điện thoại thông minh.
- Nâng cao chỉ số cải cách hành chính (PAR INDEX) và chỉ số hài lòng của người dân (SIPAS) đối với chính quyền xã Long Hồ.`,
    keyTakeaways: [
      'Giải quyết TTHC lưu động ngay tại ấp vào sáng thứ Bảy (07:30 - 11:00) từ ngày 05/9/2026.',
      'Cầm tay chỉ việc cài đặt VNeID, nộp hồ sơ dịch vụ công trực tuyến và thanh toán không dùng tiền mặt.',
      'Hỗ trợ đặc biệt người cao tuổi, người khuyết tật và lao động bận rộn trong tuần.'
    ],
    fileFormat: 'PDF',
    fileSize: '2.6 MB',
    pageCount: 4,
    downloadCount: 412,
    views: 1650,
    isPinned: true,
    targetAudience: 'Toàn thể nhân dân, người cao tuổi, người khuyết tật và hộ kinh doanh tại 13 ấp',
    fileName: 'Ke-Hoach-01-Ngay-Thu-Bay-Vi-Dan-Phuc-Vu-Long-Ho.pdf',
    isOfficialApproved: true,
  },
  {
    id: 'doc-livestream-chuyen-nghiep',
    title: 'Chuyên đề: Quản trị và Phát triển Livestream Chuyên nghiệp',
    codeNumber: 'CĐ-02/LIVESTREAM-LH',
    category: 'nghe_nong_thon',
    categoryLabel: 'Nghề nông thôn & Khởi nghiệp',
    issuer: 'Ban Chỉ đạo Chuyển đổi số & Trung tâm HTCĐ Xã Long Hồ',
    author: 'Chuyên gia Đào tạo Kinh tế số & Thương mại điện tử',
    publishDate: '2026-08-10',
    summary: 'Tài liệu đào tạo toàn diện kỹ năng bán hàng qua Livestream cho các nhà vườn, chủ cơ sở sản xuất và thanh niên xã Long Hồ: 4 trụ cột (Tư duy - Kỹ thuật - Cảm xúc - Giọng nói), cấu trúc kịch bản 5 phần, setup thiết bị ánh sáng - âm thanh, chỉ số GPM và bài tập thực hành ứng phó sự cố.',
    content: `CHUYÊN ĐỀ: QUẢN TRỊ VÀ PHÁT TRIỂN LIVESTREAM CHUYÊN NGHIỆP

1. TỔNG QUAN VÀ VAI TRÒ QUẢN TRỊ LIVESTREAM:
- Livestream hiện nay là một ngành nghề kinh doanh số đòi hỏi kỹ năng chuyên nghiệp.
- 4 trụ cột cốt lõi: Tư duy kinh doanh - Kỹ thuật thiết bị - Kiểm soát cảm xúc - Nghệ thuật giọng nói.
- Quản trị livestream là kiểm soát toàn bộ quá trình chuẩn bị, vận hành và tối ưu hóa thời gian thực (nơi không có cơ hội làm lại).

2. XÂY DỰNG THƯƠNG HIỆU CÁ NHÂN (NGƯỜI BÁN CHÍNH LÀ THƯƠNG HIỆU):
- 3 nguyên tắc bắt buộc:
  + Nhất quán: Giữ phong cách giao tiếp, giọng nói ổn định để định vị trong tâm trí khách hàng.
  + Là chính mình: Không gồng hình ảnh, không diễn giả tạo, tạo sự gần gũi chân thật của người miền Tây.
  + Có ranh giới phát ngôn: Nắm rõ các điều cấm của pháp luật, bảo vệ uy tín lâu dài.

3. QUẢN TRỊ NỘI DUNG VÀ KỊCH BẢN PHIÊN LIVE:
- Cấu trúc kịch bản chuẩn 5 phần:
  1. Mở đầu (Hook): Thu hút sự chú ý trong 3-5 giây đầu tiên.
  2. Giá trị chia sẻ: Cung cấp kiến thức hoặc giải pháp cho vấn đề khách hàng gặp phải.
  3. Trình bày sản phẩm: Đặc điểm, công dụng, nguồn gốc xuất xứ rõ ràng.
  4. CTA tương tác: Kêu gọi bình luận, đặt câu hỏi, tung ưu đãi giảm giá hoặc quà tặng.
  5. Kết thúc & Chốt đơn: Tạo sự khẩn trương, cảm ơn và hướng dẫn thanh toán.
- Luôn chuẩn bị nội dung dự phòng khi lượng tương tác giảm đột ngột để tránh "chết live".

4. QUẢN TRỊ KỸ THUẬT:
- Camera nét, mic cài áo lọc tạp âm tốt, ánh sáng bố trí đa hướng không bóng gắt, bối cảnh phòng gọn gàng.
- Đường truyền mạng: Ưu tiên cắm cáp mạng LAN, tốc độ upload đạt từ 10 - 20 Mbps, kiểm thử kết nối trước khi phát sóng.

5. PHÂN TÍCH ĐÁNH GIÁ SỐ LIỆU:
- Công thức đo lường: GPM = CTR (Tỷ lệ nhấp) * CTO (Tỷ lệ chuyển đổi) * AOV (Giá trị trung bình đơn hàng).
- Kế hoạch tài chính: Kiểm soát chi phí địa điểm, thiết bị, KOL, quà tặng và phí sàn.

6. BÀI TẬP TÌNH HUỐNG THỰC TẾ:
- Tình huống 1: Lập kịch bản livestream ra mắt dòng sản phẩm làm đẹp / nông sản sạch.
- Tình huống 2: Phản hồi bình luận chê bai tiêu cực một cách văn minh, trung lập, đúng luật và giữ vững nhịp độ phiên live.`,
    keyTakeaways: [
      'Nắm vững 4 trụ cột: Tư duy - Kỹ thuật - Cảm xúc - Giọng nói trong bán hàng qua livestream.',
      'Quy trình xây dựng kịch bản 5 phần chuyên nghiệp và kịch bản dự phòng chống "chết live".',
      'Công thức tối ưu doanh số GPM và kỹ năng xử lý bình luận tiêu cực an toàn pháp lý.'
    ],
    fileFormat: 'PDF',
    fileSize: '6.5 MB',
    pageCount: 26,
    downloadCount: 340,
    views: 1290,
    isPinned: false,
    targetAudience: 'Nhà vườn kinh doanh trái cây, cơ sở sản xuất thủ công, tiểu thương và thanh niên khởi nghiệp',
    fileName: 'Chuyen-De-Quan-Tri-Phat-Trien-Livestream-Chuyen-Nghiep.pdf',
    isOfficialApproved: true,
  },
  {
    id: 'doc-tmdt-tiktokshop-shopee',
    title: 'Kỹ năng Xây dựng và Vận hành Gian hàng trên Sàn TMĐT & Mạng Xã hội (Shopee & TikTok Shop)',
    codeNumber: 'HD-03/TMĐT-TTSHOP',
    category: 'chuyen_doi_so',
    categoryLabel: 'Chuyển đổi số & Dịch vụ công',
    issuer: 'Tổ Công nghệ số Cộng đồng Xã Long Hồ phối hợp Lemon Digital & TikTok Shop Partner',
    author: 'Lemon Digital & TikTok Shop Partner',
    publishDate: '2026-08-15',
    summary: 'Bộ cẩm nang thực chiến hướng dẫn mở gian hàng và bán hàng trên TikTok Shop & Shopee: Quy định pháp luật mới theo Nghị định 117/2025/NĐ-CP và Luật TMĐT 2025; quy trình xác thực định danh; tối ưu trang chi tiết sản phẩm; sáng tạo video ngắn (Unbox, Edutainment, Mix&Match) và quy định vận hành đóng gói đơn hàng.',
    content: `CẨM NANG VẬN HÀNH GIAN HÀNG SÀN THƯƠNG MẠI ĐIỆN TỬ VÀ TIKTOK SHOP

PHẦN 1: TỔNG QUAN VÀ HÀNH LANG PHÁP LÝ TMĐT NĂM 2026
- Chính sách thuế theo Nghị định số 117/2025/NĐ-CP: Quy định quản lý thuế đối với hoạt động kinh doanh trên nền tảng số, sàn TMĐT của hộ kinh doanh, cá nhân.
- Luật Thương mại điện tử năm 2025 (Luật số 122/2025/QH15): Bảo vệ quyền lợi người tiêu dùng, bảo đảm tính xác thực của thông tin sản phẩm và nghĩa vụ tài chính với Nhà nước.
- Xu hướng Livestream Shopping và Megalive bùng nổ, gắn liền với ứng dụng AI và cá nhân hóa trải nghiệm.

PHẦN 2: QUY TRÌNH KHỞI TẠO VÀ LIÊN KẾT GIAN HÀNG TIKTOK SHOP
1. Đăng ký trực tuyến bằng tài khoản doanh nghiệp hoặc thẻ CCCD cá nhân chính chủ.
2. Cài đặt tài khoản ngân hàng, thông tin kho lấy hàng và thiết lập ủy quyền quản lý.
3. Liên kết tài khoản: 01 gian hàng TikTok Shop được liên kết với 1 tài khoản chính thức (kênh chính) và 4 tài khoản tiếp thị (kênh phụ để bán hàng chéo).
4. Tối ưu hóa tên và mô tả sản phẩm:
- Công thức đặt tên chuẩn SEO: [Loại sản phẩm] + [Thương hiệu] + [Mã sản phẩm] + [Đặc tính nổi bật].
- Bộ hình ảnh tối thiểu 5 ảnh rõ nét, chụp cận cảnh chất liệu, tem nhãn OCOP, bảng quy đổi size/trọng lượng.

PHẦN 3: SÁNG TẠO VIDEO NGẮN THU HÚT TRAFFIC
- Định dạng video dọc 9:16, độ phân giải 1080p, độ dài vàng từ 15 đến 60 giây.
- 4 tuyến nội dung hấp dẫn: Unbox & Review (Mở hộp đánh giá), Edutainment (Chia sẻ kiến thức bổ ích), Mix & Match (Gợi ý cách dùng/phối đồ), Life Style (Phong cách sống sinh động).
- Lưu ý danh mục hàng hóa bị cấm/hạn chế: Hàng giả thương hiệu, sản phẩm giảm cân không phép, thuốc kê đơn, quảng cáo sai sự thật.

PHẦN 4: HƯỚNG DẪN XỬ LÝ ĐƠN HÀNG VÀ CHỈ SỐ VẬN HÀNH
- Quy trình nhận đơn: Chờ xác nhận -> Chờ lấy hàng -> In phiếu giao nhận (vận đơn) -> Bàn giao cho đơn vị vận chuyển (J&T Express, Giao Hàng Nhanh, Ahamove...).
- Quản lý tỷ lệ gửi hàng muộn (LDR): Bắt buộc duy trì tỷ lệ giao trễ LDR dưới 4%. Nếu vi phạm sẽ bị phạt điểm tài khoản và giới hạn số đơn/ngày.
- Quản lý tỷ lệ hủy đơn do người bán (SFCR): Đảm bảo duy trì dưới mức 2.5% tránh bị khóa quyền livestream.`,
    keyTakeaways: [
      'Nắm vững chính sách thuế TMĐT theo Nghị định 117/2025/NĐ-CP và Luật TMĐT năm 2025.',
      'Quy tắc vàng đặt tên sản phẩm chuẩn SEO: Loại sản phẩm + Thương hiệu + Tên/Mã + Đặc tính.',
      'Duy trì tỷ lệ giao hàng trễ (LDR) dưới 4% và tỷ lệ hủy đơn (SFCR) dưới 2.5% để bảo vệ tài khoản.'
    ],
    fileFormat: 'PDF',
    fileSize: '12.1 MB',
    pageCount: 38,
    downloadCount: 520,
    views: 1980,
    isPinned: false,
    targetAudience: 'Chủ thể OCOP, nhà vườn, cơ sở may mặc thủ công, hộ kinh doanh trên địa bàn xã Long Hồ',
    fileName: 'Ky-Nang-Xay-Dung-Van-Hanh-Gian-Hang-Shopee-TikTokShop.pdf',
    isOfficialApproved: true,
  },
  {
    id: 'doc-qd-ban-tru-mam-non',
    title: 'Quyết định số 3122/QĐ-UBND: Phê duyệt Kế hoạch Tổ chức Công tác Bán trú cho Trẻ Trường Mầm non Phú Đức Năm học 2026-2027',
    codeNumber: '3122/QĐ-UBND',
    category: 'phap_luat',
    categoryLabel: 'Chính sách & Pháp luật',
    issuer: 'Ủy Ban Nhân Dân Xã Long Hồ',
    author: 'KT. Chủ tịch - Phó Chủ tịch Nguyễn Thị Mỹ Hạnh',
    publishDate: '2026-09-21',
    summary: 'Quyết định chính thức của Chủ tịch UBND Xã Long Hồ phê duyệt Kế hoạch tổ chức công tác bán trú cho trẻ tại trường Mầm non Phú Đức năm học 2026-2027 (Kèm Kế hoạch số 215/KH-MNPĐ); giao trách nhiệm Phòng Văn hóa - Xã hội và nhà trường bảo đảm nghiêm ngặt an toàn vệ sinh thực phẩm theo Chỉ thị 33/CT-TTg của Thủ tướng Chính phủ.',
    content: `ỦY BAN NHÂN DÂN XÃ LONG HỒ
CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc
Số: 3122/QĐ-UBND, Long Hồ, ngày 21 tháng 9 năm 2026

QUYẾT ĐỊNH
VỀ VIỆC PHÊ DUYỆT KẾ HOẠCH TỔ CHỨC CÔNG TÁC BÁN TRÚ CHO TRẺ TRƯỜNG MẦM NON PHÚ ĐỨC NĂM HỌC 2026-2027

CHỦ TỊCH ỦY BAN NHÂN DÂN XÃ LONG HỒ
- Căn cứ Luật Tổ chức chính quyền địa phương ngày 16 tháng 6 năm 2025;
- Căn cứ Nghị định số 142/2025/NĐ-CP ngày 12 tháng 6 năm 2025 của Chính phủ;
- Căn cứ Chỉ thị số 33/CT-TTg ngày 14 tháng 8 năm 2026 của Thủ tướng Chính phủ yêu cầu tăng cường bảo đảm an toàn thực phẩm và phòng ngừa ngộ độc thực phẩm trong các cơ sở giáo dục;
- Căn cứ Nghị quyết số 07/2021/NQ-HĐND ngày 09 tháng 9 năm 2021 của Hội đồng nhân dân tỉnh Vĩnh Long về quy định các khoản thu dịch vụ phục vụ, hỗ trợ hoạt động giáo dục;
- Theo đề nghị của Trưởng phòng Văn hóa - Xã hội xã Long Hồ tại Tờ trình số 1573/TTr-VHXH ngày 14 tháng 9 năm 2026.

QUYẾT ĐỊNH:
Điều 1. Phê duyệt Kế hoạch tổ chức công tác bán trú cho trẻ trường Mầm non Phú Đức năm học 2026-2027 (Kèm theo Kế hoạch số 215/KH-MNPĐ ngày 09 tháng 9 năm 2026 của trường Mầm non Phú Đức).
Điều 2. Trách nhiệm thi hành:
1. Giao Trưởng phòng Văn hóa - Xã hội xã chủ trì, phối hợp với thủ trưởng các đơn vị có liên quan giám sát việc thực hiện theo các nội dung đã phê duyệt và các quy định pháp luật hiện hành.
2. Giao Hiệu trưởng trường Mầm non Phú Đức có trách nhiệm tổ chức thực hiện Kế hoạch nghiêm túc, đúng quy định, đúng mục đích và hiệu quả.
Điều 3. Chánh Văn phòng HĐND và UBND xã, Trưởng phòng Văn hóa - Xã hội, Trưởng phòng Kinh tế xã, Hiệu trưởng trường Mầm non Phú Đức và các đơn vị có liên quan chịu trách nhiệm thi hành Quyết định này.

KT. CHỦ TỊCH
PHÓ CHỦ TỊCH
(Đã ký và đóng dấu)
Nguyễn Thị Mỹ Hạnh`,
    keyTakeaways: [
      'Phê duyệt chính thức Kế hoạch bán trú năm học 2026-2027 cho trường Mầm non Phú Đức.',
      'Siết chặt công tác an toàn vệ sinh thực phẩm bếp ăn bán trú theo Chỉ thị số 33/CT-TTg.',
      'Giám sát công khai, thu chi đúng quy định theo Nghị quyết 07/2021/NQ-HĐND tỉnh Vĩnh Long.'
    ],
    fileFormat: 'PDF',
    fileSize: '1.5 MB',
    pageCount: 3,
    downloadCount: 168,
    views: 740,
    isPinned: false,
    targetAudience: 'Ban giám hiệu các trường mầm non, phụ huynh học sinh và cán bộ văn hóa xã Long Hồ',
    fileName: 'Quyet-Dinh-3122-QD-UBND-Ban-Tru-Mam-Non-Phu-Duc.pdf',
    isOfficialApproved: true,
  },
  {
    id: 'doc-kh-dao-tao-nghe-ubnd-longho',
    title: 'Kế hoạch số 38/KH-UBND (và KH 72/KH-UBND): Hỗ trợ Đào tạo Nghề Trình độ Sơ cấp, Dưới 3 Tháng cho Lao động Nông thôn và Thanh niên Xã Long Hồ Năm 2026 & Giai đoạn 2026 - 2030',
    codeNumber: '38/KH-UBND',
    category: 'nghe_nong_thon',
    categoryLabel: 'Nghề nông thôn & Khởi nghiệp',
    issuer: 'Ủy Ban Nhân Dân Xã Long Hồ',
    author: 'TM. UBND Xã - KT. Chủ tịch - Phó Chủ tịch Nguyễn Thị Mỹ Hạnh',
    publishDate: '2026-03-18',
    summary: 'Kế hoạch trọng điểm của UBND Xã Long Hồ: Năm 2026 hỗ trợ mở lớp Kỹ thuật chế biến món ăn (35 học viên); Đề án giai đoạn 2026-2030 mở 14 lớp cho 431 lao động (chăm sóc cây sầu riêng, mít xơ đen, ớt sừng vàng, đan thảm lục bình, sinh vật cảnh, chăn nuôi gia súc gia cầm, pha chế đồ uống).',
    content: `ỦY BAN NHÂN DÂN XÃ LONG HỒ
Số: 38/KH-UBND (và Kế hoạch 72/KH-UBND)

KẾ HOẠCH HỖ TRỢ ĐÀO TẠO NGHỀ TRÌNH ĐỘ SƠ CẤP, DƯỚI 3 THÁNG CHO LAO ĐỘNG Ở KHU VỰC NÔNG THÔN VÀ THANH NIÊN TRÊN ĐỊA BÀN XÃ LONG HỒ

I. MỤC TIÊU, CHỈ TIÊU:
- Năm 2026: Đào tạo nghề cho 35 lao động (25 lao động nông thôn + 10 thanh niên hoàn thành nghĩa vụ quân sự/công an). Ngành nghề đào tạo: Kỹ thuật chế biến món ăn.
- Giai đoạn 2026 - 2030: Dự kiến mở 14 lớp cho 431 người (Lĩnh vực phi nông nghiệp: 269 người; Nông nghiệp: 162 người). Tỷ lệ có việc làm sau đào tạo đạt trên 80%.

LỘ TRÌNH CÁC NĂM TIẾP THEO:
- Năm 2027 (03 lớp): 01 lớp pha chế (30 người); 01 lớp sinh vật cảnh (36 người); 01 lớp tập huấn chăm sóc mít xơ đen (36 người).
- Năm 2028 (03 lớp): 01 lớp chăm sóc sắc đẹp (30 người); 01 lớp đan thảm lục bình (30 người); 01 lớp chăm sóc ớt sừng vàng (36 người).
- Năm 2029 (03 lớp): 01 lớp sinh vật cảnh (18 người); 01 lớp chăn nuôi gia súc, gia cầm (36 người); 01 lớp đan lát (36 người).
- Năm 2030 (03 lớp): 01 lớp chăn nuôi gia súc gia cầm (36 người); 01 lớp trồng và chăm sóc cây sầu riêng (36 người); 01 lớp trầm nón lá (36 người).

II. CHÍNH SÁCH VÀ NGUỒN LỰC:
- Người học được miễn phí 100% học phí, được cấp chứng chỉ nghề sơ cấp theo quy định.
- Hỗ trợ vay vốn giải quyết việc làm qua Ngân hàng Chính sách xã hội huyện Long Hồ.
- Liên kết hợp tác xã, doanh nghiệp bao tiêu sản phẩm và tư vấn xuất khẩu lao động có thời hạn ở nước ngoài (Nhật Bản, Đài Loan, Hàn Quốc).`,
    keyTakeaways: [
      'Năm 2026: Mở lớp Kỹ thuật chế biến món ăn cho 35 lao động nông thôn và thanh niên.',
      'Chiến lược 2026-2030: Mở 14 lớp nghề cho 431 lao động gắn với cây ăn trái và thủ công mỹ nghệ.',
      'Học viên được hỗ trợ kết nối vay vốn giải quyết việc làm tại Ngân hàng CSXH.'
    ],
    fileFormat: 'PDF',
    fileSize: '4.5 MB',
    pageCount: 5,
    downloadCount: 310,
    views: 1120,
    isPinned: false,
    targetAudience: 'Người lao động nông thôn, bộ đội xuất ngũ, thanh niên tìm việc làm tại xã Long Hồ',
    fileName: 'Ke-Hoach-38-Dao-Tao-Nghe-Lao-Dong-Nong-Thon-Long-Ho-2026.pdf',
    isOfficialApproved: true,
  },
  {
    id: 'doc-kh-dao-tao-nghe-gdtx',
    title: 'Kế hoạch số 24/KH-GDTXVL: Hỗ trợ Đào tạo Nghề Trình độ Sơ cấp, Dưới 3 Tháng cho Lao động Nông thôn, Thanh niên Năm 2026',
    codeNumber: '24/KH-GDTXVL',
    category: 'nghe_nong_thon',
    categoryLabel: 'Nghề nông thôn & Khởi nghiệp',
    issuer: 'Trung tâm GDTX Vĩnh Long Cơ sở 2 phối hợp UBND Xã Long Hồ',
    author: 'KT. Giám đốc - Phó Giám đốc Đặng Văn Phúc Tâm',
    publishDate: '2026-03-16',
    summary: 'Văn bản phối hợp giữa Trung tâm GDTX tỉnh Vĩnh Long (Cơ sở 2) và UBND Xã Long Hồ: Tổng dự toán kinh phí 368 triệu đồng tổ chức các lớp nghề miễn phí cho 90 học viên (Chế biến món ăn, Tiểu thủ công nghiệp, Sinh vật cảnh) và hỗ trợ tiền ăn, tiền đi lại cho học viên.',
    content: `SỞ GD&ĐT TỈNH VĨNH LONG
TRUNG TÂM GDTX VĨNH LONG CƠ SỞ 2
Số: 24/KH-GDTXVL, ngày 16 tháng 3 năm 2026

KẾ HOẠCH HỖ TRỢ ĐÀO TẠO NGHỀ TRÌNH ĐỘ SƠ CẤP, ĐÀO TẠO DƯỚI 3 THÁNG CHO NGƯỜI LAO ĐỘNG Ở KHU VỰC NÔNG THÔN, THANH NIÊN NĂM 2026

Căn cứ Nghị định 338/2025/NĐ-CP của Chính phủ; Quyết định số 3267/QĐ-UBND của UBND tỉnh Vĩnh Long;
Trung tâm GDTX Vĩnh Long Cơ sở 2 phối hợp với Ủy ban Nhân dân xã Long Hồ xây dựng Kế hoạch đào tạo nghề năm 2026:

1. CHỈ TIÊU ĐÀO TẠO:
Dự kiến chỉ tiêu: 90 người. Trong đó:
- Lĩnh vực phi nông nghiệp (60 người):
  + Nghề Kỹ thuật chế biến món ăn: 30 người (Thời lượng: 150 giờ).
  + Nghề Tiểu thủ công nghiệp: 30 người (Thời lượng: 100 giờ).
- Lĩnh vực nông nghiệp (30 người):
  + Nghề Sinh vật cảnh: 30 người (Thời lượng: 150 giờ).

2. TỔNG DỰ TOÁN KINH PHÍ: 368.000.000 ĐỒNG
- Nguồn kinh phí Trung ương: 204.700.000 đồng.
- Nguồn kinh phí địa phương: 163.300.000 đồng.
- Bao gồm: Chi phí tổ chức đào tạo, nguyên vật liệu thực hành, hỗ trợ tiền ăn và hỗ trợ tiền đi lại cho các đối tượng chính sách theo quy định.

3. HÌNH THỨC VÀ TIÊU CHUẨN:
- Đào tạo tập trung hoặc lưu động tại cơ sở các ấp; đảm bảo tối thiểu 70% thời lượng thực hành cầm tay chỉ việc.
- Cấp Chứng chỉ sơ cấp nghề hoặc Chứng chỉ đào tạo nghề theo quy định của Bộ Lao động - TB&XH.`,
    keyTakeaways: [
      'Tổng kinh phí đào tạo 368 triệu đồng từ ngân sách Nhà nước phục vụ miễn phí nhân dân.',
      'Quy mô 90 học viên chia làm 3 lớp: Nấu ăn (150h), Tiểu thủ công nghiệp (100h), Sinh vật cảnh (150h).',
      'Đảm bảo 70% thời lượng thực hành thực tế và cấp chứng chỉ nghề chính quy.'
    ],
    fileFormat: 'PDF',
    fileSize: '3.2 MB',
    pageCount: 6,
    downloadCount: 228,
    views: 890,
    isPinned: false,
    targetAudience: 'Người lao động nông nhàn, thanh niên có nhu cầu học nghề ngắn hạn tại xã Long Hồ',
    fileName: 'Ke-Hoach-24-GDTX-Vinh-Long-Dao-Tao-Nghe-2026.pdf',
    isOfficialApproved: true,
  },
  {
    id: 'doc-giay-moi-tap-huan-lua',
    title: 'Giấy mời số 08-GM/HNDX: Tham dự Tập huấn Kỹ thuật Trồng Lúa Thích ứng Biến đổi Khí hậu & Chanh Dây Ngọt',
    codeNumber: '08-GM/HNDX',
    category: 'nong_nghiep',
    categoryLabel: 'Nông nghiệp & Khuyến nông',
    issuer: 'Ban Chấp hành Hội Nông Dân Xã Long Hồ',
    author: 'T/M Ban Chấp hành - Chủ tịch Phạm Thanh Hiền',
    publishDate: '2026-07-05',
    summary: 'Giấy mời chính thức của Ban Chấp hành Hội Nông dân Xã Long Hồ mời hội viên nông dân ấp An Thành, An Hiệp tham dự buổi chuyển giao khoa học kỹ thuật trồng lúa ứng phó xâm nhập mặn, biến đổi khí hậu và kỹ thuật thâm canh chanh dây ngọt nâng cao thu nhập.',
    content: `HỘI NÔNG DÂN VIỆT NAM
HỘI NÔNG DÂN TỈNH VĨNH LONG
BCH HỘI NÔNG DÂN XÃ LONG HỒ
Số: 08-GM/HNDX, Long Hồ, ngày 5 tháng 7 năm 2026

GIẤY MỜI
THAM DỰ TẬP HUẤN KỸ THUẬT TRỒNG LÚA BIẾN ĐỔI KHÍ HẬU VÀ CHANH DÂY NGỌT

Nhằm giúp cho Hội viên nông dân am hiểu kỹ thuật trồng chanh dây ngọt và canh tác lúa thích ứng với biến đổi khí hậu, hạn mặn, nâng cao thu nhập cho gia đình.
Ban Chấp hành Hội Nông dân xã Long Hồ trân trọng kính mời:
- Kính mời: Ông (bà) Nguyễn Văn Sang (ấp An Thành, xã Long Hồ) và Ông (bà) Nguyễn Văn Năm (ấp An Hiệp, xã Long Hồ) cùng toàn thể bà con hội viên nông dân.
- Thời gian: 01 buổi, vào lúc 8 giờ 00 phút ngày 09 tháng 7 năm 2026 (Thứ Năm).
- Địa điểm: Nhà ông Nguyễn Văn Năm - Chi hội trưởng Nông dân ấp An Hiệp, xã Long Hồ, tỉnh Vĩnh Long.

Kính mong quý bà con nông dân tham dự đúng thời gian và địa điểm nêu trên để buổi tập huấn chuyển giao kỹ thuật đạt kết quả tốt nhất.

T/M BAN CHẤP HÀNH
CHỦ TỊCH
(Đã ký và đóng dấu)
Phạm Thanh Hiền`,
    keyTakeaways: [
      'Thời gian: 8h00 sáng Thứ Năm ngày 09/7/2026.',
      'Địa điểm: Nhà ông Nguyễn Văn Năm - Chi hội trưởng Nông dân ấp An Hiệp.',
      'Nội dung: Chuyển giao kỹ thuật canh tác lúa ứng phó hạn mặn và trồng chanh dây ngọt.'
    ],
    fileFormat: 'PDF',
    fileSize: '850 KB',
    pageCount: 2,
    downloadCount: 145,
    views: 620,
    isPinned: false,
    targetAudience: 'Hội viên nông dân các ấp An Hiệp, An Thành và các ấp lân cận xã Long Hồ',
    fileName: 'Giay-Moi-08-Tap-Huan-Ky-Thuat-Lua-Bien-Doi-Khi-Hau.pdf',
    isOfficialApproved: true,
  },
  {
    id: 'doc-kh-hat-sac-bua-phu-le',
    title: 'Kế hoạch số 189/KH-UBND: Tổ chức Lớp Truyền dạy, Hướng dẫn Thực hành Diễn xướng Dân gian "Hát Sắc Bùa Phú Lễ" – Di sản Văn hóa Phi vật thể Quốc gia',
    codeNumber: '189/KH-UBND',
    category: 'giao_duc_khac',
    categoryLabel: 'Giáo dục thường xuyên & Khác',
    issuer: 'Ủy Ban Nhân Dân Xã Long Hồ',
    author: 'TM. UBND Xã - KT. Chủ tịch - Phó Chủ tịch Nguyễn Thị Mỹ Hạnh',
    publishDate: '2026-08-17',
    summary: 'Kế hoạch tổ chức lớp truyền dạy di sản văn hóa phi vật thể "Hát sắc bùa Phú Lễ" thuộc Tiêu chí số 06 Chương trình MTQG Xây dựng Nông thôn mới nâng cao năm 2026. Lớp học diễn ra từ 24/8 đến 27/8/2026 tại Trung tâm VHTT xã Long Hồ dành cho 50 học viên từ các trường học, đoàn thể và CLB đờn ca tài tử.',
    content: `ỦY BAN NHÂN DÂN XÃ LONG HỒ
Số: 189/KH-UBND, ngày 17 tháng 8 năm 2026

KẾ HOẠCH TỔ CHỨC LỚP TRUYỀN DẠY, HƯỚNG DẪN THỰC HÀNH DIỄN XƯỚNG DÂN GIAN "HÁT SẮC BÙA PHÚ LỄ" - DI SẢN VĂN HÓA PHI VẬT THỂ QUỐC GIA (THUỘC TIÊU CHÍ SỐ 06 NÔNG THÔN MỚI NÂNG CAO NĂM 2026)

I. MỤC ĐÍCH, YÊU CẦU:
- Bảo tồn, gìn giữ và phát huy giá trị di sản văn hóa phi vật thể quốc gia "Hát sắc bùa Phú Lễ" trong đời sống cộng đồng.
- Tạo nguồn lực nòng cốt kế thừa có khả năng tổ chức, biểu diễn và truyền dạy lại tại các trường học và câu lạc bộ nghệ thuật địa phương.

II. NỘI DUNG VÀ THỜI GIAN:
1. Nội dung truyền dạy:
- Giới thiệu nguồn gốc, ý nghĩa văn hóa của Hát sắc bùa Phú Lễ.
- Hướng dẫn kỹ thuật hát, cách thức diễn xướng, tổ chức đội hình, sử dụng nhạc cụ, đạo cụ truyền thống (trống cơm, sanh sứa...).
- Thực hành biểu diễn theo nhóm, xử lý tình huống sân khấu thực tế.
2. Đối tượng và số lượng:
- Dự kiến 50 học viên gồm: Cán bộ văn hóa xã, giáo viên dạy thanh nhạc, tổng phụ trách Đội của 13 trường học, thành viên các CLB Đờn ca tài tử (15 người) và đoàn viên thanh niên (10 người).
3. Thời gian và địa điểm:
- Thời gian: Từ ngày 24/8/2026 đến ngày 27/8/2026 (04 ngày). Khai giảng lúc 08h00 ngày 24/8; Bế giảng lúc 16h00 ngày 27/8/2026.
- Địa điểm: Trung tâm Văn hóa Thể thao Xã Long Hồ (Trụ sở Trung tâm Văn hóa xã Phú Đức cũ).
4. Giảng viên hướng dẫn: Nghệ nhân dân gian, diễn giả có uy tín và am hiểu sâu sắc về nghệ thuật diễn xướng dân gian trực tiếp truyền dạy. Kết thúc khóa học, học viên được cấp Giấy chứng nhận hoàn thành lớp truyền dạy.`,
    keyTakeaways: [
      'Thời gian học: 4 ngày (từ 24/8/2026 đến 27/8/2026) tại Trung tâm VHTT xã Long Hồ.',
      'Đối tượng: 50 học viên từ các trường học, CLB đờn ca tài tử và đoàn viên thanh niên.',
      'Cấp Giấy chứng nhận hoàn thành khóa đào tạo di sản văn hóa phi vật thể quốc gia.'
    ],
    fileFormat: 'PDF',
    fileSize: '3.1 MB',
    pageCount: 4,
    downloadCount: 198,
    views: 820,
    isPinned: false,
    targetAudience: 'Giáo viên âm nhạc, cán bộ văn hóa, thành viên CLB đờn ca tài tử và thanh niên xã Long Hồ',
    fileName: 'Ke-Hoach-189-Lop-Truyen-Day-Hat-Sac-Bua-Phu-Le.pdf',
    isOfficialApproved: true,
  },

  // --- CÁC TÀI LIỆU KHO NÔNG NGHIỆP & PHÁP LUẬT NỀN TẢNG ---
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
    isPinned: false,
    targetAudience: 'Hội viên nông dân, nhà vườn trồng cây ăn trái trên địa bàn xã Long Hồ',
    fileName: 'So-Tay-Ky-Thuat-Buoi-Da-Xanh-VietGAP-LongHo.pdf',
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
  }
];

export const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-thu-bay-vi-dan',
    title: 'Thông báo: Triển khai Mô hình Ngày Thứ Bảy "Vì Dân Phục Vụ" – Tiếp nhận TTHC & Dịch vụ công Lưu động tại 13 Ấp',
    codeNumber: 'TB-01/TTPVHCC-LH',
    publishDate: '2026-08-25',
    priority: 'urgent',
    type: 'hoat_dong_chung',
    typeLabel: 'Hoạt động công quyền vì dân',
    issuer: 'Trung tâm Phục vụ Hành chính công Xã Long Hồ',
    summary: 'Từ 05/9/2026, Trung tâm Phục vụ Hành chính công xã tổ chức tiếp nhận và trả kết quả TTHC lưu động vào sáng thứ Bảy hàng tuần tại trụ sở các ấp, hỗ trợ bà con làm thủ tục hộ tịch, chứng thực, đất đai và cài đặt VNeID, Smart Vĩnh Long.',
    content: `Thực hiện Kế hoạch số 01/KH-TTPVHCC ngày 12/8/2026 của Trung tâm Phục vụ Hành chính công xã Long Hồ;
Kính thông báo đến toàn thể nhân dân 13 ấp trên địa bàn xã:

1. Thời gian: Định kỳ sáng thứ Bảy hàng tuần từ 07h30 đến 11h00 (bắt đầu từ ngày 05/9/2026).
2. Địa điểm: Luân phiên tại Nhà sinh hoạt văn hóa của từng ấp.
3. Nội dung phục vụ:
- Tiếp nhận và giải quyết trực tiếp các thủ tục hành chính: Khai sinh, khai tử, kết hôn, xác nhận tình trạng hôn nhân, chứng thực bản sao, hồ sơ bảo trợ xã hội, biến động đất đai.
- Cầm tay chỉ việc hướng dẫn người dân nộp hồ sơ trực tuyến, thanh toán trực tuyến không dùng tiền mặt.
- Hỗ trợ cài đặt và kích hoạt VNeID mức 2, ứng dụng Smart Vĩnh Long.
Trân trọng thông báo bà con sắp xếp thời gian đến liên hệ giải quyết thủ tục.`,
    isPinned: true,
    relatedDocumentId: 'doc-kh-ngay-thu-bay-vi-dan',
  },
  {
    id: 'ann-lop-ai-mobifone',
    title: 'Thông báo Chiêu sinh Lớp Tập huấn: "Ứng dụng AI Thực hành trong Công việc Hành chính & Nâng cao Năng suất" Năm 2026',
    codeNumber: 'TB-12/CĐS-LH',
    publishDate: '2026-07-22',
    priority: 'important',
    type: 'chieu_sinh',
    typeLabel: 'Chiêu sinh lớp học',
    issuer: 'Tổ Chuyển đổi số phối hợp MobiFone Vĩnh Long',
    summary: 'Mở lớp đào tạo kỹ năng viết prompt 5 thành phần, sử dụng Google NotebookLM tóm tắt văn bản dài và Gamma.app tạo slide báo cáo hành chính dành cho cán bộ, công chức, đoàn thanh niên xã Long Hồ.',
    content: `Trung tâm HTCĐ phối hợp MobiFone Vĩnh Long tổ chức khóa tập huấn thực hành AI chuyên sâu:
- Thời gian: Khai giảng lúc 08h00 ngày 01/8/2026.
- Địa điểm: Phòng máy tính Trung tâm HTCĐ Xã Long Hồ.
- Giảng viên: Chuyên gia Trí tuệ nhân tạo Trung tâm Kinh doanh Giải pháp số - MobiFone Vĩnh Long.
- Học phí: 100% Miễn phí. Học viên được cấp tài liệu Giáo trình AI và tài khoản thực hành miễn phí.`,
    isPinned: true,
    relatedClassId: 'class-ai-mobifone',
    relatedDocumentId: 'doc-mobifone-ai-giao-trinh',
  },
  {
    id: 'ann-lop-hat-sac-bua',
    title: 'Thông báo Khai giảng Lớp Truyền dạy Diễn xướng Dân gian "Hát Sắc Bùa Phú Lễ" – Di sản Phi vật thể Quốc gia',
    codeNumber: 'TB-189/VHTT-LH',
    publishDate: '2026-08-18',
    priority: 'important',
    type: 'chieu_sinh',
    typeLabel: 'Chiêu sinh lớp học',
    issuer: 'UBND Xã Long Hồ - Phòng Văn hóa - Xã hội',
    summary: 'Chiêu sinh 50 học viên tham gia lớp truyền dạy nghệ thuật hát sắc bùa Phú Lễ từ ngày 24/8 đến 27/8/2026 tại Trung tâm Văn hóa Thể thao xã Long Hồ (Trung tâm VHTT Phú Đức cũ).',
    content: `Căn cứ Kế hoạch số 189/KH-UBND ngày 17/8/2026;
UBND xã Long Hồ thông báo chiêu sinh lớp truyền dạy diễn xướng dân gian "Hát sắc bùa Phú Lễ" (Tiêu chí số 06 Nông thôn mới nâng cao):
- Thời gian học: Từ ngày 24/8/2026 đến 27/8/2026 (Khai giảng 08h00 ngày 24/8; Bế giảng 16h00 ngày 27/8/2026).
- Địa điểm: Trung tâm Văn hóa Thể thao Xã Long Hồ (Trụ sở xã Phú Đức cũ).
- Học viên được nghệ nhân truyền dạy kỹ thuật hát, cách sử dụng nhạc cụ đạo cụ và cấp Giấy chứng nhận hoàn thành.`,
    isPinned: true,
    relatedClassId: 'class-hat-sac-bua',
    relatedDocumentId: 'doc-kh-hat-sac-bua-phu-le',
  },
  {
    id: 'ann-tap-huan-lua-chanh-day',
    title: 'Thông báo: Lịch Tập huấn Kỹ thuật Canh tác Lúa Thích ứng Biến đổi Khí hậu & Chanh Dây Ngọt',
    codeNumber: 'TB-08/HND-LH',
    publishDate: '2026-07-06',
    priority: 'normal',
    type: 'hoi_thao',
    typeLabel: 'Hội thảo khuyến nông',
    issuer: 'BCH Hội Nông Dân Xã Long Hồ',
    summary: 'Hội Nông dân xã tổ chức buổi chuyển giao kỹ thuật trồng lúa ứng phó hạn mặn và trồng chanh dây ngọt vào lúc 08h00 ngày 09/7/2026 tại Nhà ông Nguyễn Văn Năm (Chi hội trưởng ấp An Hiệp).',
    content: `Kính mời toàn thể hội viên nông dân ấp An Hiệp, An Thành và các ấp lân cận tham dự buổi tập huấn kỹ thuật nông nghiệp thích ứng biến đổi khí hậu theo Giấy mời số 08-GM/HNDX.`,
    isPinned: false,
    relatedDocumentId: 'doc-giay-moi-tap-huan-lua',
  }
];

export const INITIAL_CLASSES: ClassScheduleItem[] = [
  {
    id: 'class-ai-mobifone',
    title: 'Ứng dụng AI Thực hành trong Công việc Hành chính & Nâng cao Hiệu suất Làm việc',
    topicCategory: 'chuyen_doi_so',
    topicLabel: 'Trí tuệ nhân tạo & Kỹ năng số',
    instructor: 'Tổ Chuyên gia Giải pháp số MobiFone Vĩnh Long',
    instructorTitle: 'Kỹ sư Giải pháp Công nghệ Số',
    venue: 'Phòng Máy tính TT HTCĐ Xã Long Hồ',
    addressNote: 'Lầu 1, Trụ sở UBND Xã Long Hồ',
    startDate: '2026-08-01',
    endDate: '2026-08-05',
    timeSlot: '08:00 - 11:30',
    sessionDays: 'Thứ Bảy, Chủ Nhật',
    totalHours: 16,
    capacity: 35,
    registeredCount: 28,
    fee: 'Miễn phí 100%',
    targetAudience: 'Cán bộ, công chức, đoàn thanh niên, người lao động các ấp trên địa bàn xã',
    status: 'sap_dien_ra',
    description: 'Thực hành cầm tay chỉ việc viết prompt 5 thành phần, sử dụng NotebookLM tóm tắt văn bản quy phạm pháp luật và tạo slide trình chiếu Gamma.app.',
    curriculum: [
      'Buổi 1: Cấu trúc prompt 5 thành phần và thực hành soạn văn bản hành chính công.',
      'Buổi 2: Tóm tắt chỉ thị dài và trích dẫn bằng Google NotebookLM không bị ảo giác.',
      'Buổi 3: Tạo bài thuyết trình slide tự động bằng Gamma.app.',
      'Buổi 4: Quy trình 5 bước bảo đảm an toàn dữ liệu công vụ khi dùng AI.'
    ],
    contactPhone: '0270.3852.114',
  },
  {
    id: 'class-hat-sac-bua',
    title: 'Lớp Truyền dạy Thực hành Diễn xướng Dân gian "Hát Sắc Bùa Phú Lễ" – Di sản Quốc gia',
    topicCategory: 'giao_duc_khac',
    topicLabel: 'Văn hóa nghệ thuật truyền thống',
    instructor: 'Nghệ nhân Dân gian & Giảng viên Văn hóa',
    instructorTitle: 'Nghệ nhân Di sản Văn hóa Phi vật thể',
    venue: 'Trung tâm Văn hóa Thể thao Xã Long Hồ',
    addressNote: 'Trụ sở Trung tâm Văn hóa xã Phú Đức cũ',
    startDate: '2026-08-24',
    endDate: '2026-08-27',
    timeSlot: '08:00 - 16:30',
    sessionDays: 'Thứ Hai đến Thứ Năm (4 ngày liên tục)',
    totalHours: 28,
    capacity: 50,
    registeredCount: 42,
    fee: 'Miễn phí 100%',
    targetAudience: 'Giáo viên âm nhạc, cán bộ văn hóa, thành viên CLB đờn ca tài tử và đoàn viên thanh niên',
    status: 'sap_dien_ra',
    description: 'Bảo tồn di sản văn hóa phi vật thể theo Tiêu chí 06 Nông thôn mới nâng cao. Học viên được thực hành nhạc cụ, đội hình và cấp Giấy chứng nhận hoàn thành.',
    curriculum: [
      'Phần 1: Giới thiệu cội nguồn và ý nghĩa nghi lễ Hát sắc bùa Phú Lễ.',
      'Phần 2: Học hát các bài mẫu và cách gõ nhịp sanh sứa, trống cơm.',
      'Phần 3: Dàn dựng đội hình diễn xướng và thực hành biểu diễn tập thể.'
    ],
    contactPhone: '0919.231.844',
  },
  {
    id: 'class-livestream-tmdt',
    title: 'Kỹ năng Bán hàng Nông sản & Sản phẩm OCOP qua Livestream Chuyên nghiệp',
    topicCategory: 'nghe_nong_thon',
    topicLabel: 'Kinh tế số & Thương mại điện tử',
    instructor: 'ThS. Nguyễn Hoàng Nam',
    instructorTitle: 'Chuyên gia Thương mại Điện tử & Livestream',
    venue: 'Phòng Studio Thực nghiệm TT HTCĐ Xã Long Hồ',
    addressNote: 'Đường số 3, Trung tâm Hành chính Xã Long Hồ',
    startDate: '2026-08-15',
    endDate: '2026-08-22',
    timeSlot: '18:30 - 20:30',
    sessionDays: 'Thứ Ba, Thứ Năm, Thứ Bảy',
    totalHours: 12,
    capacity: 30,
    registeredCount: 25,
    fee: 'Miễn phí 100%',
    targetAudience: 'Nhà vườn trồng bưởi, cam sành, chủ cơ sở chế biến thủ công mỹ nghệ xã Long Hồ',
    status: 'sap_dien_ra',
    description: 'Khóa học trang bị kỹ năng livestream 5 phần, setup phòng live với ánh sáng mic chất lượng cao, tối ưu tỷ lệ nhấp và chuyển đổi đơn hàng.',
    curriculum: [
      'Buổi 1: Xây dựng thương hiệu cá nhân và chuẩn bị thiết bị phòng live.',
      'Buổi 2: Soạn thảo kịch bản 5 phần và kịch bản dự phòng chống tụt view.',
      'Buổi 3: Thực hành nói trước ống kính và xử lý bình luận tiêu cực an toàn pháp lý.'
    ],
    contactPhone: '0939.812.504',
  },
  {
    id: 'class-che-bien-mon-an',
    title: 'Khóa Đào tạo Sơ cấp Nghề: Kỹ thuật Chế biến Món ăn & Nữ công Gia chánh (Kế hoạch 38 & 24)',
    topicCategory: 'nghe_nong_thon',
    topicLabel: 'Đào tạo nghề lao động nông thôn',
    instructor: 'Giảng viên Trung tâm GDTX Vĩnh Long Cơ sở 2',
    instructorTitle: 'Bếp trưởng & Giảng viên Dạy nghề',
    venue: 'Hội trường Nhà Văn hóa Ấp Long Thuận',
    addressNote: 'Ấp Long Thuận, Xã Long Hồ',
    startDate: '2026-09-01',
    endDate: '2026-10-15',
    timeSlot: '13:30 - 16:30',
    sessionDays: 'Thứ Hai đến Thứ Sáu hàng tuần',
    totalHours: 150,
    capacity: 35,
    registeredCount: 29,
    fee: 'Miễn phí 100%',
    targetAudience: 'Lao động nữ nông thôn, thanh niên hoàn thành nghĩa vụ quân sự và công an xuất ngũ',
    status: 'sap_dien_ra',
    description: 'Chương trình đào tạo nghề theo Kế hoạch 38/KH-UBND và Kế hoạch 24/KH-GDTXVL. Hỗ trợ tiền ăn, tiền đi lại cho đối tượng chính sách và cấp chứng chỉ sơ cấp nghề.',
    curriculum: [
      'Giai đoạn 1: Vệ sinh an toàn thực phẩm và kỹ thuật sơ chế nguyên liệu địa phương.',
      'Giai đoạn 2: Chế biến các món ăn tiệc cưới, ẩm thực truyền thống Nam Bộ.',
      'Giai đoạn 3: Thực hành quản lý bếp ăn, tính toán giá thành mở quán ăn kinh doanh.'
    ],
    contactPhone: '0270.3852.120',
  }
];

export const INITIAL_REGISTRATIONS: RegistrationItem[] = [
  {
    id: 'reg-001',
    classId: 'class-ai-mobifone',
    classTitle: 'Ứng dụng AI Thực hành trong Công việc Hành chính & Nâng cao Hiệu suất Làm việc',
    fullName: 'Lê Văn Thanh',
    phoneNumber: '0918.234.567',
    hamlet: 'Ấp An Lạc',
    yearOfBirth: '1988',
    note: 'Cán bộ đoàn muốn học cách ứng dụng AI làm poster và kế hoạch.',
    registeredAt: '2026-07-23 09:20',
  },
  {
    id: 'reg-002',
    classId: 'class-hat-sac-bua',
    classTitle: 'Lớp Truyền dạy Thực hành Diễn xướng Dân gian "Hát Sắc Bùa Phú Lễ" – Di sản Quốc gia',
    fullName: 'Nguyễn Thị Hồng Hạnh',
    phoneNumber: '0939.567.890',
    hamlet: 'Ấp Long Thuận',
    yearOfBirth: '1992',
    note: 'Giáo viên dạy âm nhạc trường tiểu học đăng ký tham gia.',
    registeredAt: '2026-08-19 14:15',
  },
  {
    id: 'reg-003',
    classId: 'class-livestream-tmdt',
    classTitle: 'Kỹ năng Bán hàng Nông sản & Sản phẩm OCOP qua Livestream Chuyên nghiệp',
    fullName: 'Trần Văn Đực',
    phoneNumber: '0908.765.432',
    hamlet: 'Ấp Phước Ngươn',
    yearOfBirth: '1975',
    note: 'Gia đình có vườn bưởi da xanh muốn học bán hàng qua TikTok Shop.',
    registeredAt: '2026-08-16 16:45',
  }
];

// --- DANH SÁCH BAN GIÁM ĐỐC, CÁN BỘ QUẢN LÝ VÀ GIÁO VIÊN/BÁO CÁO VIÊN ---
// Trích theo Hồ sơ minh chứng Chỉ số 1 – Tiêu chí 5.2 về Nông thôn mới ngày 18/9/2026
export const INITIAL_STAFF_MEMBERS: StaffMember[] = [
  // I. BAN GIÁM ĐỐC TRUNG TÂM HỌC TẬP CỘNG ĐỒNG
  {
    id: 'staff-01',
    stt: 1,
    fullName: 'Nguyễn Thị Mỹ Hạnh',
    roleInCenter: 'Giám đốc (kiêm nhiệm)',
    roleInGovernment: 'Phó Chủ tịch UBND xã Long Hồ',
    phone: '0918639833',
    group: 'ban_giam_doc',
    responsibilities: 'Chịu trách nhiệm toàn diện về công tác tổ chức, chỉ đạo chiến lược học tập suốt đời, kế hoạch ngân sách và điều hành hoạt động chung của Trung tâm.',
    avatarInitials: 'MH'
  },
  {
    id: 'staff-02',
    stt: 2,
    fullName: 'Lưu Quốc Trụ',
    roleInCenter: 'Phó Giám đốc (Kiêm nhiệm)',
    roleInGovernment: 'Chủ tịch Hội Khuyến học xã Long Hồ',
    phone: '0984141313',
    group: 'ban_giam_doc',
    responsibilities: 'Phụ trách phong trào thi đua Khuyến học - Khuyến tài, xây dựng gia đình/dòng họ học tập và liên kết các nguồn lực hỗ trợ cộng đồng.',
    avatarInitials: 'QT'
  },
  {
    id: 'staff-03',
    stt: 3,
    fullName: 'Nguyễn Văn Nho',
    roleInCenter: 'Phó Giám đốc (Kiêm nhiệm)',
    roleInGovernment: 'Hiệu trưởng Trường Trung học cơ sở Long Phước A',
    phone: '0772137275',
    group: 'ban_giam_doc',
    responsibilities: 'Phụ trách chuyên môn đào tạo, bồi dưỡng, thẩm định giáo trình bài giảng và điều phối mạng lưới giáo viên, báo cáo viên.',
    avatarInitials: 'VN'
  },

  // II. CÁN BỘ QUẢN LÝ VÀ TRỢ LÝ
  {
    id: 'staff-04',
    stt: 1,
    fullName: 'Phạm Thị Thiên Hương',
    roleInCenter: 'Cán bộ',
    roleInGovernment: 'Nhân viên trường Trung học cơ sở Long Hồ',
    phone: '0782847880',
    group: 'can_bo_quan_ly',
    responsibilities: 'Theo dõi tiến độ mở lớp, hồ sơ minh chứng học tập tiêu chí NTM và quản lý phòng máy vi tính cộng đồng.',
    avatarInitials: 'TH'
  },
  {
    id: 'staff-05',
    stt: 2,
    fullName: 'Nguyễn Hữu Hoàng',
    roleInCenter: 'Cán bộ',
    roleInGovernment: 'Giáo viên trường Tiểu học Long An A',
    phone: '0949625789',
    group: 'can_bo_quan_ly',
    responsibilities: 'Phối hợp tổ chức các lớp xóa mù chữ chức năng, bồi dưỡng tin học ứng dụng và hỗ trợ điều phối lớp học lưu động tại các ấp.',
    avatarInitials: 'HH'
  },
  {
    id: 'staff-06',
    stt: 3,
    fullName: 'Lê Thị Xuân Lan',
    roleInCenter: 'Cán bộ',
    roleInGovernment: 'Phó Hiệu trưởng trường Mầm non Phú Đức',
    phone: '0975885138',
    group: 'can_bo_quan_ly',
    responsibilities: 'Phụ trách các chuyên đề chăm sóc giáo dục mầm non, kỹ năng gia đình, dinh dưỡng và phổ cập kiến thức phụ nữ nông thôn.',
    avatarInitials: 'XL'
  },
  {
    id: 'staff-07',
    stt: 4,
    fullName: 'Nguyễn Thị Mỹ Trang',
    roleInCenter: 'Kế toán',
    roleInGovernment: 'Kế toán Văn phòng HĐND và UBND xã Long Hồ',
    phone: '0901090683',
    group: 'can_bo_quan_ly',
    responsibilities: 'Quản lý tài chính, lập dự toán kinh phí hỗ trợ đào tạo nghề cho lao động nông thôn theo Kế hoạch 38 và các chương trình mục tiêu quốc gia.',
    avatarInitials: 'MT'
  },
  {
    id: 'staff-08',
    stt: 5,
    fullName: 'Lê Thị Việt Thắm',
    roleInCenter: 'Thủ quỹ',
    roleInGovernment: 'Chuyên viên Văn phòng HĐND và UBND xã Long Hồ',
    phone: '0769597969',
    group: 'can_bo_quan_ly',
    responsibilities: 'Thực hiện chi trả chế độ hỗ trợ tiền ăn, tiền đi lại cho học viên diện chính sách và bảo quản cơ sở vật chất, công cụ giảng dạy.',
    avatarInitials: 'VT'
  }
];

export const INITIAL_FEEDBACK: FeedbackItem[] = [
  {
    id: 'fb-001',
    fullName: 'Nguyễn Văn Sang',
    phoneNumber: '0913.882.341',
    hamlet: 'Ấp An Thành',
    targetRecipient: 'Đ/c Nguyễn Thị Mỹ Hạnh (Giám đốc kiêm PCT UBND Xã)',
    topic: 'Đề xuất mở lớp đào tạo nghề tại ấp',
    title: 'Đề nghị tổ chức lớp tập huấn bón phân hữu cơ và ứng phó hạn mặn tại Nhà văn hóa ấp An Thành',
    content: 'Kính gửi Ban Giám đốc Trung tâm. Hiện nay bà con trồng lúa và vườn cây ăn trái tại ấp An Thành rất muốn tiếp cận thêm kỹ thuật bón phân hữu cơ và xử lý hạn mặn sớm. Rất mong Trung tâm xem xét tổ chức thêm 01 buổi tập huấn vào cuối tuần tại ấp để người lớn tuổi tiện tham gia.',
    createdAt: '2026-09-20 08:30',
    status: 'da_tra_loi',
    officialResponse: {
      responderName: 'Đ/c Nguyễn Thị Mỹ Hạnh',
      responderTitle: 'Giám đốc TTHTCĐ - Phó Chủ tịch UBND Xã Long Hồ',
      responseDate: '2026-09-21 10:15',
      content: 'Ban Giám đốc Trung tâm HTCĐ ghi nhận và hoan nghênh ý kiến của bà con ấp An Thành. Hiện Trung tâm đã phối hợp cùng Hội Nông dân xã lên kế hoạch đưa cán bộ khuyến nông về tổ chức lớp tại Nhà văn hóa ấp An Thành vào tuần thứ 2 của tháng tới. Kế hoạch cụ thể sẽ có giấy mời gửi tới từng tổ nhân dân tự quản.'
    }
  },
  {
    id: 'fb-002',
    fullName: 'Trần Thị Thu Ba',
    phoneNumber: '0942.551.879',
    hamlet: 'Ấp Long Thuận',
    targetRecipient: 'Đ/c Lưu Quốc Trụ (Phó Giám đốc kiêm Chủ tịch Hội Khuyến học)',
    topic: 'Chương trình & Tài liệu học tập',
    title: 'Xin bổ sung tài liệu tóm tắt cẩm nang nộp hồ sơ trực tuyến dạng in giấy tại Nhà văn hóa ấp',
    content: 'Gia đình tôi có đọc qua tài liệu chuyển đổi số trên cổng thông tin rất hay. Tuy nhiên bà con lớn tuổi trong ấp mắt kém nên mong Trung tâm cấp thêm một số bản in tóm tắt đặt tại Nhà sinh hoạt văn hóa ấp để bà con tới đọc thuận tiện hơn.',
    createdAt: '2026-09-22 14:20',
    status: 'da_tra_loi',
    officialResponse: {
      responderName: 'Đ/c Lưu Quốc Trụ',
      responderTitle: 'Phó Giám đốc TTHTCĐ - Chủ tịch Hội Khuyến học',
      responseDate: '2026-09-23 09:00',
      content: 'Trung tâm đã chỉ đạo Tổ công nghệ số cộng đồng in ấn 50 cuốn cẩm nang bỏ túi hướng dẫn dịch vụ công trực tuyến và phân bổ về Nhà văn hóa 13 ấp (trong đó có ấp Long Thuận). Bà con có thể đến gặp Trưởng ấp hoặc Cán bộ văn hóa để nhận tài liệu miễn phí.'
    }
  },
  {
    id: 'fb-003',
    fullName: 'Lê Hoàng Nam',
    phoneNumber: '0988.334.212',
    hamlet: 'Ấp Phước Ngươn',
    targetRecipient: 'Đ/c Nguyễn Văn Nho (Phó Giám đốc phụ trách chuyên môn)',
    topic: 'Cơ sở vật chất & Nhà văn hóa',
    title: 'Đề xuất tăng cường khung giờ mở cửa phòng máy tính kết nối mạng phục vụ học sinh nghèo',
    content: 'Em là đoàn viên thường xuyên về sinh hoạt tại ấp Phước Ngươn, thấy phòng máy vi tính của Trung tâm rất bổ ích cho các em học sinh nghèo làm bài tập và tra cứu. Đề xuất Trung tâm mở thêm khung giờ buổi tối các ngày cuối tuần để các em thuận tiện tới học tập bổ sung.',
    createdAt: '2026-09-25 19:40',
    status: 'da_tra_loi',
    officialResponse: {
      responderName: 'Đ/c Nguyễn Văn Nho',
      responderTitle: 'Phó Giám đốc TTHTCĐ - Hiệu trưởng THCS Long Phước A',
      responseDate: '2026-09-26 08:30',
      content: 'Cảm ơn em đã gửi ý kiến đóng góp thiết thực. Ban Giám đốc đã phân công đồng chí Phạm Thị Thiên Hương và các giáo viên phụ trách phòng máy mở rộng khung giờ phục vụ từ 18h30 đến 20h30 vào các tối Thứ Sáu và Thứ Bảy hàng tuần.'
    }
  },
  {
    id: 'fb-004',
    fullName: 'Võ Văn Hùng',
    phoneNumber: '0918.776.432',
    hamlet: 'Ấp Bình Hòa',
    targetRecipient: 'Toàn thể Ban Giám đốc',
    topic: 'Đề xuất mở lớp đào tạo nghề tại ấp',
    title: 'Nguyện vọng mở khóa ngắn hạn dạy kỹ thuật bảo dưỡng và sửa chữa máy cày, máy gặt mini',
    content: 'Bà con nông dân ấp Bình Hòa hiện sử dụng nhiều máy kéo, máy phun xịt tự động và máy gặt nhưng khi gặp trục trặc kỹ thuật cơ bản phải chở đi xa sửa tốn kém. Mong Trung tâm liên kết với trung tâm giáo dục nghề nghiệp mở khóa thực hành cầm tay chỉ việc ngắn hạn.',
    createdAt: '2026-09-26 15:10',
    status: 'dang_xu_ly'
  }
];


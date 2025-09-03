import type { Theme, ThemeCategory } from './types';

const createTheme = (name: string, categorySlug: string): Theme => {
  const slug = name.toLowerCase()
    .replace(/ & /g, '-and-')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
  return {
    id: `${categorySlug}-${slug}`,
    name: name,
    prompt: `Transform the person in the photo to fit the Vietnamese theme of "${name}". Critically, you must preserve the exact facial features and identity of the person from the uploaded photo with photorealistic accuracy. The final image should be hyper-realistic, high-resolution, and seamlessly blend the person's face into the new scene. The background, clothing, and overall atmosphere must authentically reflect the specified theme.`,
    thumbnail: `https://picsum.photos/seed/${slug}/200`
  };
};

export const THEME_CATEGORIES: ThemeCategory[] = [
  {
    id: 'trending',
    name: 'Trending',
    themes: [
      {
        id: 'trending-3d-model-2025',
        name: 'Tạo mô hình 3D 2025',
        prompt: `Based on the character in the image provided, create a hyper-realistic product shot of their premium collectible figure, with the face identical to the uploaded photo. The figure stands on a round, clear acrylic base, posing naturally. Place the figure on a modern wooden table in front of a widescreen computer monitor running 3D modeling software. Next to the figure, place a colorful retail box with the same character illustration and “HOANG-AI” branding without any highlights. The box design should be vibrant pinks, purples, and blues, with the Bandai logo at the bottom. The background should be a blurry bookshelf with various anime characters.\n\nCamera Style: Shot with a DSLR camera with a 50mm lens, shallow depth of field, cinematic lighting, natural daylight through a window, sharp details on the figure while the background remains softly blurred. Ultra high resolution, sharp textures, studio quality, hyper-realistic toy photography, focusing on the aesthetics of collectible models.`,
        thumbnail: 'https://picsum.photos/seed/trending-3d-model-2025/200'
      },
      {
        id: 'trending-trend-bong-bong',
        name: 'Trend Bong Bóng',
        prompt: `Create a hyper-realistic 3D caricature balloon portrait based on the person in the uploaded photo. **Critical instructions:** 1. **Preserve Identity:** You must preserve the exact facial features and hair of the person from the uploaded photo with photorealistic accuracy, ensuring they are perfectly recognizable. The hair should appear natural on the balloon head. 2. **Balloon Head:** The head should be transformed into a round, inflated balloon with big puffed cheeks and puckered lips, as if blowing air. 3. **No Body:** Completely remove the body. 4. **Balloon Knot & Ribbon:** The neck must be replaced by a tied balloon knot, from which a soft, red silk ribbon hangs down. 5. **Texture & Lighting:** The skin must be glossy and smooth, with subtle highlights to create a latex balloon texture. The scene must have professional studio lighting and a clean, neutral background. The final image must be highly detailed, blending a cartoonish, playful, and humorous style with photorealistic rendering.`,
        thumbnail: 'https://picsum.photos/seed/trending-trend-bong-bong/200'
      }
    ]
  },
  {
    id: 'trung-thu-2025',
    name: 'Trung thu 2025',
    themes: [
      createTheme('Ngắm trăng bên lồng đèn', 'trung-thu-2025'),
      createTheme('Thưởng trà, bánh Trung thu', 'trung-thu-2025'),
      createTheme('Tản bộ trên phố lồng đèn', 'trung-thu-2025'),
      createTheme('Giữa không khí múa lân rộn ràng', 'trung-thu-2025'),
      createTheme('Check-in hiện đại cùng bánh Trung thu', 'trung-thu-2025'),
      createTheme('Bên khung cửa có ánh trăng', 'trung-thu-2025'),
      {
        id: 'trung-thu-2025-hoa-than-chi-hang-chu-cuoi',
        name: 'Hóa thân chị Hằng – chú Cuội',
        prompt: `Create a joyful and heartwarming scene set during a vibrant Mid-Autumn Festival celebration where the main character(s) are happily playing with a group of adorable children. The children are holding colorful lanterns and enjoying the festive atmosphere. **Critically, you must preserve the exact facial features and identity of the person(s) from the uploaded photo with photorealistic accuracy.** The final image should be hyper-realistic and high-resolution, with a bright, clear, and innocent color palette. The lighting should be soft and magical, seamlessly blending the person's face into this enchanting scene that authentically captures the spirit of 'Tết Trung Thu'.`,
        thumbnail: 'https://picsum.photos/seed/hoa-than-chi-hang-chu-cuoi/200'
      },
      createTheme('Đêm Trung thu lãng mạn đôi lứa', 'trung-thu-2025'),
      createTheme('Áo dài giữa sắc đèn lồng', 'trung-thu-2025'),
      createTheme('Chân dung minimal dưới ánh trăng', 'trung-thu-2025'),
    ]
  },
  {
    id: 'khoanh-khac-tu-hao',
    name: 'Khoảnh Khắc Tự Hào',
    themes: [
      createTheme('Tung bay tà áo dài và lá cờ đỏ', 'khoanh-khac-tu-hao'),
      createTheme('Nụ cười rạng rỡ bên lá cờ Tổ quốc', 'khoanh-khac-tu-hao'),
      createTheme('Chào cờ trang nghiêm ở Quảng trường Ba Đình', 'khoanh-khac-tu-hao'),
      createTheme('Ánh mắt tự hào hướng về lá cờ', 'khoanh-khac-tu-hao'),
      createTheme('Dạo bước trên con đường cờ hoa rực rỡ', 'khoanh-khac-tu-hao'),
      createTheme('Tự tin check-in tại Cột cờ Lũng Cú', 'khoanh-khac-tu-hao'),
      createTheme('Tay trong tay cùng người lính hải quân', 'khoanh-khac-tu-hao'),
      createTheme('Vẻ đẹp kiêu hãnh trước Lăng Bác', 'khoanh-khac-tu-hao'),
      createTheme('Giọt lệ hạnh phúc khi quốc ca vang lên', 'khoanh-khac-tu-hao'),
      createTheme('Gửi gắm tình yêu nơi cột mốc Trường Sa', 'khoanh-khac-tu-hao'),
      createTheme('Thiếu nữ với bó hoa sen và cờ đỏ', 'khoanh-khac-tu-hao'),
      createTheme('Vẫy cao lá cờ chiến thắng', 'khoanh-khac-tu-hao'),
      createTheme('Gia đình nhỏ bên lá cờ Tổ quốc', 'khoanh-khac-tu-hao'),
      createTheme('Khoảnh khắc đời thường dưới bóng cờ', 'khoanh-khac-tu-hao'),
      createTheme('Áo dài đỏ tung bay trên phố cổ', 'khoanh-khac-tu-hao'),
    ]
  },
  {
    id: 'bieu-tuong-van-hoa',
    name: 'Biểu tượng & Văn hóa',
    themes: [
      createTheme('Áo dài đỏ sao vàng', 'bieu-tuong-van-hoa'),
      createTheme('Bên cạnh hoa sen hồng', 'bieu-tuong-van-hoa'),
      createTheme('Họa tiết trống đồng Đông Sơn', 'bieu-tuong-van-hoa'),
      createTheme('Đội nón lá truyền thống', 'bieu-tuong-van-hoa'),
      createTheme('Vẽ mặt hình cờ đỏ sao vàng', 'bieu-tuong-van-hoa'),
      createTheme('Cầm cành đào ngày Tết', 'bieu-tuong-van-hoa'),
      createTheme('Bên cạnh cây mai vàng', 'bieu-tuong-van-hoa'),
      createTheme('Áo dài trắng nữ sinh', 'bieu-tuong-van-hoa'),
      createTheme('Múa lân sư rồng', 'bieu-tuong-van-hoa'),
      createTheme('Chơi đàn T\'rưng', 'bieu-tuong-van-hoa'),
      createTheme('Thả đèn hoa đăng', 'bieu-tuong-van-hoa'),
      createTheme('Nghệ nhân gốm Bát Tràng', 'bieu-tuong-van-hoa'),
      createTheme('Vẻ đẹp thiếu nữ bên khung cửi', 'bieu-tuong-van-hoa'),
      createTheme('Cầm lồng đèn Trung Thu', 'bieu-tuong-van-hoa'),
      createTheme('Nghệ thuật múa rối nước', 'bieu-tuong-van-hoa'),
    ]
  },
  {
    id: 'lich-su-anh-hung',
    name: 'Lịch sử & Anh hùng',
    themes: [
      createTheme('Chiến sĩ Điện Biên Phủ', 'lich-su-anh-hung'),
      createTheme('Nữ tướng Hai Bà Trưng', 'lich-su-anh-hung'),
      createTheme('Vua Hùng dựng nước', 'lich-su-anh-hung'),
      createTheme('Thanh niên xung phong', 'lich-su-anh-hung'),
      createTheme('Chiến sĩ hải quân Trường Sa', 'lich-su-anh-hung'),
      createTheme('Anh bộ đội Cụ Hồ', 'lich-su-anh-hung'),
      createTheme('Du kích trong rừng', 'lich-su-anh-hung'),
      createTheme('Cô gái mở đường', 'lich-su-anh-hung'),
      createTheme('Tinh thần bất khuất thời Trần', 'lich-su-anh-hung'),
      createTheme('Hình tượng Thánh Gióng', 'lich-su-anh-hung'),
      createTheme('Nữ anh hùng Võ Thị Sáu', 'lich-su-anh-hung'),
      createTheme('Chân dung thời bao cấp', 'lich-su-anh-hung'),
      createTheme('Chiến sĩ giải phóng quân', 'lich-su-anh-hung'),
      createTheme('Dân công hỏa tuyến', 'lich-su-anh-hung'),
      createTheme('Người lính biên phòng', 'lich-su-anh-hung'),
    ]
  },
  {
    id: 'phong-canh-dia-danh',
    name: 'Phong cảnh & Địa danh',
    themes: [
      createTheme('Giữa ruộng bậc thang Sapa', 'phong-canh-dia-danh'),
      createTheme('Trên thuyền ở Vịnh Hạ Long', 'phong-canh-dia-danh'),
      createTheme('Đứng trước Hồ Gươm, cầu Thê Húc', 'phong-canh-dia-danh'),
      createTheme('Khám phá hang Sơn Đoòng', 'phong-canh-dia-danh'),
      createTheme('Cánh đồng lúa chín vàng', 'phong-canh-dia-danh'),
      createTheme('Vẻ đẹp cao nguyên đá Hà Giang', 'phong-canh-dia-danh'),
      createTheme('Hoàng hôn trên phá Tam Giang', 'phong-canh-dia-danh'),
      createTheme('Biển xanh Phú Quốc', 'phong-canh-dia-danh'),
      createTheme('Chèo thuyền ở Tràng An, Ninh Bình', 'phong-canh-dia-danh'),
      createTheme('Đi giữa phố cổ Hội An', 'phong-canh-dia-danh'),
      createTheme('Cột cờ Lũng Cú', 'phong-canh-dia-danh'),
      createTheme('Dinh Độc Lập lịch sử', 'phong-canh-dia-danh'),
      createTheme('Nhà thờ Đức Bà Sài Gòn', 'phong-canh-dia-danh'),
      createTheme('Bên dòng sông Mekong', 'phong-canh-dia-danh'),
      createTheme('Vẻ đẹp Đà Lạt mộng mơ', 'phong-canh-dia-danh'),
    ]
  },
  {
    id: 'am-thuc-doi-song',
    name: 'Ẩm thực & Đời sống',
    themes: [
      createTheme('Thưởng thức Phở Hà Nội', 'am-thuc-doi-song'),
      createTheme('Uống cà phê sữa đá Sài Gòn', 'am-thuc-doi-song'),
      createTheme('Gói bánh chưng ngày Tết', 'am-thuc-doi-song'),
      createTheme('Gánh hàng rong phố cổ', 'am-thuc-doi-song'),
      createTheme('Ăn bánh mì vỉa hè', 'am-thuc-doi-song'),
      createTheme('Không khí chợ nổi Cái Răng', 'am-thuc-doi-song'),
      createTheme('Làm nón lá', 'am-thuc-doi-song'),
      createTheme('Người nông dân trên đồng', 'am-thuc-doi-song'),
      createTheme('Ngư dân kéo lưới', 'am-thuc-doi-song'),
      createTheme('Gia đình sum vầy', 'am-thuc-doi-song'),
      createTheme('Bên xe máy Dream huyền thoại', 'am-thuc-doi-song'),
      createTheme('Uống trà đá vỉa hè', 'am-thuc-doi-song'),
      createTheme('Bữa cơm gia đình Việt', 'am-thuc-doi-song'),
      createTheme('Làm muối ở Hòn Khói', 'am-thuc-doi-song'),
      createTheme('Trồng cây cà phê Tây Nguyên', 'am-thuc-doi-song'),
    ]
  },
  {
    id: 'nghe-thuat-sang-tao',
    name: 'Nghệ thuật & Sáng tạo',
    themes: [
      createTheme('Phong cách tranh cổ động', 'nghe-thuat-sang-tao'),
      createTheme('Phong cách tranh sơn mài', 'nghe-thuat-sang-tao'),
      createTheme('Họa tiết gốm Chu Đậu', 'nghe-thuat-sang-tao'),
      createTheme('Nét vẽ tranh Đông Hồ', 'nghe-thuat-sang-tao'),
      createTheme('Ánh sáng từ đèn lồng Hội An', 'nghe-thuat-sang-tao'),
      createTheme('Nghệ thuật thư pháp', 'nghe-thuat-sang-tao'),
      createTheme('Họa tiết thổ cẩm Tây Bắc', 'nghe-thuat-sang-tao'),
      createTheme('Phong cách ảnh phim xưa', 'nghe-thuat-sang-tao'),
      createTheme('Nghệ thuật điêu khắc Chăm Pa', 'nghe-thuat-sang-tao'),
      createTheme('Vẻ đẹp tranh lụa', 'nghe-thuat-sang-tao'),
      createTheme('Phong cách Cyberpunk Sài Gòn', 'nghe-thuat-sang-tao'),
      createTheme('Hòa mình vào dải ngân hà', 'nghe-thuat-sang-tao'),
      createTheme('Họa tiết rồng thời Lý', 'nghe-thuat-sang-tao'),
      createTheme('Ánh sáng neon hiện đại', 'nghe-thuat-sang-tao'),
      createTheme('Phong cách Low-poly', 'nghe-thuat-sang-tao'),
    ]
  },
  {
    id: 'the-thao-tu-hao',
    name: 'Thể thao & Tự hào',
    themes: [
      createTheme('Cổ động viên bóng đá cuồng nhiệt', 'the-thao-tu-hao'),
      createTheme('Khoảnh khắc nâng cúp vàng', 'the-thao-tu-hao'),
      createTheme('Vận động viên SEA Games', 'the-thao-tu-hao'),
      createTheme('Tay đua xe đạp', 'the-thao-tu-hao'),
      createTheme('Võ sĩ Vovinam', 'the-thao-tu-hao'),
      createTheme('Cầu thủ bóng đá chuyên nghiệp', 'the-thao-tu-hao'),
      createTheme('Niềm vui chiến thắng', 'the-thao-tu-hao'),
      createTheme('Đi bão sau trận thắng', 'the-thao-tu-hao'),
      createTheme('Vận động viên điền kinh', 'the-thao-tu-hao'),
      createTheme('Tinh thần thể thao Olympic', 'the-thao-tu-hao'),
      createTheme('Tay vợt cầu lông', 'the-thao-tu-hao'),
      createTheme('Nữ vận động viên wushu', 'the-thao-tu-hao'),
      createTheme('Cờ đỏ trên khán đài', 'the-thao-tu-hao'),
      createTheme('Vận động viên bơi lội', 'the-thao-tu-hao'),
      createTheme('Huy chương vàng tự hào', 'the-thao-tu-hao'),
    ]
  },
  {
    id: 'tuong-lai-khoa-hoc',
    name: 'Tương lai & Khoa học',
    themes: [
      createTheme('Phi hành gia cắm cờ Việt Nam', 'tuong-lai-khoa-hoc'),
      createTheme('Nhà khoa học trong phòng thí nghiệm', 'tuong-lai-khoa-hoc'),
      createTheme('Kỹ sư công nghệ tương lai', 'tuong-lai-khoa-hoc'),
      createTheme('Thành phố thông minh', 'tuong-lai-khoa-hoc'),
      createTheme('Nông nghiệp công nghệ cao', 'tuong-lai-khoa-hoc'),
      createTheme('Bác sĩ robot y tế', 'tuong-lai-khoa-hoc'),
      createTheme('Năng lượng mặt trời Việt Nam', 'tuong-lai-khoa-hoc'),
      createTheme('Khám phá đại dương', 'tuong-lai-khoa-hoc'),
      createTheme('Chuyên gia trí tuệ nhân tạo', 'tuong-lai-khoa-hoc'),
      createTheme('Kiến trúc sư công trình xanh', 'tuong-lai-khoa-hoc'),
    ]
  },
];
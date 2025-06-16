# 🛍️ Shopee E-Commerce Feature Overview

Dưới đây là bản mô tả chi tiết các schema phục vụ các tính năng nổi bật của Shopee, để định hướng xây dựng mô hình dữ liệu trong MongoDB.

---

## ✅ FlashSale.js

**Mục đích:** Quản lý các chương trình giảm giá chớp nhoáng.
**Chức năng:**

- Gắn sản phẩm vào một đợt sale cụ thể (`product`)
- Áp dụng giá khuyến mãi (`discountPrice`) trong khoảng thời gian `startAt → endAt`
- Giới hạn số lượng (stock) được bán trong chương trình

---

## ✅ Voucher.js

**Mục đích:** Tạo và quản lý các mã giảm giá.
**Chức năng:**

- Hỗ trợ giảm giá theo **phần trăm** hoặc **số tiền cố định** (`discountType`)
- Chỉ áp dụng khi đơn hàng đạt `minOrderValue`
- Có ngày hết hạn `expiryDate`
- Track người dùng đã sử dụng thông qua `usedBy`

---

## ✅ Order.js (đã mở rộng)

**Mục đích:** Quản lý đơn hàng & vận chuyển.
**Chức năng:**

- Lưu **trạng thái thanh toán** (`paymentStatus`) và **phương thức** (`paymentMethod`)
- Ghi nhận mã giao dịch `transactionId`
- Tracking số vận đơn `trackingNumber`
- Theo dõi **trạng thái vận chuyển** (`shippingStatus`) như: `Đang xử lý`, `Đang giao`, `Hoàn tất`

---

## ✅ Product.js (đã mở rộng)

**Mục đích:** Hỗ trợ phân loại và tồn kho nâng cao.
**Chức năng:**

- Danh sách biến thể (`variations`) như: màu sắc, kích cỡ
- Quản lý tồn kho theo SKU với `stockByVariation`

---

## ✅ Conversation.js

**Mục đích:** Hệ thống chat giữa người dùng và shop.
**Chức năng:**

- Gửi/nhận tin nhắn giữa người dùng và nhà bán hàng
- Lưu trữ tin nhắn (`messages`) theo thời gian
- Có thể mở rộng thêm: **đính kèm ảnh**, **trạng thái đã đọc**

---

## ✅ Wishlist.js

**Mục đích:** Quản lý danh sách sản phẩm yêu thích của người dùng.
**Chức năng:**

- Cho phép người dùng **lưu sản phẩm** để xem lại sau
- Có thể mở rộng để **gợi ý sản phẩm** theo lịch sử wishlist

---

## ✅ ReturnRequest.js

**Mục đích:** Xử lý yêu cầu đổi/trả hàng.
**Chức năng:**

- Gắn với **đơn hàng** và **sản phẩm** cụ thể
- Ghi lại lý do và **trạng thái** xử lý: `pending`, `approved`, `rejected`, `refunded`
- Tính **số tiền hoàn lại** nếu được duyệt

---

## ✅ Mở rộng User.js để hỗ trợ admin

**Mục đích:** Phân quyền & tạo giao diện quản trị cho admin.
**Chức năng:**

- Phân quyền thông qua trường `role: "admin"`
- Có thể mở rộng dashboard để:

  - Xem tổng doanh thu
  - Thống kê đơn hàng đang xử lý
  - Quản lý người dùng, shop, sản phẩm

---

👉 Nếu muốn mở rộng thêm các tính năng như **loyalty points**, **gợi ý sản phẩm bằng AI**, **rating shop**, v.v... thì có thể định nghĩa thêm schema phù hợp.

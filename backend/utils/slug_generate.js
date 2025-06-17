import slugify from 'slugify';

/**
 * Generate a slug from a given string
 * @param {string} text - Input text to slugify
 * @returns {string} Slugified string
 */
export const generateSlug = (text) => {
    return slugify(text, {
        lower: true,        // Chuyển về chữ thường
        strict: true,       // Loại bỏ các ký tự đặc biệt
        trim: true,         // Loại bỏ khoảng trắng thừa
        locale: 'vi',       // Nếu muốn hỗ trợ tiếng Việt
    });
};

import axios from 'axios';

// Thay thế các giá trị này bằng thông tin từ Cloudinary của bạn
const CLOUDINARY_CLOUD_NAME = 'dojsli1ux'; 
const CLOUDINARY_UPLOAD_PRESET = 'beauty_home'; 

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  try {
    // Sử dụng axios trực tiếp để tránh các interceptor gắn token của hệ thống
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data.secure_url;
  } catch (error: any) {
    console.error('Cloudinary Error Detail:', error.response?.data);
    const serverMessage = error.response?.data?.error?.message || '';
    throw new Error(`Cloudinary: ${serverMessage || 'Lỗi không xác định'}`);
  }
};

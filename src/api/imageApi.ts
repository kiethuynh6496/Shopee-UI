import axios from 'axios';

const imageApi = {
  async uploadImage(formData: FormData) {
    return await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
      formData
    );
  },
};

export default imageApi;

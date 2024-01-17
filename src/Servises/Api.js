import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41672689-44178774ec53cc756c9a63eac';

export const fetchImages = async (searchQuery, page) => {
  const params = new URLSearchParams({
    q: searchQuery,
    page,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });

  const response = await axios.get(`${BASE_URL}?${params}`);
  return response.data;
};

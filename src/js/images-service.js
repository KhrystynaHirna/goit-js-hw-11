import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '25789368-636c5d004c25f97cc91a0f5f4';

const per_page = 40;
const parameters = `lang=en&image_type=photo&orientation=horizontal&safesearch=true&per_page=${per_page}`;

export const getImages = async (query, page) => {
  try {
  const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${query}&${parameters}&page=${page}`);
  return await response.data;
  } catch (error) {
    console.log(error);
  }
}

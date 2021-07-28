import axios from 'axios';

const baseUrl = '/api/v1';

const getByDate = async (category, range, date, time) => {
  const getUrl = `${baseUrl}/${category}/?range=${range}&date=${date}&time=${time}`;
  const response = await axios.get(getUrl);
  return response;
};

export default { getByDate };
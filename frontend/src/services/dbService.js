import axios from 'axios';

const baseUrl = '/api/v1';

const getByDate = async (date, time) => {
  const getUrl = `${baseUrl}/arrived/${date}/${time}`;
  const response = await axios.get(getUrl);
  return response;
};

export default { getByDate };
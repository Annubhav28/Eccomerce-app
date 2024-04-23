import axios from 'axios';

export const fetchData = async () => {
  try {
    const response = await axios.get("https://api.escuelajs.co/api/v1/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
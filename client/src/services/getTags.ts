import axios from 'axios';

export async function getTags() {
  try {
    const tagsData = await axios.get('http://localhost:5000/api/tags');
    return tagsData.data;
  } catch (error) {
    return error;
  }
}

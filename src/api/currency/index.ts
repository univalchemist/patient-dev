import Project from 'constants/project';
import { client } from 'api/api-client';

const CurrencyAPI = {
  getAll: async () => {
    const { data } = await client.get(`${Project.apis.v1}/currency`);
    return data;
  },
};

export default CurrencyAPI;

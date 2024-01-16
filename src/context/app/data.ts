import { AxiosResponse } from 'axios';
import { TAppContext } from 'context/app/types';

export const createInitialState = (): TAppContext => ({
  routeName: '',
  user: null,
  influencer: null,
  currency: 'CHF',
  currencyRate: {
    usd: 1,
    eur: 1,
  },
  login: async (_x) => {},
  setRouteName: () => {},
  logout: async () => {
    const axiosObj = {} as unknown as AxiosResponse<any, any>;
    return axiosObj;
  },
  role: 'CLIENT',
  initialLoading: true,
  showMobileMenu: false,
  handleMobileMenu: () => {},
  handleCurrencyChange: () => {},
  handleInfluencer: () => {},
  getMeData: async () => {},
});

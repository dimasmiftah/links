import { CONTRACT_SPAN_DAYS, TODAY } from '../constants/data.js';

export const addDays = (date, days) => {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const getExpiration = (published_date) => {
  const publishedDate = new Date(published_date);
  const expiredDate = addDays(publishedDate, CONTRACT_SPAN_DAYS);
  return TODAY.getTime() > expiredDate.getTime();
};

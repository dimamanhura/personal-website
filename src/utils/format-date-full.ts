import moment from 'moment';

export const formatDateFull = (date: string) => {
  return moment(date).format('MMMM YYYY');
};
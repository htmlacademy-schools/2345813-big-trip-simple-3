import dayjs from 'dayjs';

export const formatDate = (date, format) => dayjs(date).format(format);

export const formatNumber = (value, locale = 'en') => value.toLocaleString(locale);

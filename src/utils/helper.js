export const truncateText = (text, maxLength) => {
  if (maxLength < 0) {
    return text;
  }
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

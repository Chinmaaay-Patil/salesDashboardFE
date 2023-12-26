export const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = `${today.getMonth() + 1}`.padStart(2, '0'); // Months are 0-indexed
  const day = `${today.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

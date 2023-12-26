export function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function calculateDateRange(selectedOption) {
  const currentDate = new Date();
  const resultDate = new Date(currentDate);
  switch (selectedOption) {
    case 'month':
      resultDate.setMonth(resultDate.getMonth() - 1);
      return {
        fromDate: formatDate(resultDate),
        toDate: formatDate(currentDate)
      };

    case 'threeMonth':
      resultDate.setMonth(resultDate.getMonth() - 3);

      return {
        fromDate: formatDate(resultDate),
        toDate: formatDate(currentDate)
      };

    case 'sixMonth':
      resultDate.setMonth(resultDate.getMonth() - 6);

      return {
        fromDate: formatDate(resultDate),
        toDate: formatDate(currentDate)
      };

    case 'year':
      resultDate.setMonth(resultDate.getMonth() - 12);

      return {
        fromDate: formatDate(resultDate),
        toDate: formatDate(currentDate)
      };

    default:
      return null;
  }
}

// Example usage with the status array:

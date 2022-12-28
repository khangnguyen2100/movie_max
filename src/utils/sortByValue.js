export function sortByValue(array = [],key = '', type = 'desc') {
  return [...array].sort((a, b) => b?.[key] - a?.[key]);
}
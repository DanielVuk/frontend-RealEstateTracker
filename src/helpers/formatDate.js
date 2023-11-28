export const formatDate = (
  dateString,
  options = { year: "numeric", month: "2-digit", day: "2-digit" }
) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

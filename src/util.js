export const sortData = (data) => {
  return [...data].sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

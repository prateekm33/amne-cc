export function formatSearchData(data = {}) {
  const arr = [];
  for (let item in data) {
    arr.push(data[item]);
  }

  return arr;
}
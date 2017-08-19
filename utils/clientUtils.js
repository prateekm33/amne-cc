export function formatSearchData(data) {
  data = data || {};
  const arr = [];
  for (let item in data) {
    arr.push(data[item]);
  }

  return arr;
}

export function convertMetersToMiles(m) {
  return Math.round(m / 0.000621371);
}
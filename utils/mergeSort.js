function mergeSort(arr, prop) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), prop);
  const right = mergeSort(arr.slice(mid), prop);

  const temp = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i][prop] > right[j][prop]) temp.push(right[j]) && j++;
    else temp.push(left[i]) && i++;
  }

  if (i < left.length) return temp.concat(left.slice(i));
  else return temp.concat(right.slice(j));
}

module.exports = mergeSort;
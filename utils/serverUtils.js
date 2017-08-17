module.exports.genQueryParams = qps => {
  let str = '';
  for (let i in qps) {
    str += `${i}=${qps[i]}&`
  }
  return str.slice(0, -1);
}


class LocationSet {
  constructor(arr) {
    this.items = arr.reduce((a,c) => {
      a[c.id] = c;
      return a;
    }, {});

    return this.items;
  }

  add(el) {

  }

  remove(el) {

  }

  get(el) {

  }
}

module.exports.LocationSet = LocationSet;
const mergeSort = require('./mergeSort');
const config = require('../config/config.json');
const fetch = require('node-fetch');

function genQueryParams(qps) {
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

function pythagorean(a, b) {
  return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
}

function sortByDistance(data, locations) {

  const first = locations[0];
  const second = locations[1];
  const promises = [];
  for (let agency in data) {
    promises.push(saveScoreTo(data[agency], first, second));
  }

  return Promise.all(promises).then(agencies => {
    console.log(agencies);
    return mergeSort(agencies, 'score');
  });

  // const first = locations[0].split(',');
  // const second = locations[1].split(',');
  // const copied = [];

  // for (let place in data) {
  //   let c = data[place];
  //   let loc = c.geometry.location;
  //   let d1 = pythagorean(loc.lat - first[0], loc.lng - first[1]);
  //   let d2 = pythagorean(loc.lat - second[0], loc.lng - second[1]);
  //   c.score = d1 + d2;
  //   copied.push(c);
  // }

  // return mergeSort(copied, 'score');
}

function saveScoreTo(agency, first, second) {
  const agencyLocation = `${agency.geometry.location.lat},${agency.geometry.location.lng}`;
  return fetch(`${config.apis.google.distanceMatrix}?origins=${first}|${second}&destinations=${agencyLocation}&key=${config.apis.google.key}`)
    .then(res => res.json())
    .then(res => {
      if (res.status !== 'OK') {
        throw new Error('Distance Matrix API error for ', agency);
        return;
      }

      agency.score = res.rows.reduce((sum, row) => sum + row.elements[0].distance.value, 0);
      return agency;
    })
}

module.exports = {
  genQueryParams,
  LocationSet,
  pythagorean,
  sortByDistance
}
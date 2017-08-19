const config = require('../../../config/config.json');
const utils = require('../../../utils/serverUtils');
const fetch = require('node-fetch');

module.exports.fetchResults = (req, res) => {
  const locations = req.body.addresses;
  const r = req.body.radius;
  Promise.all(locations.map(loc => queryResultsFor(loc, r)))
    .then(results => {
      let allData = results.reduce((a,c) => a.concat(c.results), []);
      allData = new utils.LocationSet(allData);
      allData = utils.sortByDistance(allData, locations);
      res.send(allData);
    })
    .catch(err => {
      console.log("[ERROR] ", err);
      res.status(404).end();
    });
}


function queryResultsFor(location, radius) {
  const url = config.apis.google.nearby_search;
  const qps = utils.genQueryParams({
    location,
    radius,
    types : 'real_estate_agency',
    key : config.apis.google.key
  });

  return fetch(`${url}?${qps}`)
    .then(res => res.json());

}
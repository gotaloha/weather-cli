const axios = require('axios');

module.exports = async (location) => {
  const results = await axios({
    method: 'get',
    url: 'https://www.metaweather.com/api/location/2452078/',
    params: {
      format: 'json'
    },
  })

  return results;
}

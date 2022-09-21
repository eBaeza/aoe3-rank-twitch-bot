var axios = require("axios");

var config = {
  method: 'post',
  url: 'https://api.ageofempires.com/api/ageiii/Leaderboard',
  data: {
    matchType: "1",
    region: "7",
    searchPlayer: process.env.USER_ID
  }
};

async function leaderboarSvc(searchValue = '') {
  try {
    if (searchValue.trim()) {
      config.data.searchPlayer = searchValue.trim()
    } else {
      config.data.searchPlayer = process.env.USER_ID
    }
    const resp = await axios(config);
    if (!resp.data) return null
    const [stats] = resp.data.items;
    return stats;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = leaderboarSvc;

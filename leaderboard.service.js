var axios = require("axios");
var data = JSON.stringify({
  region: "7",
  matchType: "1",
  searchPlayer: "Dori",
  page: 1,
  count: 100
});

var config = {
  method: "post",
  url: "https://api.ageofempires.com/api/ageiii/Leaderboard",
  headers: {
    "content-type": "application/json"
  },
  data: data
};

async function leaderboarSvc() {
  try {
    const resp = await axios(config);
    const [stats] = resp.data.items;
    return stats;
  } catch (error) {
    console.log(error);
    return {};
  }
}

module.exports = leaderboarSvc;

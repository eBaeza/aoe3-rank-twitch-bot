var axios = require("axios");

var config = {
  method: 'get',
  url: 'https://aoeiv.net/api/leaderboard',
  params: {
    game: 'aoe3de',
    leaderboard_id: 1,
    start: 1,
    count: 1,
  }
};

async function leaderboarSvc(searchValue = '') {
  try {
    if (searchValue.trim()) {
      config.params.search = searchValue.trim()
      config.params.profile_id = undefined
    } else {
      config.params.profile_id = 3610651
      config.params.search = undefined
    }
    const resp = await axios(config);
    const [stats] = resp.data.leaderboard;
    return stats;
  } catch (error) {
    console.log(error);
    return {};
  }
}

module.exports = leaderboarSvc;

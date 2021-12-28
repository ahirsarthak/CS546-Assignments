const axios = require("axios");
const md5 = require("blueimp-md5");
const publickey = "8be47ed0cf2ecd2e77fa850d8738ced5";
const privatekey = "471f212c43dae4c35ec572885ec6379834b0bb06";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);

let exportedMethods = {
  getCharacbySearchTerm: async (searchTerm) => {
    let searchUrl =
      "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=" +
      searchTerm +
      "&ts=" +
      ts +
      "&apikey=" +
      publickey +
      "&hash=" +
      hash;
    const { data } = await axios.get(searchUrl);

    if (!data.data.results.length)
      throw `No results were found for ${searchTerm}.`;

    return data.data.results;
  },
};

module.exports = exportedMethods;

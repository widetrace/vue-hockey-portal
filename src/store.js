import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import logoUrls from "./assets/dbLogo.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logos: logoUrls,
    prevGame: null,
    nextGame: null,
    news: [
      {
        title: "Title",
        subDescr: "Sub description",
        fullDescr: "Full descr",
        prevIMG: null,
        img: null,
        date: "19.02.2018",
        id: 0
      },
      {
        title: "Title",
        subDescr: "Sub description",
        fullDescr: "Full descr",
        prevIMG: null,
        img: null,
        date: "19.02.2018",
        id: 1
      },
      {
        title: "Title",
        subDescr: "Sub description",
        fullDescr: "Full descr",
        prevIMG: null,
        img: null,
        date: "19.02.2018",
        id: 2
      },
      {
        title: "Title",
        subDescr: "Sub description",
        fullDescr: "Full descr",
        prevIMG: null,
        img: null,
        date: "19.02.2018",
        id: 3
      },
      {
        title: "Title",
        subDescr: "Sub description",
        fullDescr: "Full descr",
        prevIMG: null,
        img: null,
        date: "19.02.2018",
        id: 4
      },
      {
        title: "Title",
        subDescr: "Sub description",
        fullDescr: "Full descr",
        prevIMG: null,
        img: null,
        date: "19.02.2018",
        id: 5
      },
      {
        title: "Title",
        subDescr: "Sub description",
        fullDescr: "Full descr",
        prevIMG: null,
        img: null,
        date: "19.02.2018",
        id: 6
      }
    ]
  },
  mutations: {},
  actions: {
    getGameInfo({ state }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`https://statsapi.web.nhl.com/api/v1/teams/16?expand=team.schedule.${payload}`)
          .then(response => {
            if (payload == "previous") {
              state.prevGame = response.data.teams[0].previousGameSchedule.dates[0].games[0];
            } else if (payload == "next") {
              state.nextGame = response.data.teams[0].nextGameSchedule.dates[0].games[0];
            } else reject();
          })
          .then(() => {
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    }
  }
});

<template>
  <div class="shortGame" v-if="game != null">
    <p v-if="gameStatus == 'previous' ">{{ recapText }}</p>
    <p v-if="gameStatus == 'next' ">{{ dateFormat }} | {{ timeFormat }}</p>
    <p
      v-if="gameStatus == 'next' "
    >{{ game.teams.home.team.name }} will host {{ game.teams.away.team.name }} at {{game.venue.name}}.</p>
    <div class="border logos mb-5">
      <img :src="teamLogo.home" alt="Home team logo" class="m-4" />
      <img :src="teamLogo.away" alt="Away team logo" class="m-4">
    </div>
    <h3 v-if="gameStatus == 'previous'">{{ game.teams.home.score }} : {{ game.teams.away.score }}</h3>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";

export default {
  props: {
    gameStatus: String
  },
  data() {
    return {
      game: null,
      recapText: "",
      teams: null,
      logos: null,
      teamLogo: {
        home: '',
        away: '',
      }
    };
  },
  computed: {
    dateFormat() {
      return moment(this.game.gameDate)
        .format("DD.MM.YY HH:mm:ss")
        .split(" ")[0];
    },
    timeFormat() {
      return moment(this.game.gameDate)
        .format("DD.MM.YY HH:mm:ss")
        .split(" ")[1];
    },
  },
  methods: {
    setVar() {
      if (this.gameStatus == "previous") {
        this.game = this.$store.state.prevGame;
        this.getRecapText();
      } else if (this.gameStatus == "next") {
        this.game = this.$store.state.nextGame;
      }
      this.logos = this.$store.state.logos.data;
      this.setLogoUrl('home')
      this.setLogoUrl('away')
      this.teamLogo.home ? '' : this.teamLogo.home = 'http://www.userlogos.org/files/logos/neoknight037/NHL.png'
      this.teamLogo.away ? '' : this.teamLogo.away = 'http://www.userlogos.org/files/logos/neoknight037/NHL.png'
    },
    getRecapText() {
      axios
        .get(`https://statsapi.web.nhl.com${this.game.content.link}`)
        .then(response => {
          this.recapText = `${response.data.editorial.recap.items[0].headline}.`;
        });
    },
    setLogoUrl(teamSide) {
      this.logos[0].data.forEach(logo => {
        if (logo.mostRecentTeamId == this.game.teams[teamSide].team.id) {
          logo.teams[0].logos.forEach(pic => {
            if (pic.endSeason == "20192020") {
              this.homeTeamLog = pic.url;
              this.teamLogo[teamSide] = pic.url;
            }
          });
        }
      });
    }
  },
  beforeMount() {
    if (this.gameStatus == "previous" && this.$store.state.prevGame) {
      this.setVar();
    } else if (this.gameStatus == "next" && this.$store.state.nextGame) {
      this.setVar();
    } else {
      this.$store.dispatch("getGameInfo", this.gameStatus).then(() => {
        this.setVar();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.logos {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  img {
    height: 100px;
  }
}
</style>
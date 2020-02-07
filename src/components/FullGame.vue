<template>
  <div class="container">
    
    <h2>{{ gameStatus }} game info:</h2>

    <ul class="list-group">
      <li class="list-group-item">
        <p>Date: {{ dateFormat }}</p>
      </li>
      <li class="list-group-item">
        <p>Time: {{ timeFormat }}</p>
      </li>
      <li class="list-group-item">
        <p>Venue: {{ venueName }}</p>
      </li>
    </ul>

    <hr>

    <ul class="list-group teams mb-3">

      <li class="list-group-item teams-li" :class="homeBackground">
        <div class="away">
          
          <h3>Home team</h3>

          <img :src="teamLogo.home">
          
          <ul class="list-group teamStats mt-3">
            <li class="list-group-item">
              <p>{{ homeRecord }}</p>
              <p v-if="gamePrev">Score: {{ this.list.teams.home.score }}</p>
            </li>
          </ul>

        </div>
      </li>

      <li class="list-group-item teams-li" :class="awayBackground">
        <div class="away">
          <h3>Away team</h3>

          <img :src="teamLogo.away">

          <ul class="list-group teamStats mt-3">
            <li class="list-group-item">
              <p>{{ awayRecord }}</p>
              <p v-if="gamePrev">Score: {{ this.list.teams.away.score }}</p>
            </li>
          </ul>

        </div>
      </li>
    </ul>
    
    <div class="boxscore mb-3" v-if="gamePrev">
      <h2>Box score:</h2>
      <ul class="list-group">
        <li
          v-for="score of boxScore"
          :key="score.about.eventId"
          class="list-group-item"
        >
          <p>
            <img :src="getLogo(score.team.id)" class="logoScore">
            {{ score.result.description }}
          </p>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  props: {
    gameStatus: String,
  },
  data() {
    return {
      gamePrev: false,
      listGet: false,
      list: '',
      boxScore: [],
      teamLogo: {
        home: '',
        away: '',
      },
      teamID: {
        home: '',
        away: '',
      },
      logos: '',
    }
  },
  methods: {
    getLogo(id){
      if (id == this.teamID.home) {
        return this.teamLogo.home
      } else if (id == this.teamID.away) {
        return this.teamLogo.away
      }
    },
    setVar() {
      if ( this.gameStatus == 'previous' ) {
          this.list = this.$store.state.prevGame
          this.listGet = true
          this.gamePrev = true
          axios.get(`https://statsapi.web.nhl.com${this.list.link}`)
            .then(response => {
              this.gameReview = response.data.liveData
              this.gameReview.plays.scoringPlays.forEach(play => {
                this.boxScore.push(this.gameReview.plays.allPlays[play])
              })
              // for each /\
            })
      } else if ( this.gameStatus == 'next' ) {
        this.list = this.$store.state.nextGame
        this.listGet = true
      }
      this.logos = this.$store.state.logos.data
      this.setLogoUrl('away')
      this.setLogoUrl('home')
      console.log(this.teamLogo['away'])
    },
    setLogoUrl(teamSide) {
      this.logos[0].data.forEach(logo => {
        if (logo.mostRecentTeamId == this.list.teams[teamSide].team.id) {
          logo.teams[0].logos.forEach(pic => {
            if (pic.endSeason == "20192020") {
              this.teamLogo[teamSide] = pic.url;
              this.teamID[teamSide] = this.list.teams[teamSide].team.id
            }
          });
        }
      });
    }
  },
  computed: {
    dateFormat() {
      if (this.listGet){
        return moment(this.list.gameDate).format('DD.MM.YY HH:mm:ss').split(' ')[0]
      } else return ''
    },
    timeFormat() {
      if (this.listGet){
        return moment(this.list.gameDate).format('DD.MM.YY HH:mm:ss').split(' ')[1]
      } else return ''
    },
    venueName() {
      if (this.listGet) {
        return this.list.venue.name
      } else return ''
    },
    homeRecord() {
      if (this.listGet) {
        return `Record: ${this.list.teams.home.leagueRecord.wins} - ${this.list.teams.home.leagueRecord.losses} - ${this.list.teams.home.leagueRecord.ot}`
      } else return ''
    },
    awayRecord() {
      if (this.listGet) {
        return `Record: ${this.list.teams.away.leagueRecord.wins} - ${this.list.teams.away.leagueRecord.losses} - ${this.list.teams.away.leagueRecord.ot}`
      } else return ''
    },
    awayBackground() {
      if (this.gamePrev) {
        if (this.list.teams.away.score > this.list.teams.home.score) {
          return 'winner'
        } else return 'looser'
      } else return ''
    },
    homeBackground() {
      if (this.gamePrev) {
        if (this.list.teams.home.score > this.list.teams.away.score) {
          return 'winner'
        } else return 'looser'
      } else return ''
    }
  },
  created() {
    if ((this.gameStatus == 'previous') && this.$store.state.prevGame) {
      this.setVar()
    } else if ((this.gameStatus == 'next') && this.$store.state.nextGame) {
      this.setVar()
    } else {
      this.$store.dispatch('getGameInfo', this.gameStatus)
        .then(() => {
          this.setVar()
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.winner, .looser {
  margin-bottom: 0;
}

.looser {
  background-color: rgba(255, 0, 0, 0.796);
}

.winner {
  background-color: rgb(0, 141, 0);
}

h2::first-letter {
  text-transform: uppercase;
}

p {
  text-align: left;
  margin: 0;
}

.logoScore {
  height: 50px
}

.teams {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  
  &-li {
    width: 50%;
    &:first-child {
      border-radius: 5px 0 0 5px; 
    }
    &:last-child {
      border-radius: 0 5px 5px 0; 
    }
    h3 {
      text-align: center;
    }
    img {
      height: 100px;
    }
  }
}

.teamStats {
  li {
    width: 100%;
    border-radius: 5px
  }
}
</style>

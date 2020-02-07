<template>
  <div class="container border">
    <p>{{ list }}</p>

    <img :src="imgURL" alt="">
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TeamInfo',
  props: {
    teamID: null,
  },
  data() {
    return {
      list: '',
      imgURL: require(`../assets/${this.teamID}.png`)
    }
  },
  created() {
    axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${this.teamID}`)
      .then(response => {
        this.list = response.data
      })
  }
}
</script>


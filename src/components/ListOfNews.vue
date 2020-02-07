<template>
  <div class="container border news">
    <h1 class="mt-2">Latest news</h1>
    <ul class="list-group">
      <li
        v-for="news in list.slice(0, 5)"
        :key="news.id"
        class="list-group-item mb-3"
        @click="routeToNews(news.id)"
      >
        <img v-if="news.prevIMG" src="" alt="">
        <h2 class="text-left font-weight-light">{{ news.title }}</h2>
        <p class="text-left"> {{news.date}} </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  created() {
    if (!this.$store.state.news) {
      // get to server
      console.log('no news :c')
    } else {
      this.list = this.$store.state.news
    } 
  }
}
</script>
 

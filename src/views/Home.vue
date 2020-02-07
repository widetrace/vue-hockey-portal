<template>
  <div class="home">
    
    <div class="container column matches">
      <div class="container border next-game">
        <h2>Next game</h2>
        <PartGame gameStatus="next" />
      </div>
      <div class="container border prev-game mt-5">
        <h2>Previous game</h2>
        <PartGame gameStatus="previous" />
      </div>
    </div>

    <div class="container column info">
      <div class="container border news">
        <h1 class="mt-2">Latest news</h1>
        <ul class="list-group">
            <li
              v-for="news in $store.state.news.slice(0, 5)"
              :key="news.id"
              class="list-group-item mb-3"
              @click="routeToNews(news.id)"
            >
              <img v-if="news.prevIMG" src="" alt="">
              <h2 class="text-left font-weight-light">{{ news.title }}</h2>
              <span class="text-left">{{ news.subDescr }}</span>
              <p class="text-left"> {{news.date}} </p>
            </li>
        </ul>
      </div>
      <div class="container border contacts mt-5">
        <ul>
          <a href="#"><li>VK</li></a>
          <a href="#"><li>Of INST</li></a>
          <a href="#"><li>Of Site</li></a>
        </ul>
      </div>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import PartGame from '@/components/PartGame.vue';
import test from '../assets/dbLogo.js'

export default {
  name: 'home',
  components: {
    PartGame, 
  },
  methods: {
    routeToNews(id) {
      this.$router.push({ name: 'newsPost', params: { id } });
    }
  },
  created() {
    // console.log(this.$store.state.logos)
  }
};
</script>

<style lang="scss">
  .next-game, .prev-game, .news, .contacts {
    background: white;
  }
  .home {
    display: flex;
    flex-flow: row nowrap;
    .matches {
      margin-left: 15px;
    }
    .info {
      margin-right: 15px;
    }
  }
  h2 {
    margin-top: 10px;
    transition: 0.5s linear all;
  }
  .news {
    li {
      transition: 0.5s linear all;
      span {
        display: block;
        transition: 0.5s linear all;
      }
      p {
        font-size: 14px;
        margin-bottom: 0;
        transition: 0.5s linear all; 
      }
      &:hover {
        cursor: pointer;
        background-color: black;
        transition: 0.5s linear all;
        p, h2, span {
          color: lighten($color: #212529, $amount: 50);
          transition: 0.5s linear all;
        }
      }
    }
  }
</style>


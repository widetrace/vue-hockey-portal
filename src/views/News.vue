<template>
  <div class="container news-view">
    <PostedNews v-if="postStatus" class="post" />
    <ListOfNews :class="listClass" />
  </div>
</template>

<script>
import PostedNews from '@/components/PostedNews.vue'
import ListOfNews from '@/components/ListOfNews.vue'

export default {
  components: {
    PostedNews, ListOfNews
  },
  data() {
    return {
      postStatus: false,
    }
  },
  computed: {
    listClass() {
      if (this.$route.params.id == 0 || this.$route.params.id) {
        return 'col-2'
      } else return ''
    }
  },
  created() {
    if (this.$route.params.id == 0 || this.$route.params.id) {
      this.postStatus = true
    }
  }
}
</script>

<style lang="scss" scoped>
.news-view {
  display: flex;
  flex-flow: row nowrap;
  div:first-child {
    margin-right: 15px 
  }
}
</style>

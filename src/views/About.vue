<template>
  <transition name="slide-fade">
    <div class="about">
      <h1>This is an about page</h1>
      <TeamInfo teamID=16 />
    </div>
  </transition>
</template>

<script>
import TeamInfo from '@/components/TeamInfo.vue'

export default {
  components: {
    TeamInfo
  }
}
</script>

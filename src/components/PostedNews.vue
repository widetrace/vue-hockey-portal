<template>
  <div class="container border">
    <h2>{{ post.title }}</h2>
    <p>{{ post.fullDescr }}</p>
    <hr>
    <img v-if="post.img" :src="post.img" :alt="post.subDescr">
    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, ipsa velit aliquam quibusdam cupiditate dicta nulla similique molestias quaerat in suscipit sint veniam dignissimos sit expedita quidem? Soluta, aut quisquam!
    Pariatur impedit, sequi perferendis obcaecati facere rem, maiores commodi autem illo similique omnis sint laborum dolores aliquam. In laborum, quisquam laboriosam officiis fugit voluptatem distinctio architecto aliquam! Omnis, doloribus nihil.
    Consequatur culpa quod ipsa eum, atque praesentium eos labore quis vero quidem necessitatibus explicabo aspernatur perferendis aut aliquid corrupti alias nemo placeat ullam quibusdam laborum. Illum voluptatem consequuntur harum fugiat.
    Quasi corrupti nemo provident assumenda ducimus at voluptatem repellendus, ratione excepturi rerum tenetur natus itaque veniam quod, error facilis. Totam quisquam nam officiis esse aperiam ad voluptatum, incidunt dolore similique!
    Distinctio debitis et, molestiae, odio aspernatur architecto repellendus possimus veritatis earum velit qui. Veniam perspiciatis quisquam maiores quis magnam nobis dicta, non culpa adipisci voluptatem, totam quam dolorem cumque tempore!
    Veniam quaerat tempore deserunt iusto dolorem, tenetur iste facilis accusamus? Fugiat nihil itaque laudantium veniam reiciendis molestiae ullam dicta et neque dolorum! Libero laudantium asperiores nemo eaque earum ipsum voluptatum?
    Ipsa doloremque assumenda enim. Nesciunt repellat doloremque ipsum voluptate minima corporis quos veritatis ducimus, quae dicta perspiciatis exercitationem velit non aperiam aliquam rerum praesentium accusantium delectus unde alias deserunt? Quas!
    Fuga nemo ut obcaecati odio perspiciatis facilis nihil necessitatibus quos dolore atque. Eum culpa ipsa, ea nisi rem distinctio numquam repellendus tempore voluptatum, sint quos deleniti, consequuntur ratione alias quo.
    Nemo modi labore delectus voluptatum ullam id, fugit eius eos recusandae consequuntur deserunt mollitia eaque sunt illo tenetur temporibus. Nostrum enim praesentium veritatis molestias dolor eum necessitatibus aliquam esse suscipit!
    Aspernatur rerum nobis dicta sapiente necessitatibus quo, ratione iste, tempora autem, asperiores vero! Sunt, error cupiditate! Facere veritatis expedita qui eveniet, possimus aliquam doloribus architecto repellendus corporis commodi autem rerum!</span>
  </div>
</template>

<script>
export default { 
  created() {
    if (!this.$store.state.news) {
      console.log('no news :c')
      // Get to server 
    } else {
      this.post = this.$store.state.news[this.$route.params.id]
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  background: white;
}
span {
  display: block;
  text-align: justify;
}
</style>

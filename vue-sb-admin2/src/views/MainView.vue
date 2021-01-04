<template>
  <div class="home">

    <!-- HeaderとSideMenu -->
    <HeaderSideMenu/>

  </div>
</template>

<script>
// @ is an alias to /src
import HeaderSideMenu from '@/components/HeaderSideMenu.vue'

export default {
  name: 'Home',
  components: {
    HeaderSideMenu
  }
}
</script>

<template>
  <div>
    <e-header></e-header>
      <router-view/>
    <e-footer></e-footer>
  </div>
</template>

<script>
import header from '../common/header'
import footer from '../common/footer'
// import lstHome from './lst_index'
export default {
  name: 'listing-index',
  components: {
    'e-header': header,
    'e-footer': footer
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>

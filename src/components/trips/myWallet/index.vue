<template>
  <div>
      <router-view/>
      <e-enter-psw />
  </div>
</template>

<script>
import enterPsw from '@/components/trips/myWallet/model/enterpsw'
export default {
  name: 'trips-index',
  components: {
    'e-enterPsw': enterPsw
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

<template>
  <div>
    <div class="becomeHost-header">
      <div class="title">Basics</div>
      <h3>Amenities</h3>
    </div>
    <div class="amenities flex-wrap">
      <ul>
        <li v-for="(item, index) in amenities" :key="index"><el-checkbox>{{item.amenity}}</el-checkbox></li>
      </ul>
    </div>
    <div class="safeAmenities">
      <h3>Safe Amenities</h3>
      <ul>
        <li v-for="(item, index) in SafeAmenities" :key="index"><el-checkbox>{{item.safeAmenity}}</el-checkbox></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      checked: true,
      amenities: {},
      SafeAmenities: {}
    }
  },
  created () {
    this.$get(this.placeUrl + '/place/safe_amenities').then((res) => {
      this.SafeAmenities = res.data.dataList
    })
    this.$get(this.placeUrl + '/place/amenities').then((res) => {
      this.amenities = res.data.dataList
    })
  }
}
</script>

<style lang='scss' scoped>
h3 {
  font-weight: 100;
  font-family: Roboto-Medium;
  font-size: 28px;
  color: #4A4A4A;
  letter-spacing: 1px;
  margin: 0;
  padding-bottom: 30px
}
.safeAmenities {
  margin-top: 50px;
}
ul {
  min-width: 300px;
  li {
    margin-bottom: 15px;
  }
}
@media only screen and (max-width: 800px) {
  .amenities {
    display: block;
  }
}
</style>

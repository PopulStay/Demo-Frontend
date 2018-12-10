<template>
  <div>
    <div class="becomeHost-header">
      <div class="title">Basics</div>
      <h3>Rooms</h3>
    </div>
    <div class="rooms">
      <ul class="rooms-list">
        <li>
          <span class="title">Guests</span>
          <el-input-number v-model="$store.state.host.guestNumber" :min="0" :max="10"></el-input-number>
        </li>
        <li>
          <span class="title">Bedrooms</span>
          <el-input-number v-model="$store.state.host.bedroomNumber" :min="0" :max="10"></el-input-number>
        </li>
        <li>
          <span class="title">Beds</span>
          <el-input-number v-model="$store.state.host.bedNumber" :min="0" :max="10"></el-input-number>
        </li>
        <li>
          <span class="title">Baths</span>
          <el-input-number v-model="$store.state.host.bathNumber" :min="0" :max="10"></el-input-number>
        </li>
      </ul>

      <div class="bedrooms">
        <h3>Bedrooms</h3>
        <ul class="bedrooms-list">
          <li>
            <div class="flex-wrap">
              <div class="title">
                <p>Bedroom 1</p>
                <span>1 double bed, 1 sofa bed</span>
              </div>
              <el-popover placement="bottom" width="240" trigger="click" offset="130">
                <div class="button" slot="reference">Edit</div>

                <div class="popover">
                  <h4>Bedroom 1</h4>
                  <ul class="rooms">
                    <li class="flex-wrap flex-center-between">
                      <span class="r-title">Sofa beds</span>
                      <el-input-number v-model="num1" :min="1" :max="10"></el-input-number>
                    </li>
                    <li class="flex-wrap flex-center-between">
                      <span class="r-title">Sofas</span>
                      <el-input-number v-model="num2" :min="1" :max="10"></el-input-number>
                    </li>
                    <li class="flex-wrap flex-center-between">
                      <span class="r-title">Mattresses</span>
                      <el-input-number v-model="num3" :min="1" :max="10"></el-input-number>
                    </li>
                    <li class="flex-wrap flex-center-between">
                      <span class="r-title">Single beds</span>
                      <el-input-number v-model="num4" :min="1" :max="10"></el-input-number>
                    </li>
                    <li class="flex-wrap flex-center-between">
                      <span class="r-title">Double beds</span>
                      <el-input-number v-model="num5" :min="1" :max="10"></el-input-number>
                    </li>
                    <li class="flex-wrap flex-center-between">
                      <span class="r-title">Loft beds</span>
                      <el-input-number v-model="num6" :min="1" :max="10"></el-input-number>
                    </li>
                  </ul>
                  <div class="bottom flex-wrap flex-center-between">
                    <span>Clear</span>
                    <span class="red">Apply</span>
                  </div>
                </div>
              </el-popover>
            </div>
          </li>
          <li>
             <div  class="flex-wrap">
              <div class="title">
                <p>Bedroom 2</p>
              </div>
              <el-popover placement="bottom" width="240" trigger="click" offset="130">
                <div class="button" slot="reference">Add</div>

                <div class="popover">
                  <h4>Bedroom 2</h4>
                  <ul class="rooms">
                    <li class="flex-wrap flex-center-between">
                      <span class="r-title">Sofa beds</span>
                      <el-input-number v-model="num1" :min="1" :max="10"></el-input-number>
                    </li>
                    <li class="flex-wrap flex-center-between">
                      <span class="r-title">Sofas</span>
                      <el-input-number v-model="num2" :min="1" :max="10"></el-input-number>
                    </li>
                    <li class="flex-wrap flex-center-between">
                      <span class="r-title">Mattresses</span>
                      <el-input-number v-model="num3" :min="1" :max="10"></el-input-number>
                    </li>
                    <li class="flex-wrap flex-center-between">
                      <span class="r-title">Single beds</span>
                      <el-input-number v-model="num4" :min="1" :max="10"></el-input-number>
                    </li>
                    <li class="flex-wrap flex-center-between">
                      <span class="r-title">Double beds</span>
                      <el-input-number v-model="num5" :min="1" :max="10"></el-input-number>
                    </li>
                    <li class="flex-wrap flex-center-between">
                      <span class="r-title">Loft beds</span>
                      <el-input-number v-model="num6" :min="1" :max="10"></el-input-number>
                    </li>
                  </ul>
                  <div class="bottom flex-wrap flex-center-between">
                    <span>Clear</span>
                    <span class="red">Apply</span>
                  </div>
                </div>
              </el-popover>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      num1: 1,
      num2: 1,
      num3: 1,
      num4: 1,
      num5: 1,
      num6: 1
    }
  }
}
</script>

<style lang="scss" scoped>
.rooms {
  .rooms-list {
    li {
      margin-bottom: 10px;
      .title{
        display: inline-block;
        width: 180px;
        font-family: Roboto-Regular;
        font-size: 16px;
        color: #4A4A4A;
        letter-spacing: 0.62px;
      }
    }
  }
  .r-title {
    display: inline-block;
    width: 120px;
    font-family: Roboto-Regular;
    font-size: 16px;
    color: #4A4A4A;
    letter-spacing: 0.62px;
  }
  .bedrooms {
    margin-top: 80px;
    h3 {
      font-weight: 100;
      font-family: Roboto-Medium;
      font-size: 28px;
      color: #4A4A4A;
      letter-spacing: 1px;
      margin: 0;
      padding-bottom: 30px;
    }
    .bedrooms-list {
      li {
        margin-bottom: 30px;
        max-width: 320px;
      }
      .title {
        width: 280px;
        p {
          font-family: Roboto-Medium;
          font-size: 16px;
          color: #4A4A4A;
          letter-spacing: 0.62px;
        }
        span {
          font-family: Roboto-Regular;
          font-size: 14px;
          color: #000000;
          letter-spacing: 0.62px;
          line-height: 19px;
        }
      }
      .button {
        font-family: Roboto-Regular;
        font-size: 16px;
        color: #F4436C;
        letter-spacing: 0.62px;
        height: 30px;
        cursor: pointer;
      }
    }
  }
}
 .popover {
    h4 {
      font-family: Roboto-Medium;
      font-size: 16px;
      color: #F4436C;
      letter-spacing: 0.62px;
      font-weight: 100;
      margin: 0;
      padding-bottom: 15px;
    }
    li {
      margin-bottom: 5px;
    }
    .bottom {
      margin-top: 10px;
      span {
        font-family: Roboto-Regular;
        font-size: 16px;
        color: #4A4A4A;
        padding-right: 20px;
      }
      .red {
        color: #F4436C
      }
    }
  }
</style>

<template>
  <div class="wrap">
    <div class="header">Messages (2 new)</div>
    <ul class="list">
      <li class="flex-wrap flex-center-between" v-for="(item, index) in dataList" :key="index">
        <p :class="index<2 ? 'red' : ''" @click="detailsShow = true">{{item}}</p>
        <i class="icon iconfont icon-mjiantou-copy" @click="detailsShow = true"></i>
      </li>
    </ul>
    <div class="noneList" v-if="!dataList.length">No messages to display.</div>
    <!-- 详情  -->
    <el-dialog  :visible.sync="detailsShow" width="600px" class="detailsWrap" :show-close="false">
      <div slot="title" class="detailsWrap-header flex-wrap flex-center-between">
        <i class="icon iconfont icon-right1" @click="detailsShow = false"></i>
        <i class="icon iconfont icon-delete1" @click="detailsShow = false"></i>
      </div>
      <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h3>
      <span>25 Dec 2018, 21:10:30</span>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et justo sed magna posuere suscipit. Nulla facilisi. Proin sit amet mauris et metus bibendum gravida. Aliquam tempor aliquet dui ac posuere. Maecenas sodales risus ac blandit tempus. Nunc faucibus velit magna, nec ultricies sem pellentesque eu. Sed interdum vitae turpis a varius. Morbi aliquam neque at tempus ornare. Nullam tincidunt diam tellus, a pulvinar dolor luctus ut. Praesent quis pretium nisi.</p>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataList: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'Nunc lobortis purus in orci dapibus, quis consequat nunc fringilla.',
        'Aenean ut nisl pellentesque, mollis quam sed, vehicula odio.',
        'Mauris et fermentum mi. Mauris quis leo accumsan, rutrum augue eu.',
        'Curabitur efficitur vel metus eget tristique.'
      ],
      detailsShow: false
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  border: 1px solid #E6E7E8;
}
.header {
  height: 50px;
  line-height: 50px;
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #4A4A4A;
  letter-spacing: 1px;
  border-bottom: 1px solid #E6E7E8;
  background: #f9f9f9;
  padding: 0 30px;
}
.list {
  li {
    margin: 0 30px;
    padding: 30px 0;
    border-bottom: 1px solid #E6E7E8;
    &:last-child {
       border-bottom: 0
    }
    p {
      font-family: Roboto-Regular;
      font-size: 16px;
      color: #4a4a4a;
      letter-spacing: 1px;
      cursor: pointer;
    }
    .red {
       color: #F4436C;
    }
    .icon-mjiantou-copy {
      font-size: 20px;
      cursor: pointer;
    }
  }
}
.noneList {
  padding: 30px 30px;
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #4A4A4A;
  letter-spacing: 1px;
}
.detailsWrap {
  .detailsWrap-header {
    i {
      font-size: 20px;
      cursor: pointer;
    }
    .icon-delete1 {
      font-size: 28px;
    }
  }
  h3 {
    font-family: Roboto-Regular;
    font-size: 18px;
    color: #F4436C;
    font-weight: 100;
    margin-top: 0;
    margin-bottom: 8px;
  }
  span {
    font-family: Roboto-Regular;
    font-size: 14px;
    color: #4A4A4A;
    letter-spacing: 0;
  }
  p {
    margin-top: 30px;
    font-family: Roboto-Regular;
    font-size: 16px;
    color: #4A4A4A;
    letter-spacing: 0;
  }
}
@media only screen and (max-width: 700px) {
  .header {
    padding: 0 10px;
  }
  .list li {
    margin: 0 10px;
  }
}
</style>

<style>
.detailsWrap .el-dialog__header {
  padding: 20px 30px 20px 25px;
}
.detailsWrap .el-dialog__body {
  padding-top: 0
}
@media only screen and (max-width: 700px) {
  .detailsWrap .el-dialog__header {
    padding: 20px 15px;
  }
}
</style>

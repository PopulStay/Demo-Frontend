<template>
  <div>
    <div class="content" v-show="!success">
      <ul class="Feedback">
        <li class="select-wrap">
          <div class="title">What’s your feedback about?</div>
          <el-select v-model="value11" placeholder="Please select one reason">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"  class="Feedback-select">
            </el-option>
          </el-select>
        </li>
        <li>
          <div class="title">Tell us a little more…</div>
          <textarea cols="30" rows="10"></textarea>
        </li>
        <li>
          <div class="title">Add photos</div>
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </li>
      </ul>
      <div class="r-button button" @click="success = true">Submit</div>
    </div>
    <div class="success" v-show="success">
      <i class="icon iconfont icon-success"></i>
      <h3>Thank you! You’ve successfully submitted.</h3>
      <div class="r-button button" @click="success = false">Back</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imageUrl: '',
      success: false,
      options: [{
        value: '1',
        label: 'Please select'
      }, {
        value: '2',
        label: 'Guest standards'
      }, {
        value: '3',
        label: 'Superguest'
      }, {
        value: '4',
        label: 'My account or profile'
      }, {
        value: '5',
        label: 'Paying for my trip'
      }, {
        value: '6',
        label: 'Reviews'
      }, {
        value: '7',
        label: 'Booking a trip'
      }, {
        value: '8',
        label: 'Finding a place'
      }, {
        value: '9',
        label: 'Pricing'
      }, {
        value: '10',
        label: 'Messaging'
      }, {
        value: '11',
        label: 'Getting help'
      }, {
        value: '12',
        label: 'Other'
      }],
      value11: '1'
    }
  }
}
</script>

<style scoped lang="scss">
textarea {
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  width: 600px;
  height: 150px;
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #4A4A4A;
  letter-spacing: 0;
  padding: 10px 15px;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
}
.success {
  text-align: center;
  .icon-success {
    font-size: 130px;
    color: #F4436C;
  }
  h3 {
    font-family: Roboto-Medium;
    font-size: 28px;
    color: #4A4A4A;
    letter-spacing: 0;
    text-align: center;
    font-weight: 100;
    margin: 30px 0;
  }
  .button {
    display: inline-block;
    width: 180px;
    height: 50px;
    line-height: 50px;
    a {
      width: 100%;
      height: 100%;
    }
  }
}
.Feedback {
  li {
    margin-bottom: 50px;
  }
  .title {
    font-family: Roboto-Medium;
    font-size: 16px;
    color: #4A4A4A;
    letter-spacing: 0;
    margin-bottom: 20px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9!important;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 158px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
.content {
 .button {
    width: 126px;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    margin-top: 50px;
    letter-spacing: 1px;
  }
}
@media only screen and (max-width: 600px) {
  textarea {
    width: 100%;
  }
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9!important;
}
.select-wrap .el-select {
  width: 600px;
}
.select-wrap .el-select input {
  height: 46px;
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #4A4A4A;
}
.select-wrap .el-scrollbar {
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #000000;
}
.Feedback-select {
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #000000;
}
.Feedback-select:hover {
  color: #F4436C;
}
@media only screen and (max-width: 600px) {
  .select-wrap .el-select {
    width: 100%;
  }
}
</style>

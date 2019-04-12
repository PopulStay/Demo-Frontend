<template>
  <div>
    <div class="content" v-show="!success">
      <ul class="Feedback">
        <li class="select-wrap">
          <div class="title">{{$t('message.Whatsyourfeedbackabout')}}</div>
          <el-select v-model="value11" placeholder="Please select one reason">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"  class="Feedback-select">
            </el-option>
          </el-select>
        </li>
        <li>
          <div class="title">{{$t('message.Tellusalittlemore')}}</div>
          <textarea cols="30" rows="10"></textarea>
        </li>
        <li>
          <div class="title">{{$t('message.Addphotos')}}</div>
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </li>
      </ul>
      <div class="r-button button" @click="success = true">{{$t('message.Submit')}}</div>
    </div>
    <div class="success" v-show="success">
      <i class="icon iconfont icon-success"></i>
      <h3>{{$t('message.ThankyouYouvesuccessfullysubmitted')}}</h3>
      <div class="r-button button" @click="success = false">{{$t('message.Back')}}</div>
    </div>
    <p v-if="$i18n.locale != language ? onloading() : null"></p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      language: this.$i18n.locale,
      imageUrl: '',
      success: false,
      options: [{
        value: '1',
        label: this.$t('message.Pleaseselect')
      }, {
        value: '2',
        label: this.$t('message.Gueststandards')
      }, {
        value: '3',
        label: this.$t('message.Superguest')
      }, {
        value: '4',
        label: this.$t('message.Myaccountorprofile')
      }, {
        value: '5',
        label: this.$t('message.Payingformytrip')
      }, {
        value: '6',
        label: this.$t('message.Reviews')
      }, {
        value: '7',
        label: this.$t('message.Bookingatrip')
      }, {
        value: '8',
        label: this.$t('message.Findingaplace')
      }, {
        value: '9',
        label: this.$t('message.Pricing')
      }, {
        value: '10',
        label: this.$t('message.Messaging')
      }, {
        value: '11',
        label: this.$t('message.Gettinghelp')
      }, {
        value: '12',
        label: this.$t('message.Other')
      }],
      value11: '1'
    }
  },
  methods: {
    onloading(){
      this.language = this.$i18n.locale;
      this.options = [{
        value: '1',
        label: this.$t('message.Pleaseselect')
      }, {
        value: '2',
        label: this.$t('message.Gueststandards')
      }, {
        value: '3',
        label: this.$t('message.Superguest')
      }, {
        value: '4',
        label: this.$t('message.Myaccountorprofile')
      }, {
        value: '5',
        label: this.$t('message.Payingformytrip')
      }, {
        value: '6',
        label: this.$t('message.Reviews')
      }, {
        value: '7',
        label: this.$t('message.Bookingatrip')
      }, {
        value: '8',
        label: this.$t('message.Findingaplace')
      }, {
        value: '9',
        label: this.$t('message.Pricing')
      }, {
        value: '10',
        label: this.$t('message.Messaging')
      }, {
        value: '11',
        label: this.$t('message.Gettinghelp')
      }, {
        value: '12',
        label: this.$t('message.Other')
      }]
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

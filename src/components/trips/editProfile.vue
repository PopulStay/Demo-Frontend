<template>
  <div class="wrap">
    <p class="top-h2">Edit profile</p>
    <div class="header">
      <span class="header_Img" v-if="user.image_url" :style="{backgroundImage:'url(' + user.image_url + ')'}" @click="uploadShow = true"></span>
      <span class="icon iconfont icon-touxiang1" @click="uploadShow = true" v-else></span>
      <p>Upload a photo</p>
    </div>
    <ul class="editProfile">
      <li class="flex-wrap flex-align-center">
        <div class="title">First name</div>
        <div>
           <el-input v-model="informationData.first_name" placeholder="Lorem" @blur="bindingVerify('fname', informationData.first_name)"></el-input>
           <p class="warning" v-show="verify.indexOf('fname') !== -1">Please enter the correct name,The name length is between 3 and 20 bits</p>
        </div>
      </li>
      <li class="flex-wrap flex-align-center">
        <div class="title">Last name</div>
        <div>
          <el-input v-model="informationData.last_name" placeholder="Ipsum" @blur="bindingVerify('lname', informationData.last_name)"></el-input>
          <p class="warning" v-show="verify.indexOf('lname') !== -1">Please enter the correct name,The name length is between 3 and 20 bits</p>
        </div>
      </li>
      <li class="flex-wrap flex-align-center">
        <div class="title">Gender</div>
        <div class="editProfile-select">
          <el-select v-model="informationData.gender" placeholder="Male">
            <el-option key="0" label="Male" value="M"></el-option>
            <el-option key="1" label="Female" value="F"></el-option>
          </el-select>
        </div>
      </li>
      <li class="flex-wrap flex-align-center">
        <div class="title">Birth date</div>
        <!-- <div class="editProfile-select Birth">
          <el-select v-model="date.month" placeholder="Month">
          </el-select>
          <el-select v-model="date.day" placeholder="Day">
          </el-select>
          <el-select v-model="date.year" placeholder="Year">
          </el-select>
        </div> -->
        <div class="Birth">{{date.day + '/' + date.month + '/' + date.year}}</div>
      </li>
      <li class="flex-wrap flex-align-center">
        <div class="title">City</div>
        <div>
          <el-input placeholder="e.g. Tokyo, Japan" v-model="informationData.city"></el-input>
        </div>
      </li>
      <li class="flex-wrap flex-align-center">
        <div class="title">Occupation</div>
        <div>
          <el-input v-model="informationData.occupation"></el-input>
        </div>
      </li>
      <!-- <li class="flex-wrap flex-align-center">
        <div class="title">LiveChat</div>
        <div>
          <el-switch
            v-model="liveChat"
            active-color="#F4436C"
            inactive-color="#B1B3B6">
          </el-switch>
        </div>
      </li> -->
      <li class="flex-wrap flex-align-center">
        <div class="title">Self Description</div>
        <div>
          <el-input type="textarea" v-model="informationData.self_description" placeholder="Self Description"></el-input>
        </div>
      </li>
    </ul>
    <div class="r-button save" @click="save">Save</div>
    <el-dialog :visible.sync="uploadShow" width="440px" class="uploadWrap">
      <h2>Set your profile photo</h2>
      <el-upload class="avatar-uploader" :show-file-list="false"
        accept="image/jpeg, image/png"
        action="https://testapi.image.populstay.com/image?dir=populstay_placeimage"
        name="img"
        :on-progress="handleAvatarProgress"
        :on-success="handleAvatarSuccess"
        :on-error="handleAvatarError" v-loading="loading">
          <span class="img avatar" v-if="imageUrl" :style="{backgroundImage:'url(' + imageUrl + ')'}" ></span>
          <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
          <i v-else class="icon iconfont icon-touxiang1"></i>
      </el-upload>
      <p class="red">Upload a photo</p>
      <p>from your computer</p>
      <div class="r-button button" @click="uploadPhoto">Save</div>
    </el-dialog>
    <e-hint></e-hint>
  </div>
</template>

<script>
import hint from '../common/hint'
import utils from '../../utils/utils.js'
export default {
  components: {
    'e-hint': hint
  },
  data () {
    return {
      gender: 'Male',
      liveChat: true,
      uploadShow: false,
      warningShow: false,
      imageUrl: '',
      user: '',
      date: {
        month: '',
        day: '',
        year: ''
      },
      list: {
        month: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        day: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
        year: []
      },
      verify: [],
      streng: '',
      informationData: {
        first_name: '',
        last_name: '',
        self_description: '',
        gender: 'F',
        city: '',
        occupation: ''
      },
      loading: false
    }
  },
  created () {
    // 用户信息
    let user = this.$store.state.userInfo
    this.user = user
    if (user !== null) {
      this.imageUrl = user.image_url
      let date = user.birthdate.split('-')
      this.date = {
        month: date[1],
        day: date[2].split('T')[0],
        year: date[0]
      }
      this.informationData = {
        first_name: user.first_name,
        last_name: user.last_name,
        self_description: user.self_description,
        gender: user.gender,
        city: user.city,
        occupation: user.occupation
      }
    }
    // 生日可选年份
    let year = String(new Date()).split(' ')[3]
    for (let i = 1960; i >= 1960; i++) {
      if (i <= year) {
        this.list.year.unshift(i)
      } else {
        return
      }
    }
  },
  methods: {
    // 图片上传成功
    handleAvatarSuccess (res, file) {
      this.imageUrl = res.data.bigUrl
      this.loading = false
    },
    handleAvatarError (errs, file, fileList) {
      this.loading = false
      this.$alert('Please confirm whether the picture has been updated', 'Warning', {
        confirmButtonText: 'Confirm'
      })
    },
    // 图片上传时
    handleAvatarProgress (event, file, fileList) {
      this.loading = true
    },
    // 点击图片上传
    uploadPhoto (e) {
      if (this.imageUrl !== '') {
        this.$post(this.userUrl + '/user', {
          action: 'updateUserProfilePicture',
          data: {
            user_id: this.user.user_id,
            image_url: this.imageUrl
          }
        }).then((res) => {
          if (res.msg.code === 200) {
            this.user.image_url = res.data.image_url
            this.$store.commit('userUpdate', this.user)
            this.uploadShow = false
            this.$store.commit('hint', {show: true, text: 'Your profile picture has been saved successfully.'})
          } else {
            this.$store.commit('hint', {show: true, text: 'Operation failed, please try later.'})
          }
        })
      } else {
        this.$alert('Please confirm whether the picture has been updated', 'Warning', {
          confirmButtonText: 'Confirm'
        })
      }
    },
    // 保存
    save () {
      if (this.verify.length !== 0) { return false }
      if (this.streng === 'length') { return false }
      this.$post(this.userUrl + '/user', {
        action: 'updateUserGeneralInfo',
        data: {
          user_id: this.user.user_id,
          user_data: this.informationData
        }
      }).then((res) => {
        if (res.msg.code === 200) {
          let data = res.data
          this.user.first_name = data.first_name
          this.user.last_name = data.last_name
          this.user.self_description = data.self_description
          this.user.gender = data.gender
          this.user.city = data.city
          this.user.occupation = data.occupation
          this.$store.commit('userUpdate', this.user)
          this.$store.commit('hint', {show: true, text: 'Operation is successful'})
        } else {
          this.$store.commit('hint', {show: false})
        }
      })
    },
    // 失焦验证
    bindingVerify (type, val) {
      let verify = this.verify
      // console.log(verify)
      // console.log('checkEmail',this.$refs.phoneInput.type)
      console.log('bbbbb?')
      if (type === 'fname') {
        utils.checkName(val) ? verify.push(type) : verify.splice(verify.indexOf(type), 1)
      } else if (type === 'lname') {
        utils.checkName(val) ? verify.push(type) : verify.splice(verify.indexOf(type), 1)
      } else if (type === 'password') {
        let streng = utils.checkPasswordStrength(val)
        streng ? this.streng = streng : this.streng = ''
      }
      this.verify = [...new Set(this.verify)]
    }
  }
}
</script>

<style scoped lang="scss">
$red-color: #F4436C;
.wrap{
  border: 1px solid #e6e7e8;
  // padding: 30px;
}
.top-h2{
  padding: 10px 20px;
  letter-spacing: 1px;
  border-bottom: 1px solid #e6e7e6;
  background: #f8f8f8;
}
.header {
  text-align: center;
  margin-top: 40px;
  // max-width: 800px;
  .icon-touxiang1 {
    font-size: 100px;
    color: #b1b3b6;
    cursor: pointer;
  }
  .header_Img {
    display: inline-block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    cursor: pointer;
  }
  p {
    font-family: Roboto-Regular;
    font-size: 16px;
    color: #4A4A4A;
    letter-spacing: 1px;
    text-align: center;
    margin-top: 10px;
  }
}
.editProfile {
  margin-top: 60px;
  padding: 0 30px;
  li {
    margin-bottom: 20px;
    .title {
      width: 180px;
      font-family: Roboto-Regular;
      font-size: 16px;
      color: #4A4A4A;
      letter-spacing: 0;
      line-height: 19px;
    }
  }
}
.save {
  width: 126px;
  height: 50px;
  line-height: 52px;
  font-family: Roboto-Medium;
  font-size: 16px;
  letter-spacing: 1px;
  margin: 70px 30px 30px;

}
.uploadWrap {
  text-align: center;
  h2 {
    font-family: Roboto-Regular;
    font-size: 30px;
    color: $red-color;
    line-height: 36px;
    margin: 0;
    font-weight: 100;
    text-align: left;
    padding-bottom: 30px;
  }
  i {
    font-size: 160px;
    color: #b1b3b6;
    display: inline-block;
    margin-bottom: 10px;
  }
  .img {
    display: inline-block;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  p {
    font-family: Roboto-Regular;
    font-size: 16px;
    letter-spacing: 1px;
    line-height: 19px;
  }
  .red {
    color: $red-color;
  }
  .button {
    width: 100%;
    height: 50px;
    line-height: 50px;
    margin: 0 auto;
    font-size: 16px;
    margin-top: 50px;
    letter-spacing: 1px;
  }
}
.Birth {
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #4A4A4A;
  cursor: default;
}
.warning {
  font-family: Roboto-Regular;
  color: $red-color!important;
}
@media only screen and (max-width: 1100px) {
  .editProfile {
    li {
      display: block;
      .title {
        margin-bottom: 3px;
      }
    }
  }
}
@media only screen and (max-width: 500px) {
  .editProfile {
    li {
    .editProfile-select {
      div {
        display: block;
        margin-bottom: 5px;
      }
    }
    }
  }
}
</style>

<style>
.editProfile .el-input__inner{
  width: 480px;
  height: 46px;
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #4A4A4A;
  letter-spacing: 0;
}
.editProfile textarea {
  width: 480px;
  height: 100px;
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #4A4A4A;
  letter-spacing: 0;
}
.editProfile-select .el-input__inner{
  width: 100%;
}
.editProfile-select ::-webkit-input-placeholder {
  color:#4a4a4a;
}
.editProfile-select .el-select>.el-input{
  max-width: 120px;
  min-width: 80px;
}
@media only screen and (max-width: 500px) {
  .editProfile .el-input__inner, .editProfile textarea {
    width: 100%;
  }
}
</style>

<template>
  <div>
    <div class="wrap">
      <div class="wrap-header">{{$t('message.VerifyyourIdentityCardPassportDriverslicense')}}</div>
      <div class="content">
        <!-- <div class="list verifyIdentity">
          <div class="item flex-wrap">
            <div class="flex-1 flex-wrap flex-align-center">It needs to be an official government ID.</div>
            <div class="flex-1">
              <el-input placeholder="Full name"></el-input>
            </div>
          </div>
          <div class="item flex-wrap">
            <div class="flex-1 flex-wrap flex-align-center">Issuing country</div>
            <div class="flex-1">
              <el-select v-model="issuing" placeholder="Identity Card" @change="issuingChange">
                <el-option key="0" label="Identity Card" :value="0"></el-option>
                <el-option key="1" label="Passport" :value="1"></el-option>
                <el-option key="2" label="Driver's license" :value="2"></el-option>
              </el-select>
            </div>
          </div>
          <div class="item flex-wrap">
            <div class="flex-1">
              <el-select v-model="states" placeholder="United States">
                <el-option key="United States" label="United States" value="United States"></el-option>
              </el-select>
            </div>
            <div class="flex-1">
              <el-input :placeholder="inputPlaceholder"></el-input>
            </div>
          </div>
        </div> -->
        <div class="identity i_content" v-show="issuing === 0">
            <h3>{{$t('message.Uploadimagesofyouridentitycard')}}</h3>
            <p>{{$t('message.UploadimagesofthefrontandbackofyouridentitycardUnitedStates')}}<br>{{$t('message.Makesureyourimagesarentblurryandthefrontclearlyshowsyourface')}}</p>
            <ul class="flex-wrap flex-content-between">
              <li>
                <el-upload
                  class="avatar-uploader"
                  :action="action"
                  name="img"
                  :on-success="handleAvatarSuccess"
                  :show-file-list="false"
                  :on-progress="handleAvatarProgress"
                  :on-error="handleAvatarError" v-loading="loading">
                  <div v-if="frontImageUrl" class="avatar" :style="{backgroundImage:'url(' + frontImageUrl + ')'}" ></div>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <p>{{$t('message.Addfront')}}</p>
              </li>
              <li>
                <el-upload
                  class="avatar-uploader"
                  :action="action"
                  name="img"
                  :on-success="handleAvatarSuccess2"
                  :show-file-list="false"
                  :on-progress="handleAvatarProgress2"
                  :on-error="handleAvatarError2" v-loading="loading2">
                  <div v-if="handImageUrl" class="avatar" :style="{backgroundImage:'url(' + handImageUrl + ')'}" ></div>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <p>{{$t('message.Handhelddocuments')}}</p>
              </li>
            </ul>
        </div>
        <div class="Passport i_content" v-show="issuing === 1">
            <h3>{{$t('message.UploadimagesofyourPassport')}}</h3>
            <p>{{$t('message.UploadimagesofthefrontandbackofyourpassportUnitedStates')}}<br>{{$t('message.Makesureyourimagesarentblurryandthefrontclearlyshowsyourface')}}</p>
          <ul class="flex-wrap flex-content-between">
              <li>
                <el-upload
                  class="avatar-uploader"
                  :action="action"
                  :show-file-list="false">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <p>{{$t('message.Addphotopage')}}</p>
              </li>
            </ul>
        </div>
        <div class="license i_content" v-show="issuing === 3">
            <h3>{{$t('message.UploadimagesofyourDriverslicense')}}</h3>
            <p>{{$t('message.UploadimagesofthefrontandbackofyourDriverslicenseUnitedStates')}}<br>{{$t('message.Makesureyourimagesarentblurryandthefrontclearlyshowsyourface')}}</p>
            <ul class="flex-wrap flex-content-between">
              <li>
                <el-upload
                  class="avatar-uploader"
                  action=""
                  :show-file-list="false">
                  <div v-if="imageUrl" class="avatar" :style="{backgroundImage:'url(' + imageUrl + ')'}" ></div>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <p>{{$t('message.Addfront')}}</p>
              </li>
              <li>
                <el-upload
                  class="avatar-uploader"
                  action=""
                  :show-file-list="false">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <p>{{$t('message.Addback')}}</p>
              </li>
            </ul>
        </div>
        <div class="r-button button" @click="save">{{$t('message.Save')}}</div>
      </div>
    </div>
    <e-hint></e-hint>
  </div>
</template>

<script>
import hint from '../../common/hint'
export default {
  components: {
    'e-hint': hint
  },
  data () {
    return {
      action:'https://testapi.image.populstay.com/image?dir=populstay_user',
      states: 'United States',
      frontImageUrl: '',
      handImageUrl: '',
      issuing: 0,
      inputPlaceholder: 'Identity card number',
      loading: false,
      loading2: false
    }
  },
  created () {
    console.log(this.$store.state.userInfo)
  },
  methods: {
    issuingChange (e) {
      if (e === 0) {
        this.inputPlaceholder = 'Identity card number'
      } else if (e === 1) {
        this.inputPlaceholder = 'Passport number'
      } else if (e === 2) {
        this.inputPlaceholder = "Driver's license number"
      }
    },
    // 图片上传
    handleAvatarSuccess (res, file) {
      if(res.data){
        this.frontImageUrl = res.data.bigUrl
        this.loading = false
      }else{
        this.handleAvatarError()
      }

    },
    handleAvatarError (errs, file, fileList) {
      this.loading = false
      this.$notify({
        title: this.$t('message.Warning'),
        message: this.$t('message.Pleaseconfirmwhetherthepicturehasbeenupdated'),
        type: 'warning'
      });
    },
    // 图片上传时
    handleAvatarProgress (event, file, fileList) {
      this.loading = true
    },
    handleAvatarSuccess2 (res, file) {
      if(res.data){
        this.handImageUrl = res.data.bigUrl
        this.loading2 = false
      }else{
        this.handleAvatarError2()
      }

    },
    handleAvatarError2 (errs, file, fileList) {
      this.loading2 = false
      this.$notify({
        title: this.$t('message.Warning'),
        message: this.$t('message.Pleaseconfirmwhetherthepicturehasbeenupdated'),
        type: 'warning'
      });
    },
    // 图片上传时
    handleAvatarProgress2 (event, file, fileList) {
      this.loading2 = true
    },
    save () {
      if (this.frontImageUrl === '' || this.handImageUrl === '') return false
      this.$post(this.userUrl + '/user', {
        action: 'updateUserIdentityconfirmationDocument',
        data: {
          user_id: this.$store.state.userInfo.user_id,
          user_identity_confirmation: {
            document_url: this.frontImageUrl,
            document_user_url: this.handImageUrl
          }
        }
      }).then((res) => {
        if (res.msg.code === 200) {
          this.$notify({
            title: this.$t('message.Success'),
            message: this.$t('message.Operationissuccessful'),
            type: 'success'
          });
          let user = this.$store.state.userInfo
          user.user_identity_confirmation.document_verified = "pending"

          this.$router.go(-1)
        }else {

          this.$notify({
            title: this.$t('message.Warning'),
            message: this.$t('message.Operationfailedpleasetrylater'),
            type: 'warning'
          });

        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
$red-color: #F4436C;
.wrap {
  width: 820px;
  border: 1px solid #E6E7E8;
  margin-bottom: 50px;
  .wrap-header {
    height: 46px;
    line-height: 46px;
    padding: 0 30px;
    background: #f9f9f9;
    border-bottom:  1px solid #E6E7E8;
    font-family: Roboto-Regular;
    font-size: 16px;
    color: #4A4A4A;
    letter-spacing: 1px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .content {
    padding: 30px 90px;
    .list {
      font-family: Roboto-Medium;
      font-size: 16px;
      color: #585858;
      letter-spacing: 0;
      .item {
        margin-bottom: 10px;
        div{
          &:first-child {
            margin-right: 40px;
          }
        }
      }
    }
    .i_content {
      padding: 30px 0;
      h3 {
        font-weight: 100;
        margin: 0;
        padding-bottom: 20px;
        font-family: Roboto-Medium;
        font-size: 16px;
        color: #585858;
        letter-spacing: 0;
      }
      p {
        font-family: Roboto-Regular;
        font-size: 16px;
        color: #585858;
        letter-spacing: 0;
      }
      ul {
          margin-top: 40px;
        }
        li {
          margin-right: 30px;
          p {
            text-align: center;
            margin-top: 10px;
          }
        }
    }
  }
}
.avatar-uploader{
  overflow: hidden;
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
  font-size: 40px;
  color: #8c939d;
  width: 300px;
  height: 180px;
  line-height: 180px;
  text-align: center;
}
.avatar {
  width: 300px;
  height: 180px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
.button {
  font-family: Roboto-Medium;
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: 1px;
  height: 50px;
  line-height: 50px;
  margin-bottom: 30px;
  width: 300px;
  margin-top: 50px;
}
@media only screen and (max-width: 900px) {
  .wrap {
    width: 100%;
    .content {
      padding: 30px;
      .i_content {
        ul {
          flex-wrap: wrap;
        }
      }
    }
  }
}
@media only screen and (max-width: 500px) {
  .wrap {
    .wrap-header {
      padding: 0 10px;
    }
    .content {
      padding: 30px 10px;
      .verifyIdentity {
        .item {
          display: block;
          div{
            margin-bottom: 10px;
            &:first-child {
              padding-right: 0;
            }
          }
        }
      }
    }
  }
}
</style>

<style>
.verifyIdentity .el-input__inner {
  font-family: Roboto-Medium;
  font-size: 16px;
  color: #585858;
  letter-spacing: 0;
}
.verifyIdentity .el-select {
  width: 100%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9!important;
}
</style>

<template>
  <div>
    <div class="wrap">
      <div class="wrap-header">{{$route.query.type}} phone number</div>
      <div class="content">
        <div class="step-content" v-if="step === 1">
          <div class="step-input step-input2">
            <el-popover placement="bottom-start" width="300" trigger="manual" v-model="show" popper-class="state-popover">
              <div slot="reference" class="num flex-wrap flex-center-between" @click="show = !show">
                <p>{{first}}</p>
                <i class="icon iconfont" :class="show ? 'icon-arrow-up' : 'icon-54'"></i>
              </div>
              <div class="popover">
                <ul>
                  <li v-for="(item, index) in nation" :key="index" @click="first = item.code; show = false">
                    {{item.name}}
                    <i>{{'(' + item.code + ')'}}</i>
                  </li>
                </ul>
              </div>
            </el-popover>
            <input type="text" ref="input" v-model="data.phone_number" placeholder="Phone Number" class="input">
          </div>
          <div class="step-input step-input2">
            <el-input type="password" placeholder="Password" v-model="data.encrypted_password"></el-input>
          </div>
          <div class="r-button button" @click="next">Next</div>
        </div>
        <div class="step-content3" v-if="step === 2">
          <i class="icon iconfont icon-success"></i>
          <p>Your phone number has been successfully changed.</p>
          <div class="r-button button"><router-link to="security">Back</router-link></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const sha256 = require('js-sha256').sha256
  export default {
    data () {
      return {
        step: 1,
        data: {
          phone_number: '',
          encrypted_password: ''
        },
        canClick: true,
        show: false,
        first: '+86',
        nation: this.$store.state.nation,
      }
    },
    methods: {
      next () {
        if (this.data.encrypted_password === '' || this.data.phone_number === '') return false
        this.$post(this.userUrl + '/user', {
          action: 'updateUserPrivateInfo',
          data: {
            user_id: this.$store.state.userInfo.user_id,
            encrypted_password: sha256(this.data.encrypted_password),
            user_data: {
              phone_number: this.first + this.data.phone_number
            }
          }
        }).then((res) => {
          console.log(res)
          if (res.msg.code === 200) {
            this.step = this.step + 1
            let user = this.$store.state.userInfo
            user.phone_number = this.first + this.data.phone_number
            this.$store.commit('userUpdate', user)
          } else {
            this.$alert('Your password is entered incorrectly', 'Warning', {
              confirmButtonText: 'Confirm'
            })
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  $red-color: #F4436C;
  .wrap {
    width: 100%;
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
    }
    .content {
      padding: 30px;
      .step-content {
        margin: 50px auto;
        width: 400px;
        &>p {
          font-family: Roboto-Regular;
          font-size: 16px;
          color: #4A4A4A;
          letter-spacing: 1px;
          line-height: 22px;
          margin-bottom: 15px;
        }
        .step-input {
          position: relative;
          span {
            position: absolute;
            left: 0px;
            z-index: 9;
            font-family: Roboto-Regular;
            font-size: 16px;
            cursor: pointer;
          }
        }
        .step-input2 {
          margin-bottom: 15px;

          span {
            display: block;
            min-height: 40px;
            margin-right: 10px;
          }
          .num {
            border-right: 1px solid #e6e7e8;
            min-height: 40px;
            cursor: pointer;
            box-sizing: border-box;
            padding: 0 15px 0 10px;
            font-size: 16px;

            p{
              margin-right: 10px;
            }
          }

          input {
            width: 100%;
            border: none;
            height: 46px;
            font-size: 16px;
            color: #4a4a4a;
            box-sizing: border-box;
            padding: 0 25px 0 0;
            &.input{
              padding-left: 120px;
            }
          }

        }
        .button {
          font-family: Roboto-Medium;
          font-size: 16px;
          color: #FFFFFF;
          letter-spacing: 1px;
          height: 50px;
          line-height: 50px;
          margin-top: 40px;
          a {
            display: inline-block;
            width: 100%;
            height: 100%;
          }
        }
      }
      .step-content3 {
        margin: 50px 0;
        text-align: center;
        .icon-success {
          font-size: 80px;
          color: $red-color;
          padding-bottom: 12px;
          display: inline-block;
        }
        p {
          font-family: Roboto-Regular;
          font-size: 16px;
          color: #4A4A4A;
          letter-spacing: 0;
        }
        .button {
          width: 180px;
          font-family: Roboto-Medium;
          font-size: 16px;
          color: #FFFFFF;
          letter-spacing: 1px;
          height: 50px;
          line-height: 50px;
          margin: 35px auto 0 auto;
        }
      }
    }
  }
  .disabled{
    border-color: #ddd;
    cursor: not-allowed;
  }
  @media only screen and (max-width: 900px) {
    .wrap {
      width: 100%;
    }
  }
  @media only screen and (max-width: 500px) {
    .wrap {
      .wrap-header {
        padding: 0 10px;
      }
      .content {
        padding: 30px 10px;
      }
    }
  }
  .popover {
    li {
      letter-spacing: .83px;
      padding: 5px 0;
      cursor: pointer;
      &:hover {
        color: #F4436C
      }
      i {
        font-style: normal;
        margin-left: 5px;
        color: #999;
      }
    }
  }
</style>

<style>
  .step-input .el-input__inner {
    height: 46px;
    font-family: Roboto-Regular;
    font-size: 16px;
    color: #4A4A4A;
  }
</style>

import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

export default new vuex.Store({
  state: {
    show_login: false,
    show_signup: false,
    show_succ: false,
    show_term: false,
    show_verify: false,
    show_newpsw: false,
    show_resetcuss: false,
    show_reset: false,
    show_enterpsw: false,
    show_exportpkey: false,
    screen: false,
    warningShow: false,
    show_state: '',
    userInfo: JSON.parse(localStorage.getItem('user')),
    resetNumber: '',
    hintText: 'Operation failed, please try again',
    hintShow: false,
    appKey:'4f8f22b581b589a3',
    salt:"13753068898",
    secret_key:'ZeTmYSw4chp1VWfTldWtiVjSx2JTEoYh',
    nation: [
      {
        name: 'United States',
        code: '+1'
      },
      {
        name: 'China',
        code: '+86'
      },
      {
        name: 'Japan',
        code: '+81'
      },
      {
        name: 'United Kingdom',
        code: '+44'
      },
      {
        name: 'France',
        code: '+33'
      },
      {
        name: 'Singapore',
        code: '+65'
      }
    ],
    introduceState: false,
    host: {
      hostId:'',
      category: '',
      propertyTypeId:'',
      placeName:'',
      description:'',
      pictures:[],
      weeklyDiscount:'',
      monthlyDiscount:'',
      checkOutTime:'',
      guestNumber: 0,
      bedroomNumber: 0,
      bedNumber: 0,
      bathNumber: 0,
      arrangements:[],
      citycode:'',
      streetLineOne:'',
      streetLineTwo:'',
      needNoticeDay:'',
      needNoticeBeforeTime: '',
      availableCheckinTimeFrom:'',
      availableCheckinTimeTo:'',
      guestMinStayNight:'',
      guestMaxStayNight:'',
      amenities:[],
      safeAmenities:[],
      spaces:[],
      rules:[],
      cancellationPolicyId:'',
      prices:[
        {
          currency:"PPS",
          bestPrice:'',
          minPrice:'',
          maxPrice:'',
          cleanupServiceFee:''
        }
      ],
    },
    becomehostTitle:{
      propertyTypes:'',
      Rooms:'',
      Location:'',
      Amenities:'',
      space:'',
      Requirements:'',
      getReady:'',
      Floating:'',
      Fixed:'',
      ServiceFee:'',
      reservation:'',
      address:'',
      Submit:'',
    },
    becomehostPlaceID:''
  },
  getters: {
    introduceState: state => state.currentMenus
  },
  mutations: {
    userUpdate (state, value) {
      state.userInfo = value
      localStorage.setItem('user', JSON.stringify(value))
    },
    hint (state, value) {
      if (value.text && value.text !== '') state.hintText = value.text
      state.hintShow = value.show || false
    },
    changeIntroduceState (state, value) {
      state.introduceState = value
    }
  }
})

import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import search from '@/components/home/search'
import searchAll from '@/components/home/search_all'

import trips from '@/components/trips/index'
import tripsList from '@/components/trips/myTrips/trips'
import hosts from '@/components/trips/hosts/hosts'
import guests from '@/components/trips//guests/guests'
import messages from '@/components/trips/messages'
import editProfile from '@/components/trips/editProfile'
import security from '@/components/trips/security/security'
import tripsDetails from '@/components/trips/myTrips/trips_details'
import guestsDetails from '@/components/trips/guests/guests_details'
import Addphone from '@/components/trips/security/Addphone'
import ChangePhone from '@/components/trips/security/ChangePhone'
import ChangeEmail from '@/components/trips/security/ChangeEmail'
import VerifyPhone from '@/components/trips/security/VerifyPhone'
import VerifyIdentity from '@/components/trips/security/VerifyIdentity'
import Feedback from '@/components/trips/Feedback'
import invite from '@/components/trips/invite'

import becomeHost from '@/components/becomeHost/index'
import propertyTypes from '@/components/becomeHost/propertyTypes'
import Rooms from '@/components/becomeHost/Rooms'
import Location from '@/components/becomeHost/Location'
import Amenities from '@/components/becomeHost/Amenities'
import Space from '@/components/becomeHost/Space'
import Requirements from '@/components/becomeHost/Requirements'
import getReady from '@/components/becomeHost/getReady'
import myWallet from '@/components/trips/myWallet/index'
import create from '@/components/trips/myWallet/create'
import exportKeystore from '@/components/trips/myWallet/exportKeystore'
import importWallet from '@/components/trips/myWallet/importWallet'
import walletHome from '@/components/trips/myWallet/wallet_home'
import walletDetail from '@/components/trips/myWallet/walletDetail'
import walletTransfer from '@/components/trips/myWallet/walletTransfer'
import reset from '@/components/trips/myWallet/reset'
import Floating from '@/components/becomeHost/Floating'
import Fixed from '@/components/becomeHost/Fixed'
import ServiceFee from '@/components/becomeHost/ServiceFee'
import reservation from '@/components/becomeHost/reservation'
import address from '@/components/becomeHost/address'
import Submit from '@/components/becomeHost/Submit'
import success from '@/components/becomeHost/success'

import listing from '@/components/listing/index'
import lstHome from '@/components/listing/lst_index'
import lstDetail from '@/components/listing/lst_detail'
import paySucc from '@/components/listing/pay_succ'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/trips',
      name: 'trips',
      component: trips,
      children: [
        {
          path: 'tripsList',
          name: 'tripsList',
          component: tripsList
        },
        {
          path: 'hosts',
          name: 'hosts',
          component: hosts
        },
        {
          path: 'guests',
          name: 'guests',
          component: guests
        },
        {
          path: 'messages',
          name: 'messages',
          component: messages
        },
        {
          path: 'editProfile',
          name: 'editProfile',
          component: editProfile
        },
        {
          path: 'security',
          name: 'security',
          component: security
        },
        {
          path: 'ChangePhone',
          name: 'ChangePhone',
          component: ChangePhone
        },
        {
          path: 'ChangeEmail',
          name: 'ChangeEmail',
          component: ChangeEmail
        },
        {
          path: 'VerifyIdentity',
          name: 'VerifyIdentity',
          component: VerifyIdentity
        },
        {
          path: 'VerifyPhone',
          name: 'VerifyPhone',
          component: VerifyPhone
        },
        {
          path: 'trips_details',
          name: 'trips_details',
          component: tripsDetails
        },
        {
          path: 'guests_details',
          name: 'guests_details',
          component: guestsDetails
        },
        {
          path: 'myWallet',
          name: 'myWallet',
          component: myWallet
        },
        {
          path: 'create',
          name: 'create',
          component: create
        },
        {
          path: 'reset',
          name: 'reset',
          component: reset
        },
        {
          path: 'walletHome',
          name: 'walletHome',
          component: walletHome
        },
        {
          path: 'walletDetail',
          name: 'walletDetail',
          component: walletDetail
        },
        {
          path: 'walletTransfer',
          name: 'walletTransfer',
          component: walletTransfer
        },
        {
          path: 'importWallet',
          name: 'importWallet',
          component: importWallet
        },
        {
          path: 'exportKeystore',
          name: 'exportKeystore',
          component: exportKeystore
        },
        {
          path: 'Feedback',
          name: 'Feedback',
          component: Feedback
        },
        {
          path: 'invite',
          name: 'invite',
          component: invite
        }
      ]
    },
    {
      path: '/listing',
      name: 'listing',
      component: listing,
      children: [
        {
          path: 'lstHome',
          name: 'lstHome',
          component: lstHome
        },
        {
          path: 'lstDetail',
          name: 'lstDetail',
          component: lstDetail
        },
        {
          path: 'paySucc',
          name: 'paySucc',
          component: paySucc
        }
      ]
    },
    {
      path: '/Addphone',
      name: 'Addphone',
      component: Addphone
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/searchAll',
      name: 'searchAll',
      component: searchAll
    },
    {
      path: '/becomeHost',
      name: 'becomeHost',
      component: becomeHost,
      children: [
        {
          path: 'propertyTypes',
          name: 'propertyTypes',
          component: propertyTypes
        },
        {
          path: 'Rooms',
          name: 'Rooms',
          component: Rooms
        },
        {
          path: 'Location',
          name: 'Location',
          component: Location
        },
        {
          path: 'Amenities',
          name: 'Amenities',
          component: Amenities
        },
        {
          path: 'Space',
          name: 'space',
          component: Space
        },
        {
          path: 'Requirements',
          name: 'Requirements',
          component: Requirements
        },
        {
          path: 'getReady',
          name: 'getReady',
          component: getReady
        },
        {
          path: 'Floating',
          name: 'Floating',
          component: Floating
        },
        {
          path: 'Fixed',
          name: 'Fixed',
          component: Fixed
        },
        {
          path: 'ServiceFee',
          name: 'ServiceFee',
          component: ServiceFee
        },
        {
          path: 'reservation',
          name: 'reservation',
          component: reservation
        },
        {
          path: 'address',
          name: 'address',
          component: address
        },
        {
          path: 'Submit',
          name: 'Submit',
          component: Submit
        },
        {
          path: 'success',
          name: 'success',
          component: success
        }
      ]
    }
  ]
})

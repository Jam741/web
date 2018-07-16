<template>
  <div class="bg7">

    <title>钱刷刷</title>


    <div>尼古拉斯</div>

  </div>

</template>
<script>
  import {MessageBox} from 'mint-ui';
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';

  const wx = require("weixin-js-sdk");


  //  王兵:
  //    13900000004
  //  王兵:
  export default {
    name: 'login',
    components: {
      TopHeader,
      DialogWindow
    },
    data() {
      return {
        logged: false,//是否已登录
        showIdentityReason: false,
        showNoPermission: false,
        bindCard: false,
      }
    },

    created() {

    },

    methods: {},

  }

</script>

<style>


</style>

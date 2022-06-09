<template>
  <div class="body-bg">
    <div class="top">
      <header class="header">
        <div class="header_custom">
          <div class="left">
            <van-icon name="arrow-left" @click="back()" />
          </div>
          <div class="center nav-title">{{ i18n.shens }}</div>
        </div>
      </header>
      <img src="@/assets/images/activity/zs.png" alt="" class="zs" />
      <div class="logo">
        <img src="@/assets/images/activity/zs2.png" alt="" />
      </div>
      <p class="pt">{{ memberSystem.name }}</p>
    </div>
    <div class="duanwei">
      <div
        class="xw"
        @click="isShow(0)"
        :class="0 == isActive ? 'active1' : ''"
      >
        <img src="@/assets/images/activity/y.png" alt="" />
        <p>{{ i18n.pt }}</p>
      </div>
      <div
        class="zq"
        @click="isShow(1)"
        :class="1 == isActive ? 'active1' : ''"
      >
        <img src="@/assets/images/activity/y.png" alt="" />
        <p>{{ i18n.qt }}</p>
      </div>
      <div
        class="bh"
        @click="isShow(2)"
        :class="2 == isActive ? 'active1' : ''"
      >
        <img src="@/assets/images/activity/y.png" alt="" />
        <p>{{ i18n.by }}</p>
      </div>
      <div
        class="ql"
        @click="isShow(3)"
        :class="3 == isActive ? 'active1' : ''"
      >
        <img src="@/assets/images/activity/y.png" alt="" />
        <p>{{ i18n.hj }}</p>
      </div>
      <div
        class="ql2"
        @click="isShow(4)"
        :class="4 == isActive ? 'active1' : ''"
      >
        <img src="@/assets/images/activity/y.png" alt="" />
        <p>{{ i18n.bj }}</p>
      </div>
      <div
        class="ql3"
        @click="isShow(5)"
        :class="5 == isActive ? 'active1' : ''"
      >
        <img src="@/assets/images/activity/y.png" alt="" />
        <p>{{ i18n.bhwz }}</p>
      </div>
      <div
        class="ql4"
        @click="isShow(6)"
        :class="6 == isActive ? 'active1' : ''"
      >
        <img src="@/assets/images/activity/y.png" alt="" />
        <p>{{ i18n.zjzd }}</p>
      </div>
      <div
        class="ql5"
        @click="isShow(7)"
        :class="7 == isActive ? 'active1' : ''"
      >
        <img src="@/assets/images/activity/y.png" alt="" />
        <p>{{ i18n.wzzd }}</p>
      </div>
    </div>

    <div
      class="ka"
      ref="ka"
      v-for="(v, k) in moreList"
      :key="k"
      :class="k == isActive ? 'active' : ''"
    >
      <div class="">
        <div class="name">
          <p>{{ v.name }}</p>
          <div class="js">
            <!-- <p>未解锁</p> -->
          </div>
        </div>
        <div class="logo">
          <img src="@/assets/images/activity/zs2.png" alt="" />
        </div>
        <p class="haoyou">{{ num }}/{{v.number}}{{ i18n.tlhy }}</p>
        <div class="bp">
          {{ v.commission }}%{{ i18n.hyjyjc }}/{{
            v.servicCharges
          }}%{{ i18n.jysxf }}
        </div>
      </div>
    </div>

    <div class="renz">
      <p>
        {{ i18n.yrz }} <span>{{ num }}</span> ({{ i18n.dqhysm }}
        <span>{{ num }}</span
        >)
      </p>
      <div>
        <p>
          <span>{{ memberSystem.commission }}%</span>{{ i18n.jl }}
        </p>
        <p>
          <span>{{ memberSystem.servicCharges }}%</span> {{ i18n.jysxf }}
        </p>
      </div>
    </div>
    <div class="yao">
      <!-- <div class="lj">
        <p class="text">{{i18n.yqlj}}</p>
        <div>
          <p class="p1">{{ message }}</p>
          <p
            class="p2"
            v-clipboard:copy="message"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          >
            {{i18n.fz}}
          </p>
        </div>
      </div> -->
      <div class="yqm">
        <p class="text">{{i18n.yqm}}</p>
        <div>
          <p class="p3">{{ member.welCode }}</p>
          <img
            src="@/assets/images/activity/yqm.png"
            alt=""
            v-clipboard:copy="member.welCode"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          />
        </div>
      </div>
    </div>

    <ul class="hezi">
      <li class="top1">
        <p class="hyzh">{{i18n.hyzh}}</p>
        <p>{{i18n.hzz}}</p>
      </li>
      <li v-for="(v, k) in list" :key="k">
        <p class="hyzh">{{ v.mail }}</p>
        <p>{{ v.uname }}</p>
      </li>
    </ul>
    <div class="bottom"></div>
  </div>
</template>

<script>
import i18n from "@/main.js";
export default {
  i18n,
  name: "",
  data() {
    return {
      list: "",
      memberSystem: "",
      member: "",
      num: "",
      message: "",
      moreList: "",
      isActive: 0,

      hy: "尚未有好友",
    };
  },
  props: {},
  computed: {
    i18n() {
      return this.$t("shens");
    },
  },
  components: {},
  mounted() {},
  methods: {
    isShow(v) {
      this.isActive = v;
    },
    back() {
      this.$router.go(-1);
    },
    onCopy: function (e) {
      this.Toast("复制成功");
    },
    onError: function (e) {
      alert("Failed to copy texts");
    },
  },
  created() {
    // /member/member/getMemberLevel
    let params = {
      member: this.$store.state.userId,
    };
    this.$post1("/member/member/getMemberLevel", params).then((res) => {
      this.memberSystem = res.result.memberSystem;
      this.member = res.result.member;
      this.num = res.result.num;
      // this.message = ba"";
      this.moreList = res.result.moreList;
      this.list = res.result.list;
    });
  },
};
</script>

<style lang="less" scoped >
.active {
  z-index: 1;
}
.body-bg {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-color: #101014; //背景色为白色
}
.header {
  position: relative;
  width: 100%;

  .header_custom {
    width: 100%;
    position: fixed;
    left: 0;

    .left {
      width: 100%;
      height: 46px;
      font-size: 16px;
      line-height: 46px;
      position: absolute;
      left: 15px;
    }

    .center {
      width: 100%;
      height: 46px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      line-height: 46px;
      color: #fff;
    }
  }
}
#app {
  background-color: #101014 !important;
}
.top {
  background-image: url("../../assets/images/activity/bj.png");
  background-repeat: no-repeat;
  background-size: 100% 243.5px;
  background-color: #101014;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  .logo {
    position: absolute;
    top: 111.5px;
    left: 161.5px;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background-color: #611b1b;
    img {
      width: 100%;
      margin: 0px auto;
    }
  }
}
.zs {
  width: 145px;
  height: 125.5px;
  margin: 108px auto;
}
.pt {
  width: 100px;
  margin: -170px auto;
  font-size: 30px;
  color: #fff;
  text-align: center;
}
.duanwei {
  p {
    font-size: 10px;
    color: #fff;
    // width: 54px;
    // text-align: center;
    margin-top: 12px;
  }
  img {
    width: 20px;
    height: 20px;
    margin: auto;
    border-radius: 50%;
  }
  .xw {
    position: absolute;
    top: 184px;
    left: 16px;
  }
  .zq {
    position: absolute;
    top: 208px;
    left: 60px;
  }
  .bh {
    position: absolute;
    top: 222px;
    left: 104px;
  }
  .ql {
    position: absolute;
    top: 230px;
    left: 148px;
  }
  .ql2 {
    position: absolute;
    top: 230px;
    right: 148px;
  }
  .ql3 {
    position: absolute;
    top: 222px;
    right: 92px;
  }
  .ql4 {
    position: absolute;
    top: 208px;
    right: 48px;
  }
  .ql5 {
    position: absolute;
    top: 184px;
    right: 4px;
  }
}
.ka {
  background-image: url("../../assets/images/activity/ka.png");
  background-size: 100% 100%;
  width: 92%;
  height: 120px;
  margin: 0 auto;
  position: absolute;
  top: 303px;
  left: 15px;
  .logo {
    position: absolute;
    left: 202.5px;
    bottom: 50px;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background-color: #611b1b;
    img {
      width: 100%;
      margin: 0px auto;
    }
  }
  .haoyou {
    margin-left: 17px;
    margin-top: 13px;
    color: #fff;
    font-size: 14px;
  }
  .bp {
    margin-top: 13px;
    margin-left: 17px;
    color: #ffffff;
    font-size: 14px;
  }
  .name {
    height: 34px;
    display: flex;
    margin-top: 15px;
    p {
      font-size: 24px;
      color: #fff;
      margin-right: 12px;
      margin-left: 13px;
    }
    div {
      background-color: #1c2b3a;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      p {
        text-align: center;
        font-size: 16px;
        color: #31537f;
      }
    }
  }
}
.renz {
  position: absolute;
  top: 461.5px;
  left: 16px;
  width: 92%;
  height: 105.5px;
  border-bottom: 1px solid #eee;
  p {
    margin-left: 17.5px;
    height: 15.5px;
    font-size: 16px;
    color: #fff;
  }
  div {
    width: 100%;
    height: 43px;
    background-color: #1d2937;
    display: flex;
    margin-top: 22px;
    line-height: 43px;
  }
}
.yao {
  width: 345px;
  height: 110px;
  position: absolute;
  left: 14px;
  top: 583px;
  background-color: #1d2937;
  margin: 0 auto;
  .lj,
  .yqm {
    display: flex;
    width: 306.5px;
    height: 42px;
    margin: 0 auto;
    margin-top: 31px;
    justify-content: space-between;
    p {
      font-size: 15px;
      color: #fff;
      line-height: 42px;
    }
    div {
      min-width: 198px;
      height: 42px;
      line-height: 42px;
      display: flex;
      justify-content: space-between;
      background-color: #3a3e47;
      border-radius: 5px;
      .p1,
      .p3 {
        margin-left: 10px;
      }
      .p2 {
        margin-right: 16px;
      }

      img {
        margin-right: 16px;
        margin-top: 12.5px;
        width: 17.45px;
        height: 17.45px;
      }
    }
  }
}
.hezi {
  width: 345px;
  position: absolute;
  left: 14px;
  top: 718px;
  background-color: #1d2937;
  .top1 {
    p {
      color: #0aab9c;
    }
  }
  li {
    display: flex;
    justify-content: space-between;
  }
  p {
    font-size: 16px;
    color: #fff;
    line-height: 43px;
    margin-right: 50px;
  }
  .hyzh {
    margin-left: 12.5px;
  }
}
.xia {
  position: absolute;
  left: 153.5px;
  top: 823px;
  color: #ffffff;
  font-size: 14px;
}
span {
  color: #0aab9c;
}
.activity {
  height: 100vh;
}
.active1 p {
  color: #ff8c00;
}
.active1 img {
  background-color: #ff8c00;
}
.bottom{
  width: 100%;
  height: 50px;
  position: absolute;
  top: 780px;
}
</style>
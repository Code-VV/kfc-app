<template>
  <div class="updateEdition">
    <van-popup v-model="show" class="updateBox" @closed="close" :close-on-click-overlay='false'>
      <div class="titles  size16 bold" style="color:#fff;">发现新版本</div>
      <!--  -->
      <!-- <div class="versionNumber c_fff size14 mar_t_6" >{{reason.grade}}</div> -->
      <div class="content flex1 mar_t_110 size14 c_222 left_text">
        <div class="div">
          <!-- <p class="name">新增**功能</p> -->
          <p class="detail mar_t_5" v-for="(item,i) in reason.reason" :key="i">{{item}}</p>
        </div>
      </div>
      <div class="confirmBtn mar_t_15" @click="updateEvent">立即更新</div>
    </van-popup>
  </div>
</template>
<script>
import { mapActions } from "vuex";
var mam;
export default {
  props: {
    type: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      show: false,
      // reason: {} //更新信息
      reason: {} //更新信息
    };
  },
  watch: {},
  mounted() {
    
    // 热更新;
    // this.show = true;
    this.isUpdate();
  },
  methods: {
    //检查更新
    isUpdate() {
      mam = api.require("mam");
      var _this = this;
      
      mam.checkSmartUpdate(function(ret, err) {
        if (ret) {
          if (ret.packages.length == 0) {
            
            if (_this.type == 1) {
              _this.$emit("updateClose");
              _this.Toast("当前已是最新版本了~");
            }
            return;
          }
          
          _this.show = true;
          _this.reason = ret.packages[0].extra;
          _this.reason = JSON.parse(_this.reason);
          _this.reason.reason = eval("(" + _this.reason.reason + ")");
        }
      });
    },
    //更新
    updateEvent() {
      var _this = this;
      mam = api.require("mam");
      mam.startSmartUpdate(function(res, err) {
        if (res) {
          if (1 == res.state) {
            _this.$util.showLoading("更新中...");
          }
          if (3 == res.state) {
            _this.Toast("更新完成");
            setTimeout(res => {
              _this.Toast.clear();
            }, 300);
            setTimeout(function() {
              api.rebootApp();
            }, 2000);
          }
          if (4 == res.state) {
            _this.Toast("更新失败");
            setTimeout(res => {
              _this.Toast.clear();
            }, 300);
          }
        }
      });
    },
    //关闭
    close() {
      this.$emit("updateClose");
    }
  },
  computed: {}
};
</script>
<style lang="scss">
.updateEdition {
  .van-popup__close-icon--top-right {
    top: 7px;
    right: 10px;
  }
  .van-icon-cross:before {
    color: #fff;
  }
}
</style>
<style lang="scss" scoped>
.updateEdition {
  .updateBox {
    width: 280px;
    height: 325px;
    padding: 21px 40px 27px;
    background: url(../assets/images/home/updateBg.png) no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    text-align: center;
    .content {
      overflow-y: auto;
    }
    .confirmBtn {
      width: 100%;
      height: 35px;
      line-height: 35px;
      background: #3956eb;
      border-radius: 3px;
      font-size: 16px;
      color: #fff;
      text-align: center;
    }
  }
}
</style>

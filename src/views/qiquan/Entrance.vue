<template>
  <div class='my_page'>
      <div class="up">
          <van-icon class="icon" name="arrow-left" size="25px" @click="onclick"/>
          <!-- <div class="fanhui" @click="onclick()">&lt;</div> -->
          <!-- <h2>期权</h2> -->
          
          <span class="title">{{$t('qiquan.qiquan')}}</span>
      </div>
      <div class="conter">
          <div class="Maincurrency">USTD</div>
          <div class="list" v-for=" (i,index) in currencys" @click="jump(i.symbol)" :key="index">
            <span class="life">{{i.coinSymbol}}</span>
            <span class="conter"> / USTD</span>
            <span class="right"></span>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  // import引入的组件需要注入到对象中才能使用
  data () {
    // 这里存放数据
    return {
        // 这里是储存币种的数据
        currencys:null
    }
  },
  methods:{
      onclick(){
          console.log("！！！！！！！！！！！");
          this.$router.go(-1)
          console.log("！！！！！！！！！！！");
      },
      jump(i){
          console.log(i+"");
            this.$router.push({
                path:'/qiquan/index',
                query:{trade:i}
            });
      }
      
  },
  created(){
    //   console.log("进入改路由!!!!!!");
      axios.post("/option/coin/coin-list").then((res)=>{
          this.currencys=res.data
          console.log(res);


      })
  }
}
</script>

<style>
div.my_page{
    padding-left:10px;
    /* margin-right:10px; */
}
div.up{
    width: 100%;
    height: 100%;
    margin-top: 20px;
    /* border: 1PX solid red; */
    text-align: center;
    /* background: cornflowerblue; */
}
div.up h2{
    /* float: left; */
    /* display: inline-block;
    text-align: center;
    margin: 0 auto; */
    /* line-height: 20px; */
}
div.up i.icon{
    float: left;
}
div.up span.title{
    font-size: 20px;
    position: relative;
    left: -8px;
    /* background: chartreuse; */
    /* text-align: center; */
}
div.up div.fanhui{
    /* display: inline-block; */
}
div.conter div.Maincurrency{
    font-size: 15px;
    color: #fbc400;
    margin: 10px 0;
    /* padding-bottom: 10px; */
    display: inline-block;
    /* background:#fbc400; */
    border-bottom: 2px  solid #fbc400;
}
div.conter div.list{
    font-size: 15px;
    /* background: darkseagreen; */
    padding: 15px 0;
    margin-right: 20px;
    border-bottom: 1px solid rgba(153, 153, 153, 0.521);
}
div.conter div.list span.conter{
    font-size: 13px;
    color:rgb(153, 153, 153);
}
</style>

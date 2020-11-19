<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="8" >
        <div class="chart-container card-item">
          <div style="text-align: center;">
            <div class="icon"></div>
            <el-button type="text">查看明细</el-button>
          </div>
          <ul>
            <li>会员等级</li>
            <li>累计充值</li>
            <li>本年充值</li>
            <li>到期时间</li>
          </ul>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-container card-item">
          <div style="text-align: center;">
            <div class="icon"></div>
            <el-button type="text">查看明细</el-button>
          </div>
          <ul>
            <li>累计订单量</li>
            <li>已完成</li>
            <li>当月订单量</li>
            <li>已完成</li>
            <li>未付款</li>
          </ul>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-container card-item">
          <div style="text-align: center;">
            <div class="icon"></div>
            <el-button type="text">查看明细</el-button>
          </div>
          <ul>
            <li>当前需支付运费</li>
            <li>已支付运费</li>
            <li>好评率</li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top:10px">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-container">
          <h4>会员充值情况</h4>
          <line-chart :chart-data="lineChartData" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-container">
          <h4>会员开单情况</h4>
          <line-chart :chart-data="lineChartData" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-container">
          <h4>司机活跃情况</h4>
          <line-chart :chart-data="lineChartData" />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top:10px">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-container">
          <h4>会员充值情况</h4>
          <line-chart :chart-data="lineChartData" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-container">
          <h4>会员开单情况</h4>
          <line-chart :chart-data="lineChartData" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-container">
          <h4>司机活跃情况</h4>
          <line-chart :chart-data="lineChartData" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from './dashboard/LineChart'
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}
export default {
  name: "index",
  components:{LineChart},
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    };
  },
  methods: {

  },
};
</script>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 84px);
  .el-row{
    height: 100%;
    flex: 1;
  }
  .el-col{
    height: 100%;
  }
  .box-card{
    height: 100%;
  }

  .chart-container{
    box-shadow: 0 0 10px 1px #e0e0e0;
    height: 100%;
    border-radius: 3px;
    padding: 10px;
  } 
  .card-item{
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    .icon{
      width: 80px;
      height: 80px;
      background: #e0e0e0;
      border-radius: 50%;
    }
  }

  
}
</style>


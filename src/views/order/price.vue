<template>
    <el-dialog 
        :title="title" 
        width="920px" 
        :visible.sync="dialogVisible" append-to-body>
        <el-table 
            v-loading="loading" 
            :data="priceList" 
            border
            stripe>
            <el-table-column label="司机" prop="driver.name" header-align="center"></el-table-column>
            <el-table-column label="车牌号" prop="driver.licenseNumber" header-align="center"></el-table-column>
            <el-table-column label="车长" prop="" header-align="center"></el-table-column>
            <el-table-column label="车型" prop="" header-align="center"></el-table-column>
            <el-table-column label="运费" prop="price" header-align="center"></el-table-column>
            <el-table-column label="付款方式" prop="receiptType" header-align="center"></el-table-column>
            <el-table-column label="操作" prop="driver" header-align="center">
                <template slot-scope="scope">
                    <el-button type="primary">选他</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button type="primary">定向指派</el-button>
    </el-dialog>
</template>

<script>
import * as API from "@/api/order/index";
export default {
    data(){
        return{
            loading:false,
            dialogVisible:false,
            title:"报价信息",
            orderInfo:{},
            priceList:[]
        }
    },
    methods:{
        show(row){
            let {orderInfo} = row
            this.orderInfo = orderInfo
            this.title = "报价信息     订单号:"+this.orderInfo.code
            this.dialogVisible = true
            this.loading = true
            API.queryPrice({code:this.orderInfo.code}).then(res=>{
                this.priceList = res.result
                this.loading = false
            })
        }
    }
}
</script>
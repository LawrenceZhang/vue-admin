<template>
  <div class="app-container">
    <div class="filter-container">
      <el-autocomplete v-model="state4" size="medium" :fetch-suggestions="queryProductList" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
    </div>
    <el-table :data="selectProductList" element-loading-text="loading" sum-text="总计" :summary-method="getSummaries" border show-summary fit highlight-current-row>
      <el-table-column align="center" label='名称' width="200">
        <template scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="条形码" width="200">
        <template scope="scope">
          {{scope.row.code}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="规格" width="125">
        <template scope="scope">
          {{scope.row.size}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="类型" width="200">
        <template scope="scope">
          {{scope.row.type}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="库存" width="110">
        <template scope="scope">
          {{scope.row.inventory}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="单价" width="120">
        <template scope="scope">
          {{scope.row.price}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="数量" width="110">
        <template scope="scope">
          {{scope.row.count}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="金额" width="110">
        <template scope="scope">
          {{scope.row.fee}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="300">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getProductList } from "@/api/checkout";

export default {
  data() {
    return {
      state4: null,
      timeout: null,
      selectProductList: []
    };
  },
  filters: {},
  created() {
  },
  methods: {  
    queryProductList(queryString, cb) {
      var productList = null
      var queryParam = {
        any: queryString
      }
      getProductList(queryParam).then(response => {
        productList = response
        for (var i = 0; i < productList.length; i++) {
          productList[i].value = productList[i].name
        }
      })

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        console.log(123123123)
        cb(productList);
      }, 1000);
    },
    handleSelect(item) {
      this.state4 = null
      for (var i in this.selectProductList) {
        if (this.selectProductList[i].code == item.code) {
          this.selectProductList[i].count = this.selectProductList[i].count + 1
          this.selectProductList[i].fee = this.selectProductList[i].fee + item.price
          this.selectProductList.push(item)
          this.selectProductList.pop()
          return
        }
      }
      item.count = 1
      item.fee = item.price
      this.selectProductList.push(item)
    },
    getSummaries(param) {
      var sum = 0
      this.selectProductList.forEach((column) => {
        sum = sum + column.fee
      })
      return ['总计', '', '', '', '', '', '', sum]
    }
  }
};
</script>

<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="fetchData" style="width: 200px;" class="filter-item" placeholder="名称，条形码，类型" v-model="queryParam.any">
      </el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="fetchData">搜索</el-button>
      <el-button @click="newProduct">新增商品</el-button>
    </div>
    <el-table :data="productlist" v-loading.body="listLoading" element-loading-text="loading" border fit highlight-current-row>
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
      <el-table-column align="center" label="单价" width="120">
        <template scope="scope">
          {{scope.row.price}}
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
      <el-table-column align="center" label="操作" width="300">
        <template scope="scope">
          <el-button :type="scope.row.edit?'success':'primary'" size="small" icon="edit">{{scope.row.edit?'完成':'编辑'}}</el-button>
          <el-button size="small">入库</el-button>
          <el-button size="small">出库</el-button>
          <el-button size="small" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="'新增商品'" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="名称" prop="name">
          <el-input v-model="temp.title"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getProducts } from '@/api/products'

export default {
  data() {
    return {
      productlist: [],
      listLoading: false,
      dialogFormVisible: false,
      queryParam:{
        any:''
      },
      rules: {
        name: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      }
    }
  },
  filters: {
  },
  created() {
    //this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getProducts(this.queryParam).then(response => {
        this.productlist = response
        for (var i = 0; i < this.productlist.length; i++) {
          this.productlist[i].edit = false
        }
        this.listLoading = false
      })
    },
    newProduct() {
      this.dialogFormVisible = true
    }
  }
}
</script>

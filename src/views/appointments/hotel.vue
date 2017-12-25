<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="fetchData" style="width: 200px;" class="filter-item" placeholder="名称，条形码，类型" v-model="queryParam.any">
      </el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="fetchData">搜索</el-button>
      <el-button @click="createProduct">新增商品</el-button>
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
      <el-table-column align="center" label="备注">
      </el-table-column>
      <el-table-column align="center" label="操作" width="300">
        <template scope="scope">
          <el-button size="small" icon="edit" @click="updateProduct(scope.row)">编辑</el-button>
          <el-button size="small" @click="raiseInventory(scope.row.id)">入库</el-button>
          <el-button size="small" @click="reduceInventory(scope.row.id)">出库</el-button>
          <el-button size="small" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="productParams" label-position="right" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="名称" prop="name">
          <el-input v-model="productParams.name"></el-input>
        </el-form-item>
        <el-form-item label="条形码" prop="code">
          <el-input v-model="productParams.code"></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="price">
          <el-input type='number' v-model.number="productParams.price"></el-input>
        </el-form-item>
        <el-form-item label="规格" prop="size">
          <el-input v-model="productParams.size"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="size">
          <el-input v-model="productParams.type"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type='textarea' v-model="productParams.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="doCreateProduct">确 定</el-button>
        <el-button v-else type="primary" @click="doUpdateProduct">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="modifyInventoryDialog.title" :visible.sync="modifyInventoryDialog.visible">
      <el-form :rules="rules" ref="dataForm" :model="inventoryParams" label-position="right" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="数量" prop="count">
          <el-input type='number' v-model.number="inventoryParams.count"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modifyInventoryDialog.visible=false">取 消</el-button>
        <el-button type="primary" @click="doModifyInventory">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getProductList, addProduct, updateProduct, deleteProduct, modifyInventory } from '@/api/products'

export default {
  data() {
    return {
      productlist: [],
      listLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      dialogTitle: '',
      modifyInventoryDialog: {
        title: '',
        visible: false,
        status: ''
      },
      queryParam:{
        any: ''
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'change' }],
        code: [{ required: true, message: '条形码不能为空', trigger: 'change' }],
        price: [{ required: true, message: '单价不能为空' }]
      },
      productParams: {
        id: '',
        name: '',
        code: '',
        price: '',
        size: '',
        type: '',
        remark: ''
      },
      inventoryParams: {
        id: 0,
        type: '',
        count:0
      }
    }
  },
  filters: {
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getProductList(this.queryParam).then(response => {
        this.productlist = response
        this.listLoading = false
      })
    },
    createProduct() {
      this.dialogStatus = 'create'
      this.dialogTitle = '新增商品'
      this.dialogFormVisible = true
    },
    doCreateProduct() {
      params = this.productParams
      delete params.id
      var data = Object.assign({}, this.params)
      addProduct(data)
      this.fetchData()
    },
    updateProduct(product) {
      this.dialogStatus = 'update'
      this.dialogTitle = '修改商品'
      this.dialogFormVisible = true
      this.productParams = product
    },
    doUpdateProduct() {
      var data = Object.assign({}, this.productParams)
      updateProducts(data)
      this.fetchData()
    },
    raiseInventory(productId) {
      this.modifyInventoryDialog.title='商品入库'
      this.modifyInventoryDialog.status='raise'
      this.inventoryParams.id = productId
      this.inventoryParams.type = 'in'
      this.inventoryParams.count = 0
      this.modifyInventoryDialog.visible=true
    },
    reduceInventory(productId) {
      this.modifyInventoryDialog.title='商品出库'
      this.modifyInventoryDialog.status='reduce'
      this.inventoryParams.id = productId
      this.inventoryParams.type = 'in'
      this.inventoryParams.count = 0
      this.modifyInventoryDialog.visible=true
    },
    doModifyInventory() {
      var data = Object.assign({}, this.inventoryParams)
      modifyInventory(data)
      this.fetchData()
    },
    deleteProduct(productId) {
      var params = {
        id: productId
      }
      deleteProduct(params)
      this.fetchData()
    }
  }
}
</script>

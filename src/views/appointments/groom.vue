<template>
  <div class="app-container">
    <div class="block">
      <el-date-picker v-model="pickDateValue" type="date" placeholder="选择日期" @change="getAppts"></el-date-picker>
      <el-button @click="createAppt">新增预约</el-button>
    </div>
    <el-dialog :title="dialog.title" :visible.sync="dialog.visible">
      <el-form :rules="rules" ref="dataForm" :model="apptParams" label-position="right" label-width="70px" style='width: 600px; margin-left:100px;'>
        <el-form-item label="名字" prop="name">
          <el-input v-model="apptParams.name"></el-input>
        </el-form-item>
        <el-form-item label="联系号码" prop="phone">
          <el-input v-model="apptParams.phone"></el-input>
        </el-form-item>
        <el-form-item label="到店日期" prop="date">
          <el-date-picker v-model="apptParams.date" type="date" placeholder="选择预约日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="到店时间" prop="hour">
          <el-time-select v-model="apptParams.hour" :picker-options="{start: '09:00', step: '01:00', end: '21:00'}" placeholder="选择预约时间"></el-time-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type='textarea' v-model="apptParams.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible=false">取 消</el-button>
        <el-button type="primary" @click="doCreateAppt">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getProductList, addProduct, updateProduct, deleteProduct, modifyInventory } from '@/api/products'

export default {
  data() {
    return {
      pickDateValue: new Date(),
      dialog: {
        title: '新增预约',
        visible: false
      },
      apptParams: {
        name: "",
        phone: "",
        date: "",
        hour: "",
        remark: ""
      },
      rules: {
        name: [{ required: true, message: '名字不能为空', trigger: 'change' }]
      }
    }
  },
  filters: {
  },
  created() {
  },
  methods: {
    getAppts(date) {
      alert(this.pickDateValue.getFullYear() + "-" + (this.pickDateValue.getMonth() + 1) + "-" + this.pickDateValue.getDate())
    },
    createAppt() {
      this.dialog.visible = true
    },
    doCreateAppt() {
      
    }
  }
}
</script>

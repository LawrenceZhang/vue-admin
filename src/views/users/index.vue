<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="fetchData" style="width: 200px;" class="filter-item" placeholder="昵称，姓名，手机号" v-model="queryParam.any">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="fetchData">搜索</el-button>
      <el-button @click="createUser">新增</el-button>
    </div>
    <el-table :data="userlist" v-loading.body="listLoading" element-loading-text="loading" @cell-click="cellClick" border fit highlight-current-row>
      <el-table-column align="center" label='昵称' width="150" >
        <template scope="scope">
          {{scope.row.nickName}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="性别" width="95">
        <template scope="scope">
          {{scope.row.sex}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="姓名" width="95">
        <template scope="scope">
          {{scope.row.realName}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号码" width="125">
        <template scope="scope">
          {{scope.row.mobilePhone}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="生日" width="110">
        <template scope="scope">
          {{scope.row.birthday}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="会员卡类型" width="110">
        <template scope="scope">
          {{scope.row.memShipName}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="折扣" width="95">
        <template scope="scope">
          {{scope.row.memShipDiscout}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="余额" width="95">
        <template scope="scope">
          {{scope.row.memShipBalance}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="到期日" width="110">
        <template scope="scope">
          {{scope.row.memShipExpirationTime}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="地址">
        <template scope="scope">
          {{scope.row.street}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="220">
        <template scope="scope">
          <el-button size="small" @click="checkout(scope.row.id)">收银</el-button>
          <el-button size="small" @click="getUserPetInfos(scope.row.id)">宠物</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="'宠物信息'" :visible.sync="dialogFormVisible">
      <el-table :data="petlist" v-loading.body="petInfoLoading" element-loading-text="loading" border fit highlight-current-row>
        <el-table-column align="center" label='名字'>
        <template scope="scope">
          {{scope.row.name}}
        </template>
        </el-table-column>
        <el-table-column align="center" label='种类' width="150">
        <template scope="scope">
          {{scope.row.category}}
        </template>
        </el-table-column>
        <el-table-column align="center" label='性别' width="150">
        <template scope="scope">
          {{scope.row.sex}}
        </template>
        </el-table-column>
        <el-table-column align="center" label='生日' width="150">
        <template scope="scope">
          {{scope.row.birthday}}
        </template>
        </el-table-column>
        <el-table-column align="center" label='是否绝育' width="150">
        <template scope="scope">
          {{scope.row.sterilisation?'是':'否'}}
        </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog :title="'创建用户'" :visible.sync="createUserDialog.visible">
      <el-form ref="dataForm" :model="createUserDialog.params" label-position="right" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="姓名" prop="realname">
          <el-input v-model="createUserDialog.params.realname"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="createUserDialog.params.sex" label="男">男</el-radio>
          <el-radio v-model="createUserDialog.params.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="电话号码" prop="mobilephone">
          <el-input v-model="createUserDialog.params.mobilephone"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker v-model="createUserDialog.params.birthday" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期" ></el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="street">
          <el-input v-model="createUserDialog.params.street"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createUserDialog.visible=false">取 消</el-button>
        <el-button type="primary" @click="doCreateUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserInfoByAny, getPetInfoByUserId, createUser } from "@/api/users"
import waves from "@/directive/waves"; // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      userlist: [],
      petlist: [],
      listLoading: false,
      petInfoLoading: false,
      dialogFormVisible: false,
      createUserDialog: {
        visible: false,
        params: {}
      },
      queryParam: {
        any: ""
      }
    };
  },
  filters: {},
  created() {
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getUserInfoByAny(this.queryParam)
        .then(response => {
          this.userlist = response;
          for (var j = 0; j < this.userlist.length; j++) {
            this.userlist[j].edit = false
          }
          this.listLoading = false
        })
        .then(response => {})
    },
    createUser() {
      this.createUserDialog.visible = true
    },
    doCreateUser() {
      createUser(this.createUserDialog.params).then(response => {
        this.createUserDialog.visible = false
        this.createUserDialog.params = {}
      })
    },
    cellClick(row, column, cell, event) {
      console.log(column);
      if (column.label !== "操作") {
        this.$router.push({
          name: "用户详情",
          params: {
            userInfo: row
          }
        })
      }
    },
    getUserPetInfos(userid_input) {
      this.petlist = [];
      this.dialogFormVisible = true
      this.petInfoLoading = true
      var param = {
        userid: userid_input
      };
      getPetInfoByUserId(param).then(response => {
        this.petlist = response
        this.petInfoLoading = false
      })
    },
    checkout(userId) {}
  }
};
</script>

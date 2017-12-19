<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="fetchData" style="width: 200px;" class="filter-item" placeholder="昵称，姓名，手机号" v-model="queryParam.any">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="fetchData">搜索</el-button>
    </div>
    <el-table :data="userlist" v-loading.body="listLoading" element-loading-text="loading" border fit highlight-current-row>
      <el-table-column align="center" label='昵称' width="150">
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
      <el-table-column align="center" label="会员卡id" width="95">
        <template scope="scope">
          {{scope.row.memShipId}}
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
          {{scope.row.memShipExpirationTimeStamp}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="地址">
        <template scope="scope">
          {{scope.row.street}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template scope="scope">
        <el-button :type="scope.row.edit?'success':'primary'" size="small" icon="edit">{{scope.row.edit?'完成':'编辑'}}</el-button>
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
  </div>
</template>

<script>
import { getUserInfoByAny, getPetInfoByUserId } from '@/api/users'
import waves from '@/directive/waves' // 水波纹指令

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
      queryParam:{
        any:''
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
      getUserInfoByAny(this.queryParam).then(response => {
        this.userlist = response
        for (var j = 0; j < this.userlist.length; j++) {
          this.userlist[j].edit = false
        }
        this.listLoading = false
      })
      .then(response =>{
      })
    },
    getUserPetInfos(userid_input) {
      this.petlist = []
      this.dialogFormVisible = true
      this.petInfoLoading = true
      var param = {
        userid:userid_input
      }
      getPetInfoByUserId(param).then(response => {
        this.petlist = response
        this.petInfoLoading = false
      })
    }
  }
}
</script>

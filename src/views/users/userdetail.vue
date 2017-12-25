<template>
  <div class="app-container">
    <div class="filter-container">
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <el-tab-pane label="基本信息" name="first">
          <div style="width: 800px">
            <el-table :data="userInfo" element-loading-text="loading" border fit>
              <el-table-column align="center" width="150" >
                <template scope="scope">{{scope.row.key}}</template>
              </el-table-column>
              <el-table-column align="center" >
                <template scope="scope">{{scope.row.value}}</template>
              </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
              <el-button @click="editUserInfo">编辑</el-button>
              <el-button>充值</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="宠物信息" name="second">
          <div style="width: 1000px">
            <el-button @click="createPet">新增</el-button>
            <el-table :data="petlist" v-loading.body="ifLoading" element-loading-text="loading" border fit highlight-current-row>
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
              <el-table-column align="center" label='操作' width="150">
                <template scope="scope">
                  <el-button size="small" @click="updatePet(scope.row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="deletePet(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-dialog :title="createPetDialog.title" :visible.sync="createPetDialog.visible">
            <el-form :rules="createPetDialog.rules" ref="dataForm" :model="petParams" label-position="right" label-width="70px" style='width: 400px; margin-left:50px;'>
              <el-form-item label="名字" prop="name">
                <el-input v-model="petParams.name"></el-input>
              </el-form-item>
              <el-form-item label="种类" prop="category">
                <el-radio v-model="petParams.category" label="狗">狗</el-radio>
                <el-radio v-model="petParams.category" label="猫">猫</el-radio>
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                <el-radio v-model="petParams.sex" label="男">男</el-radio>
                <el-radio v-model="petParams.sex" label="女">女</el-radio>
              </el-form-item>
              <el-form-item label="生日" prop="birthday">
                <el-date-picker v-model="petParams.birthday" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期" ></el-date-picker>
              </el-form-item>
              <el-form-item label="是否绝育" prop="sterilisation">
                <el-radio v-model="petParams.sterilisation" label=true>是</el-radio>
                <el-radio v-model="petParams.sterilisation" label=false>否</el-radio>
              </el-form-item>
              <div class="dialog-footer">
                <el-button @click="createPetDialog.visible=false">取 消</el-button>
                <el-button v-if="createPetDialog.status=='create'" type="primary" @click="doCreatePet">确 定</el-button>
                <el-button v-else type="primary" @click="doUpdatePet">确 定</el-button>
              </div>
            </el-form>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="消费记录" name="third">
          <el-table :data="purchaseRecordList" element-loading-text="loading" border fit>
            <el-table-column label="商品名称" align="center" width="200" >
              <template scope="scope">{{scope.row.name}}</template>
            </el-table-column>
            <el-table-column label="数量" align="center" width="200" >
              <template scope="scope">{{scope.row.value}}</template>
            </el-table-column>
            <el-table-column label="应收价格" align="center" width="200" >
              <template scope="scope">{{scope.row.value}}</template>
            </el-table-column>
            <el-table-column label="实收价格" align="center" width="200" >
              <template scope="scope">{{scope.row.value}}</template>
            </el-table-column>
            <el-table-column label="下单时间" align="center" width="200" >
              <template scope="scope">{{scope.row.value}}</template>
            </el-table-column>
            <el-table-column label="备注" align="center" >
              <template scope="scope">{{scope.row.value}}</template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="充值记录" name="fourth">
          <div style="width: 1000px">
            <el-table :data="rechargeRecordList" element-loading-text="loading" border fit>
              <el-table-column label="充值类型" align="center" width="200" >
                <template scope="scope">{{scope.row.name}}</template>
              </el-table-column>
              <el-table-column label="充值金额" align="center" width="200" >
                <template scope="scope">{{scope.row.value}}</template>
              </el-table-column>
              <el-table-column label="实收金额" align="center" width="200" >
                <template scope="scope">{{scope.row.value}}</template>
              </el-table-column>
              <el-table-column label="支付方式" align="center" width="200" >
                <template scope="scope">{{scope.row.value}}</template>
              </el-table-column>
              <el-table-column label="充值时间" align="center" >
                <template scope="scope">{{scope.row.value}}</template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { getPetInfoByUserId, addPet } from "@/api/userdetail";

export default {
  data() {
    return {
      activeName: "first",
      ifLoading: false,
      userInfo: [],
      petlist: [],
      purchaseRecordList: [],
      rechargeRecordList: [],
      createPetDialog: {
        visible: false,
        title: null,
        status: null,
        rules: {

        }
      },
      petParams: {
        name: null,
        category: null,
        sex: null,
        birthday: null,
        sterilisation: null,
      }
    };
  },
  created() {
    this.userInfo = [];
    if (this.$route.params.userInfo) {
      this.userInfo.push({
        key: "昵称",
        value: this.$route.params.userInfo.nickName
      });
      this.userInfo.push({
        key: "性别",
        value: this.$route.params.userInfo.sex
      });
      this.userInfo.push({
        key: "真实姓名",
        value: this.$route.params.userInfo.realName
      });
      this.userInfo.push({
        key: "手机号码",
        value: this.$route.params.userInfo.mobilePhone
      });
      this.userInfo.push({
        key: "生日",
        value: this.$route.params.userInfo.birthday
      });
      this.userInfo.push({
        key: "地址",
        value: this.$route.params.userInfo.street
      });
      this.userInfo.push({
        key: "会员卡类型",
        value: this.$route.params.userInfo.memShipName
      });
      this.userInfo.push({
        key: "会员卡折扣",
        value: this.$route.params.userInfo.memShipDiscout
      });
      this.userInfo.push({
        key: "会员卡余额",
        value: this.$route.params.userInfo.memShipBalance
      });
      this.userInfo.push({
        key: "会员卡到期日",
        value: this.$route.params.userInfo.memShipExpirationTimeStamp
      });
    }
  },
  methods: {
    tabClick(tab, event) {
      console.log(tab, event);
      if (tab.name === "second") {
        this.getUserPetInfos()
      }
    },
    getUserPetInfos() {
      this.petlist = [];
      this.ifLoading = true;
      var params = {
        userid: this.$route.params.userInfo.id
      };
      getPetInfoByUserId(params).then(response => {
        this.petlist = response;
        this.ifLoading = false;
      });
    },
    editUserInfo() {},
    createPet() {
      this.createPetDialog.visible = true
      this.createPetDialog.title = "新增宠物信息"
      this.createPetDialog.status = "create"
    },
    doCreatePet() {
      var params = this.petParams
      if (params.sterilisation === "true") {
        params.sterilisation = true
      } else {
        params.sterilisation = false
      }
      params.headimgbase64 = ""
      params.userid = this.$route.params.userInfo.id
      console.log(params)
      addPet(params).then(response => {
        this.createPetDialog.visible = false
      })
    },
    updatePet() {},
    doUpdatePet() {},
    deletePet() {}
  }
};
</script>
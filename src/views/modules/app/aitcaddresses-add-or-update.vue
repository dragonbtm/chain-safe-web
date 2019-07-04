<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" label-position="left" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="账户" prop="account">
      <el-input v-model="dataForm.account" placeholder="账户"></el-input>
    </el-form-item>
    <el-form-item label="地址" prop="address">
      <el-input v-model="dataForm.address" placeholder="地址"></el-input>
    </el-form-item>
    <el-form-item label="用户id" prop="userid">
      <el-input v-model="dataForm.userid" placeholder="用户id"></el-input>
    </el-form-item>
    <el-form-item label="资产" prop="number">
      <el-input v-model="dataForm.number" placeholder="资产"></el-input>
    </el-form-item>
    <el-form-item label="生成节点名" prop="node">
      <el-input v-model="dataForm.node" placeholder="生成节点名"></el-input>
    </el-form-item>
    <el-form-item label="同步节点数量" prop="synNumber">
      <el-input v-model="dataForm.synNumber" placeholder="同步节点数量"></el-input>
    </el-form-item>
    <el-form-item label="1.同步完成 2.未完成同步" prop="type">
      <el-input v-model="dataForm.type" placeholder="1.同步完成 2.未完成同步"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="更新时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="更新时间"></el-input>
    </el-form-item>
    <el-form-item label="比特币资产" prop="btc">
      <el-input v-model="dataForm.btc" placeholder="比特币资产"></el-input>
    </el-form-item>
    <el-form-item label="归集状态0.无需归集 1.可以归集 2,归集比特币不足" prop="cStatus">
      <el-input v-model="dataForm.cStatus" placeholder="归集状态0.无需归集 1.可以归集 2,归集比特币不足"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          account: '',
          address: '',
          userid: '',
          number: '',
          node: '',
          synNumber: '',
          type: '',
          createTime: '',
          updateTime: '',
          btc: '',
          cStatus: ''
        },
        dataRule: {
          account: [
            { required: true, message: '账户不能为空', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '地址不能为空', trigger: 'blur' }
          ],
          userid: [
            { required: true, message: '用户id不能为空', trigger: 'blur' }
          ],
          number: [
            { required: true, message: '资产不能为空', trigger: 'blur' }
          ],
          node: [
            { required: true, message: '生成节点名不能为空', trigger: 'blur' }
          ],
          synNumber: [
            { required: true, message: '同步节点数量不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '1.同步完成 2.未完成同步不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
          ],
          btc: [
            { required: true, message: '比特币资产不能为空', trigger: 'blur' }
          ],
          cStatus: [
            { required: true, message: '归集状态0.无需归集 1.可以归集 2,归集比特币不足不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/app/aitcaddresses/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 1) {
                this.dataForm.account = data.aitcaddresses.account
                this.dataForm.address = data.aitcaddresses.address
                this.dataForm.userid = data.aitcaddresses.userid
                this.dataForm.number = data.aitcaddresses.number
                this.dataForm.node = data.aitcaddresses.node
                this.dataForm.synNumber = data.aitcaddresses.synNumber
                this.dataForm.type = data.aitcaddresses.type
                this.dataForm.createTime = data.aitcaddresses.createTime
                this.dataForm.updateTime = data.aitcaddresses.updateTime
                this.dataForm.btc = data.aitcaddresses.btc
                this.dataForm.cStatus = data.aitcaddresses.cStatus
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/app/aitcaddresses/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'account': this.dataForm.account,
                'address': this.dataForm.address,
                'userid': this.dataForm.userid,
                'number': this.dataForm.number,
                'node': this.dataForm.node,
                'synNumber': this.dataForm.synNumber,
                'type': this.dataForm.type,
                'createTime': this.dataForm.createTime,
                'updateTime': this.dataForm.updateTime,
                'btc': this.dataForm.btc,
                'cStatus': this.dataForm.cStatus
              })
            }).then(({data}) => {
              if (data && data.code === 1) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>

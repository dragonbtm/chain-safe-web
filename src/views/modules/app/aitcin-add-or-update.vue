<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" label-position="left" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="交易hash" prop="txid">
      <el-input v-model="dataForm.txid" placeholder="交易hash"></el-input>
    </el-form-item>
    <el-form-item label="个数" prop="amount">
      <el-input v-model="dataForm.amount" placeholder="个数"></el-input>
    </el-form-item>
    <el-form-item label="确认次数" prop="confirmations">
      <el-input v-model="dataForm.confirmations" placeholder="确认次数"></el-input>
    </el-form-item>
    <el-form-item label="账户" prop="account">
      <el-input v-model="dataForm.account" placeholder="账户"></el-input>
    </el-form-item>
    <el-form-item label="标签" prop="label">
      <el-input v-model="dataForm.label" placeholder="标签"></el-input>
    </el-form-item>
    <el-form-item label="地址" prop="address">
      <el-input v-model="dataForm.address" placeholder="地址"></el-input>
    </el-form-item>
    <el-form-item label="blockhash" prop="blockhash">
      <el-input v-model="dataForm.blockhash" placeholder="blockhash"></el-input>
    </el-form-item>
    <el-form-item label="index" prop="blockindex">
      <el-input v-model="dataForm.blockindex" placeholder="index"></el-input>
    </el-form-item>
    <el-form-item label="blocktime" prop="blocktime">
      <el-input v-model="dataForm.blocktime" placeholder="blocktime"></el-input>
    </el-form-item>
    <el-form-item label="时间" prop="time">
      <el-input v-model="dataForm.time" placeholder="时间"></el-input>
    </el-form-item>
    <el-form-item label="接收时间" prop="timereceived">
      <el-input v-model="dataForm.timereceived" placeholder="接收时间"></el-input>
    </el-form-item>
    <el-form-item label="区块" prop="block">
      <el-input v-model="dataForm.block" placeholder="区块"></el-input>
    </el-form-item>
    <el-form-item label="0 未确认  1 交易确认" prop="status">
      <el-input v-model="dataForm.status" placeholder="0 未确认  1 交易确认"></el-input>
    </el-form-item>
    <el-form-item label="0 未发送  1 发送" prop="isSend">
      <el-input v-model="dataForm.isSend" placeholder="0 未发送  1 发送"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="更新时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="更新时间"></el-input>
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
          txid: '',
          amount: '',
          confirmations: '',
          account: '',
          label: '',
          address: '',
          blockhash: '',
          blockindex: '',
          blocktime: '',
          time: '',
          timereceived: '',
          block: '',
          status: '',
          isSend: '',
          createTime: '',
          updateTime: ''
        },
        dataRule: {
          txid: [
            { required: true, message: '交易hash不能为空', trigger: 'blur' }
          ],
          amount: [
            { required: true, message: '个数不能为空', trigger: 'blur' }
          ],
          confirmations: [
            { required: true, message: '确认次数不能为空', trigger: 'blur' }
          ],
          account: [
            { required: true, message: '账户不能为空', trigger: 'blur' }
          ],
          label: [
            { required: true, message: '标签不能为空', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '地址不能为空', trigger: 'blur' }
          ],
          blockhash: [
            { required: true, message: 'blockhash不能为空', trigger: 'blur' }
          ],
          blockindex: [
            { required: true, message: 'index不能为空', trigger: 'blur' }
          ],
          blocktime: [
            { required: true, message: 'blocktime不能为空', trigger: 'blur' }
          ],
          time: [
            { required: true, message: '时间不能为空', trigger: 'blur' }
          ],
          timereceived: [
            { required: true, message: '接收时间不能为空', trigger: 'blur' }
          ],
          block: [
            { required: true, message: '区块不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '0 未确认  1 交易确认不能为空', trigger: 'blur' }
          ],
          isSend: [
            { required: true, message: '0 未发送  1 发送不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/app/aitcin/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 1) {
                this.dataForm.txid = data.aitcin.txid
                this.dataForm.amount = data.aitcin.amount
                this.dataForm.confirmations = data.aitcin.confirmations
                this.dataForm.account = data.aitcin.account
                this.dataForm.label = data.aitcin.label
                this.dataForm.address = data.aitcin.address
                this.dataForm.blockhash = data.aitcin.blockhash
                this.dataForm.blockindex = data.aitcin.blockindex
                this.dataForm.blocktime = data.aitcin.blocktime
                this.dataForm.time = data.aitcin.time
                this.dataForm.timereceived = data.aitcin.timereceived
                this.dataForm.block = data.aitcin.block
                this.dataForm.status = data.aitcin.status
                this.dataForm.isSend = data.aitcin.isSend
                this.dataForm.createTime = data.aitcin.createTime
                this.dataForm.updateTime = data.aitcin.updateTime
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
              url: this.$http.adornUrl(`/app/aitcin/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'txid': this.dataForm.txid,
                'amount': this.dataForm.amount,
                'confirmations': this.dataForm.confirmations,
                'account': this.dataForm.account,
                'label': this.dataForm.label,
                'address': this.dataForm.address,
                'blockhash': this.dataForm.blockhash,
                'blockindex': this.dataForm.blockindex,
                'blocktime': this.dataForm.blocktime,
                'time': this.dataForm.time,
                'timereceived': this.dataForm.timereceived,
                'block': this.dataForm.block,
                'status': this.dataForm.status,
                'isSend': this.dataForm.isSend,
                'createTime': this.dataForm.createTime,
                'updateTime': this.dataForm.updateTime
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

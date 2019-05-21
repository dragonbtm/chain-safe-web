<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" label-position="left" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="" prop="txid">
      <el-input v-model="dataForm.txid" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="amount">
      <el-input v-model="dataForm.amount" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="confirmations">
      <el-input v-model="dataForm.confirmations" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="account">
      <el-input v-model="dataForm.account" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="label">
      <el-input v-model="dataForm.label" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="address">
      <el-input v-model="dataForm.address" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="blockhash">
      <el-input v-model="dataForm.blockhash" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="blockindex">
      <el-input v-model="dataForm.blockindex" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="blocktime">
      <el-input v-model="dataForm.blocktime" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="time">
      <el-input v-model="dataForm.time" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="timereceived">
      <el-input v-model="dataForm.timereceived" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="date">
      <el-input v-model="dataForm.date" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="block">
      <el-input v-model="dataForm.block" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="0 未确认  1 交易确认" prop="status">
      <el-input v-model="dataForm.status" placeholder="0 未确认  1 交易确认"></el-input>
    </el-form-item>
    <el-form-item label="0 未发送  1 发送" prop="isSend">
      <el-input v-model="dataForm.isSend" placeholder="0 未发送  1 发送"></el-input>
    </el-form-item>
    <el-form-item label="" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder=""></el-input>
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
          date: '',
          block: '',
          status: '',
          isSend: '',
          createTime: '',
          updateTime: ''
        },
        dataRule: {
          txid: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          amount: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          confirmations: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          account: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          label: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          blockhash: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          blockindex: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          blocktime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          time: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          timereceived: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          date: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          block: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '0 未确认  1 交易确认不能为空', trigger: 'blur' }
          ],
          isSend: [
            { required: true, message: '0 未发送  1 发送不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/app/usdtin/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 1) {
                this.dataForm.txid = data.usdtin.txid
                this.dataForm.amount = data.usdtin.amount
                this.dataForm.confirmations = data.usdtin.confirmations
                this.dataForm.account = data.usdtin.account
                this.dataForm.label = data.usdtin.label
                this.dataForm.address = data.usdtin.address
                this.dataForm.blockhash = data.usdtin.blockhash
                this.dataForm.blockindex = data.usdtin.blockindex
                this.dataForm.blocktime = data.usdtin.blocktime
                this.dataForm.time = data.usdtin.time
                this.dataForm.timereceived = data.usdtin.timereceived
                this.dataForm.date = data.usdtin.date
                this.dataForm.block = data.usdtin.block
                this.dataForm.status = data.usdtin.status
                this.dataForm.isSend = data.usdtin.isSend
                this.dataForm.createTime = data.usdtin.createTime
                this.dataForm.updateTime = data.usdtin.updateTime
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
              url: this.$http.adornUrl(`/app/usdtin/${!this.dataForm.id ? 'save' : 'update'}`),
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
                'date': this.dataForm.date,
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

<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" label-position="left" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="发送id" prop="sendId">
      <el-input v-model="dataForm.sendId" placeholder="发送id"></el-input>
    </el-form-item>
    <el-form-item label="账户" prop="account">
      <el-input v-model="dataForm.account" placeholder="账户"></el-input>
    </el-form-item>
    <el-form-item label="hash值" prop="hash">
      <el-input v-model="dataForm.hash" placeholder="hash值"></el-input>
    </el-form-item>
    <el-form-item label="金额" prop="amount">
      <el-input v-model="dataForm.amount" placeholder="金额"></el-input>
    </el-form-item>
<!--    <el-form-item label="确认次数" prop="confirmations">-->
<!--      <el-input v-model="dataForm.confirmations" placeholder="确认次数"></el-input>-->
<!--    </el-form-item>-->
    <el-form-item label="发送方" prop="fromaddress">
      <el-input v-model="dataForm.fromaddress" placeholder="发送方"></el-input>
    </el-form-item>
    <el-form-item label="接收方" prop="toaddress">
      <el-input v-model="dataForm.toaddress" placeholder="接收方"></el-input>
    </el-form-item>
 <!--   <el-form-item label="备注" prop="label">
      <el-input v-model="dataForm.label" placeholder="备注"></el-input>
    </el-form-item>
    <el-form-item label="时间" prop="time">
      <el-input v-model="dataForm.time" placeholder="时间"></el-input>
    </el-form-item>
    <el-form-item label="接收时间" prop="timereceived">
      <el-input v-model="dataForm.timereceived" placeholder="接收时间"></el-input>
    </el-form-item>
    <el-form-item label="块" prop="block">
      <el-input v-model="dataForm.block" placeholder="块"></el-input>
    </el-form-item>-->
    <el-form-item label="状态" prop="status">
      <el-select v-model="dataForm.status" style="width: 100%;" placeholder="请选择状态">
      <el-option label="处理失败" :value="0"/>
      <el-option label="转账成功" :value="1"/>
      <el-option label="比特币不足" :value="2"/>
      <el-option label="转账失败" :value="3"/>
      </el-select>
    </el-form-item>
    <el-form-item label="消息状态" prop="isSend">
      <el-select v-model="dataForm.isSend" style="width: 100%;" placeholder="请选择消息状态">
        <el-option label="消息未发送" :value="0"/>
        <el-option label="消息已发送" :value="1"/>
      </el-select>
    </el-form-item>
    <el-form-item v-if="false" label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item v-if="false" label="更新时间" prop="updateTime">
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
  import { formatTime } from '../../../utils'

  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          sendId: '',
          account: '',
          hash: '',
          amount: '',
          // confirmations: '',
          fromaddress: '',
          toaddress: '',
          // label: '',
          // time: '',
          // timereceived: '',
          // block: '',
          status: '',
          isSend: '',
          createTime: '',
          updateTime: ''
        },
        dataRule: {
          sendId: [
            { required: true, message: '发送id不能为空', trigger: 'blur' }
          ],
          account: [
            { required: true, message: '账户不能为空', trigger: 'blur' }
          ],
          hash: [
            { required: true, message: 'hash值不能为空', trigger: 'blur' }
          ],
          amount: [
            { required: true, message: '金额不能为空', trigger: 'blur' }
          ],
          // confirmations: [
          //   { required: true, message: '确认次数不能为空', trigger: 'blur' }
          // ],
          fromaddress: [
            { required: true, message: '发送方不能为空', trigger: 'blur' }
          ],
          toaddress: [
            { required: true, message: '接收方不能为空', trigger: 'blur' }
          ],
          // label: [
          //   { required: true, message: '备注不能为空', trigger: 'blur' }
          // ],
          // time: [
          //   { required: true, message: '时间不能为空', trigger: 'blur' }
          // ],
          // timereceived: [
          //   { required: true, message: '接收时间不能为空', trigger: 'blur' }
          // ],
          // block: [
          //   { required: true, message: '块不能为空', trigger: 'blur' }
          // ],
          status: [
            { required: true, message: '状态0.处理失败 1.转账成功 2.比特币不足 3.转账失败不能为空', trigger: 'blur' }
          ],
          isSend: [
            { required: true, message: '0.消息未发送 1.消息已发送不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/app/transactions/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 1) {
                this.dataForm.sendId = data.transactions.sendId
                this.dataForm.account = data.transactions.account
                this.dataForm.hash = data.transactions.hash
                this.dataForm.amount = data.transactions.amount
                // this.dataForm.confirmations = data.transactions.confirmations
                this.dataForm.fromaddress = data.transactions.fromaddress
                this.dataForm.toaddress = data.transactions.toaddress
                // this.dataForm.label = data.transactions.label
                // this.dataForm.time = data.transactions.time
                // this.dataForm.timereceived = data.transactions.timereceived
                // this.dataForm.block = data.transactions.block
                this.dataForm.status = data.transactions.status
                this.dataForm.isSend = data.transactions.isSend
                this.dataForm.createTime = data.transactions.createTime
                this.dataForm.updateTime = formatTime()
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
              url: this.$http.adornUrl(`/app/transactions/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'sendId': this.dataForm.sendId,
                'account': this.dataForm.account,
                'hash': this.dataForm.hash,
                'amount': this.dataForm.amount,
                // 'confirmations': this.dataForm.confirmations,
                'fromaddress': this.dataForm.fromaddress,
                'toaddress': this.dataForm.toaddress,
                // 'label': this.dataForm.label,
                // 'time': this.dataForm.time,
                // 'timereceived': this.dataForm.timereceived,
                // 'block': this.dataForm.block,
                'status': this.dataForm.status,
                'isSend': this.dataForm.isSend,
                'createTime': this.dataForm.createTime ? this.dataForm.createTime : formatTime(),
                'updateTime': formatTime()
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

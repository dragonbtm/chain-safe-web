<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" label-position="left" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="节点名字" prop="name">
      <el-input v-model="dataForm.name" placeholder="节点名字"></el-input>
    </el-form-item>
    <el-form-item label="类型1.充币 2.提币 ,3分发比特币" prop="type">
      <el-input v-model="dataForm.type" placeholder="类型1.充币 2.提币 ,3分发比特币"></el-input>
    </el-form-item>
    <el-form-item label="用户" prop="rpcuser">
      <el-input v-model="dataForm.rpcuser" placeholder="用户"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="rpcpassword">
      <el-input v-model="dataForm.rpcpassword" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item label="ip" prop="ip">
      <el-input v-model="dataForm.ip" placeholder="ip"></el-input>
    </el-form-item>
    <el-form-item label="端口" prop="port">
      <el-input v-model="dataForm.port" placeholder="端口"></el-input>
    </el-form-item>
    <el-form-item label="状态1.正常 2.异常" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态1.正常 2.异常"></el-input>
    </el-form-item>
    <el-form-item label="总地址" prop="address">
      <el-input v-model="dataForm.address" placeholder="总地址"></el-input>
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
          name: '',
          type: '',
          rpcuser: '',
          rpcpassword: '',
          ip: '',
          port: '',
          status: '',
          address: '',
          createTime: '',
          updateTime: ''
        },
        dataRule: {
          name: [
            { required: true, message: '节点名字不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '类型1.充币 2.提币 ,3分发比特币不能为空', trigger: 'blur' }
          ],
          rpcuser: [
            { required: true, message: '用户不能为空', trigger: 'blur' }
          ],
          rpcpassword: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ],
          ip: [
            { required: true, message: 'ip不能为空', trigger: 'blur' }
          ],
          port: [
            { required: true, message: '端口不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态1.正常 2.异常不能为空', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '总地址不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/app/nodemanage/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 1) {
                this.dataForm.name = data.nodemanage.name
                this.dataForm.type = data.nodemanage.type
                this.dataForm.rpcuser = data.nodemanage.rpcuser
                this.dataForm.rpcpassword = data.nodemanage.rpcpassword
                this.dataForm.ip = data.nodemanage.ip
                this.dataForm.port = data.nodemanage.port
                this.dataForm.status = data.nodemanage.status
                this.dataForm.address = data.nodemanage.address
                this.dataForm.createTime = data.nodemanage.createTime
                this.dataForm.updateTime = data.nodemanage.updateTime
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
              url: this.$http.adornUrl(`/app/nodemanage/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'name': this.dataForm.name,
                'type': this.dataForm.type,
                'rpcuser': this.dataForm.rpcuser,
                'rpcpassword': this.dataForm.rpcpassword,
                'ip': this.dataForm.ip,
                'port': this.dataForm.port,
                'status': this.dataForm.status,
                'address': this.dataForm.address,
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

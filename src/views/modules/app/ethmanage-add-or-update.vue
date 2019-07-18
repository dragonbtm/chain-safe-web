<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" label-position="left" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="节点名字" prop="name">
      <el-input v-model="dataForm.name" placeholder="节点名字"></el-input>
    </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="dataForm.type" style="width: 100%;" placeholder="请选择状态">
          <el-option label="充币" :value="1"/>
          <el-option label="提币" :value="2"/>
          <el-option label="充币shadow" :value="4"/>
        </el-select>
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
    <el-form-item label="状态" prop="status">
        <el-select v-model="dataForm.status" style="width: 100%;" placeholder="请选择状态">
          <el-option label="启动" :value="1"/>
          <el-option label="停用" :value="2"/>
          <el-option label="异常" :value="3"/>
        </el-select>
    </el-form-item>
    <el-form-item label="总地址" prop="address">
      <el-input v-model="dataForm.address" placeholder="总地址"></el-input>
    </el-form-item>
    <el-form-item label="合约地址" prop="coinaddress">
      <el-input v-model="dataForm.coinaddress" placeholder="总地址"></el-input>
    </el-form-item>
      <el-form-item label="keystore" prop="keystore">
        <el-input v-model="dataForm.keystore" placeholder="keystore" readonly ></el-input>
      </el-form-item>
      <el-form-item label="keystorepassword" prop="keystorepassword">
        <el-input v-model="dataForm.keystorepassword" placeholder="keystorepassword"></el-input>
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
            { required: true, message: '类型1.充币 2.提币 ,3分发比特币 4.充币shadow不能为空', trigger: 'blur' }
          ],
          rpcuser: [
            { required: false, message: '用户不能为空', trigger: 'blur' }
          ],
          rpcpassword: [
            { required: false, message: '密码不能为空', trigger: 'blur' }
          ],
          ip: [
            { required: true, message: 'ip不能为空', trigger: 'blur' }
          ],
          port: [
            { required: true, message: '端口不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态1.启动 2.停用 3,异常不能为空', trigger: 'blur' }
          ],
          address: [
            { required: false, message: '总地址不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/app/ethmanage/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 1) {
                console.log(data)
                this.dataForm.name = data.ethManage.name
                this.dataForm.type = data.ethManage.type
                this.dataForm.rpcuser = data.ethManage.rpcuser
                this.dataForm.rpcpassword = data.ethManage.rpcpassword
                this.dataForm.ip = data.ethManage.ip
                this.dataForm.port = data.ethManage.port
                this.dataForm.status = data.ethManage.status
                this.dataForm.address = data.ethManage.address
                this.dataForm.coinaddress = data.ethManage.coinaddress
                this.dataForm.keystore = data.ethManage.keystore
                this.dataForm.keystorepassword = data.ethManage.keystorepassword
                this.dataForm.createTime = data.ethManage.createTime
                this.dataForm.updateTime = data.ethManage.updateTime
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
              url: this.$http.adornUrl(`/app/ethmanage/${!this.dataForm.id ? 'save' : 'update'}`),
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
                'coinaddress': this.dataForm.coinaddress,
                'keystorepassword': this.dataForm.keystorepassword,
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

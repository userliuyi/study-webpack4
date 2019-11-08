<template>
  <div class="login-div">
    <div
      class="m-login"
      @keyup.enter="onSubmit"
    >
      <div class="m-login-title">
        <span style="font-size:36px;">Sur System</span>
      </div>
      <el-form
        ref="loginForm"
        :rules="rules"
        :model="form"
      >
        <el-form-item prop="username">
          <!--<el-input v-model.trim="form.username" :placeholder="$t('explain.email')"></el-input>-->
          <el-input
            v-model.trim="form.username"
            autofocus="autofocus" 
            placeholder="请输入账号名"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
          />
        </el-form-item>
        <div class="m-login-remember">
          <el-checkbox v-model="rememberPwd">
            记住账号
          </el-checkbox>
        </div>
        <el-form-item>
          <el-button
            type="primary"
            :loading="loading"
            style="width:100%"
            @click="onSubmit"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss">
</style>


<script>
import md5 from 'md5';
//import mToken from 'utils/mToken.js';

export default {

    name: 'Login',

    components: {},

    data () {
        let userPwd = JSON.parse(localStorage.getItem('userPwd') || '{}');
        return {
            loading: false,
            form: {
                username: userPwd.username,
                password: userPwd.password,
            },
            rememberPwd: false,
            isValid: true,
            rules: {
                username: [
                    // { validator: this.validateEmail, required: true, message: this.$t('message.inputEmail'), trigger: 'blur' }
                    { required: true, message: '请输入账号名', trigger: 'blur,change' }
                ],
                password: [
                    { required: true, message:  '请输入密码', trigger: 'blur,change' }
                ]
            },
            ukeyId: '',
        };
    },

    computed: {},

    watch: {
    },

    mounted () {
    },

    methods: {
        onSubmit () {
            this.$refs.loginForm.validate((valid) => {
                let time = (new Date()).getTime();
                let rand = parseInt(Math.random()*10000);
                this.isValid = valid;
                if (valid) {
                        var reg = /\w+(\+\d+|\-\d+)/; // eslint-disable-line
                    // 获取时区
                    var timeZone = 'GMT' + reg.exec(new Date().toString())[1];
                    this.loading = true;
                    this.$http({
                        url: '/skynet/login',
                        data: {
                            username: this.form.username,
                            credentials: md5(md5(this.form.username + this.form.password) + time + rand),
                            _time: time,
                            _rand: rand,
                            timeZone: timeZone,
                            ukeyId: this.ukeyId,
                        },
                        method: 'POST',
                    }).then((result) => {
                        this.loading = false;
                        if (result && result.code == 0) {
                            if (this.rememberPwd) {
                                this.savePwd();
                            } else {
                                this.clearPwd();
                            }
                            this.$store.dispatch('user/fetchUserInfo').then(() => {
                                this.$router.push({
                                    path: '/dashboard',
                                });
                            },() => {
                                this.$router.push({
                                    path: '/login',
                                });
                            });

                        } else if (result.code == 8) { // 判断为是否为需要使用ukey的账号，如何返回的提示信息的code为8，则该账号需要ukey登录。
                            //this.enumDevice();
                        } else {
                            this.$message({
                                type: 'warning',
                                message:  result.msg
                            });
                        }
                    }).catch((result) => {
                        this.loading = false;
                        this.$message({
                            type: 'warning',
                            message:  result.msg
                        });
                    });
                } else {
                    return false;
                }
            });
        },
        validateEmail (rule, value, cb) {
            if (value === '' || !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
                cb(new Error(this.$t('message.inputEmail')));
            } else {
                cb();
            }

        },
        savePwd () {
            let userPwd = JSON.parse(localStorage.getItem('userPwd') || '{}');
            userPwd.username = this.form.username;
            userPwd.password = this.form.password;
            localStorage.setItem('userPwd', JSON.stringify(userPwd));
        },
        clearPwd () {
            localStorage.removeItem('userPwd');
        },
        //枚举当前ukey设备，获取ukeyId
        // enumDevice() {
        //     var token = new mToken('mTokenPlugin');
        //     var ret = token.SOF_LoadLibrary(token.GM3000);//K7"/"TF"/K5/"GM3000PCSC"/"GM3000"
        //     if(ret != 0) {
        //         this.ukeyId = '';
        //         this.$message.warning('Please install the ukey driver and plugin first');
        //         return ;
        //     }
        //     var deviceName = token.SOF_EnumDevice();
        //     // console.log(deviceName)
        //     if(deviceName != null) {
        //         this.ukeyId = deviceName[0];
        //         // 如果已经插入了ukey,直接登录
        //         this.onSubmit();
        //         // obj('ukeyId').value = deviceName[0];
        //     }else{
        //         this.ukeyId = '';
        //         this.$message.warning('Please insert ukey!');
        //         return;
        //     }
        // },
    }

};

</script>

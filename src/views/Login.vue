<template>
  <el-form
    :model="loginParam"
    :rules="rules"
    ref="ruleRef"
    class="loginContainer">
    <el-form-item>
      <h3 class="loginTitle">系统登录</h3>
    </el-form-item>
    <el-form-item prop="username">
      <el-input
        type="text"
        v-model="loginParam.username"
        placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        type="password"
        v-model="loginParam.password"
        placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-input
        type="text"
        v-model="loginParam.code"
        placeholder="点击图片，更换验证码"
        style="width: 220px; margin-right: 5px"></el-input>
      <img :src="captchUrl" @click="flushImg" style="cursor: pointer" />
    </el-form-item>
    <el-form-item>
      <el-checkbox label="记住我" v-model="loginParam.remeberMe" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="loginReq">登录</el-button>
      <el-button type="primary" @click="register">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { login } from '../api/login';
import { useRouter } from 'vue-router';
import { useStore } from '../store/index';
const router = useRouter();
const store = useStore();
const loginParam = reactive({
  username: '',
  password: '',
  code: '',
  remeberMe: false,
});
const rules = reactive({
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 8, max: 16, message: '密码长度要在8-16位之间', trigger: 'blur' },
  ],
  code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
});
const ruleRef = ref();
const loginReq = () => {
  if (!ruleRef) return;
  ruleRef.value.validate(async valid => {
    if (valid) {
      const resp = await login(loginParam, 'post');
      if (resp.respEnum.code === 200) {
        ElMessage({
          message: '登录成功',
          type: 'success',
        });
        store.addTokenHeader(resp.obj.tokenHeader);
        store.addAuthorization(resp.obj.token);
        localStorage.setItem(resp.obj.tokenHeader, resp.obj.token);
        router.push('/index');
      }
    } else {
      ElMessage({
        message: '请输入所有字段',
        type: 'warning',
      });
      return false;
    }
  });
};
const register = () => {};
const BASE_URL = import.meta.env.VITE_BASE_API_URL + '/captcha?time=';
const captchUrl = ref('');
const flushImg = async () => {
  captchUrl.value = BASE_URL + new Date().getTime();
};
onMounted(() => {
  flushImg();
});
</script>

<style scoped>
.loginContainer {
  border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.loginTitle {
  font-size: 25px;
  text-align: center;
  margin: 0 auto 20px auto;
}
</style>

<template>
  <el-form
    :model="loginParam"
    :rules="rules"
    ref="ruleRef"
    class="loginContainer"
  >
    <el-form-item>
      <h3 class="loginTitle">系统登录</h3>
    </el-form-item>
    <el-form-item prop="username">
      <el-input
        type="text"
        v-model="loginParam.username"
        placeholder="请输入用户名"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        type="password"
        v-model="loginParam.password"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-input
        type="text"
        v-model="loginParam.code"
        placeholder="点击图片，更换验证码"
        style="width: 250px; margin-right: 5px"
      ></el-input>
      <img :src="loginParam.captchUrl"  @click="flushImg"/>
    </el-form-item>
    <el-form-item>
      <el-checkbox label="记住我" v-model="checked" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
      <el-button type="primary" @click="register">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import {loadCode, login} from "../api/login"
import { router } from "vue-router";
const loginParam = reactive({
  username: "",
  password: "",
  code: "",
  captchUrl: "",
});
const checked = false;
const rules = reactive({
  username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { min: 8, max: 16, message: "密码长度要在8-16位之间", trigger: "blur" },
  ],
  code: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
});
const ruleRef = ref();
const login = () => {
  if (!ruleRef) return;
  ruleRef.value.validate((valid) => {
    if (valid) {
      login(loginParam, "post").then(resp => {
        router.push("/index");
      }, error =>{
        console.log(error);
      })
      ElMessage({
        message: "登录成功",
        type: "success",
      });
    } else {
      ElMessage({
        message: "请输入所有字段",
        type: "warning",
      });
      return false;
    }
  });
};
const register = () => {};
const flushImg = () => {
  loadCode('get').then(res => {
    loginParam.captchUrl = res.data
  }).catch(error => {
    console.log(error);
  })
}
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

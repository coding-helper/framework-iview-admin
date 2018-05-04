<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">输入任意用户名和密码即可</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import util from '@/libs/util.js';
import Cookies from 'js-cookie';
import config from '@/config/config.js';

export default {
    data () {
        return {
            form: {
                userName: 'iview_admin',
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                ]
            }
        };
    },
    methods: {
        handleSubmit () {
            let _self = this;
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    let loginInfo = {
                        username: this.form.userName,
                        password: require('node-sha1')(this.form.password),
                    };
                    console.log(config);
                    if(config.skipLogin) {
                        Cookies.set('user', loginInfo.username);
                        Cookies.set('token', loginInfo.password);
                        this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                        this.$store.commit('setPermissions', {"isAdmin": "1"});
                        _self.$router.push({
                            name: 'home_index',
                        });
                        return;
                    }
                    util.ajax.post('/system/login', loginInfo).then(res => {
                        if (res.status === 200) {
                            if (res.data.code === '0') {
                                Cookies.set('user', this.form.userName);
                                Cookies.set('token', res.data.content.token);
                                _self.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                                if (res.data.content.permissions) {
                                    _self.$store.commit('setPermissions', res.data.content.permissions);
                                    //_self.$store.commit('setPermissions', {"isAdmin": "1", "menuPermissions": [1010, 1020, 1030, 1040, 1050, 1060, 1070, 1080, 1090, 1100, 1110, 1120, 1130], "optPermissions": [2, 3]});
                                } else {
                                    _self.$store.commit('setPermissions', {"isAdmin": "1"});
                                }
                                _self.$router.push({
                                    name: 'home_index',
                                });
                            } else {
                                this.$Message.error('用户名密码错误！');
                            }
                        }
                    }).catch (err => {
                        this.$Message.error(err.toString());
                        console.log(err);
                    });
                }
            });
        }
    }
};
</script>

<style>

</style>

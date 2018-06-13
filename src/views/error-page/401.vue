<style lang="less">
    @import './401.less';
</style>

<template>
    <div class="error401">
        <div class="error401-body-con">
            <Card>
                <div class="error401-body-con-title">4<span class="error401-0-span"><Icon type="sad-outline"></Icon></span>1</div>
                <p class="error401-body-con-message">LOGIN&nbsp;&nbsp;TIMEOUT</p>
                <div class="error401-btn-con">
                    <Button @click="goLogin" size="large" style="width: 200px;margin-left: 40px;" type="primary">重新登录</Button>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Error401',
    methods: {
        goLogin () {
            this.$router.push({
                name: 'login'
            });
        }
    }
};
</script>

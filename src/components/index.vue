<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 460px;
    margin: 0 auto;
    margin-right:20px;
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            Item 1
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            Item 2
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            Item 3
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            Item 4
                        </MenuItem>
                        <Button type="primary" @click="loginOut">退出</Button>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                <span>订单中心</span>
                            </template>
                            <MenuItem name="1-1"><router-link to="/order_list">订单列表</router-link></MenuItem>
                            <MenuItem name="1-2"><router-link to="/chem_list">商品列表</router-link></MenuItem>
                            <MenuItem name="1-3">结算管理</MenuItem>
                            <MenuItem name="1-4">开票管理</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                <span>系统管理</span>
                            </template>
                            <MenuItem name="2-1">系统用户</MenuItem>
                            <MenuItem name="2-2">系统角色</MenuItem>
                            <MenuItem name="2-3">系统权限</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                <span>供应商管理</span>
                            </template>
                            <MenuItem name="3-1">供应商列表</MenuItem>
                            <MenuItem name="3-2">商品管理</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem>订单中心</BreadcrumbItem>
                        <BreadcrumbItem>订单列表</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '575px', background: '#fff'}">
                        <router-view></router-view>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import API from '@/api/api_user.js'
    
    export default {
        methods:{
        	loginOut(){
        		API.loginOut().then((result)=>{
        			if (result.status == 1) {
        				this.$router.push('/login')
        			} 
        			this.$Message.success(result.message)
        		}, (err)=>{
        			this.$Message.error(err)
        		})
        	}
        }
    }
</script>
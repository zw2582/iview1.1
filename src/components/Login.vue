<style>
.loginForm{
	width:200px;
	margin:auto;
	margin-top:100px;
}
</style>
<template>
	<div class="loginForm">
		<Form class="loginForm" ref="formInline" :model="formInline" :rules="ruleInline">
			<FormItem prop="username">
				<Input type="text" v-model="formInline.username" placeholder="">
					<Icon type="ios-person-outline" slot="prepend"></Icon>
				</Input>
			</FormItem>
			
			<FormItem prop="password">
				<Input type="password" v-model="formInline.password">
					<Icon type="ios-locked-outline" slot="prepend"></Icon>
				</Input>
			</FormItem>
			
			<FormItem>
				<Button type="primary" @click="handleSubmit('formInline')">登录</Button>
			</FormItem>
		</Form>
	</div>
</template>

<script>
import API from '@/api/api_user.js'
export default{
	data(){
		return {
			formInline:{
				username:'',
				password:'',
				rememberMe:1
			},
			ruleInline:{
				username:[
					{required: true, message:'请输入用户名',trigger:'blur'}
				],
				password:[
					{required:true, message:'请输入密码',trigger:'blur'},
					{type:'string',min:6,max:20,message:'密码长度不能少于6个字符或超过20个字符',trigger:'blur'},
				]
			}
		}
	},
	methods:{
		handleSubmit(name) {
			let that = this;
			this.$refs[name].validate((valid)=>{
				if (valid) {
					API.login(this.formInline).then(function(result){
						if (result.status == 1) {
							that.$Message.success('登录成功');
							that.$router.push('/index')
						} else {
							that.$Message.error(result.message);
						}
					},function(error){
						that.$Message.error(error);
					})
				} else {
					this.$Message.error('参数校验失败!');
				}
			})
		}
	}
}
</script>
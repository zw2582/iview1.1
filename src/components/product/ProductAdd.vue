<template>
	<Poptip placement="top-start" width="550" :transfer="true" title="添加商品">
			<Button type="primary">新增</Button>
			<div class="product_add" slot="content">
				<Form ref="proAdd" :label-width="80" :model="addform" :rules="ruleProAdd">
					<FormItem prop="number" label="商品编号">
						<Input v-model="addform.number" placeholder="P00001"/>
					</FormItem>
					<FormItem prop="name" label="商品名称">
						<Input v-model="addform.name" placeholder="底裤"/>
					</FormItem>
					<FormItem label="图片">
						<ImageUpload ref="imgUpload"></ImageUpload>
					</FormItem>
					<FormItem label="描述">
						<Input v-model="addform.description" type="textarea" :autosize="{minRows:2,maxRows:5}" placeholder="为您的商品来个美美的描述"/>
					</FormItem>
					<FormItem>
						<Button @click="productAdd" type="primary">新增</Button>
						<Button type="ghost" style="margin-left:25px">取消</Button>
						<Button @click="handleTest">测试</Button>
					</FormItem>
				</Form>
			</div>
		</Poptip>
</template>

<script>
import API from '@/api/api_product.js'
import ImageUpload from './ImageUpload'
export default{
	components:{ImageUpload},
	data(){
		return {
			addform:{
				name:'',
				number:'',
				description:''
			},
			ruleProAdd:{
				name:[
					{required:true,message:'请输入商品名称',trigger:'blur'}
				],
				number:[
					{required:true,message:'请输入商品编号',trigger:'blur'}
				]
			},
		}
	},
	methods:{
		productAdd() {
			let that = this;
			this.$refs['proAdd'].validate((valid)=>{
				let params = this.addform;
				//获取图片数据
				let fileList = this.$refs.imgUpload.uploadList;
				if (fileList.length > 0) {
					params.images = []
					fileList.forEach(function(file, k){
						params.images.push({'save_path':file.deep_path,'save_name':file.save_name,'real_name':file.real_name})
					})
				}
				if(valid) {
					API.add(params).then(function(result){
						if (result.status == 1) {
							that.$Message.success(result.message)
							that.$emit('on-add-success', result.message)
						} else {
							that.$Message.error(result.message)
						}
					},function(err){
						that.$message.error(err)
					})
				} else {
					that.$Message.error('参数校验失败')
				}
			})
		},
		handleTest() {
			let fileList = this.$refs.imgUpload.uploadList;
			console.log(fileList)
		}
	}
}
</script>
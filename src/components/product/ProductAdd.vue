<style>
.table_package tr td {
	text-align:center;
}
</style>
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
					<FormItem prop="price" label="价格">
						<InputNumber type="text" :max="1000000" placeholder="0.0" v-model="addform.price"/>
					</FormItem>
					<FormItem label="图片">
						<ImageUpload ref="imgUpload"></ImageUpload>
					</FormItem>
					<FormItem label="描述">
						<Input v-model="addform.description" type="textarea" :autosize="{minRows:2,maxRows:5}" placeholder="为您的商品来个美美的描述"/>
					</FormItem>
					<FormItem label="规格">
						<table v-if="packages.length>0" class="table_package" border="1px">
							<tr>
								<td>规格类型</td>
								<td>规格值</td>
								<td>价格</td>
								<td>数量</td>
								<td>操作</td>
							</tr>
							<tr v-for="item in packages">
								<td>
									<AutoComplete v-model="item.package_type" clearable :data="packageTypes"
										placeholder="颜色"/>
								</td>
								<td><Input placeholder="红色" v-model="item.package"/></td>
								<td><InputNumber :max="1000000" placeholder="0.0" v-model="item.price"/></td>
								<td><InputNumber :max="10000" placeholder="1" v-model="item.count"/></td>
								<td><Icon size="25" type="ios-minus-outline" @click.native="packageRemove(item)"></Icon></td>
							</tr>
						</table>
						<Button type="ghost" @click="addPackage">添加规格</Button>
					</FormItem>
					<FormItem>
						<Button @click="productAdd" type="primary">新增</Button>
						<Button type="ghost" style="margin-left:25px">取消</Button>
						<Button type="ghost" @click="handleTest" style="margin-left:25px">test</Button>
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
				price:'',
				description:''
			},
			ruleProAdd:{
				name:[
					{required:true,message:'请输入商品名称',trigger:'blur'},
					{type:"string",max:64,message:'商品名称长度不能超过32',trigger:'blur'}
				],
				number:[
					{required:true,message:'请输入商品编号',trigger:'blur'},
					{type:"string",max:32,message:'商品编号长度不能超过32',trigger:'blur'}
				]
			},
			packages:[],
			packageTypes:[]
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
				//获取规格数据
				if (this.packages.length>0){
					params.packages=[]
					this.packages.forEach(function(pack, k){
						params.packages.push(pack)
					})
				}
				if(valid) {
					API.add(params).then(function(result){
						if (result.status == 1) {
							that.$Notice.success({'title':result.message})
							that.$emit('on-add-success', result.message)
						} else {
							that.$Notice.error({'title':'添加商品错误','desc':result.message})
						}
					},function(err){
						that.$message.error(err)
					})
				} else {
					that.$Notice.error({'title':'参数校验失败'})
				}
			})
		},
		addPackage() {
			if (this.packages.length > 0){
				let prePackage = this.packages[this.packages.length-1]
				if (this.packageTypes.indexOf(prePackage.package_type) == -1) {
					this.packageTypes.push(prePackage.package_type)
				}
			}
			this.packages.push({'package':'','package_type':'','price':'','count':1});
		},
		packageRemove(item) {
			this.packages.splice(this.packages.indexOf(item), 1);
		},
		listPackageType() {
			let that = this
			API.listPackageType().then(function(res){
				if(res.status == 1){
					that.$set(that, 'packageTypes', res.data)
				}
			}) 
		},
		handleTest() {
			console.log(this.addform)
		}
	},
	mounted(){
		this.listPackageType()
	}
}
</script>
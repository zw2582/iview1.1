<style>
.page{
float:right;
}
</style>
<template>
	<div>
		<Form :label-width="80" inline>
			<FormItem label="商品编号">
				<Input v-model="search.number"></Input>
			</FormItem>
			<FormItem>
				<Button @click="chemList()" type="primary">搜索</Button>
				<input class="ivu-btn" type="reset"></input>
				<Button @click="chemList()">刷新</Button>
			</FormItem>
		</Form>
		
		<Table ref="chemList" size="large" :loading="loading" :columns="column" :data="data"></Table>
		<Poptip placement="right-start" width="450" :transfer="true" title="添加商品">
			<Button type="primary">新增</Button>
			<div class="product_add" slot="content">
				<Form ref="proAdd" :label-width="80" :model="addform" :rules="ruleProAdd">
					<FormItem prop="number" label="商品编号">
						<Input v-model="addform.number" placeholder="P00001"/>
					</FormItem>
					<FormItem prop="name" label="商品名称">
						<Input v-model="addform.name" placeholder="底裤"/>
					</FormItem>
					<FormItem label="描述">
						<Input v-model="addform.description" type="textarea" :autosize="{minRows:2,maxRows:5}" placeholder="为您的商品来个美美的描述"/>
					</FormItem>
					<FormItem>
						<Button @click="productAdd" type="primary">新增</Button>
						<Button type="ghost" style="margin-left:25px">取消</Button>
					</FormItem>
				</Form>
			</div>
		</Poptip>
		
		<Page class="page" :total="total" show-sizer show-elevator 
			show-total @on-change="pageChange" @on-page-size-change="sizeChange"></Page>
	</div>
</template>

<script>
import API from '@/api/api_product.js'
const merge = require('webpack-merge')
export default{
	data(){
		return {
			loading:false,
			page:1,
			size:5,
			total:0,
			search:{
				number:''
			},
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
			column:[{
				type:'selection',
				width:60,
				align:'center'
			},{
				title:'商品编号',
				key:'number'
			},{
				title:'商品名称',
				key:'name'
			},{
				title:'上下架',
				key:'status'
			},{
				title:'创建人',
				key:'username'
			},{
				title:'创建时间',
				key:'create_time'
			},{
				title:'操作',
				key:'stock_time'
			}],
			data:[]
		}
	},
	methods: {
		chemList() {
			let that = this;
			that.$set(that, 'loading', true)
			let params={
				page:that.page,
				size:that.size
			}
			params = merge(params, that.search)
			API.chemList(params).then(function(result){
				if (result.status == 1) {
					let data = result.data
					that.$set(that, 'loading', false)
					that.$set(that, 'data', data.data)
					that.$set(that, 'total', parseInt(data.total))
				}
			},function(err){
				that.$set(that, 'loading', false)
				console.log(err);
			});
		},
		productAdd() {
			let that = this;
			this.$refs['proAdd'].validate((valid)=>{
				if(valid) {
					API.add(this.addform).then(function(result){
						if (result.status == 1) {
							that.$Message.success(result.message)
							that.chemList()
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
		pageChange(page){
			this.$set(this, 'page', page)
		},
		sizeChange(size){
			this.$set(this,'size', size)
		}
	},
	mounted() {
		this.chemList()
	},
	watch: {
		page: function(val) {
			this.chemList()
		},
		size: function(val) {
			this.chemList()
		}
	}
}
</script>
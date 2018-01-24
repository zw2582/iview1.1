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
		
		<!--新增产品-->
		<ProductAdd v-on:on-add-success="handleAddSuccess"></ProductAdd>
		
		<Page class="page" :total="total" show-sizer show-elevator 
			show-total @on-change="pageChange" @on-page-size-change="sizeChange"></Page>
	</div>
</template>

<script>
import API from '@/api/api_product.js'
import ProductAdd from './ProductAdd'

const merge = require('webpack-merge')
export default{
	components:{ProductAdd},
	data(){
		return {
			loading:false,
			page:1,
			size:5,
			total:0,
			search:{
				number:''
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
		pageChange(page){
			this.$set(this, 'page', page)
		},
		sizeChange(size){
			this.$set(this,'size', size)
		},
		handleAddSuccess(message) {
			this.chemList()
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
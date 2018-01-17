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
			column:[{
				type:'selection',
				width:60,
				align:'center'
			},{
				title:'商品编号',
				key:'number'
			},{
				title:'中文名称',
				key:'cn_name'
			},{
				title:'CAS号',
				key:'cas'
			},{
				title:'品牌',
				key:'brand'
			},{
				title:'纯度',
				key:'purity'
			},{
				title:'包装规格',
				key:'package'
			},{
				title:'价格',
				key:'price'
			},{
				title:'库存',
				key:'stock'
			},{
				title:'备货期',
				key:'stock_time'
			},{
				title:'状态',
				key:'status'
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
			console.log(params)
			API.chemList(params).then(function(result){
				let data = result.data
				that.$set(that, 'loading', false)
				that.$set(that, 'data', data.chemList)
				that.$set(that, 'total', data.total)
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
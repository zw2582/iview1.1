<template>
	<div>
		<Form ref="formInline" :label-width="80" inline>
			<FormItem label="订单号：">
	            <Input type="text"></Input>
	        </FormItem>
	        <FormItem label="客户：">
	            <Input></Input>
	        </FormItem>
	        <FormItem label="客户：">
	            <Input></Input>
	        </FormItem>
	        <FormItem label="客户：">
	            <Input></Input>
	        </FormItem>
	        <FormItem label="客户：">
	            <Input></Input>
	        </FormItem>
	        <FormItem label="客户：">
	            <Input></Input>
	        </FormItem>
	        <FormItem>
	            <Button type="primary">搜索</Button>
	        </FormItem>
	    </Form>
		<Table :loading="loading" size="large" height="400" highlight-row stripe :border="false" :columns="columns" :data="data"></Table>
	</div>
</template>

<script>
import listProRow from './list_pro_row'
export default{
	data(){
		return {
			"loading":false,
			"columns":[
				{
					"type":"selection",
					"width":60,
					align:'center'
				},{
					type:"expand",
					width:50,
					render:(h,params)=>{
						return h(listProRow, {
							props : {
								row:params.row
							}
						})
					}
				},{
					"title":"订单号",
					"key":"order_num"
				},{
					"title":"客户",
					"key":"custom"
				},{
					"title":"销售总额",
					"key":"total_sale"
				},{
					"title":"结算总额",
					"key":"total_settle",
				},{
					"title":"当前状态",
					"key":"process"
				},{
					"title":"操作",
					render:(h,params)=>{
						return h('div', [
							h('Button', {
								props:{
									type:'primary',
									size:'small'
								}
							}, '查看'),
							h('Button', {
								props:{
									type:'error',
									size:'small'
								}
							}, '删除')
						])
					}
				}
			],
			"data":[
				{
					"order_num":"O0000001",
					custom:"上海大气集团",
					total_sale:'￥123.22',
					total_settle:'￥89.23',
					"process":"已发货",
					"proinfo":[{
						name:"苯环",
						cas:"122-23-2",
						custom:"上汽大公司",
						price:"￥12.3",
						sale_price:"￥12.3",
						settle_price:"￥23.3",
						settle_status:'待结算'
					},{
						name:"苯环",
						cas:"122-23-2",
						custom:"上汽大公司",
						price:"￥12.3",
						sale_price:"￥12.3",
						settle_price:"￥23.3",
						settle_status:'待结算'
					}],
					"buyerinfo":{
						name:"周威",
						phone:"18221212521",
						
					}
				}
			]
		}
	}
}
</script>
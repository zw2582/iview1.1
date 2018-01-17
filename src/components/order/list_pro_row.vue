<template>
	<div>
		<Row class="expand-row" v-for="item in row.proinfo">
			<Col span="5">
				<div class="proinfo">
					<span>{{item.name}}</span><br/>
					<span>{{item.cas}}</span><br/>
				</div>
			</Col>
			<Col span="5">
				<span>牌价:{{item.price}}</span><br/>
				<span>销售价:{{item.sale_price}}</span><br/>
				<span>结算价:{{item.settle_price}}</span>
			</Col>
			<Col span="5">
				<span>购买人:{{row.buyerinfo.name}}</span><br/>
				<span>联系电话:{{row.buyerinfo.phone}}</span>
			</Col>
			<Col span="5">
				<span>{{item.settle_status}}</span>
			</Col>
			<Col span="4">
				<Button type="primary" size="small">查看</Button>
			</Col>
		</Row>
	</div>
</template>

<script>
export default {
	props: {
		row: Object
	}
};
</script>
<template>
	<Header>
			<Menu mode="horizontal" theme="light" active-name="1">
				<MenuItem name="1">
							<Icon type="ios-navigate"/>
							Item1
						</MenuItem>
						<MenuItem name="2">
							<Icon type="ios-navigate"/>
							Item1
						</MenuItem>
						<MenuItem name="3">
							<Icon type="ios-navigate"/>
							Item1
						</MenuItem>
						<Submenu name="4">
							<template slot="title">
								<Icon type="stats-bars"/>
								统计分析
							</template>
							<MenuGroup title="使用">
								<MenuItem>斯蒂芬森</MenuItem>
								<MenuItem>时代发生的</MenuItem>
								<MenuItem>斯232</MenuItem>
							</MenuGroup>
						</Submenu>
			</Menu>
	</Header>
</template>

<style>
.ivu-layout-header{
background:white;
}
</style>
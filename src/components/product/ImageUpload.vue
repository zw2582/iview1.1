<style>
	.upload-list {
		display:inline-block;
		width:60px;
		height:60px;
		line-hight:60px;
		text-align:center;
		//border: 1px solid transparent;
		border-radius: 4px;
		overflow:hidden;
		background: #fff;
		box-shadow: 0 1px 1px rgba(0,0,0,.2);
		margin-right: 4px;
		position: relative;
	}
	.upload-list img {
		width:100%;
		height:100%;
	}
	.upload-list .upload-list-cover{
		display:none;
		position:absolute;
		top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
	}
	.upload-list:hover .upload-list-cover {
		display:block;
	}
	.upload-list-cover i{
		color:#fff;
		font-size:20px;
		cursor:pointer;
		margin: 0 2px;
		margin-top:20px;
	}
</style>
<template>
	<div>
		<div class="upload-list" v-for="item in uploadList">
			<template v-if="item.status==='finished'">
				<img :src="item.url">
				<div class="upload-list-cover">
					<Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
					<Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
				</div>
			</template>
			<template v-else>
				<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
			</template>
		</div>
		<Upload ref="upload" action="http://dev.backend.weiec.com/product/product/image-upload"
			:on-success="handleSuccess"
			:default-file-list="defaultList"
			:with-credentials="true"
			:show-upload-list="false"
			:format="['jpg','jpeg','png']"
			:max-size="20480"
			:on-format-error="handleFormatError"
			:on-exceeded-size="handleMaxSize"
			:before-upload="handleBeforeUpload"
			multiple
			type="drag"
			style="display:inline-block;width:60px">
			<div style="width:60px;height:60px;line-height:60px">
				<Icon type="camera" size="20"></Icon>
			</div>
		</Upload>
		<Modal title="查看大图" v-model="visible">
			<img :src="modelImgUrl" v-if="visible" style="width:100%"></img>
		</Modal>
	</div>
</template>

<script>
export default{
	data(){
		return {
			uploadList:[],
			defaultList:[{
				'name':'1.jpg',
				'url':'http://dev.picture.integle.com/site/index?src=0002_60_60_1.jpg',
				'deep_path':'0002',
				'save_name':'1.jpg',
				'real_name':'1.jpg',
				'pic_url':'http://dev.picture.integle.com'
			}],
			max_size:5,
			visible:false,
			modelImgUrl:''
		}
	},
	methods:{
		handleView(file) {
			this.modelImgUrl = file.pic_url+'/site/index?src='+file.deep_path+'_'+file.save_name;
			this.visible=true;
		},
		handleRemove(file) {
			const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
		},
		handleSuccess(res, file, fileList) {
			if(res.status == 1) {
				let data = res.data;
				let url = data.pic_url+'/site/index?src='+data.deep_path+'_60_60_'+data.save_name;
				file.url = url;
				file.name = data.real_name;
				file.deep_path = data.deep_path;
				file.save_name = data.save_name;
				file.real_name = data.real_name;
				file.pic_url = data.pic_url;
			} else {
				this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
				this.$Notice.warning({
					'title':'文件上传失败',
					'desc':res.message
				})
			}
		},
		handleFormatError(file) {
			this.$Notice.warning({
				'title':'文件格式不正确',
				'desc':file.name+'的格式不正确，请选择jpg或者png格式的图片'
			})
		},
		handleMaxSize(file) {
			this.$Notice.warning({
				'title':'文件大小过大',
				'desc':file.name+'文件大小过大'
			})
		},
		handleBeforeUpload() {
			const check = this.uploadList.length < this.max_size
			if (!check) {
				this.$Notice.warning({
				'title':'最多只能上传'+this.max_size+'张图片',
			})
			}
			return check;
		}
	},
	mounted() {
		this.uploadList = this.$refs.upload.fileList
	}
}
</script>
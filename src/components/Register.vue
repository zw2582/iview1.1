<style>
    .regis_form{
        width: 40%;
        margin: auto;
        margin-top:100px;
    }
</style>
<template>
    <div>
        <Form class="regis_form" label-width="80">
            <FormItem label="邮箱">
                <Input v-model="form.email"/>
            </FormItem>
            <formItem label="店铺名称">
                <Input v-model="form.supp_name"/>
            </formItem>
            <FormItem label="所在区域">

            </FormItem>
            <FormItem label="手机号码">
                <Input v-model="form.telephone"></Input>
            </FormItem>
            <FormItem label="固定电话">
                <Input v-model="form.phone"></Input>
            </FormItem>
            <FormItem>
                <Button>开通店铺</Button>
            </FormItem>
        </Form>
    </div>

</template>

<script>
    export default {
        data(){
        return {
            'form':{
                'supp_name':'',
                'telephone':'',
                'phone':''
            }
        }
    }
    }
</script>
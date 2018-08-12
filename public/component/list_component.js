
/* eslint-disable */




//字符串形式
var TextInput = Vue.extend({
    props: ['params'],
    template: '<input :name=" input_name" :id="input_id" type="text" v-model="input_value" />',
    data: function () {
        return {
            input_value: '',
            input_name: this.params.id,
            input_id: 'id_' + this.params.id
        };
    } 
});

//数字形式
var NumberInput = Vue.extend({
    props: ['params'],
    template: '<input :name=" input_name" :id="input_id" type="number" :value="input_value"/>',
    data: function () {
        return {
            input_value: '',
            input_name: this.params.id,
            input_id: 'id_' + this.params.id
        };
    }
});
//隐藏按钮用于传输某些数据
var VisiInput = Vue.extend({
    props: ['params'],
    template:
        '<input :name=" input_name" :id="input_id" type="text" v-model="input_value" style="display:none" />',
    data: function () {
        return {
            input_value: this.params.value,
            input_name: this.params.id,
            input_id: 'id_' + this.params.id
        };
    }
});
//上传按钮
var SubmitInput = Vue.extend({
    props: ['params'],
    template:
        '<input type="submit" :value="button_value" class="button button-raised button-primary button-pill"/>',
    data: function () {
        return {
            button_value: this.params.value
        };
    }
});
//图片上传modal，有触发函数
var PictureModalInput = Vue.extend({
    props: ['params'],
    template: '<div>' +
        '<input type="button" :value="button_value" class="button button-action button-rounded" style="margin:8px;display:inline-block" @click="showmodal(this)"/>' +
        '<input type="text" v-model="url_value" :name="input_name" :id="input_id" style="display:none" />' +
        '<p style="margin:8px;display:inline-block">{{suc_flag}}</p>' +
        ' </div>',
    data: function () {
        return {
            button_value: '提交图片',
            url_value: '',
            input_id: 'id_' + this.params.id,
            input_name: this.params.id,
            suc_flag: ''
        };
    },
    methods: {
        showmodal: function () {
            //将新指针指向当前的this，因为这个this是vue对象，在后续的函数中this变化了就找不到这个vue对象了，所以先用一个变量指针先指向
           
            var that_vue = this;
            let newmodal = $.modal({
                title: this.params.label,
                text: '请提交如下图所示样板的图片',
                afterText:
                    '<form class="upload_pic" enctype="multipart/form-data">' +
                    '<img style="width:100%" src="' +
                    this.params['data-example-url'] +
                    '"/>' +
                    '<input type="file" class="button button-action button-rounded" style="width:50%" name="image"/>' +
                    '</form>',
                buttons: [
                    {
                        text: '返回提交'
                    },
                    {
                        text: '提交图片',
                        bold: true,
                        onClick: function () {
                            var formdata = new FormData($('.upload_pic')[0]);
                            $.ajax({
                                type: 'post',
                                url: '/file_manager/uploadpic',
                                data: formdata,
                                contentType: false,
                                processData: false,
                                dataType: 'json',
                                success: function (data) {
                                    if (typeof (data.path) != 'undefined') {//上传成功
                                        that_vue.suc_flag = '成功';
                                        that_vue.url_value = data.path;
                                    }
                                }
                            });
                        }
                    },
                ]
            });
            //设置格式，否则看不到图片
            $(newmodal).first('.modal.modal-in').css('margin-top', '10px');
            $(newmodal).first('.modal.modal-in').css('top', '0px');
        }
    }

});


//里面会包含一个input,具体由:is 指定
var InputContainer = Vue.extend({
    props: ['params'],
    template: '<div class="item-inner"><div class="item-title label">{{list_label}}</div>' +
        '<div class="item-input">' +
        '<input :is="component" :params="params" />' +
        '</div>' +
        '</div>',
    components: {
        'text-input': TextInput,
        'number-input': NumberInput,
        'submit-input': SubmitInput,
        'picture-modal-input': PictureModalInput,
        'visi-input': VisiInput
    },
    data: function () {

        var component_id = this.params.type + '-input';
        return {
            list_label: this.params.label,
            component: component_id
        };
    }

});
//通用表单结构，将在.item-title.label里面填入表单内容，以及在其他属性填入其他东西
var CommonList = Vue.component('common-list', {
    props: ['params'],
    template: '<li v-if="visi">' +
        '<div class="item-content">' +
        '<input-container :params="cildparams"></input-container>' +
        '</div>' +
        '</li>' +
        '<li v-else style="display:none"> <input-container :params=\"cildparams\"></input-container></li>',
    components: {
        'input-container': InputContainer
    },
    data: function () {
        return {
            visi: (this.params.type != 'visi'),
            cildparams: this.params
        };
    }

});
/* eslint-enable */
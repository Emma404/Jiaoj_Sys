var ImageBlock = Vue.extend({
    props: ['imgurl'],
    template: '<div>' +       
        '<img :src="urls[0]" style="width:100%;">' +       
        '</div>',
    data: function () {
        return {
            urls: this.imgurl
        }
    }
});

var CaseItem = Vue.extend({
    props: ['itemdetail'],
    template:

        '<div class="new-btn">' +
        '<span :class="item_detail.menu_icon"></span>' +
        '<span class="case-item-title">{{item_detail.menu_title}}</span>' +
        '</div>',
    data: function () {
        return {
            item_detail: this.itemdetail
        }
    },
    mounted: function () {
        console.log(1);
        var s = parseFloat($('.new-btn').css("width"));
        $(".new-btn").css("height", s);
        $(".menu-icon").css("font-size", s * 0.75);
        $(".menu-icon").css("line-height", 1.1);
        $(".case-item-title").css("font-size", s * 0.1);
        $(".case-item-title").css("line-height", 2);
         $(".case-item-title").css("margin-top", -s * 0.1);
    },
    updated:function(){
        var s = parseFloat($('.new-btn').css("width"));
        $(".new-btn").css("height", s);
        $(".menu-icon").css("font-size", s * 0.75);
        $(".menu-icon").css("line-height", 1);
        $(".case-item-title").css("font-size", s * 0.7);
        $(".case-item-title").css("margin-top", -s * 0.1);
    }   

});

var CaseMenuBlock = Vue.extend({
    props: ['menuindex'],
    template:
        '<div class="row">' +
        '<div v-for="case_item in case_index" class="col-xs-3" >' +
        '<case-item :itemdetail="case_item">' +
        '</case-item>' +
        '</div>' +
        '</div>',
    data: function () {
        return {
            case_index: this.menuindex
        }
    },

    components: {
        "case-item": CaseItem
    }

});

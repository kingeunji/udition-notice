import Vue from "vue";
import VueRouter from "vue-router";
import noticeList from "../views/noticeList"
import noticeDetail from "../views/noticeDetail"
import policy from "../views/policy"
import policyClassify from "../views/policyClassify"

Vue.use(VueRouter);

// route 설정하기
export default new VueRouter({
    routes: [
        {
            path: '/notice',
            name: 'notice',
            component: noticeList  
        },
        {
            path: '/notice-detail:id',
            name: 'notice-detail',
            component: noticeDetail
        },
        {
            path: '/policy',
            name: 'policy',
            component: policy
        },
        {
            path: '/policy-classify',
            name: 'policy-classify',
            component: policyClassify
        }
    ]
})


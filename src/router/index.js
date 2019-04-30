import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

//登录模块
const Login = r => require.ensure([], () => r(require('@/page/Login')), 'Login');
//忘记密码模块
const Forget = r => require.ensure([], () => r(require('@/page/Forget')), 'Forget');
//注册
const Register = r => require.ensure([], () => r(require('@/page/Register')), 'Register');
//主体架构模块
const Home = r => require.ensure([], () => r(require('@/page/Home')), 'Home');
//用人单位管理模块
const Employer = r => require.ensure([], () => r(require('@/page/Admin/Employer')), 'Employer');
//信息类别管理模块
const Infor = r => require.ensure([], () => r(require('@/page/Admin/Infor')), 'Infor');
//留言信息管理模块
const Message = r => require.ensure([], () => r(require('@/page/Admin/Message')), 'Message');
//新闻资讯管理模块
const New = r => require.ensure([], () => r(require('@/page/Admin/New')), 'New');
//系统公告管理模块
const Notice = r => require.ensure([], () => r(require('@/page/Admin/Notice')), 'Notice');
//学生用户管理模块
const User = r => require.ensure([], () => r(require('@/page/Admin/User')), 'User');

//用户模块
//选择模块
const UserChoice = r => require.ensure([], () => r(require('@/page/User/UserChoice')), 'UserChoice');
//完善简历
const Resume = r => require.ensure([], () => r(require('@/page/User/Resume')), 'Resume');
//简历投递
const Deliver = r => require.ensure([], () => r(require('@/page/User/Deliver')), 'Deliver');
//兼职推荐
const JobRecommend = r => require.ensure([], () => r(require('@/page/User/JobRecommend')), 'JobRecommend');
const JobList = r => require.ensure([], () => r(require('@/page/User/JobList')), 'JobList');
//浏览新闻
const LookNew = r => require.ensure([], () => r(require('@/page/User/LookNew')), 'LookNew');
const LookNewlist = r => require.ensure([], () => r(require('@/page/User/LookNewlist')), 'LookNewlist');
//留言交流
const Exchanger = r => require.ensure([], () => r(require('@/page/User/Exchanger')), 'Exchanger');
//问卷测评
const Naire = r => require.ensure([], () => r(require('@/page/User/Naire')), 'Naire');

//招聘模块
//发布
const Release = r => require.ensure([], () => r(require('@/page/Recruit/Release')), 'Release');
//发布信息
const Releaseinfor = r => require.ensure([], () => r(require('@/page/Recruit/Releaseinfor')), 'Releaseinfor');
//编辑招聘信息
const Editinfor = r => require.ensure([], () => r(require('@/page/Recruit/Editinfor')), 'Editinfor');
//应聘信息
const Acceptinfor = r => require.ensure([], () => r(require('@/page/Recruit/Acceptinfor')), 'Acceptinfor');

//查看信息
const Reoneinfor = r => require.ensure([], () => r(require('@/page/Recruit/Reoneinfor')), 'Reoneinfor');
//应聘信息
const Aconeinfor = r => require.ensure([], () => r(require('@/page/Recruit/Aconeinfor')), 'Aconeinfor');
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Login',
            component: Login,
        },
        {
            path: '/Forget',
            name: 'Forget',
            component: Forget,
        },
        {
            path: '/Register',
            name: 'Register',
            component: Register,
        },
        {
            path: '/Home',
            component: Home,
            name: 'Home',
            //默认加载
            redirect: '/User',
            children: [
                { path: '/Employer', component: Employer, name: '用人单位管理' },
                { path: '/Infor', component: Infor, name: '信息类别管理' },
                { path: '/Message', component: Message, name: '留言信息管理' },
                { path: '/New', component: New, name: '新闻资讯管理' },
                { path: '/Notice', component: Notice, name: '系统公告管理' },
                { path: '/User', component: User, name: '学生用户管理' },
            ]
        },
        //用户模块
        {
            path: '/UserChoice',
            name: 'UserChoice',
            component: UserChoice,
        },
        {
            path: '/Resume',
            name: 'Resume',
            component: Resume,
        },
        {
            path: '/Deliver',
            name: 'Deliver',
            component: Deliver,
        },
        {
            path: '/JobRecommend',
            name: 'JobRecommend',
            component: JobRecommend,
        },
        {
            path: '/JobList',
            name: 'JobList',
            component: JobList,
        },
        {
            path: '/LookNew',
            name: 'LookNew',
            component: LookNew,
        },
        {
            path: '/LookNewlist',
            name: 'LookNewlist',
            component: LookNewlist,
        },
        {
            path: '/Exchanger',
            name: 'Exchanger',
            component: Exchanger,
        },
        {
            path: '/Naire',
            name: 'Naire',
            component: Naire,
        },
        //招聘模块
        {
            path: '/Release',
            name: 'Release',
            component: Release,
        },
        {
            path: '/Releaseinfor',
            name: 'Releaseinfor',
            component: Releaseinfor,
        },
        {
            path: '/Editinfor',
            name: 'Editinfor',
            component: Editinfor,
        },
        {
            path: '/Acceptinfor',
            name: 'Acceptinfor',
            component: Acceptinfor,
        },
        {
            path: '/Reoneinfor',
            name: 'Reoneinfor',
            component: Reoneinfor,
        },
        {
            path: '/Aconeinfor',
            name: 'Aconeinfor',
            component: Aconeinfor,
        },
    ]
})
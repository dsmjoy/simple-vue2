
const routes = [
    {
        path: '/home',
        redirect: '/home/index',
    },
    {
        name: 'homeindex',
        path: '/home/index',    
        component: resolve => {
            require.ensure(['Views/Home/Index/Index.vue'], () => {
                resolve(require('Views/Home/Index/Index.vue'))
            })
        }
    }
]

export default routes
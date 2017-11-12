
const routes = [
    {
        path: '/user',
        redirect: '/user/preview',
    },
    {
        name: 'userpreview',
        path: '/user/preview',    
        component: resolve => {
            require.ensure(['Views/User/Preview/Preview.vue'], () => {
                resolve(require('Views/User/Preview/Preview.vue'))
            })
        }
    }
]

export default routes
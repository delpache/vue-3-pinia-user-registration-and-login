export default {
    path: '/auth',
    component: () => import('../components/layouts/AuthLayout.vue'),
    children: [
        { path: '', redirect: '/login' },
        { path: '/login', component: () => import('../views/auth/LoginView.vue') },
        { path: '/register', component: () => import('../views/auth/RegisterView.vue') }
    ]
}
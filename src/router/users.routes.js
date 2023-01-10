export default {
    path: '/users',
    component: () => import('../components/layouts/UsersLayout.vue'),
    children: [
        { path: '', component: () => import('../views/users/IndexView.vue') },
        { path: 'create', component: () => import('../views/users/CreateView.vue') },
        { path: 'edit/:id', component: () => import('../views/users/CreateView.vue') }
    ]
}
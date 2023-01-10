export { fakeBackend }

// Tableau dans le local stockage pour les utilisateurs enregistrés
const usersKey = 'vue-3-pinia-registration-login'
let users = JSON.parse(localStorage.getItem(usersKey)) || []

function fakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, options) {
        return new Promise((resolve, reject) => {
            // Ajouter un délai d'attente pour simuler l'appel à l'API du serveur.
            setTimeout(handleRoute, 500)

            function handleRoute() {
                switch (true) {
                    case url.endsWith('/auth/login') && options.method === 'POST':
                        return authenticate();
                    case url.endsWith('/users/register') && options.method === 'POST':
                        return register();
                    case url.endsWith('/users') && options.method === 'GET':
                        return getUsers();
                    case url.match(/\/users\/\d+$/) && options.method === 'GET':
                        return getUserById();
                    case url.match(/\/users\/\d+$/) && options.method === 'PUT':
                        return updateUser();
                    case url.match(/\/users\/\d+$/) && options.method === 'DELETE':
                        return deleteUser();
                    default:
                        // Passe par toutes les demandes non traitées ci-dessus
                        return realFetch(url, options)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            function authenticate() {
                const { username, password } = body()
                const user = users.find(x => x.username === username && x.password === password)

                if (!user) return error('Le nom d\'utilisateur ou le mot de passe est incorrect');

                return ok({
                    ...basicDetails(user),
                    token: 'fake-jwt-token'
                });
            }

            function register() {
                const user = body()

                if (users.find(x => x.username === user.username)) {
                    return error('Ce nom d\'utilisateur "' + user.username + '" est déjà pris')
                }

                user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1
                users.push(user)
                localStorage.setItem(usersKey, JSON.stringify(users))

                return ok()
            }

            function getUsers() {
                if (!isAuthenticated()) return unauthorized();

                return ok(users.map(x => basicDetails(x)));
            }

            function getUserById() {
                if (!isAuthenticated()) return unauthorized();

                const user = users.find(x => x.id === idFromUrl());
                return ok(basicDetails(user));
            }

            function updateUser() {
                if (!isAuthenticated()) return unauthorized();

                let params = body()
                let user = users.find(x => x.id === idFromUrl())

                // only update password if entered
                if (!params.password) {
                    delete params.password;
                }

                // if username changed check if taken
                if (params.username !== user.username && users.find(x => x.username === params.username)) {
                    return error('Ce nom d\'utilisateur "' + params.username + '" est déjà pris')
                }

                // update and save user
                Object.assign(user, params);
                localStorage.setItem(usersKey, JSON.stringify(users));

                return ok();
            }

            function deleteUser() {
                if (!isAuthenticated()) return unauthorized();

                users = users.filter(x => x.id !== idFromUrl());
                localStorage.setItem(usersKey, JSON.stringify(users));
                return ok();
            }

            function ok(body) {
                resolve({ ok: true, ...headers(), json: () => Promise.resolve(body) })
            }

            function unauthorized() {
                resolve({ status: 401, ...headers(), json: () => Promise.resolve({ message: 'Unauthorized' }) })
            }

            function error(message) {
                resolve({ status: 400, ...headers(), json: () => Promise.resolve({ message }) })
            }

            function basicDetails(user) {
                const { id, username, firstName, lastName } = user;
                return { id, username, firstName, lastName };
            }

            function isAuthenticated() {
                return options.headers['Authorization'] === 'Bearer fake-jwt-token';
            }

            function body() {
                return options.body && JSON.parse(options.body);
            }

            function idFromUrl() {
                const urlParts = url.split('/');
                return parseInt(urlParts[urlParts.length - 1]);
            }

            function headers() {
                return {
                    headers: {
                        get(key) {
                            return ['application/json'];
                        }
                    }
                }
            }
        })
    }
}
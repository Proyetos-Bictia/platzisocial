const { nanoid } = require('nanoid/non-secure')
const auth = require('../auth')

const TABLA = 'user'

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy')
    }
    async function list() {
        return store.list(TABLA)
    }
    async function get(id) {
        return store.get(TABLA, id)
    }
    async function upsert(data) {
        if (!data.name) {
            return Promise.reject('Formulario incompleto')
        }
        const user = {
            name: data.name,
            username: data.username
        }
        if (data.id) {
            user.id = data.id
        } else {
            user.id = await nanoid();
        }

        if (data.password || data.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: data.password
            })
        }

        return store.upsert(TABLA, user)
    }
    
    async function remove(id) {
        return store.remove(TABLA, id)
    }


    return {
        list,
        get,
        upsert,
        remove
    }
}
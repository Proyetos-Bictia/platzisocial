const db = {
    'user': [
        { id: '1', name: 'Camilo' },
    ]
};

async function list(tabla) {
    return db[tabla];
}

async function get(tabla, id) {
    let coll = await list(tabla);
    return coll.filter(item => item.id === id)[0] || null
}

async function upsert(tabla, data) {
    if (!db[tabla]) {
        db[tabla] = []
    }
    db[tabla].push(data)
    console.log(db);

}

async function remove(tabla, id) {
    let collecion = await list(tabla)
    let idValid = await get(tabla, id)
    if (idValid === null) {
        return Promise.reject('id no encontrado')
    }
    collecion.splice(collecion.indexOf(idValid), 1)

    return collecion
}

async function query(tabla, q) {
    let coll = await list(tabla);
    let keys = Object.keys(q);
    return coll.filter(item => item[keys[0]] === q[keys[0]])[0] || null
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query
}
import firebase from '../Config/firebase';

export async function getAllProducts(search =""){
    return await firebase.firestore().collection('products')
    .orderBy('product', 'asc')
    .startAt(search)
    .endAt(search + '\uf8ff')
    .get();
}

export async function getProductsById(id) {
    return await firebase.firestore().doc(`products/${id}`)
        .get()
}

export async function addProduct(payload) {
    return await firebase.firestore().collection('products')
        .add(payload)
}

export async function editProduct(id, payload) {
    return await firebase.firestore().doc(`products/${id}`)
        .set(payload)

}

export async function deleteProduct(id) {
    return await firebase.firestore().doc(`products/${id}`)
        .delete()
}
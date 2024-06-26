// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
// funciones de firestore
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc, getFirestore, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// COnfiguración de su app
const firebaseConfig = {
    apiKey: "AIzaSyBsN_Q4UkA4kl_FGGabYVWHj5MyxPVwSJ0",
    authDomain: "proyectoeval3.firebaseapp.com",
    projectId: "proyectoeval3",
    storageBucket: "proyectoeval3.appspot.com",
    messagingSenderId: "512816918125",
    appId: "1:512816918125:web:c2c1da002e83155b645964"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//getFirestore es la función  que permite traer la base de datos para su utilización
const db = getFirestore(app);
//save es una función creada que invoca la función de firestore para guardar
export const save = async (emp) => {

    const cod = emp.codBanda; //run es el atributo del objeto emp
    const query = query(collection(db, 'bandas'), where('codBanda', '==', codBanda)) //
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
        await addDoc(collection(db, 'bandas'), emp)
    } else { //
        Swal.fire({
            title: "Error",
            text: "El código ingresado ya está siento utilizado. Elija otro",
            icon: "error"
        })
    }
}

export const getAll = (data) => {
    /* onSnapshot es una funcion de firestore que merpmite cargar los documentos en tiempo real */
    onSnapshot(collection(db, 'bandas'), data)
}
/* DOMContentLoaded es un evento que se activa al recargar la pagina web */


export const remove = (id) => {
    //doc es la funcion de firestore que busca un documento segun su id
    /* deleteDoc es la funcion de Firestore que permite eliminar el documento */
    deleteDoc(doc(db, 'bandas', id))

}

/* selectOne es una funcion que permite seleccionar un documento 
getDoc es la funcion de Firestore que permite retornar un documento seleccionado*/

export const selectOne = (id) => getDoc(doc(db, 'bandas', id))

export const update = (id, emp) => {
    /* updateDoc es una función de firestore que permite editar un documento en una colección */
    updateDoc(doc(db, 'bandas', id), emp)
}
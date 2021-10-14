//********************Fireeeeeebase**************************/
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getDatabase, ref, set, child, update, remove, get } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";
import * as firebase2 from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";
import { getStorage, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-storage.js";
import * as firebase from "https://www.gstatic.com/firebasejs/9.1.1/firebase-storage.js";/**********AREGLAR EN UN FUTUROOOOOOOOOOOO********** */
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD-3mOlc_Rl1f1eKhDAUclo5A0ieYJz4gQ",
    authDomain: "basesdedatosmultimedia-12d8c.firebaseapp.com",
    databaseURL: "https://basesdedatosmultimedia-12d8c-default-rtdb.firebaseio.com",
    projectId: "basesdedatosmultimedia-12d8c",
    storageBucket: "basesdedatosmultimedia-12d8c.appspot.com",
    messagingSenderId: "396738080191",
    appId: "1:396738080191:web:6e3dfcb8adef649f4b450a",
    measurementId: "G-7TB969XQNL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();
const storage = getStorage()

console.log(firebase);
console.log(firebase2);

//********************Fireeeeeebase**************************/

/************************************* *cargando la base de datos* *************************************/

downDatabesa();



document.getElementById("reload").onclick = (e) => {
    location.reload();
};


function downDatabesa(){
    firebase2.get(child(ref(database),"Usuarios/") ).then((snapshot)=>{
        if(snapshot.exists()){
            const datosDB = snapshot.val();
            const fragmento = document.createDocumentFragment();
            let cont = 0;
            for (const property in datosDB) {
                const elementDatos = datosDB[property];
                console.log(`${property}: ${elementDatos}`);
                cont++;
                const agre = document.createElement("tr");

                const agrete = document.createElement("th");
                agrete.textContent = cont+").";
                agre.appendChild(agrete);
                
                const agregaName = document.createElement("td");
                agregaName.textContent = elementDatos.nombre;
                agre.appendChild(agregaName);

                const agregaCorreo = document.createElement("td");
                agregaCorreo.textContent = elementDatos.email;
                agre.appendChild(agregaCorreo);

                const agregaPassword = document.createElement("td");
                agregaPassword.textContent = elementDatos.password;
                agre.appendChild(agregaPassword);

                const agregaCiudad = document.createElement("td");
                agregaCiudad.textContent = elementDatos.ciudad;
                agre.appendChild(agregaCiudad);

                const agregaDireccion = document.createElement("td");
                agregaDireccion.textContent = elementDatos.direccion;
                agre.appendChild(agregaDireccion);

                const agregaEstado = document.createElement("td");
                agregaEstado.textContent = elementDatos.estado;
                agre.appendChild(agregaEstado);

                const agregaZip = document.createElement("td");
                agregaZip.textContent = elementDatos.zip;
                agre.appendChild(agregaZip);
                
                const agregaPhoto = document.createElement("td");
                const photo = document.createElement("a");
                photo.textContent = elementDatos.nombre;
                photo.setAttribute("href",elementDatos.linkImg);
                photo.setAttribute("target","_blank");
                agregaPhoto.appendChild(photo);
                agre.appendChild(agregaPhoto);


                fragmento.appendChild(agre);
            }
            document.getElementById("imprimidor").appendChild(fragmento);
        }
    })
    .catch((e)=>{
        alert("Error en la llamda de datos, "+e);
    });
};
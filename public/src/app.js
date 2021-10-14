//********************Fireeeeeebase**************************/
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";/** */
import { getDatabase, ref, set, child, update, remove, get } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";/** */
import * as firebase2 from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";
import { getStorage, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-storage.js";/** */
import * as firebase from "https://www.gstatic.com/firebasejs/9.1.1/firebase-storage.js";/**********AREGLAR EN UN FUTUROOOOOOOOOOOO********** */
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-analytics.js";/** */
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

// atributos usuario
const inputsUser = {
    nombre: document.getElementById('userName'),
    email: document.getElementById('inputEmail4'),
    password: document.getElementById('inputPasswordNEW'),
    passwordCon: document.getElementById('inputPasswordCON'),
    direccion: document.getElementById('inputAddress'),
    ciudad: document.getElementById('inputCity'),
    estado: document.getElementById('inputState'),
    zip: document.getElementById('inputZip'),
};

var imagenidi = null;

document.getElementById('formFile').onchange = function (e) {
    const x = e.target.files[0].name.split(".");
    console.log(x[x.length - 1]);
    if (x[x.length - 1] == 'png' || x[x.length - 1] == 'jpg' || x[x.length - 1] == 'jpeg') {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
            const image = document.querySelector('#blah');
            image.src = reader.result;
            //image.style.height = '250px';
            image.style.width = '275px';
            
            //Guardando la imagen
            imagenidi = e.target.files[0];
           
        };
    }
    else {
        alert("Formato no valido solo PNG, JPEG o JPG");
        e.target.type = '';
        e.target.type = 'file';
    }
}


function validateNEW() {
    var lowerCaseLetters = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,24}/g;
    if (inputnew.value.match(lowerCaseLetters)) {
        document.getElementById('RENEW').value = 'SI';
        document.getElementById('RENEW').style.color = 'green';
    }
    else {
        document.getElementById('RENEW').value = 'NO';
        document.getElementById('RENEW').style.color = 'red';
    }
    if (inputnew.value === inputcon.value) {
        document.getElementById('RECON').value = 'SI';
        document.getElementById('RECON').style.color = 'green';
    }
    else {
        document.getElementById('RECON').value = 'NO';
        document.getElementById('RECON').style.color = 'red';
    }
}
function validate() {
    if (inputnew.value === inputcon.value) {
        document.getElementById('RECON').value = 'SI';
        document.getElementById('RECON').style.color = 'green';
    }
    else {
        document.getElementById('RECON').value = 'NO';
        document.getElementById('RECON').style.color = 'red';
    }
}


const inputnew = document.getElementById('inputPasswordNEW');
const inputcon = document.getElementById('inputPasswordCON');
inputcon.onkeyup = (validate);
inputnew.onkeyup = (validateNEW);


//obtener los atributos
const formulario = document.getElementById('formulario')

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const estend = imagenidi.name.split('.');
    uploadBytes(firebase.ref(storage, "Usuarios/IMG" + document.getElementById('userName').value +"."+ estend[estend.length - 1]),//subir la foto
        imagenidi,
    )
        .then(() => {
            getDownloadURL(firebase.ref(storage, "Usuarios/IMG" + document.getElementById('userName').value +"."+ estend[estend.length - 1])).then(function (e) {//descargar URL
                //console.log(e)

                //guardar todos los atrivutos de usuarioooo
                const UsuarioInput = {
                    nombre: document.getElementById('userName').value,
                    email: document.getElementById('inputEmail4').value,
                    password: document.getElementById('inputPasswordNEW').value,
                    direccion: document.getElementById('inputAddress').value,
                    ciudad: document.getElementById('inputCity').value,
                    estado: document.getElementById('inputState').value,
                    zip: document.getElementById('inputZip').value,
                    linkImg: e,
                };

                console.log("Datos");
                Object.entries(UsuarioInput).forEach(element => {
                    console.log(`${element[0]}: ${element[1]}`);
                });

                //mandando los atrivutos al firebase database
                set(ref(database, `Usuarios/${UsuarioInput.nombre}`),///mandando los atrivutos al firebase database
                    UsuarioInput
                ).then(() => {//then es un ecuchador
                    //borrando parametros de los imputs
                    Object.entries(inputsUser).forEach(element => {
                        element[1].value = "";
                    });
                    document.getElementById('formFile').value = "";
                    document.querySelector('#blah').src = "";
                    alert("Los datos han sido enviados");
                })
                    .catch((e) => {
                        alert("Error: " + e);
                    });

            }
            );
        });


});
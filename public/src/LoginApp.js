//********************Fireeeeeebase**************************/
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";/** */
import * as firebaseDatabase from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";
import * as firebaseStorage from "https://www.gstatic.com/firebasejs/9.1.1/firebase-storage.js";/**********AREGLAR EN UN FUTUROOOOOOOOOOOO********** */
import * as firebaseLogin from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";/**********AREGLAR EN UN FUTUROOOOOOOOOOOO********** */
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-analytics.js";/** */
//import { getStorage, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-storage.js";/** */
/* import { getDatabase, ref, set, child, update, remove, get } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";*/
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

console.log("Database:");
console.log(firebaseDatabase);
console.log("Storege:");
console.log(firebaseStorage);
console.log("Login:");
console.log(firebaseLogin);

//********************Fireeeeeebase**************************/

document.getElementById('formulario').addEventListener('submit',(e)=>{
    e.preventDefault();

    //captura de datos
    const createrUser = {
        email: document.getElementById('inputEmail4').value+"",
        password: document.getElementById('inputPasswordNEW').value+"",
    };
    
    
    //*********create FirebaseLogin******
    const auth = firebaseLogin.getAuth(app);
    firebaseLogin.signInWithEmailAndPassword(auth,createrUser.email, createrUser.password)
    .then((CredencialesUsuario) => {
        console.log('sing Up');
        console.log(CredencialesUsuario);
        console.log('LocalID: '+CredencialesUsuario.user.reloadUserInfo.localId);
        const idLocal = CredencialesUsuario.user.reloadUserInfo.localId;
        /********LLamada de datos del firebase database *************/
        
        const dataBase = firebaseDatabase.getDatabase(app);
        firebaseDatabase.get(firebaseDatabase.child(firebaseDatabase.ref(dataBase),`Usuarios/${idLocal}`)).then((snapshot)=>{
            const Usuario = snapshot.val();
            document.getElementById("LoginIn").style.display = 'none';
            document.getElementById("logeado").style.display = '';

            document.getElementById("userNameRe").textContent = Usuario.nombre;
            document.getElementById("userIMGRe").setAttribute("src", Usuario.linkImg);//audio
            
        });
        
        
        /********Fin LLamada de datos del firebase database *************/
    })
    .catch(e=>{
        alert('Error, no se pudo iniciar secion: \n'+e);
    });
    //*******Fin create FirebaseLogin ******
    
    //******log OUT ****** */
    //******fin log OUT ****** */
    
    //print Info
    console.log("submint:");
    console.log(createrUser);
});

const auth = firebaseLogin.getAuth(app);
document.getElementById("Salir").onclick = ()=>{
    firebaseLogin.signOut(auth).then(()=>{
        alert('LogOut');
        document.getElementById("LoginIn").style.display = '';
        document.getElementById("logeado").style.display = 'none';
    });

}

/**********************Reproductor firebase******************* */
const audiotable = document.getElementById("audios-Lista");
const referencia = firebaseStorage.getStorage(app);


window.addEventListener('DOMContentLoaded',async(e)=>[
    recall()
])

var superlist = [];

function recall(){
    firebaseStorage.listAll(firebaseStorage.ref(referencia,"Audios/")).then((e)=>{
        console.log(e.items);
        const a = e.items;
        a.forEach(element => {
            console.log(element.name);
            
            firebaseStorage.getDownloadURL(firebaseStorage.ref(referencia,`Audios/${element.name}`)).then((urlssss)=>{
                const cancion = {
                    nombre: element.name,
                    link: urlssss,
                }
                superlist.push(cancion);
                audiotable.innerHTML += 
                `<li class="list-group-item">
                    <div class="row">
                        <div class="col-7">
                            <h5>${element.name}</h5>
                        </div>
                        <div class="col" style="text-align: right;">
                            <audio controls>  
                            <source src="${urlssss}" type="audio/ogg">  
                                Your browser does not support the html audio tag.  
                            </audio> 
                        </div>
                    </div>
                </li>`;
            })

        });
    })
}


const busqueda = document.getElementById('Busc');
document.getElementById('Busc').onkeyup = ()=>{

    audiotable.innerHTML =
    `<li class="list-group-item">
        <div class="row">
            <div class="col-7">
                <h1>Nombre audio</h1>
            </div>
            <div class="col" style="text-align: right;">
                <h1 style="text-align: right; margin-right: 100px;">Audio</h1>
            </div>
        </div>
    </li>`;

    if(busqueda.value == ""){
        superlist.forEach(element => {
            audiotable.innerHTML += 
            `<li class="list-group-item">
                <div class="row">
                    <div class="col-7">
                        <h5>${element.nombre}</h5>
                    </div>
                    <div class="col" style="text-align: right;">
                        <audio controls>  
                        <source src="${element.link}" type="audio/ogg">  
                            Your browser does not support the html audio tag.  
                        </audio> 
                    </div>
                </div>
            </li>`;
        });
    }else{
        superlist.forEach(element => {
            if(element.nombre.toLowerCase().indexOf(busqueda.value.toLowerCase()) !=-1){
                audiotable.innerHTML += 
                `<li class="list-group-item">
                    <div class="row">
                        <div class="col-7">
                            <h5>${element.nombre}</h5>
                        </div>
                        <div class="col" style="text-align: right;">
                            <audio controls>  
                            <source src="${element.link}" type="audio/ogg">  
                                Your browser does not support the html audio tag.  
                            </audio> 
                        </div>
                    </div>
                </li>`;
            }
        });
    }

}

/**********************fin Reproductor firebase******************* */
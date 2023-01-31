const urlObtenerUsuarios = 'https://comprehensive-games.000webhostapp.com/chat/api/obtenerUsuarios.php'
const urlAgregarUsuario = 'https://comprehensive-games.000webhostapp.com/chat/api/agregarUsuario.php'

const notificacion = document.getElementById("notificacion")

let listaChat = []
let conteo = 0
let usuario

if(localStorage.getItem("usuario")){
    console.log("existe")
    usuario = localStorage.getItem("usuario")
}else{
    usuario = prompt("Cual es tu nombre?")
    localStorage.setItem("usuario", usuario)
}


const objChat = {
    idUsuario:"",
    usuario:"",
    mensaje: "",
}

let btn = document.getElementById("btn")
let mensaje = document.getElementById("mensaje")
let divmensajes = document.getElementById("div-mensajes")
let container = document.getElementById("container")


const formulario = document.querySelector('#formulario')
const usuarioInput = document.querySelector('#usuario')
const mensajeInput = document.querySelector('#mensaje')

formulario.addEventListener("submit", validarFormulario)


function validarFormulario(e){
    e.preventDefault();

    objChat.idUsuario = Date.now()
    objChat.usuario = usuario
    objChat.mensaje = mensajeInput.value

    console.log(objChat)

    agregarMensaje()

    notificacion.play()

    



}

async function obtenerMensajes(){
    listaChat = await fetch(urlObtenerUsuarios)
    .then(respuesta => respuesta.json())
    .then(datos => datos)
    .catch(error => console.log(error))

    if(conteo !== listaChat.length){
        limpiarHTML()
        mostrarMensajes()
        conteo = listaChat.length
    }
            
}

setInterval(() => {

    obtenerMensajes() 
},1000)





function mostrarMensajes(){

    const divMensajes = document.querySelector('.div-mensajes')
    const span = document.querySelector('span')

        listaChat.forEach(chat => {
    const {idUsuario, usuario, mensaje} = chat

    
    const p = document.createElement('p')
    const s = document.createElement('span')
    
        s.textContent = `${usuario}: ${mensaje}`
        s.dataset.id = idUsuario

        const hr = document.createElement('hr')
        const contenedor = document.createElement('div')
        contenedor.setAttribute("class", "contenedor")

        
        divMensajes.appendChild(contenedor)
        contenedor.appendChild(s)
        

        container.scrollTop =container.scrollHeight;

        if(usuario == localStorage.getItem("usuario")){
            s.setAttribute("class", "color")
            contenedor.style.justifyContent = "flex-end"
        }

})
   
}

async function agregarMensaje(){

    const res = await fetch(urlAgregarUsuario,
        {
            method: 'POST',
            body: JSON.stringify(objChat)
        })
        .then(respuesta => respuesta.json())
        .then(data => data)
        .catch(error => alert(error))

    if(res.msg === 'OK') {
        
        limpiarHTML()
        obtenerMensajes()

        mensajeInput.value = ""
        limpiarObjeto()
    }
   


}

function limpiarHTML() {
    const divMensajes = document.querySelector('.div-mensajes');
    while(divMensajes.firstChild) {
        divMensajes.removeChild(divMensajes.firstChild)
    }
}

function limpiarObjeto() {
    objChat.idUsuario = ''
    objChat.mensaje = ''
    
}
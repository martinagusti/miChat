const urlObtenerUsuarios = 'https://martincrsn.000webhostapp.com/chat/api/obtenerUsuarios.php'
const urlAgregarUsuario = 'https://martincrsn.000webhostapp.com/chat/api/agregarUsuario.php'


//prueba git 
const notificacion = document.getElementById("notificacion")
let user = document.getElementById("user")
let modal = document.getElementById("modal")

let listaChat = []
let conteo = 0
let usuario

if(localStorage.getItem("usuario")){
    
    modal.style.opacity = 0;
    modal.style.display = "none";
    usuario = localStorage.getItem("usuario")
}

function ingreso(){
        usuario = user.value
        
        if(user.value !== ""){
            modal.style.opacity = 0;
            modal.style.display = "none";
            localStorage.setItem("usuario", usuario)
        }else{
            alert("Debe completar el campo User")
        }
       

    }
    




const objChat = {
    idUsuario:"",
    usuario:"",
    mensaje: "",
    hora: ""
}

let btn = document.getElementById("btn")
let mensaje = document.getElementById("mensaje")
let divmensajes = document.getElementById("div-mensajes")
let container = document.getElementById("container")


const formulario = document.querySelector('#formulario')
const usuarioInput = document.querySelector('#usuario')
const mensajeInput = document.querySelector('#mensaje')




function validarFormulario(){
    
    let date = new Date()

    objChat.idUsuario = Date.now()
    objChat.usuario = usuario
    objChat.mensaje = mensajeInput.value
    objChat.hora = `${date.getHours()}:${date.getMinutes()}`
    
    console.log(objChat)

    agregarMensaje()

    


}

async function obtenerMensajes(){
    listaChat = await fetch(urlObtenerUsuarios)
    .then(respuesta => respuesta.json())
    .then(datos => (datos))
    .catch(error => console.log(error))

    if(listaChat.length !== conteo){
        limpiarHTML()
   
        mostrarMensajes()
        
    
        conteo = listaChat.length
    }
    
    
   
}


   obtenerMensajes()
    setInterval(obtenerMensajes,1000)
   


function mostrarMensajes(){
    


    const divMensajes = document.querySelector('.div-mensajes')
    
    
        listaChat.forEach(chat => {
    const {idUsuario, usuario, mensaje, hora} = chat

    
    const p = document.createElement('p')
    const s = document.createElement('span')
    const span2 = document.createElement('span')
    const img = document.createElement('img')
    
    
    

        img.setAttribute("class", "avatar2")
        s.textContent = `${usuario}: ${mensaje}`
        s.dataset.id = idUsuario
        span2.textContent = `${hora}`    
        
        const contenedor = document.createElement('div')
        contenedor.setAttribute("class", "contenedor")
        span2.setAttribute("class", "span2")

        
        divMensajes.appendChild(contenedor)
        contenedor.appendChild(img)
        contenedor.appendChild(s)
        contenedor.appendChild(span2)
        

        container.scrollTop =container.scrollHeight;

        if(usuario == localStorage.getItem("usuario")){
            s.setAttribute("class", "color")
            contenedor.style.justifyContent = "flex-end"
        }

        if(usuario == "Martin"){
            img.setAttribute("class", "avatar")
            
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
    objChat.hora = ''
    
}
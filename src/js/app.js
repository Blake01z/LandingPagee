const menu = document.querySelector('.toggle');
const navigation = document.querySelector('.navigation');
const formulario = document.querySelector('#formulario');
const inputs = document.querySelectorAll('.formulario__input');


//expresiones regulares para validar
const expresiones = {
	nombre: /^[a-zA-ZA\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{10}$/ // 7 a 14 numeros.
}

const userObj = {
    nombre: false,
    email: false,
    telefono: false
}

//Inicia la ejecucion del programa
document.addEventListener('DOMContentLoaded',()=>{
    iniciarApp();
});

//Valida campos del formulario
const validarFormulario = (e) => {

    switch(e.target.name){
        case "nombre":
                valdiarCampo(expresiones.nombre,e.target,'nombre');
            break;
        
        case "email":
            valdiarCampo(expresiones.correo,e.target,'email');
        break;

        case "telefono":
            valdiarCampo(expresiones.telefono,e.target,'telefono');
        break;

        default:
            break;
    }

}

//validacion de campos
const valdiarCampo = (expresion,input,campo) => {
    if(expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');

        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle'); 
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
    
        userObj[campo] = true;
    }else{
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');

        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle'); 
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');

        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
    
        userObj[campo] = false;
    }
}

//funcion para iniciar el DOM
const iniciarApp = () =>{
    menu.addEventListener('click',function(){
        menu.classList.toggle('active');
        navigation.classList.toggle('active');
    });

    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur',validarFormulario);

    })

    formulario.addEventListener('submit', (e) => {
        e.preventDefault()

        const {nombre,email,telefono} = userObj;
        const terminos = document.querySelector('#terminos');

        if(nombre && email && telefono && terminos.checked){
            formulario.reset();

            const mensajeExito = document.querySelector('.info');
            const mensajeP = document.createElement('P');
            mensajeP.textContent = 'Tus datos se enviaron correctamente.';
            mensajeP.classList.add('exito');

            mensajeExito.appendChild(mensajeP);

            setTimeout(() => {
                mensajeP.remove()
            },3000)
        }else{
            const mensajeError = document.querySelector('#formulario__mensaje');
            mensajeError.classList.add('formulario__mensaje-activo');

            setTimeout(() => {
                mensajeError.classList.remove('formulario__mensaje-activo');
            },3000)
        }
    })

}


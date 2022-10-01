//variables
const divBudge = document.querySelector("#presupuesto");
const askBudge = document.querySelector("#preguntarPresupuesto");
const formularioPregunta = document.querySelector("#formulario-pregunta");

//funciones

const preguntarPresupuesto = e => {
    e.preventDefault();
    const presupuesto = askBudge.children[1].children[0].value;
    console.log(presupuesto);

    askBudge.classList.add("d-none");
    divBudge.classList.remove("d-none")
    divBudge.classList.add("d-flex");
}    
//clases
class UI{
    
}

const ui = new UI();

//eventos
formularioPregunta.addEventListener("submit", preguntarPresupuesto);

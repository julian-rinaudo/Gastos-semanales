//variables
const divBudge = document.querySelector("#presupuesto");
const askBudge = document.querySelector("#preguntarPresupuesto");
const formularioPregunta = document.querySelector("#formulario-pregunta");

//funciones

const preguntarPresupuesto = e => {
    e.preventDefault();
    const input = askBudge.children[1].children[0];
    const presupuesto = parseInt(input.value); 
    console.log(presupuesto)
    while (presupuesto === "" || isNaN(presupuesto) || presupuesto < 0) {
        
        const errorMessage = document.createElement("p");
        errorMessage.classList.add("alert", "alert-danger");
        input.classList.add("border-danger")
        errorMessage.textContent = "Presupuesto No Valido";
        setTimeout(() => {
            errorMessage.remove()
        }, 2000);

        askBudge.insertBefore(errorMessage, formularioPregunta);
        formularioPregunta.reset();
        
        return;
    }

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

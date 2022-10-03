//variables
const divBudge = document.querySelector("#presupuesto");
const askBudge = document.querySelector("#preguntarPresupuesto");
const formularioPregunta = document.querySelector("#formulario-pregunta");
const formularioGastos = document.querySelector("#formulario-gastos");
const listado = document.querySelector("#listado");
//funciones

const preguntarPresupuesto = e => {
    e.preventDefault();
    const input = askBudge.children[1].children[0];
    const presupuesto = parseInt(input.value); 
    
    while (presupuesto === "" || isNaN(presupuesto) || presupuesto < 0) {
        
        const errorMessage = document.createElement("p");
        errorMessage.classList.add("alert", "alert-danger");
        input.classList.add("border-danger")
        errorMessage.textContent = "Presupuesto No Valido";
        // setTimeout(() => {
        //     errorMessage.remove()
        // }, 2000);

        askBudge.insertBefore(errorMessage, formularioPregunta);
        formularioPregunta.reset();
        
        return;
    }

    
    askBudge.classList.add("d-none");
    divBudge.classList.remove("d-none")
    divBudge.classList.add("d-flex");

    ui.mostrarPresupuesto(presupuesto);
}    

const ingresarGastos = (e) => {
    e.preventDefault();
    const gasto = document.querySelector("#gasto").value;
    const cantidad = document.querySelector("#cantidad").value;
    
    const gastos = {
        nombre: gasto,
        precio: cantidad
    }
    ui.mostrarGastos(gastos);
    formularioGastos.reset();
};

//clases
class UI{
    mostrarPresupuesto = (presupuesto) => {
        const spanBudge = document.querySelector("#spanPresupuesto");
        const spanRemaining = document.querySelector("#spanRestante");
        spanBudge.textContent = presupuesto;
        spanRemaining.textContent = presupuesto;
    }

    mostrarGastos = (gastos) => {
        const {nombre , precio} = gastos
        const tbody = document.querySelector("#tbody");
        const contenido = `<tr>
                                <td>${nombre}</td>
                                <td class="bg-primary badge badge-pill">$${precio}</td>
                                <td><i class="bi bi-trash3-fill btnDelete"></i></td>
                            </tr>`;
        tbody.innerHTML += contenido;
    }
    

}

const ui = new UI();

//eventos
formularioPregunta.addEventListener("submit", preguntarPresupuesto);
formularioGastos.addEventListener("submit", ingresarGastos)
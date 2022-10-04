//variables
const divBudge = document.querySelector("#presupuesto");
const askBudge = document.querySelector("#preguntarPresupuesto");
const formularioPregunta = document.querySelector("#formulario-pregunta");
const formularioGastos = document.querySelector("#formulario-gastos");
const listado = document.querySelector("#listado");
const divGastos = document.querySelector("#divGastos");
const spanBudge = document.querySelector("#spanPresupuesto");
const spanRemaining = document.querySelector("#spanRestante");
const tbody = document.querySelector("#tbody");
let gastosSemanales = [];

//funciones

const preguntarPresupuesto = e => {
    e.preventDefault();
    const input = askBudge.children[1].children[0];
    const presupuesto = parseInt(input.value); 
    
    while (presupuesto === "" || isNaN(presupuesto) || presupuesto <= 0) {
        ui.imprimirError(input,"Presupuesto no válido");
        return;
    }

    
    askBudge.classList.add("d-none");
    divBudge.classList.remove("d-none")
    divBudge.classList.add("d-flex");

    ui.mostrarPresupuesto(presupuesto);
}    

const ingresarGastos = e => {
    e.preventDefault();
    const gasto = document.querySelector("#gasto").value;
    const cantidad = parseInt(document.querySelector("#cantidad").value);
    

    if (gasto === "" || cantidad === "" ) {
        ui.imprimirAlerta("Ambos campos son obligatorios");
        return
    }
    else if (cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta("Cantidad no válida");
        return
    }

    
    const gastos = {
        nombre: gasto,
        precio: cantidad,
        id: Date.now()
    }

    gastosSemanales = [...gastosSemanales, gastos];
    

    ui.mostrarGastos(gastos);
    formularioGastos.reset();
    actualizarRestante();
};


const eliminarGasto = e => {
    if (e.target.classList.contains("btnDelete")) {
        e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement)
    }
    const btnId = Number(e.target.parentElement.parentElement.id)
     gastosSemanales = gastosSemanales.filter(gastos => gastos.id !== btnId)
    
}

const actualizarRestante = () => {
    const input = askBudge.children[1].children[0];
    const presupuesto = parseInt(input.value); 
    let restante = gastosSemanales.reduce((total, gasto) => total + gasto.precio, 0);
    const presupuestoActualizado = presupuesto - restante
    
    ui.imprimirPresupuestoActulizado(presupuestoActualizado);
}

 

//clases
class UI {
    mostrarPresupuesto = (presupuesto) => {
        spanBudge.textContent = presupuesto;
        spanRemaining.textContent = presupuesto;
    };

    mostrarGastos = (gastos) => {
        const { nombre, precio, id } = gastos;

        const contenido = `<tr id="${id}">
                                <td>${nombre.charAt(0).toUpperCase() + nombre.slice(1)}</td>
                                <td class="bg-primary badge badge-pill">$${precio}</td>
                                <td><i class="bi bi-trash3-fill btnDelete"></i></td>
                            </tr>`;

        tbody.innerHTML += contenido;
    };

    imprimirPresupuestoActulizado = (presAct) => {
        spanRemaining.textContent = presAct;
    };

    imprimirAlerta = (mensaje) => {
        const divMessage = document.createElement("div");
        divMessage.classList.add("alert", "alert-danger");
        divMessage.textContent = mensaje;
        setTimeout(() => {
            divMessage.remove();
        }, 1500);

        divGastos.insertBefore(divMessage, formularioGastos);
    };

    imprimirError = (input, mensaje) => {
        const errorMessage = document.createElement("p");
        errorMessage.classList.add("alert", "alert-danger");
        input.classList.add("border-danger");
        errorMessage.textContent = mensaje;
        setTimeout(() => {
            errorMessage.remove();
        }, 900);

        askBudge.insertBefore(errorMessage, formularioPregunta);
        formularioPregunta.reset();
    };
}

const ui = new UI();

//eventos
formularioPregunta.addEventListener("submit", preguntarPresupuesto);
formularioGastos.addEventListener("submit", ingresarGastos)
tbody.addEventListener("click", eliminarGasto)



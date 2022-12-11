const ahorro = document.getElementById("ahorro")
const ingresos = document.getElementById("ingreso")
const gastos = document.getElementById("gasto")
const list = document.getElementById("list")
const form = document.getElementById("form")
const tipoGasto = document.getElementById("tipoGasto")
const cantidadGasto = document.getElementById("cantidadGasto")
const localStorageTransacciones = JSON.parse(
    localStorage.getItem('transacciones')
);

let transacciones = localStorage.getItem('transacciones') !== null ? localStorageTransacciones : [];


// Funcion Ppal
function AñadirTransaccion(event) {
    event.preventDefault();

    if (tipoGasto.value,trim() === '' || cantidadGasto.value,trim() === ''){
        alert('Introduzca tipo de Gasto y Cantidad');
    }else {
        const transaccion = {
            id: generateID(),
            tipoGasto: tipoGasto.value,
            cantidadGasto: +cantidadGasto.value,
        };
       
        transacciones.push(transaccion);
        añadirALista(transaccion);
        actualizarValores()
        actualizarLocalStorage()

        tipoGasto.value = ''
        cantidadGasto.value = ''
    }
}


// Funcion que Añade gastos-ingresos a la Lista
function añadirALista(transaccion) {
    
    const signo = transaccion.cantidadGasto < 0 ? '-' : '+';
    const newItem = document.createElement('li');
    newItem.classList.add(transaccion.cantidadGasto < 0 ? 'minus' : 'plus');

    newItem.innerHTML = `${transaccion.tipoGasto} <span>${signo}${Math.abs(transaccion.cantidadGasto)}</span>
    <button class="borrar-boton" onclick="borrarTransaccion(${transaccion.id})">❌</button>`;

    list.appendChild(newItem);
}

// Generar ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Funcion que borra transacciones
function borrarTransaccion(id) {
    transacciones = transacciones.filter(transaccion => id !== transaccion.id);

    actualizarLocalStorage();
    inicio();
}

// Funcion que Actualiza Valores
function actualizarValores() {

    const cantidades = transacciones.map(transaccion => Number(transaccion.cantidadGasto));

    const totalAhorro = cantidades.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const totalIngresos = cantidades
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const totalGastos = (cantidades.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    ahorro.innerText = `$${totalAhorro}`;
    ingresos.innerText = `$${totalIngresos}`;
    gastos.innerText = `$${totalGastos}`;

}

// Funcion que Actualiza LocalStorage
function actualizarLocalStorage(){
    localStorage.setItem('transacciones', JSON.stringify(transacciones));
}

// Funcion Inicio
function inicio() {
    list.innerHTML='';
    transacciones.forEach(añadirALista);
    actualizarValores()
}

inicio();
form.addEventListener('submit', AñadirTransaccion);
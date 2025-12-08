let contador = 0;
let lista = document.getElementById("lista");
let cantidad = document.getElementById("cantidad");

function agregar(producto) {
    contador++;
    cantidad.textContent = contador;

    let item = document.createElement("li");
    item.textContent = producto;
    lista.appendChild(item);
}

// Inicializar el carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || {};

function agregarProducto(id, name, price, image) {
    // Validar los datos del producto
    if (!id || !name || !price || !image) {
        console.error('Datos del producto no válidos:', { id, name, price, image });
        return;
    }

    // Asegurar que el precio es un número válido
    let precioNumerico = parseFloat(price);
    if (isNaN(precioNumerico)) {
        precioNumerico = 0;
        console.warn(`Precio no válido para el producto ${name}. Se establece en 0.`);
    }

    if (carrito[id]) {
        carrito[id].quantity++;
    } else {
        carrito[id] = {
            id: id,
            name: name,
            price: precioNumerico,
            image: image,
            quantity: 1
        };
    }

    actualizarLocalStorage();
    cargarCarrito();
}

function eliminarProducto(id) {
    if (carrito[id]) {
        delete carrito[id];
        actualizarLocalStorage();
        cargarCarrito();
    }
}

function actualizarLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function decrementarCantidad(id) {
    if (carrito[id] && carrito[id].quantity > 1) {
        carrito[id].quantity--;
        actualizarLocalStorage();
        cargarCarrito();
    } else if (carrito[id] && carrito[id].quantity === 1) {
        eliminarProducto(id);
    }
}

function incrementarCantidad(id) {
    if (carrito[id]) {
        carrito[id].quantity++;
        actualizarLocalStorage();
        cargarCarrito();
    }
}

function cargarCarrito() {
    let carritoContainer = document.getElementById('carrito');
    if (!carritoContainer) {
        console.error('El contenedor del carrito no se encontró');
        return;
    }

    console.log('Contenido del carrito:', carrito);

    if (Object.keys(carrito).length === 0) {
        console.log('El carrito está vacío');
        carritoContainer.innerHTML = '<p>El carrito está vacío</p>';
        return;
    }

    let html = '';
    let total = 0;

    for (let id in carrito) {
        let producto = carrito[id];
        console.log('Procesando producto:', producto);
        if (producto && producto.name && producto.image) {
            let price = parseFloat(producto.price);
            if (isNaN(price)) {
                price = 0;
                console.warn(`Precio no válido para el producto ${producto.name}. Se establece en 0.`);
                producto.price = 0;
                carrito[id] = producto;
            }
            
            html += `
                <div class="producto-carrito">
                    <img src="${producto.image}" alt="${producto.name}" class="imagen-producto" onerror="this.src='ruta/imagen/por/defecto.jpg'">
                    <div class="info-producto">
                        <h3>${producto.name}</h3>
                        <p>Price: $${price.toFixed(2)}</p>
                        <div class="cantidad">
                            <button class="btn-cantidad" onclick="decrementarCantidad('${id}')">-</button>
                            <span class="cantidad-valor">${producto.quantity}</span>
                            <button class="btn-cantidad" onclick="incrementarCantidad('${id}')"> +</button>
                        </div>
                        <button class="btn-eliminar" onclick="eliminarProducto('${id}')">Eliminar</button>
                    </div>
                </div>
            `;
            total += price * producto.quantity;
        }
    }

    html += `
        <div class="total-carrito">
            <h3>Total: $${total.toFixed(2)}</h3>
            <button class="btn-finalizar" onclick="finalizarCompra()">Finalizar Compra</button>
        </div>
    `;

    carritoContainer.innerHTML = html;
}

function finalizarCompra() {
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const documento = document.getElementById('documento').value;
    const direccion = document.getElementById('direccion').value;
    const metodoPago = document.querySelector('input[name="metodo-pago"]:checked').value;

    if (!nombre || !telefono || !email || !documento || !direccion) {
        alert("Por favor, complete todos los campos del formulario.");
        return;
    }

    // Aquí normalmente enviarías los datos a un servidor
    console.log("Datos de la compra:", { nombre, telefono, email, documento, direccion, metodoPago, carrito });

    // Simular una compra exitosa
    alert("¡Compra finalizada con éxito! Gracias por su compra.");
    
    // Limpiar el carrito y los formularios
    carrito = {};
    actualizarLocalStorage();
    document.getElementById('formulario-comprador').reset();
    document.getElementById('formulario-pago').reset();
    cargarCarrito();
}

// Cargar el carrito cuando la página se carga
window.onload = cargarCarrito;
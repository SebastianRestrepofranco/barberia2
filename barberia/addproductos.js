function addToCart(productId, name, price, image) {
    // Obtener el carrito actual del localStorage o iniciar uno nuevo
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Asegurarnos de que el precio es un número válido
    price = typeof price === 'number' && !isNaN(price) ? price : 0;
    
    // Buscar si el producto ya está en el carrito
    let existingProduct = carrito.find(item => item.id === productId);
    
    if (existingProduct) {
        // Si el producto ya está, incrementar la cantidad
        existingProduct.quantity += 1;
    } else {
        // Si no, añadir el nuevo producto
        carrito.push({
            id: productId,
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Opcional: Mostrar un mensaje de confirmación
    alert('Producto añadido al carrito');
}

// Modificar la parte donde se obtiene el precio
document.addEventListener('DOMContentLoaded', function() {
    let addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            let product = this.closest('.grid-item');
            let productId = product.dataset.productId;
            let name = product.querySelector('h3').textContent;
            
            // Obtener el precio de manera más robusta
            let priceText = product.querySelector('.precio').textContent;
            let price = parseFloat(priceText.replace(/[^\d.,]/g, '').replace(',', '.'));
            
            let image = product.querySelector('img').src;
            
            addToCart(productId, name, price, image);
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cartIcon');
    const cartSection = document.getElementById('cartSection');
    const cartItemsContainer = document.getElementById('cartItems');
    const totalCostElement = document.getElementById('totalCost');
    const checkoutButton = document.getElementById('checkoutButton');
    const cartCountElement = document.getElementById('cartCount');

    // Initialize cart and total cost
    let cart = [];
    let totalCost = 0;

    // Define Products
    const products = [
        { id: 1, name: 'F1 24', price: 29.99 },
        { id: 2, name: 'Gran Turismo 7', price: 49.99 },
        { id: 3, name: 'FC 24', price: 19.99 },
        { id: 4, name: 'God Of War Ragnarok', price: 39.99 },
        { id: 5, name: 'THE LAST OF US 2', price: 59.99 }
    ];

    // Add to Cart Functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product');
            const product = products.find(p => p.id === parseInt(productId, 10));
            if (product) {
                const existingProductIndex = cart.findIndex(item => item.id === product.id);
                if (existingProductIndex > -1) {
                    cart[existingProductIndex].quantity += 1;
                } else {
                    cart.push({ ...product, quantity: 1 });
                }
                updateCart();
            }
        });
    });

    // Update Cart
    function updateCart() {
        cartSection.classList.remove('hidden');
        cartItemsContainer.innerHTML = '';
        totalCost = 0;

        cart.forEach(item => {
            totalCost += item.price * item.quantity;
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <div class="quantity-controls">
                    <button class="quantity-decrease" data-product="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-increase" data-product="${item.id}">+</button>
                </div>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-item" data-product="${item.id}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        totalCostElement.textContent = `$${totalCost.toFixed(2)}`;
        cartCountElement.textContent = cart.length;

        // Add Event Listeners for Quantity Controls
        document.querySelectorAll('.quantity-decrease').forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-product');
                const productIndex = cart.findIndex(item => item.id === parseInt(productId, 10));
                if (cart[productIndex].quantity > 1) {
                    cart[productIndex].quantity -= 1;
                } else {
                    cart.splice(productIndex, 1);
                }
                updateCart();
            });
        });

        document.querySelectorAll('.quantity-increase').forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-product');
                const productIndex = cart.findIndex(item => item.id === parseInt(productId, 10));
                if (productIndex > -1) {
                    cart[productIndex].quantity += 1;
                    updateCart();
                }
            });
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-product');
                cart = cart.filter(item => item.id !== parseInt(productId, 10));
                updateCart();
            });
        });

        checkoutButton.disabled = cart.length === 0;
    }

    // Toggle Cart Section Visibility
    cartIcon.addEventListener('click', () => {
        cartSection.classList.toggle('hidden');
    });

    // Checkout Functionality
    checkoutButton.addEventListener('click', () => {
        alert('Thank you for your purchase!');
        // Clear the cart
        cart = [];
        updateCart();
    });

    // Initialize cart UI
    updateCart();
});

const productList = document.getElementById("productList");
const cartTableBody = document.getElementById("cartTableBody");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartMessage = document.getElementById("cartMessage");
const clearCartButton = document.getElementById("clearCart");

const products = [
    { id: 1, name: "Notebook", price: 5.5 },
    { id: 2, name: "Pen Set", price: 3.25 },
    { id: 3, name: "Desk Lamp", price: 18.0 },
    { id: 4, name: "USB Drive", price: 12.75 }
];

const cartState = {
    items: []
};

clearCartButton.addEventListener("click", clearCart);

renderProducts();
renderCart();

function renderProducts() {
    productList.replaceChildren();

    products.forEach((product) => {
        const card = document.createElement("article");
        card.className = "product-card";

        const title = document.createElement("strong");
        title.textContent = product.name;

        const price = document.createElement("span");
        price.textContent = formatCurrency(product.price);

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Add to cart";
        button.addEventListener("click", () => addToCart(product.id));

        card.append(title, price, button);
        productList.appendChild(card);
    });
}

function addToCart(productId) {
    const item = cartState.items.find((entry) => entry.productId === productId);

    if (item) {
        item.quantity += 1;
    } else {
        cartState.items.push({ productId, quantity: 1 });
    }

    renderCart();
    setMessage("Product added to cart.", "success");
}

function updateQuantity(productId, value) {
    const quantity = Number(value);

    if (!Number.isInteger(quantity) || quantity < 1) {
        removeFromCart(productId);
        return;
    }

    const item = cartState.items.find((entry) => entry.productId === productId);
    item.quantity = quantity;
    renderCart();
    setMessage("Cart quantity updated.", "success");
}

function removeFromCart(productId) {
    cartState.items = cartState.items.filter((entry) => entry.productId !== productId);
    renderCart();
    setMessage("Product removed from cart.", "success");
}

function clearCart() {
    if (cartState.items.length === 0) {
        setMessage("Cart is already empty.", "error");
        return;
    }

    cartState.items = [];
    renderCart();
    setMessage("Cart cleared.", "success");
}

function renderCart() {
    cartTableBody.replaceChildren();

    if (cartState.items.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 5;
        cell.className = "empty-state";
        cell.textContent = "Your cart is empty.";
        row.appendChild(cell);
        cartTableBody.appendChild(row);
        cartItems.textContent = "0";
        cartTotal.textContent = "$0.00";
        return;
    }

    let itemCount = 0;
    let total = 0;

    cartState.items.forEach((item) => {
        const product = products.find((entry) => entry.id === item.productId);
        const subtotal = product.price * item.quantity;
        itemCount += item.quantity;
        total += subtotal;

        const row = document.createElement("tr");

        appendCell(row, product.name);
        appendCell(row, formatCurrency(product.price));

        const quantityCell = document.createElement("td");
        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.min = "1";
        quantityInput.value = item.quantity;
        quantityInput.className = "quantity-input";
        quantityInput.addEventListener("change", () => updateQuantity(item.productId, quantityInput.value));
        quantityCell.appendChild(quantityInput);

        const actionCell = document.createElement("td");
        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "secondary";
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => removeFromCart(item.productId));
        actionCell.appendChild(removeButton);

        row.appendChild(quantityCell);
        appendCell(row, formatCurrency(subtotal));
        row.appendChild(actionCell);
        cartTableBody.appendChild(row);
    });

    cartItems.textContent = String(itemCount);
    cartTotal.textContent = formatCurrency(total);
}

function appendCell(row, value) {
    const cell = document.createElement("td");
    cell.textContent = value;
    row.appendChild(cell);
}

function formatCurrency(value) {
    return `$${value.toFixed(2)}`;
}

function setMessage(text, tone) {
    cartMessage.textContent = text;
    cartMessage.className = tone ? `message ${tone}` : "message";
}

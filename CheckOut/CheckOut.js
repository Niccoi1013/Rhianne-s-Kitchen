document.getElementById('deliveryTab').onclick = function() {
    this.classList.add('active');
    document.getElementById('pickupTab').classList.remove('active');
    document.getElementById('deliverySection').style.display = '';
    document.getElementById('pickupSection').style.display = 'none';
};
document.getElementById('pickupTab').onclick = function() {
    this.classList.add('active');
    document.getElementById('deliveryTab').classList.remove('active');
    document.getElementById('pickupSection').style.display = '';
    document.getElementById('deliverySection').style.display = 'none';
};

function renderOrderBox() {
    const orderBox = document.getElementById('orderBox');
    let cart = JSON.parse(localStorage.getItem('yourCart')) || [];
    let subtotal = 0;
    orderBox.innerHTML = '';
    if (cart.length === 0) {
        orderBox.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const p = document.createElement('p');
            p.innerHTML = `${item.amount} × ${item.foodName} <span>₱${(item.price * item.amount).toFixed(2)}</span>`;
            orderBox.appendChild(p);
            subtotal += item.price * item.amount;
        });
        orderBox.innerHTML += `
            <hr>
            <p>Subtotal <span>₱${subtotal.toFixed(2)}</span></p>
            <p>Service Fee <span>₱${subtotal > 0 ? '100.00' : '₱0.00'}</span></p>
            <div class="total-line">
                <strong>Total</strong>
                <strong>₱${(subtotal + (subtotal > 0 ? 100 : 0)).toFixed(2)}</strong>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', renderOrderBox);
window.addEventListener('storage', renderOrderBox);

const paymentBtn = document.getElementById("paymentBtn");
const dropdown = document.getElementById("paymentDropdown");

if (paymentBtn) {
    paymentBtn.addEventListener("click", () => {
        dropdown.classList.toggle("show");
    });
}

document.querySelectorAll(".dropdown-item").forEach(item => {
    item.addEventListener("click", () => {
        paymentBtn.textContent = "Payment: " + item.dataset.method;
        dropdown.classList.remove("show");
    });
});

const pickupDateInput = document.getElementById('pickupDate');
const pickupDateBox = document.getElementById('pickupDateBox');
const pickupDateText = document.getElementById('pickupDateText');
pickupDateBox.onclick = function() {
    pickupDateInput.click();
};
pickupDateInput.onchange = function() {
    pickupDateText.textContent = pickupDateInput.value || "Select a date";
};

const placeOrderBtn = document.getElementById('placeOrder');

if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('yourCart')) || [];
        if (!cart.length) {
            alert('Your cart is empty.');
            return;
        }

        const orderPayload = {
            items: cart,
            createdAt: new Date().toISOString()
        };
        localStorage.setItem('orderedItems', JSON.stringify(orderPayload));

        alert('Order placed successfully!');

        localStorage.removeItem('yourCart');

        window.location.href = '../Orders/Orders.html';
    });
}


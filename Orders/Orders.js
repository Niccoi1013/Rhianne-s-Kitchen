document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('ordersList');

    if (!container) return;

    const raw = localStorage.getItem('orderedItems');
    if (!raw) {
        container.innerHTML = '<p>No recent orders found.</p>';
        return;
    }

    const order = JSON.parse(raw);
    const items = order.items || [];

    if (!items.length) {
        container.innerHTML = '<p>No items in the last order.</p>';
        return;
    }

    const itemsLabel = items
        .map(it => `${it.amount || 0}× ${it.foodName || ''}`)
        .join(', ');

    const total = items.reduce((sum, it) => sum + ((it.price || 0) * (it.amount || 0)), 0);

    const deliveryDate = new Date(order.createdAt || Date.now());
    deliveryDate.setHours(deliveryDate.getHours() + 1);
    const deliveryStr = deliveryDate.toLocaleString();

    const card = document.createElement('div');
    card.className = 'order-card';
    card.innerHTML = `
        <div class="order-row">
            <div class="order-items">${itemsLabel}</div>
            <div class="order-total">₱${total.toFixed(2)}</div>
        </div>
        <div class="order-date">Ordered at: ${new Date(order.createdAt).toLocaleString()}</div>
        <div class="order-delivery">Will be delivered at: ${deliveryStr} (approx. 1 hour)</div>
    `;

    container.appendChild(card);
});

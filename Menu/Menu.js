const menuItems = {
    chicken: [
        { foodName: "Chicken Hamonado", price: 540 },
        { foodName: "Cordon Bleu", price: 550 },
        { foodName: "Lechon Manok", price: 395 }
    ],
    pork: [
        { foodName: "Crispy Kare-Kare", price: 480 },
        { foodName: "Pork Mushroom", price: 450 },
        { foodName: "Menudo", price: 500 },
        { foodName: "Lumpiang Shanghai", price: 450 },
        { foodName: "Igado", price: 450 },
        { foodName: "Crispy Liempo", price: 400 },
        { foodName: "Pork Binagoongan", price: 450 },
        { foodName: "Pork Steak", price: 450 },
        { foodName: "Pork Sisig", price: 400 },
        { foodName: "Dinakdakan", price: 400 },
        { foodName: "Crispy Pata", price: 500 }
    ],
    beef: [
        { foodName: "Caldereta", price: 540 },
        { foodName: "Beef Steak", price: 550 },
        { foodName: "Beef Broccoli", price: 490 },
        { foodName: "Garlic Pepper Beef", price: 480 }
    ],
    fish: [
        { foodName: "Crispy Fish Fillet", price: 420 },
        { foodName: "Relyenong Bangus", price: 380 },
        { foodName: "Baked Bangus", price: 430 }
    ],
    pasta: [
        { foodName: "Lasagna", price: 500 },
        { foodName: "Bake Mac", price: 500 },
        { foodName: "Carbonara", price: 550 },
        { foodName: "Spaghetti", price: 550 },
        { foodName: "Pesto", price: 530 },
        { foodName: "Sisig Pancit Bihon", price: 540 },
        { foodName: "Pancit Canton", price: 550 },
        { foodName: "Pancit Palabok", price: 550 }
    ],
    vegetables: [
        { foodName: "Chopsuey", price: 550 },
        { foodName: "Pakbet", price: 500 },
        { foodName: "Mixed Vegetables", price: 480 },
        { foodName: "Lumpiang Gulay", price: 500 },
        { foodName: "Pochero", price: 520 }
    ],
    frozenGoods: [
        { foodName: "Skinless Longganisa", price: 80 },
        { foodName: "Garlic Longganisa", price: 80 },
        { foodName: "Sweet Glazed Ham", price: 150 },
        { foodName: "Pork Siomai", price: 80 },
        { foodName: "Chicken Empanada", price: 75 },
        { foodName: "Ham & Cheese", price: 75 },
        { foodName: "Pork Sausage", price: 100 },
        { foodName: "Chicken Sausage", price: 100 },
        { foodName: "Pork Tocino", price: 120 },
        { foodName: "Chicken Tocino", price: 120 }
    ]
};

window.yourCart = window.yourCart || [];

function addToCartByCategoryAndIndex(category, index) {
    const item = menuItems[category][index];
    let amount = prompt(`How many ${item.foodName}?`, 1);
    if (amount !== null) {
        amount = parseInt(amount, 10);
        if (!isNaN(amount) && amount > 0) {
            
            const existing = window.yourCart.find(cartItem => cartItem.foodName === item.foodName && cartItem.price === item.price);
            if (existing) {
                existing.amount += amount;
            } else {
                window.yourCart.push({
                    ...item,
                    amount: amount
                });
            }
            alert(`${item.foodName} (${amount}) added to cart.`);
        } else {
            alert('Invalid amount!');
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const addButtons = document.querySelectorAll('.add-btn');
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = button.closest('.menu-card');
            const category = card.getAttribute('data-category');
            const index = card.getAttribute('data-index');
            addToCartByCategoryAndIndex(category, index);
        });
    });
});


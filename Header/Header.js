document.addEventListener('DOMContentLoaded', function() {
    const cartBtn = document.getElementById('cartBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCartBtn = document.getElementById('closeCart');

    cartBtn.addEventListener('click', function() {
        cartSidebar.classList.add('active');
    });

    closeCartBtn.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
    });

    document.addEventListener('mousedown', function(event) {
        if (!cartSidebar.contains(event.target) && !cartBtn.contains(event.target)) {
            cartSidebar.classList.remove('active');
        }
    });

    window.yourCart = JSON.parse(localStorage.getItem('yourCart')) || [];

    
    function getImageSrc(foodName) {
        const images = {
            "Chicken Hamonado": "../Images/CHICKEN HAMONADO.png",
            "Cordon Bleu": "../images/CORDON BLEU.png",
            "Lechon Manok": "../images/LECHON MANOK.png",
            "Crispy Kare-Kare": "../images/CRISPY KARE-KARE.png",
            "Pork Mushroom": "../images/CREAMY PORK MUSHROOM.png",
            "Menudo": "../images/MENUDO.png",
            "Lumpiang Shanghai": "../images/LUMPIANG SHANGHAI.png",
            "Igado": "../images/IGADO.png",
            "Crispy Liempo": "../images/CRISPY LIEMPO.png",
            "Pork Binagoongan": "../images/PORK BINAGOONGAN.png",
            "Pork Steak": "../images/PORK STEAK.png",
            "Pork Sisig": "../images/PORK SISIG.png",
            "Dinakdakan": "../images/DINAKDAKAN.png",
            "Crispy Pata": "../images/CRISPY PATA.png",
            "Caldereta": "../images/BEEF CALDERETA.png",
            "Beef Steak": "../images/BEEF STEAK.png",
            "Beef Broccoli": "../images/BEEF BROCOLLI.png",
            "Garlic Pepper Beef": "../images/GARLIC PEPPER BEEF.png",
            "Crispy Fish Fillet": "../images/CRISPY FISH FILLET.png",
            "Relyenong Bangus": "../images/RELYENONG BANGUS.png",
            "Baked Bangus": "../images/CHESSEY BAKED BANGUS.png",
            "Lasagna": "../images/LASAGNA.png",
            "Bake Mac": "../images/CHEESY BAKED MACARONI.png",
            "Carbonara": "../images/CARBONARA.png",
            "Spaghetti": "../images/SPAGHETTI.png",
            "Pesto": "../images/PESTO.png",
            "Sisig Pancit Bihon": "../images/SISIG PANCIT BIHON.png",
            "Pancit Canton": "../images/PANCIT CANTON.png",
            "Pancit Palabok": "../images/PANCIT PALABOK.png",
            "Chopsuey": "../images/CHOPSUEY.png",
            "Pakbet": "../images/PAKBET.png",
            "Mixed Vegetables": "../images/CREAMY MILK VEGETABLE.png",
            "Lumpiang Gulay": "../images/LUMPIANG GULAY.png",
            "Pochero": "../images/POCHERO.png",
            "Skinless Longganisa": "../images/PORK LONGGANISA.png",
            "Garlic Longganisa": "../images/CHICKEN LONGGANISA.png",
            "Sweet Glazed Ham": "../images/SWEET GLAZED HAM.png",
            "Pork Siomai": "../images/PORK SIOMAI.png",
            "Chicken Empanada": "../images/CHICKEN EMPANADA.png",
            "Ham & Cheese": "../images/HAM & CHEESE EMPANADA.png",
            "Pork Sausage": "../images/PORK SAUSAGE.png",
            "Chicken Sausage": "../images/CHICKEN SAUSAGE.png",
            "Pork Tocino": "../images/PORK TOCINO.png",
            "Chicken Tocino": "../images/CHICKEN TOCINO.png"
        };
        return images[foodName] || "../images/LOGO.png";
    }

    function renderCartItems() {
        const cartItemsDiv = document.getElementById('cartItems');
        const itemCountSpan = document.getElementById('itemCount');
        const cartTotalSpan = document.getElementById('cartTotal');
        cartItemsDiv.innerHTML = '';

        let totalItems = 0;
        let subtotal = 0;

        window.yourCart.forEach((item, idx) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';

            itemDiv.innerHTML = `
                <div class="cart-item-header-row">
                    <span class="cart-item-title">${item.foodName}</span>
                    <img class="cart-item-img" src="${getImageSrc(item.foodName)}" alt="${item.foodName}">
                </div>
                <div class="cart-item-bottom-row">
                    <div class="cart-item-price">₱${item.price.toFixed(2)}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" data-action="decrease" data-index="${idx}">-</button>
                        <span class="cart-item-amount">${item.amount}</span>
                        <button class="quantity-btn" data-action="increase" data-index="${idx}">+</button>
                        <button class="delete-btn" data-action="delete" data-index="${idx}">&#128465;</button>
                    </div>
                </div>
            `;
            cartItemsDiv.appendChild(itemDiv);

            totalItems += item.amount;
            subtotal += item.price * item.amount;
        });

        const serviceFee = subtotal > 0 ? 100 : 0;
        const total = subtotal + serviceFee;

        itemCountSpan.textContent = totalItems;
        cartTotalSpan.textContent = `₱${total.toFixed(2)}`;

        localStorage.setItem('yourCart', JSON.stringify(window.yourCart));

        cartItemsDiv.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.onclick = function() {
                const idx = parseInt(btn.getAttribute('data-index'));
                const action = btn.getAttribute('data-action');
                if (action === 'increase') {
                    window.yourCart[idx].amount += 1;
                } else if (action === 'decrease') {
                    if (window.yourCart[idx].amount > 1) {
                        window.yourCart[idx].amount -= 1;
                    }
                }
                renderCartItems();
            };
        });
        cartItemsDiv.querySelectorAll('.delete-btn').forEach(btn => {
            btn.onclick = function() {
                const idx = parseInt(btn.getAttribute('data-index'));
                window.yourCart.splice(idx, 1);
                renderCartItems();
            };
        });
    }

    cartBtn.addEventListener('click', function() {
        cartSidebar.classList.add('active');
        renderCartItems();
    });

    
    const checkoutBtns = document.querySelectorAll('.checkout-btn');
    checkoutBtns.forEach(btn => {
        btn.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = "../CheckOut/CheckOut.html";
        });
    });

    const settingsBtn = document.getElementById('settingsBtn');
    const settingsDropdown = document.getElementById('settingsDropdown');

    if (settingsBtn && settingsDropdown) {
        settingsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            settingsDropdown.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!settingsBtn.contains(e.target) && !settingsDropdown.contains(e.target)) {
                settingsDropdown.classList.remove('show');
            }
        });
    }

    function updateAccountLinkFromHeader() {
        const userSettings = localStorage.getItem('userSettings');
        const accountLinks = document.querySelectorAll('a[href="../Login/Login.html"]');
        
        accountLinks.forEach(link => {
            if (userSettings) {
                link.href = '../Settings/Settings.html';
            }
        });
    }

    updateAccountLinkFromHeader();
});
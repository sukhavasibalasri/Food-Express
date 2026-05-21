const menuItems = [
    {
        id: 1,
        name: "Margherita Pizza",
        category: "pizza",
        price: 12.99,
        img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
        desc: "Classic pizza with tomato sauce, mozzarella, and basil"
    },
    {
        id: 2,
        name: "Pepperoni Pizza",
        category: "pizza",
        price: 14.99,
        img: "https://images.unsplash.com/photo-1628840042765-356cda07504e",
        desc: "Pizza with tomato sauce, mozzarella, and pepperoni"
    },
    {
        id: 3,
        name: "Veggie Burger",
        category: "burger",
        price: 9.99,
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
        desc: "Vegetarian burger with fresh vegetables"
    },
    {
        id: 4,
        name: "Cheeseburger",
        category: "burger",
        price: 10.99,
        img: "https://images.unsplash.com/photo-1561758033-d89a9ad46330",
        desc: "Classic beef burger with cheese"
    },
    {
        id: 5,
        name: "Spaghetti Carbonara",
        category: "pasta",
        price: 11.99,
        img: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb",
        desc: "Pasta with eggs, cheese, pancetta"
    },
    {
        id: 6,
        name: "Greek Salad",
        category: "salad",
        price: 8.99,
        img: "https://images.unsplash.com/photo-1607532941433-304659e8198a",
        desc: "Fresh vegetables with feta cheese"
    }
];

const menuContainer = document.querySelector('.menu-items');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartBtn = document.querySelector('.cart-icon');
const cartModal = document.querySelector('.cart-modal');
const closeCart = document.querySelector('.close-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.total-price');
const cartCount = document.querySelector('.cart-count');
const checkoutBtn = document.querySelector('.checkout-btn');

let cart = [];

function displayMenuItems(items){

    menuContainer.innerHTML = items.map(item => {

        return `
        <div class="col-md-6 col-lg-4">

            <div class="menu-item h-100" data-id="${item.id}">

                <img src="${item.img}" alt="${item.name}">

                <div class="menu-item-info">

                    <h3>${item.name}</h3>

                    <p>${item.desc}</p>

                    <span class="price">$${item.price.toFixed(2)}</span>

                    <button class="btn btn-danger add-to-cart">
                        Add to Cart
                    </button>

                </div>
            </div>
        </div>
        `;
    }).join('');

    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', addToCart);
    });
}

filterBtns.forEach(btn => {

    btn.addEventListener('click', () => {

        filterBtns.forEach(btn => btn.classList.remove('active'));

        btn.classList.add('active');

        const category = btn.dataset.category;

        if(category === 'all'){
            displayMenuItems(menuItems);
        }
        else{

            const filtered = menuItems.filter(item =>
                item.category === category
            );

            displayMenuItems(filtered);
        }
    });
});

function addToCart(e){

    const menuItem = e.target.closest('.menu-item');

    const id = parseInt(menuItem.dataset.id);

    const selectedItem = menuItems.find(item => item.id === id);

    const existingItem = cart.find(item => item.id === id);

    if(existingItem){
        existingItem.quantity += 1;
    }
    else{
        cart.push({...selectedItem, quantity:1});
    }

    updateCart();
}

function updateCart(){

    const totalItems = cart.reduce((total,item) =>
        total + item.quantity,0
    );

    cartCount.textContent = totalItems;

    renderCartItems();

    updateTotal();
}

function renderCartItems(){

    if(cart.length === 0){

        cartItemsContainer.innerHTML =
        `<p>Your cart is empty</p>`;

        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => {

        return `
        <div class="cart-item" data-id="${item.id}">

            <img src="${item.img}" alt="${item.name}">

            <div class="cart-item-info">

                <h5>${item.name}</h5>

                <span class="price">
                    $${item.price.toFixed(2)}
                </span>

            </div>

            <div class="cart-item-quantity">

                <button class="decrease-btn">-</button>

                <span>${item.quantity}</span>

                <button class="increase-btn">+</button>

            </div>

            <i class="fas fa-trash remove-item"></i>

        </div>
        `;
    }).join('');

    document.querySelectorAll('.decrease-btn').forEach(btn => {
        btn.addEventListener('click', decreaseQuantity);
    });

    document.querySelectorAll('.increase-btn').forEach(btn => {
        btn.addEventListener('click', increaseQuantity);
    });

    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', removeItem);
    });
}

function updateTotal(){

    const total = cart.reduce((sum,item) =>
        sum + item.price * item.quantity,0
    );

    cartTotal.textContent = total.toFixed(2);
}

function decreaseQuantity(e){

    const id = parseInt(
        e.target.closest('.cart-item').dataset.id
    );

    const item = cart.find(item => item.id === id);

    if(item.quantity > 1){
        item.quantity--;
    }
    else{
        cart = cart.filter(item => item.id !== id);
    }

    updateCart();
}

function increaseQuantity(e){

    const id = parseInt(
        e.target.closest('.cart-item').dataset.id
    );

    const item = cart.find(item => item.id === id);

    item.quantity++;

    updateCart();
}

function removeItem(e){

    const id = parseInt(
        e.target.closest('.cart-item').dataset.id
    );

    cart = cart.filter(item => item.id !== id);

    updateCart();
}

checkoutBtn.addEventListener('click', () => {

    if(cart.length === 0){

        alert("Your cart is empty!");
        return;
    }

    alert(`Order placed successfully!`);

    cart = [];

    updateCart();

    closeCartModal();
});

cartBtn.addEventListener('click', openCartModal);

closeCart.addEventListener('click', closeCartModal);

cartModal.addEventListener('click', (e) => {

    if(e.target === cartModal){
        closeCartModal();
    }
});

function openCartModal(){

    cartModal.style.display = 'flex';

    document.body.style.overflow = 'hidden';
}

function closeCartModal(){

    cartModal.style.display = 'none';

    document.body.style.overflow = 'auto';
}

displayMenuItems(menuItems);
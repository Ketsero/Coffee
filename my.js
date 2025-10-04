let cooked = document.querySelector(".cooked")
let notcooked = document.querySelector(".notcooked")
let button = document.querySelector(".button")
let coffee = document.querySelector(".coffee")
let krishka = document.querySelector(".krishka")
let divs = document.querySelectorAll(".div")
let image = document.querySelector(".img")

button.addEventListener('click', function() {
  anime({
      targets: coffee,
      translateY: 200,
      duration: 2000,
      easing: 'easeInOutQuad',
      complete: () => {
          notcooked.style.opacity = "0";
          cooked.style.opacity = "1";

          krishka.style.zIndex = "2";
          coffee.style.opacity = "0"
          anime({
              targets: krishka,
              translateY: 105,
              rotate: 360,
              duration: 2000,
              easing: 'easeOutQuad'
          });
      }
  });
});

let menu_button = document.querySelector('.stick')
let one_button = document.querySelector('.stick-1')
let two_button = document.querySelector('.stick-2')
let menu = document.querySelector('.navigation')
let hideTimeout;

menu_button.addEventListener('mouseenter', () => {
    clearTimeout(hideTimeout);
    menu.style.opacity = "1";
    menu.style.transition = "500ms";
    menu.style.zIndex = "3";
});

menu_button.addEventListener('mouseleave', () => {
    hideTimeout = setTimeout(() => {
        if (!menu.matches(':hover')) {
            menu.style.opacity = "0";
            menu.style.transition = "2s";
            menu.style.zIndex = "-1";
        }
    }, 300);
});

menu.addEventListener('mouseenter', () => {
    clearTimeout(hideTimeout);
    menu.style.opacity = "1";
    menu.style.transition = "500ms";
    menu.style.zIndex = "3";
});

menu.addEventListener('mouseleave', () => {
    hideTimeout = setTimeout(() => {
        if (!menu_button.matches(':hover')) {
            menu.style.opacity = "0";
            menu.style.transition = "2s";
            menu.style.zIndex = "-1";
        }
    }, 300);
});

const cardsContainer = document.getElementById("cards");
const template = document.getElementById("card-template");

function createCard(product) {
  const clone = template.content.cloneNode(true);

  clone.querySelector(".card__img").src =
    product.image || "img/placeholder.png";
  clone.querySelector(".card__img").alt = product.title || "Товар";
  clone.querySelector(".card__title").textContent = product.title;
  clone.querySelector(".card__desc").textContent = product.description;
  clone.querySelector(".card__price").textContent = product.price + " грн";  clone.querySelector(".card__btn").addEventListener("click", () => {
    addToCart(product);
  });

  return clone;
}

function loadProducts() {
    fetch("products.json")
      .then((res) => res.json())
      .then((products) => {
        cardsContainer.innerHTML = "";
        products.forEach((product) => {
          const card = createCard(product);
          cardsContainer.appendChild(card);
        });
      })
    }

    window.addEventListener("DOMContentLoaded", loadProducts);

    // ================== КОШИК ==================
    const cartBtn = document.getElementById("btn-cart");
    const cartModal = document.getElementById("cart-modal");
    const closeCart = document.getElementById("close-cart");
    const cartList = document.getElementById("cart-list");
    const cartCount = document.getElementById("cart-count");
    
    // Отримуємо масив з localStorage
    function getCart() {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    }
    
    // Зберігаємо масив у localStorage
    function saveCart(cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    
    // Оновлюємо лічильник у хедері
    function updateCartCount() {
      const cart = getCart();
      cartCount.textContent = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    }
    
    // Додаємо товар у кошик
    function addToCart(product) {
      let cart = getCart();
      const existing = cart.find((item) => item.id === product.id);
      if (existing) {
        existing.qty = (existing.qty || 1) + 1;
      } else {
        product.qty = 1;
        cart.push(product);
      }
      saveCart(cart);
      updateCartCount();
    }
    
    // Відображення кошика
    function renderCart() {
      const cart = getCart();
      cartList.innerHTML = "";
    
      if (cart.length === 0) {
        cartList.innerHTML = "<li>Кошик порожній</li>";
        return;
      }
    
      let total = 0;
    
      cart.forEach((item) => {
        total += item.price * (item.qty || 1);
    
        const li = document.createElement("li");
        li.className = "cart-item";
        li.dataset.id = item.id;
    
        li.innerHTML = `
          <span>${item.title}</span>
          <div class="cart-controls">
            <button class="minus">-</button>
            <span class="qty">${item.qty}</span>
            <button class="plus">+</button>
            <span class="price">${item.price} ₴</span>
            <button class="remove">×</button>
          </div>
        `;
    
        // Події на кнопки плюс, мінус, видалити
        li.querySelector(".plus").addEventListener("click", () => {
          item.qty += 1;
          saveCart(cart);
          renderCart();
          updateCartCount();
        });
    
        li.querySelector(".minus").addEventListener("click", () => {
          item.qty = Math.max(item.qty - 1, 1);
          saveCart(cart);
          renderCart();
          updateCartCount();
        });
    
        li.querySelector(".remove").addEventListener("click", () => {
          const idx = cart.findIndex((i) => i.id === item.id);
          if (idx !== -1) cart.splice(idx, 1);
          saveCart(cart);
          renderCart();
          updateCartCount();
        });
    
        cartList.appendChild(li);
      });
    
      // Додаємо загальну суму в кінець списку
      const totalLi = document.createElement("li");
      totalLi.style.fontWeight = "bold";
      totalLi.style.marginTop = "10px";
      totalLi.textContent = "Загальна сума: " + total.toFixed(2) + " ₴";
      cartList.appendChild(totalLi);
    }
    
    // Відкриття та закриття модалки
    cartBtn.onclick = () => {
      renderCart();
      cartModal.classList.remove("hidden");
    };
    closeCart.onclick = () => cartModal.classList.add("hidden");
    
    // Ініціалізація лічильника при старті
    updateCartCount();
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

let buttons = document.querySelectorAll('.buttons');
let buy_div = document.querySelector('.buy_div');
let buy_btn = document.querySelector('.buy-btn');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buy_div.style.zIndex = "3";
    buy_div.style.opacity = "1";
  });
});

let phone_input = document.querySelector('.number');

buy_btn.addEventListener('click', () => {
    let phone = phone_input.value;
    if (phone.length < 13) {
        alert("Будь ласка, введіть повний номер телефону");
    }
    else {
    alert("Ваша заявка відправлена продавцю!")
    buy_div.style.zIndex = "-3";
    buy_div.style.opacity = "0";
    }
});
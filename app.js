const products = [
  {
    id: 1, name: "Creality Ender-3 V3", cat: "home", catLabel: "Домашний", emoji: "🖨️",
    desc: "Классика для новичков. Автовыравнивание стола, прямой экструдер, PLA/PETG/TPU. Область 220×220×250 мм.",
    price: 18900, rating: 4, reviews: 312, speed: "250 мм/с", volume: "220×220×250"
  },
  {
    id: 2, name: "Bambu Lab A1", cat: "home", catLabel: "Домашний", emoji: "🟠",
    desc: "Скоростной домашний принтер до 500 мм/с с поддержкой 4-цветной печати через AMS Lite. Автокалибровка, Wi-Fi.",
    price: 54900, rating: 5, reviews: 178, speed: "500 мм/с", volume: "256×256×256"
  },
  {
    id: 3, name: "Prusa MK4S", cat: "pro", catLabel: "Профи", emoji: "🔵",
    desc: "Легендарная надёжность от Prusa Research. Датчик нагрузки, Input Shaping, поддержка PA, ASA, PETG-CF.",
    price: 78000, rating: 5, reviews: 245, speed: "300 мм/с", volume: "250×210×220"
  },
  {
    id: 4, name: "Elegoo Saturn 4 Ultra", cat: "resin", catLabel: "Смоляной", emoji: "🟣",
    desc: "Монохромный 12K LCD, область 218×123×220 мм. Идеален для фигурок, стоматологии, ювелирки. Засветка 1–3 сек.",
    price: 42500, rating: 4, reviews: 89, speed: "70 мм/ч", volume: "218×123×220"
  },
  {
    id: 5, name: "Creality K1 Max", cat: "pro", catLabel: "Профи", emoji: "⚡",
    desc: "CoreXY с закрытой камерой 300×300×300 мм. До 600 мм/с, AI-мониторинг, встроенная камера, ABS и ASA из коробки.",
    price: 95000, rating: 5, reviews: 134, speed: "600 мм/с", volume: "300×300×300"
  },
  {
    id: 6, name: "Anycubic Photon M5s", cat: "resin", catLabel: "Смоляной", emoji: "💜",
    desc: "12K монохромный экран, смарт-датчик уровня смолы, авто-калибровка платформы. Лёгкий старт без лишних настроек.",
    price: 31200, rating: 4, reviews: 67, speed: "60 мм/ч", volume: "200×118×200"
  },
  {
    id: 7, name: "Bambu Lab X1-Carbon", cat: "pro", catLabel: "Профи", emoji: "🏆",
    desc: "Флагман с лидаром, AI-детекцией, AMS 4 цвета, Carbon-рамой. Карбон-файбер, PA, PC до 300°C. Лучший в классе.",
    price: 145000, rating: 5, reviews: 301, speed: "500 мм/с", volume: "256×256×256"
  },
  {
    id: 8, name: "Creality Ender-5 S1", cat: "home", catLabel: "Домашний", emoji: "🟡",
    desc: "CoreXY с жёстким кубическим корпусом. Прямой экструдер Sprite, скорость 250 мм/с, отличный апгрейд с Ender-3.",
    price: 29900, rating: 4, reviews: 156, speed: "250 мм/с", volume: "220×220×280"
  },
  {
    id: 9, name: "Phrozen Sonic Mega 8K", cat: "resin", catLabel: "Смоляной", emoji: "🔮",
    desc: "Огромная область 330×185×400 мм при разрешении 8K. Для крупных деталей и профессионального производства фигур.",
    price: 68000, rating: 4, reviews: 44, speed: "80 мм/ч", volume: "330×185×400"
  },
  {
    id: 10, name: "Bambu Lab P1S", cat: "pro", catLabel: "Профи", emoji: "🔶",
    desc: "Закрытая камера, активная фильтрация воздуха, 500 мм/с. Печать PA, PC, PET-CF инженерных материалов из коробки.",
    price: 119000, rating: 5, reviews: 210, speed: "500 мм/с", volume: "256×256×256"
  },
  {
    id: 11, name: "Anycubic Kobra 3", cat: "home", catLabel: "Домашний", emoji: "🟢",
    desc: "Доступный FDM с автовыравниванием по 25 точкам, прямым экструдером и цветным дисплеем. Отличный старт без затрат.",
    price: 14500, rating: 4, reviews: 98, speed: "200 мм/с", volume: "220×220×250"
  },
  {
    id: 12, name: "Prusa XL Multi-Tool", cat: "pro", catLabel: "Профи", emoji: "🛠️",
    desc: "Система смены до 5 инструментов. Площадь 360×360×360 мм — настоящая мультиматериальная печать без компромиссов.",
    price: 280000, rating: 5, reviews: 62, speed: "400 мм/с", volume: "360×360×360"
  },
];

let cart = [];
let filter = 'all';
let sort = 'default';

const grid      = document.getElementById('productGrid');
const cartBody  = document.getElementById('cartBody');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const toastEl   = new bootstrap.Toast(document.getElementById('toast'), { delay: 2000 });
const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
function renderProducts() {
  let list = products.filter(p => filter === 'all' || p.cat === filter);

  if (sort === 'price-asc')  list.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
  if (sort === 'rating')     list.sort((a, b) => b.rating - a.rating);

  grid.innerHTML = list.map(p => `
    <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
      <div class="product-card">
        <div class="card-img-wrap">${p.emoji}</div>
        <div class="card-body-inner">
          <div class="card-cat-badge">${p.catLabel}</div>
          <div class="card-title-text">${p.name}</div>
          <div class="card-desc">${p.desc}</div>
          <div class="card-meta">
            <span><i class="bi bi-lightning-fill"></i> ${p.speed}</span>
            <span><i class="bi bi-box"></i> ${p.volume}</span>
          </div>
          <div class="card-stars">${'★'.repeat(p.rating)}${'☆'.repeat(5 - p.rating)}
            <span class="reviews-count">(${p.reviews})</span>
          </div>
          <div class="card-footer-inner">
            <div class="card-price">${p.price.toLocaleString('ru-RU')} ₽</div>
            <button class="btn-add" onclick="addToCart(${p.id})">
              <i class="bi bi-plus-lg me-1"></i>В корзину
            </button>
          </div>
        </div>
      </div>
    </div>`).join('');

  document.getElementById('emptyMsg').classList.toggle('d-none', list.length > 0);
}

function addToCart(id) {
  const p = products.find(p => p.id === id);
  const item = cart.find(i => i.id === id);
  if (item) item.qty++;
  else cart.push({ ...p, qty: 1 });
  updateBadge();
  document.getElementById('toastMsg').textContent = p.name + ' добавлен в корзину';
  toastEl.show();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  updateBadge();
  renderCart();
}

function updateBadge() {
  cartCount.textContent = cart.reduce((s, i) => s + i.qty, 0);
}

function renderCart() {
  if (!cart.length) {
    cartBody.innerHTML = '<p class="text-muted text-center py-4">Корзина пуста</p>';
    cartTotal.textContent = 'Итого: 0 ₽';
    return;
  }
  cartBody.innerHTML = cart.map(i => `
    <div class="cart-item">
      <div class="cart-item-icon">${i.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${i.name}</div>
        <div class="cart-item-price">${(i.price * i.qty).toLocaleString('ru-RU')} ₽</div>
      </div>
      <div class="cart-item-qty">
        <div class="qty-btn" onclick="changeQty(${i.id}, -1)">−</div>
        <span>${i.qty}</span>
        <div class="qty-btn" onclick="changeQty(${i.id}, 1)">+</div>
      </div>
    </div>`).join('');
  cartTotal.textContent = 'Итого: ' + cart.reduce((s, i) => s + i.price * i.qty, 0).toLocaleString('ru-RU') + ' ₽';
}

document.getElementById('cartBtn').onclick = () => { renderCart(); cartModal.show(); };

document.getElementById('checkoutBtn').onclick = () => {
  if (!cart.length) return;
  cart = [];
  updateBadge();
  renderCart();
  cartModal.hide();
  document.getElementById('toastMsg').textContent = 'Заказ оформлен! Спасибо 🎉';
  toastEl.show();
};

document.querySelectorAll('.btn-filter').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filter = btn.dataset.cat;
    renderProducts();
  };
});

document.getElementById('sortSelect').onchange = e => { sort = e.target.value; renderProducts(); };
renderProducts();

// 1) Создаём карту
const map = L.map('map').setView([55.7558,37.6173],13);

// 2) Добавляем OSM-плитки
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:'&copy; OpenStreetMap', maxZoom:19
}).addTo(map);

// 3) Загружаем точки и ставим маркеры
fetch('assets/data/points.json')
  .then(r=>r.json())
  .then(points=>{
    points.forEach(pt=>{
      L.marker(pt.coords).addTo(map)
        .bindPopup(`<strong>${pt.title}</strong><br>
          <a href="${pt.page}">Перейти</a>`);
    });
  })
  .catch(console.error);

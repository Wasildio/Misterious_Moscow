// assets/js/point.js

// Проверяем, что в странице задан идентификатор точки
if (typeof POINT_ID === 'undefined') {
  console.error('POINT_ID is not defined');
  throw new Error('POINT_ID is not defined');
}
const id = POINT_ID;

// Сначала вытаскиваем human-readable title из points.json
fetch('assets/data/points.json')
  .then(r => r.json())
  .then(points => {
    const pt = points.find(p => p.id === id);
    if (!pt) throw new Error(`Point not found: ${id}`);

    // Устанавливаем title страницы и заголовок H1
    document.title = pt.title;
    document.getElementById('point-title').textContent = pt.title;

    // Подставляем аудио .ogg
    document.getElementById('audio-player').src = `assets/audio/${id}.mp3`;

    // Заполняем карусель из 10 фотографий
    const carousel = document.getElementById('photo-carousel');
    for (let i = 1; i <= 10; i++) {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `<img src="assets/images/${id}/${String(i).padStart(2,'0')}.jpg" alt="">`;
      carousel.appendChild(slide);
    }
    new Swiper('.swiper-container', {
      loop: true,
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
    });

    // **Вот эта строка**: загружаем Markdown-файл point1.md … point5.md
  // … ранее в файле …
return fetch(`assets/data/${id}.md`);
  })
  .then(r => {
    if (!r.ok) throw new Error(`${id}.md load failed: ${r.status}`);
    return r.text();
  })
  .then(md => {
    // здесь мы теперь вызываем .parse
    document.getElementById('point-text').innerHTML = marked.parse(md);
  })
  .catch(err => {
    console.error(err);
    document.getElementById('point-text').textContent = 'Не удалось загрузить контент.';
  });


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('menuBtn').addEventListener('click', function() {
        window.location.href = '../Menu/Menu.html';
    });
    document.getElementById('contactsBtn').addEventListener('click', function() {
        window.location.href = '../Contacts/Contacts.html';
    });
});


(function () {
  const images = [
    '../Images/catering 6.jpg',
    '../Images/dish 6.jpg',
    '../Images/dish 7.jpg',
    '../Images/dish 8.jpg',
    '../Images/dish 9.jpg',
    '../Images/collage 2.jpg'
  ];

  const intervalMs = 5000; // time each image is shown
  const fadeMs = 1000;     // should match CSS transition duration

  function preload(src) {
    const img = new Image();
    img.src = src;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const cycler = document.querySelector('.bg-cycler');
    if (!cycler) return;

    // preload images
    images.forEach(preload);

    // create two slide elements to alternate between for smooth crossfade
    const slideA = document.createElement('div');
    const slideB = document.createElement('div');
    slideA.className = 'bg-slide';
    slideB.className = 'bg-slide';
    cycler.appendChild(slideA);
    cycler.appendChild(slideB);

    let idx = 0;
    let showing = slideA;
    let hidden = slideB;

    // initialize
    showing.style.backgroundImage = `url('${images[idx]}')`;
    showing.classList.add('visible');

    // advance function
    setInterval(() => {
      idx = (idx + 1) % images.length;
      hidden.style.backgroundImage = `url('${images[idx]}')`;

      // bring hidden to visible (fade in), hide current after short delay to allow crossfade
      hidden.classList.add('visible');
      showing.classList.remove('visible');

      // swap references
      const tmp = showing;
      showing = hidden;
      hidden = tmp;
    }, intervalMs);
  });
})();
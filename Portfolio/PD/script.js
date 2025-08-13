const cards = document.querySelectorAll('.fade-in');

function revealContent() {
    const windowHeight = window.innerHeight;
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < windowHeight - 100) {
            card.classList.add('show');
        }
    });
}

function createShootingStar() {
    const header = document.querySelector('.header-section');
    if (!header) return;
    
    const star = document.createElement('div');
    star.classList.add('shooting-star');

    const startTop = Math.random() * header.offsetHeight;
    const startLeft = Math.random() * window.innerWidth;

    star.style.top = `${startTop}px`;
    star.style.left = `${startLeft}px`;
    star.style.setProperty('animation-delay', `${Math.random() * 5}s`);

    document.body.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 3000);
}

setInterval(createShootingStar, 1000);
window.addEventListener('scroll', revealContent);
document.addEventListener('DOMContentLoaded', () => {
    revealContent();
});
// Toggle between Dark and Light mode
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
}

// Typewriter Effect: types text character by character
function typeWriter(elementId, text, delay = 50) {
  let i = 0;
  const element = document.getElementById(elementId);
  element.classList.add("typewriter");
  element.textContent = "";

  const timer = setInterval(() => {
    element.textContent += text.charAt(i);
    i++;
    if (i > text.length) {
      clearInterval(timer);
      element.classList.remove("typewriter"); 
    }
  }, delay);
}

document.addEventListener("DOMContentLoaded", () => {

  // Start typewriter effect for the name
  typeWriter("type-name", "Monruedee Wongwanitchakun", 80);

  // Progress Bars Animation
  document.querySelectorAll(".progress").forEach(progress => {
    let target = parseInt(progress.getAttribute("data-percent"), 10);
    let bar = progress.querySelector("div");
    let startTime = null;
    let duration = 1500; 

    function animateBar(timestamp) {
      if (!startTime) startTime = timestamp;
      let progressTime = timestamp - startTime;
      let percent = Math.min((progressTime / duration) * target, target);

      bar.style.width = percent + "%";
      bar.textContent = Math.round(percent) + "%";

      if (percent < target) {
        requestAnimationFrame(animateBar); 
      }
    }
    requestAnimationFrame(animateBar);
  });

  // Circular Skills Animation
  document.querySelectorAll('.circle').forEach(circle => {
    let target = parseInt(circle.getAttribute('data-percent'), 10);
    let startTime = null;
    let duration = 1500; 

    // Change color based on percentage
    function getColor(p) {
      if (p >= 80) return '#00ff88';
      if (p >= 70) return '#ffcc00';
      return '#ff7b00'; 
    }

    function animateCircle(timestamp) {
      if (!startTime) startTime = timestamp;
      let progressTime = timestamp - startTime;
      let percent = Math.min((progressTime / duration) * target, target);

      circle.style.setProperty('--percent', percent); 
      circle.style.setProperty('--color', getColor(percent)); 
      let label = circle.querySelector('span').innerHTML.split('<br>')[0];
      circle.querySelector('span').innerHTML = `${label}<br>${Math.round(percent)}%`;

      if (percent < target) {
        requestAnimationFrame(animateCircle); 
      }
    }
    requestAnimationFrame(animateCircle);
  });

  // Scroll Projects (horizontal scroll)
  function scrollProjects(direction) {
    const container = document.querySelector('.projects-container');
    container.scrollBy({ left: direction * 300, behavior: 'smooth' });
  }

  // Set footer year to current year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Back to Top button
  window.onscroll = function () {
    document.getElementById('backToTop').style.display =
      window.scrollY > 300 ? 'block' : 'none';
  };

  // Smooth scroll to top
  window.scrollToTop = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
});

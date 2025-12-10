document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.getElementById('carousel-container');
    if (!carouselContainer) return;

    const track = carouselContainer.querySelector('.carousel-track');
    const items = carouselContainer.querySelectorAll('.gallery-item');
    const prevButton = carouselContainer.querySelector('.prev-btn');
    const nextButton = carouselContainer.querySelector('.next-btn');
  
    
    let currentIndex = 0;
    const maxIndex = items.length - 3; 

  
    function updateCarousel() {
        const offset = -currentIndex * (100 / 3);
        track.style.transform = `translateX(${offset}%)`;
    }
    
    nextButton.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0; 
        }
        updateCarousel();
    });
   
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex;
        }
        updateCarousel();
    });
    
    updateCarousel(); 
});

// --- AUTOSLIDE ---
setInterval(() => {
    if (currentIndex < maxIndex) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateCarousel();
}, 3000); // Cambia cada 3 segundos

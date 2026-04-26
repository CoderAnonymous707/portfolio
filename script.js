const overlay = document.getElementById('gallery-overlay');
const galleryImg = document.getElementById('gallery-img');
const projectTitle = document.getElementById('project-title');
const projectCap = document.getElementById('project-cap');
const closeBtn = document.getElementById('close-gallery');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentImages = [];
let currentIndex = 0;

// 1. Open Gallery
document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('click', () => {
        currentImages = [];

        // Pull data from the card
        // currentImages = JSON.parse(card.getAttribute('data-images'));
        imageData = JSON.parse(card.getAttribute('data-images'));

        for (let i = 1; i <= imageData[1]; i++) {
            currentImages.push(`Portfolio/${imageData[0]}/${i}.jpeg`);
        }

        projectTitle.innerText = card.getAttribute('data-title');
        projectCap.innerText = card.getAttribute('data-sub');
        currentIndex = 0;
        
        updateGalleryImage();
        overlay.style.display = 'flex';
    });
});

// 2. Update Image Source
function updateGalleryImage() {
    galleryImg.src = currentImages[currentIndex];
}

// 3. Navigation Logic
nextBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents clicking through to the overlay
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateGalleryImage();
});

prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateGalleryImage();
});

// 4. Close Gallery
closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
});

// Close when clicking outside the image
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.style.display = 'none';
});
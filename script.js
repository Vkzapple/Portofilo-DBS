// Hamburger Menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Skill Bars Animation pake Intersection Observer
const skillSection = document.querySelector(".skills-section");
const skillBars = document.querySelectorAll(".skill-progress");
const percentageDisplays = document.querySelectorAll(".percentage");

const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      skillBars.forEach((bar, index) => {
        const percentage = bar.getAttribute("data-percentage");
        bar.style.width = percentage + "%";
        // Animate percentage numbers
        let currentPercent = 0;
        const interval = setInterval(() => {
          if (currentPercent <= parseInt(percentage)) {
            percentageDisplays[index].textContent = currentPercent + "%";
            currentPercent++;
          } else {
            clearInterval(interval);
          }
        }, 15);
      });

      // Unobserve after animation
      observer.unobserve(skillSection);
    }
  });
};

const observer = new IntersectionObserver(observerCallback, {
  threshold: 0.5,
});

observer.observe(skillSection);

// slider
const slider = {
  container: document.querySelector(".slides"),
  slides: document.querySelectorAll(".slide"),
  btnNext: document.querySelector(".slider-btn.next"),
  btnPrev: document.querySelector(".slider-btn.prev"),
  dotsContainer: document.querySelector(".slider-dots"),
  currentSlide: 0,

  init() {
    // dot slider
    this.slides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => this.goToSlide(index));
      this.dotsContainer.appendChild(dot);
    });

    // Event listeners
    this.btnNext.addEventListener("click", () => this.nextSlide());
    this.btnPrev.addEventListener("click", () => this.prevSlide());

    // Touch events buat mobile
    let touchStartX = 0;
    let touchEndX = 0;

    this.container.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    this.container.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        this.nextSlide();
      } else if (touchEndX - touchStartX > 50) {
        this.prevSlide();
      }
    });

    // Auto slide tiap 5 detik
    this.autoSlide = setInterval(() => this.nextSlide(), 5000);

    // Stop auto slide kalo user hover
    this.container.addEventListener("mouseenter", () => {
      clearInterval(this.autoSlide);
    });

    this.container.addEventListener("mouseleave", () => {
      this.autoSlide = setInterval(() => this.nextSlide(), 5000);
    });
  },

  updateSlider() {
    // Update posisi slider
    this.container.style.transform = `translateX(-${this.currentSlide * 100}%)`;

    // Update active dot
    const dots = this.dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentSlide);
    });

    // fade effect
    this.slides.forEach((slide, index) => {
      if (index === this.currentSlide) {
        slide.style.opacity = "1";
      } else {
        slide.style.opacity = "0.7";
      }
    });
  },

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.updateSlider();
  },

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.updateSlider();
  },

  goToSlide(index) {
    this.currentSlide = index;
    this.updateSlider();
  },
};

// Initialize slider
slider.init();

// Smooth scroll buat nav links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    const headerOffset = 80;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  });
});

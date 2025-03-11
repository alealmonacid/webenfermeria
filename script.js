document.addEventListener("DOMContentLoaded", () => {
  // Slider functionality
  const slides = document.querySelectorAll(".slide")
  const dots = document.querySelectorAll(".dot")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")
  let currentSlide = 0
  let slideInterval

  // Initialize slider
  function initSlider() {
    // Start automatic slideshow
    startSlideshow()

    // Add event listeners for controls
    prevBtn.addEventListener("click", prevSlide)
    nextBtn.addEventListener("click", nextSlide)

    // Add event listeners for dots
    dots.forEach((dot) => {
      dot.addEventListener("click", function () {
        const slideIndex = Number.parseInt(this.getAttribute("data-index"))
        goToSlide(slideIndex)
      })
    })
  }

  // Go to specific slide
  function goToSlide(index) {
    // Remove active class from current slide and dot
    slides[currentSlide].classList.remove("active")
    dots[currentSlide].classList.remove("active")

    // Update current slide index
    currentSlide = index

    // Handle index out of bounds
    if (currentSlide < 0) {
      currentSlide = slides.length - 1
    } else if (currentSlide >= slides.length) {
      currentSlide = 0
    }

    // Add active class to new slide and dot
    slides[currentSlide].classList.add("active")
    dots[currentSlide].classList.add("active")

    // Reset slideshow timer
    resetSlideshow()
  }

  // Go to next slide
  function nextSlide() {
    goToSlide(currentSlide + 1)
  }

  // Go to previous slide
  function prevSlide() {
    goToSlide(currentSlide - 1)
  }

  // Start automatic slideshow
  function startSlideshow() {
    slideInterval = setInterval(nextSlide, 5000)
  }

  // Reset slideshow timer
  function resetSlideshow() {
    clearInterval(slideInterval)
    startSlideshow()
  }

  // Initialize slider
  initSlider()

  // Collapsible service items
  const serviceItems = document.querySelectorAll(".service-item")

  serviceItems.forEach((item) => {
    const header = item.querySelector(".service-header")

    header.addEventListener("click", () => {
      // Toggle active class on clicked item
      item.classList.toggle("active")

      // Close other items (optional - for accordion style)
      serviceItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active")
        }
      })
    })
  })

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const body = document.body

  // Create mobile menu if it doesn't exist
  if (!document.querySelector(".mobile-menu")) {
    const mobileMenu = document.createElement("div")
    mobileMenu.className = "mobile-menu"

    const mobileMenuContent = `
            <div class="mobile-menu-header">
                <div class="logo">
                    <h1>EnfermeríaPro</h1>
                </div>
                <div class="close-menu">
                    <i class="fas fa-times"></i>
                </div>
            </div>
            <ul>
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#servicios">Servicios</a></li>
                <li><a href="#nosotros">Nosotros</a></li>
                <li><a href="#contacto">Contacto</a></li>
            </ul>
        `

    mobileMenu.innerHTML = mobileMenuContent
    body.appendChild(mobileMenu)

    // Add event listener to close button
    const closeMenu = mobileMenu.querySelector(".close-menu")
    closeMenu.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
    })

    // Add event listeners to menu links
    const menuLinks = mobileMenu.querySelectorAll("a")
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active")
      })
    })
  }

  // Get the mobile menu
  const mobileMenu = document.querySelector(".mobile-menu")

  // Toggle mobile menu
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.add("active")
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        // Get header height for offset
        const headerHeight = document.querySelector("header").offsetHeight

        // Calculate position to scroll to
        const targetPosition = targetElement.offsetTop - headerHeight

        // Scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })
})

document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita el envío tradicional del formulario

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let message = document.getElementById("message").value;

  let whatsappNumber = "56975409648"; // Reemplaza con tu número de WhatsApp (sin + ni espacios)
  let whatsappMessage = `Hola, mi nombre es *${name}*.
📧 Correo: ${email}
📞 Teléfono: ${phone}
✉️ Mensaje: ${message}`;

  let whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  
  window.open(whatsappURL, "_blank");
});


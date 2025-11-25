const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-up")
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

document.addEventListener("DOMContentLoaded", () => {
  // Apply animations to sections
  document.querySelectorAll("section, .product-card, .card-premium").forEach((el) => {
    observer.observe(el)
  })
})

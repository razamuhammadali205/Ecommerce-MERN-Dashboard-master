class AuthModal {
  constructor() {
    this.modalOpen = false
    this.currentTab = "login"
    this.init()
  }

  init() {
    this.createModalHTML()
    this.attachEventListeners()
  }

  createModalHTML() {
    const modalHTML = `
            <div id="auth-modal" class="auth-modal" style="display: none;">
                <div class="auth-modal-overlay"></div>
                <div class="auth-modal-content">
                    <button class="auth-modal-close">&times;</button>
                    
                    <div class="auth-tabs">
                        <button class="auth-tab active" data-tab="login">Login</button>
                        <button class="auth-tab" data-tab="signup">Sign Up</button>
                    </div>

                    <!-- Login Form -->
                    <form id="login-form" class="auth-form active">
                        <h2>Welcome Back</h2>
                        <p>Sign in to your account to continue</p>
                        
                        <div class="form-group">
                            <label for="login-email">Email</label>
                            <input type="email" id="login-email" name="email" placeholder="your@email.com" required>
                        </div>

                        <div class="form-group">
                            <label for="login-password">Password</label>
                            <input type="password" id="login-password" name="password" placeholder="••••••••" required>
                        </div>

                        <div class="form-checkbox">
                            <input type="checkbox" id="remember-me">
                            <label for="remember-me">Remember me</label>
                        </div>

                        <button type="submit" class="auth-button btn-premium">Sign In</button>
                        
                        <p class="auth-link">
                            Forgot password? <a href="#" class="link-premium">Reset here</a>
                        </p>
                    </form>

                    <!-- Signup Form -->
                    <form id="signup-form" class="auth-form">
                        <h2>Create Account</h2>
                        <p>Join us to start your skincare journey</p>
                        
                        <div class="form-group">
                            <label for="signup-name">Full Name</label>
                            <input type="text" id="signup-name" name="name" placeholder="John Doe" required>
                        </div>

                        <div class="form-group">
                            <label for="signup-email">Email</label>
                            <input type="email" id="signup-email" name="email" placeholder="your@email.com" required>
                        </div>

                        <div class="form-group">
                            <label for="signup-password">Password</label>
                            <input type="password" id="signup-password" name="password" placeholder="••••••••" required>
                        </div>

                        <div class="form-group">
                            <label for="signup-confirm">Confirm Password</label>
                            <input type="password" id="signup-confirm" name="confirm" placeholder="••••••••" required>
                        </div>

                        <div class="form-checkbox">
                            <input type="checkbox" id="terms" required>
                            <label for="terms">I agree to the <a href="#">Terms & Conditions</a></label>
                        </div>

                        <button type="submit" class="auth-button btn-premium">Create Account</button>
                    </form>
                </div>
            </div>
        `

    document.body.insertAdjacentHTML("beforeend", modalHTML)
  }

  attachEventListeners() {
    // Tab switching
    document.querySelectorAll(".auth-tab").forEach((tab) => {
      tab.addEventListener("click", (e) => {
        const tabName = e.target.dataset.tab
        this.switchTab(tabName)
      })
    })

    // Close button
    document.querySelector(".auth-modal-close").addEventListener("click", () => this.closeModal())

    // Overlay close
    document.querySelector(".auth-modal-overlay").addEventListener("click", () => this.closeModal())

    // Form submissions
    document.getElementById("login-form").addEventListener("submit", (e) => this.handleLogin(e))
    document.getElementById("signup-form").addEventListener("submit", (e) => this.handleSignup(e))

    // Account link
    const accountLinks = document.querySelectorAll('a[href="account.html"]')
    accountLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        this.openModal()
      })
    })
  }

  switchTab(tabName) {
    this.currentTab = tabName

    // Update tabs
    document.querySelectorAll(".auth-tab").forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.tab === tabName)
    })

    // Update forms
    document.querySelectorAll(".auth-form").forEach((form) => {
      form.classList.toggle("active", form.id === `${tabName}-form`)
    })
  }

  openModal() {
    const modal = document.getElementById("auth-modal")
    modal.style.display = "flex"
    setTimeout(() => modal.classList.add("active"), 10)
    this.modalOpen = true
    document.body.style.overflow = "hidden"
  }

  closeModal() {
    const modal = document.getElementById("auth-modal")
    modal.classList.remove("active")
    setTimeout(() => (modal.style.display = "none"), 300)
    this.modalOpen = false
    document.body.style.overflow = "auto"
  }

  handleLogin(e) {
    e.preventDefault()
    const email = document.getElementById("login-email").value
    const password = document.getElementById("login-password").value

    // Store user session (demo)
    localStorage.setItem(
      "user-session",
      JSON.stringify({
        email: email,
        loggedIn: true,
        timestamp: new Date(),
      }),
    )

    alert("Login successful! (Demo mode)")
    this.closeModal()
  }

  handleSignup(e) {
    e.preventDefault()
    const name = document.getElementById("signup-name").value
    const email = document.getElementById("signup-email").value
    const password = document.getElementById("signup-password").value
    const confirm = document.getElementById("signup-confirm").value

    if (password !== confirm) {
      alert("Passwords do not match!")
      return
    }

    // Store user (demo)
    localStorage.setItem(
      "user-session",
      JSON.stringify({
        name: name,
        email: email,
        loggedIn: true,
        timestamp: new Date(),
      }),
    )

    alert("Account created successfully! (Demo mode)")
    this.closeModal()
  }
}

// Initialize modal on page load
document.addEventListener("DOMContentLoaded", () => {
  window.authModal = new AuthModal()
})

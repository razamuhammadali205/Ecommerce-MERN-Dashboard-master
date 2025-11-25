class ShoppingCart {
  constructor() {
    this.storageKey = "skinceuticels-cart"
    this.cart = this.loadCart()
  }

  loadCart() {
    const stored = localStorage.getItem(this.storageKey)
    return stored ? JSON.parse(stored) : []
  }

  saveCart() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cart))
    this.updateCartUI()
  }

  addProduct(product) {
    const existing = this.cart.find((item) => item.id === product.id)

    if (existing) {
      existing.quantity += product.quantity || 1
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: product.quantity || 1,
      })
    }

    this.saveCart()
    this.showCartNotification(product.name)
  }

  removeProduct(productId) {
    this.cart = this.cart.filter((item) => item.id !== productId)
    this.saveCart()
  }

  updateQuantity(productId, quantity) {
    const item = this.cart.find((item) => item.id === productId)
    if (item) {
      item.quantity = Math.max(1, quantity)
      this.saveCart()
    }
  }

  getCart() {
    return this.cart
  }

  getTotalItems() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0)
  }

  getTotalPrice() {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  updateCartUI() {
    const cartCount = document.getElementById("cart-count-header")
    if (cartCount) {
      cartCount.textContent = this.getTotalItems()
    }

    // Update cart page if on it
    const cartTable = document.getElementById("cart-table-body")
    if (cartTable) {
      this.renderCartTable()
    }
  }

  renderCartTable() {
    const cartTable = document.getElementById("cart-table-body")
    if (!cartTable) return

    cartTable.innerHTML = ""
    this.cart.forEach((item) => {
      const row = document.createElement("tr")
      row.innerHTML = `
                <td>
                    <img src="${item.image}" alt="${item.name}" style="width: 80px; border-radius: 6px;">
                </td>
                <td>
                    <strong>${item.name}</strong><br>
                    <small>${item.category}</small>
                </td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" value="${item.quantity}" min="1" 
                        onchange="window.appCart.updateQuantity('${item.id}', this.value)"
                        style="width: 60px; padding: 6px; border: 1px solid #ddd; border-radius: 4px;">
                </td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                    <button onclick="window.appCart.removeProduct('${item.id}')" 
                        style="background: #ff4d4f; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">
                        Remove
                    </button>
                </td>
            `
      cartTable.appendChild(row)
    })

    // Update totals
    const totalElement = document.getElementById("cart-total")
    if (totalElement) {
      totalElement.textContent = `$${this.getTotalPrice().toFixed(2)}`
    }
  }

  showCartNotification(productName) {
    const notification = document.createElement("div")
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #008c99;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `
    notification.textContent = `✓ ${productName} added to cart!`
    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.animation = "fadeOut 0.3s ease-out"
      setTimeout(() => notification.remove(), 300)
    }, 2500)
  }
}

const style = document.createElement("style")
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`
document.head.appendChild(style)

// Initialize cart globally
window.appCart = new ShoppingCart()

document.addEventListener("DOMContentLoaded", () => {
  window.appCart.updateCartUI()
})

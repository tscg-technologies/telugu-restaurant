/**
 * ============================================================================
 * TELUGU RESTAURANT - MASTER JAVASCRIPT
 * Pure Vanilla JavaScript | Zero Frameworks / Dependencies
 * Features: Mobile Nav, Sticky Header, Cart Management, Form Validation,
 * Category Filtering, Search, Lightbox Modal, Demo Checkout, Back-to-Top.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     1. STICKY HEADER & ACTIVE NAV LINK
     -------------------------------------------------------------------------- */
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('is-scrolled');
    } else {
      header?.classList.remove('is-scrolled');
    }
  });

  // Highlight active link based on current page path
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* --------------------------------------------------------------------------
     2. MOBILE NAVIGATION DRAWER
     -------------------------------------------------------------------------- */
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('is-active');
      navMenu.classList.toggle('is-active');
      document.body.style.overflow = navMenu.classList.contains('is-active') ? 'hidden' : '';
    });

    // Close when clicking nav links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('is-active');
        navMenu.classList.remove('is-active');
        document.body.style.overflow = '';
      });
    });
  }

  /* --------------------------------------------------------------------------
     3. SHOPPING CART ENGINE (LOCAL MEMORY / DEMO ONLY)
     -------------------------------------------------------------------------- */
  let cart = [];

  // DOM Elements
  const cartToggleBtns = document.querySelectorAll('.cart-toggle-btn');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const cartCountBadges = document.querySelectorAll('.cart-badge');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const cartTaxEl = document.getElementById('cartTax');
  const cartTotalEl = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');

  // Open/Close Cart
  function openCart() {
    cartSidebar?.classList.add('is-open');
    cartOverlay?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartSidebar?.classList.remove('is-open');
    cartOverlay?.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  cartToggleBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openCart();
  }));

  cartCloseBtn?.addEventListener('click', closeCart);
  cartOverlay?.addEventListener('click', closeCart);

  // Add Item to Cart
  function addToCart(id, name, price) {
    const numPrice = parseFloat(price);
    const existingIndex = cart.findIndex(item => item.id === id);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        id: id,
        name: name,
        price: numPrice,
        quantity: 1
      });
    }

    renderCart();
    showToast(`Added "${name}" to your demo cart!`);
  }

  // Update Item Quantity
  function updateQuantity(id, delta) {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
      cart[itemIndex].quantity += delta;
      if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
      }
    }
    renderCart();
  }

  // Remove Item
  function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
  }

  // Render Cart UI
  function renderCart() {
    if (!cartItemsContainer) return;

    // Calculate totals
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = Math.round(subtotal * 0.05); // 5% illustrative GST
    const total = subtotal + tax;

    // Update Badges
    cartCountBadges.forEach(badge => {
      badge.textContent = totalCount;
    });

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty-message">
          <div class="cart-empty-icon">🛒</div>
          <h4>Your cart is empty</h4>
          <p>Explore our menu and add authentic Telugu delicacies to preview demo ordering.</p>
        </div>
      `;
      if (checkoutBtn) checkoutBtn.disabled = true;
    } else {
      let html = '';
      cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        html += `
          <div class="cart-item">
            <div class="cart-item-info">
              <div class="cart-item-title">${item.name}</div>
              <div class="cart-item-price">₹${item.price} × ${item.quantity} = <strong>₹${itemTotal}</strong></div>
            </div>
            <div class="cart-item-controls">
              <button class="qty-btn" onclick="window.teluguRestaurant.changeCartQty('${item.id}', -1)" aria-label="Decrease quantity">-</button>
              <span class="cart-qty-text">${item.quantity}</span>
              <button class="qty-btn" onclick="window.teluguRestaurant.changeCartQty('${item.id}', 1)" aria-label="Increase quantity">+</button>
              <button class="remove-item-btn" onclick="window.teluguRestaurant.removeCartItem('${item.id}')" title="Remove item">✕</button>
            </div>
          </div>
        `;
      });
      cartItemsContainer.innerHTML = html;
      if (checkoutBtn) checkoutBtn.disabled = false;
    }

    // Update Totals
    if (cartSubtotalEl) cartSubtotalEl.textContent = `₹${subtotal}`;
    if (cartTaxEl) cartTaxEl.textContent = `₹${tax}`;
    if (cartTotalEl) cartTotalEl.textContent = `₹${total}`;
  }

  // Checkout Demo Modal
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) return;
      closeCart();
      showDemoModal(
        'Demo Order Confirmation',
        `Thank you for sampling our Telugu Restaurant interactive demo!
        <br><br>
        <strong>Items Ordered:</strong> ${cart.reduce((sum, i) => sum + i.quantity, 0)} items<br>
        <strong>Illustrative Bill:</strong> ${cartTotalEl ? cartTotalEl.textContent : '₹0'}
        <br><br>
        <span style="display:inline-block; padding:8px 12px; background:#FFF8E7; border-left:3px solid #E5A000; font-size:0.88rem; color:#641E16;">
          ⚠️ <strong>Notice:</strong> This is a generic restaurant category demonstration website. No actual transaction, payment, or food delivery will occur.
        </span>`
      );
      // Reset cart
      cart = [];
      renderCart();
    });
  }

  // Attach Add-to-cart listener for buttons with class .add-to-cart-btn
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-cart-btn');
    if (btn) {
      e.preventDefault();
      const id = btn.getAttribute('data-id') || btn.getAttribute('data-name');
      const name = btn.getAttribute('data-name');
      const price = btn.getAttribute('data-price');
      if (name && price) {
        addToCart(id, name, price);
      }
    }
  });

  // Expose global methods for inline HTML buttons
  window.teluguRestaurant = {
    changeCartQty: (id, delta) => updateQuantity(id, delta),
    removeCartItem: (id) => removeFromCart(id),
    openCart: openCart,
    closeCart: closeCart
  };

  /* --------------------------------------------------------------------------
     4. GENERIC LIGHTBOX & DEMO MODAL SYSTEM
     -------------------------------------------------------------------------- */
  const demoModal = document.getElementById('demoModal');
  const demoModalTitle = document.getElementById('demoModalTitle');
  const demoModalContent = document.getElementById('demoModalContent');
  const demoModalClose = document.getElementById('demoModalClose');

  function showDemoModal(title, content) {
    if (!demoModal) return;
    if (demoModalTitle) demoModalTitle.innerHTML = title;
    if (demoModalContent) demoModalContent.innerHTML = content;
    demoModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeDemoModal() {
    if (!demoModal) return;
    demoModal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  demoModalClose?.addEventListener('click', closeDemoModal);
  demoModal?.addEventListener('click', (e) => {
    if (e.target === demoModal) closeDemoModal();
  });

  /* --------------------------------------------------------------------------
     5. TOAST NOTIFICATION
     -------------------------------------------------------------------------- */
  let toastEl = document.getElementById('siteToast');
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.id = 'siteToast';
    toastEl.className = 'toast';
    document.body.appendChild(toastEl);
  }

  let toastTimeout;
  function showToast(message) {
    clearTimeout(toastTimeout);
    toastEl.textContent = message;
    toastEl.classList.add('show');
    toastTimeout = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2800);
  }

  /* --------------------------------------------------------------------------
     6. BACK TO TOP BUTTON
     -------------------------------------------------------------------------- */
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --------------------------------------------------------------------------
     7. MENU FILTERING & SEARCH (For menu.html)
     -------------------------------------------------------------------------- */
  const menuSearchInput = document.getElementById('menuSearch');
  const categoryBtns = document.querySelectorAll('.cat-btn');
  const menuItems = document.querySelectorAll('.menu-filter-item');

  function filterMenu() {
    const searchTerm = (menuSearchInput?.value || '').toLowerCase().trim();
    const activeBtn = document.querySelector('.cat-btn.active');
    const selectedCategory = activeBtn?.getAttribute('data-category') || 'all';

    menuItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      const itemName = (item.getAttribute('data-name') || item.querySelector('.menu-item-name')?.textContent || '').toLowerCase();
      const itemDesc = (item.querySelector('.menu-item-desc')?.textContent || '').toLowerCase();

      const matchesCat = (selectedCategory === 'all' || itemCategory === selectedCategory);
      const matchesSearch = itemName.includes(searchTerm) || itemDesc.includes(searchTerm);

      if (matchesCat && matchesSearch) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  }

  if (menuSearchInput) {
    menuSearchInput.addEventListener('input', filterMenu);
  }

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterMenu();
    });
  });

  /* --------------------------------------------------------------------------
     8. GALLERY FILTERING & PREVIEW MODAL (For gallery.html)
     -------------------------------------------------------------------------- */
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-item');

  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      galleryCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Gallery Card Click Preview
  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('.gallery-card-title')?.textContent || 'Gallery View';
      const desc = card.querySelector('.gallery-card-desc')?.textContent || '';
      const placeholder = card.querySelector('.placeholder-img');
      const conceptHtml = placeholder ? placeholder.outerHTML : '';

      showDemoModal(
        title,
        `<div>
          <div style="margin-bottom: 1.25rem;">${conceptHtml}</div>
          <p style="font-size: 0.95rem; color: #2C2622;">${desc}</p>
          <div style="margin-top: 1rem; padding: 0.75rem; background: #FFF8E7; border-radius: 6px; font-size: 0.8rem; color: #641E16;">
            💡 <em>Image Placeholder Specification:</em> Can be replaced seamlessly with a high-resolution Google Flow generated photograph using the designated CSS concept class.
          </div>
        </div>`
      );
    });
  });

  /* --------------------------------------------------------------------------
     9. FORM VALIDATION & DEMO SUBMISSIONS (Contact & Reservation)
     -------------------------------------------------------------------------- */
  // Reservation Form
  const reservationForm = document.getElementById('reservationForm');
  const reservationFeedback = document.getElementById('reservationFeedback');

  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('resName')?.value.trim();
      const phone = document.getElementById('resPhone')?.value.trim();
      const email = document.getElementById('resEmail')?.value.trim();
      const date = document.getElementById('resDate')?.value;
      const time = document.getElementById('resTime')?.value;
      const guests = document.getElementById('resGuests')?.value;

      if (!name || !phone || !email || !date || !time || !guests) {
        if (reservationFeedback) {
          reservationFeedback.className = 'form-feedback error';
          reservationFeedback.textContent = 'Please fill out all required fields marked with *.';
        }
        return;
      }

      // Successful Demo Submission
      if (reservationFeedback) {
        reservationFeedback.className = 'form-feedback success';
        reservationFeedback.innerHTML = `
          🎉 <strong>Demo Table Reservation Requested!</strong><br>
          Thank you, <strong>${name}</strong>. A demo booking request for <strong>${guests} guests</strong> on <strong>${date} at ${time}</strong> has been simulated.
          <br><small style="color: #641E16;">(Note: This is a front-end demonstration; no actual restaurant booking has been made.)</small>
        `;
      }
      reservationForm.reset();
    });
  }

  // Contact Form
  const contactForm = document.getElementById('contactForm');
  const contactFeedback = document.getElementById('contactFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName')?.value.trim();
      const email = document.getElementById('contactEmail')?.value.trim();
      const subject = document.getElementById('contactSubject')?.value.trim();
      const message = document.getElementById('contactMessage')?.value.trim();

      if (!name || !email || !subject || !message) {
        if (contactFeedback) {
          contactFeedback.className = 'form-feedback error';
          contactFeedback.textContent = 'Please complete all required fields.';
        }
        return;
      }

      if (contactFeedback) {
        contactFeedback.className = 'form-feedback success';
        contactFeedback.innerHTML = `
          ✅ <strong>Demo Message Sent!</strong><br>
          Thank you for reaching out, <strong>${name}</strong>. Your inquiry regarding "${subject}" has been received in demonstration mode.
        `;
      }
      contactForm.reset();
    });
  }

  // Initial cart render to sync UI
  renderCart();
});

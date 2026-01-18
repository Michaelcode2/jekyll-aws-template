/**
 * Інтелект Технолоджіс - Main JavaScript
 * Handles UI interactions, navigation, and animations
 */

(function () {
  'use strict';

  // DOM Ready
  document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    initProductTabs();
    initProductFilters();
    initProductGallery();
    initStatsCounter();
    initSmoothScroll();
  });

  /**
   * Mobile Menu Toggle
   */
  function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navWrapper = document.querySelector('.nav-wrapper');

    if (!toggle || !navWrapper) return;

    toggle.addEventListener('click', function () {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      navWrapper.classList.toggle('is-open');
    });

    // Close menu on outside click
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !navWrapper.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        navWrapper.classList.remove('is-open');
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        toggle.setAttribute('aria-expanded', 'false');
        navWrapper.classList.remove('is-open');
      }
    });
  }

  /**
   * Product Category Tabs (Homepage)
   */
  function initProductTabs() {
    const tabButtons = document.querySelectorAll('.products-tabs .tab-btn');
    const productCards = document.querySelectorAll('.products-grid .product-card');

    if (!tabButtons.length) return;

    tabButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        // Update active tab
        tabButtons.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');

        const category = this.dataset.tab;

        // Filter products
        productCards.forEach(function (card) {
          if (category === 'all' || card.dataset.category === category) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  /**
   * Product Catalog Filters
   */
  function initProductFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const catalogGrid = document.getElementById('catalog-grid');

    if (!catalogGrid) return;

    // Check URL params
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');

    if (categoryParam && categoryFilter) {
      categoryFilter.value = categoryParam;
      filterProducts();
    }

    if (categoryFilter) {
      categoryFilter.addEventListener('change', filterProducts);
    }

    if (sortFilter) {
      sortFilter.addEventListener('change', sortProducts);
    }

    function filterProducts() {
      const category = categoryFilter ? categoryFilter.value : 'all';
      const products = catalogGrid.querySelectorAll('.product-card');

      products.forEach(function (card) {
        if (category === 'all' || card.dataset.category === category) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    }

    function sortProducts() {
      const sortBy = sortFilter.value;
      const products = Array.from(catalogGrid.querySelectorAll('.product-card'));

      products.sort(function (a, b) {
        switch (sortBy) {
          case 'price-asc':
            return parseInt(a.dataset.price || 0) - parseInt(b.dataset.price || 0);
          case 'price-desc':
            return parseInt(b.dataset.price || 0) - parseInt(a.dataset.price || 0);
          case 'name':
            return (a.dataset.name || '').localeCompare(b.dataset.name || '', 'uk');
          default:
            return 0;
        }
      });

      products.forEach(function (product) {
        catalogGrid.appendChild(product);
      });
    }
  }

  /**
   * Product Detail Gallery
   */
  function initProductGallery() {
    const mainImage = document.querySelector('.product-main-image img');
    const thumbnails = document.querySelectorAll('.product-thumbnails .thumbnail');

    if (!mainImage || !thumbnails.length) return;

    thumbnails.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        const newSrc = this.dataset.image;
        mainImage.src = newSrc;

        thumbnails.forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');
      });
    });
  }

  /**
   * Product Detail Tabs
   */
  (function () {
    const tabs = document.querySelectorAll('.product-tab');
    const contents = document.querySelectorAll('.product-tab-content');

    if (!tabs.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        const targetId = 'tab-' + this.dataset.tab;

        tabs.forEach(function (t) { t.classList.remove('active'); });
        contents.forEach(function (c) { c.classList.remove('active'); });

        this.classList.add('active');
        const target = document.getElementById(targetId);
        if (target) {
          target.classList.add('active');
        }
      });
    });
  })();

  /**
   * Stats Counter Animation
   */
  function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');

    if (!stats.length) return;

    const observerOptions = {
      threshold: 0.5
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    stats.forEach(function (stat) {
      observer.observe(stat);
    });

    function animateCounter(element) {
      const target = parseInt(element.dataset.count || 0);
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      function update() {
        current += step;
        if (current < target) {
          element.textContent = Math.floor(current);
          requestAnimationFrame(update);
        } else {
          element.textContent = target;
        }
      }

      update();
    }
  }

  /**
   * Smooth Scroll for anchor links
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

})();


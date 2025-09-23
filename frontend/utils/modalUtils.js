// Utility functions for handling Bootstrap modals and offcanvas

/**
 * Safely open a Bootstrap Offcanvas modal
 * @param {string} modalId - The ID of the modal element
 */
export const openOffcanvasModal = (modalId) => {
  try {
    const modalElement = document.getElementById(modalId);
    if (!modalElement) {
      console.error(`Modal element with id "${modalId}" not found`);
      return;
    }

    // Try to use Bootstrap if available
    if (window.bootstrap && window.bootstrap.Offcanvas) {
      const offcanvas = new window.bootstrap.Offcanvas(modalElement);
      offcanvas.show();
      return;
    }

    // Try to import Bootstrap dynamically
    import('bootstrap/dist/js/bootstrap.esm').then((bootstrap) => {
      if (bootstrap.Offcanvas) {
        const offcanvas = new bootstrap.Offcanvas(modalElement);
        offcanvas.show();
        return;
      }
      throw new Error('Bootstrap Offcanvas not available');
    }).catch(() => {
      // Fallback: manually show the modal
      showModalManually(modalElement);
    });

  } catch (error) {
    console.error('Error opening offcanvas modal:', error);
    // Fallback: try to show the modal manually
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      showModalManually(modalElement);
    }
  }
};

/**
 * Manually show modal without Bootstrap
 * @param {HTMLElement} modalElement - The modal element
 */
const showModalManually = (modalElement) => {
  modalElement.classList.add('show');
  modalElement.style.display = 'block';
  modalElement.setAttribute('aria-modal', 'true');
  modalElement.setAttribute('role', 'dialog');
  document.body.classList.add('offcanvas-open');
  
  // Add backdrop
  const backdrop = document.createElement('div');
  backdrop.className = 'offcanvas-backdrop fade show';
  backdrop.id = 'offcanvas-backdrop';
  document.body.appendChild(backdrop);
  
  // Handle backdrop click
  backdrop.addEventListener('click', () => {
    closeOffcanvasModal(modalElement.id);
  });

  // Handle escape key
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closeOffcanvasModal(modalElement.id);
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);
};

/**
 * Safely close a Bootstrap Offcanvas modal
 * @param {string} modalId - The ID of the modal element
 */
export const closeOffcanvasModal = (modalId) => {
  try {
    const modalElement = document.getElementById(modalId);
    if (!modalElement) {
      console.error(`Modal element with id "${modalId}" not found`);
      return;
    }

    // Reset cursor to default
    document.body.style.cursor = 'default';

    // Try to use Bootstrap if available
    if (window.bootstrap && window.bootstrap.Offcanvas) {
      const offcanvas = window.bootstrap.Offcanvas.getInstance(modalElement);
      if (offcanvas) {
        offcanvas.hide();
        return;
      }
    }

    // Try to import Bootstrap dynamically
    import('bootstrap/dist/js/bootstrap.esm').then((bootstrap) => {
      if (bootstrap.Offcanvas) {
        const offcanvas = bootstrap.Offcanvas.getInstance(modalElement);
        if (offcanvas) {
          offcanvas.hide();
          return;
        }
      }
      throw new Error('Bootstrap Offcanvas not available');
    }).catch(() => {
      // Fallback: manually hide the modal
      hideModalManually(modalElement);
    });

  } catch (error) {
    console.error('Error closing offcanvas modal:', error);
    // Fallback: try to hide the modal manually
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      hideModalManually(modalElement);
    }
  }
};

/**
 * Manually hide modal without Bootstrap
 * @param {HTMLElement} modalElement - The modal element
 */
const hideModalManually = (modalElement) => {
  modalElement.classList.remove('show');
  modalElement.style.display = 'none';
  modalElement.removeAttribute('aria-modal');
  modalElement.removeAttribute('role');
  document.body.classList.remove('offcanvas-open');
  
  // Reset cursor to default
  document.body.style.cursor = 'default';
  
  // Remove backdrop
  const backdrop = document.getElementById('offcanvas-backdrop');
  if (backdrop) {
    backdrop.remove();
  }
};

/**
 * Check if Bootstrap is properly loaded
 * @returns {boolean}
 */
export const isBootstrapLoaded = () => {
  return typeof window !== 'undefined' && window.bootstrap && window.bootstrap.Offcanvas;
};

/**
 * Initialize Bootstrap components if not already loaded
 */
export const initializeBootstrap = () => {
  if (typeof window !== 'undefined' && !window.bootstrap) {
    // Try to load Bootstrap dynamically if not available
    // Bootstrap not found
  }
};

/**
 * Open cart modal
 */
export const openCartModal = () => {
  try {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
      if (window.bootstrap && window.bootstrap.Modal) {
        const modal = new window.bootstrap.Modal(cartModal);
        modal.show();
      } else {
        cartModal.classList.add('show');
        cartModal.style.display = 'block';
        document.body.classList.add('modal-open');
      }
    }
  } catch (error) {
    console.error('Error opening cart modal:', error);
  }
};

/**
 * Open wishlist modal
 */
export const openWistlistModal = () => {
  try {
    const wishlistModal = document.getElementById('wishlistModal');
    if (wishlistModal) {
      if (window.bootstrap && window.bootstrap.Modal) {
        const modal = new window.bootstrap.Modal(wishlistModal);
        modal.show();
      } else {
        wishlistModal.classList.add('show');
        wishlistModal.style.display = 'block';
        document.body.classList.add('modal-open');
      }
    }
  } catch (error) {
    console.error('Error opening wishlist modal:', error);
  }
};

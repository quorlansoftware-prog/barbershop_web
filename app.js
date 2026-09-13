document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });

  // Booking Modal Logic
  const bookingModal = document.getElementById('bookingModal');
  const openBookingBtn = document.getElementById('openBookingBtn');
  const heroBookingBtn = document.getElementById('heroBookingBtn');
  const closeBookingBtn = document.getElementById('closeBookingBtn');
  const serviceSelect = document.getElementById('serviceSelect');

  const openModal = (serviceName = null) => {
    if (serviceName) {
      serviceSelect.value = serviceName;
    }
    bookingModal.classList.add('active');
  };

  const closeModal = () => {
    bookingModal.classList.remove('active');
  };

  openBookingBtn.addEventListener('click', () => openModal());
  heroBookingBtn.addEventListener('click', () => openModal());
  closeBookingBtn.addEventListener('click', closeModal);

  // Close modal when clicking outside content
  bookingModal.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
      closeModal();
    }
  });

  // Book specific service buttons
  document.querySelectorAll('.book-service-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const serviceName = e.target.getAttribute('data-service');
      openModal(serviceName);
    });
  });

  // Toast Notification
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');

  const showToast = (message) => {
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  };

  // Booking Form Submission
  const bookingForm = document.getElementById('bookingForm');
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const service = serviceSelect.value;
    const date = document.getElementById('bookingDate').value;
    const time = document.getElementById('bookingTime').value;

    closeModal();
    showToast(`¡Cita confirmada para ${service} el ${date} a las ${time}!`);
    bookingForm.reset();
  });

  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('¡Gracias por contactar! Te responderemos muy pronto.');
    contactForm.reset();
  });

  // Set minimum date to today
  const bookingDateInput = document.getElementById('bookingDate');
  if (bookingDateInput) {
    const today = new Date().toISOString().split('T')[0];
    bookingDateInput.min = today;
    bookingDateInput.value = today;
  }
});

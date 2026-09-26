/**
 * PULARI ARTS & SPORTS CLUB — KERALA LIGHT PORTAL ENGINE
 * Kerala Dawn Canvas • 1-Click Link Copy • Keyboard Shortcuts (1, 2, 3)
 */

document.addEventListener('DOMContentLoaded', () => {
  initKeralaCanvas();
  initCopyLinks();
  initKeyboardDispatch();
  initFooterYear();
});

/* ==========================================================================
   1. KERALA DAWN CANVAS (WARM MORNING GLOW PARTICLES)
   ========================================================================== */
function initKeralaCanvas() {
  const canvas = document.getElementById('keralaCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
  }

  function createParticles() {
    particles = [];
    const count = Math.floor(width / 60);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 0.8,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3 - 0.1, // gently float upward
        alpha: Math.random() * 0.35 + 0.1,
        color: i % 2 === 0 ? 'rgba(194, 136, 21, ' : 'rgba(245, 158, 11, '
      });
    }
  }

  window.addEventListener('resize', resize);
  resize();

  function render() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. COPY PORTAL LINK WITH TOAST
   ========================================================================== */
function initCopyLinks() {
  const copyButtons = document.querySelectorAll('.kerala-copy-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const url = btn.getAttribute('data-url');
      if (!url) return;

      try {
        await navigator.clipboard.writeText(url);
        showToast('ലിങ്ക് കോപ്പി ചെയ്തു! (Link copied for WhatsApp)', 'fa-check');

        const icon = btn.querySelector('i');
        const origClass = icon.className;
        icon.className = 'fa-solid fa-check';
        btn.style.color = '#15803d';
        btn.style.borderColor = '#15803d';

        setTimeout(() => {
          icon.className = origClass;
          btn.style.color = '';
          btn.style.borderColor = '';
        }, 1500);
      } catch (err) {
        const temp = document.createElement('input');
        temp.value = url;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        showToast('Link copied!', 'fa-check');
      }
    });
  });
}

function showToast(message, icon = 'fa-check') {
  const container = document.getElementById('keralaToastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'kerala-toast';
  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastOut 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    setTimeout(() => toast.remove(), 250);
  }, 2800);
}

/* ==========================================================================
   3. KEYBOARD DISPATCH (1, 2, 3)
   ========================================================================== */
function initKeyboardDispatch() {
  const links = {
    '1': { url: 'https://pulariartsandsportsclub.github.io/membershipfees/', name: 'Fee Collection Portal' },
    '2': { url: 'https://pulariartsandsportsclub.github.io/pularidashboard/', name: 'Club Accounts & Treasury' },
    '3': { url: 'https://pulariartsandsportsclub.github.io/membershipfees/dashboard.html', name: 'Member Fee Dashboard' }
  };

  document.addEventListener('keydown', (e) => {
    if (links[e.key]) {
      showToast(`Opening ${links[e.key].name}...`, 'fa-arrow-up-right-from-square');
      setTimeout(() => {
        window.open(links[e.key].url, '_blank');
      }, 250);
    }
  });
}

/* ==========================================================================
   4. FOOTER YEAR
   ========================================================================== */
function initFooterYear() {
  const yearEl = document.getElementById('yearKerala');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

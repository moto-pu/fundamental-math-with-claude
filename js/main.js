/**
 * Claude君に教えてもらう基礎数学
 * Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  highlightCurrentPage();
  initSmoothScroll();
  initCodeBlockEnhancements();
});

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.createElement('div');
  
  overlay.className = 'sidebar-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  `;
  document.body.appendChild(overlay);
  
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.style.opacity = sidebar.classList.contains('open') ? '1' : '0';
      overlay.style.visibility = sidebar.classList.contains('open') ? 'visible' : 'hidden';
    });
    
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.style.opacity = '0';
      overlay.style.visibility = 'hidden';
    });
  }
}

/**
 * Highlight current page in navigation
 */
function highlightCurrentPage() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.endsWith(href.replace('./', ''))) {
      link.classList.add('active');
    }
  });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Code block enhancements
 */
function initCodeBlockEnhancements() {
  // Add copy button to code blocks
  document.querySelectorAll('pre').forEach(pre => {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);
    
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.textContent = 'コピー';
    copyBtn.style.cssText = `
      position: absolute;
      top: 8px;
      right: 8px;
      padding: 4px 12px;
      font-size: 12px;
      background: var(--bg-tertiary);
      border: 1px solid var(--border-color);
      border-radius: 4px;
      color: var(--text-secondary);
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.2s ease;
    `;
    
    wrapper.appendChild(copyBtn);
    
    wrapper.addEventListener('mouseenter', () => {
      copyBtn.style.opacity = '1';
    });
    
    wrapper.addEventListener('mouseleave', () => {
      copyBtn.style.opacity = '0';
    });
    
    copyBtn.addEventListener('click', async () => {
      const code = pre.querySelector('code')?.textContent || pre.textContent;
      try {
        await navigator.clipboard.writeText(code);
        copyBtn.textContent = 'コピーしました！';
        setTimeout(() => {
          copyBtn.textContent = 'コピー';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });
  });
}

/**
 * Table of contents generation (optional)
 */
function generateTableOfContents() {
  const article = document.querySelector('.article-content');
  const toc = document.querySelector('.table-of-contents');
  
  if (!article || !toc) return;
  
  const headings = article.querySelectorAll('h2, h3');
  const tocList = document.createElement('ul');
  
  headings.forEach((heading, index) => {
    const id = heading.id || `heading-${index}`;
    heading.id = id;
    
    const li = document.createElement('li');
    li.className = heading.tagName === 'H3' ? 'toc-sub' : '';
    
    const link = document.createElement('a');
    link.href = `#${id}`;
    link.textContent = heading.textContent;
    
    li.appendChild(link);
    tocList.appendChild(li);
  });
  
  toc.appendChild(tocList);
}

/**
 * Reading progress indicator (optional)
 */
function initReadingProgress() {
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
    z-index: 1000;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });
}

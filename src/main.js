import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SceneManager } from './three/sceneManager.js';
import { HUDController } from './components/hud.js';
import { soundFx } from './components/soundEffects.js';
import { portfolioData } from './data/portfolioData.js';

gsap.registerPlugin(ScrollTrigger);

class App {
  constructor() {
    this.initSmoothScroll();
    this.init3DScene();
    this.initHUD();
    this.renderData();
    this.initSectionAnimations();
    this.initInteractions();
  }

  initSmoothScroll() {
    this.lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
      infinite: false
    });

    this.lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      this.handleScroll(e);
    });

    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  init3DScene() {
    const container = document.getElementById('webgl-container');
    this.sceneManager = new SceneManager(container);
  }

  initHUD() {
    this.hud = new HUDController(this.lenis);
  }

  handleScroll(e) {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalScroll > 0 ? Math.min(Math.max(e.scroll / totalScroll, 0), 1) : 0;

    if (this.sceneManager) {
      this.sceneManager.setScrollProgress(progress);
    }

    // Determine current active section
    const sections = [
      'section-hero',
      'section-about',
      'section-studies',
      'section-skills',
      'section-projects',
      'section-certifications',
      'section-vision',
      'section-contact'
    ];

    let currentSectionId = sections[0];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.2) {
          currentSectionId = id;
        }
      }
    });

    if (this.hud) {
      this.hud.updateScrollTelemetry(progress, currentSectionId);
    }
  }

  renderData() {
    const data = portfolioData;

    // 1. Hero Data
    const heroName = document.getElementById('hero-name');
    if (heroName) heroName.innerHTML = `<span class="gradient-title">${data.hero.name}</span>`;

    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) heroTitle.textContent = data.hero.title;

    const heroIntro = document.getElementById('hero-intro');
    if (heroIntro) heroIntro.textContent = data.hero.introText;

    const heroPhoto = document.getElementById('hero-photo');
    if (heroPhoto && data.hero.photoUrl) heroPhoto.src = data.hero.photoUrl;

    const heroStatus = document.getElementById('hero-status');
    if (heroStatus) heroStatus.textContent = data.hero.statusBadge;

    // 2. Studies Data
    const studiesDegree = document.getElementById('studies-degree');
    if (studiesDegree) studiesDegree.textContent = data.studies.degree;

    const studiesInst = document.getElementById('studies-institution');
    if (studiesInst) studiesInst.textContent = `${data.studies.institution} | ${data.studies.period}`;

    const studiesSpec = document.getElementById('studies-specialization');
    if (studiesSpec) studiesSpec.textContent = data.studies.specialization;

    // 2. Studies Modules
    this.renderStudies(data.studies);

    // 2.5 Render About
    this.renderAbout(data.about);

    // 3. Render Skills
    this.renderSkills(data.skills);

    // 4. Render Projects
    this.renderProjects(data.projects);

    // 5. Render Certifications & Achievements
    this.renderCertifications(data.certifications, data.achievements);

    // 6. Render Contact Links
    this.renderContact(data.contact);
  }

  renderStudies(studiesData) {
    const modulesGrid = document.getElementById('studies-modules-grid');
    if (modulesGrid && studiesData.coreModules) {
      const borderColors = ['border-l-cyber-cyan', 'border-l-cyber-purple', 'border-l-cyber-emerald', 'border-l-cyber-blue'];
      const bgColors = ['bg-cyber-cyan/10 text-cyber-cyan', 'bg-cyber-purple/10 text-cyber-purple', 'bg-cyber-emerald/10 text-cyber-emerald', 'bg-cyber-blue/10 text-cyber-blue'];
      const icons = ['🌐', '💻', '⚛️', '🧬'];

      modulesGrid.innerHTML = studiesData.coreModules.map((mod, idx) => `
        <div class="glass-card p-6 border-l-4 ${borderColors[idx % borderColors.length]}">
          <div class="flex items-center gap-3 mb-3">
            <span class="p-2 rounded ${bgColors[idx % bgColors.length]} text-lg">${icons[idx % icons.length]}</span>
            <h4 class="text-lg font-bold font-display text-white">${mod.title}</h4>
          </div>
          <p class="text-slate-300 text-sm leading-relaxed">
            ${mod.desc}
          </p>
        </div>
      `).join('');
    }
  }

  renderAbout(aboutData) {
    const paragraphsContainer = document.getElementById('about-paragraphs');
    if (paragraphsContainer && aboutData.bioParagraphs) {
      paragraphsContainer.innerHTML = aboutData.bioParagraphs
        .map(p => `<p>${p}</p>`)
        .join('');
    }

    const highlightsContainer = document.getElementById('about-highlights-grid');
    if (highlightsContainer && aboutData.highlights) {
      const colors = ['text-cyber-cyan', 'text-cyber-purple', 'text-cyber-emerald', 'text-cyber-blue'];
      highlightsContainer.innerHTML = aboutData.highlights
        .map((h, idx) => `
          <div class="glass-card p-4">
            <span class="text-xs ${colors[idx % colors.length]} font-mono block mb-1 uppercase">${h.label}</span>
            <span class="text-sm font-semibold text-white">${h.value}</span>
          </div>
        `).join('');
    }

    const statsContainer = document.getElementById('about-stats-container');
    if (statsContainer && aboutData.stats) {
      const textColors = ['text-cyber-cyan', 'text-cyber-purple', 'text-cyber-emerald', 'text-white'];
      statsContainer.innerHTML = aboutData.stats
        .map((s, idx) => `
          <div class="${idx < aboutData.stats.length - 1 ? 'border-b border-white/10 pb-3' : ''}">
            <div class="text-3xl font-extrabold font-display ${textColors[idx % textColors.length]}">${s.number}</div>
            <div class="text-xs text-slate-400 font-mono mt-1">${s.label}</div>
          </div>
        `).join('');
    }
  }

  renderSkills(skillsData) {
    const techContainer = document.getElementById('skills-list-technical');
    const toolsContainer = document.getElementById('skills-list-tools');

    if (techContainer && skillsData.categories[0]) {
      techContainer.innerHTML = skillsData.categories[0].items.map(skill => `
        <div class="skill-item group">
          <div class="flex justify-between items-center text-xs sm:text-sm font-mono mb-1.5">
            <span class="text-slate-200 group-hover:text-cyber-cyan transition-colors flex items-center gap-2">
              <span>${skill.name}</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">${skill.tag}</span>
            </span>
            <span class="text-cyber-cyan font-bold">${skill.level}%</span>
          </div>
          <div class="w-full h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
            <div class="h-full bg-gradient-to-r from-cyber-blue to-cyber-cyan rounded-full transition-all duration-1000" style="width: ${skill.level}%"></div>
          </div>
        </div>
      `).join('');
    }

    if (toolsContainer && skillsData.categories[1]) {
      toolsContainer.innerHTML = skillsData.categories[1].items.map(tool => `
        <div class="skill-item group">
          <div class="flex justify-between items-center text-xs sm:text-sm font-mono mb-1.5">
            <span class="text-slate-200 group-hover:text-cyber-purple transition-colors flex items-center gap-2">
              <span>${tool.name}</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyber-purple/10 border border-cyber-purple/30 text-cyber-purple">${tool.tag}</span>
            </span>
            <span class="text-cyber-purple font-bold">${tool.level}%</span>
          </div>
          <div class="w-full h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
            <div class="h-full bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full transition-all duration-1000" style="width: ${tool.level}%"></div>
          </div>
        </div>
      `).join('');
    }
  }

  renderProjects(projects) {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = projects.map(proj => `
      <div class="glass-card overflow-hidden group hover:border-cyber-cyan/50 transition-all duration-500 project-3d-card" data-project-id="${proj.id}">
        <div class="relative h-48 sm:h-56 overflow-hidden scanline-box">
          <img src="${proj.image}" alt="${proj.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-cyber-bg via-transparent to-transparent"></div>
          <span class="absolute top-3 left-3 text-[10px] font-mono px-2.5 py-1 rounded bg-black/70 border border-cyber-cyan/40 text-cyber-cyan backdrop-blur-md">
            ${proj.category}
          </span>
          <span class="absolute top-3 right-3 text-[10px] font-mono px-2.5 py-1 rounded bg-black/70 border border-cyber-purple/40 text-cyber-purple backdrop-blur-md">
            ${proj.metrics}
          </span>
        </div>

        <div class="p-6">
          <h3 class="text-xl font-bold font-display text-white group-hover:text-cyber-cyan transition-colors mb-2">
            ${proj.title}
          </h3>
          <p class="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-2">
            ${proj.description}
          </p>

          <div class="flex flex-wrap gap-1.5 mb-6">
            ${proj.technologies.map(tech => `
              <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                ${tech}
              </span>
            `).join('')}
          </div>

          <div class="flex items-center gap-3 pt-4 border-t border-white/10">
            <button class="view-project-details-btn text-xs font-mono px-3.5 py-2 rounded bg-cyber-cyan/15 hover:bg-cyber-cyan hover:text-black text-cyber-cyan transition-all flex items-center gap-1.5" data-id="${proj.id}">
              <span>View Details</span>
              <span>→</span>
            </button>
            <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="text-xs font-mono px-3 py-2 rounded bg-white/5 hover:bg-white/15 text-slate-300 transition-all flex items-center gap-1">
              <span>GitHub Repo</span>
            </a>
          </div>
        </div>
      </div>
    `).join('');
  }

  renderCertifications(certs, achievements) {
    const certList = document.getElementById('certifications-list');
    if (certList) {
      certList.innerHTML = certs.map(cert => `
        <div class="glass-card p-5 border-l-4 border-l-cyber-cyan flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-cyber-cyan text-sm">📜</span>
              <h4 class="text-base font-bold font-display text-white">${cert.title}</h4>
            </div>
            <p class="text-xs font-mono text-cyber-muted">${cert.issuer} • ${cert.date}</p>
            <p class="text-xs text-slate-300 mt-1">${cert.skills}</p>
          </div>
          <a href="${cert.credentialUrl}" target="_blank" rel="noopener noreferrer" class="text-xs font-mono px-3 py-1.5 rounded bg-cyber-cyan/10 hover:bg-cyber-cyan hover:text-black text-cyber-cyan border border-cyber-cyan/30 transition-all whitespace-nowrap self-start sm:self-center">
            ${cert.status} ↗
          </a>
        </div>
      `).join('');
    }

    const achList = document.getElementById('achievements-list');
    if (achList) {
      achList.innerHTML = achievements.map(ach => `
        <div class="border-b border-white/10 pb-3 last:border-0 last:pb-0">
          <div class="flex items-center justify-between gap-2 mb-1">
            <h5 class="text-sm font-bold font-display text-white">${ach.title}</h5>
            <span class="text-[11px] font-mono text-cyber-emerald px-1.5 py-0.5 rounded bg-cyber-emerald/10 border border-cyber-emerald/30">${ach.year}</span>
          </div>
          <p class="text-xs text-slate-300 leading-relaxed">${ach.desc}</p>
        </div>
      `).join('');
    }
  }

  renderContact(contact) {
    const emailText = document.getElementById('contact-email-text');
    if (emailText) emailText.textContent = contact.email;

    const linkedinLink = document.getElementById('contact-linkedin-link');
    if (linkedinLink) linkedinLink.href = contact.linkedin;

    const githubLink = document.getElementById('contact-github-link');
    if (githubLink) githubLink.href = contact.github;

    const closingMsg = document.getElementById('contact-closing');
    if (closingMsg) closingMsg.textContent = `"${contact.closingMessage}"`;
  }

  initSectionAnimations() {
    // Cinematic Section Reveal with GSAP ScrollTrigger
    const sections = document.querySelectorAll('.journey-section');
    sections.forEach(section => {
      gsap.fromTo(
        section.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }

  initInteractions() {
    // 1. Hero CTA Button Smooth Scroll to About
    const heroCta = document.getElementById('hero-cta-btn');
    if (heroCta) {
      heroCta.addEventListener('click', () => {
        soundFx.playClick();
        const aboutSection = document.getElementById('section-about');
        if (aboutSection && this.lenis) {
          this.lenis.scrollTo(aboutSection, { duration: 1.8 });
        }
      });
    }

    // 2. Email Copy Button
    const copyBtn = document.getElementById('copy-email-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        soundFx.playClick();
        const email = portfolioData.contact.email;
        navigator.clipboard.writeText(email).then(() => {
          this.showToast('✓ Email address copied to clipboard!');
          copyBtn.textContent = 'Copied!';
          setTimeout(() => {
            copyBtn.textContent = 'Copy Email';
          }, 2500);
        });
      });
    }

    // 3. Project Details Modal Handlers
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.view-project-details-btn');
      if (btn) {
        soundFx.playClick();
        const projId = btn.getAttribute('data-id');
        const proj = portfolioData.projects.find(p => p.id === projId);
        if (proj) {
          this.openProjectModal(proj);
        }
      }
    });

    const closeModalBtn = document.getElementById('close-modal-btn');
    const modal = document.getElementById('project-modal');
    if (closeModalBtn && modal) {
      closeModalBtn.addEventListener('click', () => {
        soundFx.playClick();
        modal.classList.add('hidden');
      });
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
        }
      });
    }

    // 4. Sound effects on all interactive elements
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => soundFx.playHover());
    });
  }

  openProjectModal(project) {
    const modal = document.getElementById('project-modal');
    const content = document.getElementById('modal-content');
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="space-y-4">
        <span class="cyber-badge text-xs">${project.category}</span>
        <h3 class="text-2xl font-bold font-display text-white">${project.title}</h3>
        <div class="rounded-xl overflow-hidden max-h-60 mb-4 border border-cyber-cyan/30">
          <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover" />
        </div>
        <p class="text-slate-300 text-sm leading-relaxed">${project.description}</p>
        <div class="bg-black/40 p-3 rounded-lg border border-cyber-cyan/20">
          <span class="text-xs font-mono text-cyber-cyan block mb-1">KEY PERFORMANCE METRIC</span>
          <span class="text-base font-bold text-white">${project.metrics}</span>
        </div>
        <div class="flex flex-wrap gap-2 pt-2">
          ${project.technologies.map(t => `<span class="text-xs font-mono px-2 py-1 rounded bg-white/10 text-cyber-cyan">${t}</span>`).join('')}
        </div>
        <div class="flex gap-4 pt-4 border-t border-white/10">
          <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="cyber-btn-primary text-xs flex-1 text-center">
            View Source on GitHub
          </a>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
  }

  showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'glass-card px-4 py-2.5 text-xs font-mono text-cyber-cyan border-cyber-cyan/60 shadow-glow-cyan mb-2 animate-bounce';
    toast.textContent = message;

    container.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
}

// Initialize Application once DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  new App();
});

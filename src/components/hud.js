import { soundFx } from './soundEffects.js';

/**
 * Futuristic HUD (Heads-Up Display) Controller
 * Manages live nucleotide sequence streams, scroll coordinates, audio toggle, and waypoint navigation.
 */
export class HUDController {
  constructor(lenis) {
    this.lenis = lenis;
    this.initSequenceTicker();
    this.initAudioToggle();
    this.initSectionWaypoints();
  }

  initSequenceTicker() {
    const tickerEl = document.getElementById('hud-sequence-ticker');
    if (!tickerEl) return;

    const bases = ['A', 'T', 'G', 'C'];
    let sequence = 'ATCG-GTAC-CCGA-TAAG-CGTT-AACC-GCTA-TTCG';

    setInterval(() => {
      // Shift out first base and append a new random base
      const nextGroup = Array.from({ length: 4 }, () => bases[Math.floor(Math.random() * bases.length)]).join('');
      const parts = sequence.split('-');
      parts.shift();
      parts.push(nextGroup);
      sequence = parts.join('-');
      tickerEl.textContent = sequence;
    }, 450);
  }

  initAudioToggle() {
    const audioBtn = document.getElementById('audio-toggle-btn');
    const audioLabel = document.getElementById('audio-toggle-label');
    const audioIcon = document.getElementById('audio-icon');

    if (!audioBtn) return;

    audioBtn.addEventListener('click', () => {
      const isSoundOn = soundFx.toggleMute();
      if (isSoundOn) {
        if (audioLabel) audioLabel.textContent = 'AUDIO ON';
        audioBtn.classList.add('border-cyber-cyan', 'text-cyber-cyan', 'shadow-glow-cyan');
        audioBtn.classList.remove('text-cyber-muted');
      } else {
        if (audioLabel) audioLabel.textContent = 'AUDIO OFF';
        audioBtn.classList.remove('border-cyber-cyan', 'text-cyber-cyan', 'shadow-glow-cyan');
        audioBtn.classList.add('text-cyber-muted');
      }
    });
  }

  initSectionWaypoints() {
    const waypoints = document.querySelectorAll('.hud-waypoint-btn');
    waypoints.forEach(btn => {
      btn.addEventListener('click', (e) => {
        soundFx.playClick();
        const targetId = btn.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);
        if (targetEl && this.lenis) {
          this.lenis.scrollTo(targetEl, { offset: 0, duration: 1.8 });
        }
      });

      btn.addEventListener('mouseenter', () => {
        soundFx.playHover();
      });
    });
  }

  updateScrollTelemetry(progress, currentSectionId) {
    // 1. Update Depth readout
    const depthEl = document.getElementById('hud-depth-readout');
    if (depthEl) {
      const depthNm = (progress * 260).toFixed(1);
      depthEl.textContent = `DEPTH: -${depthNm} nm`;
    }

    // 2. Update Progress percentage
    const progressEl = document.getElementById('hud-progress-bar');
    if (progressEl) {
      progressEl.style.width = `${(progress * 100).toFixed(1)}%`;
    }

    // 3. Highlight active waypoint
    const waypoints = document.querySelectorAll('.hud-waypoint-btn');
    waypoints.forEach(btn => {
      const target = btn.getAttribute('data-target');
      if (target === currentSectionId) {
        btn.classList.add('active', 'scale-125', 'bg-cyber-cyan', 'border-cyber-cyan', 'shadow-glow-cyan');
        btn.classList.remove('bg-white/20', 'border-white/10');
      } else {
        btn.classList.remove('active', 'scale-125', 'bg-cyber-cyan', 'border-cyber-cyan', 'shadow-glow-cyan');
        btn.classList.add('bg-white/20', 'border-white/10');
      }
    });
  }
}

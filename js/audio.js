/**
 * DETEKTIF KEBAIKAN - AUDIO ENGINE
 * Web Audio API Synthesizer (BGM & SFX) & SpeechSynthesis Indonesian Narration
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.bgmPlaying = false;
    this.bgmTimer = null;
    this.musicEnabled = true;
    this.sfxEnabled = true;
    this.voiceEnabled = true;
    this.masterVolume = 0.8;
    this.currentUtterance = null;
    this.indonesianVoice = null;
    this.step = 0;

    // Load voices
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        this.loadVoices();
      };
      this.loadVoices();
    }
  }

  initContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  loadVoices() {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    // Prioritize natural Indonesian voices
    this.indonesianVoice = voices.find(v => 
      v.lang.toLowerCase().startsWith('id') || 
      v.lang.toLowerCase().includes('ind') ||
      v.name.toLowerCase().includes('indonesia') ||
      v.name.toLowerCase().includes('gadis')
    ) || null;
  }

  // --- SOUND EFFECTS (Web Audio API Synthesizer) ---

  playPop() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(840, now + 0.08);

    gain.gain.setValueAtTime(0.3 * this.masterVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  playSuccess() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const noteTime = now + (idx * 0.1);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0, noteTime);
      gain.gain.linearRampToValueAtTime(0.35 * this.masterVolume, noteTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.38);
    });
  }

  playGentleTryAgain() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    // Friendly cartoon boing/spring sound (no harsh buzzer!)
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(240, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(290, now + 0.25);

    gain.gain.setValueAtTime(0.25 * this.masterVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.32);
  }

  playStarSparkle() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const freqs = [987.77, 1318.51, 1567.98, 1975.53, 2093.00]; // B5, E6, G6, B6, C7
    const now = this.ctx.currentTime;

    freqs.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const noteTime = now + (i * 0.06);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0, noteTime);
      gain.gain.linearRampToValueAtTime(0.25 * this.masterVolume, noteTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.3);
    });
  }

  playFanfare() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const chords = [
      { t: 0.0, f: [523.25, 659.25], d: 0.15 },
      { t: 0.15, f: [523.25, 659.25], d: 0.15 },
      { t: 0.30, f: [523.25, 659.25], d: 0.15 },
      { t: 0.45, f: [659.25, 783.99], d: 0.25 },
      { t: 0.72, f: [523.25, 659.25, 783.99, 1046.5], d: 0.65 }
    ];

    chords.forEach(chord => {
      chord.f.forEach(freq => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const noteStart = now + chord.t;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0, noteStart);
        gain.gain.linearRampToValueAtTime(0.2 * this.masterVolume, noteStart + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + chord.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + chord.d + 0.05);
      });
    });
  }

  // --- BACKGROUND MUSIC (BGM SYNTHESIZER) ---
  // Joyful, gentle marimba nursery melody in C Pentatonic Major

  startBGM() {
    if (!this.musicEnabled || this.bgmPlaying) return;
    this.initContext();
    if (!this.ctx) return;

    this.bgmPlaying = true;
    this.step = 0;

    const melody = [
      523.25, 659.25, 783.99, 659.25,
      523.25, 659.25, 783.99, 1046.5,
      880.00, 783.99, 659.25, 587.33,
      523.25, 587.33, 659.25, 523.25
    ];

    const bass = [
      261.63, 0, 329.63, 0,
      392.00, 0, 329.63, 0,
      440.00, 0, 392.00, 0,
      349.23, 0, 261.63, 0
    ];

    const tempo = 380; // ms per beat

    const playLoop = () => {
      if (!this.bgmPlaying || !this.ctx) return;
      
      const now = this.ctx.currentTime;
      const mNote = melody[this.step % melody.length];
      const bNote = bass[this.step % bass.length];

      // Soft marimba melody note
      if (mNote && this.musicEnabled) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(mNote, now);
        gain.gain.setValueAtTime(0.05 * this.masterVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      }

      // Warm bass note
      if (bNote && this.musicEnabled) {
        const oscB = this.ctx.createOscillator();
        const gainB = this.ctx.createGain();
        oscB.type = 'triangle';
        oscB.frequency.setValueAtTime(bNote, now);
        gainB.gain.setValueAtTime(0.04 * this.masterVolume, now);
        gainB.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        oscB.connect(gainB);
        gainB.connect(this.ctx.destination);
        oscB.start(now);
        oscB.stop(now + 0.38);
      }

      this.step++;
      this.bgmTimer = setTimeout(playLoop, tempo);
    };

    playLoop();
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  toggleMusic() {
    this.musicEnabled = !this.musicEnabled;
    if (!this.musicEnabled) {
      this.stopBGM();
    } else {
      this.startBGM();
    }
    return this.musicEnabled;
  }

  toggleVoice() {
    this.voiceEnabled = !this.voiceEnabled;
    if (!this.voiceEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    return this.voiceEnabled;
  }

  // --- NARRATION ENGINE (SpeechSynthesis) ---
  // Guaranteed clean stop of previous speech to avoid overlapping

  speak(text, onStart = null, onEnd = null) {
    let finished = false;
    const safeEnd = () => {
      if (!finished) {
        finished = true;
        if (onEnd) onEnd();
      }
    };

    if (!this.voiceEnabled) {
      if (onStart) onStart();
      setTimeout(safeEnd, 1500);
      return;
    }
    this.initContext();

    if (!('speechSynthesis' in window)) {
      if (onStart) onStart();
      setTimeout(safeEnd, 2000);
      return;
    }

    // Cancel current speech cleanly to prevent overlapping
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 0.92;  // Clear pace for 5-6 year olds
    utterance.pitch = 1.25; // Friendly tone for Dodo detective

    if (this.indonesianVoice) {
      utterance.voice = this.indonesianVoice;
    } else {
      this.loadVoices();
      if (this.indonesianVoice) {
        utterance.voice = this.indonesianVoice;
      }
    }

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = safeEnd;
    utterance.onerror = safeEnd;

    // Safety fallback: prevents game freezing if browser delays onend
    const estimatedDuration = Math.max(2500, text.length * 90);
    setTimeout(safeEnd, estimatedDuration);

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  stopSpeech() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

// Global instance
window.soundEngine = new SoundEngine();

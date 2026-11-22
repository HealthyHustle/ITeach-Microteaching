/**
 * DETEKTIF KEBAIKAN - MAIN CONTROLLER (SCRIPT.JS)
 * Reconstructed with per-scene structured Grid/Flexbox layouts & 3D assets
 */

class DetektifKebaikanGame {
  constructor() {
    this.stage = 1; // 1: Opening, 2: Playground, 3: Moral Quiz, 4: Closing
    this.quizStep = 1; // 1: Tolong, 2: Terima Kasih
    this.stars = 0;
    this.maxStars = 3;
    this.totalDuration = 180; // 180 seconds
    this.timeRemaining = this.totalDuration;
    this.timerInterval = null;
    this.isTimerRunning = false;
    this.gameCompleted = false;
    this.boniFound = false;
    this.isAnswering = false;
    this.currentBaseExpression = 'happy';
    this.currentDodoSize = 'panel';

    this.narrations = {
      opening: "Halo teman-teman! Aku Dodo. Yuk, bantu Dodo mencari teman yang membutuhkan bantuan!",
      playgroundIntro: "Wah, banyak sekali anak yang sedang bermain! Tapi, sepertinya ada satu teman yang membutuhkan bantuan. Coba temukan dia!",
      foundTarget: "Wah, kamu berhasil menemukannya! Ternyata teman kita membutuhkan bantuan.",
      wrongTarget: "Hmm, coba cari teman yang terlihat kesulitan, yuk!",
      quiz1Intro: "Teman kita kesulitan mengambil bola. Kalau kamu membutuhkan bantuan, apa yang harus kamu katakan?",
      quiz1Success: "Hebat! Kalau membutuhkan bantuan, kita harus meminta tolong dengan sopan.",
      quiz1TryAgain: "Yuk, coba lagi! Kita bisa meminta bantuan dengan kata yang baik.",
      quiz2Intro: "Kalau teman sudah membantu kita, apa yang harus kita ucapkan?",
      quiz2Success: "Wah, pintar sekali! Jangan lupa mengucapkan terima kasih kepada teman yang sudah membantu.",
      quiz2TryAgain: "Yuk, coba lagi! Teman yang baik selalu berterima kasih setelah dibantu.",
      closingIntro: "Yeay! Teman kita sudah mendapatkan bantuannya. Jangan lupa mengucapkan terima kasih, ya!",
      timeUp: "Waktu bermain telah selesai! Kamu hebat sekali sudah belajar kebaikan hari ini!"
    };

    this.initDOM();
  }

  initDOM() {
    this.timerText = document.getElementById('timer-text');
    this.starCounter = document.getElementById('star-count');
    this.btnToggleMusic = document.getElementById('btn-toggle-music');
    this.btnToggleVoice = document.getElementById('btn-toggle-voice');
    this.btnGuideModal = document.getElementById('btn-teacher-guide');
    this.guideModal = document.getElementById('teacher-guide-modal');
    this.btnCloseModal = document.getElementById('btn-close-modal');

    if (this.btnToggleMusic) {
      this.btnToggleMusic.addEventListener('click', () => {
        const enabled = window.soundEngine.toggleMusic();
        this.btnToggleMusic.innerHTML = enabled ? '🎵 <span>Musik: ON</span>' : '🔇 <span>Musik: OFF</span>';
        this.btnToggleMusic.classList.toggle('btn-muted', !enabled);
        window.soundEngine.playPop();
      });
    }

    if (this.btnToggleVoice) {
      this.btnToggleVoice.addEventListener('click', () => {
        const enabled = window.soundEngine.toggleVoice();
        this.btnToggleVoice.innerHTML = enabled ? '🗣️ <span>Suara: ON</span>' : '🙊 <span>Suara: OFF</span>';
        this.btnToggleVoice.classList.toggle('btn-muted', !enabled);
        window.soundEngine.playPop();
      });
    }

    if (this.btnGuideModal && this.guideModal) {
      this.btnGuideModal.addEventListener('click', () => {
        window.soundEngine.playPop();
        this.guideModal.classList.add('active');
      });
    }

    if (this.btnCloseModal && this.guideModal) {
      this.btnCloseModal.addEventListener('click', () => {
        window.soundEngine.playPop();
        this.guideModal.classList.remove('active');
      });
    }

    if (this.guideModal) {
      this.guideModal.addEventListener('click', (e) => {
        if (e.target === this.guideModal) {
          this.guideModal.classList.remove('active');
        }
      });
    }

    this.renderStage1();
  }

  updateDodoAvatar(expression = 'happy', sizeClass = null) {
    this.currentBaseExpression = expression;
    if (sizeClass) this.currentDodoSize = sizeClass;
    const activeDodo = document.getElementById('dodo-avatar-box');
    if (activeDodo) {
      activeDodo.innerHTML = window.Visuals.getDodoSVG(expression, this.currentDodoSize);
    }
    const coverDodo = document.getElementById('hero-dodo-cover');
    if (coverDodo) {
      coverDodo.innerHTML = window.Visuals.getDodoSVG(expression, 'cover');
    }
  }

  speakNarration(text, callback = null) {
    const activeSpeech = document.getElementById('dodo-speech-text');
    if (activeSpeech) {
      activeSpeech.innerText = text;
      activeSpeech.classList.remove('speech-pulse');
      void activeSpeech.offsetWidth;
      activeSpeech.classList.add('speech-pulse');
    }

    const coverSpeech = document.getElementById('cover-dodo-speech');
    if (coverSpeech) {
      coverSpeech.classList.remove('speech-pulse');
      void coverSpeech.offsetWidth;
      coverSpeech.classList.add('speech-pulse');
    }

    this.currentNarration = text;

    window.soundEngine.speak(
      text,
      () => {
        const activeDodo = document.getElementById('dodo-avatar-box');
        if (activeDodo) {
          activeDodo.innerHTML = window.Visuals.getDodoSVG('talking', this.currentDodoSize);
        }
        const coverDodo = document.getElementById('hero-dodo-cover');
        if (coverDodo) {
          coverDodo.innerHTML = window.Visuals.getDodoSVG('talking', 'cover');
        }
      },
      () => {
        this.updateDodoAvatar(this.currentBaseExpression || 'happy');
        if (callback) callback();
      }
    );
  }

  repeatCurrentNarration() {
    if (this.currentNarration) {
      this.speakNarration(this.currentNarration);
    }
  }

  // --- 180S CIRCULAR TIMER ---

  startTimer() {
    if (this.isTimerRunning) return;
    this.isTimerRunning = true;
    this.timeRemaining = this.totalDuration;
    this.updateTimerDisplay();

    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      this.updateTimerDisplay();

      const timerBox = document.querySelector('.circular-timer-box');
      if (timerBox) {
        timerBox.classList.toggle('timer-warning', this.timeRemaining <= 30 && this.timeRemaining > 0);
      }

      if (this.timeRemaining <= 0) {
        clearInterval(this.timerInterval);
        this.isTimerRunning = false;
        this.onTimerExpired();
      }
    }, 1000);
  }

  updateTimerDisplay() {
    const minutes = Math.floor(this.timeRemaining / 60);
    const seconds = this.timeRemaining % 60;
    const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (this.timerText) {
      this.timerText.innerText = formatted;
    }

    const percentage = ((this.totalDuration - this.timeRemaining) / this.totalDuration) * 100;
    const circleProgress = document.getElementById('timer-circle-progress');
    if (circleProgress) {
      const circumference = 144.51;
      const offset = (percentage / 100) * circumference;
      circleProgress.style.strokeDashoffset = offset;
    }
  }

  onTimerExpired() {
    if (this.stage < 4) {
      this.speakNarration(this.narrations.timeUp, () => {
        this.renderStage4();
      });
    }
  }

  addStar() {
    if (this.stars < this.maxStars) {
      this.stars++;
      window.soundEngine.playStarSparkle();
      if (this.starCounter) {
        this.starCounter.innerText = this.stars;
        const badge = this.starCounter.closest('.star-counter-badge-3d');
        if (badge) {
          badge.classList.add('star-pop');
          setTimeout(() => badge.classList.remove('star-pop'), 700);
        }
      }
    }
  }

  // --- SCENE 1: OPENING (TWO-COLUMN COVER LAYOUT) ---

  renderStage1() {
    this.stage = 1;
    this.currentBaseExpression = 'happy';
    this.currentDodoSize = 'cover';
    this.updateProgressIndicator(1);

    const content = document.getElementById('stage-content');
    if (!content) return;

    content.innerHTML = `
      <div class="scene-shell scene-1-shell fade-in">
        <div class="scene-1-grid">
          <!-- BAGIAN KIRI ATAS (Mobile: Atas): Judul & Teks Pendamping Singkat -->
          <div class="opening-title-block">
            <h1 class="cover-game-title">DETEKTIF KEBAIKAN</h1>
            <p class="cover-subtitle-kid">Ayo cari teman!</p>
          </div>

          <!-- BAGIAN KANAN (Mobile: Tengah): Speech Bubble Putih + Dodo 3D -->
          <div class="opening-dodo-block">
            <div class="cover-speech-bubble" id="cover-dodo-speech">
              <p class="speech-kid-text">Halo teman-teman! Yuk, bantu Dodo!</p>
              <button type="button" id="btn-cover-hear" class="btn-speaker-circle" aria-label="Dengarkan suara Dodo" title="Dengarkan suara Dodo">
                <span aria-hidden="true">🔊</span>
              </button>
            </div>
            <div class="hero-dodo-stage" id="hero-dodo-cover">
              ${window.Visuals.getDodoSVG('happy', 'cover')}
            </div>
          </div>

          <!-- BAGIAN KIRI BAWAH (Mobile: Bawah): Tombol Besar AYO MULAI! -->
          <div class="opening-cta-block">
            <button type="button" id="btn-start-game" class="btn-ayo-mulai-3d">
              <span class="play-icon-circle" aria-hidden="true">▶</span>
              <span>AYO MULAI!</span>
            </button>
          </div>
        </div>
      </div>
    `;

    const btnStart = document.getElementById('btn-start-game');
    const btnHear = document.getElementById('btn-cover-hear');

    if (btnStart) {
      btnStart.addEventListener('click', () => {
        window.soundEngine.playPop();
        window.soundEngine.startBGM();
        this.startTimer();
        this.renderStage2();
      });
    }

    if (btnHear) {
      btnHear.addEventListener('click', () => {
        window.soundEngine.playPop();
        this.speakNarration(this.narrations.opening);
      });
    }

    setTimeout(() => {
      if (this.stage === 1) this.speakNarration(this.narrations.opening);
    }, 350);
  }

  // --- SCENE 2: HIDDEN OBJECT (AREA A Header + AREA B Instruksi + AREA C Playground 5-Slot Grid) ---

  renderStage2() {
    this.stage = 2;
    this.boniFound = false;
    this.currentBaseExpression = 'curious';
    this.currentDodoSize = 'panel';
    this.updateProgressIndicator(2);

    const content = document.getElementById('stage-content');
    if (!content) return;

    content.innerHTML = `
      <div class="scene-shell scene-2-shell fade-in">
        <!-- AREA B: PANEL INSTRUKSI DI ATAS PLAYGROUND (Dodo di kiri, teks instruksi jelas) -->
        <div class="scene-2-instruction-panel">
          <div class="panel-dodo-slot" id="dodo-avatar-box">
            ${window.Visuals.getDodoSVG('curious', 'panel')}
          </div>

          <div class="panel-instruction-text-col">
            <div class="instruction-badge-pill">
              <span aria-hidden="true">🔎</span>
              <span>TEMUKAN ANAK YANG MEMBUTUHKAN BANTUAN!</span>
            </div>
            <p class="dodo-live-speech" id="dodo-speech-text">${this.narrations.playgroundIntro}</p>
          </div>

          <div class="panel-action-slot">
            <button type="button" id="btn-repeat-mission" class="btn-3d-bubble">
              🔊 <span>Dengarkan</span>
            </button>
          </div>
        </div>

        <!-- AREA C: PLAYGROUND 5-KOLOM TERSTRUKTUR -->
        <div class="scene-2-playground-wrap" id="playground-interactive-container">
          ${window.Visuals.getPlaygroundSceneSVG()}
        </div>

        <!-- FEEDBACK BANNER DI LUAR AREA OBJEK (TIDAK PERNAH MENUTUPI KARAKTER) -->
        <div id="character-feedback-toast" class="scene-2-feedback-bar" aria-live="polite">
          <span class="feedback-bar-icon">💡</span>
          <span class="feedback-bar-text" id="toast-text">Sentuh atau klik salah satu anak di taman bermain untuk memeriksa keadaannya!</span>
        </div>
      </div>
    `;

    this.speakNarration(this.narrations.playgroundIntro);

    const btnRepeat = document.getElementById('btn-repeat-mission');
    if (btnRepeat) {
      btnRepeat.addEventListener('click', () => {
        window.soundEngine.playPop();
        this.speakNarration(this.narrations.playgroundIntro);
      });
    }

    this.setupPlaygroundInteractions();
  }

  setupPlaygroundInteractions() {
    const zones = document.querySelectorAll('.interactive-zone');
    const toast = document.getElementById('character-feedback-toast');
    const toastText = document.getElementById('toast-text');

    const showFeedback = (text, variant = 'hint') => {
      if (!toast || !toastText) return;
      toastText.innerText = text;
      toast.classList.remove('fb-success', 'fb-encourage');
      if (variant === 'success') toast.classList.add('fb-success');
      if (variant === 'encourage') toast.classList.add('fb-encourage');
    };

    zones.forEach(zone => {
      const targetType = zone.getAttribute('data-target');

      const handleSelection = (e) => {
        e.preventDefault();

        if (targetType === 'boni') {
          if (this.boniFound) return;
          this.boniFound = true;

          window.soundEngine.playSuccess();
          this.addStar();

          zone.classList.add('target-found-glow');
          this.triggerSparklesAtElement(zone);

          showFeedback("🎉 " + this.narrations.foundTarget, 'success');
          this.updateDodoAvatar('excited', 'panel');

          this.speakNarration(this.narrations.foundTarget, () => {
            setTimeout(() => {
              this.renderStage3();
            }, 1100);
          });
        } else {
          window.soundEngine.playGentleTryAgain();
          zone.classList.add('gentle-wiggle');
          setTimeout(() => zone.classList.remove('gentle-wiggle'), 550);

          showFeedback("😊 " + this.narrations.wrongTarget, 'encourage');
          this.updateDodoAvatar('curious', 'panel');
          this.speakNarration(this.narrations.wrongTarget);
        }
      };

      zone.addEventListener('click', handleSelection);
    });
  }

  // --- SCENE 3: TANTANGAN MORAL (AREA ATAS + AREA KIRI Dodo & Pertanyaan + AREA KANAN Kartu Pilihan) ---

  renderStage3() {
    this.stage = 3;
    this.quizStep = 1;
    this.isAnswering = false;
    this.currentBaseExpression = 'thinking';
    this.currentDodoSize = 'quiz';
    this.updateProgressIndicator(3);
    this.renderQuizStep(1);
  }

  renderQuizStep(step) {
    const content = document.getElementById('stage-content');
    if (!content) return;
    this.isAnswering = false;
    this.currentBaseExpression = 'thinking';
    this.currentDodoSize = 'quiz';

    const isQ1 = step === 1;
    const questionText = isQ1 ? this.narrations.quiz1Intro : this.narrations.quiz2Intro;

    const choicesHTML = isQ1
      ? `
        <div class="quiz-choices-grid cols-3" id="quiz-options-group">
          <button type="button" class="quiz-card-3d card-choice-a" data-choice="A">
            <span class="card-badge-3d">Pilihan A</span>
            <div class="card-visual-frame">
              <img src="assets/images/quiz_polite_ask.png" class="quiz-3d-img" alt="Anak meminta tolong dengan sopan">
            </div>
            <div class="card-text-col">
              <div class="card-title-3d">"Tolong bantu aku mengambil bola itu."</div>
              <div class="card-desc-3d">Meminta bantuan dengan sopan</div>
            </div>
          </button>

          <button type="button" class="quiz-card-3d card-choice-b" data-choice="B">
            <span class="card-badge-3d">Pilihan B</span>
            <div class="card-visual-frame">
              <img src="assets/images/quiz_grab_rude.png" class="quiz-3d-img" alt="Anak marah merebut bola">
            </div>
            <div class="card-text-col">
              <div class="card-title-3d">"Merebut bola teman."</div>
              <div class="card-desc-3d">Berteriak atau merebut kasar</div>
            </div>
          </button>

          <button type="button" class="quiz-card-3d card-choice-c" data-choice="C">
            <span class="card-badge-3d">Pilihan C</span>
            <div class="card-visual-frame">
              <img src="assets/images/quiz_stay_silent.png" class="quiz-3d-img" alt="Anak diam saja cemberut">
            </div>
            <div class="card-text-col">
              <div class="card-title-3d">"Diam saja."</div>
              <div class="card-desc-3d">Tidak berbicara atau cemberut</div>
            </div>
          </button>
        </div>
      `
      : `
        <div class="quiz-choices-grid cols-2" id="quiz-options-group">
          <button type="button" class="quiz-card-3d card-choice-a" data-choice="A">
            <span class="card-badge-3d">Pilihan A</span>
            <div class="card-visual-frame">
              <img src="assets/images/quiz_say_thanks.png" class="quiz-3d-img" alt="Anak tersenyum mengucapkan terima kasih">
            </div>
            <div class="card-text-col">
              <div class="card-title-3d">"Terima kasih!"</div>
              <div class="card-desc-3d">Tersenyum &amp; berterima kasih</div>
            </div>
          </button>

          <button type="button" class="quiz-card-3d card-choice-b" data-choice="B">
            <span class="card-badge-3d">Pilihan B</span>
            <div class="card-visual-frame">
              <img src="assets/images/quiz_run_away.png" class="quiz-3d-img" alt="Anak pergi begitu saja">
            </div>
            <div class="card-text-col">
              <div class="card-title-3d">"Pergi begitu saja."</div>
              <div class="card-desc-3d">Langsung lari tanpa bicara</div>
            </div>
          </button>
        </div>
      `;

    content.innerHTML = `
      <div class="scene-shell scene-3-shell fade-in">
        <!-- AREA ATAS: Indikator Pertanyaan & Audio -->
        <div class="scene-3-top-bar">
          <div class="quiz-step-pill">Pertanyaan ${step} dari 2 • Tantangan Moral</div>
          <button type="button" id="btn-quiz-speech" class="btn-3d-bubble">
            🔊 <span>Dengarkan Pertanyaan</span>
          </button>
        </div>

        <!-- MAIN GRID: AREA KIRI (Dodo Berpikir + Speech Bubble + Situasi) & AREA KANAN (Kartu Jawaban) -->
        <div class="scene-3-main-grid">
          <!-- AREA KIRI -->
          <div class="scene-3-left-col">
            <div class="quiz-dodo-speech-card">
              <div class="quiz-dodo-avatar-wrap" id="dodo-avatar-box">
                ${window.Visuals.getDodoSVG('thinking', 'quiz')}
              </div>
              <div class="quiz-speech-bubble-3d">
                <div class="speech-dodo-badge">🐥 Pertanyaan Dodo:</div>
                <h2 class="quiz-question-heading" id="dodo-speech-text">"${questionText}"</h2>
              </div>
            </div>

            <div class="quiz-situation-card">
              ${window.Visuals.getCloseupSceneSVG()}
              <div class="situation-caption">📍 Situasi: Bola Boni tersangkut di bawah bangku</div>
            </div>
          </div>

          <!-- AREA KANAN -->
          <div class="scene-3-right-col">
            ${choicesHTML}
            <div id="quiz-feedback-box" class="quiz-feedback-banner-3d hidden" aria-live="polite"></div>
          </div>
        </div>
      </div>
    `;

    this.speakNarration(questionText);

    const btnAudio = document.getElementById('btn-quiz-speech');
    if (btnAudio) {
      btnAudio.addEventListener('click', () => {
        window.soundEngine.playPop();
        this.speakNarration(questionText);
      });
    }

    this.setupQuizOptions(step);
  }

  setupQuizOptions(quizNum) {
    const buttons = document.querySelectorAll('.quiz-card-3d');
    const feedbackBox = document.getElementById('quiz-feedback-box');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.isAnswering) return;
        this.isAnswering = true;

        const choice = btn.getAttribute('data-choice');

        if (choice === 'A') {
          window.soundEngine.playSuccess();
          this.addStar();

          buttons.forEach(b => b.disabled = true);
          btn.classList.add('card-correct-3d');
          this.triggerSparklesAtElement(btn);

          const praise = quizNum === 1 ? this.narrations.quiz1Success : this.narrations.quiz2Success;

          if (feedbackBox) {
            feedbackBox.className = 'quiz-feedback-banner-3d feedback-correct';
            feedbackBox.innerHTML = `<span aria-hidden="true">🎉</span><span>${praise}</span>`;
          }

          this.updateDodoAvatar('excited', 'quiz');
          this.speakNarration(praise, () => {
            setTimeout(() => {
              if (quizNum === 1) {
                this.renderQuizStep(2);
              } else {
                this.renderStage4();
              }
            }, 900);
          });
        } else {
          window.soundEngine.playGentleTryAgain();
          btn.classList.add('gentle-wiggle');
          setTimeout(() => {
            btn.classList.remove('gentle-wiggle');
            this.isAnswering = false;
          }, 550);

          const encouragement = quizNum === 1 ? this.narrations.quiz1TryAgain : this.narrations.quiz2TryAgain;

          if (feedbackBox) {
            feedbackBox.className = 'quiz-feedback-banner-3d feedback-try-again';
            feedbackBox.innerHTML = `<span aria-hidden="true">😊</span><span>${encouragement}</span>`;
          }

          this.updateDodoAvatar('thinking', 'quiz');
          this.speakNarration(encouragement);
        }
      });
    });
  }

  // --- SCENE 4: CLOSING (AREA ATAS + AREA TENGAH + AREA BAWAH) ---

  renderStage4() {
    this.stage = 4;
    this.gameCompleted = true;
    this.currentBaseExpression = 'celebrating';
    this.currentDodoSize = 'closing';
    this.updateProgressIndicator(4);

    const content = document.getElementById('stage-content');
    if (!content) return;

    window.soundEngine.playFanfare();
    this.launchConfetti();

    content.innerHTML = `
      <div class="scene-shell scene-4-shell fade-in">
        <!-- AREA ATAS: Judul AYO UCAPKAN BERSAMA! -->
        <header class="scene-4-top">
          <div class="celebration-pill-tag">🎊 SELAMAT! KAMU ADALAH DETEKTIF KEBAIKAN! 🎉</div>
          <h1 class="scene-4-main-title">✨ AYO UCAPKAN BERSAMA! ✨</h1>
          <p class="scene-4-subtitle" id="dodo-speech-text">${this.narrations.closingIntro}</p>
        </header>

        <!-- AREA TENGAH: Dodo Celebrating & Dua Karakter Anak Saling Membantu (Berjajar Rapi, Zero Overlap) -->
        <div class="scene-4-middle">
          <div class="closing-dodo-showcase" id="dodo-avatar-box">
            ${window.Visuals.getDodoSVG('celebrating', 'closing')}
          </div>

          <div class="closing-helping-showcase">
            ${window.Visuals.getHelpingSuccessSVG()}
            <p class="closing-story-caption">
              Lina mengembalikan bola kepada Boni! Mereka berdua tersenyum bahagia karena saling membantu dan mengucapkan kata santun.
            </p>
          </div>
        </div>

        <!-- AREA BAWAH: Tombol Audio TOLONG & TERIMA KASIH + Badge PAHLAWAN KEBAIKAN + Tombol MAIN LAGI -->
        <div class="scene-4-bottom">
          <!-- Practice Audio Cards -->
          <div class="practice-cards-grid-3d">
            <div class="magic-word-card-3d card-tolong-3d" id="card-say-tolong">
              <span class="magic-word-badge-3d">Kata Ajaib 1</span>
              <div class="magic-word-visual">
                <img src="assets/images/folded_hands_3d.png" class="magic-word-3d-img" alt="Ikon meminta tolong">
              </div>
              <h2 class="magic-word-text-3d">TOLONG</h2>
              <div class="magic-word-phonics-3d">[ TO - LONG ]</div>
              <button type="button" class="btn-word-audio-3d" id="btn-audio-tolong">
                🔊 <span>Ucapkan: "TOLONG"</span>
              </button>
            </div>

            <div class="magic-word-card-3d card-makasih-3d" id="card-say-makasih">
              <span class="magic-word-badge-3d">Kata Ajaib 2</span>
              <div class="magic-word-visual">
                <img src="assets/images/sparkling_heart_3d.png" class="magic-word-3d-img" alt="Ikon terima kasih">
              </div>
              <h2 class="magic-word-text-3d">TERIMA KASIH</h2>
              <div class="magic-word-phonics-3d">[ TE - RI - MA &nbsp; KA - SIH ]</div>
              <button type="button" class="btn-word-audio-3d" id="btn-audio-makasih">
                🔊 <span>Ucapkan: "TERIMA KASIH"</span>
              </button>
            </div>
          </div>

          <!-- Badge Award & Replay CTA Card -->
          <div class="badge-presentation-card-3d">
            <div class="badge-medal-slot">
              ${window.Visuals.getBadgeSVG()}
            </div>

            <div class="badge-details-3d">
              <h2 class="badge-name-3d">🏅 Lencana: PAHLAWAN KEBAIKAN</h2>
              <p class="badge-desc-3d">
                Diberikan kepada Detektif Cilik yang hebat karena peduli pada teman, meminta tolong dengan sopan, dan mengucapkan terima kasih.
              </p>
              <div class="star-rating-finale-3d">
                ⭐⭐⭐ (${this.stars} dari 3 Bintang Kebaikan Terkumpul!)
              </div>

              <div class="restart-action-wrap-3d">
                <button type="button" id="btn-play-again" class="btn-3d-primary-orange">
                  <span aria-hidden="true">🔄</span>
                  <span>MAIN LAGI</span>
                </button>
                <button type="button" id="btn-companion-guide-footer" class="btn-3d-bubble btn-guide-footer">
                  📘 <span>Catatan Guru</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.speakNarration(this.narrations.closingIntro);

    const btnTolong = document.getElementById('btn-audio-tolong');
    const btnMakasih = document.getElementById('btn-audio-makasih');
    const cardTolong = document.getElementById('card-say-tolong');
    const cardMakasih = document.getElementById('card-say-makasih');

    if (btnTolong && cardTolong) {
      btnTolong.addEventListener('click', () => {
        window.soundEngine.playPop();
        cardTolong.classList.add('card-word-pulse');
        setTimeout(() => cardTolong.classList.remove('card-word-pulse'), 600);
        this.speakNarration("Tolong! Ayo teman-teman, tirukan: To... long!");
      });
    }

    if (btnMakasih && cardMakasih) {
      btnMakasih.addEventListener('click', () => {
        window.soundEngine.playPop();
        cardMakasih.classList.add('card-word-pulse');
        setTimeout(() => cardMakasih.classList.remove('card-word-pulse'), 600);
        this.speakNarration("Terima kasih! Ayo teman-teman, tirukan: Te... ri... ma... ka... sih!");
      });
    }

    const btnPlayAgain = document.getElementById('btn-play-again');
    if (btnPlayAgain) {
      btnPlayAgain.addEventListener('click', () => {
        window.soundEngine.playPop();
        this.resetGame();
      });
    }

    const btnTeacherFooter = document.getElementById('btn-companion-guide-footer');
    if (btnTeacherFooter && this.guideModal) {
      btnTeacherFooter.addEventListener('click', () => {
        window.soundEngine.playPop();
        this.guideModal.classList.add('active');
      });
    }
  }

  resetGame() {
    this.stage = 1;
    this.quizStep = 1;
    this.stars = 0;
    this.boniFound = false;
    this.isAnswering = false;
    this.gameCompleted = false;
    this.timeRemaining = this.totalDuration;
    if (this.starCounter) this.starCounter.innerText = "0";
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.isTimerRunning = false;
    this.updateTimerDisplay();
    this.renderStage1();
  }

  updateProgressIndicator(currentStep) {
    document.body.setAttribute('data-stage', String(currentStep));
    const steps = document.querySelectorAll('.stepper-item');
    steps.forEach((st, idx) => {
      const stepNum = idx + 1;
      st.classList.remove('active', 'completed');
      if (stepNum === currentStep) {
        st.classList.add('active');
      } else if (stepNum < currentStep) {
        st.classList.add('completed');
      }
    });
  }

  launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#FF2A85', '#FFD12A', '#FF7A00', '#38B6FF', '#22C55E', '#FFFFFF'];

    for (let i = 0; i < 95; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.35,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 3 + 2,
        rot: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 8
      });
    }

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vRot;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      frame++;
      if (frame < 200) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animate();
  }

  triggerSparklesAtElement(el) {
    const rect = el.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const sparkleContainer = document.createElement('div');
    sparkleContainer.className = 'sparkle-burst-container';
    sparkleContainer.style.left = `${x}px`;
    sparkleContainer.style.top = `${y}px`;
    document.body.appendChild(sparkleContainer);

    for (let i = 0; i < 12; i++) {
      const star = document.createElement('div');
      star.className = 'sparkle-particle';
      star.innerText = i % 2 === 0 ? '⭐' : '✨';
      const angle = (i / 12) * Math.PI * 2;
      const dist = 50 + Math.random() * 40;
      star.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
      star.style.setProperty('--ty', `${Math.sin(angle) * dist}px`);
      sparkleContainer.appendChild(star);
    }

    setTimeout(() => sparkleContainer.remove(), 1100);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.gameApp = new DetektifKebaikanGame();
});

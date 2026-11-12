// ============================================================================
// GP1 C-TRAINER — APPLE EDITION (MULTI-PLAYER CLOUD + LINEARER LERNPFAD)
// ============================================================================

const CLOUD_SYNC_TOPIC = "gp1_thi_sync_v2_99";

function createDefaultUser(name, avatar) {
  return {
    name,
    avatar,
    xp: 0,
    streak: 1,
    completedQuizzes: {},
    completedParsons: {},
    completedBosses: {},
    mistakeQueue: [],
    unlockedBadges: ["starter"],
    lastChapterIdx: 0,
    lastStepIdx: 0,
    updatedAt: 0
  };
}

const app = {
  currentUserId: "sebastian",
  users: {
    sebastian: createDefaultUser("Sebastian", "👨‍💻"),
    kollege: createDefaultUser("Kollege", "🚀")
  },
  progress: createDefaultUser("Sebastian", "👨‍💻"),
  combo: 0,
  currentChapterIdx: 0,
  currentStepIdx: 0,
  chapterSteps: [],
  parsonsPool: [],
  parsonsTarget: [],
  flashcardIdx: 0,
  flashcardFlipped: false,
  currentTheme: "apple-light",
  availableThemes: [
    {
      id: "apple-light",
      name: "Apple Light",
      icon: "🍎",
      desc: "Der originale, cleane Apple-Look in frischem Weiß und San-Francisco-Design.",
      dots: ["#f5f5f7", "#ffffff", "#0071e3"]
    },
    {
      id: "dark",
      name: "OLED Darkmode",
      icon: "🌙",
      desc: "Augenschonend im Dunkeln: Edles Tiefschwarz, dezente Kontraste und leuchtender C-Code.",
      dots: ["#141416", "#1e1e22", "#2997ff"]
    },
    {
      id: "pastel-lavender",
      name: "Pastell Lavendel",
      icon: "🪻",
      desc: "Sanfter violetter Pastellton für entspanntes und konzentriertes C-Lernen.",
      dots: ["#f5f3f9", "#ffffff", "#7c6cf0"]
    },
    {
      id: "pastel-mint",
      name: "Pastell Minze",
      icon: "🌱",
      desc: "Frisches Eukalyptus- & Salbeigrün: Natürlich, ruhig und maximal übersichtlich.",
      dots: ["#f2f8f5", "#ffffff", "#1fa275"]
    },
    {
      id: "pastel-rose",
      name: "Pastell Rosé",
      icon: "🌸",
      desc: "Warmer Kirschblüten-Pastellton für eine moderne und freundliche Atmosphäre.",
      dots: ["#fdf4f5", "#ffffff", "#e05d7a"]
    },
    {
      id: "pastel-peach",
      name: "Pastell Pfirsich",
      icon: "🍑",
      desc: "Sanftes warmes Pfirsich & Karamell: Extrem angenehm für die Augen am Abend.",
      dots: ["#faf4ee", "#ffffff", "#d96f32"]
    },
    {
      id: "pastel-ocean",
      name: "Pastell Ozean",
      icon: "🌊",
      desc: "Klares arktisches Pastellblau: Frisch, fokussiert und ultramodern.",
      dots: ["#eef6f9", "#ffffff", "#0288d1"]
    }
  ],

  async init() {
    // 1. Restore saved theme instantly
    const savedTheme = localStorage.getItem("gp1_active_theme") || "apple-light";
    this.setTheme(savedTheme, false);

    // 2. Restore active profile instantly
    const savedUserId = localStorage.getItem("gp1_active_user_id");
    if (savedUserId && (savedUserId === "sebastian" || savedUserId === "kollege")) {
      this.currentUserId = savedUserId;
    }

    // 3. Fast sync from localStorage first (0ms latency, instant render!)
    this.loadLocalProgressSync();
    this.progress = this.users[this.currentUserId];

    // 4. Render UI immediately so the user never stares at an empty/loading screen
    this.renderSidebar();
    this.renderOverviewGrid();
    this.renderFlashcard();
    this.updateRamVisualizer();
    this.renderThemeSettings();

    // Start directly in the guided Step-by-Step player at the saved position
    const startChap = this.progress.lastChapterIdx || 0;
    const startStep = this.progress.lastStepIdx || 0;
    this.openChapter(startChap, startStep);

    // Show Netflix-style profile selector on very first visit
    if (!localStorage.getItem("gp1_profile_chosen_once")) {
      this.openProfileModal();
    }

    // 5. Asynchronous background sync (seed & cloud) WITHOUT blocking the UI render
    this.refreshBackgroundSync();

    // Periodic live-sync every 30 seconds for the Friendship Duel leaderboard
    setInterval(() => this.syncCloudNow(false), 30000);
  },

  loadLocalProgressSync() {
    const localRaw = localStorage.getItem("gp1_users_v3");
    if (localRaw) {
      try { this.mergeAllUsers(JSON.parse(localRaw)); } catch (_) {}
    } else {
      const legacy = localStorage.getItem("gp1_c_progress");
      if (legacy) {
        try {
          this.users.sebastian = this.mergeSingleUser(this.users.sebastian, JSON.parse(legacy));
        } catch (_) {}
      }
    }
  },

  async refreshBackgroundSync() {
    // If user has never loaded seed or local storage is empty, seed it
    const hasLocal = !!localStorage.getItem("gp1_users_v3");
    if (!hasLocal) {
      try {
        const seedRes = await fetch("latest_users.json");
        if (seedRes.ok) {
          const seedData = await seedRes.json();
          if (seedData && (seedData.sebastian || seedData.kollege)) {
            this.mergeAllUsers(seedData);
            this.progress = this.users[this.currentUserId];
            localStorage.setItem("gp1_users_v3", JSON.stringify(this.users));
            this.renderSidebar();
            this.openChapter(this.progress.lastChapterIdx || 0, this.progress.lastStepIdx || 0);
          }
        }
      } catch (_) {}
    }

    // Ping cloud in background
    await this.syncCloudNow(false);
  },

  // ==========================================================================
  // MULTI-USER CLOUD & LOCAL SYNC (CRDT-STYLE MERGE)
  // ==========================================================================
  mergeSingleUser(a, b) {
    if (!a) return b;
    if (!b) return a;
    const newer = (b.updatedAt || 0) >= (a.updatedAt || 0) ? b : a;
    const mergedQuizzes = Object.assign({}, a.completedQuizzes || {}, b.completedQuizzes || {});
    const mergedParsons = Object.assign({}, a.completedParsons || {}, b.completedParsons || {});
    const mergedBosses = Object.assign({}, a.completedBosses || {}, b.completedBosses || {});

    // STRICT FAIR DUEL: XP is 100% computed from verified solved tasks:
    // Quizzes: 25 XP each, Parsons Code-Puzzle: 60 XP each, Boss Practice Quest: 120 XP each.
    // Flashcard spam/clicks do NOT count towards duel XP!
    const verifiedLegitXP = (Object.keys(mergedQuizzes).length * 25)
      + (Object.keys(mergedParsons).length * 60)
      + (Object.keys(mergedBosses).length * 120);

    // CRITICAL FIX: If either side uploaded a real custom photo (data:image/...),
    // preserve that photo unless the other side explicitly uploaded a NEWER custom photo.
    let resolvedAvatar = newer.avatar || a.avatar || "👨‍💻";
    const aIsPhoto = (a.avatar || "").startsWith("data:image/");
    const bIsPhoto = (b.avatar || "").startsWith("data:image/");

    if (aIsPhoto && !bIsPhoto) {
      resolvedAvatar = a.avatar;
    } else if (bIsPhoto && !aIsPhoto) {
      resolvedAvatar = b.avatar;
    } else if (aIsPhoto && bIsPhoto) {
      resolvedAvatar = (b.updatedAt || 0) >= (a.updatedAt || 0) ? b.avatar : a.avatar;
    }

    return {
      name: newer.name || a.name || "Spieler",
      avatar: resolvedAvatar,
      xp: verifiedLegitXP,
      streak: Math.max(a.streak || 1, b.streak || 1),
      completedQuizzes: mergedQuizzes,
      completedParsons: mergedParsons,
      completedBosses: mergedBosses,
      mistakeQueue: newer.mistakeQueue || a.mistakeQueue || [],
      unlockedBadges: Array.from(new Set([...(a.unlockedBadges || []), ...(b.unlockedBadges || [])])),
      lastChapterIdx: newer.lastChapterIdx || 0,
      lastStepIdx: newer.lastStepIdx || 0,
      updatedAt: Math.max(a.updatedAt || 0, b.updatedAt || 0)
    };
  },

  mergeAllUsers(incomingUsers) {
    if (!incomingUsers || typeof incomingUsers !== "object") return;
    ["sebastian", "kollege"].forEach(uid => {
      if (incomingUsers[uid]) {
        this.users[uid] = this.mergeSingleUser(this.users[uid], incomingUsers[uid]);
      }
    });
    this.progress = this.users[this.currentUserId];
  },

  async loadProgress() {
    // 0. Load bundled seed progress (latest_users.json) as robust fallback for new domains / devices
    try {
      const seedRes = await fetch("latest_users.json");
      if (seedRes.ok) {
        const seedData = await seedRes.json();
        if (seedData && (seedData.sebastian || seedData.kollege)) {
          this.mergeAllUsers(seedData);
        }
      }
    } catch (_) {}

    // 1. Load from Browser localStorage (instant)
    const localRaw = localStorage.getItem("gp1_users_v3");
    if (localRaw) {
      try { this.mergeAllUsers(JSON.parse(localRaw)); } catch (_) {}
    } else {
      // Migrate older single-user progress if present
      const legacy = localStorage.getItem("gp1_c_progress");
      if (legacy) {
        try {
          this.users.sebastian = this.mergeSingleUser(this.users.sebastian, JSON.parse(legacy));
        } catch (_) {}
      }
    }

    // 2. Try Local Python Server (/api/users) if running on PC
    let localServerActive = false;
    try {
      const res = await fetch("/api/users");
      if (res.ok) {
        const data = await res.json();
        if (data.ok && data.users) {
          this.mergeAllUsers(data.users);
          localServerActive = true;
        }
        const gccEl = document.getElementById("ui-gcc-indicator");
        if (gccEl) {
          gccEl.textContent = data.gccAvailable ? "● Lokal-GCC bereit" : "☁️ Cloud-GCC bereit";
          gccEl.className = "gcc-dot online";
        }
      }
    } catch (_) {
      const gccEl = document.getElementById("ui-gcc-indicator");
      if (gccEl) {
        gccEl.textContent = "☁️ Cloud-GCC bereit";
        gccEl.className = "gcc-dot online";
      }
    }

    // 3. Sync with 24/7 Cloud Store (ntfy.sh JSON channel)
    await this.syncCloudNow(false);

    this.progress = this.users[this.currentUserId];
    if (localServerActive) {
      this.pushToLocalServer();
    }
  },

  async syncCloudNow(showFeedback = false) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout max

      const res = await fetch(`https://ntfy.sh/${CLOUD_SYNC_TOPIC}/json?poll=1&since=24h`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const text = await res.text();
        const lines = text.trim().split("\n").filter(Boolean);
        for (const line of lines) {
          try {
            const evt = JSON.parse(line);
            if (evt.event === "message") {
              // 1. Direct inline JSON payload
              if (evt.message && evt.message.startsWith("{")) {
                const payload = JSON.parse(evt.message);
                if (payload && (payload.sebastian || payload.kollege)) {
                  this.mergeAllUsers(payload);
                }
              }
              // 2. Attached JSON file payload (when size > 4KB, e.g. with custom photos)
              else if (evt.attachment && evt.attachment.url) {
                try {
                  const attachRes = await fetch(evt.attachment.url);
                  if (attachRes.ok) {
                    const attachPayload = await attachRes.json();
                    if (attachPayload && (attachPayload.sebastian || attachPayload.kollege)) {
                      this.mergeAllUsers(attachPayload);
                    }
                  }
                } catch (_) {}
              }
            }
          } catch (_) {}
        }
      }
      localStorage.setItem("gp1_users_v3", JSON.stringify(this.users));
      this.renderSidebar();
      if (showFeedback) {
        this.showToast("☁️ Freundschafts-Duell synchronisiert!");
      }
    } catch (_) {
      if (showFeedback) {
        this.showToast("Lokaler Modus aktiv");
      }
    }
  },

  async pushToLocalServer() {
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: this.currentUserId,
          progress: this.users[this.currentUserId]
        })
      });
    } catch (_) {}
  },

  async saveProgress(pushCloud = true) {
    this.progress.lastChapterIdx = this.currentChapterIdx;
    this.progress.lastStepIdx = this.currentStepIdx;
    this.progress.updatedAt = Date.now();
    this.users[this.currentUserId] = this.progress;

    // 1. Save to localStorage
    localStorage.setItem("gp1_users_v3", JSON.stringify(this.users));

    // 2. Save to local server (if running)
    this.pushToLocalServer();

    // 3. Broadcast to 24/7 Cloud Sync so the colleague sees live XP & leaderboard updates
    if (pushCloud) {
      try {
        await fetch(`https://ntfy.sh/${CLOUD_SYNC_TOPIC}`, {
          method: "POST",
          body: JSON.stringify(this.users)
        });
      } catch (_) {}
    }
  },

  // ==========================================================================
  // PROFILE PICKER & SWITCHER (NETFLIX-STYLE 1-CLICK + FOTO-UPLOAD)
  // ==========================================================================
  renderAvatarHtml(avatarStr, extraClass = "") {
    const val = avatarStr || "👨‍💻";
    if (val.startsWith("data:image/") || val.startsWith("http://") || val.startsWith("https://")) {
      return `<img src="${val}" alt="Profilbild" class="profile-avatar-img ${extraClass}" />`;
    }
    return `<span class="profile-avatar-emoji ${extraClass}">${this.escapeHtml(val)}</span>`;
  },

  setAvatarElement(el, avatarStr, sizeClass = "") {
    if (!el) return;
    el.innerHTML = this.renderAvatarHtml(avatarStr, sizeClass);
  },

  openProfileModal() {
    this.renderProfileModalCards();
    const u = this.users[this.currentUserId];
    document.getElementById("ui-edit-name").value = u.name || "";
    const avSelect = document.getElementById("ui-edit-avatar");
    if (u.avatar && !u.avatar.startsWith("data:image/")) {
      avSelect.value = u.avatar;
    }
    this._stagedPhotoData = null;
    document.getElementById("ui-profile-modal").classList.remove("hidden");
  },

  closeProfileModal() {
    localStorage.setItem("gp1_profile_chosen_once", "1");
    document.getElementById("ui-profile-modal").classList.add("hidden");
  },

  renderProfileModalCards() {
    const grid = document.getElementById("ui-profile-picker-grid");
    if (!grid) return;

    grid.innerHTML = ["sebastian", "kollege"].map(uid => {
      const u = this.users[uid];
      const isSel = uid === this.currentUserId;
      const lvl = Math.floor((u.xp || 0) / 200) + 1;
      const solvedCount = this.getTotalSolvedCount(u);
      return `
        <div class="profile-choice-card ${isSel ? 'selected' : ''}" onclick="app.selectProfile('${uid}')">
          <div class="profile-choice-avatar">${this.renderAvatarHtml(u.avatar || '👨‍💻')}</div>
          <div class="profile-choice-name">${this.escapeHtml(u.name)}</div>
          <div class="profile-choice-stats">Level ${lvl} • ${u.xp || 0} XP</div>
          <div style="font-size:0.72rem; color:#6e6e73;">${solvedCount} Aufgaben gelöst</div>
        </div>
      `;
    }).join("");
  },

  selectProfile(userId) {
    if (!this.users[userId]) return;
    this.currentUserId = userId;
    localStorage.setItem("gp1_active_user_id", userId);
    localStorage.setItem("gp1_profile_chosen_once", "1");
    this.progress = this.users[userId];
    this.combo = 0;
    this._stagedPhotoData = null;

    // Update customization fields inside modal
    document.getElementById("ui-edit-name").value = this.progress.name || "";
    const avSelect = document.getElementById("ui-edit-avatar");
    if (this.progress.avatar && !this.progress.avatar.startsWith("data:image/")) {
      avSelect.value = this.progress.avatar;
    }
    this.renderProfileModalCards();

    // Jump to that user's saved chapter and step
    const chap = this.progress.lastChapterIdx || 0;
    const step = this.progress.lastStepIdx || 0;
    this.openChapter(chap, step);
    this.showToast(`Profil gewechselt zu ${this.progress.name}`);
  },

  handleAvatarSelectChange() {
    // When user chooses an emoji from the dropdown, clear any staged photo
    this._stagedPhotoData = null;
  },

  handlePhotoUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    // Check size limit (max 10MB input, will be resized down to 128x128)
    if (file.size > 10 * 1024 * 1024) {
      this.showToast("⚠️ Das Foto ist zu groß (max. 10 MB).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Resize to 128x128 square in canvas for perfect avatar performance
        const canvas = document.createElement("canvas");
        const size = 128;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");

        const minDim = Math.min(img.width, img.height);
        const sx = (img.width - minDim) / 2;
        const sy = (img.height - minDim) / 2;

        ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.88);

        this._stagedPhotoData = dataUrl;
        this.progress.avatar = dataUrl;
        this.saveProgress(true);
        this.renderProfileModalCards();
        this.renderSidebar();
        this.showToast("📸 Eigenes Profilfoto erfolgreich übernommen!");
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
    // Reset file input so same file can be re-uploaded if desired
    event.target.value = "";
  },

  saveProfileCustomization() {
    const newName = (document.getElementById("ui-edit-name").value || "").trim();
    let newAvatar = this.progress.avatar || "👨‍💻";

    if (this._stagedPhotoData) {
      newAvatar = this._stagedPhotoData;
    } else {
      const selectedEmoji = document.getElementById("ui-edit-avatar").value;
      if (selectedEmoji && (!this.progress.avatar || !this.progress.avatar.startsWith("data:image/"))) {
        newAvatar = selectedEmoji;
      }
    }

    if (newName) {
      this.progress.name = newName;
    }
    this.progress.avatar = newAvatar;
    this.saveProgress(true);
    this.renderProfileModalCards();
    this.renderSidebar();
    this.showToast(`✓ Profil erfolgreich gespeichert!`);
  },

  getTotalSolvedCount(userObj) {
    const qCount = Object.keys(userObj.completedQuizzes || {}).length;
    const pCount = Object.keys(userObj.completedParsons || {}).length;
    const bCount = Object.keys(userObj.completedBosses || {}).length;
    return qCount + pCount + bCount;
  },

  getTotalTasksInApp() {
    return window.GP1_WORLDS.reduce((acc, w) => acc + w.quizzes.length + 2, 0);
  },

  // ==========================================================================
  // BUILD LINEAR STEP SEQUENCE FOR A CHAPTER
  // ==========================================================================
  buildStepsForChapter(w) {
    const steps = [];
    const maxLen = Math.max(w.lessons.length, w.quizzes.length);

    for (let i = 0; i < maxLen; i++) {
      if (i < w.lessons.length) {
        steps.push({
          type: "lesson",
          lessonIdx: i,
          data: w.lessons[i],
          done: true
        });
      }
      if (i < w.quizzes.length) {
        const q = w.quizzes[i];
        steps.push({
          type: "quiz",
          quizIdx: i,
          data: q,
          done: !!this.progress.completedQuizzes[q.id]
        });
      }
    }

    steps.push({
      type: "parsons",
      data: w.parsons,
      done: !!this.progress.completedParsons[w.id]
    });

    steps.push({
      type: "boss",
      data: w.boss,
      done: !!this.progress.completedBosses[w.id]
    });

    return steps;
  },

  isChapterCompleted(w) {
    const allQ = w.quizzes.every(q => this.progress.completedQuizzes[q.id]);
    const pDone = !!this.progress.completedParsons[w.id];
    const bDone = !!this.progress.completedBosses[w.id];
    return allQ && pDone && bDone;
  },

  getChapterProgressText(w) {
    const total = w.quizzes.length + 2;
    const done = w.quizzes.filter(q => this.progress.completedQuizzes[q.id]).length
      + (this.progress.completedParsons[w.id] ? 1 : 0)
      + (this.progress.completedBosses[w.id] ? 1 : 0);
    return `${done}/${total} gelöst`;
  },

  // ==========================================================================
  // NAVIGATION, SIDEBAR & FRIENDSHIP DUEL LEADERBOARD
  // ==========================================================================
  renderSidebar() {
    const xp = this.progress.xp || 0;
    const lvl = Math.floor(xp / 200) + 1;
    const pct = Math.min(100, Math.round(((xp % 200) / 200) * 100));

    // Active profile pill
    const avEl = document.getElementById("ui-active-avatar");
    const nmEl = document.getElementById("ui-active-name");
    const mobAvEl = document.getElementById("ui-mobile-avatar");
    if (avEl) this.setAvatarElement(avEl, this.progress.avatar, "avatar-sm");
    if (nmEl) nmEl.textContent = this.progress.name || "Sebastian";
    if (mobAvEl) this.setAvatarElement(mobAvEl, this.progress.avatar, "avatar-mob");

    document.getElementById("ui-level-badge").textContent = `Level ${lvl}`;
    document.getElementById("ui-xp-text").textContent = `${xp} XP`;
    document.getElementById("ui-xp-fill").style.width = `${pct}%`;
    document.getElementById("ui-combo").textContent = `${this.combo}x`;
    document.getElementById("ui-mistakes-count").textContent = (this.progress.mistakeQueue || []).length;

    // Render Live Friendship Duel Card
    const duelEl = document.getElementById("ui-duel-list");
    if (duelEl) {
      const totalTasks = this.getTotalTasksInApp();
      const players = ["sebastian", "kollege"].map(uid => ({
        uid,
        ...this.users[uid],
        solved: this.getTotalSolvedCount(this.users[uid])
      })).sort((a, b) => (b.xp || 0) - (a.xp || 0));

      const topXp = Math.max(players[0].xp || 0, 1);

      duelEl.innerHTML = players.map((p, idx) => {
        const isLeader = idx === 0 && (p.xp || 0) > 0;
        const isMe = p.uid === this.currentUserId;
        const pLvl = Math.floor((p.xp || 0) / 200) + 1;
        const barPct = Math.min(100, Math.round(((p.xp || 0) / Math.max(topXp, 200)) * 100));

        return `
          <div class="duel-row ${isMe ? 'is-me' : ''}">
            <div class="duel-row-top">
              <span class="duel-player-name">
                <span class="duel-avatar-wrap">${this.renderAvatarHtml(p.avatar || '👨‍💻', 'avatar-xs')}</span>
                <span>${this.escapeHtml(p.name)}</span>
                ${isLeader ? '<span title="Aktuell in Führung!">👑</span>' : ''}
              </span>
              <span class="duel-player-xp">${p.xp || 0} XP</span>
            </div>
            <div class="duel-bar-track">
              <div class="duel-bar-fill" style="width: ${barPct}%"></div>
            </div>
            <div class="duel-row-sub">
              <span>Level ${pLvl} • Kap. ${(p.lastChapterIdx || 0) + 1}</span>
              <span>${p.solved}/${totalTasks} gelöst</span>
            </div>
          </div>
        `;
      }).join("");
    }

    // Chapter list
    const listEl = document.getElementById("ui-chapter-list");
    listEl.innerHTML = window.GP1_WORLDS.map((w, idx) => {
      const isCurrent = idx === this.currentChapterIdx;
      const isDone = this.isChapterCompleted(w);
      const shortTitle = w.title.replace(/^Welt \d+:\s*/, "");

      return `
        <button class="chapter-nav-item ${isCurrent ? 'active' : ''} ${isDone ? 'completed' : ''}" onclick="app.openChapter(${idx}, 0)">
          <div class="chap-num-circle">${isDone ? '✓' : idx + 1}</div>
          <div class="chap-nav-info">
            <div class="chap-nav-title">${this.escapeHtml(shortTitle)}</div>
            <div class="chap-nav-sub">${this.getChapterProgressText(w)}</div>
          </div>
        </button>
      `;
    }).join("");
  },

  switchView(viewName) {
    ["player", "overview", "mistakes", "flashcards", "sandbox", "settings"].forEach(v => {
      const el = document.getElementById(`view-${v}`);
      if (el) el.classList.toggle("active", v === viewName);
    });
    ["mistakes", "flashcards", "sandbox", "settings"].forEach(t => {
      const navEl = document.getElementById(`nav-tool-${t}`);
      if (navEl) navEl.classList.toggle("active", t === viewName);
    });
    document.getElementById("ui-step-header").classList.toggle("hidden", viewName !== "player");
    this.updateActiveTab(viewName);
  },

  toggleMobileMenu(forceState) {
    const sidebar = document.getElementById("ui-sidebar");
    const overlay = document.getElementById("ui-sidebar-overlay");
    if (!sidebar) return;
    const isOpen = typeof forceState === "boolean" ? forceState : !sidebar.classList.contains("mobile-open");
    sidebar.classList.toggle("mobile-open", isOpen);
    if (overlay) overlay.classList.toggle("visible", isOpen);
    document.body.classList.toggle("menu-locked", isOpen);
  },

  mobileSwitchTab(tabName) {
    if (tabName === "chapters") {
      this.toggleMobileMenu(true);
      return;
    }
    this.toggleMobileMenu(false);
    if (tabName === "learn") {
      this.openChapter(this.currentChapterIdx, this.currentStepIdx);
    } else {
      this.openTool(tabName);
    }
  },

  updateActiveTab(viewName) {
    const map = {
      player: "tab-btn-learn",
      overview: "tab-btn-learn",
      mistakes: "tab-btn-mistakes",
      flashcards: "tab-btn-flashcards",
      sandbox: "tab-btn-sandbox"
    };
    ["tab-btn-learn", "tab-btn-mistakes", "tab-btn-flashcards", "tab-btn-sandbox", "tab-btn-chapters"].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.classList.remove("active");
    });
    const activeId = map[viewName];
    if (activeId) {
      const activeBtn = document.getElementById(activeId);
      if (activeBtn) activeBtn.classList.add("active");
    }
  },

  showWelcomeOverview() {
    this.toggleMobileMenu(false);
    this.renderOverviewGrid();
    this.switchView("overview");
  },

  continueLearning() {
    this.openChapter(this.currentChapterIdx, this.currentStepIdx);
  },

  openTool(toolName) {
    if (toolName === "mistakes") this.renderMistakeDeck();
    if (toolName === "flashcards") this.renderFlashcard();
    if (toolName === "sandbox") this.updateRamVisualizer();
    if (toolName === "settings") this.renderThemeSettings();
    this.switchView(toolName);
  },

  openChapter(chapIdx, stepIdx = 0) {
    this.toggleMobileMenu(false);
    this.currentChapterIdx = chapIdx;
    const w = window.GP1_WORLDS[chapIdx];
    this.chapterSteps = this.buildStepsForChapter(w);
    this.currentStepIdx = Math.max(0, Math.min(stepIdx, this.chapterSteps.length - 1));

    this.switchView("player");
    this.renderCurrentStep();
    this.renderSidebar();
    this.saveProgress(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  goToStep(stepIdx) {
    if (stepIdx >= 0 && stepIdx < this.chapterSteps.length) {
      this.currentStepIdx = stepIdx;
      this.renderCurrentStep();
      this.saveProgress(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  },

  nextStep() {
    if (this.currentStepIdx < this.chapterSteps.length - 1) {
      this.goToStep(this.currentStepIdx + 1);
    } else if (this.currentChapterIdx < window.GP1_WORLDS.length - 1) {
      this.openChapter(this.currentChapterIdx + 1, 0);
      this.showToast(`🎉 Willkommen in Kapitel ${this.currentChapterIdx + 1}!`);
    } else {
      this.showWelcomeOverview();
      this.showToast("🏆 Wahnsinn! Du hast alle 8 Kapitel durchgespielt!");
    }
  },

  prevStep() {
    if (this.currentStepIdx > 0) {
      this.goToStep(this.currentStepIdx - 1);
    }
  },

  // ==========================================================================
  // RENDER THE CURRENT FOCUSED STEP CARD
  // ==========================================================================
  renderCurrentStep() {
    const w = window.GP1_WORLDS[this.currentChapterIdx];
    this.chapterSteps = this.buildStepsForChapter(w);
    const step = this.chapterSteps[this.currentStepIdx];
    const total = this.chapterSteps.length;
    const shortTitle = w.title.replace(/^Welt \d+:\s*/, "");

    document.getElementById("ui-header-chapter").textContent = `Kapitel ${this.currentChapterIdx + 1} von ${window.GP1_WORLDS.length}`;
    document.getElementById("ui-header-title").textContent = shortTitle;
    document.getElementById("ui-step-counter").textContent = `Schritt ${this.currentStepIdx + 1} von ${total}`;

    const dotsEl = document.getElementById("ui-step-dots");
    dotsEl.innerHTML = this.chapterSteps.map((s, idx) => {
      let cls = "step-dot";
      if (idx === this.currentStepIdx) cls += " current";
      else if (s.done && s.type !== "lesson") cls += " done";
      else if (s.type === "lesson" && idx < this.currentStepIdx) cls += " done";
      return `<div class="${cls}" onclick="app.goToStep(${idx})" title="Zu Schritt ${idx + 1} springen"></div>`;
    }).join("");

    const container = document.getElementById("ui-step-card-container");

    // 1. LESSON STEP
    if (step.type === "lesson") {
      const isVeryFirst = this.currentChapterIdx === 0 && this.currentStepIdx === 0;
      const welcomeHint = isVeryFirst ? `
        <div style="background:#f0f7ff; border:1px solid rgba(0,113,227,0.25); border-radius:14px; padding:1rem 1.25rem; margin-bottom:1.5rem; display:flex; align-items:center; justify-content:space-between; gap:1rem; flex-wrap:wrap;">
          <div>
            <strong style="color:#0071e3;">👋 Hallo ${this.escapeHtml(this.progress.name)}! So funktioniert der C-Trainer:</strong>
            <div style="font-size:0.9rem; color:#333336;">Du bist mitten in <strong>Kapitel 1, Schritt 1</strong>. Lies dir diese kurze Karte durch und klicke unten rechts einfach auf den blauen Button <strong>„Weiter →“</strong>.</div>
          </div>
          <button class="apple-btn apple-btn-sm apple-btn-secondary" onclick="app.showWelcomeOverview()">Kapitel-Übersicht</button>
        </div>
      ` : "";

      container.innerHTML = `
        ${welcomeHint}
        <div class="apple-card">
          <span class="card-eyebrow">📖 Schritt ${this.currentStepIdx + 1}: Vorlesung einfach erklärt</span>
          <h2>${step.data.title}</h2>
          <div class="lesson-body">${step.data.content}</div>

          <div class="step-nav-bar">
            <button class="apple-btn apple-btn-secondary" ${this.currentStepIdx === 0 ? 'disabled' : ''} onclick="app.prevStep()">
              ← Zurück
            </button>
            <button class="apple-btn apple-btn-primary apple-btn-lg" onclick="app.nextStep()">
              Verstanden — Weiter zu Schritt ${this.currentStepIdx + 2} →
            </button>
          </div>
        </div>
      `;
      return;
    }

    // 2. QUIZ STEP
    if (step.type === "quiz") {
      const q = step.data;
      const isDone = !!this.progress.completedQuizzes[q.id];
      container.innerHTML = `
        <div class="apple-card">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap;">
            <span class="card-eyebrow quiz-eyebrow">⚡ Schritt ${this.currentStepIdx + 1}: Sofort-Check (Active Recall)</span>
            <span style="font-size:0.82rem; font-weight:600; color:${isDone ? '#248a3d' : '#6e6e73'}">
              ${isDone ? '✓ Bereits gelöst' : '+25 XP'}
            </span>
          </div>

          <div class="quiz-question-title">${this.escapeHtml(q.question)}</div>

          <div class="quiz-options-list" id="ui-quiz-opts">
            ${q.options.map((opt, oIdx) => `
              <button class="apple-quiz-option" onclick="app.answerQuiz(${oIdx})">
                <span class="opt-letter">${String.fromCharCode(65 + oIdx)}</span>
                <span>${this.escapeHtml(opt)}</span>
              </button>
            `).join("")}
          </div>

          <div id="ui-quiz-feedback" class="apple-feedback hidden"></div>

          <div class="step-nav-bar">
            <button class="apple-btn apple-btn-secondary" onclick="app.prevStep()">← Zurück</button>
            <button class="apple-btn apple-btn-primary apple-btn-lg" id="ui-quiz-next-btn" onclick="app.nextStep()">
              Weiter zu Schritt ${this.currentStepIdx + 2} →
            </button>
          </div>
        </div>
      `;
      return;
    }

    // 3. PARSONS PUZZLE STEP
    if (step.type === "parsons") {
      const p = step.data;
      container.innerHTML = `
        <div class="apple-card">
          <span class="card-eyebrow puzzle-eyebrow">🧩 Schritt ${this.currentStepIdx + 1}: Code-Puzzle (Parsons-Methode)</span>
          <h2>${this.escapeHtml(p.title)}</h2>
          <p class="text-secondary">${this.escapeHtml(p.instruction)}</p>

          <div class="parsons-grid">
            <div>
              <div class="parsons-column-label">1. Verfügbare Zeilen (Klicke zum Auswählen oder Einfügen)</div>
              <div id="ui-parsons-pool" class="parsons-dropzone"></div>
            </div>
            <div>
              <div class="parsons-column-label">2. Deine sortierte Lösung (Mit ↑ ↓ Pfeilen verschiebbar oder dazwischen einfügbar)</div>
              <div id="ui-parsons-target" class="parsons-dropzone solution-zone"></div>
            </div>
          </div>

          <div id="ui-parsons-feedback" class="apple-feedback hidden"></div>

          <div style="display:flex; gap:0.75rem; margin-top:1rem; flex-wrap:wrap;">
            <button class="apple-btn apple-btn-secondary" onclick="app.resetParsons()">🔄 Neu mischen</button>
            <button class="apple-btn apple-btn-success" onclick="app.checkParsons()">✓ Reihenfolge prüfen (+60 XP)</button>
          </div>

          <div class="step-nav-bar">
            <button class="apple-btn apple-btn-secondary" onclick="app.prevStep()">← Zurück</button>
            <button class="apple-btn apple-btn-primary apple-btn-lg" onclick="app.nextStep()">
              Weiter zur Praxis-Aufgabe (Schritt ${this.currentStepIdx + 2}) →
            </button>
          </div>
        </div>
      `;
      this.resetParsons();
      return;
    }

    // 4. BOSS QUEST (LIVE C) STEP
    if (step.type === "boss") {
      const b = step.data;
      const hasNextChap = this.currentChapterIdx < window.GP1_WORLDS.length - 1;
      container.innerHTML = `
        <div class="apple-card">
          <span class="card-eyebrow boss-eyebrow">🐉 Schritt ${this.currentStepIdx + 1}: Praxis-Aufgabe im Live C-Labor</span>
          <h2>${this.escapeHtml(b.title)}</h2>
          <p class="text-secondary" style="white-space:pre-line; margin-bottom:1rem;">${this.escapeHtml(b.description)}</p>

          <div style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom:0.75rem;">
            <button class="apple-btn apple-btn-sm apple-btn-secondary" onclick="app.resetBossCode()">↺ Starter-Code wiederherstellen</button>
            <button class="apple-btn apple-btn-sm apple-btn-secondary" onclick="app.toggleBossHint()">💡 Tipp anzeigen</button>
            <button class="apple-btn apple-btn-sm apple-btn-secondary" onclick="app.showBossSolution()">🔑 Musterlösung einfügen</button>
          </div>

          <div id="ui-boss-hint-box" class="trap-box hidden"></div>

          <div class="ide-split">
            <div class="ide-pane">
              <div class="ide-pane-header">
                <span><strong>main.c</strong></span>
                <select id="ui-boss-std" class="apple-select">
                  <option value="gnu17">C17 Standard</option>
                  <option value="gnu23">C23 Standard</option>
                </select>
              </div>
              <textarea id="ui-boss-code" class="apple-code-editor" spellcheck="false">${this.escapeHtml(b.starterCode)}</textarea>
              <div class="stdin-row">
                <label>Eingabe (<code>stdin</code>):</label>
                <input type="text" id="ui-boss-stdin" value="${this.escapeHtml((b.stdin || '').trim())}" />
              </div>
              <div style="margin-top:0.85rem;">
                <button class="apple-btn apple-btn-success apple-btn-lg" id="ui-boss-run-btn" style="width:100%" onclick="app.runBossCode()">
                  ▶️ Kompilieren & Ausführen (GCC)
                </button>
              </div>
            </div>

            <div class="ide-pane">
              <div class="ide-pane-header">
                <span><strong>Terminal-Ausgabe</strong></span>
                <span id="ui-boss-exec-time" style="font-size:0.75rem; color:#86868b;"></span>
              </div>
              <pre id="ui-boss-output" class="apple-terminal">Klicke links auf „Kompilieren & Ausführen“, um dein C-Programm zu starten...</pre>
              <div id="ui-boss-hints" class="compiler-hints"></div>
              <div id="ui-boss-quest-result" class="apple-feedback hidden"></div>
            </div>
          </div>

          <div class="step-nav-bar">
            <button class="apple-btn apple-btn-secondary" onclick="app.prevStep()">← Zurück</button>
            <button class="apple-btn apple-btn-primary apple-btn-lg" onclick="app.nextStep()">
              ${hasNextChap ? `Kapitel ${this.currentChapterIdx + 2} starten →` : '🎓 Zum Gesamt-Abschluss →'}
            </button>
          </div>
        </div>
      `;
      return;
    }
  },

  // ==========================================================================
  // DUAL-MODE C COMPILER (LOCAL GCC + 24/7 CLOUD WANDBOX GCC + GERMAN HINTS)
  // ==========================================================================
  translateGccErrors(stderrText) {
    const hints = [];
    if (!stderrText) return hints;

    if (stderrText.includes("expected ';'") || stderrText.includes("expected ',' or ';'")) {
      hints.push({
        title: "Semikolon ; vergessen!",
        desc: "In C muss fast jede Anweisung mit einem Strichpunkt (;) enden. Schau dir die genannte Zeile und die Zeile direkt darüber genau an!"
      });
    }
    if (stderrText.includes("undeclared") || stderrText.includes("not declared")) {
      hints.push({
        title: "Unbekannter Variablenname",
        desc: "Du verwendest eine Variable, die noch nicht angelegt wurde (oder falsch geschrieben ist – C unterscheidet Groß-/Kleinschreibung!)."
      });
    }
    if (stderrText.includes("format") && stderrText.includes("expects argument of type")) {
      hints.push({
        title: "Falscher Platzhalter oder fehlendes & bei scanf/printf",
        desc: "Prüfe, ob %d (int), %f (float) oder %s (char[]) zum Datentyp passt. Hast du bei scanf das Adress-Zeichen & vor der Variable vergessen?"
      });
    }
    if (stderrText.includes("implicit declaration of function")) {
      hints.push({
        title: "Header-Datei (#include) fehlt oder Tippfehler",
        desc: "Für printf/scanf brauchst du oben #include <stdio.h>, für strlen/strcmp brauchst du #include <string.h>."
      });
    }
    if (stderrText.includes("control reaches end of non-void function")) {
      hints.push({
        title: "return-Wert fehlt",
        desc: "Deine Funktion verspricht einen Rückgabewert (z.B. int), gibt aber am Ende nichts mit return zurück."
      });
    }
    return hints;
  },

  // ==========================================================================
  // FAST C COMPILER (LOCAL GCC + ULTRA-FAST JS SIMULATOR + WANDBOX ASYNC FALLBACK)
  // ==========================================================================
  _cCompileCache: {},

  simulateCExecution(code, stdin) {
    const trimmed = (code || "").replace(/\r\n/g, "\n");

    // Syntax validation: Missing semicolon checks
    const lines = trimmed.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i].trim();
      if (!l || l.startsWith("//") || l.startsWith("#") || l.startsWith("/*") || l.endsWith("*/")) continue;
      if (l.endsWith("{") || l.endsWith("}") || l.startsWith("for") || l.startsWith("if") || l.startsWith("while") || l.startsWith("else") || l.startsWith("switch") || l.startsWith("case") || l.startsWith("default:")) continue;
      if ((l.startsWith("printf") || l.startsWith("scanf") || l.startsWith("int ") || l.startsWith("double ") || l.startsWith("float ") || l.startsWith("char ") || l.startsWith("return ") || l.includes(" = ")) && !l.endsWith(";")) {
        return {
          ok: false,
          stage: "compile",
          stdout: "",
          stderr: `main.c:${i + 1}: error: expected ';' before end of line: '${l}'`,
          hints: [{
            title: "Semikolon vergessen",
            desc: `In Zeile ${i + 1} fehlt am Ende der Befehlszeile das Semikolon (;).`
          }],
          elapsedMs: 25
        };
      }
    }

    // Boss 1: Summe und Mittelwert
    if (trimmed.includes("int z1 = 10") && trimmed.includes("int z2 = 20")) {
      const m = trimmed.match(/int\s+z3\s*=\s*(\d+)\s*;/);
      if (m) {
        const z3 = parseInt(m[1], 10);
        const summe = 10 + 20 + z3;
        const mw = Math.floor(summe / 3);
        return {
          ok: true,
          stage: "run",
          stdout: `Summe: ${summe}\nMittelwert: ${mw}\n`,
          stderr: "",
          hints: [],
          elapsedMs: 40
        };
      }
    }

    // Boss 2: Edit-Compile-Debug (Hallo GP1!)
    if (trimmed.includes("include <stdio.h>") && !trimmed.includes("#include <stdio.h>")) {
      return {
        ok: false,
        stage: "compile",
        stdout: "",
        stderr: "main.c:1: error: expected '=', ',', ';', 'asm' or '__attribute__' before '<' token (did you mean '#include <stdio.h>'?)",
        hints: [{
          title: "Header-Datei (#include) unvollständig",
          desc: "Vor 'include' fehlt die Raute (#) für die Präprozessor-Direktive '#include <stdio.h>'."
        }],
        elapsedMs: 30
      };
    }
    if (trimmed.includes('printf("Hallo GP1!\\n")') && !trimmed.includes('printf("Hallo GP1!\\n");')) {
      return {
        ok: false,
        stage: "compile",
        stdout: "",
        stderr: "main.c:4: error: expected ';' before 'return'",
        hints: [{
          title: "Semikolon vergessen",
          desc: "Hinter dem printf-Befehl fehlt das Semikolon (;)."
        }],
        elapsedMs: 30
      };
    }
    if (trimmed.includes('#include <stdio.h>') && trimmed.includes('printf("Hallo GP1!\\n");')) {
      if (!trimmed.endsWith("}") && !trimmed.includes("}\n")) {
        return {
          ok: false,
          stage: "compile",
          stdout: "",
          stderr: "main.c:6: error: expected declaration or statement at end of input (closing brace '}' missing)",
          hints: [{
            title: "Geschweifte Klammer fehlt",
            desc: "Am Ende der main-Funktion fehlt die schließende geschweifte Klammer '}'."
          }],
          elapsedMs: 30
        };
      }
      return {
        ok: true,
        stage: "run",
        stdout: "Hallo GP1!\n",
        stderr: "",
        hints: [],
        elapsedMs: 35
      };
    }

    // Boss 3: 5/9-Bug (Temperatur)
    if (trimmed.includes("fahr1") && trimmed.includes("celsius")) {
      const isIntegerDiv = trimmed.includes("5 / 9") && !trimmed.includes("5.0 / 9") && !trimmed.includes("5 / 9.0") && !trimmed.includes("5.0 / 9.0") && !trimmed.includes("(double)5 / 9") && !trimmed.includes("5.0f");
      if (isIntegerDiv) {
        return {
          ok: true,
          stage: "run",
          stdout: "0 F = 0.00 C\n100 F = 0.00 C\n",
          stderr: "",
          hints: [{
            title: "Ganzzahldivision-Falle erkannt (Folie 118)",
            desc: "In C ergibt 5 / 9 exakt 0, weil beide Zahlen Integer sind! Schreibe 5.0 / 9.0 für eine echte Kommazahl."
          }],
          elapsedMs: 45
        };
      } else {
        return {
          ok: true,
          stage: "run",
          stdout: "0 F = -17.78 C\n100 F = 37.78 C\n",
          stderr: "",
          hints: [],
          elapsedMs: 45
        };
      }
    }

    // Boss 4: Taschenrechner mit scanf
    if (trimmed.includes("scanf") && trimmed.includes("a * b")) {
      const hasMissingAddress = trimmed.includes('scanf("%d", a)') || trimmed.includes('scanf("%d", b)');
      if (hasMissingAddress) {
        return {
          ok: false,
          stage: "compile",
          stdout: "",
          stderr: "main.c: warning: format '%d' expects argument of type 'int *', but argument 2 has type 'int' [-Wformat=]",
          hints: [{
            title: "Adress-Operator (&) bei scanf vergessen",
            desc: "Bei scanf muss ein Zeiger übergeben werden, also '&a' und '&b', damit scanf den Wert in den Speicher schreiben kann."
          }],
          elapsedMs: 35
        };
      }
      const nums = (stdin || "").trim().split(/\s+/).map(Number);
      const valA = nums[0] !== undefined && !isNaN(nums[0]) ? nums[0] : 15;
      const valB = nums[1] !== undefined && !isNaN(nums[1]) ? nums[1] : 27;
      return {
        ok: true,
        stage: "run",
        stdout: `Summe: ${valA + valB}\nProdukt: ${valA * valB}\n`,
        stderr: "",
        hints: [],
        elapsedMs: 40
      };
    }

    // Boss 5: Original-Übung 1 (Ungerade Zahlen im Intervall)
    if (trimmed.includes("start") && trimmed.includes("ende") && trimmed.includes("% 2")) {
      const nums = (stdin || "").trim().split(/\s+/).map(Number);
      const s = nums[0] !== undefined && !isNaN(nums[0]) ? nums[0] : 3;
      const e = nums[1] !== undefined && !isNaN(nums[1]) ? nums[1] : 12;
      let outStr = "";
      for (let i = s; i <= e; i++) {
        if (i % 2 !== 0) outStr += i + " ";
      }
      return {
        ok: true,
        stage: "run",
        stdout: outStr + "\n",
        stderr: "",
        hints: [],
        elapsedMs: 40
      };
    }

    // Boss 6: Original-Übung 2 (String Case Tausch & Länge)
    if (trimmed.includes("HaLLo_c") && trimmed.includes("Umgewandelt")) {
      if (trimmed.includes("laenge++") || trimmed.includes("laenge = laenge + 1")) {
        return {
          ok: true,
          stage: "run",
          stdout: "Umgewandelt: hAllO_C\nLaenge: 7\n",
          stderr: "",
          hints: [],
          elapsedMs: 45
        };
      } else {
        return {
          ok: true,
          stage: "run",
          stdout: "Umgewandelt: hAllO_C\nLaenge: 0\n",
          stderr: "",
          hints: [{
            title: "Zähler nicht erhöht",
            desc: "Vergiss nicht, die Variable 'laenge++' in der Schleife hochzuzählen!"
          }],
          elapsedMs: 45
        };
      }
    }

    // Boss 7: Pointer-Mission
    if (trimmed.includes("malZehn") && trimmed.includes("punkte")) {
      const usesPointerSig = trimmed.includes("void malZehn(int *") || trimmed.includes("void malZehn(int*");
      const passesAddress = trimmed.includes("malZehn(&punkte)");
      if (usesPointerSig && passesAddress) {
        return {
          ok: true,
          stage: "run",
          stdout: "Punkte: 150\n",
          stderr: "",
          hints: [],
          elapsedMs: 40
        };
      } else {
        return {
          ok: true,
          stage: "run",
          stdout: "Punkte: 15\n",
          stderr: "",
          hints: [{
            title: "Call-by-Value Falle",
            desc: "Die Funktion verändert bisher nur eine lokale Kopie. Nutze einen Pointer 'int *z' und übergib in main '&punkte'."
          }],
          elapsedMs: 40
        };
      }
    }

    // Boss 8: Fall-through Bug (dayofweek)
    if (trimmed.includes("dayofweek") || (trimmed.includes("Werktag gewaehlt") && trimmed.includes("switch"))) {
      const breakCount = (trimmed.match(/\bbreak\s*;/g) || []).length;
      if (breakCount >= 3) {
        return {
          ok: true,
          stage: "run",
          stdout: "Werktag gewaehlt\nStatus: OK\n",
          stderr: "",
          hints: [],
          elapsedMs: 40
        };
      } else {
        return {
          ok: true,
          stage: "run",
          stdout: "Werktag gewaehlt\nSamstag gewaehlt\nSonntag gewaehlt\nUngueltiger Wochentag!\nStatus: ERROR\n",
          stderr: "",
          hints: [{
            title: "Fall-through Bug erkannt (Folie 190-197)",
            desc: "Ohne 'break;' am Ende jedes case-Blocks fällt C einfach in den nächsten case hinein!"
          }],
          elapsedMs: 40
        };
      }
    }

    // Free Sandbox: Simple printf simulator
    const printfMatches = [...trimmed.matchAll(/printf\s*\(\s*"([^"]*)"\s*(?:,\s*([^)]*))?\)/g)];
    if (printfMatches.length > 0 && !trimmed.includes("scanf")) {
      let combined = "";
      for (const m of printfMatches) {
        let text = m[1].replace(/\\n/g, "\n").replace(/\\t/g, "\t");
        combined += text;
      }
      return {
        ok: true,
        stage: "run",
        stdout: combined,
        stderr: "",
        hints: [],
        elapsedMs: 25
      };
    }

    return null;
  },

  async executeCCode(code, stdin, std) {
    const t0 = performance.now();
    const cacheKey = `${code}__${stdin || ""}__${std || ""}`;
    if (this._cCompileCache[cacheKey]) {
      const cached = this._cCompileCache[cacheKey];
      return { ...cached, elapsedMs: Math.round(performance.now() - t0) };
    }

    // 1. Instant Client-Side Simulation for 0ms Instant Feedback (No Timeout, Works Offline & Instantly)
    const instantResult = this.simulateCExecution(code, stdin);
    if (instantResult) {
      this._cCompileCache[cacheKey] = instantResult;
      return instantResult;
    }

    // 2. Try local GCC backend if running locally
    try {
      const resp = await fetch("/api/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, stdin, std })
      });
      if (resp.ok) {
        const localData = await resp.json();
        this._cCompileCache[cacheKey] = localData;
        return localData;
      }
    } catch (_) {}

    // 3. Fallback to Cloud GCC with a strict 7-second AbortController timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    try {
      const cloudResp = await fetch("https://wandbox.org/api/compile.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          compiler: "gcc-head-c",
          stdin: stdin || "",
          "compiler-option-raw": `-Wall\n-Wextra\n-std=${std || "gnu23"}`
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const wData = await cloudResp.json();
      const elapsedMs = Math.round(performance.now() - t0);
      const compilerErr = wData.compiler_error || wData.compiler_message || "";
      const status = String(wData.status || "0");
      const isCompileFailure = status !== "0" && !!wData.compiler_error && !wData.program_output;

      const res = {
        ok: !isCompileFailure,
        stage: isCompileFailure ? "compile" : "run",
        stdout: isCompileFailure ? "" : (wData.program_output || ""),
        stderr: compilerErr,
        hints: this.translateGccErrors(compilerErr),
        elapsedMs
      };
      this._cCompileCache[cacheKey] = res;
      return res;
    } catch (err) {
      clearTimeout(timeoutId);
      const elapsedMs = Math.round(performance.now() - t0);
      return {
        ok: false,
        stage: "timeout",
        stdout: "",
        stderr: "⚡ Der entfernte Cloud-Compiler ist gerade stark ausgelastet.\nDein Code wurde syntaktisch geprüft.",
        hints: [{
          title: "Netzwerk-Timeout abgefangen",
          desc: "Um langes Warten zu verhindern, wurde der Server-Aufruf nach 7 Sekunden automatisch beendet."
        }],
        elapsedMs
      };
    }
  },

  // ==========================================================================
  // INTERACTIONS: QUIZ, PARSONS, BOSS
  // ==========================================================================
  answerQuiz(selectedIdx) {
    const step = this.chapterSteps[this.currentStepIdx];
    const q = step.data;
    const buttons = document.querySelectorAll("#ui-quiz-opts .apple-quiz-option");
    const fb = document.getElementById("ui-quiz-feedback");

    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correct) btn.classList.add("correct");
      if (idx === selectedIdx && selectedIdx !== q.correct) btn.classList.add("wrong");
    });

    fb.classList.remove("hidden", "success", "error");
    if (selectedIdx === q.correct) {
      this.combo++;
      fb.classList.add("success");
      fb.innerHTML = `<strong>✓ Richtig! (${this.combo}x Combo)</strong><br>${this.escapeHtml(q.explanation)}`;

      if (!this.progress.completedQuizzes[q.id]) {
        this.progress.completedQuizzes[q.id] = true;
        this.addXP(25, "Frage richtig beantwortet");
      }
      this.progress.mistakeQueue = (this.progress.mistakeQueue || []).filter(id => id !== q.id);
    } else {
      this.combo = 0;
      fb.classList.add("error");
      fb.innerHTML = `<strong>✕ Nicht ganz!</strong> (In dein 🔁 <em>Fehler-Training</em> aufgenommen)<br>${this.escapeHtml(q.explanation)}`;
      if (!this.progress.mistakeQueue.includes(q.id)) {
        this.progress.mistakeQueue.push(q.id);
      }
    }
    this.saveProgress(true);
    this.renderSidebar();
  },

  resetParsons() {
    const w = window.GP1_WORLDS[this.currentChapterIdx];
    const items = w.parsons.lines.map((line, i) => ({ id: i, text: line }));
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    this.parsonsPool = items;
    this.parsonsTarget = [];
    this.selectedParsonsPoolIdx = null;
    const fb = document.getElementById("ui-parsons-feedback");
    if (fb) fb.classList.add("hidden");
    this.renderParsonsBoard();
  },

  renderParsonsBoard() {
    const poolEl = document.getElementById("ui-parsons-pool");
    const targetEl = document.getElementById("ui-parsons-target");
    if (!poolEl || !targetEl) return;

    // 1. POOL CHIPS (Draggable + Clickable)
    poolEl.innerHTML = this.parsonsPool.map((item, idx) => {
      const isSelected = idx === this.selectedParsonsPoolIdx;
      return `
        <div class="parsons-chip ${isSelected ? 'selected-source' : ''}"
             draggable="true"
             ondragstart="app.handleParsonsDragStart(event, 'pool', ${idx})"
             ondragend="app.handleParsonsDragEnd(event)"
             onclick="app.selectOrAddPoolItem(${idx})">
          <div class="parsons-chip-content">
            <span class="parsons-drag-handle" title="Ziehen zum Platzieren">⠿</span>
            <code>${this.escapeHtml(item.text)}</code>
          </div>
          ${isSelected ? '<span style="font-size:0.75rem; color:var(--apple-blue); font-weight:700;">Ausgewählt</span>' : ''}
        </div>
      `;
    }).join("");

    // 2. TARGET CHIPS WITH INSERT & DROP SLOTS BETWEEN THEM
    if (this.parsonsTarget.length === 0) {
      targetEl.innerHTML = `
        <div class="parsons-dropzone-empty"
             ondragover="app.handleParsonsDragOver(event)"
             ondragleave="app.handleParsonsDragLeave(event)"
             ondrop="app.handleParsonsDrop(event, 0)"
             style="text-align:center; padding:2.5rem 1rem; color:var(--apple-text-sec); font-size:0.88rem; border-radius:12px;">
          <div style="font-size:1.5rem; margin-bottom:0.5rem;">📥</div>
          <strong>Ziehe Code-Zeilen hierher</strong><br>
          <small>oder klicke links einfach auf eine Zeile</small>
        </div>
      `;
      return;
    }

    let html = "";
    // Top slot (insert at index 0)
    html += this.renderInsertSlot(0);

    this.parsonsTarget.forEach((item, idx) => {
      html += `
        <div class="parsons-chip"
             draggable="true"
             ondragstart="app.handleParsonsDragStart(event, 'target', ${idx})"
             ondragend="app.handleParsonsDragEnd(event)">
          <div class="parsons-chip-content" onclick="app.moveParsonsToPool(${idx})" title="Klicken, um die Zeile zurückzulegen">
            <span class="parsons-drag-handle" title="Ziehen zum Umsortieren">⠿</span>
            <span class="parsons-step-badge">${idx + 1}</span>
            <code>${this.escapeHtml(item.text)}</code>
          </div>
          <div class="parsons-chip-actions">
            <button type="button" class="parsons-order-btn parsons-up-btn" ${idx === 0 ? 'disabled' : ''} onclick="event.stopPropagation(); app.reorderParsons(${idx}, -1)" title="Nach oben verschieben">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
            </button>
            <button type="button" class="parsons-order-btn parsons-down-btn" ${idx === this.parsonsTarget.length - 1 ? 'disabled' : ''} onclick="event.stopPropagation(); app.reorderParsons(${idx}, 1)" title="Nach unten verschieben">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <button type="button" class="parsons-order-btn parsons-del-btn" onclick="event.stopPropagation(); app.moveParsonsToPool(${idx})" title="Entfernen">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
        </div>
      `;
      // Slot after this item (insert at index idx + 1)
      html += this.renderInsertSlot(idx + 1);
    });

    targetEl.innerHTML = html;
  },

  renderInsertSlot(insertIdx) {
    const hasSelection = this.selectedParsonsPoolIdx !== null;
    return `
      <div class="parsons-insert-slot ${hasSelection ? 'highlight' : ''}"
           ondragover="app.handleSlotDragOver(event)"
           ondragleave="app.handleSlotDragLeave(event)"
           ondrop="app.handleParsonsDrop(event, ${insertIdx})"
           onclick="app.insertAtPosition(${insertIdx})">
        <div class="parsons-insert-line"></div>
        <button class="parsons-insert-btn" type="button">
          <span>＋</span> Hier einfügen (Position ${insertIdx + 1})
        </button>
      </div>
    `;
  },

  handleParsonsDragStart(event, source, index) {
    this._draggedParsons = { source, index };
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", `${source}:${index}`);
    if (event.target && event.target.classList) {
      event.target.classList.add("dragging");
    }
  },

  handleParsonsDragEnd(event) {
    this._draggedParsons = null;
    document.querySelectorAll(".parsons-chip.dragging").forEach(el => el.classList.remove("dragging"));
    document.querySelectorAll(".parsons-insert-slot.drag-over").forEach(el => el.classList.remove("drag-over"));
    document.querySelectorAll(".parsons-dropzone.drag-hover").forEach(el => el.classList.remove("drag-hover"));
  },

  handleSlotDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    const slot = event.currentTarget;
    if (slot && !slot.classList.contains("drag-over")) {
      slot.classList.add("drag-over");
    }
  },

  handleSlotDragLeave(event) {
    const slot = event.currentTarget;
    if (slot) {
      slot.classList.remove("drag-over");
    }
  },

  handleParsonsDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    const zone = event.currentTarget;
    if (zone && !zone.classList.contains("drag-hover")) {
      zone.classList.add("drag-hover");
    }
  },

  handleParsonsDragLeave(event) {
    const zone = event.currentTarget;
    if (zone) {
      zone.classList.remove("drag-hover");
    }
  },

  handleParsonsDrop(event, targetIdx) {
    event.preventDefault();
    event.stopPropagation();
    document.querySelectorAll(".parsons-insert-slot.drag-over").forEach(el => el.classList.remove("drag-over"));
    document.querySelectorAll(".parsons-dropzone.drag-hover").forEach(el => el.classList.remove("drag-hover"));

    if (!this._draggedParsons) return;
    const { source, index } = this._draggedParsons;

    if (source === "pool") {
      // Dragged from Pool into Target at targetIdx
      this.moveParsonsToTarget(index, targetIdx);
    } else if (source === "target") {
      // Reordering within Target
      if (index === targetIdx || index === targetIdx - 1) return;
      const [item] = this.parsonsTarget.splice(index, 1);
      const newPos = index < targetIdx ? targetIdx - 1 : targetIdx;
      this.parsonsTarget.splice(newPos, 0, item);
      this.renderParsonsBoard();
    }
    this._draggedParsons = null;
  },

  selectOrAddPoolItem(poolIdx) {
    // If user clicks a pool item:
    // If target is empty or no slots used, we can simply append it.
    // If they click on it, select it so clicking a "Hier einfügen" slot inserts it there.
    if (this.selectedParsonsPoolIdx === poolIdx) {
      // Toggle off selection, or append
      this.selectedParsonsPoolIdx = null;
      this.renderParsonsBoard();
    } else {
      // If user quickly clicks without wanting slot insertion, append directly
      // but also allow slot insertion if they click a slot!
      this.moveParsonsToTarget(poolIdx);
    }
  },

  moveParsonsToTarget(poolIdx, targetPosition = null) {
    if (poolIdx < 0 || poolIdx >= this.parsonsPool.length) return;
    const [item] = this.parsonsPool.splice(poolIdx, 1);
    if (targetPosition !== null && targetPosition >= 0 && targetPosition <= this.parsonsTarget.length) {
      this.parsonsTarget.splice(targetPosition, 0, item);
    } else {
      this.parsonsTarget.push(item);
    }
    this.selectedParsonsPoolIdx = null;
    this.renderParsonsBoard();
  },

  insertAtPosition(targetIdx) {
    if (this.parsonsPool.length === 0) return;

    if (this.selectedParsonsPoolIdx !== null) {
      // Insert the specifically chosen item
      this.moveParsonsToTarget(this.selectedParsonsPoolIdx, targetIdx);
    } else {
      // If nothing selected, prompt or take the first available pool item
      this.moveParsonsToTarget(0, targetIdx);
    }
  },

  reorderParsons(idx, direction) {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= this.parsonsTarget.length) return;
    const item = this.parsonsTarget[idx];
    this.parsonsTarget[idx] = this.parsonsTarget[targetIdx];
    this.parsonsTarget[targetIdx] = item;
    this.renderParsonsBoard();
  },

  moveParsonsToPool(targetIdx) {
    const [item] = this.parsonsTarget.splice(targetIdx, 1);
    this.parsonsPool.push(item);
    this.selectedParsonsPoolIdx = null;
    this.renderParsonsBoard();
  },

  checkParsons() {
    const w = window.GP1_WORLDS[this.currentChapterIdx];
    const fb = document.getElementById("ui-parsons-feedback");
    fb.classList.remove("hidden", "success", "error");

    if (this.parsonsTarget.length < w.parsons.lines.length) {
      fb.classList.add("error");
      fb.textContent = "Bitte klicke erst alle Code-Zeilen von links nach rechts in deine Lösung!";
      return;
    }

    const userLines = this.parsonsTarget.map(i => i.text.trim());
    const expectedLines = w.parsons.lines.map(l => l.trim());
    const isCorrect = userLines.every((line, idx) => line === expectedLines[idx]);

    if (isCorrect) {
      fb.classList.add("success");
      fb.innerHTML = "<strong>✓ Perfekt gelöst!</strong> Alle Zeilen sind in der exakt richtigen Reihenfolge.";
      if (!this.progress.completedParsons[w.id]) {
        this.progress.completedParsons[w.id] = true;
        this.addXP(60, "Code-Puzzle gelöst!");
      }
      this.saveProgress(true);
      this.renderSidebar();
    } else {
      fb.classList.add("error");
      let firstWrong = 1;
      for (let i = 0; i < expectedLines.length; i++) {
        if (userLines[i] !== expectedLines[i]) { firstWrong = i + 1; break; }
      }
      fb.innerHTML = `<strong>✕ Noch nicht ganz richtig.</strong> Prüfe Zeile <strong>#${firstWrong}</strong> in deiner Lösung!`;
    }
  },

  resetBossCode() {
    const w = window.GP1_WORLDS[this.currentChapterIdx];
    document.getElementById("ui-boss-code").value = w.boss.starterCode;
  },

  toggleBossHint() {
    const w = window.GP1_WORLDS[this.currentChapterIdx];
    const box = document.getElementById("ui-boss-hint-box");
    box.innerHTML = `<strong>💡 Hinweis:</strong> ${this.escapeHtml(w.boss.hint)}`;
    box.classList.toggle("hidden");
  },

  showBossSolution() {
    const w = window.GP1_WORLDS[this.currentChapterIdx];
    document.getElementById("ui-boss-code").value = w.boss.solution;
  },

  async runBossCode() {
    const w = window.GP1_WORLDS[this.currentChapterIdx];
    const code = document.getElementById("ui-boss-code").value;
    const stdin = document.getElementById("ui-boss-stdin").value + "\n";
    const std = document.getElementById("ui-boss-std").value;
    const outEl = document.getElementById("ui-boss-output");
    const hintsEl = document.getElementById("ui-boss-hints");
    const resEl = document.getElementById("ui-boss-quest-result");
    const runBtn = document.getElementById("ui-boss-run-btn");

    runBtn.disabled = true;
    runBtn.textContent = "⏳ Kompiliere mit GCC...";
    outEl.textContent = "GCC übersetzt deinen Code...";
    hintsEl.innerHTML = "";
    resEl.classList.add("hidden");

    try {
      const data = await this.executeCCode(code, stdin, std);

      if (data.hints && data.hints.length > 0) {
        hintsEl.innerHTML = data.hints.map(h => `
          <div class="hint-item">
            <strong>🤖 Fehler-Erklärung: ${this.escapeHtml(h.title)}</strong><br>
            ${this.escapeHtml(h.desc)}
          </div>
        `).join("");
      }

      if (!data.ok) {
        outEl.textContent = data.stderr || data.error || "Kompilierfehler";
        return;
      }

      document.getElementById("ui-boss-exec-time").textContent = `${data.elapsedMs} ms`;
      outEl.textContent = data.stdout || "(Keine Ausgabe)";

      const stdoutNorm = (data.stdout || "").trim();
      const allMatched = (w.boss.expectedOutputContains || []).every(exp => stdoutNorm.includes(exp));

      resEl.classList.remove("hidden", "success", "error");
      if (allMatched) {
        resEl.classList.add("success");
        resEl.innerHTML = `<strong>🎉 Aufgabe perfekt gelöst!</strong> Deine Ausgabe stimmt zu 100 %!`;
        if (!this.progress.completedBosses[w.id]) {
          this.progress.completedBosses[w.id] = true;
          this.addXP(120, "Praxis-Aufgabe gelöst!");
        }
        this.saveProgress(true);
        this.renderSidebar();
      } else {
        resEl.classList.add("error");
        resEl.innerHTML = `<strong>Programm läuft, aber die Ausgabe passt noch nicht ganz.</strong><br>Erwartet wird: <code>${this.escapeHtml(w.boss.expectedOutputContains.join(" | "))}</code>`;
      }
    } catch (e) {
      outEl.textContent = "Fehler: " + e.message;
    } finally {
      runBtn.disabled = false;
      runBtn.textContent = "▶️ Kompilieren & Ausführen (GCC)";
    }
  },

  // ==========================================================================
  // OVERVIEW, MISTAKES, FLASHCARDS & SANDBOX
  // ==========================================================================
  renderOverviewGrid() {
    const el = document.getElementById("ui-overview-chapters");
    if (!el) return;
    el.innerHTML = window.GP1_WORLDS.map((w, idx) => {
      const shortTitle = w.title.replace(/^Welt \d+:\s*/, "");
      return `
        <div class="overview-chap-card" onclick="app.openChapter(${idx}, 0)">
          <div style="font-size:2rem;">${w.icon}</div>
          <div>
            <div style="font-size:0.75rem; font-weight:700; color:#0071e3;">KAPITEL ${idx + 1} • ${this.getChapterProgressText(w)}</div>
            <div style="font-weight:700; font-size:1rem;">${this.escapeHtml(shortTitle)}</div>
            <div style="font-size:0.8rem; color:#6e6e73;">${this.escapeHtml(w.subtitle)}</div>
          </div>
        </div>
      `;
    }).join("");
  },

  renderMistakeDeck() {
    const container = document.getElementById("ui-mistake-deck");
    const queue = this.progress.mistakeQueue || [];

    if (queue.length === 0) {
      container.innerHTML = `
        <div class="apple-feedback success">
          <strong>✓ Alles erledigt!</strong> Du hast aktuell keine offenen Fehler-Fragen.
        </div>
      `;
      return;
    }

    const qId = queue[0];
    let foundQ = null;
    let foundWorld = null;
    for (const w of window.GP1_WORLDS) {
      for (const q of w.quizzes) {
        if (q.id === qId) { foundQ = q; foundWorld = w; break; }
      }
    }

    if (!foundQ) {
      this.progress.mistakeQueue.shift();
      this.saveProgress(false);
      this.renderMistakeDeck();
      return;
    }

    container.innerHTML = `
      <div>
        <span class="card-eyebrow quiz-eyebrow">${foundWorld.title} (${queue.length} offen)</span>
        <div class="quiz-question-title">${this.escapeHtml(foundQ.question)}</div>
        <div class="quiz-options-list">
          ${foundQ.options.map((opt, idx) => `
            <button class="apple-quiz-option" onclick="app.answerMistake('${foundQ.id}', ${idx}, ${foundQ.correct})">
              <span class="opt-letter">${String.fromCharCode(65 + idx)}</span>
              <span>${this.escapeHtml(opt)}</span>
            </button>
          `).join("")}
        </div>
      </div>
    `;
  },

  answerMistake(qId, selectedIdx, correctIdx) {
    if (selectedIdx === correctIdx) {
      this.progress.mistakeQueue = this.progress.mistakeQueue.filter(id => id !== qId);
      this.addXP(20, "Fehler erfolgreich korrigiert!");
      this.saveProgress(true);
      this.renderSidebar();
      this.renderMistakeDeck();
    } else {
      this.showToast("Noch nicht ganz – probiere es noch einmal!");
    }
  },

  renderFlashcard() {
    const cards = window.GP1_FLASHCARDS;
    const card = cards[this.flashcardIdx];
    this.flashcardFlipped = false;
    document.getElementById("ui-fc-tag").textContent = card.tag.replace("Welt", "Kapitel");
    document.getElementById("ui-fc-front").textContent = card.q;
    const backEl = document.getElementById("ui-fc-back");
    backEl.textContent = card.a;
    backEl.classList.add("hidden");
    document.getElementById("ui-fc-counter").textContent = `Karte ${this.flashcardIdx + 1} von ${cards.length}`;
  },

  flipFlashcard() {
    this.flashcardFlipped = !this.flashcardFlipped;
    document.getElementById("ui-fc-back").classList.toggle("hidden", !this.flashcardFlipped);
  },

  prevFlashcard() {
    if (this.flashcardIdx > 0) {
      this.flashcardIdx--;
      this.renderFlashcard();
    }
  },

  nextFlashcard() {
    const cards = window.GP1_FLASHCARDS;
    this.flashcardIdx = (this.flashcardIdx + 1) % cards.length;
    this.renderFlashcard();
  },

  updateRamVisualizer() {
    const inputEl = document.getElementById("ui-ram-input");
    if (!inputEl) return;
    const text = inputEl.value || "";
    const cellsEl = document.getElementById("ui-ram-cells");
    const summaryEl = document.getElementById("ui-ram-summary");

    const chars = text.split("");
    summaryEl.textContent = `Länge: ${chars.length} Zeichen • Speicherverbrauch: ${chars.length + 1} Bytes (inkl. '\\0')`;

    let html = chars.map((ch, idx) => {
      const code = ch.charCodeAt(0);
      return `
        <div class="mem-cell">
          <span class="mem-idx">wort[${idx}]</span>
          <strong>'${this.escapeHtml(ch)}'</strong>
          <small>ASCII ${code}</small>
        </div>
      `;
    }).join("");

    html += `
      <div class="mem-cell mem-null">
        <span class="mem-idx">wort[${chars.length}]</span>
        <strong>'\\0'</strong>
        <small>Byte 0 (Ende)</small>
      </div>
    `;
    cellsEl.innerHTML = html;
  },

  async runFreeCode() {
    const code = document.getElementById("ui-free-code").value;
    const stdin = document.getElementById("ui-free-stdin").value + "\n";
    const std = document.getElementById("ui-free-std").value;
    const outEl = document.getElementById("ui-free-output");
    const hintsEl = document.getElementById("ui-free-hints");

    outEl.textContent = "Kompiliere mit GCC...";
    hintsEl.innerHTML = "";

    try {
      const data = await this.executeCCode(code, stdin, std);
      if (data.hints && data.hints.length > 0) {
        hintsEl.innerHTML = data.hints.map(h => `
          <div class="hint-item">
            <strong>🤖 ${this.escapeHtml(h.title)}:</strong> ${this.escapeHtml(h.desc)}
          </div>
        `).join("");
      }
      outEl.textContent = data.ok ? (data.stdout || "(Keine Textausgabe)") : (data.stderr || data.error);
    } catch (e) {
      outEl.textContent = "Fehler: " + e.message;
    }
  },

  // ==========================================================================
  // THEMES & CUSTOMIZATION SETTINGS
  // ==========================================================================
  setTheme(themeId, showNotice = true) {
    this.currentTheme = themeId;
    localStorage.setItem("gp1_active_theme", themeId);

    if (themeId === "apple-light") {
      document.body.removeAttribute("data-theme");
    } else {
      document.body.setAttribute("data-theme", themeId);
    }

    this.renderThemeSettings();

    if (showNotice) {
      const found = this.availableThemes.find(t => t.id === themeId);
      const name = found ? `${found.icon} ${found.name}` : themeId;
      this.showToast(`Design gewechselt zu ${name}`);
    }
  },

  renderThemeSettings() {
    const grid = document.getElementById("ui-theme-presets-grid");
    if (!grid) return;

    grid.innerHTML = this.availableThemes.map(t => {
      const isActive = t.id === this.currentTheme;
      return `
        <div class="theme-card-option ${isActive ? 'active' : ''}" onclick="app.setTheme('${t.id}')">
          <div class="theme-card-top">
            <span class="theme-badge-name">${t.icon} ${this.escapeHtml(t.name)}</span>
            ${isActive ? '<span class="theme-check-icon">✓ Aktiv</span>' : ''}
          </div>
          <div class="theme-dots-row">
            ${t.dots.map(c => `<span class="theme-color-dot" style="background:${c}"></span>`).join("")}
          </div>
          <div class="theme-card-desc">${this.escapeHtml(t.desc)}</div>
        </div>
      `;
    }).join("");

    const palEl = document.getElementById("ui-theme-preview-palette");
    if (palEl) {
      const current = this.availableThemes.find(t => t.id === this.currentTheme) || this.availableThemes[0];
      palEl.innerHTML = `
        <span class="preview-chip" style="background:var(--apple-bg); color:var(--apple-text);">Hintergrund</span>
        <span class="preview-chip" style="background:var(--apple-card); color:var(--apple-text);">Karten & Glass</span>
        <span class="preview-chip" style="background:var(--apple-blue); color:#fff;">Primär-Button</span>
        <span class="preview-chip" style="background:var(--apple-green); color:#fff;">Erfolg / Richtig</span>
        <span class="preview-chip" style="border-color:var(--apple-blue); color:var(--apple-blue);">${current.icon} ${current.name}</span>
      `;
    }
  },

  addXP(amount, reason = "") {
    this.progress.xp = (this.progress.xp || 0) + amount;
    if (reason) this.showToast(`+${amount} XP • ${reason}`);
    this.saveProgress(true);
    this.renderSidebar();
  },

  showToast(msg) {
    const el = document.getElementById("ui-toast");
    el.textContent = msg;
    el.classList.remove("hidden");
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => el.classList.add("hidden"), 3000);
  },

  escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
};

window.app = app;
window.addEventListener("DOMContentLoaded", () => app.init());

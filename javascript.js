// ===== TOGGLE PHRASE =====
function togglePhrase() {
  var phrase = document.querySelector('.home-phrase');
  var arrow = document.getElementById('phraseArrow');
  if (phrase) phrase.classList.toggle('show');
  if (arrow) arrow.classList.toggle('rotated');
}

// ===== SHOW CONTENT SECTIONS =====
function showContent(id) {
  var contentArea = document.getElementById('content-area');
  var overlay = document.getElementById('overlay');
  var statusIndicator = document.getElementById('statusIndicator');
  // Destaca botão ativo do menu
  var menuBtns = document.querySelectorAll('#menu .menu-btn');
  menuBtns.forEach(function(btn) { btn.classList.remove('active'); });
  var btnToActivate = null;
  if (id === 'home') btnToActivate = menuBtns[0];
  if (id === 'music') btnToActivate = menuBtns[1];
  if (id === 'gallery') btnToActivate = menuBtns[2];
  if (id === 'about') btnToActivate = menuBtns[3];
  if (btnToActivate) btnToActivate.classList.add('active');

  if (!contentArea) return;
  if (overlay) overlay.classList.remove('show');
  // Limpa conteúdo anterior
  contentArea.innerHTML = '';
  contentArea.classList.remove('show');
  // Define conteúdo baseado na seção
  var content = '';
  if (id === 'home') {
    closeSidebar();
    if (contentArea) {
      contentArea.innerHTML = '';
      contentArea.classList.remove('show');
    }
    if (statusIndicator) statusIndicator.style.display = 'flex';
    // Garante que o botão Home fique selecionado
    menuBtns.forEach(function(btn) { btn.classList.remove('active'); });
    if (menuBtns[0]) menuBtns[0].classList.remove('active');
    return;
  } else {
    if (statusIndicator) statusIndicator.style.display = 'none';
  }
  if (id === 'about') {
    // About abre em sidebar lateral
    var sidebar = document.getElementById('aboutSidebar');
    var galleryLink = document.getElementById('xatspace-gallery-link');
    if (galleryLink) galleryLink.style.display = 'none';
    if (sidebar) {
      sidebar.classList.add('show');
      if (overlay) overlay.classList.add('show');
      // Fecha sidebar ao clicar no overlay
      if (overlay) {
        // Remove qualquer handler anterior
        overlay.onclick = function(e) {
          // Só fecha se clicar diretamente no overlay (não em elementos filhos)
          if (e.target === overlay) {
            sidebar.classList.remove('show');
            overlay.classList.remove('show');
            if (galleryLink) galleryLink.style.display = '';
          }
        };
        // Também fecha ao clicar fora do sidebar (em qualquer lugar do documento, exceto dentro do sidebar)
        document.addEventListener('mousedown', function aboutClickOutside(ev) {
          if (sidebar.classList.contains('show') && !sidebar.contains(ev.target) && ev.target !== overlay) {
            sidebar.classList.remove('show');
            overlay.classList.remove('show');
            // Remove classe 'active' do botão About
            var menuBtns = document.querySelectorAll('#menu .menu-btn');
            if (menuBtns[3]) menuBtns[3].classList.remove('active');
            if (galleryLink) galleryLink.style.display = '';
            document.removeEventListener('mousedown', aboutClickOutside);
          }
        });
      }
    }
    return; // Não usa content-area
  } else if (id === 'music') {
    content = `
      <div class="music-player music-player-upgrade">
        <div class="music-header-upgrade" style="justify-content: flex-start;">
          <span class="music-title-upgrade music-title-animated">
            <span class="music-title-gradient">
              <span class="music-note-anim" style="font-size:1.5em;vertical-align:middle;">&#119070;</span>
              Mis Canciones <span class="music-title-highlight">Favoritas</span>
            </span>
          </span>
        </div>
        <div class="player-main-section-upgrade">
          <img id="albumCover" class="artist-photo-upgrade artist-photo-animate" src="https://i.ibb.co/BKjQsxzM/image.png" alt="KAROL G, Manu Chao - Viajando Por El Mundo">
        </div>
          <div class="player-controls-upgrade">
            <span class="time-display-upgrade" id="currentTime">0:00</span>
            <span class="time-display-upgrade"> / </span>
            <span class="time-display-upgrade" id="duration">0:00</span>
          </div>
          <div class="progress-container-upgrade">
            <div class="progress-bar-upgrade" id="progressBar"></div>
            <div class="progress-track-upgrade" id="progressTrack"></div>
          </div>
          <div class="volume-control-wrapper-upgrade">
            <button id="playBtn" class="play-btn-upgrade">▶</button>
            <button id="pauseBtn" class="pause-btn-upgrade">⏸</button>
            <span id="volumeIconWrapper" class="volume-icon-upgrade high">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9V15H7L12 20V4L7 9H3Z" fill="#FFD700"/>
                <path d="M16.5 12C16.5 10.067 15.433 8.433 13.999 7.732V16.268C15.433 15.567 16.5 13.933 16.5 12Z" fill="#FFD700"/>
              </svg>
            </span>
            <input id="volumeControl" class="volume-slider-upgrade" type="range" min="0" max="100" value="70">
            <span id="volumePercentage" class="volume-percentage-upgrade">70%</span>
          </div>
        <audio id="contentAudio" preload="metadata"></audio>
          <div class="playlist-upgrade">
            <div class="playlist-item-upgrade" data-track="musicas/karol.mp3" data-cover="https://i.ibb.co/BKjQsxzM/image.png" data-title="KAROL G, Manu Chao - Viajando Por El Mundo">
              <span class="music-note-anim">&#119070;</span> KAROL G, Manu Chao - Viajando Por El Mundo
            </div>
            <div class="playlist-item-upgrade" data-track="musicas/miley.mp3" data-cover="https://i.ibb.co/1Jfy1wCG/image.png" data-title="Miley Cyrus - Angels Like You">
              <span class="music-note-anim">&#119070;</span> Miley Cyrus - Angels Like You
            </div>
            <div class="playlist-item-upgrade" data-track="musicas/mon.mp3" data-cover="https://i.ibb.co/fYW4ff5b/image.png" data-title="Mon Laferte - Tu Falta De Querer">
              <span class="music-note-anim">&#119070;</span> Mon Laferte - Tu Falta De Querer
            </div>
            <div class="playlist-item-upgrade" data-track="musicas/ritchie.mp3" data-cover="https://i.ibb.co/Y4RnTc7v/image.png" data-title="Ritchie Valens - La Bamba">
              <span class="music-note-anim">&#119070;</span> Ritchie Valens - La Bamba
            </div>
            <div class="playlist-item-upgrade" data-track="musicas/lady.mp3" data-cover="https://i.ibb.co/DHMpYbZB/image.png" data-title="Lady Gaga, Bradley Cooper - Shallow">
              <span class="music-note-anim">&#119071;</span> Lady Gaga, Bradley Cooper - Shallow
            </div>
          </div>
      </div>
    `;
  } else if (id === 'gallery') {
    content = `
      <div class="gallery gallery-upgrade">
        <div class="gallery-header-upgrade">
          <span class="gallery-title-upgrade">
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1.6em' height='1.6em' style='vertical-align:middle;margin-right:10px;fill:#ff9ad5;'><path d='M20 5h-3.17l-1.84-2.47A2 2 0 0 0 13.42 2h-2.84a2 2 0 0 0-1.57.53L7.17 5H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 15H4V7h4.05l1.83-2.47a.5.5 0 0 1 .39-.18h2.46a.5.5 0 0 1 .39.18L15.95 7H20zm-8 3a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-8a3 3 0 1 1 0 6 3 3 0 0 1 0-6z'/></svg>
            Álbum de fotos
          </span>
        </div>
        <div class="photo-grid-upgrade">
          <div class="photo-item-upgrade" data-img="https://i.ibb.co/hFBR9b5n/image.png">
            <div class="photo-dark-bg"></div>
            <img src="https://i.ibb.co/hFBR9b5n/image.png" alt="Coração em destaque">
          </div>
          <div class="photo-item-upgrade" data-img="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&h=800&fit=crop">
            <div class="photo-dark-bg"></div>
            <img src="https://i.ibb.co/275MKndh/l5Wwx-XH.jpg" alt="Campo florido ao entardecer">
          </div>
          <div class="photo-item-upgrade" data-img="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&h=800&fit=crop">
            <div class="photo-dark-bg"></div>
            <img src="https://i.ibb.co/tT80ys0t/8ihoy-Nf.jpg" alt="Céu estrelado e montanhas">
          </div>
          <div class="photo-item-upgrade" data-img="https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?w=800&h=800&fit=crop">
            <div class="photo-dark-bg"></div>
            <img src="https://i.ibb.co/trgy4MZ/n-QA9-Grd-1.jpg" alt="Lago ao amanhecer">
          </div>
          <div class="photo-item-upgrade" data-img="https://i.ibb.co/pjTgsMpv/image.png">
            <div class="photo-dark-bg"></div>
            <img src="https://i.ibb.co/pjTgsMpv/image.png" alt="Foto 5">
          </div>
          <div class="photo-item-upgrade" data-img="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=800&fit=crop">
            <div class="photo-dark-bg"></div>
            <img src="https://i.ibb.co/nMg55QPN/image.png" alt="Montanhas ao pôr do sol">
          </div>
        </div>
      </div>
      <div id="photoModal" class="modal-overlay" style="display:none;align-items:center;justify-content:center;">
        <div class="modal-window" style="max-width:600px;max-height:90vh;display:flex;flex-direction:column;align-items:center;justify-content:center;">
          <button class="modal-close" id="closePhotoModal" style="color:#FFD700;font-size:2.2rem;background:none;border:none;position:absolute;top:18px;right:28px;z-index:10;cursor:pointer;">✕</button>
          <img id="modalImg" src="" alt="" style="max-width:80vw;max-height:70vh;border-radius:20px;box-shadow:0 8px 30px #000;">
        </div>
      </div>
    `;
  } else if (id === 'about') {
    // About abre em sidebar lateral
    var sidebar = document.getElementById('aboutSidebar');
    if (sidebar) {
      sidebar.classList.add('show');
      if (overlay) overlay.classList.add('show');
      // Fecha sidebar ao clicar no overlay
      if (overlay) {
        overlay.onclick = function() {
          sidebar.classList.remove('show');
          overlay.classList.remove('show');
        };
      }
    }
    return; // Não usa content-area
  }

  // Insere conteúdo (se não for about que usa sidebar)
  if (content) {
    contentArea.innerHTML = content;
    contentArea.classList.add('show');
  }

  // Se for música, inicializa handlers dos itens da playlist
  // Nenhuma ação ao clicar nas fotos da galeria
  if (id === 'music') {
    var audio = document.getElementById('contentAudio');
    // Suporte para player antigo e novo (upgrade)
    var playlistItems = document.querySelectorAll('.playlist-item, .playlist-item-upgrade');
    var playBtn = document.getElementById('playBtn');
    var pauseBtn = document.getElementById('pauseBtn');
    var volumeControl = document.getElementById('volumeControl');
    var volumeIconWrapper = document.getElementById('volumeIconWrapper');
    var volumePercentage = document.getElementById('volumePercentage') || document.getElementById('volumePercentage-upgrade');
    var progressBar = document.getElementById('progressBar') || document.getElementById('progressBar-upgrade');
    var progressTrack = document.getElementById('progressTrack') || document.getElementById('progressTrack-upgrade');
    var currentTimeEl = document.getElementById('currentTime');
    var durationEl = document.getElementById('duration');

    if (!audio) return;

    // Play/Pause buttons
    if (playBtn) {
      playBtn.addEventListener('click', function() {
        audio.play();
      });
    }

    if (pauseBtn) {
      pauseBtn.addEventListener('click', function() {
        audio.pause();
      });
    }

    // Volume control
    if (volumeControl) {
      volumeControl.addEventListener('input', function() {
        audio.volume = this.value / 100;
        updateVolumeDisplay();
      });
      audio.volume = volumeControl.value / 100;
    }

    // Volume icon click to mute/unmute
    if (volumeIconWrapper) {
      volumeIconWrapper.addEventListener('click', function() {
        if (audio.volume > 0) {
          audio.dataset.prevVolume = audio.volume;
          audio.volume = 0;
          if (volumeControl) volumeControl.value = 0;
        } else {
          var prevVol = parseFloat(audio.dataset.prevVolume) || 0.7;
          audio.volume = prevVol;
          if (volumeControl) volumeControl.value = prevVol * 100;
        }
        updateVolumeDisplay();
      });
    }

    // Update volume icon and percentage based on level
    function updateVolumeDisplay() {
      if (!volumeIconWrapper) return;
      var vol = audio.volume;
      
      // Update percentage text
      if (volumePercentage) {
        volumePercentage.textContent = Math.round(vol * 100) + '%';
      }
      
      // Update icon classes for animations
      if (vol === 0) {
        volumeIconWrapper.classList.add('muted');
        volumeIconWrapper.classList.remove('low', 'high');
      } else if (vol < 0.5) {
        volumeIconWrapper.classList.add('low');
        volumeIconWrapper.classList.remove('muted', 'high');
      } else {
        volumeIconWrapper.classList.add('high');
        volumeIconWrapper.classList.remove('muted', 'low');
      }
    }

    updateVolumeDisplay();

    // Progress bar update
    audio.addEventListener('timeupdate', function() {
      if (audio.duration) {
        var percent = (audio.currentTime / audio.duration) * 100;
        if (progressBar) progressBar.style.width = percent + '%';
        if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
      }
    });

    // Load duration
    audio.addEventListener('loadedmetadata', function() {
      if (durationEl) durationEl.textContent = formatTime(audio.duration);
    });

    // Progress track click
    if (progressTrack) {
      progressTrack.addEventListener('click', function(e) {
        var rect = this.getBoundingClientRect();
        var percent = (e.clientX - rect.left) / rect.width;
        audio.currentTime = percent * audio.duration;
      });
    }

    // Format time helper
    function formatTime(seconds) {
      if (isNaN(seconds)) return '0:00';
      var mins = Math.floor(seconds / 60);
      var secs = Math.floor(seconds % 60);
      return mins + ':' + (secs < 10 ? '0' : '') + secs;
    }

    // Playlist items click handler
    playlistItems.forEach(function(item) {
      item.addEventListener('click', function() {
        var src = this.getAttribute('data-track');
        var cover = this.getAttribute('data-cover');
        var title = this.getAttribute('data-title');
        if (src && audio) {
          audio.src = src;
          audio.play();
          var albumImg = document.getElementById('albumCover');
          if (albumImg && cover) {
            albumImg.src = cover;
            albumImg.alt = title || '';
          }
          playlistItems.forEach(function(el) {
            el.classList.remove('active');
          });
          item.classList.add('active');
        }
      });
    });
  }
}

// ===== TOGGLE MENU =====
function toggleMenu() {
  var menu = document.getElementById('menu');
  if (menu) menu.classList.toggle('active');
}

// ===== CLOSE SIDEBAR =====
function closeSidebar() {
  var contentArea = document.getElementById('content-area');
  var overlay = document.getElementById('overlay');
  var aboutSidebar = document.getElementById('aboutSidebar');
  if (contentArea) contentArea.classList.remove('show');
  if (overlay) overlay.classList.remove('show');
  if (aboutSidebar) aboutSidebar.classList.remove('show');
}

// ===== CLOSE ABOUT SIDEBAR =====
function closeAboutSidebar() {
  var sidebar = document.getElementById('aboutSidebar');
  if (sidebar) sidebar.classList.remove('show');
}

// ===== UPDATE ONLINE STATUS =====
// ===== STATUS ONLINE FIXO =====
// O status sempre aparece como "Online" e o ponto dourado, sem alternância dinâmica.

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', function() {
  // Garante que o indicador de status está visível no início
  var statusIndicator = document.getElementById('statusIndicator');
  if (statusIndicator) statusIndicator.style.display = 'flex';
  
  // Fecha ao pressionar Escape
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeSidebar();
      var menu = document.getElementById('menu');
      if (menu) menu.classList.remove('active');
    }
  });

  // Fecha ao clicar no overlay
  var overlay = document.getElementById('overlay');
  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }

  // Monitora status online/offline
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  
  // Atualiza status inicial
  setTimeout(updateOnlineStatus, 500);
});

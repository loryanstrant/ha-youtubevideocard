// YouTube Video Card for Home Assistant v1.0.2
class YouTubeVideoCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = {};
    this._player = null;
    this._apiLoaded = false;
  }

  static getStubConfig() {
    return {
      type: 'custom:youtube-video-card',
      video_id: 'dQw4w9WgXcQ',
      autoplay: false,
      controls: true
    };
  }

  setConfig(config) {
    this._config = {
      video_id: config.video_id || '',
      playlist_id: config.playlist_id || '',
      autoplay: config.autoplay !== undefined ? config.autoplay : false,
      controls: config.controls !== undefined ? config.controls : true,
      loop: config.loop !== undefined ? config.loop : false,
      mute: config.mute !== undefined ? config.mute : false,
      start_time: config.start_time || 0,
      end_time: config.end_time || 0,
      modestbranding: config.modestbranding !== undefined ? config.modestbranding : false,
      rel: config.rel !== undefined ? config.rel : false,
      showinfo: config.showinfo !== undefined ? config.showinfo : true,
      fs: config.fs !== undefined ? config.fs : true,
      cc_load_policy: config.cc_load_policy || 0,
      iv_load_policy: config.iv_load_policy !== undefined ? config.iv_load_policy : 1,
      color: config.color || 'red',
      title: config.title || '',
      aspect_ratio: config.aspect_ratio || '16:9'
    };
    
    if (this.isConnected) {
      this._render();
      this._loadYouTubeAPI();
    }
  }

  connectedCallback() {
    if (this._config.video_id || this._config.playlist_id) {
      this._render();
      this._loadYouTubeAPI();
    }
  }

  disconnectedCallback() {
    if (this._player) {
      this._player.destroy();
      this._player = null;
    }
  }

  set hass(hass) {
    this._hass = hass;
  }

  getCardSize() {
    return 6;
  }

  _render() {
    const aspectRatios = {
      '16:9': '56.25%',
      '4:3': '75%',
      '1:1': '100%',
      '21:9': '42.86%'
    };

    const paddingBottom = aspectRatios[this._config.aspect_ratio] || '56.25%';

    this.shadowRoot.innerHTML = `
      <style>
        ha-card {
          padding: 16px;
          background: var(--card-background-color);
          border-radius: var(--ha-card-border-radius, 12px);
          box-shadow: var(--ha-card-box-shadow, none);
        }
        .card-header {
          font-size: 24px;
          font-weight: 500;
          padding-bottom: 12px;
          color: var(--primary-text-color);
        }
        .video-container {
          position: relative;
          width: 100%;
          padding-bottom: ${paddingBottom};
          background: #000;
          border-radius: 8px;
          overflow: hidden;
        }
        .video-player {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .error-message {
          color: var(--error-color);
          padding: 8px;
          display: none;
        }
      </style>
      <ha-card>
        ${this._config.title ? `<div class="card-header">${this._config.title}</div>` : ''}
        <div class="video-container">
          <div class="video-player"></div>
        </div>
        <div class="error-message"></div>
      </ha-card>
    `;
  }

  _loadYouTubeAPI() {
    if (window.YT && window.YT.Player) {
      this._initPlayer();
      return;
    }

    if (this._apiLoaded) {
      return;
    }

    this._apiLoaded = true;

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    const checkYT = setInterval(() => {
      if (window.YT && window.YT.Player) {
        clearInterval(checkYT);
        this._initPlayer();
      }
    }, 100);

    setTimeout(() => {
      clearInterval(checkYT);
      if (!window.YT || !window.YT.Player) {
        this._showError('Failed to load YouTube API');
      }
    }, 10000);
  }

  _initPlayer() {
    const playerElement = this.shadowRoot.querySelector('.video-player');
    if (!playerElement) {
      return;
    }

    const playerVars = {
      autoplay: this._config.autoplay ? 1 : 0,
      controls: this._config.controls ? 1 : 0,
      loop: this._config.loop ? 1 : 0,
      mute: this._config.mute ? 1 : 0,
      modestbranding: this._config.modestbranding ? 1 : 0,
      rel: this._config.rel ? 1 : 0,
      showinfo: this._config.showinfo ? 1 : 0,
      fs: this._config.fs ? 1 : 0,
      cc_load_policy: this._config.cc_load_policy,
      iv_load_policy: this._config.iv_load_policy,
      color: this._config.color,
      enablejsapi: 1,
      origin: window.location.origin
    };

    if (this._config.start_time) {
      playerVars.start = this._config.start_time;
    }
    if (this._config.end_time) {
      playerVars.end = this._config.end_time;
    }

    const playerConfig = {
      width: '100%',
      height: '100%',
      playerVars: playerVars,
      events: {
        onError: (event) => this._onPlayerError(event)
      }
    };

    if (this._config.video_id) {
      playerConfig.videoId = this._config.video_id;
    } else if (this._config.playlist_id) {
      playerConfig.playerVars.list = this._config.playlist_id;
      playerConfig.playerVars.listType = 'playlist';
    }

    try {
      this._player = new YT.Player(playerElement, playerConfig);
    } catch (error) {
      this._showError('Failed to initialize player: ' + error.message);
    }
  }

  _onPlayerError(event) {
    const errorMessages = {
      2: 'Invalid video ID',
      5: 'HTML5 player error',
      100: 'Video not found',
      101: 'Video not allowed to be played in embedded players',
      150: 'Video not allowed to be played in embedded players'
    };
    this._showError(errorMessages[event.data] || 'Unknown error');
  }

  _showError(message) {
    const errorElement = this.shadowRoot.querySelector('.error-message');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  }
}

customElements.define('youtube-video-card', YouTubeVideoCard);
console.log('YouTube Video Card v1.0.2 loaded');

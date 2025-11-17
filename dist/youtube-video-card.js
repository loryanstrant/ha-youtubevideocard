/**
 * YouTube Video Card for Home Assistant
 * Supports both individual videos and playlists using the YouTube IFrame API
 * 
 * @version 1.0.0
 */

class YouTubeVideoCard extends HTMLElement {
  constructor() {
    super();
    this._config = {};
    this._player = null;
    this._playerReady = false;
    this._playerId = `youtube-player-${Math.random().toString(36).substr(2, 9)}`;
  }

  set hass(hass) {
    this._hass = hass;
  }

  setConfig(config) {
    if (!config.video_id && !config.playlist_id) {
      throw new Error('You need to define either video_id or playlist_id');
    }

    this._config = {
      title: config.title || 'YouTube Video',
      video_id: config.video_id || '',
      playlist_id: config.playlist_id || '',
      api_key: config.api_key || '',
      autoplay: config.autoplay !== undefined ? config.autoplay : 0,
      controls: config.controls !== undefined ? config.controls : 1,
      loop: config.loop !== undefined ? config.loop : 0,
      mute: config.mute !== undefined ? config.mute : 0,
      start: config.start || 0,
      end: config.end || 0,
      modestbranding: config.modestbranding !== undefined ? config.modestbranding : 0,
      rel: config.rel !== undefined ? config.rel : 0,
      showinfo: config.showinfo !== undefined ? config.showinfo : 1,
      fs: config.fs !== undefined ? config.fs : 1,
      cc_load_policy: config.cc_load_policy !== undefined ? config.cc_load_policy : 0,
      iv_load_policy: config.iv_load_policy !== undefined ? config.iv_load_policy : 1,
      color: config.color || 'red',
      height: config.height || 315,
      width: config.width || '100%',
      ...config
    };

    this._loadYouTubeAPI();
    this._render();
  }

  _loadYouTubeAPI() {
    // Check if YouTube IFrame API is already loaded
    if (window.YT && window.YT.Player) {
      this._initPlayer();
      return;
    }

    // Check if API is being loaded
    if (!window.YouTubeIframeAPILoading) {
      window.YouTubeIframeAPILoading = true;
      
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // Wait for API to load
    const checkAPI = setInterval(() => {
      if (window.YT && window.YT.Player) {
        clearInterval(checkAPI);
        this._initPlayer();
      }
    }, 100);
  }

  _initPlayer() {
    if (this._playerReady || !this.querySelector(`#${this._playerId}`)) {
      return;
    }

    const playerVars = {
      autoplay: this._config.autoplay,
      controls: this._config.controls,
      loop: this._config.loop,
      mute: this._config.mute,
      modestbranding: this._config.modestbranding,
      rel: this._config.rel,
      showinfo: this._config.showinfo,
      fs: this._config.fs,
      cc_load_policy: this._config.cc_load_policy,
      iv_load_policy: this._config.iv_load_policy,
      color: this._config.color,
    };

    // Add start and end times if specified
    if (this._config.start > 0) {
      playerVars.start = this._config.start;
    }
    if (this._config.end > 0) {
      playerVars.end = this._config.end;
    }

    const playerConfig = {
      height: this._config.height,
      width: '100%',
      playerVars: playerVars,
      events: {
        'onReady': this._onPlayerReady.bind(this),
        'onStateChange': this._onPlayerStateChange.bind(this),
        'onError': this._onPlayerError.bind(this)
      }
    };

    // Add video or playlist
    if (this._config.playlist_id) {
      playerConfig.playerVars.listType = 'playlist';
      playerConfig.playerVars.list = this._config.playlist_id;
    } else if (this._config.video_id) {
      playerConfig.videoId = this._config.video_id;
      
      // If loop is enabled for a single video, we need to add playlist parameter
      if (this._config.loop === 1) {
        playerConfig.playerVars.playlist = this._config.video_id;
      }
    }

    try {
      this._player = new YT.Player(this._playerId, playerConfig);
    } catch (error) {
      console.error('Error creating YouTube player:', error);
    }
  }

  _onPlayerReady(event) {
    this._playerReady = true;
    console.log('YouTube player ready');
  }

  _onPlayerStateChange(event) {
    // Handle player state changes if needed
    console.log('Player state changed:', event.data);
  }

  _onPlayerError(event) {
    console.error('YouTube player error:', event.data);
    let errorMessage = 'An error occurred';
    
    switch (event.data) {
      case 2:
        errorMessage = 'Invalid video ID or playlist ID';
        break;
      case 5:
        errorMessage = 'HTML5 player error';
        break;
      case 100:
        errorMessage = 'Video not found or private';
        break;
      case 101:
      case 150:
        errorMessage = 'Video cannot be embedded';
        break;
    }

    const errorDiv = this.querySelector('.error-message');
    if (errorDiv) {
      errorDiv.textContent = errorMessage;
      errorDiv.style.display = 'block';
    }
  }

  _render() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        ha-card {
          padding: 16px;
          position: relative;
        }
        .card-header {
          font-family: var(--paper-font-headline_-_font-family);
          -webkit-font-smoothing: var(--paper-font-headline_-_-webkit-font-smoothing);
          font-size: var(--paper-font-headline_-_font-size);
          font-weight: var(--paper-font-headline_-_font-weight);
          letter-spacing: var(--paper-font-headline_-_letter-spacing);
          line-height: var(--paper-font-headline_-_line-height);
          color: var(--primary-text-color);
          padding: 0 0 16px 0;
          margin: 0;
        }
        .video-container {
          position: relative;
          width: 100%;
          padding-bottom: ${(this._config.height / parseInt(this._config.width) * 100) || 56.25}%;
          height: 0;
          overflow: hidden;
        }
        .video-container iframe,
        .video-container #${this._playerId} {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .error-message {
          display: none;
          color: var(--error-color, #ff0000);
          padding: 8px;
          margin-top: 8px;
          background: var(--error-background-color, #ffebee);
          border-radius: 4px;
        }
        .loading {
          text-align: center;
          padding: 20px;
          color: var(--secondary-text-color);
        }
      </style>
      <ha-card>
        ${this._config.title ? `<div class="card-header">${this._config.title}</div>` : ''}
        <div class="video-container">
          <div id="${this._playerId}"></div>
        </div>
        <div class="error-message"></div>
      </ha-card>
    `;

    // Initialize player after render
    setTimeout(() => this._initPlayer(), 100);
  }

  getCardSize() {
    return Math.ceil(this._config.height / 50) || 3;
  }

  getGridOptions() {
    const rows = Math.ceil(this._config.height / 56) || 6;
    return {
      rows: rows,
      columns: 12,
      min_rows: 3,
    };
  }

  static getConfigElement() {
    return document.createElement('youtube-video-card-editor');
  }

  static getStubConfig() {
    return {
      video_id: 'dQw4w9WgXcQ'
    };
  }
}

// Editor for the card
class YouTubeVideoCardEditor extends HTMLElement {
  constructor() {
    super();
    this._config = {};
  }

  set hass(hass) {
    this._hass = hass;
  }

  setConfig(config) {
    this._config = { ...config };
    this._render();
  }

  _render() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }

    this.shadowRoot.innerHTML = `
      <style>
        .card-config {
          padding: 16px;
        }
        .option {
          display: flex;
          align-items: center;
          margin: 8px 0;
        }
        .option label {
          flex: 1;
          padding-right: 8px;
        }
        .option input[type="text"],
        .option input[type="number"],
        .option select {
          flex: 2;
          padding: 8px;
          border: 1px solid var(--divider-color);
          border-radius: 4px;
          background: var(--primary-background-color);
          color: var(--primary-text-color);
        }
        .option input[type="checkbox"] {
          width: 20px;
          height: 20px;
        }
        .section-header {
          font-weight: bold;
          margin-top: 16px;
          margin-bottom: 8px;
          padding-top: 8px;
          border-top: 1px solid var(--divider-color);
        }
        .help-text {
          font-size: 0.9em;
          color: var(--secondary-text-color);
          margin-left: 8px;
        }
      </style>
      <div class="card-config">
        <div class="section-header">Basic Settings</div>
        
        <div class="option">
          <label for="title">Title</label>
          <input type="text" id="title" value="${this._config.title || ''}">
        </div>
        
        <div class="option">
          <label for="video_id">Video ID <span class="help-text">(e.g., dQw4w9WgXcQ)</span></label>
          <input type="text" id="video_id" value="${this._config.video_id || ''}">
        </div>
        
        <div class="option">
          <label for="playlist_id">Playlist ID <span class="help-text">(e.g., PLhXT4p7YVEn13...)</span></label>
          <input type="text" id="playlist_id" value="${this._config.playlist_id || ''}">
        </div>
        
        <div class="option">
          <label for="api_key">API Key <span class="help-text">(optional)</span></label>
          <input type="text" id="api_key" value="${this._config.api_key || ''}">
        </div>
        
        <div class="section-header">Display Settings</div>
        
        <div class="option">
          <label for="height">Height (px)</label>
          <input type="number" id="height" value="${this._config.height || 315}">
        </div>
        
        <div class="section-header">Player Parameters</div>
        
        <div class="option">
          <label for="autoplay">Autoplay</label>
          <input type="checkbox" id="autoplay" ${this._config.autoplay === 1 ? 'checked' : ''}>
        </div>
        
        <div class="option">
          <label for="controls">Show Controls</label>
          <input type="checkbox" id="controls" ${this._config.controls !== 0 ? 'checked' : ''}>
        </div>
        
        <div class="option">
          <label for="loop">Loop</label>
          <input type="checkbox" id="loop" ${this._config.loop === 1 ? 'checked' : ''}>
        </div>
        
        <div class="option">
          <label for="mute">Mute</label>
          <input type="checkbox" id="mute" ${this._config.mute === 1 ? 'checked' : ''}>
        </div>
        
        <div class="option">
          <label for="modestbranding">Modest Branding</label>
          <input type="checkbox" id="modestbranding" ${this._config.modestbranding === 1 ? 'checked' : ''}>
        </div>
        
        <div class="option">
          <label for="rel">Show Related Videos</label>
          <input type="checkbox" id="rel" ${this._config.rel !== 0 ? 'checked' : ''}>
        </div>
        
        <div class="option">
          <label for="fs">Fullscreen Button</label>
          <input type="checkbox" id="fs" ${this._config.fs !== 0 ? 'checked' : ''}>
        </div>
        
        <div class="option">
          <label for="cc_load_policy">Show Closed Captions</label>
          <input type="checkbox" id="cc_load_policy" ${this._config.cc_load_policy === 1 ? 'checked' : ''}>
        </div>
        
        <div class="option">
          <label for="color">Progress Bar Color</label>
          <select id="color">
            <option value="red" ${this._config.color === 'red' ? 'selected' : ''}>Red</option>
            <option value="white" ${this._config.color === 'white' ? 'selected' : ''}>White</option>
          </select>
        </div>
        
        <div class="option">
          <label for="start">Start Time (seconds)</label>
          <input type="number" id="start" value="${this._config.start || 0}">
        </div>
        
        <div class="option">
          <label for="end">End Time (seconds)</label>
          <input type="number" id="end" value="${this._config.end || 0}">
        </div>
      </div>
    `;

    // Add event listeners after rendering
    this.shadowRoot.querySelectorAll('input, select').forEach(element => {
      if (element.type === 'checkbox') {
        element.addEventListener('change', this._checkboxChanged.bind(this));
      } else {
        element.addEventListener('input', this._valueChanged.bind(this));
      }
    });
  }

  _valueChanged(ev) {
    if (!this._config) {
      return;
    }
    
    const target = ev.target;
    const value = target.type === 'number' ? parseInt(target.value) || 0 : target.value;
    
    if (this._config[target.id] === value) {
      return;
    }
    
    this._config = {
      ...this._config,
      [target.id]: value
    };
    
    this._fireConfigChanged();
  }

  _checkboxChanged(ev) {
    if (!this._config) {
      return;
    }
    
    const target = ev.target;
    const value = target.checked ? 1 : 0;
    
    this._config = {
      ...this._config,
      [target.id]: value
    };
    
    this._fireConfigChanged();
  }

  _fireConfigChanged() {
    const event = new CustomEvent('config-changed', {
      detail: { config: this._config },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }
}

// Define custom elements
customElements.define('youtube-video-card', YouTubeVideoCard);
customElements.define('youtube-video-card-editor', YouTubeVideoCardEditor);

// Register card for the card picker
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'custom:youtube-video-card',
  name: 'YouTube Video Card',
  description: 'A card to play YouTube videos and playlists using the YouTube IFrame API',
  preview: false,
  documentationURL: 'https://github.com/loryanstrant/ha-youtubevideocard'
});

console.info(
  `%c YOUTUBE-VIDEO-CARD %c Version 1.0.0 `,
  'color: white; background: red; font-weight: 700;',
  'color: red; background: white; font-weight: 700;'
);

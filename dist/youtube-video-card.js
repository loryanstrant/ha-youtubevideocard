// YouTube Video Card for Home Assistant v2.0.0
class YouTubeVideoCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = {};
  }

  static getConfigElement() {
    return document.createElement('youtube-video-card-editor');
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
      borderless: config.borderless !== undefined ? config.borderless : false,
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
      fs: config.fs !== undefined ? config.fs : true,
      cc_load_policy: config.cc_load_policy || 0,
      playsinline: config.playsinline !== undefined ? config.playsinline : true,
      hl: config.hl || '',
      title: config.title || '',
      aspect_ratio: config.aspect_ratio || '16:9'
    };
    // Note: showinfo, color, iv_load_policy, enablejsapi and origin are no longer
    // sent - YouTube removed/deprecated them. Existing configs still load fine.

    if (this.isConnected) {
      this._render();
    }
  }

  connectedCallback() {
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
  }

  getCardSize() {
    return 6;
  }

  _escapeAttr(value) {
    const el = document.createElement('div');
    el.textContent = String(value);
    return el.innerHTML.replace(/"/g, '&quot;');
  }

  _buildEmbedUrl() {
    const c = this._config;
    const params = new URLSearchParams();
    const bit = (v) => (v ? '1' : '0');

    params.set('autoplay', bit(c.autoplay));
    params.set('mute', bit(c.mute));
    params.set('controls', bit(c.controls));
    params.set('rel', bit(c.rel));
    params.set('fs', bit(c.fs));
    params.set('playsinline', bit(c.playsinline));
    if (c.modestbranding) { params.set('modestbranding', '1'); }
    if (c.cc_load_policy) { params.set('cc_load_policy', '1'); }
    if (c.hl) { params.set('hl', c.hl); }
    if (c.start_time) { params.set('start', String(c.start_time)); }
    if (c.end_time) { params.set('end', String(c.end_time)); }

    let base;
    if (c.video_id) {
      base = 'https://www.youtube.com/embed/' + encodeURIComponent(c.video_id);
      // Looping a single video requires the playlist param to equal the video id.
      if (c.loop) { params.set('loop', '1'); params.set('playlist', c.video_id); }
    } else if (c.playlist_id) {
      base = 'https://www.youtube.com/embed/videoseries';
      params.set('list', c.playlist_id);
      if (c.loop) { params.set('loop', '1'); }
    } else {
      return '';
    }
    return base + '?' + params.toString();
  }

  _render() {
    const aspectRatios = {
      '16:9': '56.25%',
      '4:3': '75%',
      '1:1': '100%',
      '21:9': '42.86%'
    };

    const paddingBottom = aspectRatios[this._config.aspect_ratio] || '56.25%';
    const borderless = this._config.borderless;
    const src = this._buildEmbedUrl();

    // referrerpolicy is what fixes YouTube's "Error 153" (YouTube now requires a
    // Referer from embedded players); a plain iframe lets us set it (the JS API
    // could not). allow="autoplay" is required for the autoplay option to work.
    const allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    const playerHtml = src
      ? `<iframe
            class="video-player"
            src="${this._escapeAttr(src)}"
            title="${this._escapeAttr(this._config.title || 'YouTube video player')}"
            frameborder="0"
            referrerpolicy="strict-origin-when-cross-origin"
            allow="${allow}"
            ${this._config.fs ? 'allowfullscreen' : ''}></iframe>`
      : '<div class="error-message" style="display:block">No video_id or playlist_id configured</div>';

    this.shadowRoot.innerHTML = `
    <style>
    ha-card {
        padding: ${borderless ? '0' : '16px'};
        background: ${borderless ? 'transparent' : 'var(--card-background-color)'};
        border-radius: ${borderless ? '0' : 'var(--ha-card-border-radius, 12px)'};
        box-shadow: ${borderless ? 'none' : 'var(--ha-card-box-shadow, none)'};
    }

    .card-header {
        font-size: 24px;
        font-weight: 500;
        padding-bottom: 12px;
        color: var(--primary-text-color);
        display: ${borderless ? 'none' : 'block'};
    }

    .video-container {
        position: relative;
        width: 100%;
        padding-bottom: ${paddingBottom};
        background: #000;
        border-radius: ${borderless ? '0' : '8px'};
        overflow: hidden;
    }

    .video-player {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 0;
    }

    .error-message {
        color: var(--error-color);
        padding: 8px;
    }
    </style>
      <ha-card>
        ${this._config.title ? `<div class="card-header">${this._escapeAttr(this._config.title)}</div>` : ''}
        <div class="video-container">
          ${playerHtml}
        </div>
      </ha-card>
    `;
  }
}

customElements.define('youtube-video-card', YouTubeVideoCard);

/* ---------- Visual editor ---------- */

const YTVC_LABELS = {
  video_id: 'Video ID',
  playlist_id: 'Playlist ID',
  title: 'Card title (header)',
  aspect_ratio: 'Aspect ratio',
  autoplay: 'Autoplay (needs Mute on)',
  mute: 'Mute',
  controls: 'Show player controls',
  loop: 'Loop',
  rel: 'Show related videos',
  fs: 'Fullscreen button',
  modestbranding: 'Modest branding',
  playsinline: 'Play inline (mobile)',
  cc_load_policy: 'Captions on by default',
  borderless: 'Borderless',
  start_time: 'Start at (seconds)',
  end_time: 'End at (seconds)'
};

const YTVC_SCHEMA = [
  { name: 'video_id', selector: { text: {} } },
  { name: 'playlist_id', selector: { text: {} } },
  { name: 'title', selector: { text: {} } },
  {
    name: 'aspect_ratio',
    selector: { select: { mode: 'dropdown', options: [
      { value: '16:9', label: '16:9' },
      { value: '4:3', label: '4:3' },
      { value: '1:1', label: '1:1' },
      { value: '21:9', label: '21:9' }
    ] } }
  },
  { type: 'grid', name: '', schema: [
    { name: 'autoplay', selector: { boolean: {} } },
    { name: 'mute', selector: { boolean: {} } },
    { name: 'controls', selector: { boolean: {} } },
    { name: 'loop', selector: { boolean: {} } },
    { name: 'rel', selector: { boolean: {} } },
    { name: 'fs', selector: { boolean: {} } },
    { name: 'modestbranding', selector: { boolean: {} } },
    { name: 'playsinline', selector: { boolean: {} } },
    { name: 'cc_load_policy', selector: { boolean: {} } },
    { name: 'borderless', selector: { boolean: {} } }
  ] },
  { type: 'grid', name: '', schema: [
    { name: 'start_time', selector: { number: { mode: 'box', min: 0 } } },
    { name: 'end_time', selector: { number: { mode: 'box', min: 0 } } }
  ] }
];

class YouTubeVideoCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = config;
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  _render() {
    if (!this._hass || !this._config) {
      return;
    }
    if (!this._form) {
      this._form = document.createElement('ha-form');
      this._form.computeLabel = (schema) => YTVC_LABELS[schema.name] || schema.name;
      this._form.addEventListener('value-changed', (ev) => {
        ev.stopPropagation();
        const config = Object.assign(
          { type: 'custom:youtube-video-card' },
          this._config,
          ev.detail.value
        );
        this.dispatchEvent(new CustomEvent('config-changed', {
          detail: { config },
          bubbles: true,
          composed: true
        }));
      });
      this.appendChild(this._form);
    }
    this._form.hass = this._hass;
    this._form.schema = YTVC_SCHEMA;
    this._form.data = this._config;
  }
}

customElements.define('youtube-video-card-editor', YouTubeVideoCardEditor);

/* ---------- Card picker registration (with preview) ---------- */

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'youtube-video-card',
  name: 'YouTube Video Card',
  description: 'Embed and play a YouTube video or playlist on your dashboard.',
  preview: true,
  documentationURL: 'https://github.com/loryanstrant/ha-youtubevideocard'
});

console.log('YouTube Video Card v2.0.0 loaded');

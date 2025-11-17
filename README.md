# YouTube Video Card for Home Assistant

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub release](https://img.shields.io/github/release/loryanstrant/ha-youtubevideocard.svg)](https://github.com/loryanstrant/ha-youtubevideocard/releases)
[![License](https://img.shields.io/github/license/loryanstrant/ha-youtubevideocard.svg)](LICENSE)

A custom Home Assistant card that allows you to play YouTube videos and playlists directly in your dashboard using the YouTube IFrame API.

## Features

- ✨ Play individual YouTube videos
- 📋 Play YouTube playlists
- 🎛️ Full support for YouTube player parameters
- 🎨 Seamless integration with Home Assistant design
- ⚙️ Visual configuration editor
- 📱 Responsive design
- 🔧 HACS compatible

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Click on "Frontend" in the HACS panel
3. Click the "+" button in the bottom right corner
4. Search for "YouTube Video Card"
5. Click "Install"
6. Restart Home Assistant

### Manual Installation

1. Download `youtube-video-card.js` from the [latest release](https://github.com/loryanstrant/ha-youtubevideocard/releases)
2. Copy the file to your `config/www` folder
3. Add the resource to your dashboard:
   - Go to Settings → Dashboards → Resources
   - Click "Add Resource"
   - URL: `/local/youtube-video-card.js`
   - Resource Type: `JavaScript Module`
4. Restart Home Assistant

## Configuration

### Visual Editor

The easiest way to configure the card is through the visual editor:

1. Add a new card to your dashboard
2. Search for "YouTube Video Card"
3. Configure using the visual editor

### YAML Configuration

```yaml
type: custom:youtube-video-card
title: My YouTube Video
video_id: dQw4w9WgXcQ
autoplay: 0
controls: 1
height: 315
```

### Configuration Options

#### Basic Settings

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `type` | string | **Required** | Must be `custom:youtube-video-card` |
| `title` | string | `YouTube Video` | Card title |
| `video_id` | string | | YouTube video ID (e.g., `dQw4w9WgXcQ` from `https://www.youtube.com/watch?v=dQw4w9WgXcQ`) |
| `playlist_id` | string | | YouTube playlist ID (e.g., `PLhXT4p7YVEn13Qn8AzzJ67PaIsKoodGlH` from `https://www.youtube.com/playlist?list=PLhXT4p7YVEn13Qn8AzzJ67PaIsKoodGlH`) |
| `api_key` | string | | YouTube Data API key (optional, for future features) |

**Note:** Either `video_id` or `playlist_id` is required.

#### Display Settings

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `height` | number | `315` | Player height in pixels |
| `width` | string | `100%` | Player width (use `100%` for responsive) |

#### Player Parameters

All [YouTube player parameters](https://developers.google.com/youtube/player_parameters) are supported:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `autoplay` | number | `0` | Auto-play video on load (0 or 1) |
| `controls` | number | `1` | Show player controls (0 or 1) |
| `loop` | number | `0` | Loop the video (0 or 1) |
| `mute` | number | `0` | Mute the video (0 or 1) |
| `modestbranding` | number | `0` | Use modest YouTube branding (0 or 1) |
| `rel` | number | `0` | Show related videos at end (0 or 1) |
| `fs` | number | `1` | Show fullscreen button (0 or 1) |
| `cc_load_policy` | number | `0` | Show closed captions by default (0 or 1) |
| `iv_load_policy` | number | `1` | Show video annotations (1 or 3) |
| `color` | string | `red` | Progress bar color (`red` or `white`) |
| `start` | number | `0` | Start time in seconds |
| `end` | number | `0` | End time in seconds |

## Examples

### Single Video

```yaml
type: custom:youtube-video-card
title: Rick Astley - Never Gonna Give You Up
video_id: dQw4w9WgXcQ
autoplay: 0
controls: 1
height: 315
```

### Playlist

```yaml
type: custom:youtube-video-card
title: My Favorite Playlist
playlist_id: PLhXT4p7YVEn13Qn8AzzJ67PaIsKoodGlH
autoplay: 0
controls: 1
height: 400
```

### Auto-Playing Muted Video

```yaml
type: custom:youtube-video-card
title: Background Video
video_id: dQw4w9WgXcQ
autoplay: 1
mute: 1
controls: 0
loop: 1
height: 250
```

### Video with Start and End Times

```yaml
type: custom:youtube-video-card
title: Video Clip
video_id: dQw4w9WgXcQ
start: 30
end: 60
controls: 1
height: 315
```

## Troubleshooting

### Video Not Loading

1. **Check Video ID**: Ensure the video ID is correct. You can find it in the YouTube URL after `v=`
2. **Embedding Restrictions**: Some videos cannot be embedded due to copyright or privacy settings
3. **Network Issues**: Check your Home Assistant instance can access YouTube

### Player Not Appearing

1. **Clear Browser Cache**: Clear your browser cache and reload the page
2. **Check Resources**: Ensure the card is properly added as a resource in your dashboard settings
3. **Console Errors**: Open browser developer tools and check for JavaScript errors

### Card Not in Picker

1. **Restart Required**: Restart Home Assistant after installation
2. **Resource Type**: Ensure the resource type is set to "JavaScript Module"
3. **Path Correct**: Verify the resource path is correct

## Development

This card is built using:
- YouTube IFrame API
- Web Components / Custom Elements
- Home Assistant Custom Card API

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter issues:
1. Check the [Issues](https://github.com/loryanstrant/ha-youtubevideocard/issues) page
2. Create a new issue with:
   - Home Assistant version
   - Browser and version
   - Card configuration
   - Console errors (if any)

## License

MIT License - see [LICENSE](LICENSE) file for details

## Credits

Created by Loryan Strant

## Changelog

### 1.0.0
- Initial release
- Support for single videos and playlists
- Full YouTube player parameter support
- Visual configuration editor
- HACS compatible

# YouTube Video Card for Home Assistant

A custom card for Home Assistant that allows you to embed and play YouTube videos and playlists directly in your dashboard.

This was created because the regular way of embedding a video stopped working in early November 2025.

<img width="749" height="299" alt="image" src="https://github.com/user-attachments/assets/bbb90ae1-350e-422d-be91-e7efc71d4d25" />



## Installation

### HACS (Recommended)

1. Open HACS in Home Assistant
2. Go to "Frontend"
3. Click "+ Explore & Download Repositories"
4. Search for "YouTube Video Card"
5. Click "Download"
6. Restart Home Assistant

### Manual

1. Download `youtube-video-card.js` from the latest release
2. Copy to `config/www/` directory
3. Add resource in Configuration → Lovelace Dashboards → Resources:
   - URL: `/local/youtube-video-card.js`
   - Type: JavaScript Module

## Usage

**Note:** This card must be added via YAML editor, not the UI card picker.

### Basic Configuration

```yaml
type: custom:youtube-video-card
video_id: dQw4w9WgXcQ
```

### Playlist Configuration

```yaml
type: custom:youtube-video-card
playlist_id: PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf
```

## Configuration Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `type` | string | **required** | `custom:youtube-video-card` |
| `video_id` | string | - | YouTube video ID |
| `playlist_id` | string | - | YouTube playlist ID |
| `title` | string | - | Optional card title |
| `autoplay` | boolean | `false` | Start playing automatically |
| `controls` | boolean | `true` | Show player controls |
| `loop` | boolean | `false` | Loop the video |
| `mute` | boolean | `false` | Mute audio |
| `start_time` | number | `0` | Start time in seconds |
| `end_time` | number | `0` | End time in seconds (0 = play to end) |
| `aspect_ratio` | string | `16:9` | Aspect ratio: `16:9`, `4:3`, `1:1`, or `21:9` |
| `modestbranding` | boolean | `false` | Minimize YouTube branding |
| `rel` | boolean | `false` | Show related videos |
| `showinfo` | boolean | `true` | Show video information |
| `fs` | boolean | `true` | Allow fullscreen |
| `cc_load_policy` | number | `0` | Closed captions: `0` (off) or `1` (on) |
| `iv_load_policy` | number | `1` | Annotations: `1` (show) or `3` (hide) |
| `color` | string | `red` | Progress bar color: `red` or `white` |

## Examples

### Simple Video

```yaml
type: custom:youtube-video-card
video_id: dQw4w9WgXcQ
title: Rick Roll
controls: true
```

### Autoplay with Custom Aspect Ratio

```yaml
type: custom:youtube-video-card
video_id: M7lc1UVf-VE
autoplay: true
mute: true
aspect_ratio: 21:9
```

### Playlist

```yaml
type: custom:youtube-video-card
playlist_id: PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf
title: My Favorite Videos
loop: true
```

### Time-Limited Playback

```yaml
type: custom:youtube-video-card
video_id: dQw4w9WgXcQ
start_time: 30
end_time: 90
loop: true
```

## Finding YouTube IDs

### Video ID
From the URL `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- The video ID is: `dQw4w9WgXcQ`

### Playlist ID
From the URL `https://www.youtube.com/playlist?list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf`
- The playlist ID is: `PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf`

## Troubleshooting

### Card doesn't appear in UI picker
This is expected behavior. The card must be added via the YAML editor due to Home Assistant's scoped custom element registry architecture.

### Video doesn't load
- Verify the video/playlist ID is correct
- Check that the video is not age-restricted or private
- Ensure you have an internet connection

### Video shows "not allowed to be played in embedded players"
Some videos have embedding disabled by their uploaders. Try a different video.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Development Approach
<img width="256" height="256" alt="Vibe Coding with GitHub Copilot 256x256" src="https://github.com/user-attachments/assets/bb41d075-6b3e-4f2b-a88e-94b2022b5d4f" />

## License

MIT License - see [LICENSE](LICENSE) file

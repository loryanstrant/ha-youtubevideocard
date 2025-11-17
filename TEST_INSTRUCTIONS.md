## YouTube Video Card Test Dashboard

This is a test dashboard configuration for the YouTube Video Card.

### Step 1: Add the Resource

1. Go to Settings → Dashboards → Resources (three dots menu in top right)
2. Click "Add Resource"
3. Add the following:
   - URL: `/local/youtube-video-card.js`
   - Resource Type: `JavaScript Module`
4. Click "Create"

### Step 2: Create a New Dashboard or Edit Existing

### Test Configuration 1: Playlist (Your Test Playlist)

```yaml
type: custom:youtube-video-card
title: Test Playlist
playlist_id: PLhXT4p7YVEn13Qn8AzzJ67PaIsKoodGlH
autoplay: 0
controls: 1
height: 400
```

### Test Configuration 2: Single Video

```yaml
type: custom:youtube-video-card
title: Rick Astley - Never Gonna Give You Up
video_id: dQw4w9WgXcQ
autoplay: 0
controls: 1
height: 315
```

### Test Configuration 3: Auto-Playing Muted Video

```yaml
type: custom:youtube-video-card
title: Background Video
video_id: dQw4w9WgXcQ
autoplay: 1
mute: 1
controls: 1
loop: 1
height: 250
```

### Test Configuration 4: Video with Custom Parameters

```yaml
type: custom:youtube-video-card
title: Custom Parameters Test
video_id: dQw4w9WgXcQ
autoplay: 0
controls: 1
height: 315
modestbranding: 1
rel: 0
fs: 1
color: white
```

### Using the Visual Editor

1. Click "Add Card" in your dashboard
2. Search for "YouTube Video Card"
3. Click on it to add
4. Configure using the visual editor interface
5. Add either a Video ID or Playlist ID
6. Adjust other settings as needed
7. Click "Save"

## Accessing Your Home Assistant Instance

Your Home Assistant instance is available at: http://localhost:8123

The card file has been installed to: `/home/loryans/Development/HomeAssistant/config/www/youtube-video-card.js`

The Home Assistant container has been restarted and should be ready to use.

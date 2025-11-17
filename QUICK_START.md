# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Add the Resource
1. Open Home Assistant: http://localhost:8123
2. Go to **Settings** → **Dashboards** → **Three dots (⋮)** → **Resources**
3. Click **"Add Resource"**
4. Enter:
   - URL: `/local/youtube-video-card.js`
   - Resource Type: **JavaScript Module**
5. Click **"Create"**

### Step 2: Add a Card
1. Go to your dashboard
2. Click **"Edit Dashboard"** (pencil icon)
3. Click **"Add Card"**
4. Search for **"YouTube Video Card"**
5. Click on it

### Step 3: Configure
#### For Your Test Playlist:
- **Playlist ID**: `PLhXT4p7YVEn13Qn8AzzJ67PaIsKoodGlH`
- Leave other settings as default
- Click **"Save"**

#### For a Single Video:
- **Video ID**: `dQw4w9WgXcQ` (or any YouTube video ID)
- Leave other settings as default
- Click **"Save"**

---

## 💡 Where to Find IDs

### Video ID
From URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
→ Video ID is: `dQw4w9WgXcQ`

### Playlist ID
From URL: `https://www.youtube.com/playlist?list=PLhXT4p7YVEn13Qn8AzzJ67PaIsKoodGlH`
→ Playlist ID is: `PLhXT4p7YVEn13Qn8AzzJ67PaIsKoodGlH`

---

## 🎛️ Common Settings

| Setting | Values | What it does |
|---------|--------|--------------|
| Autoplay | 0 or 1 | Start playing automatically |
| Controls | 0 or 1 | Show/hide player controls |
| Loop | 0 or 1 | Repeat the video |
| Mute | 0 or 1 | Start muted |
| Height | Number (px) | Player height (default: 315) |

---

## 📝 Example Configurations

### Background Video (auto-play, muted)
```yaml
type: custom:youtube-video-card
video_id: dQw4w9WgXcQ
autoplay: 1
mute: 1
controls: 0
loop: 1
```

### Playlist
```yaml
type: custom:youtube-video-card
title: My Playlist
playlist_id: PLhXT4p7YVEn13Qn8AzzJ67PaIsKoodGlH
height: 400
```

### Video Clip (start at 30s, end at 60s)
```yaml
type: custom:youtube-video-card
video_id: dQw4w9WgXcQ
start: 30
end: 60
```

---

## ❓ Troubleshooting

**Card not showing up?**
- Refresh your browser (Ctrl+F5)
- Clear cache
- Restart Home Assistant

**Video won't play?**
- Check the video/playlist ID is correct
- Some videos can't be embedded (copyright restrictions)
- Check browser console for errors (F12)

**Can't find card in picker?**
- Make sure you added the resource
- Restart Home Assistant after adding resource
- Check the resource URL is correct

---

## 📚 More Information

- Full documentation: See README.md
- Test instructions: See TEST_INSTRUCTIONS.md
- Project details: See PROJECT_SUMMARY.md
- GitHub: https://github.com/loryanstrant/ha-youtubevideocard

---

**Happy streaming! 🎥**

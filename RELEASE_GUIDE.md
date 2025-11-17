# Creating Your First GitHub Release

Follow these steps to create the first official release of the YouTube Video Card.

## Prerequisites

✅ Already completed:
- Code is committed and pushed to GitHub
- v1.0.0 tag has been created locally
- v1.0.0 tag has been pushed to GitHub
- GitHub Actions workflows are configured

## Step-by-Step Release Process

### 1. Verify the Tag is on GitHub

```bash
cd /home/loryans/Development/HomeAssistant/ha-youtubevideocard
git tag -l
# Should show: v1.0.0

git push origin v1.0.0  # Already done, but verify
```

### 2. Create Release on GitHub

#### Via GitHub Web Interface:

1. Go to: https://github.com/loryanstrant/ha-youtubevideocard
2. Click on **"Releases"** (right sidebar)
3. Click **"Create a new release"** or **"Draft a new release"**
4. In **"Choose a tag"**: Select `v1.0.0`
5. **Release title**: `v1.0.0 - Initial Release`
6. **Description**: Copy the following:

```markdown
# YouTube Video Card v1.0.0

First official release of the YouTube Video Card for Home Assistant!

## Features

✨ **Core Functionality**
- Play individual YouTube videos
- Play YouTube playlists
- Full YouTube IFrame API integration

🎛️ **Player Controls**
- All YouTube player parameters supported
- Autoplay, loop, mute options
- Start/end time configuration
- Progress bar color customization
- Controls visibility toggle

🎨 **Home Assistant Integration**
- Visual configuration editor
- Seamless HA design integration
- Responsive layout
- Works in masonry and sections views
- Proper card registration

📦 **Installation**
- HACS compatible
- Manual installation supported
- Comprehensive documentation

## Installation

### Via HACS (Custom Repository)

1. Open HACS → Frontend
2. Click three dots → Custom repositories
3. Add: `https://github.com/loryanstrant/ha-youtubevideocard`
4. Category: Plugin
5. Click "Install"

### Manual Installation

1. Download `youtube-video-card.js` below
2. Copy to `<config>/www/youtube-video-card.js`
3. Add resource in Dashboard → Resources:
   - URL: `/local/youtube-video-card.js`
   - Type: JavaScript Module

## Quick Start

```yaml
type: custom:youtube-video-card
title: My Video
video_id: dQw4w9WgXcQ
autoplay: 0
controls: 1
height: 315
```

For playlists:
```yaml
type: custom:youtube-video-card
title: My Playlist
playlist_id: PLhXT4p7YVEn13Qn8AzzJ67PaIsKoodGlH
height: 400
```

## Documentation

- [Full README](https://github.com/loryanstrant/ha-youtubevideocard/blob/main/README.md)
- [Quick Start Guide](https://github.com/loryanstrant/ha-youtubevideocard/blob/main/QUICK_START.md)
- [Contributing Guidelines](https://github.com/loryanstrant/ha-youtubevideocard/blob/main/CONTRIBUTING.md)

## What's Next

- Submit to HACS default repository
- Add video tutorials
- Community feedback and improvements

## Support

If you encounter issues, please [open an issue](https://github.com/loryanstrant/ha-youtubevideocard/issues).

Enjoy! 🎥
```

7. **Attach files** (optional): The release workflow will automatically attach `youtube-video-card.js`
8. Check **"Set as the latest release"**
9. Click **"Publish release"**

### 3. Verify Release Workflow

After publishing:
1. Go to **Actions** tab
2. You should see "Release" workflow running
3. It will:
   - Update package.json version
   - Verify dist files exist
   - Upload youtube-video-card.js as release asset

### 4. Add Repository Topics

1. Go to repository main page
2. Click on the gear icon ⚙️ next to "About"
3. Add topics:
   - `homeassistant`
   - `hacs`
   - `custom-card`
   - `youtube`
   - `lovelace`
   - `dashboard`
   - `video-player`
4. Update description: "A Home Assistant custom card for playing YouTube videos and playlists"
5. Add website (optional): `https://github.com/loryanstrant/ha-youtubevideocard`
6. Click **"Save changes"**

## Alternative: Create Release from Command Line

Using GitHub CLI (if installed):

```bash
cd /home/loryans/Development/HomeAssistant/ha-youtubevideocard

gh release create v1.0.0 \
  --title "v1.0.0 - Initial Release" \
  --notes "First official release of the YouTube Video Card for Home Assistant. See README for full details." \
  dist/youtube-video-card.js
```

## After Release

### Verify Installation in HACS

1. Open HACS in your Home Assistant
2. Go to Frontend
3. Click three dots → Custom repositories
4. Add repository: `https://github.com/loryanstrant/ha-youtubevideocard`
5. Category: Plugin
6. Click "Add"
7. Find "YouTube Video Card" in the list
8. Click "Download"
9. Verify it installs correctly

### Test the Card

1. Add the resource (if not auto-added)
2. Create a test dashboard
3. Add the card using visual editor
4. Test with:
   - A single video
   - A playlist
   - Different player parameters

### Update Documentation

If needed, update:
- README.md with any corrections
- Add screenshots
- Add video tutorial link
- Update examples

## Troubleshooting

### Tag doesn't appear in release dropdown
```bash
git push origin v1.0.0
```

### Release workflow fails
- Check Actions tab for error details
- Ensure dist/youtube-video-card.js exists
- Check workflow permissions in repository settings

### HACS validation fails
- Check workflow logs
- Ensure hacs.json is valid
- Verify file structure matches HACS requirements

## Future Releases

For future releases:

1. Update version in code
2. Update CHANGELOG in README
3. Commit changes
4. Create new tag:
   ```bash
   git tag -a v1.1.0 -m "Version 1.1.0"
   git push origin v1.1.0
   ```
5. Create GitHub release following steps above

## Semantic Versioning

Follow semver (MAJOR.MINOR.PATCH):
- **MAJOR** (2.0.0): Breaking changes
- **MINOR** (1.1.0): New features, backward compatible
- **PATCH** (1.0.1): Bug fixes, backward compatible

## Release Checklist

Before creating a release:
- [ ] All changes committed and pushed
- [ ] Tests passing locally
- [ ] Documentation updated
- [ ] CHANGELOG updated
- [ ] Version numbers updated
- [ ] Git tag created
- [ ] Workflows passing on GitHub

---

**Ready to create your first release!** 🚀

Go to: https://github.com/loryanstrant/ha-youtubevideocard/releases/new

# Contributing to YouTube Video Card

Thank you for your interest in contributing to the YouTube Video Card for Home Assistant!

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/ha-youtubevideocard.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`

## Development Setup

### Prerequisites
- Home Assistant development instance
- Basic knowledge of JavaScript and Web Components
- Understanding of Home Assistant custom cards

### Local Development

1. Copy the card to your Home Assistant `www` folder:
   ```bash
   cp dist/youtube-video-card.js /path/to/homeassistant/config/www/
   ```

2. Add as a resource in Home Assistant:
   - Go to Settings → Dashboards → Resources
   - Add: `/local/youtube-video-card.js` (JavaScript Module)

3. Make changes to the card
4. Reload the resource in Home Assistant to see changes

## Code Standards

### JavaScript Style
- Use modern ES6+ JavaScript
- Follow Web Components best practices
- Maintain shadow DOM encapsulation
- Use meaningful variable and function names
- Add comments for complex logic

### Home Assistant Compliance
- Follow [Home Assistant custom card guidelines](https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card)
- Implement required methods:
  - `setConfig(config)` - Configuration validation
  - `set hass(hass)` - State updates
  - `getCardSize()` - Card size for masonry view
  - `getGridOptions()` - Grid options for sections view
  - `getConfigElement()` - Visual editor element
  - `getStubConfig()` - Default configuration

### Code Structure
```javascript
class YouTubeVideoCard extends HTMLElement {
  // 1. Constructor and initialization
  // 2. Home Assistant lifecycle methods
  // 3. YouTube API integration
  // 4. Rendering and UI
  // 5. Event handlers
  // 6. Utility methods
}
```

## Testing

### Manual Testing Checklist
- [ ] Card displays correctly in masonry view
- [ ] Card displays correctly in sections view
- [ ] Visual editor loads and functions properly
- [ ] Video playback works (single video)
- [ ] Playlist playback works
- [ ] All player parameters function correctly
- [ ] Error handling displays user-friendly messages
- [ ] Responsive design works on mobile
- [ ] Card picker registration works
- [ ] Configuration persists after reload

### Test with Different Configurations
- Single video with default settings
- Playlist with custom parameters
- Auto-play muted video
- Video with start/end times
- All player parameter combinations

## Submitting Changes

### Before Submitting
1. Test your changes thoroughly
2. Update documentation if needed
3. Follow the code style guidelines
4. Ensure HACS validation passes

### Pull Request Process
1. Update the README.md with details of changes if applicable
2. Update the CHANGELOG section in README.md
3. Commit with clear, descriptive messages:
   ```
   feat: Add new feature
   fix: Fix bug description
   docs: Update documentation
   style: Code style changes
   refactor: Code refactoring
   test: Add or update tests
   ```
4. Push to your fork
5. Submit a pull request with:
   - Clear description of changes
   - Why the changes are needed
   - Any breaking changes
   - Screenshots (if UI changes)

### Pull Request Guidelines
- One feature/fix per PR
- Keep PRs focused and small
- Reference related issues
- Update documentation
- Be responsive to feedback

## Reporting Bugs

### Before Reporting
1. Check if the issue already exists
2. Test with the latest version
3. Verify it's not a configuration issue

### Bug Report Should Include
- Home Assistant version
- Browser and version
- Card version
- Full card configuration (sanitized)
- Steps to reproduce
- Expected behavior
- Actual behavior
- Console errors (F12 developer tools)
- Screenshots if applicable

### Bug Report Template
```markdown
**Environment:**
- Home Assistant version: 
- Browser: 
- Card version: 

**Configuration:**
```yaml
type: custom:youtube-video-card
# your config here
```

**Steps to Reproduce:**
1. 
2. 
3. 

**Expected Behavior:**

**Actual Behavior:**

**Console Errors:**
```
Paste errors here
```

**Screenshots:**
```

## Feature Requests

We welcome feature requests! Please:
1. Check if the feature already exists or is planned
2. Clearly describe the feature and use case
3. Explain why it would be useful
4. Provide examples if possible

## Code Review Process

- Maintainers will review PRs as time permits
- Feedback may be provided for improvements
- Changes may be requested before merging
- Once approved, PRs will be merged by maintainers

## Community Guidelines

- Be respectful and constructive
- Help others when possible
- Follow the [Code of Conduct](CODE_OF_CONDUCT.md)
- Keep discussions focused and on-topic

## Questions?

- Open an issue for questions about development
- Check existing issues and discussions
- Review the README and documentation first

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing! 🎉

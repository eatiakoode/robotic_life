# Blog Background Image Guide

## How to Change the Blog Detail Background Image

The blog detail pages now use a **single static background image** that appears on all blog detail pages.

### Current Setup
- **Image Path**: `/images/blog/blog-bg.png`
- **Location**: `frontend/public/images/blog/blog-bg.png`

### To Change the Background Image:

#### Option 1: Replace the existing file
1. Go to `frontend/public/images/blog/`
2. Replace `blog-bg.png` with your new image
3. Keep the same filename: `blog-bg.png`

#### Option 2: Use a different image
1. Add your new image to `frontend/public/images/blog/`
2. Update the path in `frontend/components/blogs/BlogDetail1.jsx`:
   ```jsx
   backgroundImage: `url(/images/blog/YOUR_NEW_IMAGE.png)`,
   ```
3. Update the path in `frontend/public/css/styles.css`:
   ```css
   .blog-detail-wrap > .image {
     background-image: url(/images/blog/YOUR_NEW_IMAGE.png);
   }
   ```

### Image Requirements
- **Format**: PNG, JPG, or WebP
- **Recommended Size**: 1920x1080 or similar aspect ratio
- **File Size**: Keep under 500KB for better performance

### Benefits of This Setup
- ✅ **Consistent branding** - Same image on all blog pages
- ✅ **Fast loading** - Static image loads immediately
- ✅ **Easy to change** - Just replace one file
- ✅ **No server dependencies** - Works offline
- ✅ **Persistent** - Image stays after server restarts

The background image will now be the same for all blog detail pages and will persist even after development server restarts!

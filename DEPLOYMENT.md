# GatorEd Deployment Guide

## Quick Deploy to Vercel

1. **Fork/Clone the Repository**
   ```bash
   git clone <your-repo-url>
   cd chat-ui-next-main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect it's a Next.js project

3. **Set Environment Variables**
   In your Vercel project settings, add:
   ```
   GROQ_API_KEY=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
   ```

4. **Deploy**
   - Vercel will automatically deploy on every push to main
   - Your GatorEd chatbot will be live at your Vercel URL

## Embedding on SFSU Website

Add this iframe to your SFSU Graduate Studies website:

```html
<iframe
  src="https://your-vercel-url.vercel.app/?token=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"
  style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;"
/>
```

## Customization Options

### URL Parameters
- `token`: Your Groq API key
- `color`: Primary color (default: SFSU green #006633)
- `popupMessage`: Custom popup message
- `windowHeading`: Chat window title
- `welcomeMessage`: Initial greeting message

### Example Custom URL
```
https://your-vercel-url.vercel.app/?token=your-api-key&color=006633&popupMessage=Ask%20GatorEd%20about%20Graduate%20Studies!
```

## Security Notes

- The API key is currently hardcoded for demo purposes
- For production, use environment variables
- Consider implementing rate limiting
- Add CORS restrictions if needed

## Monitoring

- Check Vercel analytics for usage
- Monitor Groq API usage in your Groq dashboard
- Set up alerts for API rate limits

## Support

For technical issues:
- Check Vercel deployment logs
- Monitor browser console for errors
- Verify Groq API key is valid

For SFSU Graduate Studies questions:
- Email: grad@sfsu.edu
- Phone: 415-405-3591

# GatorEd - SFSU Graduate Studies AI Assistant

🐊 **Go Gators!** Welcome to GatorEd, your friendly AI campus assistant for San Francisco State University Graduate Studies.

## About GatorEd

GatorEd is an AI-powered chatbot designed to help SFSU graduate students find quick answers to common questions about graduate programs, admissions, requirements, and campus resources. Built with a cheerful Gator personality, GatorEd provides instant, accurate, and 24/7 assistance based on official SFSU Graduate Studies information.

## Features

- **🎓 Graduate Studies Expert**: Specialized knowledge of SFSU Graduate Studies programs and requirements
- **🐊 Gator Personality**: Friendly, enthusiastic, and proud of SFSU with spirited Gator-themed responses
- **⚡ Instant Answers**: Quick responses to common graduate student questions
- **📱 Mobile-Friendly**: Works seamlessly on desktop and mobile devices
- **🎨 SFSU Branding**: Uses official SFSU green colors and Gator mascot

## Common Questions GatorEd Can Answer

- "How many units do I need to be a full-time student?"
- "What courses do I take in my first semester of MS Business Analytics?"
- "Where do I submit my transcripts?"
- "Who do I contact for MS Clinical Psychology?"
- "What is tuition for my program?"
- "How do I find on-campus jobs?"
- "How do I start my application?"
- "Where is the Graduate Studies office?"
- "Where to apply for a Student ID Card?"
- "Where to apply for housing?"

## Technology Stack

- **Frontend**: Next.js 13 with TypeScript and Tailwind CSS
- **AI API**: Groq API with Llama 4 Scout model
- **Styling**: CSS Modules with SFSU brand colors
- **Deployment**: Ready for Vercel or similar platforms

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Groq API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd chat-ui-next-main
```

2. Install dependencies:
```bash
npm install
```

3. Configure your Groq API key in `app/configuration.ts`:
```typescript
export const defaultGroqConfiguration: GroqConfiguration = {
  apiKey: "your-groq-api-key-here",
  model: "meta-llama/llama-4-scout-17b-16e-instruct",
  baseUrl: "https://api.groq.com/openai/v1",
}
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

The chatbot can be customized through URL parameters:

- `token`: Your Groq API key
- `color`: Primary color (default: SFSU green #006633)
- `popupMessage`: Custom popup message
- `windowHeading`: Chat window title
- `welcomeMessage`: Initial greeting message
- `bottomIndent`: Distance from bottom (default: 24px)
- `rightIndent`: Distance from right (default: 24px)

Example URL with custom parameters:
```
http://localhost:3000?token=your-api-key&color=006633&popupMessage=Ask%20GatorEd!
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your Groq API key as an environment variable
4. Deploy!

### Environment Variables

Set the following environment variables in your deployment platform:

```
GROQ_API_KEY=your-groq-api-key-here
```

## Customization

### Updating the System Prompt

Edit `app/_lib/gator-prompt.ts` to modify GatorEd's personality, knowledge base, or response style.

### Changing Colors and Branding

Update the configuration in `app/configuration.ts` to match your institution's branding.

### Adding New Features

The modular architecture makes it easy to add new features:
- New message types in `app/_interfaces/index.ts`
- Additional API endpoints in `app/_lib/groq-api.ts`
- Custom UI components in `app/_components/`

## Support

For questions about SFSU Graduate Studies, contact:
- **Email**: grad@sfsu.edu
- **Phone**: 415-405-3591
- **Website**: https://grad.sfsu.edu/

## License

This project is licensed under the MIT License.

---

🐊 **Go Gators!** GatorEd is here to help you succeed in your graduate studies journey at SFSU!

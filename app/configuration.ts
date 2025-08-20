import { AskguruConfiguration, Configuration } from "@/app/_interfaces"
import { GroqConfiguration } from "@/app/_lib/groq-api"

export const defaultConfiguration: Configuration = {
  token: "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", // Groq API key
  color: "442C8B", // SFSU Core Purple color
  popupIcon: "/images/popup/gator.svg", // We'll need to create this
  popupMessage: "Ask <b>GatorEd</b> about SFSU Graduate Studies!",
  addUnreadDot: true,
  whitelabel: false,
  lang: "en-US",
  windowHeading: "Chat with GatorEd - SFSU Graduate Studies Assistant",
  welcomeMessage: "🐊 Go Gators! Hi there! I'm GatorEd, your friendly SFSU Graduate Studies assistant powered by natural language processing algorithms. I can help you with academic dates, admissions, advising, transcripts, and more! Need help? Just ask!",
  bottomIndent: 24,
  rightIndent: 24,
}

export const defaultAskguruConfiguration: AskguruConfiguration = {
  token: "",
  apiUrl: "https://api.askguru.ai/",
  apiVersion: "v2",
  streamGetAnswer: true,
  sourcePattern: "{ *doc_idx *: *([^}]*)}",
}

export const defaultGroqConfiguration: GroqConfiguration = {
  apiKey: "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",
  model: "meta-llama/llama-4-scout-17b-16e-instruct",
  baseUrl: "https://api.groq.com/openai/v1",
}

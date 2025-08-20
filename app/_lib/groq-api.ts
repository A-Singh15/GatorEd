import { MessageType } from "@/app/_interfaces"
import { SFSUWebScraper, SearchResult } from "./sfsu-scraper"

export interface GroqConfiguration {
  apiKey: string
  model: string
  baseUrl: string
}

export interface GroqMessage {
  role: "system" | "user" | "assistant"
  content: string
}

export interface GroqResponse {
  id: string
  object: string
  created: number
  model: string
  choices: Array<{
    index: number
    message: {
      role: string
      content: string
    }
    finish_reason: string
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export default class GroqApi {
  private _config: GroqConfiguration
  private _scraper: SFSUWebScraper

  constructor({ groqConfiguration }: { groqConfiguration: GroqConfiguration }) {
    this._config = groqConfiguration
    this._scraper = new SFSUWebScraper()
  }

  public async getAnswer({ 
    chat, 
    systemPrompt 
  }: { 
    chat: MessageType[]
    systemPrompt: string 
  }): Promise<{ content: string; requestId: string }> {
    try {
      // Get the user's latest question
      const userMessage = chat[chat.length - 1]
      const userQuestion = userMessage.content

      // Search SFSU websites for relevant information
      const searchResults = await this._scraper.searchSFSUWebsites(userQuestion)
      
      // Create enhanced system prompt with real-time data
      const enhancedPrompt = this.createEnhancedPrompt(systemPrompt, searchResults, userQuestion)

      const messages: GroqMessage[] = [
        { role: "system", content: enhancedPrompt },
        ...chat.map(msg => ({
          role: msg.role as "user" | "assistant",
          content: msg.content
        }))
      ]

      const response = await fetch(`${this._config.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this._config.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: this._config.model,
          messages: messages,
          temperature: 0.7,
          max_tokens: 1000,
          stream: false
        })
      })

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.status} ${response.statusText}`)
      }

      const data: GroqResponse = await response.json()
      
      return {
        content: data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.",
        requestId: data.id
      }
    } catch (error) {
      console.error("Groq API error:", error)
      throw error
    }
  }

  private createEnhancedPrompt(basePrompt: string, searchResults: SearchResult, userQuestion: string): string {
    let enhancedPrompt = basePrompt + "\n\n"

    if (searchResults.results.length > 0) {
      enhancedPrompt += "REAL-TIME SFSU WEBSITE INFORMATION:\n"
      enhancedPrompt += `Query: "${userQuestion}"\n`
      enhancedPrompt += `Source: ${searchResults.source}\n\n`
      
      searchResults.results.forEach((result, index) => {
        enhancedPrompt += `[Source ${index + 1}]: ${result.title}\n`
        enhancedPrompt += `URL: ${result.url}\n`
        enhancedPrompt += `Content: ${result.content}\n\n`
      })

      enhancedPrompt += "INSTRUCTIONS: Use the above real-time information from SFSU websites to provide accurate, up-to-date answers. Always cite the source URLs when providing information. If the information is not found in the search results, still maintain your helpful Gator personality and direct users to the appropriate SFSU office.\n\n"
    } else {
      enhancedPrompt += "No specific information found in SFSU websites for this query. Provide general guidance based on your knowledge of SFSU Graduate Studies and direct users to the appropriate offices for specific information.\n\n"
    }

    return enhancedPrompt
  }

  public async logEvent({ eventType, eventContext }: { eventType: string; eventContext?: { [key: string]: any } }) {
    // For now, just log to console. In a real implementation, you might want to send analytics
    console.log("Event logged:", { eventType, eventContext })
  }

  public async setReaction({ requestId, likeStatus }: { requestId: string; likeStatus: "good_answer" | "wrong_answer" }) {
    // For now, just log to console. In a real implementation, you might want to send feedback
    console.log("Reaction set:", { requestId, likeStatus })
  }

  // Additional methods for specific SFSU data
  public async getContactInfo() {
    return await this._scraper.getContactInfo()
  }

  public async getAcademicDates() {
    return await this._scraper.getCurrentAcademicDates()
  }
}

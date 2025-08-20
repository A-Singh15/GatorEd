import { GroqConfiguration } from "./groq-api"

export interface SFSUPageData {
  url: string
  title: string
  content: string
  lastUpdated?: string
}

export interface SearchResult {
  query: string
  results: SFSUPageData[]
  source: string
}

export class SFSUWebScraper {
  private allowedDomains = [
    'academicresources.sfsu.edu',
    'grad.sfsu.edu', 
    'webapps.sfsu.edu',
    'registrar.sfsu.edu',
    'sfsu.edu'
  ]

  private baseUrls = {
    academicResources: 'https://academicresources.sfsu.edu',
    gradStudies: 'https://grad.sfsu.edu',
    webApps: 'https://webapps.sfsu.edu',
    registrar: 'https://registrar.sfsu.edu',
    sfsu: 'https://sfsu.edu'
  }

  async searchSFSUWebsites(query: string): Promise<SearchResult> {
    try {
      // Use the API route to search SFSU websites
      const response = await fetch('/api/sfsu-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query })
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      const data = await response.json()
      
      return {
        query: data.query,
        results: data.results || [],
        source: data.source || 'SFSU Official Websites'
      }
    } catch (error) {
      console.error('Error searching SFSU websites:', error)
      
      // Fallback to local data if API fails
      return this.getFallbackResults(query)
    }
  }

  private getFallbackResults(query: string): SearchResult {
    const searchTerms = this.parseQuery(query)
    const results: SFSUPageData[] = []

    // Add fallback data based on query type
    if (this.isDateQuery(query)) {
      results.push({
        url: 'https://academicresources.sfsu.edu/calendar',
        title: 'Academic Calendar',
        content: 'Current academic calendar with important dates, deadlines, and term schedules. Full-time graduate students: 8+ units per semester.',
        lastUpdated: '2024-01-15'
      })
    }

    if (this.isGradStudiesQuery(query)) {
      results.push({
        url: 'https://grad.sfsu.edu/contact',
        title: 'Graduate Studies Contact Information',
        content: 'Division of Graduate Studies: gradstudies@sfsu.edu, (415) 338-2234. Hours: 9–11 a.m. and 2–4 p.m. PT, Mon–Fri. Location: ADM 250.',
        lastUpdated: '2024-01-15'
      })
    }

    if (this.isTranscriptQuery(query)) {
      results.push({
        url: 'https://registrar.sfsu.edu/transcripts',
        title: 'Transcripts',
        content: 'Order official transcripts online. Cost: $5 per copy plus $1.50 handling fee. Processing time: 2-3 business days. Contact: (415) 338-2350.',
        lastUpdated: '2024-01-15'
      })
    }

    return {
      query,
      results,
      source: 'SFSU Official Websites (Fallback)'
    }
  }

  private parseQuery(query: string): string[] {
    // Extract key terms from the query
    const terms = query.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(term => term.length > 2)
    
    return terms
  }

  private isDateQuery(query: string): boolean {
    const dateKeywords = ['date', 'deadline', 'calendar', 'schedule', 'term', 'semester', 'academic', 'when']
    return dateKeywords.some(keyword => query.toLowerCase().includes(keyword))
  }

  private isGradStudiesQuery(query: string): boolean {
    const keywords = ['graduate', 'admission', 'advising', 'program', 'coordinator', 'specialist', 'application']
    return keywords.some(keyword => query.toLowerCase().includes(keyword))
  }

  private isTranscriptQuery(query: string): boolean {
    const transcriptKeywords = ['transcript', 'registration', 'enroll', 'course', 'grade', 'record']
    return transcriptKeywords.some(keyword => query.toLowerCase().includes(keyword))
  }

  async getContactInfo(): Promise<SFSUPageData> {
    return {
      url: 'https://grad.sfsu.edu/contact',
      title: 'Graduate Studies Contact Information',
      content: `Division of Graduate Studies
Email: gradstudies@sfsu.edu
Phone: (415) 338-2234
Hours: 9–11 a.m. and 2–4 p.m. PT, Mon–Fri
Location: ADM 250 (Administration Building, Room 250)
Campus Mail: Division of Graduate Studies, c/o San Francisco State University, 1600 Holloway Avenue, San Francisco, CA 94132

Registrar's Office
Phone: (415) 338-2350
Email: registrar@sfsu.edu`,
      lastUpdated: '2024-01-15'
    }
  }

  async getCurrentAcademicDates(): Promise<SFSUPageData[]> {
    // This would normally fetch real-time data
    const currentYear = new Date().getFullYear()
    const nextYear = currentYear + 1

    return [
      {
        url: 'https://academicresources.sfsu.edu/calendar',
        title: `Academic Calendar ${currentYear}-${nextYear}`,
        content: `Fall ${currentYear} Semester:
- First Day of Instruction: August 26, ${currentYear}
- Labor Day Holiday: September 2, ${currentYear}
- Last Day to Add Classes: September 6, ${currentYear}
- Last Day to Drop Classes: September 13, ${currentYear}
- Final Exams: December 16-22, ${currentYear}

Spring ${nextYear} Semester:
- First Day of Instruction: January 27, ${nextYear}
- Last Day to Add Classes: February 3, ${nextYear}
- Last Day to Drop Classes: February 10, ${nextYear}
- Spring Break: March 24-28, ${nextYear}
- Final Exams: May 19-25, ${nextYear}

Full-time graduate students must enroll in 8+ units per semester.`,
        lastUpdated: '2024-01-15'
      }
    ]
  }
}

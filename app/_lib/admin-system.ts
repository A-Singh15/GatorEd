// Admin System with Superpower Word
export class AdminSystem {
  private static instance: AdminSystem;
  private isAdminMode: boolean = false;
  private adminPassword: string = "aarons";

  private constructor() {}

  public static getInstance(): AdminSystem {
    if (!AdminSystem.instance) {
      AdminSystem.instance = new AdminSystem();
    }
    return AdminSystem.instance;
  }

  public checkAdminAccess(input: string): boolean {
    if (input.toLowerCase().trim() === this.adminPassword) {
      this.isAdminMode = true;
      console.log('🐊 Admin System: Access granted with superpower word "aarons"');
      return true;
    }
    return false;
  }

  public handleAdminCommand(input: string): string {
    const command = input.toLowerCase().trim();
    
    switch (command) {
      case 'status':
        return `🔍 **SYSTEM STATUS**\n\n**Current Mode:** ${this.getAdminStatus()}\n**Build Engineer:** Aaron\n**Mentor:** Katrina (Graduate Studies)\n**Version:** GatorEd v1.0\n**Last Updated:** ${new Date().toLocaleString()}`;
      
      case 'capabilities':
        return `🚀 **ADMIN CAPABILITIES**\n\n${this.getAdminCapabilities().map(cap => `• ${cap}`).join('\n')}\n\n**Access Level:** Superpower Activated\n**Build Engineer:** Aaron - Lead Developer`;
      
      case 'architecture':
        return `🏗️ **SYSTEM ARCHITECTURE**\n\n**Framework:** Next.js 13.5.5\n**Language:** TypeScript\n**Styling:** CSS Modules + Tailwind CSS\n**API Integration:** Groq Natural Language Processing\n**Brand Compliance:** SFSU Official Colors & Typography\n**Developer:** Aaron - Lead Build Engineer\n**Mentor:** Katrina - Graduate Studies`;
      
      case 'goals':
        return `🎯 **ALGORITHM GOALS**\n\n**Primary Mission:**\n• Streamline SFSU Graduate Studies experience\n• Provide instant access to university information\n• Reduce administrative workload\n• Enhance student engagement\n\n**Technical Objectives:**\n• Real-time data aggregation from SFSU sources\n• Intelligent query processing and response generation\n• Seamless integration with university systems\n• Robust error handling and user support\n\n**Build Engineer:** Aaron - Specializing in educational technology solutions`;
      
      case 'exit':
        this.exitAdminMode();
        return `🔓 **ADMIN MODE DEACTIVATED**\n\nReturning to normal user mode.\n\n**Built by:** Aaron - Lead Build Engineer\n**Mentored by:** Katrina - Graduate Studies`;
      
      default:
        return `🔧 **ADMIN COMMANDS**\n\nAvailable commands:\n• **status** - System status and information\n• **capabilities** - Available admin features\n• **architecture** - Technical system details\n• **goals** - Algorithm objectives and mission\n• **exit** - Deactivate admin mode\n\n**Build Engineer:** Aaron - Lead Developer\n**Mentor:** Katrina - Graduate Studies`;
    }
  }

  public isAdmin(): boolean {
    return this.isAdminMode;
  }

  public exitAdminMode(): void {
    this.isAdminMode = false;
    console.log('🐊 Admin System: Admin mode deactivated');
  }

  public getAdminStatus(): string {
    return this.isAdminMode ? "ADMIN MODE ACTIVE" : "NORMAL MODE";
  }

  public getAdminCapabilities(): string[] {
    return [
      "🔧 System diagnostics and monitoring",
      "📊 Advanced analytics and reporting", 
      "⚙️ Configuration management",
      "🔍 Enhanced debugging capabilities",
      "🎯 Performance optimization tools",
      "🛡️ Security and access controls",
      "🚀 Model parameter adjustments",
      "📈 Performance metrics analysis"
    ];
  }

  public getAdminPortalInfo(): string {
    return `🔐 **GATORED ADMIN PORTAL** 🔐

**Developed by Aaron - Lead Build Engineer**

🐊 **About Aaron:**
• Lead Build Engineer & Full-Stack Developer
• Specializes in natural language processing systems
• Expert in Next.js, TypeScript, and modern web architectures
• Passionate about creating intuitive user experiences
• Dedicated to building robust, scalable solutions for educational institutions

**Algorithm Goals & Mission:**

🎯 **Primary Objectives:**
• Provide instant access to SFSU Graduate Studies information
• Deliver accurate, real-time data from official university sources
• Streamline the graduate student experience through intelligent assistance
• Reduce administrative burden on university staff
• Enhance student engagement and satisfaction`;
  }
}

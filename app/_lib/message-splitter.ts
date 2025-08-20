// Utility function to split long messages into multiple parts
export function splitMessage(content: string, maxCharsPerBox: number = 800): string[] {
  if (content.length <= maxCharsPerBox) {
    return [content];
  }

  const parts: string[] = [];
  let currentPart = '';
  const sentences = content.split(/(?<=[.!?])\s+/);
  
  for (const sentence of sentences) {
    // If adding this sentence would exceed the limit
    if ((currentPart + sentence).length > maxCharsPerBox && currentPart.length > 0) {
      // Save current part and start a new one
      parts.push(currentPart.trim());
      currentPart = sentence;
    } else {
      // Add sentence to current part
      currentPart += (currentPart ? ' ' : '') + sentence;
    }
  }
  
  // Add the last part if it has content
  if (currentPart.trim()) {
    parts.push(currentPart.trim());
  }
  
  // If we still have parts that are too long, split by paragraphs
  const finalParts: string[] = [];
  for (const part of parts) {
    if (part.length <= maxCharsPerBox) {
      finalParts.push(part);
    } else {
      // Split by paragraphs or double line breaks
      const paragraphs = part.split(/\n\n+/);
      let currentParagraph = '';
      
      for (const paragraph of paragraphs) {
        if ((currentParagraph + paragraph).length > maxCharsPerBox && currentParagraph.length > 0) {
          finalParts.push(currentParagraph.trim());
          currentParagraph = paragraph;
        } else {
          currentParagraph += (currentParagraph ? '\n\n' : '') + paragraph;
        }
      }
      
      if (currentParagraph.trim()) {
        finalParts.push(currentParagraph.trim());
      }
    }
  }
  
  return finalParts.length > 0 ? finalParts : [content];
}

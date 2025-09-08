export function useMarkdown() {
  const parseMarkdown = (text: string): string => {
    return text
      // ? Handle bold text: **text** -> <span class="font-bold">text</span>
      .replace(/\*\*(.*?)\*\*/g, '<span class="font-bold">$1</span>')

      // ? Handle italic text: *text* -> <span class="italic">text</span>
      .replace(/\*(.*?)\*/g, '<span class="italic">$1</span>')

      // ? Handle links: [text](url) -> <a href="url" class="text-primary underline italic">text</a>
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline italic">$1</a>')

      // ? Handle line breaks: \n -> <br>
      .replace(/\n/g, '<br>')
  }

  return {
    parseMarkdown,
  }
}

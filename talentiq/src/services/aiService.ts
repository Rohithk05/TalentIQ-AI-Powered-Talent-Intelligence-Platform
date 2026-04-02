export async function callClaude(
  systemPrompt: string,
  userMessage: string
): Promise<string> {
  const response = await fetch('/api/claude', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }]
    })
  });
  
  if (!response.ok) {
    throw new Error(`Claude API failed with status ${response.status}`);
  }
  
  const data = await response.json();
  if (data.content && data.content.length > 0) {
    return data.content[0].text;
  }
  
  throw new Error('No content returned from Claude');
}

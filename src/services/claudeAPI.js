const CLAUDE_API_URL = "https://api.anthropic.com/v1/messages";

export async function analyzeDreams(dreams) {
  const dreamText = dreams.map((d, i) =>
    `Dream ${i+1} (${d.date}): "${d.title}" - ${d.description}. Mood before: ${d.moodBefore}/10. Mood after: ${d.moodAfter}/10. Tags: ${d.tags.join(", ")}. Sleep: ${d.sleepQuality}.`
  ).join("\n\n");

  const response = await fetch(CLAUDE_API_URL, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "x-api-key": import.meta.env.VITE_CLAUDE_API_KEY || "YOUR_CLAUDE_API_KEY",
      "anthropic-version": "2023-06-01",
      "anthropic-dangerously-allow-browser": "true"
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: "You are a dream analyst and psychologist. Analyze dream journal entries and return ONLY a valid JSON object with no extra text. The JSON must have these exact keys: summary (string), topSymbols (array of {symbol, meaning, frequency}), emotionalArc (string), recurringThemes (array of strings), psychologicalInsight (string), recommendation (string).",
      messages: [{ role: "user", content: `Analyze these dream journal entries and return the JSON:\n\n${dreamText}` }]
    })
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  const data = await response.json();
  const text = data.content[0].text;
  return JSON.parse(text);
}

export async function askAboutSymbol(symbol, dreams) {
  const context = dreams.slice(0, 5).map(d => d.description).join(". ");
  const response = await fetch(CLAUDE_API_URL, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "x-api-key": import.meta.env.VITE_CLAUDE_API_KEY || "YOUR_CLAUDE_API_KEY",
      "anthropic-version": "2023-06-01",
      "anthropic-dangerously-allow-browser": "true"
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: `In the context of these dreams: "${context}". What does the symbol "${symbol}" mean psychologically? Give a 2-3 paragraph insightful answer.` }]
    })
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

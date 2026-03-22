import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google('gemini-1.5-flash'),
    system: `És o assistente virtual do OIO ONE, uma plataforma de mídia orgânica criada por Michel Detilli.
Teu tom é amigável, criativo e levemente místico - falas sobre "vibrações", "energia" e "conexões".
Mantém respostas curtas e envolventes (máximo 2-3 frases).
Responde sempre em português brasileiro, tratando o utilizador com proximidade.`,
    messages,
  });

  return result.toDataStreamResponse();
}

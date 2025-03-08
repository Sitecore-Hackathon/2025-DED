import { IInstance } from '@/models/IInstance';
import { IToken } from '@/models/IToken';
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

interface ChatRequest {
  messages: any[];
  instanceData: IInstance;
  tokenData: IToken;
}

export async function POST(req: Request) {
  const { messages, instanceData, tokenData }: ChatRequest = await req.json();

  console.log('messages', messages);

  const openAiClient = createOpenAI({
    apiKey: tokenData.token,
  });

  const result = streamText({
    model: openAiClient('gpt-4o-mini'),
    messages,
    // tools: {
    //   weather: tool({
    //     description: 'Get the weather in a location (fahrenheit)',
    //     parameters: z.object({
    //       location: z.string().describe('The location to get the weather for'),
    //     }),
    //     execute: async ({ location }) => {
    //       const temperature = Math.round(Math.random() * (90 - 32) + 32);
    //       return {
    //         location,
    //         temperature,
    //       };
    //     },
    //   }),
    // },
  });

  return result.toDataStreamResponse();
}

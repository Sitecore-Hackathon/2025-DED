'use client';

import { IInstance } from '@/models/IInstance';
import { IToken } from '@/models/IToken';
import { useChat } from '@ai-sdk/react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Textarea } from '../ui/textarea';

interface CopilotChatProps {
  instances: IInstance[];
  token: IToken;
}

export const CopilotChat: React.FC<CopilotChatProps> = ({ instances, token }) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
    body: {
      instanceData: instances,
      tokenData: token,
    },
  });

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle>Content Copilot</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((m) => (
              <div key={m.id} className={`p-4 rounded-lg ${m.role === 'assistant' ? 'bg-muted' : 'bg-primary/10'}`}>
                {m.content}
              </div>
            ))}
          </div>
        </ScrollArea>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about content operations..."
              className="min-h-[80px]"
            />
            <Button type="submit" size="sm">
              Send
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

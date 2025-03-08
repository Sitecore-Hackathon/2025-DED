'use client';

import { cn } from '@/lib/utils';
import { IInstance } from '@/models/IInstance';
import { IToken } from '@/models/IToken';
import { useChat } from '@ai-sdk/react';
import { ArrowUpRight, Brain, Loader2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Textarea } from '../ui/textarea';

interface CopilotChatProps {
  instances: IInstance[];
  token: IToken;
}

export const CopilotChat: React.FC<CopilotChatProps> = ({ instances, token }) => {
  const { messages, setMessages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: {
      instanceData: instances,
      tokenData: token,
    },
  });

  // Reference to the messages div for scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Effect to scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  useEffect(() => {
    // Add welcome message if no messages exist
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content:
            'Welcome! I am your Content Specialist. How can I help you with your Sitecore content operations today?',
        },
      ]);
    }
  }, []);

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content:
          'Welcome! I am your Content Specialist. How can I help you with your Sitecore content operations today?',
      },
    ]);
  };

  return (
    <Card className="h-[calc(100vh-10rem)] flex flex-col">
      <CardHeader className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6" />
          <CardTitle>Content Copilot</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-hidden p-0">
        {/* Messages container with fixed height and scrolling */}
        <div className="flex-1 overflow-hidden relative">
          <ScrollArea className="h-full w-full pr-1">
            <div className="flex flex-col gap-4 p-4">
              {messages.map((m) => (
                <div key={m.id} className="flex gap-4 min-w-0">
                  {m.role === 'assistant' && (
                    <div className="mt-2 shrink-0">
                      <Brain />
                    </div>
                  )}
                  <div
                    className={cn(
                      'flex-1 px-4 py-4 rounded-sm break-words',
                      m.role === 'assistant' ? 'bg-muted' : 'bg-primary/10'
                    )}
                  >
                    {m.role === 'assistant' ? (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          code({ node, ...props }) {
                            const match = /language-(\w+)/.exec(props.className || '');
                            return !(props as any).inline ? (
                              <pre className="my-4 p-4 bg-muted-foreground/10 rounded-lg overflow-x-auto">
                                <code
                                  className={cn('relative font-mono text-sm', match?.[1] && `language-${match[1]}`)}
                                  {...props}
                                >
                                  {String(props.children).replace(/\n$/, '')}
                                </code>
                              </pre>
                            ) : (
                              <code
                                className="bg-muted-foreground/20 px-1.5 py-0.5 rounded-md font-mono text-sm"
                                {...props}
                              >
                                {props.children}
                              </code>
                            );
                          },
                          ul({ children }) {
                            return <ul className="list-disc pl-6 my-4">{children}</ul>;
                          },
                          ol({ children }) {
                            return <ol className="list-decimal pl-6 my-4">{children}</ol>;
                          },
                          li({ children }) {
                            return <li className="mb-2">{children}</li>;
                          },
                        }}
                      >
                        {m.content}
                      </ReactMarkdown>
                    ) : (
                      <p>{m.content}</p>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4 min-w-0">
                  <div className="mt-2 shrink-0">
                    <Brain className="h-5 w-5" />
                  </div>
                  <div className="flex-1 px-4 py-4 rounded-sm break-words bg-muted">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>

        {/* Input form with fixed position at bottom */}
        <div className="border-t border-border mt-auto">
          <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-background">
            <Textarea
              onKeyDown={handleKeyDown}
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about content operations..."
              className="min-h-[80px] resize-none"
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="ghost"
                  className="cursor-pointer"
                  onClick={() => handleInputChange({ target: { value: 'How do I export content?' } } as any)}
                >
                  Export content
                  <ArrowUpRight />
                </Button>
                <Button
                  variant="ghost"
                  className="cursor-pointer"
                  onClick={() => handleInputChange({ target: { value: 'What fields should I include?' } } as any)}
                >
                  Field selection
                  <ArrowUpRight />
                </Button>
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="ghost" className="cursor-pointer" onClick={handleClearChat}>
                  Clear
                </Button>
                <Button type="submit" className="cursor-pointer">
                  Send
                </Button>
              </div>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

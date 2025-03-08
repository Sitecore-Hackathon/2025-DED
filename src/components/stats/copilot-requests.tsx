import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface CopilotRequestStatsProps {}

export const CopilotRequestStats: React.FC<CopilotRequestStatsProps> = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Copilot Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <p>In This Session: 150</p>
      </CardContent>
    </Card>
  );
};

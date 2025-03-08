import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface ContentExportStatsProps {}

// TODO: Gets current session total items exported
export const ContentExportStats: React.FC<ContentExportStatsProps> = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Items Exported: 150</p>
      </CardContent>
    </Card>
  );
};

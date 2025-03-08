import { IInstance } from '@/models/IInstance';
import { GenerateContentExport } from '@/services/sitecore/contentExportToolUtil';
import { GetAvailableFields } from '@/services/sitecore/createGqlQuery';
import { FC, useState } from 'react';
import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';

interface ExportToolProps {
  activeInstance: IInstance | undefined;
  setExportOpen: (open: boolean) => void;
  exportOpen: boolean;
}

export const ExportTool: FC<ExportToolProps> = ({ activeInstance, setExportOpen, exportOpen }) => {
  const [startItem, setStartItem] = useState<string>();
  const [templates, setTemplates] = useState<string>();
  const [templateNames, setTemplateNames] = useState<string>();
  const [fields, setFields] = useState<string>();

  const handleStartItem = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStartItem(event.target.value);
  };
  const handleTemplates = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTemplates(event.target.value);
  };
  const handleFields = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFields(event.target.value);
  };
  const handleTemplateNames = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTemplateNames(event.target.value);
  };

  const runExport = () => {
    if (!activeInstance || !activeInstance.name) {
      alert('Please select an instance. If you do not have any instances, configure one now');
      return;
    }

    GenerateContentExport(activeInstance.graphQlEndpoint, activeInstance.apiToken, startItem, templates, fields);
  };

  const browseFields = () => {
    if (!templateNames) {
      alert('Enter Template Names (below the Fields input) to get available fields');
      return;
    }
    const queries = GetAvailableFields(templateNames);
    console.log(queries);
  };

  return (
    <Card className="rounded-sm border bg-card p-6">
      <CardHeader>
        <CardTitle>Export Content</CardTitle>
        <CardDescription>Export content from your Sitecore instance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {/* Start Items Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Start Item(s)</label>
              <Button variant="ghost" size="sm" onClick={() => setStartItem('')}>
                Clear
              </Button>
            </div>
            <Textarea
              value={startItem}
              onChange={handleStartItem}
              placeholder="e.g. {D4D93D21-A8B4-4C0F-8025-251A38D9A04D}"
              className="font-mono text-sm"
            />
            <Alert variant="default" className="mt-2">
              <AlertDescription className="text-xs">
                Enter GUIDs of starting nodes separated by commas. Only content beneath these nodes will be exported.
              </AlertDescription>
            </Alert>
          </div>

          {/* Templates Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Templates</label>
              <Button variant="ghost" size="sm" onClick={() => setTemplates('')}>
                Clear
              </Button>
            </div>
            <Textarea
              value={templates}
              onChange={handleTemplates}
              placeholder="e.g. {CC92A3D8-105C-4016-8BD7-22162C1ED919}"
              className="font-mono text-sm"
            />
            <Alert variant="default" className="mt-2">
              <AlertDescription className="text-xs">
                Enter template GUIDs separated by commas. Leave blank to include all templates.
              </AlertDescription>
            </Alert>
          </div>

          {/* Fields Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Fields</label>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={browseFields}>
                  Browse Fields
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setFields('')}>
                  Clear
                </Button>
              </div>
            </div>
            <Textarea
              value={fields}
              onChange={handleFields}
              placeholder="e.g. title, image, taxonomies"
              className="text-sm"
            />

            {/* Template Names for Field Browse */}
            <div className="mt-4 space-y-2">
              <label className="text-sm font-medium">Template Names (for field browsing)</label>
              <Textarea
                value={templateNames}
                onChange={handleTemplateNames}
                placeholder="e.g. Person, Whitepaper, LandingPage"
                className="text-sm"
              />
              <div className="flex items-center gap-2 mt-4">
                <Button variant="default" size="sm" onClick={runExport}>
                  Run Export
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

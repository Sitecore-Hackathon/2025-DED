import { enumInstanceType, IInstance } from '@/models/IInstance';
import { FC, useState } from 'react';
import ContentExportSearchStyles from '../ui/ContentExportStyles';
import { ExportTool } from './export';
import { ImportTool } from './import';

interface ContentTransferToolProps {
  instances: IInstance[];
}

export const ContentTransferTool: FC<ContentTransferToolProps> = ({ instances }) => {
  const [activeInstance, setActiveInstance] = useState<IInstance>();
  const [configurationOpen, setConfigurationOpen] = useState<boolean>(true);
  const [exportOpen, setExportOpen] = useState<boolean>(true);

  const handleInstanceSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const instanceName = event.target.value;
    for (var i = 0; i < instances.length; i++) {
      var instance = instances[i];
      if (instance.name === instanceName) {
        setActiveInstance(instance);
        return;
      }
    }

    // no instance selected
    const emptyInstance: IInstance = {
      name: '',
      instanceType: enumInstanceType.xmc,
      clientId: '',
      clientSecret: '',
      graphQlEndpoint: '',
      apiToken: '',
      id: '',
    };
    setActiveInstance(emptyInstance);
  };

  return (
    <div className="contentExportTool">
      <ContentExportSearchStyles />
      <h1 className="text-2xl font-bold">Content Export Tool</h1>

      <div className="loading-modal" id="loading-modal">
        <div className="loading-box">
          <div className="lds-default">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>

      <div className="advanced-inner">
        <div className="inner-section">
          <div className="container">
            <div className="row">
              <span className="header">
                <h2>
                  <b>Instance</b>
                </h2>

                {instances && instances.length > 0 && (
                  <>
                    <select onChange={handleInstanceSelect}>
                      <option>-- select instance --</option>
                      {instances.map((instance) => {
                        return (
                          <option key={instance.id} value={instance.name}>
                            {instance.name}
                          </option>
                        );
                      })}
                    </select>
                    <br />
                    <p>
                      <a href="/settings/instance">Configure instances</a>
                    </p>
                  </>
                )}
                {instances?.length === 0 && (
                  <p>
                    No instances configured. <a href="/settings/instance">Configure your instances here</a>
                  </p>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      <br />

      <ImportTool activeInstance={activeInstance} />

      <ExportTool activeInstance={activeInstance} setExportOpen={setExportOpen} exportOpen={exportOpen} />
    </div>
  );
};

import {
  ContextType,
  ReactNode,
  createContext,
  useEffect,
  useMemo,
} from 'react';
import { Provider as ReduxStoreProvider } from 'react-redux';

import {
  ComponentRegistry,
  defaultComponents,
} from '@ncsa/geo-explorer/ComponentRegistry';
import { store } from '@ncsa/geo-explorer/store';
import { initLayers } from '@ncsa/geo-explorer/store/explore/slice';
import { GeoExplorerConfig } from '@ncsa/geo-explorer/types';
import { OGCClient } from '@ncsa/geo-explorer/utils/ogcClient';

export const GeoExplorerContext = createContext<{
  ogcClient: OGCClient | null;
  components: ComponentRegistry;
}>({
  ogcClient: null,
  components: defaultComponents,
});

type Props = {
  config: GeoExplorerConfig | null;
  accessToken: string | undefined;
  children: ReactNode;
  components?: Partial<ComponentRegistry>;
};

export function GeoExplorerProvider({
  config,
  accessToken,
  children,
  components,
}: Props) {
  const contextValue: ContextType<typeof GeoExplorerContext> = useMemo(() => {
    return {
      ogcClient: new OGCClient(
        'https://dachub.ncsa.illinois.edu/geoserver',
        accessToken,
      ),
      components: {
        ...defaultComponents,
        ...components,
      },
    };
  }, [config, components]);

  useEffect(() => {
    if (config) {
      store.dispatch(
        initLayers({
          simpleLayerInventory: config.simple_layers,
          temporalLayerInventory: config.temporal_layers,
          baseMaps: config.basemaps,
        }),
      );
    }
  }, [config]);

  return (
    <GeoExplorerContext.Provider value={contextValue}>
      <ReduxStoreProvider store={store}>{children}</ReduxStoreProvider>
    </GeoExplorerContext.Provider>
  );
}

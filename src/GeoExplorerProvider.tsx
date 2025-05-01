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
import { setLayers } from '@ncsa/geo-explorer/store/explore/slice';
import { GeoExplorerConfig } from '@ncsa/geo-explorer/types';
import { resolveFeatureType } from '@ncsa/geo-explorer/utils/dataset';
import { OGCClient } from '@ncsa/geo-explorer/utils/ogcClient';

export const GeoExplorerContext = createContext<{
  accessToken?: string | undefined;
  ogcClient: OGCClient | null;
  isProtectedResource?: ((url: string) => boolean) | undefined;
  __UNSTABLE_USE_AT_YOUR_OWN_RISK_components: ComponentRegistry;
}>({
  accessToken: undefined,
  ogcClient: null,
  isProtectedResource: () => false,
  __UNSTABLE_USE_AT_YOUR_OWN_RISK_components: defaultComponents,
});

type Props = {
  config: GeoExplorerConfig | null;
  accessToken: string | undefined;
  isProtectedResource?: (url: string) => boolean;
  children: ReactNode;
  components?: Partial<ComponentRegistry>;
};

export function GeoExplorerProvider({
  config,
  accessToken,
  isProtectedResource,
  children,
  components,
}: Props) {
  const contextValue: ContextType<typeof GeoExplorerContext> = useMemo(() => {
    return {
      accessToken,
      ogcClient: config ? new OGCClient({ accessToken }) : null,
      isProtectedResource,
      __UNSTABLE_USE_AT_YOUR_OWN_RISK_components: {
        ...defaultComponents,
        ...components,
      },
    };
  }, [config, components]);

  useEffect(() => {
    (async function init() {
      const { ogcClient } = contextValue;
      if (!config || !ogcClient) return;
      store.dispatch(
        setLayers({
          simpleLayerInventory: await Promise.all(
            config.simple_layers.map((dataset) =>
              resolveFeatureType(dataset, ogcClient),
            ),
          ),
          temporalLayerInventory: await Promise.all(
            config.temporal_layers.map((dataset) =>
              resolveFeatureType(dataset, ogcClient),
            ),
          ),
          baseMaps: config.basemaps,
        }),
      );
    })();
  }, [config, contextValue]);

  return (
    <GeoExplorerContext.Provider value={contextValue}>
      <ReduxStoreProvider store={store}>{children}</ReduxStoreProvider>
    </GeoExplorerContext.Provider>
  );
}

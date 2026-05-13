import { ReactNode } from 'react';
import { ComponentRegistry } from './ComponentRegistry';
import { store } from './store';
import { GeoExplorerConfig, MapConfig } from './types';
import { OGCClient } from './utils/ogcClient';
export declare const GeoExplorerContext: import("react").Context<{
    accessToken?: string | undefined;
    ogcClient: OGCClient | null;
    isProtectedResource?: ((url: string) => boolean) | undefined;
    __UNSTABLE_components: ComponentRegistry;
    mapConfig?: MapConfig | null;
}>;
type Props = {
    config: GeoExplorerConfig | null;
    accessToken: string | undefined;
    isProtectedResource?: (url: string) => boolean;
    children: ReactNode;
    components?: Partial<ComponentRegistry>;
    onReady?: (args: {
        config: GeoExplorerConfig;
        ogcClient: OGCClient;
        store: typeof store;
    }) => void | Promise<void>;
};
export declare function GeoExplorerProvider({ config, accessToken, isProtectedResource, children, components, onReady, }: Props): import("react/jsx-runtime").JSX.Element;
export {};

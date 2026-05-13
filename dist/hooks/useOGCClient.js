import { useContext } from 'react';
import { GeoExplorerContext } from '../GeoExplorerProvider';
export function useOGCClient() {
    const { ogcClient } = useContext(GeoExplorerContext);
    return ogcClient;
}
//# sourceMappingURL=useOGCClient.js.map
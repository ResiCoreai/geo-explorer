import { useContext } from 'react';
import { GeoExplorerContext } from '../GeoExplorerProvider';
export function useImplementation() {
    return useContext(GeoExplorerContext).__UNSTABLE_components;
}
//# sourceMappingURL=useImplementation.js.map
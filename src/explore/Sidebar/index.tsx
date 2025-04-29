import { useContext } from 'react';

import { GeoExplorerContext } from '@ncsa/geo-explorer/GeoExplorerProvider';

export function Sidebar() {
  const { BaseMaps, DataInventory, MapLayers } =
    useContext(GeoExplorerContext).components;
  return (
    <div className="w-full h-full relative">
      <div className="bg-white h-full flex flex-col">
        <div className="flex-1 min-h-0 flex flex-col">
          <DataInventory />
          <MapLayers />
        </div>
        <BaseMaps />
      </div>
    </div>
  );
}

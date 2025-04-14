import { BaseMaps } from '@ncsa/geo-explorer/explore/Sidebar/BaseMaps';
import { SimpleLayerList } from '@ncsa/geo-explorer/explore/Sidebar/DataInventory/SimpleLayerList';
import { MapLayers } from '@ncsa/geo-explorer/explore/Sidebar/MapLayers';

export function Sidebar() {
  return (
    <div className="w-full h-full relative">
      <div className="bg-white h-full flex flex-col">
        <div className="flex-1 min-h-0 flex flex-col">
          <SimpleLayerList />
          <MapLayers />
        </div>
        <BaseMaps />
      </div>
    </div>
  );
}

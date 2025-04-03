import { BaseMaps } from '../../explore/Sidebar/BaseMaps';
import { DataInventory } from '../../explore/Sidebar/DataInventory';
import { MapLayers } from '../../explore/Sidebar/MapLayers';
export function Sidebar() {
    return (<div className="w-full h-full relative">
      <div className="bg-white h-full flex flex-col">
        <div className="flex-1 min-h-0 flex flex-col">
          <DataInventory />
          <MapLayers />
        </div>
        <BaseMaps />
      </div>
    </div>);
}

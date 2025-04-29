import { useImplementation } from '@ncsa/geo-explorer/hooks/useImplementation';

export function Sidebar() {
  const { BaseMaps, DataInventory, MapLayers } = useImplementation();

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

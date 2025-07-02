import { StyleEditor } from '@ncsa/geo-explorer/explore/Sidebar/StyleEditor';
import { useImplementation } from '@ncsa/geo-explorer/hooks/useImplementation';
import { RootState, useSelector } from '@ncsa/geo-explorer/store';

export function Sidebar() {
  const { BaseMaps, DataInventory, MapLayers } = useImplementation();
  const selectedLayer = useSelector((state: RootState) =>
    state.explore.mapLayers.find(
      (layer) => layer.data.layer_id === state.explore.selectedLayer,
    ),
  );
  const showStyleSettings = useSelector(
    (state: RootState) => state.explore.showStyleSettings,
  );

  return (
    <div className="w-full h-full relative">
      <div className="bg-white h-full flex flex-col">
        <div className="flex-1 min-h-0 flex flex-col">
          <DataInventory />
          <MapLayers />
        </div>
        <BaseMaps />
      </div>
      {selectedLayer && showStyleSettings && (
        <div className="h-full w-[280px] absolute left-full top-0">
          <StyleEditor layer={selectedLayer} />
        </div>
      )}
    </div>
  );
}

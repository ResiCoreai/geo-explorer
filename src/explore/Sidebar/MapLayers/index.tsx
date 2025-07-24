import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import classNames from 'classnames';

import { useImplementation } from '@ncsa/geo-explorer/hooks/useImplementation';
import { RootState, useSelector } from '@ncsa/geo-explorer/store';

export function MapLayers() {
  const { MapLayerItem, SidebarSection } = useImplementation();

  const currentIndex = useSelector(
    (state: RootState) => state.explore.currentIndex,
  );

  const selectedLayers = useSelector(
    (state: RootState) => state.explore.mapLayers,
  );

  return (
    <SidebarSection
      icon={<LayersOutlinedIcon className="text-[20px]" />}
      title="Map layers"
    >
      <div className="h-full overflow-scroll no-scrollbar px-[20px]">
        {selectedLayers.map((layer, i) => (
          <div key={layer.data.layer_id} className="relative pt-1">
            <div
              className={classNames(`absolute top-0 left-0 w-full h-[4px]`, {
                'bg-[#1976D2]': currentIndex === i,
              })}
            />
            <MapLayerItem key={layer.data.layer_id} index={i} layer={layer} />
          </div>
        ))}
        <div
          key={selectedLayers.length}
          className={classNames(`absolute top-0 left-0 w-full h-[4px]`, {
            'bg-[#1976D2]': currentIndex === selectedLayers.length,
          })}
        />
      </div>
    </SidebarSection>
  );
}

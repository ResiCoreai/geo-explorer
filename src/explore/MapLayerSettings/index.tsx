import { Box, Stack } from '@mui/material';
import classNames from 'classnames';
import { useState } from 'react';

import { useImplementation } from '@ncsa/geo-explorer/hooks/useImplementation';
import {
  AppDispatch,
  RootState,
  useDispatch,
  useSelector,
} from '@ncsa/geo-explorer/store';
import {
  setLayerSettingsExpanded,
  toggleLayerSettings,
} from '@ncsa/geo-explorer/store/explore/slice';

export function MapLayerSettings() {
  const { Header, StyleSettings, TimeSelector, WFSFeatureTable } =
    useImplementation();

  const dispatch = useDispatch<AppDispatch>();
  const selectedLayer = useSelector((state: RootState) =>
    state.explore.mapLayers.find(
      (layer) => layer.data.layer_id === state.explore.selectedLayer,
    ),
  );
  const showLayerSettings = useSelector(
    (state: RootState) => state.explore.showLayerSettings,
  );
  const expanded = useSelector(
    (state: RootState) => state.explore.layerSettingsExpanded,
  );

  const [styleSettingsOpen, setStyleSettingsOpen] = useState(false);

  if (!(selectedLayer && showLayerSettings)) return null;

  return (
    <>
      <Stack
        id="layer-settings"
        direction="column"
        className="w-full items-center"
      >
        <Stack
          direction="column"
          className={classNames(
            'w-full bg-white gap-[16px] px-[32px] py-[16px] box-border',
          )}
        >
          <Header
            onOpenStyleSettings={() => setStyleSettingsOpen(true)}
            onClick={() => {
              dispatch(setLayerSettingsExpanded({ expanded: !expanded }));
            }}
            onClose={() => {
              dispatch(toggleLayerSettings());
            }}
          />
          {expanded && (
            <>
              {selectedLayer.data.timestamps.length > 0 && <TimeSelector />}
              {selectedLayer.data.layer_type !== 'raster' ? (
                <Box className="cursor-auto h-[300px]">
                  <WFSFeatureTable dataset={selectedLayer.data} />
                </Box>
              ) : null}
            </>
          )}
        </Stack>
      </Stack>
      <StyleSettings
        open={styleSettingsOpen}
        onClose={() => setStyleSettingsOpen(false)}
      />
    </>
  );
}

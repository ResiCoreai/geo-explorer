import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, IconButton, Stack } from '@mui/material';
import { useState } from 'react';

import { SIDEBAR_WIDTH } from '@ncsa/geo-explorer/config';
import { MainMap } from '@ncsa/geo-explorer/explore/MainMap';
import { LegendPanel } from '@ncsa/geo-explorer/explore/MainMap/LegendPanel';
import { useImplementation } from '@ncsa/geo-explorer/hooks/useImplementation';
import { RootState, useSelector } from '@ncsa/geo-explorer/store';

import 'maplibre-gl/dist/maplibre-gl.css';

export function GeoExplorer() {
  const { DatasetPreview, MapLayerSettings, Sidebar } = useImplementation();

  const mapLayers = useSelector((state: RootState) => state.explore.mapLayers);
  const selectedLayer = useSelector((state: RootState) =>
    state.explore.mapLayers.find(
      (layer) => layer.data.layer_id === state.explore.selectedLayer,
    ),
  );

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box className="w-full h-full">
      <MainMap />
      <Stack
        direction="row"
        className="absolute left-0 right-0 top-0 bottom-0 min-h-0 pointer-events-none transition-all"
        style={{
          marginLeft: sidebarOpen ? 0 : -SIDEBAR_WIDTH,
        }}
      >
        <Box
          style={{ width: SIDEBAR_WIDTH }}
          className="flex-none h-full relative z-[1] pointer-events-auto"
        >
          <IconButton
            className={
              sidebarOpen
                ? 'absolute -right-[15px] top-2 z-10 bg-white'
                : 'absolute -right-[40px] top-2 z-10 bg-white'
            }
            onClick={() => setSidebarOpen(!sidebarOpen)}
            size="small"
          >
            {sidebarOpen ? (
              <ChevronLeftIcon className="text-[#0000008A] text-[large]" />
            ) : (
              <ChevronRightIcon className="text-[#0000008A] text-[large]" />
            )}{' '}
          </IconButton>
          <Sidebar />
        </Box>

        <Box className="flex-1 relative">
          <Box className="pointer-events-auto absolute bottom-0 left-0 right-0">
            {selectedLayer && (
              <Box className="float-right m-2">
                <LegendPanel layers={mapLayers} selectedLayer={selectedLayer} />
              </Box>
            )}
            <MapLayerSettings />
          </Box>
        </Box>
      </Stack>
      <DatasetPreview />
    </Box>
  );
}

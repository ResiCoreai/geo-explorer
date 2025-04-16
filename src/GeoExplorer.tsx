import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, IconButton, Stack } from '@mui/material';
import classNames from 'classnames';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { SIDEBAR_WIDTH } from '@ncsa/geo-explorer/config';
import { DatasetPreview } from '@ncsa/geo-explorer/explore/DatasetPreview';
import { MainMap } from '@ncsa/geo-explorer/explore/MainMap';
import { MapLayerSettings } from '@ncsa/geo-explorer/explore/MapLayerSettings';
import { Sidebar } from '@ncsa/geo-explorer/explore/Sidebar';
import { RootState } from '@ncsa/geo-explorer/store';

import 'maplibre-gl/dist/maplibre-gl.css';

export function GeoExplorer() {
  const selectedMapLayer = useSelector(
    (state: RootState) => state.explore.selectedLayer,
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

        <Stack
          direction="column"
          className="flex-1 items-stretch min-w-0 relative"
        >
          <Box className="flex-1" />
          <Box
            className={classNames(
              'flex-none pointer-events-auto transition-transform flex flex-colum items-center',
              !selectedMapLayer && 'translate-y-full',
            )}
          >
            <MapLayerSettings />
          </Box>
        </Stack>
      </Stack>
      <DatasetPreview />
    </Box>
  );
}

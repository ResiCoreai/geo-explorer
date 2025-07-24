import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, IconButton, Stack } from '@mui/material';

import { SIDEBAR_WIDTH } from '@ncsa/geo-explorer/config';
import { MainMap } from '@ncsa/geo-explorer/explore/MainMap';
import { LegendPanel } from '@ncsa/geo-explorer/explore/MainMap/LegendPanel';
import { useImplementation } from '@ncsa/geo-explorer/hooks/useImplementation';
import {
  AppDispatch,
  RootState,
  useDispatch,
  useSelector,
} from '@ncsa/geo-explorer/store';
import { setSidebarOpen } from '@ncsa/geo-explorer/store/explore/slice';

import 'maplibre-gl/dist/maplibre-gl.css';

export function GeoExplorer() {
  const { DatasetPreview, MapLayerSettings, Sidebar } = useImplementation();
  const dispatch = useDispatch<AppDispatch>();

  const mapLayers = useSelector((state: RootState) => state.explore.mapLayers);
  const selectedLayer = useSelector((state: RootState) =>
    state.explore.mapLayers.find(
      (layer) => layer.data.layer_id === state.explore.selectedLayer,
    ),
  );
  const sidebarOpen = useSelector(
    (state: RootState) => state.explore.sidebarOpen,
  );

  return (
    <Box className="w-full h-full relative overflow-hidden">
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
            onClick={() => {
              dispatch(setSidebarOpen({ open: !sidebarOpen }));
            }}
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
          <Box className="absolute bottom-0 left-0 right-0">
            {selectedLayer && (
              <Stack direction="row" className="justify-end m-2">
                <Box className="pointer-events-auto">
                  <LegendPanel
                    layers={mapLayers}
                    selectedLayer={selectedLayer}
                  />
                </Box>
              </Stack>
            )}
            <Box className="pointer-events-auto ">
              <MapLayerSettings />
            </Box>
          </Box>
        </Box>
      </Stack>
      <DatasetPreview />
    </Box>
  );
}

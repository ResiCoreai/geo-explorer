import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, IconButton, Stack } from '@mui/material';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppHeader } from '../components/AppHeader';
import { SIDEBAR_WIDTH } from '../config';
import { DatasetPreview } from '../explore/DatasetPreview';
import { MainMap } from '../explore/MainMap';
import { MapLayerSettings } from '../explore/MapLayerSettings';
import { Sidebar } from '../explore/Sidebar';
import { initialize } from '../store/explore/slice';
import 'maplibre-gl/dist/maplibre-gl.css';
export function Explore() {
    const dispatch = useDispatch();
    const selectedMapLayer = useSelector((state) => state.explore.selectedLayer);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    useEffect(() => {
        dispatch(initialize());
    }, []);
    return (<Stack direction="column" className="fixed top-0 left-0 right-0 bottom-0">
      <AppHeader />
      <Box className="relative flex-1">
        <Box className="z-0 relative">
          <MainMap />
        </Box>
        <Stack direction="row" className="absolute left-0 right-0 top-0 bottom-0 min-h-0 pointer-events-none transition-all" style={{
            marginLeft: sidebarOpen ? 0 : -SIDEBAR_WIDTH,
        }}>
          <Box style={{ width: SIDEBAR_WIDTH }} className="flex-none h-full relative z-[1] pointer-events-auto">
            <IconButton className={sidebarOpen
            ? 'absolute -right-[15px] top-2 z-10 bg-white'
            : 'absolute -right-[40px] top-2 z-10 bg-white'} onClick={() => setSidebarOpen(!sidebarOpen)} size="small">
              {sidebarOpen ? (<ChevronLeftIcon className="text-[#0000008A] text-[large]"/>) : (<ChevronRightIcon className="text-[#0000008A] text-[large]"/>)}{' '}
            </IconButton>
            <Sidebar />
          </Box>

          <Stack direction="column" className="flex-1 items-stretch min-w-0 relative">
            <Box className="flex-1"/>
            <Box className={classNames('flex-none pointer-events-auto transition-transform flex flex-colum items-center', !selectedMapLayer && 'translate-y-full')}>
              <MapLayerSettings />
            </Box>
          </Stack>
        </Stack>
        <DatasetPreview />
      </Box>
    </Stack>);
}

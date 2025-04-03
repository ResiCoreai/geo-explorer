import { CloseOutlined, FileDownloadOutlined, PaletteOutlined, RemoveOutlined, } from '@mui/icons-material';
import { Box, Button, IconButton, Stack, Tooltip, Typography, } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { DatasetDescriptionTooltip } from '../../icons/DatasetDescriptionTooltip';
import { removeLayer } from '../../store/explore/slice';
import { downloadDataset } from '../../utils/geoserver';
export function Header({ onOpenStyleSettings, onClose }) {
    const dispatch = useDispatch();
    const selectedLayer = useSelector((state) => state.explore.mapLayers.find((layer) => layer.data.layer_id === state.explore.selectedLayer));
    if (!selectedLayer)
        return null;
    return (<Stack direction="row" className="select-none items-center">
      <Stack direction="column">
        <Stack direction="row" className="items-center">
          <Typography className="font-medium text-[16px]">
            {selectedLayer === null || selectedLayer === void 0 ? void 0 : selectedLayer.data.display_name}
          </Typography>
          <Tooltip title={selectedLayer === null || selectedLayer === void 0 ? void 0 : selectedLayer.data.description} placement="top">
            <Box className="ml-[6px] pointer-events-auto">
              <DatasetDescriptionTooltip />
            </Box>
          </Tooltip>
        </Stack>
      </Stack>
      <Box className="flex-1"/>
      <Button variant="contained" disableElevation className="bg-[#2C343C]" startIcon={<RemoveOutlined />} onClick={() => {
            dispatch(removeLayer({ layer_id: selectedLayer.data.layer_id }));
        }}>
        Remove
      </Button>
      <IconButton disabled={selectedLayer.data.dataset_info.dataset_type === 'raster'} onClick={() => {
            downloadDataset(selectedLayer.data.layer_id);
        }}>
        <FileDownloadOutlined />
      </IconButton>
      <IconButton onClick={onOpenStyleSettings}>
        <PaletteOutlined />
      </IconButton>
      <IconButton onClick={onClose}>
        <CloseOutlined />
      </IconButton>
    </Stack>);
}

import {
  AddOutlined,
  CloseOutlined,
  RemoveOutlined,
} from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import {useCallback, useContext, useMemo} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@ncsa/geo-explorer/store';
import {
  addLayer,
  removeLayer,
  selectDataset,
} from '@ncsa/geo-explorer/store/explore/slice';
import {GeoExplorerContext} from "@ncsa/geo-explorer/GeoExplorerProvider";

export function DatasetPreview() {
  const {DatasetInfo} = useContext(GeoExplorerContext).components;
  const dispatch = useDispatch<AppDispatch>();
  const mapLayers = useSelector((state: RootState) => state.explore.mapLayers);

  const dataset = useSelector(
    (state: RootState) =>
      state.explore.simpleLayerInventory.find(
        (dataset) => dataset.layer_id === state.explore.selectedDataset,
      ) ||
      state.explore.temporalLayerInventory.find(
        (dataset) => dataset.layer_id === state.explore.selectedDataset,
      ),
  );

  const addedToLayers = useMemo(() => {
    return mapLayers.some((layer) => layer.data.layer_id === dataset?.layer_id);
  }, [mapLayers, dataset]);

  const onClose = useCallback(() => {
    dispatch(selectDataset({ layer_id: null }));
  }, []);

  if (!dataset) return null;

  return (
    <Modal open={!!dataset} onClose={onClose}>
      <Paper className="fixed left-0 right-0 top-0 bottom-0 m-auto rounded-[6px] py-[24px] px-[32px] overflow-scroll no-scrollbar w-[60%] h-fit">
        <Stack direction="row" className="items-center">
          <Typography className="font-bold text-[20px]">
            {dataset?.display_name}
          </Typography>
          <Box className="flex-1" />
          {dataset &&
            (addedToLayers ? (
              <Button
                variant="contained"
                disableElevation
                className="bg-[#2C343C]"
                startIcon={<RemoveOutlined />}
                onClick={() => {
                  dispatch(removeLayer({ layer_id: dataset.layer_id }));
                }}
              >
                Remove
              </Button>
            ) : (
              <Button
                variant="contained"
                disableElevation
                startIcon={<AddOutlined />}
                onClick={() => {
                  dispatch(addLayer({ layer_id: dataset.layer_id }));
                }}
              >
                Add to map
              </Button>
            ))}
          <IconButton onClick={onClose}>
            <CloseOutlined />
          </IconButton>
        </Stack>
        <DatasetInfo />
      </Paper>
    </Modal>
  );
}

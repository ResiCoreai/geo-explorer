import { CloseOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { parseColor } from '@react-stately/color';
import { useEffect, useRef, useState } from 'react';

import { useImplementation } from '@ncsa/geo-explorer/hooks/useImplementation';
import {
  AppDispatch,
  RootState,
  useDispatch,
  useSelector,
} from '@ncsa/geo-explorer/store';
import { setLayerStyleSLD } from '@ncsa/geo-explorer/store/explore/actions';
import {
  defaultLayerStyle,
  resetLayerStyle,
} from '@ncsa/geo-explorer/store/explore/slice';
import { MapLayerStyle } from '@ncsa/geo-explorer/store/explore/types';

export type StyleSettingsProps = {
  open: boolean;
  onClose: () => void;
};

export function StyleSettings({ open, onClose }: StyleSettingsProps) {
  const { ColorInput, NumberInput } = useImplementation();

  const dispatch = useDispatch<AppDispatch>();
  const selectedLayer = useSelector((state: RootState) =>
    state.explore.mapLayers.find(
      (layer) => layer.data.layer_id === state.explore.selectedLayer,
    ),
  );

  const [style, setStyle] = useState(defaultLayerStyle);
  useEffect(() => {
    if (selectedLayer) {
      setStyle(selectedLayer.style);
    }
  }, [selectedLayer?.data.layer_id]);

  const timerRef = useRef<number>(-1);

  const updateStyleDebounced = (styleUpdate: Partial<MapLayerStyle>) => {
    clearTimeout(timerRef.current);
    if (selectedLayer) {
      const newStyle = {
        ...style,
        ...styleUpdate,
      };
      setStyle(newStyle);
      timerRef.current = window.setTimeout(() => {
        dispatch(setLayerStyleSLD(selectedLayer.data.layer_id, newStyle));
      }, 200);
    }
  };

  const reset = () => {
    if (!selectedLayer) return;
    setStyle(defaultLayerStyle);
    dispatch(
      resetLayerStyle({
        layer_id: selectedLayer.data.layer_id,
      }),
    );
  };

  if (!selectedLayer) return null;

  return (
    <Modal open={open} onClose={onClose} disablePortal>
      <Paper className="fixed left-0 right-0 top-0 bottom-0 w-[535px] h-[60%] m-auto rounded-[6px] overflow-scroll no-scrollbar">
        <Stack
          direction="row"
          className="sticky top-0 pt-[24px] px-[32px] bg-white z-[1]"
        >
          <Typography className="text-[20px]">Style Settings</Typography>
          <Box className="flex-1" />
          <IconButton onClick={onClose}>
            <CloseOutlined />
          </IconButton>
        </Stack>
        <Box className="pb-[24px] px-[32px]">
          {selectedLayer.data.layer_type === 'point' && (
            <>
              <Divider className="my-[20px]" />
              <Typography className="font-bold text-[16px]">Radius</Typography>
              <NumberInput
                value={style.radius}
                onChange={(value) => {
                  updateStyleDebounced({
                    radius: value,
                  });
                }}
                min={1}
                max={20}
                renderValue={String}
              />
            </>
          )}

          {(selectedLayer.data.layer_type === 'point' ||
            selectedLayer.data.layer_type === 'polygon') && (
            <>
              <Divider className="my-[20px]" />
              <Typography className="font-bold text-[16px]">
                Fill Color
              </Typography>
              <ColorInput
                value={parseColor(style.fillColor).withChannelValue(
                  'alpha',
                  style.fillOpacity,
                )}
                onChange={(color) => {
                  updateStyleDebounced({
                    fillColor: color.toString('hex'),
                    fillOpacity: color.getChannelValue('alpha'),
                  });
                }}
              />
            </>
          )}

          {selectedLayer.data.layer_type !== 'raster' && (
            <>
              <Divider className="my-[20px]" />
              <Typography className="font-bold text-[16px]">
                Stroke Width
              </Typography>
              <NumberInput
                value={style.strokeWidth}
                onChange={(value) => {
                  updateStyleDebounced({
                    strokeWidth: value,
                  });
                }}
                min={0}
                max={10}
                renderValue={String}
              />
              <Divider className="my-[20px]" />
              <Typography className="font-bold text-[16px]">
                Stroke Color
              </Typography>
              <ColorInput
                value={parseColor(style.strokeColor).withChannelValue(
                  'alpha',
                  style.strokeOpacity,
                )}
                onChange={(color) => {
                  updateStyleDebounced({
                    strokeColor: color.toString('hex'),
                    strokeOpacity: color.getChannelValue('alpha'),
                  });
                }}
              />
            </>
          )}

          <Divider className="my-[20px]" />
          <Typography className="font-bold text-[16px]">
            Layer Visibility
          </Typography>
          <NumberInput
            value={style.layerOpacity}
            onChange={(value) => {
              updateStyleDebounced({
                layerOpacity: value,
              });
            }}
            min={0}
            max={1}
            step={0.1}
            renderValue={(alpha) => alpha * 100 + '%'}
          />
          <Stack direction="row" className="mt-[64px] gap-[8px]">
            <Box className="flex-1" />
            <Button
              variant="outlined"
              disableElevation
              onClick={() => {
                reset();
              }}
            >
              Reset
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Modal>
  );
}

import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import classNames from 'classnames';
import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CategoricalLegendIcon } from '@ncsa/geo-explorer/explore/Sidebar/MapLayers/CategoricalLegendIcon';
import { ClimateLayerSummary } from '@ncsa/geo-explorer/explore/Sidebar/MapLayers/ClimateLayerSummary';
import { ClimateLegendIcon } from '@ncsa/geo-explorer/explore/Sidebar/MapLayers/ClimateLegendIcon';
import { SingleLegendIcon } from '@ncsa/geo-explorer/explore/Sidebar/MapLayers/SingleLegendIcon';
import { getLayerIconByCategory } from '@ncsa/geo-explorer/explore/Sidebar/utils/icons';
import { LayerControlIcon } from '@ncsa/geo-explorer/icons/LayerControl';
import { AppDispatch, RootState } from '@ncsa/geo-explorer/store';
import {
  reorderEnd,
  reorderStart,
  selectMapLayer,
  setCurrentIndex,
  toggleLayerSettings,
  toggleVisibility,
} from '@ncsa/geo-explorer/store/explore/slice';
import { MapLayer } from '@ncsa/geo-explorer/store/explore/types';
import {
  isCategoricalData,
  isClimateData,
  isSingleCategoryData,
} from '@ncsa/geo-explorer/types';

type Props = {
  index: number;
  layer: MapLayer;
};

export function Item({ index, layer }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const selectedLayer = useSelector((state: RootState) =>
    state.explore.mapLayers.find(
      (layer) => layer.data.layer_id === state.explore.selectedLayer,
    ),
  );

  const reordering = useSelector(
    (state: RootState) => state.explore.prevIndex !== -1,
  );

  const elRef = useRef<HTMLDivElement | null>(null);
  const initialPointRef = useRef<[number, number]>([-1, -1]);

  const onMouseUpGlobal = useCallback(() => {
    if (!elRef.current) return;
    dispatch(reorderEnd());
    elRef.current.style.transform = '';
    elRef.current.style.zIndex = '';
    elRef.current.style.pointerEvents = '';
    window.removeEventListener('mousemove', onMouseMoveGlobal);
    window.removeEventListener('mouseup', onMouseUpGlobal);
  }, []);

  const onMouseMoveGlobal = useCallback((e: MouseEvent) => {
    if (!elRef.current) return;
    const [initialX, initialY] = initialPointRef.current;
    elRef.current.style.transform = `translate(${e.clientX - initialX}px, ${e.clientY - initialY}px)`;
  }, []);

  const onDragStart = useCallback(
    (e: React.MouseEvent) => {
      if (!elRef.current) return;
      initialPointRef.current = [e.clientX, e.clientY];
      elRef.current.style.zIndex = '1';
      elRef.current.style.pointerEvents = 'none';
      dispatch(reorderStart({ index }));
      window.addEventListener('mousemove', onMouseMoveGlobal);
      window.addEventListener('mouseup', onMouseUpGlobal);
    },
    [index],
  );

  const onDragOver = useCallback(
    (e: React.MouseEvent) => {
      if (!elRef.current) return;
      if (reordering) {
        const rect = elRef.current.getBoundingClientRect();
        dispatch(
          setCurrentIndex({
            index: e.clientY < rect.top + rect.height / 2 ? index : index + 1,
          }),
        );
      }
    },
    [index, reordering],
  );

  const selected = selectedLayer?.data.layer_id === layer.data.layer_id;

  const toggleSelectedLayer = useCallback(() => {
    dispatch(
      selectMapLayer({
        layer_id: selected ? null : layer.data.layer_id,
      }),
    );
  }, [selected, layer]);

  const toggleSettings = useCallback(() => {
    if (!selected) {
      dispatch(
        selectMapLayer({
          layer_id: layer.data.layer_id,
        }),
      );
    }
    dispatch(toggleLayerSettings());
  }, [selected, layer]);

  return (
    <Box
      ref={elRef}
      key={layer.data.layer_id}
      className={classNames(
        'px-[16px] relative text-[#13294B] hover:bg-[#1976D214] hover:border-[#1976D2] transition-colors cursor-pointer select-none font-semibold rounded-md',
        selected
          ? 'border-0 border-l-[2px] border-solid border-[#0066FF] bg-[#F1F6FF] shadow-[0px_4px_4px_0px_#00000040]'
          : 'border border-solid border-[#D1D5DB] bg-white',
      )}
      onMouseMove={onDragOver}
      onClick={toggleSelectedLayer}
    >
      <Stack direction="row" className="items-center gap-[2px]">
        <Stack
          className="cursor-move flex-none items-center justify-center"
          onMouseDown={onDragStart}
        >
          <LayerControlIcon />
        </Stack>
        <Stack className="items-center justify-center mx-[6px]">
          {isClimateData(layer) ? (
            <ClimateLegendIcon layer={layer} />
          ) : isCategoricalData(layer) ? (
            <CategoricalLegendIcon layer={layer} />
          ) : isSingleCategoryData(layer) ? (
            <SingleLegendIcon layer={layer} />
          ) : (
            getLayerIconByCategory(layer)?.({ className: 'w-[18px] h-[18px]' })
          )}
        </Stack>

        <Typography className="flex-auto min-w-0 whitespace-nowrap overflow-hidden text-ellipsis text-[14px] font-semibold">
          {layer.data.display_name}
        </Typography>
        <Stack
          direction="row"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <IconButton
            size="small"
            className="flex-none text-[#13294B]"
            onClick={toggleSettings}
          >
            <TableChartOutlinedIcon className="fill-[#13294B8C]" />
          </IconButton>
          <IconButton
            size="small"
            className="flex-none text-[#13294B]"
            onClick={() => {
              dispatch(toggleVisibility({ layer_id: layer.data.layer_id }));
            }}
          >
            {layer.visible ? (
              <VisibilityOutlinedIcon className="fill-[#13294B8C]" />
            ) : (
              <VisibilityOffOutlinedIcon className="fill-[#13294B8C]" />
            )}
          </IconButton>
          <IconButton size="small" className="flex-none text-[#13294B]">
            <MoreHorizOutlinedIcon className="fill-[#13294B8C]" />
          </IconButton>
        </Stack>
      </Stack>
      {selected && isClimateData(layer) && (
        <ClimateLayerSummary layer={layer} />
      )}
    </Box>
  );
}

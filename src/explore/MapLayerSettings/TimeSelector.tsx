import { Pause, PlayArrow } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import classNames from 'classnames';
import { useMemo } from 'react';

import {
  AppDispatch,
  RootState,
  useDispatch,
  useSelector,
} from '@ncsa/geo-explorer/store';
import {
  setTimestampIdx,
  togglePlaying,
} from '@ncsa/geo-explorer/store/explore/slice';

type YearAndQuarters = {
  year: number;
  /**
   * Indices into the `timestamps` array
   */
  quarters: [number, number, number, number];
};

export function TimeSelector() {
  const dispatch = useDispatch<AppDispatch>();

  const selectedLayer = useSelector((state: RootState) =>
    state.explore.mapLayers.find(
      (layer) => layer.data.layer_id === state.explore.selectedLayer,
    ),
  );

  const yearsAndQuarters = useMemo<YearAndQuarters[]>(() => {
    if (!selectedLayer) return [];
    const years: Record<string, YearAndQuarters> = {};
    for (const [index, timestamp] of selectedLayer.data.timestamps.entries()) {
      const year = new Date(timestamp).getUTCFullYear();
      const quarter = Math.floor(new Date(timestamp).getUTCMonth() / 3);
      if (!years[year]) {
        years[year] = {
          year,
          quarters: [-1, -1, -1, -1],
        };
      }
      years[year].quarters[quarter] = index;
    }
    return Object.values(years).sort((a, b) => Number(a.year) - Number(b.year));
  }, [selectedLayer]);

  if (!selectedLayer) return null;

  const curTimestamp =
    selectedLayer.data.timestamps[selectedLayer.timestampIdx];
  const curTime = curTimestamp ? new Date(curTimestamp) : new Date();
  const curYear = curTime.getUTCFullYear();
  const curQuarter = Math.floor(curTime.getUTCMonth() / 3);

  return (
    <Stack direction="row" className="items-center gap-[12px] cursor-pointer">
      <IconButton
        className="p-0"
        onClick={() => {
          dispatch(togglePlaying({ layer_id: selectedLayer.data.layer_id }));
        }}
      >
        <Box className="bg-[#F3F4F6] w-[30px] h-[30px] rounded-[3px] flex items-center justify-center">
          {selectedLayer.playing ? <Pause /> : <PlayArrow />}
        </Box>
      </IconButton>
      <Stack
        direction="row"
        className="flex-auto min-w-0 overflow-x-scroll no-scrollbar gap-[8px] py-[10px]"
      >
        {yearsAndQuarters.map(({ year, quarters }) => (
          <Stack
            direction="column"
            key={year}
            className="flex-none w-[80px] gap-[4px]"
          >
            <IconButton
              className={classNames(
                'h-[18px] leading-[18px] text-center text-[14px] font-semibold rounded-none',
                year === curYear
                  ? 'bg-[#1976D2] text-[white]'
                  : 'bg-[#2C343C1A] text-[#2C343C]',
              )}
            >
              {year}
            </IconButton>
            <Stack direction="row" className="self-stretch justify-between">
              {quarters.map((timestampIdx, quarter) => (
                <IconButton
                  key={quarter}
                  className={classNames(
                    'h-[18px] w-[18px] rounded-none',
                    year === curYear && quarter === curQuarter
                      ? 'bg-[#1976D2] text-[white]'
                      : 'bg-[#2C343C1A] text-[#2C343C]',
                  )}
                  onClick={() => {
                    if (timestampIdx >= 0) {
                      dispatch(
                        setTimestampIdx({
                          layer_id: selectedLayer.data.layer_id,
                          index: timestampIdx,
                        }),
                      );
                    }
                  }}
                ></IconButton>
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
      <Box className="flex-none">
        <Typography className="h-[18px] text-[12px]">YEAR</Typography>
        <Typography className="h-[18px] text-[12px]">QUARTER</Typography>
      </Box>
    </Stack>
  );
}

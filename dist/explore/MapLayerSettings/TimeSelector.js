import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Pause, PlayArrow } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import classNames from "classnames";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTimestampIdx, togglePlaying } from "../../store/explore/slice";
export function TimeSelector() {
  const dispatch = useDispatch();
  const selectedLayer = useSelector((state) =>
    state.explore.mapLayers.find(
      (layer) => layer.data.layer_id === state.explore.selectedLayer,
    ),
  );
  const yearsAndQuarters = useMemo(() => {
    if (!selectedLayer) return [];
    const years = {};
    for (const [
      index,
      timestamp,
    ] of selectedLayer.data.dataset_info.timestamps.entries()) {
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
    selectedLayer.data.dataset_info.timestamps[selectedLayer.timestampIdx];
  const curTime = curTimestamp ? new Date(curTimestamp) : new Date();
  const curYear = curTime.getUTCFullYear();
  const curQuarter = Math.floor(curTime.getUTCMonth() / 3);
  return _jsxs(Stack, {
    direction: "row",
    className: "items-center gap-[12px] cursor-pointer",
    children: [
      _jsx(IconButton, {
        className: "p-0",
        onClick: () => {
          dispatch(togglePlaying({ layer_id: selectedLayer.data.layer_id }));
        },
        children: _jsx(Box, {
          className:
            "bg-[#F3F4F6] w-[30px] h-[30px] rounded-[3px] flex items-center justify-center",
          children: selectedLayer.playing
            ? _jsx(Pause, {})
            : _jsx(PlayArrow, {}),
        }),
      }),
      _jsx(Stack, {
        direction: "row",
        className:
          "flex-auto min-w-0 overflow-x-scroll no-scrollbar gap-[8px] py-[10px]",
        children: yearsAndQuarters.map(({ year, quarters }) =>
          _jsxs(
            Stack,
            {
              direction: "column",
              className: "flex-none w-[80px] gap-[4px]",
              children: [
                _jsx(IconButton, {
                  className: classNames(
                    "h-[18px] leading-[18px] text-center text-[14px] font-semibold rounded-none",
                    year === curYear
                      ? "bg-[#1976D2] text-[white]"
                      : "bg-[#2C343C1A] text-[#2C343C]",
                  ),
                  children: year,
                }),
                _jsx(Stack, {
                  direction: "row",
                  className: "self-stretch justify-between",
                  children: quarters.map((timestampIdx, quarter) =>
                    _jsx(
                      IconButton,
                      {
                        className: classNames(
                          "h-[18px] w-[18px] rounded-none",
                          year === curYear && quarter === curQuarter
                            ? "bg-[#1976D2] text-[white]"
                            : "bg-[#2C343C1A] text-[#2C343C]",
                        ),
                        onClick: () => {
                          if (timestampIdx >= 0) {
                            dispatch(
                              setTimestampIdx({
                                layer_id: selectedLayer.data.layer_id,
                                index: timestampIdx,
                              }),
                            );
                          }
                        },
                      },
                      quarter,
                    ),
                  ),
                }),
              ],
            },
            year,
          ),
        ),
      }),
      _jsxs(Box, {
        className: "flex-none",
        children: [
          _jsx(Typography, {
            className: "h-[18px] text-[12px]",
            children: "YEAR",
          }),
          _jsx(Typography, {
            className: "h-[18px] text-[12px]",
            children: "QUARTER",
          }),
        ],
      }),
    ],
  });
}

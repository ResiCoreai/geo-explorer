import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, IconButton, Stack } from "@mui/material";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppHeader } from "../components/AppHeader";
import { SIDEBAR_WIDTH } from "../config";
import { DatasetPreview } from "../explore/DatasetPreview";
import { MainMap } from "../explore/MainMap";
import { MapLayerSettings } from "../explore/MapLayerSettings";
import { Sidebar } from "../explore/Sidebar";
import { initialize } from "../store/explore/slice";
import "maplibre-gl/dist/maplibre-gl.css";
export function Explore() {
  const dispatch = useDispatch();
  const selectedMapLayer = useSelector((state) => state.explore.selectedLayer);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  useEffect(() => {
    dispatch(initialize());
  }, []);
  return _jsxs(Stack, {
    direction: "column",
    className: "fixed top-0 left-0 right-0 bottom-0",
    children: [
      _jsx(AppHeader, {}),
      _jsxs(Box, {
        className: "relative flex-1",
        children: [
          _jsx(Box, { className: "z-0 relative", children: _jsx(MainMap, {}) }),
          _jsxs(Stack, {
            direction: "row",
            className:
              "absolute left-0 right-0 top-0 bottom-0 min-h-0 pointer-events-none transition-all",
            style: {
              marginLeft: sidebarOpen ? 0 : -SIDEBAR_WIDTH,
            },
            children: [
              _jsxs(Box, {
                style: { width: SIDEBAR_WIDTH },
                className:
                  "flex-none h-full relative z-[1] pointer-events-auto",
                children: [
                  _jsxs(IconButton, {
                    className: sidebarOpen
                      ? "absolute -right-[15px] top-2 z-10 bg-white"
                      : "absolute -right-[40px] top-2 z-10 bg-white",
                    onClick: () => setSidebarOpen(!sidebarOpen),
                    size: "small",
                    children: [
                      sidebarOpen
                        ? _jsx(ChevronLeftIcon, {
                            className: "text-[#0000008A] text-[large]",
                          })
                        : _jsx(ChevronRightIcon, {
                            className: "text-[#0000008A] text-[large]",
                          }),
                      " ",
                    ],
                  }),
                  _jsx(Sidebar, {}),
                ],
              }),
              _jsxs(Stack, {
                direction: "column",
                className: "flex-1 items-stretch min-w-0 relative",
                children: [
                  _jsx(Box, { className: "flex-1" }),
                  _jsx(Box, {
                    className: classNames(
                      "flex-none pointer-events-auto transition-transform flex flex-colum items-center",
                      !selectedMapLayer && "translate-y-full",
                    ),
                    children: _jsx(MapLayerSettings, {}),
                  }),
                ],
              }),
            ],
          }),
          _jsx(DatasetPreview, {}),
        ],
      }),
    ],
  });
}

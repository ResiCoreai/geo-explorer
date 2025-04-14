import { Box, Stack } from '@mui/material';
import classNames from 'classnames';
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  LAYER_SETTINGS_HEIGHT,
  SIDEBAR_WIDTH,
} from '@ncsa/geo-explorer/config';
import { Header } from '@ncsa/geo-explorer/explore/MapLayerSettings/Header';
import { StyleSettings } from '@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings';
import { TimeSelector } from '@ncsa/geo-explorer/explore/MapLayerSettings/TimeSelector';
import { WFSFeatureTable } from '@ncsa/geo-explorer/explore/components/WFSFeatureTable';
import { AppDispatch, RootState } from '@ncsa/geo-explorer/store';
import { toggleLayerSettings } from '@ncsa/geo-explorer/store/explore/slice';
import { isVectorData } from '@ncsa/geo-explorer/types';

const TRANSITION_DURATION = 200;
const WIDTH_DETACHED = 727;
const HEIGHT_DETACHED = 368;

enum State {
  Attached = 'Attached',
  Detaching = 'Detaching',
  Detached = 'Detached',
  Dragged = 'Dragged',
}

export function MapLayerSettings() {
  const dispatch = useDispatch<AppDispatch>();

  const selectedLayer = useSelector((state: RootState) =>
    state.explore.mapLayers.find(
      (layer) => layer.data.layer_id === state.explore.selectedLayer,
    ),
  );

  const showLayerSettings = useSelector(
    (state: RootState) => state.explore.showLayerSettings,
  );

  const [state, setState] = useState(State.Attached);
  const [initialWidth, setInitialWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorOffsetXPercentage = useRef(0);
  const cursorOffsetYPercentage = useRef(0);

  const moveFloatingWindow = useCallback((e: MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    el.style.transform =
      'translate(' +
      `calc(${e.clientX}px - ${cursorOffsetXPercentage.current * 100}%)` +
      ',' +
      `calc(${e.clientY}px - ${cursorOffsetYPercentage.current * 100}%)` +
      ')';
  }, []);

  const onMouseDown: MouseEventHandler = useCallback(
    (e) => {
      const el = containerRef.current;
      if (!el) return;

      const bbox = containerRef.current.getBoundingClientRect();
      cursorOffsetXPercentage.current = (e.clientX - bbox.left) / bbox.width;
      cursorOffsetYPercentage.current = (e.clientY - bbox.top) / bbox.height;

      switch (state) {
        case State.Attached: {
          setInitialWidth(bbox.width);
          setState(State.Detaching);
          break;
        }
        case State.Detached: {
          el.style.transform =
            'translate(' +
            `calc(${e.clientX}px - ${cursorOffsetXPercentage.current * 100}%)` +
            ',' +
            `calc(${e.clientY}px - ${cursorOffsetYPercentage.current * 100}%)`;
          setState(State.Dragged);
          break;
        }
      }
    },
    [state],
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;

      const dockingActivated =
        e.clientY >= window.innerHeight - HEIGHT_DETACHED &&
        e.clientX >= SIDEBAR_WIDTH;

      switch (state) {
        case State.Detaching: {
          moveFloatingWindow(e);
          if (!dockingActivated) {
            setState(State.Dragged);
          }
          break;
        }
        case State.Dragged: {
          moveFloatingWindow(e);
          if (dockingActivated) {
            setState(State.Detaching);
          }
          break;
        }
      }
    };

    const onMouseUp = () => {
      const el = containerRef.current;
      if (!el) return;

      switch (state) {
        case State.Detaching: {
          setState(State.Attached);
          break;
        }
        case State.Dragged: {
          setState(State.Detached);
          break;
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [state]);

  const dragging = state === State.Detaching || state === State.Dragged;
  const floating = state === State.Dragged || state === State.Detached;

  const [styleSettingsOpen, setStyleSettingsOpen] = useState(false);

  if (!(selectedLayer && showLayerSettings)) return null;

  return (
    <>
      <Stack direction="column" className="w-full items-center">
        <Stack
          ref={containerRef}
          direction="column"
          className={classNames(
            'bg-white gap-[16px] px-[32px] py-[16px] box-border',
            floating
              ? 'fixed left-0 top-0 rounded-[12px] z-[1] shadow-[0_8px_20px_0_rgba(0,0,0,0.25)]'
              : 'transform-none',
            'transition-[width,height] ease-out',
            dragging ? 'cursor-grabbing select-none' : 'cursor-grab',
          )}
          sx={{
            transitionDuration: `${TRANSITION_DURATION}ms !important`,
            width:
              state === State.Detaching
                ? initialWidth
                : floating
                  ? WIDTH_DETACHED
                  : '100%',
            height: !isVectorData(selectedLayer)
              ? 'auto'
              : floating
                ? HEIGHT_DETACHED
                : LAYER_SETTINGS_HEIGHT,
          }}
          onMouseDown={onMouseDown}
        >
          <Header
            onOpenStyleSettings={() => setStyleSettingsOpen(true)}
            onClose={() => {
              dispatch(toggleLayerSettings());
              setState(State.Attached);
            }}
          />
          {selectedLayer.data.dataset_info.timestamps.length > 0 && (
            <TimeSelector />
          )}
          {isVectorData(selectedLayer) ? (
            <Box className="flex-1 min-h-0 cursor-auto">
              <WFSFeatureTable dataset={selectedLayer.data} />
            </Box>
          ) : null}
        </Stack>
      </Stack>
      <StyleSettings
        open={styleSettingsOpen}
        onClose={() => setStyleSettingsOpen(false)}
      />
    </>
  );
}

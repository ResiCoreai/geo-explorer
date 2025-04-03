import { Box, Stack } from '@mui/material';
import classNames from 'classnames';
import { useCallback, useEffect, useRef, useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LAYER_SETTINGS_HEIGHT, SIDEBAR_WIDTH } from '../../config';
import { Header } from '../../explore/MapLayerSettings/Header';
import { StyleSettings } from '../../explore/MapLayerSettings/StyleSettings';
import { TimeSelector } from '../../explore/MapLayerSettings/TimeSelector';
import { WFSFeatureTable } from '../../explore/components/WFSFeatureTable';
import { toggleLayerSettings } from '../../store/explore/slice';
import { isVectorData } from '../../utils/types';
const TRANSITION_DURATION = 200;
const WIDTH_DETACHED = 727;
const HEIGHT_DETACHED = 368;
var State;
(function (State) {
    State["Attached"] = "Attached";
    State["Detaching"] = "Detaching";
    State["Detached"] = "Detached";
    State["Dragged"] = "Dragged";
})(State || (State = {}));
export function MapLayerSettings() {
    const dispatch = useDispatch();
    const selectedLayer = useSelector((state) => state.explore.mapLayers.find((layer) => layer.data.layer_id === state.explore.selectedLayer));
    const showLayerSettings = useSelector((state) => state.explore.showLayerSettings);
    const [state, setState] = useState(State.Attached);
    const [initialWidth, setInitialWidth] = useState(0);
    const containerRef = useRef(null);
    const cursorOffsetXPercentage = useRef(0);
    const cursorOffsetYPercentage = useRef(0);
    const moveFloatingWindow = useCallback((e) => {
        const el = containerRef.current;
        if (!el)
            return;
        el.style.transform =
            'translate(' +
                `calc(${e.clientX}px - ${cursorOffsetXPercentage.current * 100}%)` +
                ',' +
                `calc(${e.clientY}px - ${cursorOffsetYPercentage.current * 100}%)` +
                ')';
    }, []);
    const onMouseDown = useCallback((e) => {
        const el = containerRef.current;
        if (!el)
            return;
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
    }, [state]);
    useEffect(() => {
        const onMouseMove = (e) => {
            const el = containerRef.current;
            if (!el)
                return;
            const dockingActivated = e.clientY >= window.innerHeight - HEIGHT_DETACHED &&
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
            if (!el)
                return;
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
    if (!(selectedLayer && showLayerSettings))
        return null;
    return (<>
      <Stack direction="column" className="w-full items-center">
        <Stack ref={containerRef} direction="column" className={classNames('bg-white gap-[16px] px-[32px] py-[16px] box-border', floating
            ? 'fixed left-0 top-0 rounded-[12px] z-[1] shadow-[0_8px_20px_0_rgba(0,0,0,0.25)]'
            : 'transform-none', 'transition-[width,height] ease-out', dragging ? 'cursor-grabbing select-none' : 'cursor-grab')} sx={{
            transitionDuration: `${TRANSITION_DURATION}ms !important`,
            width: state === State.Detaching
                ? initialWidth
                : floating
                    ? WIDTH_DETACHED
                    : '100%',
            height: !isVectorData(selectedLayer)
                ? 'auto'
                : floating
                    ? HEIGHT_DETACHED
                    : LAYER_SETTINGS_HEIGHT,
        }} onMouseDown={onMouseDown}>
          <Header onOpenStyleSettings={() => setStyleSettingsOpen(true)} onClose={() => {
            dispatch(toggleLayerSettings());
            setState(State.Attached);
        }}/>
          {selectedLayer.data.dataset_info.timestamps.length > 0 && (<TimeSelector />)}
          {isVectorData(selectedLayer) ? (<Box className="flex-1 min-h-0 cursor-auto">
              <WFSFeatureTable dataset={selectedLayer.data}/>
            </Box>) : null}
        </Stack>
      </Stack>
      <StyleSettings open={styleSettingsOpen} onClose={() => setStyleSettingsOpen(false)}/>
    </>);
}

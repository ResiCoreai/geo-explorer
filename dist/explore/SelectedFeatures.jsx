import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { Box, Button, Card, CardContent, Divider, IconButton, Typography, } from '@mui/material';
import { center } from '@turf/turf';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useMap } from 'react-map-gl/maplibre';
import { useDispatch, useSelector } from 'react-redux';
import { getLayerIconByCategory } from '../explore/Sidebar/utils/icons';
import { setShowLayerSettings } from '../store/explore/slice';
export function SelectedFeatures() {
    var _a;
    const { current: map } = useMap();
    const dispatch = useDispatch();
    const elRef = useRef(null);
    const features = useSelector((state) => state.explore.selectedFeatures);
    useEffect(() => {
        if (!map)
            return;
        const update = () => {
            var _a, _b;
            const firstFeature = features[0];
            if (!firstFeature)
                return;
            const pointFeature = center(firstFeature);
            const lon = (_a = pointFeature.geometry.coordinates[0]) !== null && _a !== void 0 ? _a : 0;
            const lat = (_b = pointFeature.geometry.coordinates[1]) !== null && _b !== void 0 ? _b : 0;
            const point = map.project([lon, lat]);
            if (elRef.current) {
                elRef.current.style.transform = `translate(${point.x - 160}px, ${point.y + 10}px)`;
            }
        };
        map.on('zoom', update);
        map.on('move', update);
        update();
        return () => {
            map.off('zoom', update);
            map.off('move', update);
        };
    }, [map, features]);
    const selectedLayer = useSelector((state) => state.explore.mapLayers.find((layer) => layer.data.layer_id === state.explore.selectedLayer));
    const [pageIndex, setPageIndex] = useState(0);
    const featureAttributes = useMemo(() => {
        return features.map((feature) => ({
            ...feature.properties,
            id: feature.id,
        }));
    }, [features]);
    if (featureAttributes.length === 0)
        return null;
    const current = featureAttributes[pageIndex];
    const keys = Object.keys(current !== null && current !== void 0 ? current : {});
    const handlePrev = () => {
        setPageIndex((prev) => (prev > 0 ? prev - 1 : prev));
    };
    const handleNext = () => {
        setPageIndex((prev) => prev < featureAttributes.length - 1 ? prev + 1 : prev);
    };
    const viewFullTable = () => {
        dispatch(setShowLayerSettings({ show: true }));
    };
    return (<Box className="absolute left-0 top-0 w-[320px]" ref={elRef}>
      <Box className="flex items-center justify-center">
        <svg width="16" height="10">
          <polygon fill="white" points="8,0 0,10, 16,10"/>
        </svg>
      </Box>

      {/* Card */}
      <Card className="rounded-md shadow-md overflow-hidden text-[14px] leading-[100%] tracking-[0.15px] p-2">
        <CardContent className="max-h-[500px] overflow-y-auto pt-2 pb-1">
          {/* Layer Title + Icon */}
          {selectedLayer && (<Box className="flex items-center gap-2 mb-3">
              {(_a = getLayerIconByCategory(selectedLayer)) === null || _a === void 0 ? void 0 : _a({
                className: 'w-[18px] h-[18px]',
            })}
              <Typography variant="h6" className="font-semibold text-[14px] leading-[100%] tracking-[0.15px]">
                {selectedLayer.data.display_name}
              </Typography>
            </Box>)}
          <Divider />

          {/* Attribute Table */}
          <Box className="grid grid-cols-2 gap-y-2 pt-2">
            {keys.map((key) => (<Fragment key={key}>
                <Box className="pr-2">
                  <Typography variant="body2" className="text-gray-500 font-normal text-[12px] tracking-[0.15px] leading-[100%] align-middle break-words">
                    {key.replace(/_/g, ' ')}
                  </Typography>
                </Box>
                <Box className="pl-2">
                  <Typography variant="body2" className="text-left font-normal text-[14px] tracking-[0.15px] leading-[100%] align-middle break-words">
                    {(current === null || current === void 0 ? void 0 : current[key]) != null ? String(current[key]) : ''}
                  </Typography>
                </Box>
                <Box className="col-span-2">
                  <Divider />
                </Box>
              </Fragment>))}
          </Box>
        </CardContent>

        {/* Pagination */}
        <Box className="bg-[#F3F4F6] px-1 flex items-center justify-between rounded-full mx-4 mt-2">
          <IconButton onClick={handlePrev} disabled={pageIndex === 0}>
            <ArrowBackIosNewIcon fontSize="small"/>
          </IconButton>

          <Typography variant="body2" className="text-gray-600 text-[14px] font-normal">
            {pageIndex + 1} of {featureAttributes.length}
          </Typography>

          <IconButton onClick={handleNext} disabled={pageIndex === featureAttributes.length - 1}>
            <ArrowForwardIosIcon fontSize="small"/>
          </IconButton>
        </Box>

        {/* View Full Table Button */}
        <Box className="flex justify-end py-2 px-2">
          <Button size="small" variant="text" endIcon={<TableChartOutlinedIcon />} className="!normal-case font-normal text-[14px] tracking-[0.15px]" onClick={viewFullTable}>
            View Full Table
          </Button>
        </Box>
      </Card>
    </Box>);
}

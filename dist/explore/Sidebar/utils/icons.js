import { jsx as _jsx } from "react/jsx-runtime";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import RouteIcon from '@mui/icons-material/Route';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
export const layerTypeIcons = {
    point: (props) => _jsx(ScatterPlotIcon, { ...props }),
    line: (props) => _jsx(RouteIcon, { ...props }),
    polygon: (props) => _jsx(DashboardIcon, { ...props }),
    raster: (props) => _jsx(ImageOutlinedIcon, { ...props }),
};
//# sourceMappingURL=icons.js.map
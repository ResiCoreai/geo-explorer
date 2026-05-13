import { formatSLD } from '../../explore/utils/format';
import { setLayerStyle } from '../../store/explore/slice';
export const setLayerStyleSLD = (layer_id, style) => {
    return async (dispatch) => {
        const styleSLD = await formatSLD(layer_id, style);
        dispatch(setLayerStyle({ layer_id, style, styleSLD }));
    };
};
//# sourceMappingURL=actions.js.map
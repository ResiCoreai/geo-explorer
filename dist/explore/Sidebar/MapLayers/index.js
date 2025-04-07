import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

import { Item } from '../../../explore/Sidebar/MapLayers/Item';
import { Section } from '../../../explore/Sidebar/Section';

export function MapLayers() {
  const currentIndex = useSelector((state) => state.explore.currentIndex);
  const selectedLayers = useSelector((state) => state.explore.mapLayers);
  return _jsx(Section, {
    icon: _jsx(LayersOutlinedIcon, { className: 'text-[20px]' }),
    title: 'Map layers',
    children: _jsxs('div', {
      className: 'h-full overflow-scroll no-scrollbar px-[20px]',
      children: [
        selectedLayers.map((layer, i) =>
          _jsxs(
            'div',
            {
              className: 'relative pt-1',
              children: [
                _jsx('div', {
                  className: classNames(
                    `absolute top-0 left-0 w-full h-[4px]`,
                    {
                      'bg-[#1976D2]': currentIndex === i,
                    },
                  ),
                }),
                _jsx(Item, { index: i, layer: layer }, layer.data.layer_id),
              ],
            },
            layer.data.layer_id,
          ),
        ),
        _jsx(
          'div',
          {
            className: classNames(`absolute top-0 left-0 w-full h-[4px]`, {
              'bg-[#1976D2]': currentIndex === selectedLayers.length,
            }),
          },
          selectedLayers.length,
        ),
      ],
    }),
  });
}

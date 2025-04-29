import { AddCircleOutline, RemoveCircle } from '@mui/icons-material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { IconButton } from '@mui/material';
import className from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@ncsa/geo-explorer/store';
import {
  addLayer,
  removeLayer,
  selectDataset,
} from '@ncsa/geo-explorer/store/explore/slice';
import { Dataset } from '@ncsa/geo-explorer/types';

export type TemporalLayerItemProps = {
  dataset: Dataset;
};

export function TemporalLayerItem({ dataset }: TemporalLayerItemProps) {
  const dispatch = useDispatch<AppDispatch>();
  const mapLayers = useSelector((state: RootState) => state.explore.mapLayers);

  const isSelected = mapLayers.some(
    (l) => l.data.layer_id === dataset.layer_id,
  );

  return (
    <div
      className={className(
        'group w-full flex flex-row items-center justify-between text-[14px] border border-solid',
        'rounded-md mb-2 transition-all duration-200',
        {
          'bg-[#F3F4F6] text-[#2C343C8A] border-[#D1D5DB]': isSelected,
          'bg-[#FFF] text-[#2C343C] border-[#D1D5DB] hover:border-[#13294B] hover:text-[#13294B]':
            !isSelected,
        },
      )}
    >
      {/* Left section: Icon + Name + Info */}
      <div className="flex flex-row gap-1 w-full flex-1 items-start ml-2 overflow-hidden">
        {/* Text Content */}
        <div className="flex flex-col min-w-0 overflow-hidden">
          <div
            className={className(
              'capitalize transition-all',
              'overflow-hidden text-ellipsis whitespace-nowrap',
              'group-hover:whitespace-normal group-hover:overflow-visible',
            )}
          >
            {dataset.display_name}
          </div>
        </div>
      </div>

      {/* Right section: Buttons */}
      <div className="flex flex-row items-center ml-2">
        <IconButton
          size="small"
          className={className(
            'opacity-0 group-hover:opacity-100 transition-opacity',
            {
              'text-[#2C343C8A]': isSelected,
              'text-inherit': !isSelected,
            },
          )}
          onClick={() => {
            dispatch(selectDataset({ layer_id: dataset.layer_id }));
          }}
        >
          <DescriptionOutlinedIcon />
        </IconButton>

        {isSelected ? (
          <IconButton
            size="small"
            className="text-[#2C343C8A]"
            onClick={() => {
              dispatch(removeLayer({ layer_id: dataset.layer_id }));
            }}
          >
            <RemoveCircle />
          </IconButton>
        ) : (
          <IconButton
            size="small"
            className="group-hover:opacity-100 group-hover:text-inherit"
            onClick={() => {
              dispatch(addLayer({ layer_id: dataset.layer_id }));
            }}
          >
            <AddCircleOutline />
          </IconButton>
        )}
      </div>
    </div>
  );
}

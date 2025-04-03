import { AddCircleOutline, RemoveCircle } from '@mui/icons-material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { IconButton } from '@mui/material';
import className from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { addLayer, removeLayer, selectDataset } from '../../../store/explore/slice';
export function TechItem({ dataset }) {
    const dispatch = useDispatch();
    const mapLayers = useSelector((state) => state.explore.mapLayers);
    const isSelected = mapLayers.some((l) => l.data.layer_id === dataset.layer_id);
    return (<div className={className('group w-full flex flex-row items-center justify-between text-[14px] border border-solid rounded-md mb-2' +
            ' transition-all duration-200', {
            'bg-[#F3F4F6] text-[#2C343C8A] border-[#D1D5DB]': isSelected,
            'text-[#2C343C] border-[#D1D5DB] hover:border-[#13294B] hover:text-[#13294B] hover:py-1': !isSelected,
        })}>
      {/*<div className="flex-auto min-w-0 whitespace-nowrap overflow-hidden text-ellipsis ml-2">*/}
      <div className={className('capitalize transition-all ml-2', 'overflow-hidden text-ellipsis whitespace-nowrap', 'group-hover:whitespace-normal group-hover:overflow-visible leading-[2em]')}>
        {dataset.display_name}
      </div>

      <div className="flex flex-row items-center mr-2">
        <IconButton size="small" className={className('opacity-0 group-hover:opacity-100 transition-opacity', {
            'text-[#2C343C8A]': isSelected,
            'text-inherit': !isSelected,
        })} onClick={() => {
            dispatch(selectDataset({ layer_id: dataset.layer_id }));
        }}>
          <DescriptionOutlinedIcon />
        </IconButton>

        {isSelected ? (<IconButton size="small" className="text-[#2C343C8A]" onClick={() => {
                dispatch(removeLayer({ layer_id: dataset.layer_id }));
            }}>
            <RemoveCircle />
          </IconButton>) : (<IconButton size="small" className="group-hover:opacity-100 group-hover:text-inherit" onClick={() => {
                dispatch(addLayer({ layer_id: dataset.layer_id }));
            }}>
            <AddCircleOutline />
          </IconButton>)}
      </div>
    </div>);
}

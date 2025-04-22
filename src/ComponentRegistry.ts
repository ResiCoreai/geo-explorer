import {
  SimpleLayerItem,
  SimpleLayerItemProps,
} from '@ncsa/geo-explorer/explore/Sidebar/DataInventory/SimpleLayerItem';

// TODO: need to add more
export interface ComponentRegistry {
  SimpleLayerItem: React.ComponentType<SimpleLayerItemProps>;
}

export const defaultComponents: ComponentRegistry = {
  SimpleLayerItem,
};

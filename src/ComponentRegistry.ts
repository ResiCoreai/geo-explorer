import {
  SimpleLayerItem,
  SimpleLayerItemProps,
} from '@ncsa/geo-explorer/explore/Sidebar/DataInventory/SimpleLayerItem';

export interface ComponentRegistry {
  SimpleLayerItem: React.ComponentType<SimpleLayerItemProps>;
}

export const defaultComponents: ComponentRegistry = {
  SimpleLayerItem,
};
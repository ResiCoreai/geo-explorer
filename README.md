# Geo-Explorer

Geo-Explorer is a web-based geospatial visualization library developed at NCSA and distributed as an installable NPM package. Designed as a lightweight and flexible alternative to desktop GIS tools like QGIS, it can be embedded into any modern React application to visualize and interact with geospatial data from OGC-compliant services.

## Overview

**Geo-Explorer** enables:
- Interactive map display (2D/3D pan, zoom, rotate)
- Vector, raster, and temporal layer (NetCDF) rendering via WMS
- Feature selection and highlighting via WFS
- Metadata-driven layer management (grouping, filtering, sorting)
- Feature table view linked to map interactions
- Temporal data visualization with slider and animation controls
- Custom styling 
- Dynamic legends

## Requirements

To use Geo-Explorer effectively:
- A GeoServer or equivalent OGC service endpoint supporting:
  - **WMS 1.3.0** for rendering layers
  - **WFS 2.0.0** for enabling feature selection (optional but recommended)

## Example Usage

### Basic Configuration
```tsx
<GeoExplorerProvider config={config} accessToken={authToken}>
  <GeoExplorer />
</GeoExplorerProvider>
```

- **`config`**: A structured JSON object describing available map layers, grouping, metadata, and temporal settings. This is passed via React context and drives the entire map configuration (e.g., what layers to load, how they're displayed).
  - An example can be found at [layer.json](https://github.com/ncsa/DACHub/blob/main/frontend/dist/layers.json) 
- **`accessToken`** *(optional)*: A JWT token used for authenticated access to protected OGC services. If your map services are public, you can omit this.

### Advanced: Register Custom Components
You can extend or override built-in components by passing them into `GeoExplorerProvider` via the `components` prop.

#### 1. Define and Register Custom Component

```tsx
import React from 'react';
import { SimpleLayerItemProps } from '@ncsa/geo-explorer/explore/Sidebar/DataInventory/SimpleLayerItem';

export const CustomLayerItem = ({ dataset }: SimpleLayerItemProps) => {
  return (
    <div style={{ padding: '8px', border: '1px solid gray' }}>
      <strong>{dataset.title}</strong>
    </div>
  );
};

export const customComponents = {
  SimpleLayerItem: CustomLayerItem,
};
```

#### 2. Pass Into Provider

```tsx
import { GeoExplorerProvider, GeoExplorer } from '@ncsa/geo-explorer';
import { customComponents } from './CustomComponents'; // from step 1

<ThemeProvider theme={theme}>
  <Stack direction="column" className="fixed top-0 left-0 right-0 bottom-0">
    <AppHeader />
    <GeoExplorerProvider
      config={config}
      accessToken={auth.user?.access_token}
      components={customComponents} // 👈 inject your custom component
    >
      <GeoExplorer />
    </GeoExplorerProvider>
  </Stack>
</ThemeProvider>
```

#### How It Works

Inside `GeoExplorerProvider`, your custom components are merged with the built-in ones:

```tsx
components: {
  ...defaultComponents,
  ...components
}
```

Anywhere inside the app that uses:

```tsx
const { SimpleLayerItem } = useContext(GeoExplorerContext).components;
```
will now render your version.

---

#### Registered Components (WIP)

Here’s a growing list of customizable components you can override:

| Key               | Props Type             | Description                                  |
|------------------|------------------------|----------------------------------------------|
| `SimpleLayerItem` | `SimpleLayerItemProps` | Renders an layer in the inventory layer list |


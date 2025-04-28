# Geo-Explorer

Geo-Explorer is a web-based geospatial visualization library developed at NCSA and distributed as an installable NPM
package. Designed as a lightweight and flexible alternative to desktop GIS tools like QGIS, it can be embedded into any
modern React application to visualize and interact with geospatial data from OGC-compliant services.

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

## Installation

Because `@ncsa/geo-explorer` is hosted in a **private GitHub Packages** registry, you must configure a valid `~/.npmrc` file with a GitHub token to install it:

```
//npm.pkg.github.com/:_authToken=ghp_{your_github_token}
@ncsa:registry=https://npm.pkg.github.com/
```

> 🔒 A GitHub personal access token (PAT) is required because the repository is private.

Once your `~/.npmrc` is set up:

1. Add `@ncsa/geo-explorer` to your app’s `package.json` dependencies:
   ```json
   {
     "dependencies": {
       "@ncsa/geo-explorer": "^x.y.z"
     }
   }
   ```

2. Then run:
   ```bash
   npm install
   ```

This will download `@ncsa/geo-explorer` from GitHub Packages into your project.

## Example Usage

### Basic Configuration

```tsx
<GeoExplorerProvider
    config={config}
    accessToken={authToken}
    isProtectedResource={((url: string) => boolean)}
>
    <GeoExplorer/>
</GeoExplorerProvider>
```

- **`config`**: A structured JSON object that defines the available map layers, grouping, metadata, styling, and
  temporal settings.  
  It is passed via React context and drives the entire map setup (e.g., which layers to load, how they are
  displayed).  
  An example configuration can be found [here](https://github.com/ncsa/DACHub/blob/main/frontend/dist/layers.json).

- **`accessToken`** *(optional)*: A JWT token for authenticated access to protected OGC (e.g., WMS/WFS) services.  
  If all services are public, this can be omitted.

- **`isProtectedResource`** *(optional)*: A function that determines whether a requested URL requires authentication.  
  It should return `true` for URLs that need the `accessToken` attached.  
  Example: `(url) => /geoserver/.test(url)` ensures that requests to paths containing `geoserver` are automatically
  secured.

### Advanced: Register Custom Components

You can extend or override built-in components by passing them into `GeoExplorerProvider` via the `components` prop.

#### 1. Define and Register Custom Component

```tsx
import React from 'react';
import {SimpleLayerItemProps} from '@ncsa/geo-explorer/explore/Sidebar/DataInventory/SimpleLayerItem';

export const CustomLayerItem = ({dataset}: SimpleLayerItemProps) => {
    return (
        <div style={{padding: '8px', border: '1px solid gray'}}>
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
import {GeoExplorerProvider, GeoExplorer} from '@ncsa/geo-explorer';
import {customComponents} from './CustomComponents'; // from step 1

<ThemeProvider theme={theme}>
    <Stack direction="column" className="fixed top-0 left-0 right-0 bottom-0">
        <AppHeader/>
        <GeoExplorerProvider
            config={config}
            accessToken={auth.user?.access_token}
            components={customComponents} // 👈 inject your custom component
        >
            <GeoExplorer/>
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
const {SimpleLayerItem} = useContext(GeoExplorerContext).components;
```

will now render your version.

---

#### Registered Components

Here’s a list of customizable components you can override:

| Key                     | Props Type                   | Description                                                                |
|-------------------------|------------------------------|----------------------------------------------------------------------------|
| `BaseMaps`              | `-`                          | Base maps selector                                                         |
| `CategoricalLegendIcon` | `CategoricalLegendIconProps` | Renders an icon representing categorical legends                           |
| `ClimateLayerSummary`   | `ClimateLayerSummaryProps`   | Displays summary information for a climate layer                           |
| `ClimateLegendIcon`     | `ClimateLegendIconProps`     | Renders an icon for climate-based legends                                  |
| `ColorInput`            | `ColorInputProps`            | Color picker input used in style settings                                  |
| `DatasetInfo`           | `-`                          | Displays basic information about a dataset                                 |
| `DatasetPreview`        | `-`                          | Previews dataset information                                               |
| `Header`                | `HeaderProps`                | Header section for layer settings panel                                    |
| `LegendPanel`           | `LegendPanelProps`           | Renders the map legend panel                                               |
| `MainMap`               | `-`                          | Main map component for rendering layers                                    |
| `MapLayerItem`          | `MapLayerItemProps`          | Renders individual map layer items in the sidebar                          |
| `MapLayers`             | `-`                          | Container for all layers displayed on the sidebar                          |
| `MapLayerSettings`      | `-`                          | Full layer settings panel                                                  |
| `NumberInput`           | `NumberInputProps`           | Numeric input used in style settings                                       |
| `RippleEffects`         | `RippleEffectsProps`         | Animation effects for ripple overlays for highlight selected feature       |
| `RippleOverlay`         | `-`                          | Overlay component for ripple visual effects for highlight selected feature |
| `SelectedFeatures`      | `-`                          | Displays selected features on the map                                      |
| `Sidebar`               | `-`                          | Main sidebar component                                                     |
| `SidebarSection`        | `SidebarSectionProps`        | A collapsible section inside the sidebar                                   |
| `SimpleLayerItem`       | `SimpleLayerItemProps`       | Renders a simple layer in the inventory list                               |
| `SimpleLayerList`       | `-`                          | Renders a list of simple (non-temporal) layers                             |
| `SingleLegendIcon`      | `SingleLegendIconProps`      | Renders a single legend icon                                               |
| `StyleSettings`         | `StyleSettingsProps`         | Settings panel for adjusting layer styles                                  |
| `TemporalLayerItem`     | `TemporalLayerItemProps`     | Renders a temporal layer item in the inventory                             |
| `TemporalLayerList`     | `TemporalLayerListProps`     | Renders a list of temporal layers                                          |
| `TimeSelector`          | `-`                          | Time selection UI for temporal layers                                      |
| `WFSFeatureTable`       | `WFSFeatureTableProps`       | Displays WFS features in a tabular format                                  |
| `WMSLayer`              | `WMSLayerProps`              | Renders a standard WMS layer                                               |
| `WMSLayerSimple`        | `WMSLayerSimpleProps`        | Renders a simple WMS layer                                                 |
| `WMSLayerTemporal`      | `WMSLayerTemporalProps`      | Renders a temporal WMS layer                                               |

### Advanced: Redux Store Overview

Geo-Explorer uses Redux internally to manage state for layer rendering, selection, basemaps, temporal control, and
styles. You can access or extend the state by connecting to the Redux store exposed through `GeoExplorerProvider`.

#### Store State

| State Key           | Type              | Description                                   |
|---------------------|-------------------|-----------------------------------------------|
| `prevIndex`         | `number`          | Used for layer reordering                     |
| `currentIndex`      | `number`          | Used for layer reordering                     |
| `dataInventory`     | `Dataset[]`       | List of static vector/raster datasets         |
| `climateInventory`  | `Dataset[]`       | List of temporal datasets                     |
| `baseMaps`          | `Basemap[]`       | Available base layers                         |
| `selectedDataset`   | `string \| null`  | Currently selected dataset                    |
| `mapLayers`         | `MapLayer[]`      | Active layers on the map                      |
| `selectedLayer`     | `string \| null`  | Layer currently shown in style/settings panel |
| `showLayerSettings` | `boolean`         | Toggle for layer style editor                 |
| `selectedBaseMap`   | `string \| null`  | Currently selected basemap                    |
| `selectedFeatures`  | `SimpleFeature[]` | Currently selected features from the map      |

#### Redux Actions

| Action                 | Purpose                                                         |
|------------------------|-----------------------------------------------------------------|
| `selectDataset`        | Set or reset the currently selected dataset                     |
| `selectMapLayer`       | Select a layer and show its settings panel                      |
| `toggleLayerSettings`  | Toggle visibility of the layer settings panel                   |
| `setShowLayerSettings` | Explicitly show/hide the layer settings panel                   |
| `selectBaseMap`        | Set the currently selected basemap                              |
| `addLayer`             | Add a dataset to the active map layers                          |
| `removeLayer`          | Remove a layer from the map                                     |
| `toggleVisibility`     | Show/hide a specific map layer                                  |
| `togglePlaying`        | Toggle animation for a temporal layer                           |
| `setTimestampIdx`      | Update time index for a temporal layer                          |
| `setSelectedFeatures`  | Set selected features (e.g. from WFS identify)                  |
| `setLayerStyle`        | Update layer style (style object + SLD string)                  |
| `resetLayerStyle`      | Reset a layer’s style to default                                |
| `reorderStart`         | Record the initial index when starting a drag/reorder operation |
| `reorderEnd`           | Apply reordering of layers                                      |
| `setCurrentIndex`      | Update the current drag index                                   |
| `initLayers`           | Initialize layers from config (data, climate, basemaps)         |

---

#### Async Thunks

These are useful for integrating with remote OGC services or performing side effects like styling conversion or feature
queries.

| Thunk Name             | Purpose                                                                                                  |
|------------------------|----------------------------------------------------------------------------------------------------------|
| `initLayersFromConfig` | Fetches initial layer settings (data, climate, basemaps) from the OGC client and dispatches `initLayers` |
| `identifyFeature`      | Performs a WFS `GetFeature` request at a given location and dispatches `setSelectedFeatures`             |
| `setLayerStyleSLD`     | Converts a layer style to SLD and dispatches `setLayerStyle` with both style object and SLD string       |

#### Example Usage

```ts
dispatch(initLayersFromConfig(ogcClient));
dispatch(identifyFeature(ogcClient, layerId, lngLat, zoom));
dispatch(setLayerStyleSLD(layerId, style));
```

> These thunks require access to an `OGCClient` instance for interacting with WMS/WFS endpoints.

---

## Local Setup (Contributors Only)

To develop against a local version of `@ncsa/geo-explorer`, follow these steps:

1. Link the local `@ncsa/geo-explorer` package:
   ```bash
   npm link
   ```

2. Link the package into your project (e.g., `dachub`):
   ```bash
   cd dachub/frontend
   npm link @ncsa/geo-explorer
   ```

3. To avoid duplicated copies of dependency libraries (e.g., `react`, `react-oidc-context`), run the below 
   command under the **root directory of Geo-Explorer**:
   ```bash
   npm link PATH_TO_YOUR_APP/node_modules/react
   ```
   Example:
   ```bash
   sh link /Users/{username}/Documents/Projects/DACHUB/dachub/frontend/node_modules/react
   ```
   For more information, see the [React documentation on duplicate React instances](https://legacy.reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react).


4. Finally, start the watcher to reflect changes made in `geo-explorer` immediately:
   ```bash
   npm run dev
   ```
   This runs:
   ```bash
   run-p tailwind:watch compile:watch
   ```
   so that Tailwind CSS and TypeScript code are automatically rebuilt on changes.

---

## Publish (Admins Only)

> ⚠️ **Important:**  
> Manual publishing is currently restricted to project admins. Contributors should **not** attempt to publish.  
> CI-based publishing is disabled until we automate proper versioning.

### Manual Publish Workflow

Before you publish, make sure you have checked and updated the [package version](https://github.com/ncsa/geo-explorer/pkgs/npm/geo-explorer) to avoid conflicts.

1. Build the project:
   ```bash
   npm run build
   ```

2. Publish the package:
   ```bash
   npm publish
   ```

3. Ensure your `~/.npmrc` is properly configured with your GitHub token to allow publishing to GitHub Packages:

   Example `~/.npmrc`:
   ```
   //npm.pkg.github.com/:_authToken=ghp_{your_github_token}
   @ncsa:registry=https://npm.pkg.github.com/
   ```

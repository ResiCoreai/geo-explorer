import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { Item } from "../../../explore/Sidebar/MapLayers/Item";
import { Section } from "../../../explore/Sidebar/Section";
export function MapLayers() {
  const currentIndex = useSelector((state) => state.explore.currentIndex);
  const selectedLayers = useSelector((state) => state.explore.mapLayers);
  return (
    <Section
      icon={<LayersOutlinedIcon className="text-[20px]" />}
      title="Map layers"
    >
      <div className="h-full overflow-scroll no-scrollbar px-[20px]">
        {selectedLayers.map((layer, i) => (
          <div key={layer.data.layer_id} className="relative pt-1">
            <div
              className={classNames(`absolute top-0 left-0 w-full h-[4px]`, {
                "bg-[#1976D2]": currentIndex === i,
              })}
            />
            <Item key={layer.data.layer_id} index={i} layer={layer} />
          </div>
        ))}
        <div
          key={selectedLayers.length}
          className={classNames(`absolute top-0 left-0 w-full h-[4px]`, {
            "bg-[#1976D2]": currentIndex === selectedLayers.length,
          })}
        />
      </div>
    </Section>
  );
}

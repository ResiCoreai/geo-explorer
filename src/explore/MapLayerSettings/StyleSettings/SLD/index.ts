import AlphaChannel from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/AlphaChannel.sld";
import AlternatingSymbols from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/AlternatingSymbols.sld";
import AttributeBasedLine from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/AttributeBasedLine.sld";
import AttributeBasedPoint from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/AttributeBasedPoint.sld";
import AttributeBasedPolygon from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/AttributeBasedPolygon.sld";
import DashedLine from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/DashedLine.sld";
import DiscreteColors from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/DiscreteColors.sld";
import GraphicFill from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/GraphicFill.sld";
import HatchingFill from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/HatchingFill.sld";
import HighContrast from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/HighContrast.sld";
import LabelFollowingLine from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/LabelFollowingLine.sld";
import LabelHalo from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/LabelHalo.sld";
import LineWithBorder from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/LineWithBorder.sld";
import LineWithDefaultLabel from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/LineWithDefaultLabel.sld";
import ManyColorGradient from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/ManyColorGradient.sld";
import OffsetInnerLines from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/OffsetInnerLines.sld";
import OffsetLine from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/OffsetLine.sld";
import OptimizedLabel from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/OptimizedLabel.sld";
import PointAsGraphic from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/PointAsGraphic.sld";
import PointWithDefaultLabel from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/PointWithDefaultLabel.sld";
import PointWithRotatedLabel from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/PointWithRotatedLabel.sld";
import PointWithStyledLabel from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/PointWithStyledLabel.sld";
import PolygonWithDefaultLabel from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/PolygonWithDefaultLabel.sld";
import PolygonWithStyledLabel from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/PolygonWithStyledLabel.sld";
import Railroad from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/Railroad.sld";
import RotatedSquare from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/RotatedSquare.sld";
import SimpleLine from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/SimpleLine.sld";
import SimplePoint from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/SimplePoint.sld";
import SimplePointWithStroke from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/SimplePointWithStroke.sld";
import SimplePolygon from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/SimplePolygon.sld";
import SimplePolygonWithStroke from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/SimplePolygonWithStroke.sld";
import SpacedGraphicSymbols from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/SpacedGraphicSymbols.sld";
import ThreeColorGradient from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/ThreeColorGradient.sld";
import TransparentGradient from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/TransparentGradient.sld";
import TransparentTriangle from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/TransparentTriangle.sld";
import TwoColorGradient from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/TwoColorGradient.sld";
import ZoomBasedPolygon from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/SLD/ZoomBasedPolygon.sld";

type Style = {
  featureType: "point" | "line" | "polygon" | "raster";
  name: string;
  sld: string;
};

export const allStyles: Style[] = [
  {
    featureType: "point",
    name: "SimplePoint",
    sld: SimplePoint,
  },
  {
    featureType: "point",
    name: "SimplePointWithStroke",
    sld: SimplePointWithStroke,
  },
  {
    featureType: "point",
    name: "RotatedSquare",
    sld: RotatedSquare,
  },
  {
    featureType: "point",
    name: "TransparentTriangle",
    sld: TransparentTriangle,
  },
  {
    featureType: "point",
    name: "PointAsGraphic",
    sld: PointAsGraphic,
  },
  {
    featureType: "point",
    name: "PointWithDefaultLabel",
    sld: PointWithDefaultLabel,
  },
  {
    featureType: "point",
    name: "PointWithStyledLabel",
    sld: PointWithStyledLabel,
  },
  {
    featureType: "point",
    name: "PointWithRotatedLabel",
    sld: PointWithRotatedLabel,
  },
  {
    featureType: "point",
    name: "AttributeBasedPoint",
    sld: AttributeBasedPoint,
  },
  {
    featureType: "line",
    name: "SimpleLine",
    sld: SimpleLine,
  },
  {
    featureType: "line",
    name: "LineWithBorder",
    sld: LineWithBorder,
  },
  {
    featureType: "line",
    name: "DashedLine",
    sld: DashedLine,
  },
  {
    featureType: "line",
    name: "OffsetLine",
    sld: OffsetLine,
  },
  {
    featureType: "line",
    name: "Railroad",
    sld: Railroad,
  },
  {
    featureType: "line",
    name: "SpacedGraphicSymbols",
    sld: SpacedGraphicSymbols,
  },
  {
    featureType: "line",
    name: "AlternatingSymbols",
    sld: AlternatingSymbols,
  },
  {
    featureType: "line",
    name: "LineWithDefaultLabel",
    sld: LineWithDefaultLabel,
  },
  {
    featureType: "line",
    name: "LabelFollowingLine",
    sld: LabelFollowingLine,
  },
  {
    featureType: "line",
    name: "OptimizedLabel",
    sld: OptimizedLabel,
  },
  {
    featureType: "line",
    name: "AttributeBasedLine",
    sld: AttributeBasedLine,
  },
  {
    featureType: "polygon",
    name: "SimplePolygon",
    sld: SimplePolygon,
  },
  {
    featureType: "polygon",
    name: "SimplePolygonWithStroke",
    sld: SimplePolygonWithStroke,
  },
  {
    featureType: "polygon",
    name: "OffsetInnerLines",
    sld: OffsetInnerLines,
  },
  {
    featureType: "polygon",
    name: "GraphicFill",
    sld: GraphicFill,
  },
  {
    featureType: "polygon",
    name: "HatchingFill",
    sld: HatchingFill,
  },
  {
    featureType: "polygon",
    name: "PolygonWithDefaultLabel",
    sld: PolygonWithDefaultLabel,
  },
  {
    featureType: "polygon",
    name: "LabelHalo",
    sld: LabelHalo,
  },
  {
    featureType: "polygon",
    name: "PolygonWithStyledLabel",
    sld: PolygonWithStyledLabel,
  },
  {
    featureType: "polygon",
    name: "AttributeBasedPolygon",
    sld: AttributeBasedPolygon,
  },
  {
    featureType: "polygon",
    name: "ZoomBasedPolygon",
    sld: ZoomBasedPolygon,
  },
  {
    featureType: "raster",
    name: "TwoColorGradient",
    sld: TwoColorGradient,
  },
  {
    featureType: "raster",
    name: "TransparentGradient",
    sld: TransparentGradient,
  },
  {
    featureType: "raster",
    name: "HighContrast",
    sld: HighContrast,
  },
  {
    featureType: "raster",
    name: "ThreeColorGradient",
    sld: ThreeColorGradient,
  },
  {
    featureType: "raster",
    name: "AlphaChannel",
    sld: AlphaChannel,
  },
  {
    featureType: "raster",
    name: "DiscreteColors",
    sld: DiscreteColors,
  },
  {
    featureType: "raster",
    name: "ManyColorGradient",
    sld: ManyColorGradient,
  },
];

//////////////////////////////////
//Auto-generated. Do NOT modify!//
//////////////////////////////////

import { MessageKey, QueryKey, Type, EnumType, registerSymbol } from '../../Signum/React/Reflection'
import * as Entities from '../../Signum/React/Signum.Entities'
import * as DynamicQuery from '../../Signum/React/Signum.DynamicQuery'
import * as Basics from '../../Signum/React/Signum.Basics'
import * as Queries from '../Signum.UserAssets/Signum.UserAssets.Queries'

import { FilterOptionParsed, OrderOptionParsed, FilterRequest, OrderRequest } from '@framework/FindOptions'

//Partial
export interface ChartRequestModel {
  queryKey: string;
  
  filterOptions: FilterOptionParsed[];

  filters: FilterRequest[];
}

export interface ChartScriptParameterEmbedded {
  enumValues: { name: string, typeFilter : ChartColumnType }[];
}



export const ChartColumnEmbedded: Type<ChartColumnEmbedded> = new Type<ChartColumnEmbedded>("ChartColumnEmbedded");
export interface ChartColumnEmbedded extends Entities.EmbeddedEntity {
  Type: "ChartColumnEmbedded";
  token: Queries.QueryTokenEmbedded | null;
  displayName: string | null;
  format: string | null;
  orderByIndex: number | null;
  orderByType: DynamicQuery.OrderType | null;
}

export module ChartColumnMessage {
  export const SplitLines: MessageKey = new MessageKey("ChartColumnMessage", "SplitLines");
  export const Height: MessageKey = new MessageKey("ChartColumnMessage", "Height");
  export const Height2: MessageKey = new MessageKey("ChartColumnMessage", "Height2");
  export const Height3: MessageKey = new MessageKey("ChartColumnMessage", "Height3");
  export const Height4: MessageKey = new MessageKey("ChartColumnMessage", "Height4");
  export const Height5: MessageKey = new MessageKey("ChartColumnMessage", "Height5");
  export const Line: MessageKey = new MessageKey("ChartColumnMessage", "Line");
  export const Dimension1: MessageKey = new MessageKey("ChartColumnMessage", "Dimension1");
  export const Dimension2: MessageKey = new MessageKey("ChartColumnMessage", "Dimension2");
  export const Dimension3: MessageKey = new MessageKey("ChartColumnMessage", "Dimension3");
  export const Dimension4: MessageKey = new MessageKey("ChartColumnMessage", "Dimension4");
  export const Dimension5: MessageKey = new MessageKey("ChartColumnMessage", "Dimension5");
  export const Dimension6: MessageKey = new MessageKey("ChartColumnMessage", "Dimension6");
  export const Dimension7: MessageKey = new MessageKey("ChartColumnMessage", "Dimension7");
  export const Dimension8: MessageKey = new MessageKey("ChartColumnMessage", "Dimension8");
  export const Angle: MessageKey = new MessageKey("ChartColumnMessage", "Angle");
  export const Sections: MessageKey = new MessageKey("ChartColumnMessage", "Sections");
  export const Areas: MessageKey = new MessageKey("ChartColumnMessage", "Areas");
  export const ColorCategory: MessageKey = new MessageKey("ChartColumnMessage", "ColorCategory");
  export const LocationCode: MessageKey = new MessageKey("ChartColumnMessage", "LocationCode");
  export const Location: MessageKey = new MessageKey("ChartColumnMessage", "Location");
  export const ColorScale: MessageKey = new MessageKey("ChartColumnMessage", "ColorScale");
  export const Opacity: MessageKey = new MessageKey("ChartColumnMessage", "Opacity");
  export const Date: MessageKey = new MessageKey("ChartColumnMessage", "Date");
  export const Latitude: MessageKey = new MessageKey("ChartColumnMessage", "Latitude");
  export const Longitude: MessageKey = new MessageKey("ChartColumnMessage", "Longitude");
  export const Weight: MessageKey = new MessageKey("ChartColumnMessage", "Weight");
  export const Bubble: MessageKey = new MessageKey("ChartColumnMessage", "Bubble");
  export const Size: MessageKey = new MessageKey("ChartColumnMessage", "Size");
  export const Parent: MessageKey = new MessageKey("ChartColumnMessage", "Parent");
  export const Columns: MessageKey = new MessageKey("ChartColumnMessage", "Columns");
  export const Label: MessageKey = new MessageKey("ChartColumnMessage", "Label");
  export const Icon: MessageKey = new MessageKey("ChartColumnMessage", "Icon");
  export const Title: MessageKey = new MessageKey("ChartColumnMessage", "Title");
  export const Info: MessageKey = new MessageKey("ChartColumnMessage", "Info");
  export const SplitBars: MessageKey = new MessageKey("ChartColumnMessage", "SplitBars");
  export const Width: MessageKey = new MessageKey("ChartColumnMessage", "Width");
  export const Width2: MessageKey = new MessageKey("ChartColumnMessage", "Width2");
  export const Width3: MessageKey = new MessageKey("ChartColumnMessage", "Width3");
  export const Width4: MessageKey = new MessageKey("ChartColumnMessage", "Width4");
  export const Width5: MessageKey = new MessageKey("ChartColumnMessage", "Width5");
  export const SplitColumns: MessageKey = new MessageKey("ChartColumnMessage", "SplitColumns");
  export const HorizontalAxis: MessageKey = new MessageKey("ChartColumnMessage", "HorizontalAxis");
  export const HorizontalAxis2: MessageKey = new MessageKey("ChartColumnMessage", "HorizontalAxis2");
  export const HorizontalAxis3: MessageKey = new MessageKey("ChartColumnMessage", "HorizontalAxis3");
  export const HorizontalAxis4: MessageKey = new MessageKey("ChartColumnMessage", "HorizontalAxis4");
  export const VerticalAxis2: MessageKey = new MessageKey("ChartColumnMessage", "VerticalAxis2");
  export const VerticalAxis: MessageKey = new MessageKey("ChartColumnMessage", "VerticalAxis");
  export const VerticalAxis3: MessageKey = new MessageKey("ChartColumnMessage", "VerticalAxis3");
  export const VerticalAxis4: MessageKey = new MessageKey("ChartColumnMessage", "VerticalAxis4");
  export const Value: MessageKey = new MessageKey("ChartColumnMessage", "Value");
  export const Value2: MessageKey = new MessageKey("ChartColumnMessage", "Value2");
  export const Value3: MessageKey = new MessageKey("ChartColumnMessage", "Value3");
  export const Value4: MessageKey = new MessageKey("ChartColumnMessage", "Value4");
  export const Point: MessageKey = new MessageKey("ChartColumnMessage", "Point");
  export const Bars: MessageKey = new MessageKey("ChartColumnMessage", "Bars");
  export const Color: MessageKey = new MessageKey("ChartColumnMessage", "Color");
  export const InnerSize: MessageKey = new MessageKey("ChartColumnMessage", "InnerSize");
  export const Order: MessageKey = new MessageKey("ChartColumnMessage", "Order");
  export const Square: MessageKey = new MessageKey("ChartColumnMessage", "Square");
}

export const ChartColumnType: EnumType<ChartColumnType> = new EnumType<ChartColumnType>("ChartColumnType");
export type ChartColumnType =
  "Integer" |
  "Real" |
  "DateOnly" |
  "DateTime" |
  "String" |
  "Lite" |
  "Enum" |
  "RealGroupable" |
  "Time" |
  "Magnitude" |
  "Groupable" |
  "Positionable" |
  "Any";

export module ChartMessage {
  export const _0CanOnlyBeCreatedFromTheChartWindow: MessageKey = new MessageKey("ChartMessage", "_0CanOnlyBeCreatedFromTheChartWindow");
  export const _0CanOnlyBeCreatedFromTheSearchWindow: MessageKey = new MessageKey("ChartMessage", "_0CanOnlyBeCreatedFromTheSearchWindow");
  export const Chart: MessageKey = new MessageKey("ChartMessage", "Chart");
  export const ChartToken: MessageKey = new MessageKey("ChartMessage", "ChartToken");
  export const ChartSettings: MessageKey = new MessageKey("ChartMessage", "ChartSettings");
  export const Dimension: MessageKey = new MessageKey("ChartMessage", "Dimension");
  export const DrawChart: MessageKey = new MessageKey("ChartMessage", "DrawChart");
  export const Group: MessageKey = new MessageKey("ChartMessage", "Group");
  export const Query0IsNotAllowed: MessageKey = new MessageKey("ChartMessage", "Query0IsNotAllowed");
  export const ToggleInfo: MessageKey = new MessageKey("ChartMessage", "ToggleInfo");
  export const ColorsFor0: MessageKey = new MessageKey("ChartMessage", "ColorsFor0");
  export const CreatePalette: MessageKey = new MessageKey("ChartMessage", "CreatePalette");
  export const MyCharts: MessageKey = new MessageKey("ChartMessage", "MyCharts");
  export const CreateNew: MessageKey = new MessageKey("ChartMessage", "CreateNew");
  export const Edit: MessageKey = new MessageKey("ChartMessage", "Edit");
  export const ApplyChanges: MessageKey = new MessageKey("ChartMessage", "ApplyChanges");
  export const ViewPalette: MessageKey = new MessageKey("ChartMessage", "ViewPalette");
  export const ChartFor: MessageKey = new MessageKey("ChartMessage", "ChartFor");
  export const ChartOf0: MessageKey = new MessageKey("ChartMessage", "ChartOf0");
  export const _0IsKeyBut1IsAnAggregate: MessageKey = new MessageKey("ChartMessage", "_0IsKeyBut1IsAnAggregate");
  export const _0ShouldBeAnAggregate: MessageKey = new MessageKey("ChartMessage", "_0ShouldBeAnAggregate");
  export const _0ShouldBeSet: MessageKey = new MessageKey("ChartMessage", "_0ShouldBeSet");
  export const _0ShouldBeNull: MessageKey = new MessageKey("ChartMessage", "_0ShouldBeNull");
  export const _0IsNot1: MessageKey = new MessageKey("ChartMessage", "_0IsNot1");
  export const _0IsAnAggregateButTheChartIsNotGrouping: MessageKey = new MessageKey("ChartMessage", "_0IsAnAggregateButTheChartIsNotGrouping");
  export const _0IsNotOptional: MessageKey = new MessageKey("ChartMessage", "_0IsNotOptional");
  export const SavePalette: MessageKey = new MessageKey("ChartMessage", "SavePalette");
  export const NewPalette: MessageKey = new MessageKey("ChartMessage", "NewPalette");
  export const Data: MessageKey = new MessageKey("ChartMessage", "Data");
  export const ChooseABasePalette: MessageKey = new MessageKey("ChartMessage", "ChooseABasePalette");
  export const DeletePalette: MessageKey = new MessageKey("ChartMessage", "DeletePalette");
  export const Preview: MessageKey = new MessageKey("ChartMessage", "Preview");
  export const TypeNotFound: MessageKey = new MessageKey("ChartMessage", "TypeNotFound");
  export const Type0NotFoundInTheDatabase: MessageKey = new MessageKey("ChartMessage", "Type0NotFoundInTheDatabase");
  export const Reload: MessageKey = new MessageKey("ChartMessage", "Reload");
  export const Maximize: MessageKey = new MessageKey("ChartMessage", "Maximize");
  export const Minimize: MessageKey = new MessageKey("ChartMessage", "Minimize");
  export const ShowChartSettings: MessageKey = new MessageKey("ChartMessage", "ShowChartSettings");
  export const HideChartSettings: MessageKey = new MessageKey("ChartMessage", "HideChartSettings");
  export const QueryResultReachedMaxRows0: MessageKey = new MessageKey("ChartMessage", "QueryResultReachedMaxRows0");
  export const ListView: MessageKey = new MessageKey("ChartMessage", "ListView");
}

export const ChartParameterEmbedded: Type<ChartParameterEmbedded> = new Type<ChartParameterEmbedded>("ChartParameterEmbedded");
export interface ChartParameterEmbedded extends Entities.EmbeddedEntity {
  Type: "ChartParameterEmbedded";
  name: string;
  value: string | null;
}

export module ChartParameterGroupMessage {
  export const Stroke: MessageKey = new MessageKey("ChartParameterGroupMessage", "Stroke");
  export const Number: MessageKey = new MessageKey("ChartParameterGroupMessage", "Number");
  export const Opacity: MessageKey = new MessageKey("ChartParameterGroupMessage", "Opacity");
  export const ColorScale: MessageKey = new MessageKey("ChartParameterGroupMessage", "ColorScale");
  export const ColorCategory: MessageKey = new MessageKey("ChartParameterGroupMessage", "ColorCategory");
  export const Margin: MessageKey = new MessageKey("ChartParameterGroupMessage", "Margin");
  export const Circle: MessageKey = new MessageKey("ChartParameterGroupMessage", "Circle");
  export const Shape: MessageKey = new MessageKey("ChartParameterGroupMessage", "Shape");
  export const Color: MessageKey = new MessageKey("ChartParameterGroupMessage", "Color");
  export const Arrange: MessageKey = new MessageKey("ChartParameterGroupMessage", "Arrange");
  export const ShowValue: MessageKey = new MessageKey("ChartParameterGroupMessage", "ShowValue");
  export const Url: MessageKey = new MessageKey("ChartParameterGroupMessage", "Url");
  export const Location: MessageKey = new MessageKey("ChartParameterGroupMessage", "Location");
  export const Fill: MessageKey = new MessageKey("ChartParameterGroupMessage", "Fill");
  export const Map: MessageKey = new MessageKey("ChartParameterGroupMessage", "Map");
  export const Label: MessageKey = new MessageKey("ChartParameterGroupMessage", "Label");
  export const ColorGradient: MessageKey = new MessageKey("ChartParameterGroupMessage", "ColorGradient");
  export const Margins: MessageKey = new MessageKey("ChartParameterGroupMessage", "Margins");
  export const Points: MessageKey = new MessageKey("ChartParameterGroupMessage", "Points");
  export const Numbers: MessageKey = new MessageKey("ChartParameterGroupMessage", "Numbers");
  export const Performance: MessageKey = new MessageKey("ChartParameterGroupMessage", "Performance");
  export const Zoom: MessageKey = new MessageKey("ChartParameterGroupMessage", "Zoom");
  export const FillColor: MessageKey = new MessageKey("ChartParameterGroupMessage", "FillColor");
  export const Size: MessageKey = new MessageKey("ChartParameterGroupMessage", "Size");
  export const InnerSize: MessageKey = new MessageKey("ChartParameterGroupMessage", "InnerSize");
  export const ShowPercent: MessageKey = new MessageKey("ChartParameterGroupMessage", "ShowPercent");
  export const Scale: MessageKey = new MessageKey("ChartParameterGroupMessage", "Scale");
}

export module ChartParameterMessage {
  export const CompleteValues: MessageKey = new MessageKey("ChartParameterMessage", "CompleteValues");
  export const Scale: MessageKey = new MessageKey("ChartParameterMessage", "Scale");
  export const Labels: MessageKey = new MessageKey("ChartParameterMessage", "Labels");
  export const LabelsMargin: MessageKey = new MessageKey("ChartParameterMessage", "LabelsMargin");
  export const NumberOpacity: MessageKey = new MessageKey("ChartParameterMessage", "NumberOpacity");
  export const NumberColor: MessageKey = new MessageKey("ChartParameterMessage", "NumberColor");
  export const ColorCategory: MessageKey = new MessageKey("ChartParameterMessage", "ColorCategory");
  export const HorizontalScale: MessageKey = new MessageKey("ChartParameterMessage", "HorizontalScale");
  export const VerticalScale: MessageKey = new MessageKey("ChartParameterMessage", "VerticalScale");
  export const UnitMargin: MessageKey = new MessageKey("ChartParameterMessage", "UnitMargin");
  export const NumberMinWidth: MessageKey = new MessageKey("ChartParameterMessage", "NumberMinWidth");
  export const CircleStroke: MessageKey = new MessageKey("ChartParameterMessage", "CircleStroke");
  export const CircleRadius: MessageKey = new MessageKey("ChartParameterMessage", "CircleRadius");
  export const CircleAutoReduce: MessageKey = new MessageKey("ChartParameterMessage", "CircleAutoReduce");
  export const CircleRadiusHover: MessageKey = new MessageKey("ChartParameterMessage", "CircleRadiusHover");
  export const Color: MessageKey = new MessageKey("ChartParameterMessage", "Color");
  export const Interpolate: MessageKey = new MessageKey("ChartParameterMessage", "Interpolate");
  export const MapType: MessageKey = new MessageKey("ChartParameterMessage", "MapType");
  export const MapStyle: MessageKey = new MessageKey("ChartParameterMessage", "MapStyle");
  export const AnimateDrop: MessageKey = new MessageKey("ChartParameterMessage", "AnimateDrop");
  export const AnimateOnClick: MessageKey = new MessageKey("ChartParameterMessage", "AnimateOnClick");
  export const InfoLinkPosition: MessageKey = new MessageKey("ChartParameterMessage", "InfoLinkPosition");
  export const ClusterMap: MessageKey = new MessageKey("ChartParameterMessage", "ClusterMap");
  export const ColorScale: MessageKey = new MessageKey("ChartParameterMessage", "ColorScale");
  export const ColorInterpolation: MessageKey = new MessageKey("ChartParameterMessage", "ColorInterpolation");
  export const LabelMargin: MessageKey = new MessageKey("ChartParameterMessage", "LabelMargin");
  export const NumberSizeLimit: MessageKey = new MessageKey("ChartParameterMessage", "NumberSizeLimit");
  export const FillOpacity: MessageKey = new MessageKey("ChartParameterMessage", "FillOpacity");
  export const ColorInterpolate: MessageKey = new MessageKey("ChartParameterMessage", "ColorInterpolate");
  export const StrokeColor: MessageKey = new MessageKey("ChartParameterMessage", "StrokeColor");
  export const StrokeWidth: MessageKey = new MessageKey("ChartParameterMessage", "StrokeWidth");
  export const Scale1: MessageKey = new MessageKey("ChartParameterMessage", "Scale1");
  export const Scale2: MessageKey = new MessageKey("ChartParameterMessage", "Scale2");
  export const Scale3: MessageKey = new MessageKey("ChartParameterMessage", "Scale3");
  export const Scale4: MessageKey = new MessageKey("ChartParameterMessage", "Scale4");
  export const Scale5: MessageKey = new MessageKey("ChartParameterMessage", "Scale5");
  export const Scale6: MessageKey = new MessageKey("ChartParameterMessage", "Scale6");
  export const Scale7: MessageKey = new MessageKey("ChartParameterMessage", "Scale7");
  export const Scale8: MessageKey = new MessageKey("ChartParameterMessage", "Scale8");
  export const InnerRadious: MessageKey = new MessageKey("ChartParameterMessage", "InnerRadious");
  export const Sort: MessageKey = new MessageKey("ChartParameterMessage", "Sort");
  export const SvgUrl: MessageKey = new MessageKey("ChartParameterMessage", "SvgUrl");
  export const LocationSelector: MessageKey = new MessageKey("ChartParameterMessage", "LocationSelector");
  export const LocationAttribute: MessageKey = new MessageKey("ChartParameterMessage", "LocationAttribute");
  export const LocationMatch: MessageKey = new MessageKey("ChartParameterMessage", "LocationMatch");
  export const ColorScaleMaxValue: MessageKey = new MessageKey("ChartParameterMessage", "ColorScaleMaxValue");
  export const NoDataColor: MessageKey = new MessageKey("ChartParameterMessage", "NoDataColor");
  export const StartDate: MessageKey = new MessageKey("ChartParameterMessage", "StartDate");
  export const Opacity: MessageKey = new MessageKey("ChartParameterMessage", "Opacity");
  export const RadiousPx: MessageKey = new MessageKey("ChartParameterMessage", "RadiousPx");
  export const SizeScale: MessageKey = new MessageKey("ChartParameterMessage", "SizeScale");
  export const TopMargin: MessageKey = new MessageKey("ChartParameterMessage", "TopMargin");
  export const RightMargin: MessageKey = new MessageKey("ChartParameterMessage", "RightMargin");
  export const ShowLabel: MessageKey = new MessageKey("ChartParameterMessage", "ShowLabel");
  export const LabelColor: MessageKey = new MessageKey("ChartParameterMessage", "LabelColor");
  export const ForceColor: MessageKey = new MessageKey("ChartParameterMessage", "ForceColor");
  export const SubTotal: MessageKey = new MessageKey("ChartParameterMessage", "SubTotal");
  export const Placeholder: MessageKey = new MessageKey("ChartParameterMessage", "Placeholder");
  export const MultiValueFormat: MessageKey = new MessageKey("ChartParameterMessage", "MultiValueFormat");
  export const Complete: MessageKey = new MessageKey("ChartParameterMessage", "Complete");
  export const Order: MessageKey = new MessageKey("ChartParameterMessage", "Order");
  export const Gradient: MessageKey = new MessageKey("ChartParameterMessage", "Gradient");
  export const CSSStyle: MessageKey = new MessageKey("ChartParameterMessage", "CSSStyle");
  export const CSSStyleDiv: MessageKey = new MessageKey("ChartParameterMessage", "CSSStyleDiv");
  export const MaxTextLength: MessageKey = new MessageKey("ChartParameterMessage", "MaxTextLength");
  export const ShowCreateButton: MessageKey = new MessageKey("ChartParameterMessage", "ShowCreateButton");
  export const ShowAggregateValues: MessageKey = new MessageKey("ChartParameterMessage", "ShowAggregateValues");
  export const PointSize: MessageKey = new MessageKey("ChartParameterMessage", "PointSize");
  export const DrawingMode: MessageKey = new MessageKey("ChartParameterMessage", "DrawingMode");
  export const MinZoom: MessageKey = new MessageKey("ChartParameterMessage", "MinZoom");
  export const MaxZoom: MessageKey = new MessageKey("ChartParameterMessage", "MaxZoom");
  export const CompleteHorizontalValues: MessageKey = new MessageKey("ChartParameterMessage", "CompleteHorizontalValues");
  export const CompleteVerticalValues: MessageKey = new MessageKey("ChartParameterMessage", "CompleteVerticalValues");
  export const Shape: MessageKey = new MessageKey("ChartParameterMessage", "Shape");
  export const XMargin: MessageKey = new MessageKey("ChartParameterMessage", "XMargin");
  export const HorizontalLineColor: MessageKey = new MessageKey("ChartParameterMessage", "HorizontalLineColor");
  export const VerticalLineColor: MessageKey = new MessageKey("ChartParameterMessage", "VerticalLineColor");
  export const XSort: MessageKey = new MessageKey("ChartParameterMessage", "XSort");
  export const YSort: MessageKey = new MessageKey("ChartParameterMessage", "YSort");
  export const FillColor: MessageKey = new MessageKey("ChartParameterMessage", "FillColor");
  export const OpacityScale: MessageKey = new MessageKey("ChartParameterMessage", "OpacityScale");
  export const InnerSizeType: MessageKey = new MessageKey("ChartParameterMessage", "InnerSizeType");
  export const InnerFillColor: MessageKey = new MessageKey("ChartParameterMessage", "InnerFillColor");
  export const Stack: MessageKey = new MessageKey("ChartParameterMessage", "Stack");
  export const ValueAsPercent: MessageKey = new MessageKey("ChartParameterMessage", "ValueAsPercent");
  export const HorizontalMargin: MessageKey = new MessageKey("ChartParameterMessage", "HorizontalMargin");
  export const Padding: MessageKey = new MessageKey("ChartParameterMessage", "Padding");
  export const Zoom: MessageKey = new MessageKey("ChartParameterMessage", "Zoom");
  export const Value: MessageKey = new MessageKey("ChartParameterMessage", "Value");
  export const Percent: MessageKey = new MessageKey("ChartParameterMessage", "Percent");
  export const Total: MessageKey = new MessageKey("ChartParameterMessage", "Total");
}

export const ChartParameterType: EnumType<ChartParameterType> = new EnumType<ChartParameterType>("ChartParameterType");
export type ChartParameterType =
  "Enum" |
  "Number" |
  "String" |
  "Special";

export module ChartPermission {
  export const ViewCharting : Basics.PermissionSymbol = registerSymbol("Permission", "ChartPermission.ViewCharting");
}

export const ChartRequestModel: Type<ChartRequestModel> = new Type<ChartRequestModel>("ChartRequestModel");
export interface ChartRequestModel extends Entities.ModelEntity {
  Type: "ChartRequestModel";
  chartScript: ChartScriptSymbol;
  columns: Entities.MList<ChartColumnEmbedded>;
  parameters: Entities.MList<ChartParameterEmbedded>;
  maxRows: number | null;
  chartTimeSeries: ChartTimeSeriesEmbedded | null;
}

export const ChartScriptSymbol: Type<ChartScriptSymbol> = new Type<ChartScriptSymbol>("ChartScript");
export interface ChartScriptSymbol extends Basics.Symbol {
  Type: "ChartScript";
}

export const ChartTimeSeriesEmbedded: Type<ChartTimeSeriesEmbedded> = new Type<ChartTimeSeriesEmbedded>("ChartTimeSeriesEmbedded");
export interface ChartTimeSeriesEmbedded extends Entities.EmbeddedEntity {
  Type: "ChartTimeSeriesEmbedded";
  startDate: string | null;
  endDate: string | null;
  timeSeriesUnit: DynamicQuery.TimeSeriesUnit | null;
  timeSeriesStep: number | null;
  timeSeriesMaxRowsPerStep: number | null;
}

export module D3ChartScript {
  export const Bars : ChartScriptSymbol = registerSymbol("ChartScript", "D3ChartScript.Bars");
  export const Columns : ChartScriptSymbol = registerSymbol("ChartScript", "D3ChartScript.Columns");
  export const Line : ChartScriptSymbol = registerSymbol("ChartScript", "D3ChartScript.Line");
  export const MultiBars : ChartScriptSymbol = registerSymbol("ChartScript", "D3ChartScript.MultiBars");
  export const MultiColumns : ChartScriptSymbol = registerSymbol("ChartScript", "D3ChartScript.MultiColumns");
  export const MultiLines : ChartScriptSymbol = registerSymbol("ChartScript", "D3ChartScript.MultiLines");
  export const StackedBars : ChartScriptSymbol = registerSymbol("ChartScript", "D3ChartScript.StackedBars");
  export const StackedColumns : ChartScriptSymbol = registerSymbol("ChartScript", "D3ChartScript.StackedColumns");
  export const StackedLines : ChartScriptSymbol = registerSymbol("ChartScript", "D3ChartScript.StackedLines");
  export const Pie : ChartScriptSymbol = registerSymbol("ChartScript", "D3ChartScript.Pie");
  export const BubblePack : ChartScriptSymbol = registerSymbol("ChartScript", "D3ChartScript.BubblePack");
  export const Scatterplot : ChartScriptSymbol = registerSymbol("ChartScript", "D3ChartScript.Scatterplot");
  export const Bubbleplot : ChartScriptSymbol = registerSymbol("ChartScript", "D3ChartScript.Bubbleplot");
  export const ParallelCoordinates : ChartScriptSymbol = registerSymbol("ChartScript", "D3ChartScript.ParallelCoordinates");
  export const Punchcard : ChartScriptSymbol = registerSymbol("ChartScript", "D3ChartScript.Punchcard");
  export const CalendarStream : ChartScriptSymbol = registerSymbol("ChartScript", "D3ChartScript.CalendarStream");
  export const Treemap : ChartScriptSymbol = registerSymbol("ChartScript", "D3ChartScript.Treemap");
}

export module GoogleMapsChartScript {
  export const Heatmap : ChartScriptSymbol = registerSymbol("ChartScript", "GoogleMapsChartScript.Heatmap");
  export const Markermap : ChartScriptSymbol = registerSymbol("ChartScript", "GoogleMapsChartScript.Markermap");
}

export module HtmlChartScript {
  export const PivotTable : ChartScriptSymbol = registerSymbol("ChartScript", "HtmlChartScript.PivotTable");
}

export const SpecialParameterType: EnumType<SpecialParameterType> = new EnumType<SpecialParameterType>("SpecialParameterType");
export type SpecialParameterType =
  "ColorCategory" |
  "ColorInterpolate";

export module SvgMapsChartScript {
  export const SvgMap : ChartScriptSymbol = registerSymbol("ChartScript", "SvgMapsChartScript.SvgMap");
}


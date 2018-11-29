import * as React from "react";

import { DefaultLinkWidget } from "storm-react-diagrams";

import { ReactDatabaseDiagramLinkModel } from "../models/LinkModel";

interface IReactDatabaseDiagramLinkWidgetProps {
  model: ReactDatabaseDiagramLinkModel;
  path: string;
  selected: boolean;
  defaultWidget: DefaultLinkWidget;
}

/**
 * Diagram Link Widget
 *
 * @class ReactDatabaseDiagramLinkWidget
 * @extends {React.Component<IReactDatabaseDiagramLinkWidgetProps>}
 */
export class ReactDatabaseDiagramLinkWidget extends React.Component<IReactDatabaseDiagramLinkWidgetProps> {
  public path: SVGPathElement;
  public circle: SVGCircleElement;
  public callback: () => any;
  public percent: number;
  public handle: any;
  public mounted: boolean;

  constructor(props: any) {
    super(props);
    this.percent = 0;
  }

  public render() {
    return (
      <>
        <path
          ref={ref => {
            this.path = ref!;
          }}
          className={
            this.props.selected
              ? this.props.defaultWidget.bem("--path-selected")
              : ""
          }
          strokeWidth={this.props.model.width}
          stroke="rgba(0,0,0,0.5)"
          d={this.props.path}
        />
      </>
    );
  }
}

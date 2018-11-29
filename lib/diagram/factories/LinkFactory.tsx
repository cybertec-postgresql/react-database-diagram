import * as React from "react";

import { DefaultLinkFactory, DefaultLinkWidget } from "storm-react-diagrams";

import { ReactDatabaseDiagramLinkModel } from "../models/LinkModel";
import { ReactDatabaseDiagramLinkWidget } from "../widgets/LinkWidget";

/**
 * Diagram Link Factory
 *
 * @class ReactDatabaseDiagramLinkFactory
 * @extends {DefaultLinkFactory}
 */
export class ReactDatabaseDiagramLinkFactory extends DefaultLinkFactory {
  constructor() {
    super();

    this.type = "react-database-diagram";
  }

  public getNewInstance(): ReactDatabaseDiagramLinkModel {
    return new ReactDatabaseDiagramLinkModel();
  }

  public generateLinkSegment(
    model: ReactDatabaseDiagramLinkModel,
    widget: DefaultLinkWidget,
    selected: boolean,
    path: string,
  ) {
    return (
      <g>
        <ReactDatabaseDiagramLinkWidget
          model={model}
          path={path}
          selected={selected}
          defaultWidget={widget}
        />
      </g>
    );
  }
}

export default ReactDatabaseDiagramLinkFactory;

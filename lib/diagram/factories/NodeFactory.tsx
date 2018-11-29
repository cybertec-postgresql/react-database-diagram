import * as React from "react";
import { AbstractNodeFactory, DiagramEngine } from "storm-react-diagrams";

import { ReactDatabaseDiagramNodeModel } from "../models/NodeModel";
import { ReactDatabaseDiagramNodeWidget } from "../widgets/NodeWidget";

/**
 * Diagram Node Factory
 *
 * @class ReactDatabaseDiagramNodeFactory
 * @extends {AbstractNodeFactory}
 */
export class ReactDatabaseDiagramNodeFactory extends AbstractNodeFactory {
  constructor() {
    super("react-database-diagram");
  }

  public generateReactWidget(
    diagramEngine: DiagramEngine,
    node: ReactDatabaseDiagramNodeModel,
  ) {
    return (
      <ReactDatabaseDiagramNodeWidget node={node} engine={diagramEngine} />
    );
  }

  public getNewInstance() {
    return new ReactDatabaseDiagramNodeModel();
  }
}

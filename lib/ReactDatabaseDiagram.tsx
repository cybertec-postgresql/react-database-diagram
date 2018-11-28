import * as React from "react";

import * as _ from "lodash";

import {
  DiagramEngine,
  DiagramModel,
  DiagramProps,
  DiagramWidget,
  LinkModel,
} from "storm-react-diagrams";
import "storm-react-diagrams/dist/style.min.css";

import { ISerializedDiagram } from "./interfaces/diagram";
import { IDatabaseTable } from "./interfaces/table";

import { ReactDatabaseDiagramLinkFactory } from "./diagram/factories/LinkFactory";
import { ReactDatabaseDiagramNodeFactory } from "./diagram/factories/NodeFactory";
import { ReactDatabaseDiagramPortFactory } from "./diagram/factories/PortFactory";
import { ReactDatabaseDiagramNodeModel } from "./diagram/models/NodeModel";
import { ReactDatabaseDiagramPortModel } from "./diagram/models/PortModel";

import { distributeElements } from "./utils/dagreUtils";

import "./styles/ReactDatabaseDiagram.css";

interface IReactDatabaseDiagramProps {
  schema: IDatabaseTable[];
}

class ReactDatabaseDiagram extends React.Component<
  IReactDatabaseDiagramProps,
  {}
> {
  public count: number = 0;
  public engine: DiagramEngine;
  public model: DiagramModel;
  private sceneNodes: Map<string, ReactDatabaseDiagramNodeModel> = new Map<
    string,
    ReactDatabaseDiagramNodeModel
  >();
  private sceneLinks: LinkModel[] = [];

  constructor(props: IReactDatabaseDiagramProps) {
    super(props);

    this.registerEngine();
  }

  public componentDidMount() {
    this.engine.zoomToFit();
  }

  public registerEngine = () => {
    this.engine = new DiagramEngine();
    this.engine.installDefaultFactories();

    this.engine.registerPortFactory(
      new ReactDatabaseDiagramPortFactory(
        "react-database-diagram",
        () => new ReactDatabaseDiagramPortModel(),
      ),
    );
    this.engine.registerLinkFactory(new ReactDatabaseDiagramLinkFactory());

    this.engine.registerNodeFactory(new ReactDatabaseDiagramNodeFactory());
    this.model = new DiagramModel();
    this.updateDiagram();
    this.engine.setDiagramModel(this.model);
  };

  // Add table to Scene only if it's not there already
  public addToScene = (
    table: IDatabaseTable,
    index: number,
    child?: boolean,
  ) => {
    const key = `${table.table_schema}-${table.table_name}`;

    if (this.sceneNodes.has(key)) {
      return this.sceneNodes.get(key);
    }

    const node = new ReactDatabaseDiagramNodeModel(table);
    this.sceneNodes.set(key, node);

    if (child) {
      node.y = 250;
    }

    node.x = index * 230;

    this.model.addNode(node);

    return node;
  };

  public updateDiagram() {
    // Link each child node to its parent
    _.each(this.props.schema, (table, index) => {
      const parentPort = this.addToScene(table, index)!.getPort("bottom");

      _.each(table.foreign_keys, (tableName, indexChild) => {
        const foreignTable = this.props.schema[
          _.findIndex(this.props.schema, { table_name: tableName.toTable })
        ];

        const childPort = this.addToScene(
          foreignTable,
          indexChild,
          true,
        )!.getPort("top");
        const link = parentPort!.link(childPort!);

        this.sceneLinks.push(link);
      });
    });

    this.model.addAll(...this.sceneLinks);
    this.getDistributedModel(this.engine, this.model);
  }

  public getDistributedModel = (engine: DiagramEngine, model: DiagramModel) => {
    const serialized: ISerializedDiagram = model.serializeDiagram();
    const distributedSerializedDiagram = distributeElements(serialized);

    // Deserialize the model
    const deSerializedModel: DiagramModel = new DiagramModel();

    deSerializedModel.deSerializeDiagram(distributedSerializedDiagram, engine);

    return deSerializedModel;
  };

  public render() {
    const props = {
      diagramEngine: this.engine,
      allowLooseLinks: false,
      allowCanvasTranslation: true,
      allowCanvasZoom: true,
      maxNumberPointsPerLink: 0,
      smartRouting: true,
    } as DiagramProps;

    return (
      <DiagramWidget className="react-database-diagram-canvas" {...props} />
    );
  }
}

export default ReactDatabaseDiagram;

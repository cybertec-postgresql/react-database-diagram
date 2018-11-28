import * as _ from "lodash";

import { DiagramEngine, NodeModel, PortModel } from "storm-react-diagrams";

import { IDatabaseTable } from "../../interfaces/table";

import { ReactDatabaseDiagramPortModel } from "./PortModel";

export class ReactDatabaseDiagramNodeModel extends NodeModel {
  public ports: {
    [s: string]: ReactDatabaseDiagramPortModel;
  };
  public data: IDatabaseTable;

  constructor(data?: IDatabaseTable) {
    super("react-database-diagram");

    this.addPort(new ReactDatabaseDiagramPortModel("top"));
    this.addPort(new ReactDatabaseDiagramPortModel("right"));
    this.addPort(new ReactDatabaseDiagramPortModel("bottom"));
    this.addPort(new ReactDatabaseDiagramPortModel("left"));

    this.data = data!;
  }

  public serialize() {
    return _.merge(super.serialize(), {
      data: this.data,
    });
  }

  public deSerialize(ob: any, engine: DiagramEngine) {
    super.deSerialize(ob, engine);

    this.x = ob.x;
    this.y = ob.y;
    this.data = ob.data;

    _.forEach(ob.ports, port => {
      const portOb: PortModel = engine
        .getPortFactory(port.type)
        .getNewInstance();
      portOb.deSerialize(port, engine);
      this.addPort(portOb);
    });
  }

  public getPort(name: string): ReactDatabaseDiagramPortModel | null {
    return this.ports[name];
  }

  public getPorts(): { [s: string]: ReactDatabaseDiagramPortModel } {
    return this.ports;
  }

  public getInPorts() {
    return _.filter(this.ports, portModel => portModel.in);
  }

  public getOutPorts() {
    return _.filter(this.ports, portModel => !portModel.in);
  }
}

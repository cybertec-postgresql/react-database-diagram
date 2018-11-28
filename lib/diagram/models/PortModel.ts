import * as _ from "lodash";

import { DiagramEngine, LinkModel, PortModel } from "storm-react-diagrams";

import { ReactDatabaseDiagramLinkModel } from "./LinkModel";

export class ReactDatabaseDiagramPortModel extends PortModel {
  public in: boolean;
  public label: string;
  public position: string;

  constructor(pos = "top") {
    super(pos, "react-database-diagram");
    this.position = pos;
  }

  public deSerialize(data: any, engine: DiagramEngine) {
    super.deSerialize(data, engine);

    this.position = data.position;
  }

  public serialize() {
    return _.merge(super.serialize(), {
      in: this.in,
      label: this.label,
      position: this.position,
    });
  }

  public link(port: PortModel): LinkModel {
    const link = this.createLinkModel();
    link.setSourcePort(this);
    link.setTargetPort(port);
    return link;
  }

  public createLinkModel(): LinkModel {
    const link = super.createLinkModel();
    return link || new ReactDatabaseDiagramLinkModel();
  }
}

import * as _ from "lodash";

import { DefaultLinkModel } from "storm-react-diagrams";

/**
 *
 *
 * @class ReactDatabaseDiagramLinkModel
 * @extends {DefaultLinkModel}
 */
export class ReactDatabaseDiagramLinkModel extends DefaultLinkModel {
  constructor(type: string = "react-database-diagram") {
    super(type);
    this.width = 2;
  }
}

export default ReactDatabaseDiagramLinkModel;

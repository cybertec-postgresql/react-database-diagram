import { AbstractPortFactory, PortModel } from "storm-react-diagrams";

/**
 * Diagram Port Factory
 *
 * @class ReactDatabaseDiagramPortFactory
 * @extends {AbstractPortFactory}
 */
export class ReactDatabaseDiagramPortFactory extends AbstractPortFactory {
  public cb: (initialConfig?: any) => PortModel;

  constructor(type: string, cb: (initialConfig?: any) => PortModel) {
    super(type);

    this.cb = cb;
  }

  public getNewInstance(initialConfig?: any): PortModel {
    return this.cb(initialConfig);
  }
}

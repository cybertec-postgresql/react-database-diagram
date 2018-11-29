import * as React from "react";

import * as _ from "lodash";

import {
  BaseWidget,
  BaseWidgetProps,
  DefaultLabelModel,
  DefaultLabelWidget,
  DiagramEngine,
  PortWidget,
} from "storm-react-diagrams";

import { IColumn, IDatabaseTable } from "../../interfaces/table";

import { ReactDatabaseDiagramNodeModel } from "../models/NodeModel";

export interface IReactDatabaseDiagramNodeWidgetProps extends BaseWidgetProps {
  node: ReactDatabaseDiagramNodeModel;
  engine: DiagramEngine;
}

export interface IReactDatabaseDiagramWidgetState {
  primaryKeys: IColumn[];
  foreignKeys: IColumn[];
  restColumns: IColumn[];
}

/**
 * Diagram Node Widget
 *
 * @class ReactDatabaseDiagramNodeWidget
 * @extends {BaseWidget<IReactDatabaseDiagramNodeWidgetProps, IReactDatabaseDiagramWidgetState>}
 */
export class ReactDatabaseDiagramNodeWidget extends BaseWidget<
  IReactDatabaseDiagramNodeWidgetProps,
  IReactDatabaseDiagramWidgetState
> {
  public static defaultProps: IReactDatabaseDiagramNodeWidgetProps = {
    node: new ReactDatabaseDiagramNodeModel(),
    engine: new DiagramEngine(),
  };

  public columns: IColumn[];

  constructor(props: IReactDatabaseDiagramNodeWidgetProps) {
    super("react-database-diagram-node", props);
  }

  public componentWillMount() {
    this.extractData(this.props.node.data);
  }

  public generatePort(port: DefaultLabelModel) {
    return <DefaultLabelWidget model={port} key={port.id} />;
  }

  public makeDataColumns = (columns: IColumn[]) => {
    return _.map(columns, column =>
      _.merge(column, _.find(this.columns, { name: column.name })),
    );
  };

  public extractData = (data: IDatabaseTable) => {
    this.columns = _.get(data, "columns");

    let primaryKeys = _.map(_.get(data, "primary_keys"), name => ({ name }));
    primaryKeys = this.makeDataColumns(primaryKeys);

    let foreignKeys: IColumn[] = _.map(
      _.sortBy(_.flatMap(_.get(data, "foreign_keys"), "fromColumns")),
      column => ({ name: column }),
    );
    foreignKeys = _.differenceBy(foreignKeys, primaryKeys, "name");
    foreignKeys = this.makeDataColumns(foreignKeys);

    let restColumns: IColumn[] = _.differenceBy(
      _.map(_.flatMap(this.columns, "name"), name => ({ name })),
      primaryKeys,
      foreignKeys,
      "name",
    );
    restColumns = this.makeDataColumns(restColumns);

    this.setState({
      primaryKeys,
      foreignKeys,
      restColumns,
    });
  };

  public render() {
    const { node } = this.props;
    const { primaryKeys, foreignKeys, restColumns } = this.state;

    return (
      <div {...this.getProps()} className={`${this.bem("")}`}>
        <div
          style={{
            position: "absolute",
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <PortWidget name="top" node={node} />
        </div>
        <div
          style={{
            position: "absolute",
            zIndex: 10,
            right: 0,
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <PortWidget name="right" node={node} />
        </div>
        <div
          style={{
            position: "absolute",
            zIndex: 10,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <PortWidget name="bottom" node={node} />
        </div>
        <div
          style={{
            position: "absolute",
            zIndex: 10,
            left: 0,
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <PortWidget name="left" node={node} />
        </div>

        <div  className={`${this.bem("__title")}`}>
          <div className={`${this.bem("__name")}`}>
            {node.data.table_name}
          </div>
        </div>
        <div >
          <div className={`${this.bem("__columns")}`}>
            {primaryKeys.map((column, index) => (
              <div
                className={`${this.bem("__column")}`}
                key={index}
              >
                <div
                  className={`${this.bem("__columnType--PK")} ${this.bem(
                    "__text--bold",
                  )}`}
                >
                  PK
                </div>
                <div
                  className={`${this.bem("__columnName--PK")} ${this.bem(
                    "__text--bold",
                  )}`}
                >
                  {column.name} : <span>{column.type}</span>
                </div>
              </div>
            ))}
            {foreignKeys.map((column, index) => (
              <div
                className={`${this.bem("__column")}`}
                key={index}
              >
                <div
                  className={`${this.bem("__columnType")} ${this.bem(
                    "__text--italic",
                  )}`}
                >
                  FK
                </div>
                <div  className={`${this.bem("__columnName")}`}>
                  {column.name} :{" "}
                  <span className={`${this.bem("__text--italic")}`}>
                    {column.type}
                  </span>
                </div>
              </div>
            ))}
            {restColumns.map((column, index) => (
              <div
                className={`${this.bem("__column")}`}
                key={index}
              >
                <div  className={`${this.bem("__columnType")}`} />
                <div  className={`${this.bem("__columnName")}`}>
                  {column.name} :{" "}
                  <span className={`${this.bem("__text--italic")}`}>
                    {column.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ReactDatabaseDiagramNodeWidget;

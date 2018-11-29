import * as _ from "lodash";

import * as dagre from "dagre";

import { ILink, INode, ISerializedDiagram } from "../interfaces/diagram";

import { ReactDatabaseDiagramNodeModel } from "../diagram/models/NodeModel";

interface IMapElementMetadata {
  id: string;
  width: number;
  height: number;
}

interface IMapElement {
  id: string;
  metadata: IMapElementMetadata;
}

interface IMapEdge {
  from: string;
  to: string;
}

const size = {
  width: 200,
  height: 200,
};

/**
 * Distribute elements of Diagram model to organize
 * properly
 *
 * @param model
 * @returns distributedModel
 */
export const distributeElements = (model: ISerializedDiagram) => {
  const clonedModel = _.cloneDeep(model);
  const nodes = distributeGraph(clonedModel);

  nodes.forEach((node: ReactDatabaseDiagramNodeModel) => {
    const modelNode = clonedModel.nodes.find(
      (item: INode) => item.id === node.id,
    )!;
    modelNode.x = node.x;
    modelNode.y = node.y;
  });

  return clonedModel;
};

/**
 *
 *
 * @param {ISerializedDiagram} model
 * @returns graphNodes
 */
const distributeGraph = (model: ISerializedDiagram) => {
  const nodes = mapElements(model);
  const edges = mapEdges(model);
  const graph = new dagre.graphlib.Graph();

  graph.setGraph({});
  graph.setDefaultEdgeLabel(() => ({}));

  // add elements to dagre graph
  nodes.forEach((node: IMapElement) => {
    graph.setNode(node.id, node.metadata);
  });

  edges.forEach((edge: IMapEdge) => {
    if (edge.from && edge.to) {
      graph.setEdge(edge.from, edge.to);
    }
  });

  // auto-distribute
  dagre.layout(graph);

  return graph.nodes().map((node: any) => graph.node(node));
};

const mapElements = (model: ISerializedDiagram): IMapElement[] => {
  // dagre compatible format
  return model.nodes.map((node: INode) => ({
    id: node.id,
    metadata: { ...size, id: node.id },
  }));
};

/**
 *
 *
 * @param {ISerializedDiagram} model
 * @returns {IMapEdge[]}
 */
const mapEdges = (model: ISerializedDiagram): IMapEdge[] => {
  // returns links which connects nodes
  // we check are there both from and to nodes in the model. Sometimes links can be detached
  return model.links
    .map((link: ILink) => ({
      from: link.source,
      to: link.target,
    }))
    .filter(
      (item: any) =>
        model.nodes.find((node: any) => node.id === item.from) &&
        model.nodes.find((node: any) => node.id === item.to),
    );
};

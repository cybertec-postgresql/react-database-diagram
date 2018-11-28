interface IId {
  id: string;
}

interface ITypeAndSelected {
  type: string;
  selected: boolean;
}

interface IOffsets {
  offsetX: number;
  offsetY: number;
}

interface IPoints extends IId, ITypeAndSelected {
  x: number;
  y: number;
}

type ILabels = IId & ITypeAndSelected & IOffsets;

export interface ILink extends IId {
  type: string;
  selected: boolean;
  source: string;
  sourcePort: string;
  target: string;
  targetPort: string;
  points: IPoints[];
  extras: {};
  labels: ILabels[];
}

interface IPort extends IId, ITypeAndSelected {
  name: string;
  parentNode: string;
  links: string[];
  maximumLinks: number;
}

export interface INode extends IId, ITypeAndSelected, IPoints {
  extras: any;
  ports: IPort[];
}

export interface ISerializedDiagram extends IId, IOffsets {
  zoom: number;
  gridSize: number;
  links: ILink[];
  nodes: INode[];
}

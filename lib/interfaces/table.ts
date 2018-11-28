export interface IColumn {
  name: string;
  type?: string;
}

export interface IForeignKey {
  toTable: string;
  toSchema: string;
  toColumns: string[];
  fromColumns: string[];
}

export interface IDatabaseTable {
  table_schema: string;
  table_name: string;
  columns: IColumn[];
  foreign_keys: IForeignKey[];
  primary_keys: string[];
}

export default IDatabaseTable;

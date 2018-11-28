import * as React from "react";
import * as ReactDOM from "react-dom";

import DatabaseDiagram, { IDatabaseTable } from "react-database-diagram";

const schema = [
  {
    columns: [
      { name: "a", type: "integer" },
      { name: "b", type: "integer" },
      { name: "c", type: "integer" }
    ],
    table_name: "t1",
    foreign_keys: [
      {
        toTable: "t2",
        toSchema: "public",
        toColumns: ["c"],
        fromColumns: ["c"]
      },
      {
        toTable: "t3",
        toSchema: "public",
        toColumns: ["a", "b"],
        fromColumns: ["a", "b"]
      }
    ],
    primary_keys: ["a"],
    table_schema: "cypex_generated"
  },
  {
    columns: [{ name: "c", type: "integer" }],
    table_name: "t2",
    foreign_keys: [],
    table_schema: "cypex_generated"
  },
  {
    primary_keys: ["a"],
    columns: [{ name: "a", type: "integer" }, { name: "b", type: "integer" }],
    table_name: "t3",
    foreign_keys: [],
    table_schema: "cypex_generated"
  },
  {
    primary_keys: ["id"],
    columns: [
      { name: "id", type: "integer" },
      { name: "text", type: "text" },
      { name: "state", type: "text" }
    ],
    table_name: "table",
    foreign_keys: [],
    table_schema: "cypex_generated"
  }
] as IDatabaseTable[];

ReactDOM.render(
  <DatabaseDiagram schema={schema} />,
  document.getElementById("react-database-diagram")
);

import React from "react";
import "./viewCategory.css";

export default function ViewCategory() {
  return (
    <div>
      <div
        className="displayBox"
        style={{ marginTop: "140px", marginLeft: "20px" }}
      >
        <table className="table-content">
          <tr>
            <th>heading 01</th>
            <th>heading 01</th>
            <th>heading 01</th>
            <th>EDIT</th>
            <th>DELETE</th>
          </tr>
          <tr>
            <td>data</td>
            <td>data</td>
            <td>data</td>
          </tr>
          <tr>
            <td>data</td>
            <td>data</td>
            <td>data</td>
          </tr>
          <tr>
            <td>data</td>
            <td>data</td>
            <td>data</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

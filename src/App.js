import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [twoDMatrix, setTwoDMatrix] = useState([]);
  const [start, setStart] = useState([]);
  const [end, setEnd] = useState([]);

  const prepareTwoMatrix = () => {
    const matrix = [];

    for (let i = 0; i <= 9; i++) {
      for (let j = 0; j <= 9; j++) {
        const obj = {
          pos: [i, j],
          isColor: false,
        };
        matrix.push(obj);
      }
    }
    setTwoDMatrix(matrix);
  };

  const handleOnDrag = (e, pos) => {
    setStart(pos);
    prepareTwoMatrix();
  };

  const handleOnDragOver = (e, pos) => {
    setEnd(pos);
  };

  useEffect(() => {
    prepareTwoMatrix();
  }, []);

  const fillColor = (startPos, endPos) => {
    const [startRow, startCol] = startPos;
    const [endRow, endCol] = endPos;
    const selectedGrid = [];

    for (let i = startRow; i <= endRow; i++) {
      for (let j = startCol; j <= endCol; j++) {
        selectedGrid.push([i, j].join(""));
      }
    }

    let copyMat = [...twoDMatrix];
    copyMat = copyMat.map((item) => {
      const { pos } = item;
      const stringPos = pos.join("");
      if (selectedGrid.includes(stringPos)) {
        item.isColor = true;
      }
      return item;
    });
    console.log(selectedGrid);
    console.log(copyMat);
    setTwoDMatrix(copyMat);
  };

  useEffect(() => {
    if (start.length > 1 && end.length > 1) {
      fillColor(start, end);
    }
  }, [start, end]);

  return (
    <div className="App">
      <h1>Selectable Grid</h1>
      <div className="grid">
        <div className="board">
          {twoDMatrix?.map((item, i) => (
            <div
              key={i}
              draggable
              className={`cell ${item.isColor && "selected-cell"}`}
              onDrag={(e) => handleOnDrag(e, item.pos)}
              onDragOver={(e) => handleOnDragOver(e, item.pos)}
            >
              {item.pos}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

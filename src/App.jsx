import { useEffect, useState } from "react";

function App() {
  const [dots, setDots] = useState([]);
  const [removedDots, setRemovedDots] = useState([]);

  function handleClick(e) {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const dot = {
      top: e.clientY,
      left: e.clientX,
      randomColor,
    };
    setDots((prev) => [...prev, dot]);
    setRemovedDots([]);
  }

  function undo(e) {
    e.stopPropagation();
    console.log("undo");
    if (dots.length === 0) {
      return;
    }
    const lastDot = dots[dots.length - 1];
    setRemovedDots((prev) => [...prev, lastDot]);
    setDots((prev) => {
      const newArr = [...prev].slice(0, -1);
      return newArr;
    });
  }

  function redo(e) {
    e.stopPropagation();
    console.log("redo");
    if (removedDots.length === 0) {
      return;
    }
    const dot = removedDots[removedDots.length - 1];
    setDots((prev) => [...prev, dot]);
    setRemovedDots((prev) => [...prev].slice(0, -1));
  }

  function ctrlZ(e) {
    if ((e.metaKey || e.ctrlKey) && e.code === "KeyZ" && dots.length > 0) {
      undo();
    }
  }
  function ctrlY(e) {
    if (
      (e.metaKey || e.ctrlKey) &&
      e.code === "KeyY" &&
      removedDots.length > 0
    ) {
      redo();
    }
  }

  useEffect(() => {
    document.addEventListener("keyup", ctrlZ);
    document.addEventListener("keyup", ctrlY);
    return () => {
      document.removeEventListener("keyup", ctrlZ);
      document.removeEventListener("keyup", ctrlY);
    };
  }, [dots]);

  return (
    <div className="app" onClick={handleClick}>
      <div className="btns">
        <button className="btn" onClick={undo}>
          CTRL+Z
        </button>
        <button className="btn" onClick={redo}>
          CTRL+Y
        </button>
      </div>
      <>
        {dots
          ? dots.map((d, index) => (
              <div
                key={index}
                className="dot"
                style={{
                  top: `${d.top - 5}px`,
                  left: `${d.left - 5}px`,
                  backgroundColor: `#${d.randomColor}`,
                }}
              />
            ))
          : null}
      </>
    </div>
  );
}

export default App;

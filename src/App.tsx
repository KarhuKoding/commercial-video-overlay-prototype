import React from "react";
import Pointer from "./components/Poiner";
import Canvas from "./components/Canvas";

const videoWidth = 1120;
const videoHeight = 630;

const getPercentage = (a: number, b: number): number =>
  Math.round((a / b) * 100);
const getRelativePointerPosition = ({
  pageX,
  pageY,
}: {
  pageX: number;
  pageY: number;
}) => {
  return {
    top: getPercentage(pageX, videoWidth),
    left: getPercentage(pageY, videoHeight),
  };
};

const RenderPointerPosition = ({ top = 1, left = 2 }) => {
  return (
    <div>
      <p>
        Mouse Postion Top: {top}% / Left: {left}%
      </p>
    </div>
  );
};

const EditMode = ({
  isEditMode,
  setEditMode,
}: {
  isEditMode: boolean;
  setEditMode: React.Dispatch<boolean>;
}) => {
  const handleClick = (bool: boolean) => {
    setEditMode(bool);
  };

  if (!isEditMode)
    return <button onClick={() => handleClick(true)}>enable Edit Mode</button>;

  return (
    <div>
      <button onClick={() => handleClick(false)}>disable Edit Mode</button>
      <p>isEditMode</p>
    </div>
  );
};

const storeTrack = () => {
  // fromX, fromY, toX, toY
};

function App() {
  // This will be a global State
  const [isEditMode, setEditMode]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = React.useState(false);
  const [track, setTrack] = React.useState({
    fromX: 0,
    fromY: 0,
    toX: 0,
    toY: 0,
  });
  const [pointerPosition, setPointerPosition] = React.useState({
    top: 0,
    left: 0,
  });

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.moveTo(0, 0);
    ctx.lineTo(300, 150);
    ctx.stroke();
  };


  const handlePointerMove = (e: React.MouseEvent<HTMLElement>) => {
    setPointerPosition(getRelativePointerPosition(e));
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!isEditMode)
      return console.warn("Edit Mode needs to be activated to Store a Track");

    const position = getRelativePointerPosition(e);
    console.log("clicked on", position);
  };

  return (
    <>
      <div className="App">
        <div className="video-container">
          <iframe
            width={videoWidth}
            height={videoHeight}
            src="https://www.youtube-nocookie.com/embed/jsz45MJphfY"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
          <div
            className="overlay-container"
            onPointerMove={(e) => handlePointerMove(e)}
            onClick={(e) => handleClick(e)}
          >
            <Pointer
              title="lights"
              position={[pointerPosition.top, pointerPosition.left]}
            />
          </div>
        </div>

        {RenderPointerPosition(pointerPosition)}

        <EditMode isEditMode={isEditMode} setEditMode={setEditMode} />
      </div>
      <Canvas draw={draw}/>
    </>
  );
}

export default App;

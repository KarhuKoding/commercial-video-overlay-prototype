import React, { useRef, useEffect } from "react";

const useCanvas = (
  draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let frameCount = 0;
    let animationFrameId: number;

    //Our draw came here
    const render = () => {
      frameCount++;
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return canvasRef;
};

const Canvas = (props: any) => {
  const { draw, ...rest } = props;

  const canvasRef = useCanvas(draw);

  return <canvas ref={canvasRef} {...rest} className="canvas-overlay"/>;
};

export default Canvas;

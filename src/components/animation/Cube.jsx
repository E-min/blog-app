import { useEffect, useState } from "react";

const Cube = ({ specs, removeCube }) => {
  const { x, y, width, height, color, opacity, speed, id } = specs;
  const [cube, setCube] = useState({ x, y, display: "none" });

  useEffect(() => {
    const timeId = setTimeout(() => {
      setCube((prev) => ({ ...prev, y: -50, display: "block" }));
    }, 100);
    return () => clearTimeout(timeId);
  }, []);

  const cubeStyles = {
    display: cube.display,
    width,
    height,
    backgroundColor: color,
    boxShadow: `0 0 ${width}px 0 ${color}`,
    opacity,
    filter: "blur(4px)",
  };
  const laserStyle = {
    position: "absolute",
    transform: `translate(${cube.x}px, ${cube.y}px)`,
    transition: `transform ${speed}s linear`,
  };

  return (
    <div style={laserStyle} onTransitionEnd={() => removeCube(id)}>
      <div style={{ ...cubeStyles, borderRadius: "10px 10px 0 0" }}></div>
      <div style={{ ...cubeStyles, opacity: 0.7, height: 10 }}></div>
      <div style={{ ...cubeStyles, opacity: 0.5, height: 10 }}></div>
      <div style={{ ...cubeStyles, opacity: 0.3, height: 10 }}></div>
      <div style={{ ...cubeStyles, opacity: 0.15, height: 10 }}></div>
      <div style={{ ...cubeStyles, opacity: 0.1, height: 10 }}></div>
    </div>
  );
};

export default Cube;

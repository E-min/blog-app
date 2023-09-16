import { useState } from "react";
import Cube from "./Cube";
import { useEffect } from "react";
import { useRef } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Outlet } from "react-router";

const EffectField = () => {
  const [cubes, setCubes] = useState([]);
  const fieldRef = useRef(null);
  const theme = useTheme();

  const removeCube = (id) => {
    setCubes((prevCubes) => prevCubes.filter((cube) => cube.id !== id));
  };

  useEffect(() => {
    let start = performance.now();
    let animationId;
    const shootInInterval = () => {
      const now = performance.now();
      const delta = now - start;
      if (delta >= 500) {
        fieldRef.current.click();
        start = performance.now();
      }
      animationId = requestAnimationFrame(shootInInterval);
    };
    animationId = requestAnimationFrame(shootInInterval);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const handleClick = (e) => {
    const colors = ["purple", "yellow", "blue"];
    const randomX = Math.floor(Math.random() * fieldRef.current.clientWidth);
    const randomWidth = Math.floor(Math.random() * 5) + 10;
    const randomSpeed = Math.random() * 3 + 1;
    const randomColor = Math.floor(Math.random() * colors.length);
    setCubes((prev) => [
      ...prev,
      {
        id: Date.now(),
        x: randomX,
        y: window.innerHeight,
        width: randomWidth,
        height: 20,
        color: colors[randomColor],
        opacity: 1,
        speed: randomSpeed,
      },
    ]);
  };

  return (
    <div style={{ position: "relative", overflow: "hidden", height: "100vh" }}>
      {cubes.map((cube) => (
        <Cube key={cube.id} specs={cube} removeCube={removeCube} />
      ))}
      <Box
        sx={{
          overflowY: "auto",
          overflowX: "hidden",
          height: "100%",
          py: 8,
          px: 0.5,
          background: theme.palette.background.default,
        }}
        ref={fieldRef}
        onClick={handleClick}
      >
        <Outlet />
      </Box>
    </div>
  );
};

export default EffectField;

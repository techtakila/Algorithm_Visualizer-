export const cloneMatrix = (matrix) => {
  return matrix.map((row) => [...row]);
};


export const getThemeColors = () => {
  return {
    background: "#020617",
    primary: "#38bdf8",
    secondary: "#22c55e",
    danger: "#ef4444",
    text: "#ffffff"
  };
};


export const drawTitle = (ctx, title) => {
  if (!ctx) return;

  ctx.font = "20px Arial";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(title, 20, 30);
};
export const cloneMatrix = (matrix) => {
  return matrix.map((row) => [...row]);
};


export const getThemeColors = () => ({
  primary:"#3b82f6",
  secondary:"#22c55e",
  danger:"#ef4444"
});


export const drawTitle = (ctx, title) => {
  if (!ctx) return;

  ctx.font = "20px Arial";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(title, 20, 30);
};

export const drawArrayBars = (
  ctx,
  array,
  highlighted = [],
  colors = getThemeColors()
) => {

  if (!ctx) return;

  if (!Array.isArray(array)) {
    return;
  }

  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  ctx.clearRect(
    0,
    0,
    width,
    height
  );


  const barWidth =
    width / array.length;


  const maxValue =
    Math.max(...array);



  // accepts [1,2] or {comparing:[1,2]}
  let highlightArray = [];


  if (Array.isArray(highlighted)) {

    highlightArray = highlighted;

  } else if (
    highlighted &&
    typeof highlighted === "object"
  ) {

    Object.values(
      highlighted
    ).forEach(value => {

      if (Array.isArray(value)) {
        highlightArray.push(...value);
      }

    });

  }



  array.forEach(
    (value,index)=>{

      const barHeight =
        (value/maxValue) *
        (height-60);


      ctx.fillStyle =
        highlightArray.includes(index)
        ? colors.secondary
        : colors.primary;


      ctx.fillRect(
        index*barWidth,
        height-barHeight,
        barWidth-3,
        barHeight
      );

    }
  );
};
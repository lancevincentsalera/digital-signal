export const nrzL = (data) => {
  const points = [];

  data.split("").forEach((bit, index) => {
    points.push({
      x: index,
      y: bit === "1" ? 0 : 50,
    });
  });

  return points;
};

export const nrzI = (data) => {
  const points = [];
  let high = false;
  data.split("").forEach((bit, index) => {
    points.push({
      x: index,
      y: bit === "1" ? (high ? 50 : 0) : high ? 0 : 50,
    });
    if (bit === "1") high = !high;
  });

  return points;
};

export const bipolarAMI = (data) => {
  const points = [];
  let high = false;
  data.split("").forEach((bit, index) => {
    points.push({
      x: index,
      y: bit === "1" ? (high ? 50 : 0) : 25,
    });
    if (bit === "1") high = !high;
  });

  return points;
};

export const pseudoternary = (data) => {
  const points = [];
  let high = false;
  data.split("").forEach((bit, index) => {
    points.push({
      x: index,
      y: bit === "0" ? (high ? 50 : 0) : 25,
    });
    if (bit === "0") high = !high;
  });

  return points;
};

export const manchester = (data) => {
  const points = [];
  data.split("").forEach((bit, index) => {
    points.push({
      x: index,
      y: bit === "1" ? 50 : 0,
      x2: index + 0.5,
      y2: bit === "1" ? 0 : 50,
    });
  });

  return points;
};

export const differentialManchester = (data) => {
  const points = [];
  let previousY = 0;

  data.split("").forEach((bit, index) => {
    let currentY, nextY;

    if (bit === "0") {
      currentY = previousY === 0 ? 50 : 0;
      nextY = currentY === 0 ? 50 : 0;
    } else {
      currentY = previousY;
      nextY = currentY === 0 ? 50 : 0;
    }

    points.push({
      x: index,
      y: currentY,
      x2: index + 0.5,
      y2: nextY,
    });

    previousY = nextY;
  });

  return points;
};

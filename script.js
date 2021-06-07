let can = document.querySelector("#myCanvas");
let rects = [];

const context = can.getContext("2d");

const getXY = (event) => {
  let x = event.clientX - can.getBoundingClientRect().left;
  let y = event.clientY - can.getBoundingClientRect().top;
  return { x: x, y: y };
};

var startx = 0,
  starty = 0;
var endx = 0,
  endy = 0;
var currentx = 0,
  currenty = 0;
var slider = 0;
var prx = 0,
  pry = 0;
let point = -1;
let check = 0;
let rng;
let h;

const startPoint = (event) => {
  u = getXY(event);
  startx = u.x;
  starty = u.y;
  checkDrag();
  prx = startx;
  pry = starty;
  rng = rang();
  if (slider == 0) h = 1;
};
const stopPoint = (event) => {
  z = getXY(event);
  endx = z.x;
  endy = z.y;
  check = 0;
  h = 0;
  context.clearRect(0, 0, can.width, can.height);
  redraw();
};
const move = (event) => {
  z = getXY(event);
  currentx = z.x;
  currenty = z.y;
  if (slider == 1) {
    x = currentx - prx;
    y = currenty - pry;
    prx = currentx;
    pry = currenty;
    console.log(x, y);
    drag(x, y);
  } else {
    x = currentx;
    y = currenty;
    // console.log(x, y);
    if (h == 1) context.clearRect(0, 0, can.width, can.height);
    drawTri(x, y);
  }
};

const rang = () => {
  x = "#";
  arr = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];
  for (var i = 0; i < 6; i++) {
    x = x + arr[Math.floor(Math.random() * arr.length)];
  }
  return x;
};
function drawTriangle(event) {
  if (slider == 0) {
    context.beginPath();
    context.moveTo(startx, starty);
    context.lineTo(startx - (endx - startx), endy);
    context.lineTo(endx, endy);
    context.closePath();
    context.lineWidth = 2;
    context.strokeStyle = "#000000";
    context.stroke();
    rects.push({
      x1: startx,
      y1: starty,
      x2: endx,
      y2: endy,
      x3: startx - (endx - startx),
      y3: endy,
      color: rng,
    });
    context.fillStyle = rng;
    context.fill();
  } else {
    slider = 0;
  }
}

function drawTri(x, y) {
  if (h == 1) {
    redraw();
    context.beginPath();
    context.moveTo(startx, starty);
    context.lineTo(startx - (x - startx), y);
    context.lineTo(x, y);
    context.closePath();
    context.lineWidth = 2;
    context.strokeStyle = "#000000";
    context.stroke();
    context.fillStyle = rng;
    context.fill();
  }
}

const redraw = () => {
  if (slider == 1) {
    context.clearRect(0, 0, can.width, can.height);
  }
  for (var i = 0; i < rects.length; i++) {
    // console.log("awawa");
    context.beginPath();
    context.moveTo(rects[i].x1, rects[i].y1);
    context.lineTo(rects[i].x2, rects[i].y2);
    context.lineTo(rects[i].x3, rects[i].y3);
    context.closePath();
    context.lineWidth = 2;
    context.strokeStyle = "#000000";
    context.stroke();
    let r = rects[i].color;
    context.fillStyle = r;
    context.fill();
  }
};
const drag = (prex, prey) => {
  if (check == 0) {
    point = -1;
    for (let i = 0; i < rects.length; i++) {
      // console.log("hello");
      ar =
        (rects[i].x1 * (rects[i].y2 - rects[i].y3) +
          rects[i].x2 * (rects[i].y3 - rects[i].y1) +
          rects[i].x3 * (rects[i].y1 - rects[i].y2)) /
        2;
      a1 =
        (rects[i].x1 * (rects[i].y2 - currenty) +
          rects[i].x2 * (currenty - rects[i].y1) +
          currentx * (rects[i].y1 - rects[i].y2)) /
        2;
      a2 =
        (rects[i].x1 * (currenty - rects[i].y3) +
          currentx * (rects[i].y3 - rects[i].y1) +
          rects[i].x3 * (rects[i].y1 - currenty)) /
        2;
      a3 =
        (currentx * (rects[i].y2 - rects[i].y3) +
          rects[i].x2 * (rects[i].y3 - currenty) +
          rects[i].x3 * (currenty - rects[i].y2)) /
        2;
      if (Math.abs(ar) === Math.abs(a1) + Math.abs(a2) + Math.abs(a3)) {
        if (Math.abs(ar) > 0) point = i;
      }
    }
    check = 1;
  }
  // window.alert(point);
  if (point >= 0) {
    rects[point].x1 += prex;
    rects[point].x2 += prex;
    rects[point].x3 += prex;
    rects[point].y1 += prey;
    rects[point].y2 += prey;
    rects[point].y3 += prey;
  }
  redraw();
};

const checkDrag = () => {
  let point = -1;
  for (let i = 0; i < rects.length; i++) {
    // console.log("hello");
    ar =
      (rects[i].x1 * (rects[i].y2 - rects[i].y3) +
        rects[i].x2 * (rects[i].y3 - rects[i].y1) +
        rects[i].x3 * (rects[i].y1 - rects[i].y2)) /
      2;
    a1 =
      (rects[i].x1 * (rects[i].y2 - starty) +
        rects[i].x2 * (starty - rects[i].y1) +
        startx * (rects[i].y1 - rects[i].y2)) /
      2;
    a2 =
      (rects[i].x1 * (starty - rects[i].y3) +
        startx * (rects[i].y3 - rects[i].y1) +
        rects[i].x3 * (rects[i].y1 - starty)) /
      2;
    a3 =
      (startx * (rects[i].y2 - rects[i].y3) +
        rects[i].x2 * (rects[i].y3 - starty) +
        rects[i].x3 * (starty - rects[i].y2)) /
      2;
    if (Math.abs(ar) === Math.abs(a1) + Math.abs(a2) + Math.abs(a3)) {
      if (Math.abs(ar) > 0) point = i;
    }
  }
  // window.alert(point);
  if (point >= 0) {
    slider = 1;
  } else {
    slider = 0;
  }
  redraw();
};

const area = () => {
  let point = -1;
  for (let i = 0; i < rects.length; i++) {
    // console.log("hello");
    ar =
      (rects[i].x1 * (rects[i].y2 - rects[i].y3) +
        rects[i].x2 * (rects[i].y3 - rects[i].y1) +
        rects[i].x3 * (rects[i].y1 - rects[i].y2)) /
      2;
    a1 =
      (rects[i].x1 * (rects[i].y2 - starty) +
        rects[i].x2 * (starty - rects[i].y1) +
        startx * (rects[i].y1 - rects[i].y2)) /
      2;
    a2 =
      (rects[i].x1 * (starty - rects[i].y3) +
        startx * (rects[i].y3 - rects[i].y1) +
        rects[i].x3 * (rects[i].y1 - starty)) /
      2;
    a3 =
      (startx * (rects[i].y2 - rects[i].y3) +
        rects[i].x2 * (rects[i].y3 - starty) +
        rects[i].x3 * (starty - rects[i].y2)) /
      2;
    if (Math.abs(ar) === Math.abs(a1) + Math.abs(a2) + Math.abs(a3)) {
      if (Math.abs(ar) > 0) point = i;
    }
  }
  // window.alert(point);
  if (point >= 0) {
    rects.splice(point, 1);
    context.clearRect(0, 0, can.width, can.height);
  }
  redraw();
};
const rst = () => {
  // window.alert("clicked");
  context.clearRect(0, 0, can.width, can.height);
  rects = [];
};
const canva = () => {
  can.addEventListener("dblclick", area);
  can.addEventListener("mousedown", startPoint);
  can.addEventListener("mouseup", stopPoint);
  can.addEventListener("mouseup", drawTriangle);
  can.addEventListener("mousemove", move);
};

window.addEventListener("load", canva);

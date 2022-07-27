const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.focus()

// one degree in radians
const DR = 0.0174533

function degToRad(a) {
  return a * Math.PI / 180
}

function fixAng(a) {
  if (a > 359) {
    a -= 360
  }
  if (a < 0) {
    a += 360
  }
  return a
}
// player position
let px, py, pdx, pdy, pa = 0
// player movement
let left, right, up, down = false

function drawPlayer() {
  ctx.fillRect(px, py, 8, 8)
  ctx.stroke()
}

function playerMovement() {
    if (left) {
      pa -= 0.1
      if (pa < 0) {
        pa += 2*Math.PI
      }
      pdx = Math.cos(pa) * 5
      pdy = Math.sin(pa) * 5
    }
    if (right) {
      pa += 0.1
      if (pa > 2*Math.PI) {
        pa -= 2*Math.PI
      }
      pdx = Math.cos(pa) * 5
      pdy = Math.sin(pa) * 5
    }


    if (up) {
      px += pdx
      py += pdy
      
    }
    if (down) {
      px -= pdx
      py -= pdy
    }
  
    if (!left) {
      pa -= 0
    }
    if (!right) {
      pa -= 0
    }
    if (!up) {
      px -= 0
      py -= 0
    }
    if (!down) {
      px -= 0
      py -= 0
    }
}

let mapX = 8
let mapY = 8
let mapS = 64
let map = 
[
  1, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 0, 1, 1, 1, 1,
  1, 1, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 1,
  1, 1, 1, 1, 1, 1, 1, 1,
]

function drawMap2D() {
  for (let y = 0; y < mapY; y++) {
    for (let x = 0; x < mapX; x++) {
      if (map[y * mapX + x] === 1) {
        ctx.fillStyle = "white"
      } else {
        ctx.fillStyle = "black"
      }
      // xo = x * mapS
      // yo = y * mapS
      // ctx.beginPath()
      // ctx.moveTo(xo        + 1, yo + 1)
      // ctx.lineTo(xo        + 1, yo + mapS - 1)
      // ctx.lineTo(xo + mapS - 1, yo + mapS - 1)
      // ctx.lineTo(xo + mapS - 1, yo + 1)
      // ctx.fill()
      ctx.fillRect(x * mapS, y * mapS, mapS - 1, mapS - 1);
    }
  }
}

// find the distance between two vectors (magnitude)
function dist(ax, ay, bx, by, ang) {
  // return Math.hypot((bx - ax)**2 + (by - ay)**2)
  return Math.sqrt((bx - ax)**2 + (by - ay)**2)
}

function drawRays3D() {
  let r, mx, my, mp, dof, rx, ry, ra, xo, yo, disT

  ra = pa - DR * 30
  // limit for degrees
  if (ra < 0) {
    ra += 2 * Math.PI
  }
  if (ra > 2 * Math.PI) {
    ra -= 2 * Math.PI
  }

  for (r = 0; r < 60; r++) {
    // Check Horizontal Lines
    dof = 0
    disH = 1000000
    hx = px
    hy = py
    aTan = -1 / Math.tan(ra) // negative inverse of tangent
    // Check to see if we are looking up or down
    if (ra > Math.PI) {
      ry = (((Math.floor(py) >> 6) << 6) - 0.001) // rounding the ray's y position to the nearest 64th value
      rx = (py - ry) * aTan + px
      yo = -64 
      xo = -yo * aTan
    }

    // Check to see if we are looking down
    if (ra < Math.PI) {
      ry = (((Math.floor(py) >> 6) << 6) + 64) // rounding the ray's y position to the nearest 64th value
      rx = (py - ry) * aTan + px
      yo = 64 
      xo = -yo * aTan
    }

    if (ra === 0 || ra === Math.PI) { // if the ray is looking straight left or right then it is impossible for the ray to hit a horizontal line
      rx = px + 5
      ry = py + 5
      dof = 8
    }
    
    while (dof < 8) {
      mx = Math.floor(rx >> 6)
      my = Math.floor(ry >> 6)
      mp = my * mapX + mx

      if (mp > 0 && mp < mapX * mapY && map[mp] === 1) { // hit a wall
        // calculate the ray's distance from the player
        hx = rx
        hy = ry
        disH = dist(px, py, hx, hy, ra)
        dof = 8
      } else {
        rx += xo
        ry += yo
        dof += 1
      }
    }

    // Checking vertical lines
    dof = 0
    disV = 1000000
    vx = px
    vy = py
    nTan = -Math.tan(ra) // negative tangent
    // Check to see if we are looking left
    if (ra > Math.PI / 2 && ra < 3 * Math.PI / 2) {
      rx = (((Math.floor(px) >> 6) << 6) - 0.001) // rounding the ray's y position to the nearest 64th value
      ry = (px - rx) * nTan + py
      xo = -64 
      yo = -xo * nTan
    }

    // Check to see if we are looking right
    if (ra < Math.PI / 2 || ra > 3 * Math.PI / 2) {
      rx = (((Math.floor(px) >> 6) << 6) + 64) // rounding the ray's y position to the nearest 64th value
      ry = (px - rx) * nTan + py
      xo = 64 
      yo = -xo * nTan
    }

    // Checking to see if the player is looking straight up or down
    if (ra === 0 || ra === Math.PI) { 
      rx = px
      ry = py
      dof = 8
    }
    
    while (dof < 8) {
      mx = Math.floor(rx >> 6)
      my = Math.floor(ry >> 6)
      mp = my * mapX + mx

      if (mp > 0 && mp < mapX * mapY && map[mp] === 1) { // hit a wall
        vx = rx
        vy = ry
        disV = dist(px, py, vx, vy, ra)
        dof = 8
      } else {
        rx += xo
        ry += yo
        dof += 1
      }
    }
    // vertical wall hit
    if (disV < disH) {
      rx = vx
      ry = vy
      disT = disV
      ctx.strokeStyle = "#0000ff"
    }
    // horizontal wall hit
    if (disV > disH) {
      rx = hx
      ry = hy
      disT = disH
      ctx.strokeStyle = "#1a1aff"
    }

    // Drawing the 3D scene
    let ca = pa - ra
    if (ca < 0) {
      ca += 2 * Math.PI
    }
    if (ca > 2 * Math.PI) {
      ca -= 2 * Math.PI
    }

    // to fix the fisheye
    disT = disT * Math.cos(ca)
    let lineH = mapS * canvas.clientHeight / disT  // line height
    if(lineH > canvas.clientHeight) {
      lineH = canvas.height
    }
    let lineO = canvas.clientHeight / 3 - lineH / 2  // line offset

    ctx.beginPath()
    ctx.lineWidth = 8
    ctx.moveTo(r * 8 + 530, lineO)
    ctx.lineTo(r * 8 + 530, lineH + lineO)
    ctx.stroke()

    // draw 2d
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1;
    ctx.moveTo(px, py);
    ctx.lineTo(rx, ry);
    ctx.stroke();

    ra += DR
    if (ra < 0) {
      ra += 2 * Math.PI
    }
    if (ra > 2 * Math.PI) {
      ra -= 2 * Math.PI
    }
  }
}

function init() {
  px = 300
  py = 300
  pa = 1
  pdx = Math.cos(pa) * 5
  pdy = Math.sin(pa) * 5
}

let frame1, frame2, fps

function display() {

  
}

function main(timestamp) {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
  drawMap2D()
  drawPlayer()
  playerMovement()
  drawRays3D()
  requestAnimationFrame(main)
}

init()
userInput()
requestAnimationFrame(main)
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.focus()

const SW = canvas.clientWidth
const SH = canvas.clientHeight
const SW2 = canvas.clientWidth / 2
const SH2 = canvas.clientHeight / 2

// Converts degrees to radians
function degToRad(a) {
  return a * Math.PI / 180
}
class Player {
  constructor(x, y, z, a, l) {
    // Player position, z is up
    this.x = x
    this.y = y
    this.z = z
    this.a = a // Player angle of roation left and right
    this.l = l // Variable to look up and down

  }
}

class Wall {
  constructor(x1, y1, x2, y2, c) {
    // Bottom line point 1
    this.x1 = x1
    this.y1 = y1
    // Bottom line point 2
    this.x2 = x2
    this.y2 = y2
    // Wall color
    this.c = c
  }
}

class Sector {
  constructor(ws, we, z1, z2, x, y, d) {
    // wall number start and end
    this.ws = ws
    this.we = we
    // height of bottom and top
    this.z1 = z1
    this.z2 = z2
    // center position of the sector
    this.x = x
    this.y = y
    // add y distances to sort drawing order
    this.d = d
  }
}

// player movement will sort this out later
let left, right, up, down, strafeLeft, strafeRight, lookUp, lookDown, moveUp, moveDown

function playerMovement() {
  if (left) {
    P.a -= 4
    if (P.a < 0) {
      P.a += 360
    }
  }
  if (right) {
    P.a += 4
    if (P.a > 359) {
      P.a -= 360
    }
  }
  let dx = Math.sin(degToRad(P.a)) * 10
  let dy = Math.cos(degToRad(P.a)) * 10
  if (up) {
    P.x += dx
    P.y += dy
  }
  if (down) {
    P.x -= dx
    P.y -= dy
  }
  if (strafeLeft) {
    P.x -= dy
    P.y -= dx
  }
  if (strafeRight) {
    P.x += dy
    P.y += dx
  }
  if (lookUp) {
    P.l -= 1
  }
  if (lookDown) {
    P.l -= 1
  }
  if (moveUp) {
    P.z -= 4
  }
  if (moveDown) {
    P.z += 4
  }

  if (!left) {

  }
  if (!right) {
  
  }
  if (!up) {

  }
  if (!down) {

  }
}

function pixel(x, y, c) {
  let rgb = []
  if(c==0){ rgb[0]=255; rgb[1]=255; rgb[2]=  0;} //Yellow	
  if(c==1){ rgb[0]=160; rgb[1]=160; rgb[2]=  0;} //Yellow darker	
  if(c==2){ rgb[0]=  0; rgb[1]=255; rgb[2]=  0;} //Green	
  if(c==3){ rgb[0]=  0; rgb[1]=160; rgb[2]=  0;} //Green darker	
  if(c==4){ rgb[0]=  0; rgb[1]=255; rgb[2]=255;} //Cyan	
  if(c==5){ rgb[0]=  0; rgb[1]=160; rgb[2]=160;} //Cyan darker
  if(c==6){ rgb[0]=160; rgb[1]=100; rgb[2]=  0;} //brown	
  if(c==7){ rgb[0]=110; rgb[1]= 50; rgb[2]=  0;} //brown darker
  if(c==8){ rgb[0]=  0; rgb[1]= 60; rgb[2]=130;} //background 
  ctx.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
  ctx.fillRect(x, y, 2, 2)
}

function clearBackground() {
  for (let y = 0; y < canvas.clientHeight; y++) {
    for (x = 0; x < canvas.clientWidth; x++) {
      pixel(x, y, 8) // clear background color
    }
  }
}

function clipBehindPlayer(x1, y1, z1, x2, y2, z2) {
  let da = y1 // distance plane -> point a
  let db = y2 // distance plane -> point b
  let d = da - db
  if (d === 0) {
    d = 1
  }
  let s = da / (da - db) // intersection factor (between 0 and 1)
  x1 = x1 + s * (x2 - x1)
  y1 = y1 + s * (y2 - y1)
  if (y1 === 0) {
    y1 = 1
  }
  z1 = z1 + s * (z2 - z1)
}

function drawWall(x1, x2, b1, b2, t1, t2) {
  // Hold difference in distance
  let dyb = b2 - b1 // y distance of the bottom line
  let dyt = t2 - t1 // y distance of the top line
  let dx = x2 - x1  // x distance
  if (dx === 0) { // to prevent diving by zero
    dx = 1
  }
  let xs = x1 // hold initial x1 starting position
  // Clip X
  // clip left
  if (x1 < 1) { x1 = 1 }
  if (x2 < 1) { x2 = 1 }
  // clip right
  if (x1 > SW - 1) { x2 = SW - 1 }
  if (x2 > SW - 1) { x2 = SW - 1 }
  // draw x verticle lines
  for (let x = x1; x < x2; x++) {
    // the Y start and end point
    let y1 = dyb * (x - xs + 0.5) / dx + b1 // y bottom point
    let y2 = dyt * (x - xs + 0.5) / dx + t1 // y bottom point
    // Clip Y
    if ( y1 < 1) { y1 = 1 }
    if ( y2 < 1) { y2 = 1}
    if ( y1 > SH - 1) { y1 = SH - 1 }
    if ( y2 > SH - 1) { y1 = 1 }

    for(let y = y1; y < y2; y++) {
      pixel(x ,y, 0)
    }

  }
}

function dist(x1, y1, x2, y2) {
  return Math.hypot((x2 - x1)**2 + (y2 - y1)**2)
}

function draw3D() {
  let numSect = 30
  let wx = []; let wy = []; let wz = []
  let CS = Math.cos(degToRad(P.a))
  let SN = Math.sin(degToRad(P.a))

  for (let s = 0; s < numSect; s++) {
    
  }

  // Offset bottom 2 points by player
  let x1 = 40 - P.x
  let y1 = 10 - P.y
  let x2 = 40 - P.x
  let y2 = 290 - P.y
  // World X position 
  wx[0] = x1 * CS - y1 * SN
  wx[1] = x2 * CS - y2 * SN
  wx[2] = wx[0]                           // top line has the same x
  wx[3] = wx[1]
  // World Y position (depth)
  wy[0] = y1 * CS + x1 * SN
  wy[1] = y2 * CS + x2 * SN
  wy[2] = wy[0]                           // top line has the same y
  wy[3] = wy[1]
  // World Z height
  wz[0] = 0 - P.z + ((P.l * wy[0]) / 32)
  wz[1] = 0 - P.z + ((P.l * wy[1]) / 32)
  wz[2] = wz[0] + 40                      // top line has new z
  wz[3] = wz[1] + 40
  // don't draw if behind the player
  if (wy[0] < 1 && wy[1] < 1) { return }
  // point 1 behind player, clip
  if (wy[0] < 1) {
    clipBehindPlayer(wx[0], wy[0], wz[0], wx[1], wy[1], wz[1]) // bottom line
    clipBehindPlayer(wx[2], wy[2], wz[2], wx[3], wy[3], wz[3]) // top line
  }
  // point 2 behind player, clip
  if (wy[1] < 1) {
    clipBehindPlayer(wx[1], wy[1], wz[1], wx[0], wy[0], wz[0]) // bottom line
    clipBehindPlayer(wx[3], wy[3], wz[3], wx[2], wy[2], wz[2]) // top line
  }
  // screen x, screen y position
  wx[0] = wx[0] * 200 / wy[0] + SW2
  wy[0] = wz[0] * 200 / wy[0] + SH2

  wx[1] = wx[1] * 200 / wy[1] + SW2
  wy[1] = wz[1] * 200 / wy[1] + SH2

  wx[2] = wx[2] * 200 / wy[2] + SW2
  wy[2] = wz[2] * 200 / wy[2] + SH2

  wx[3] = wx[3] * 200 / wy[3] + SW2
  wy[3] = wz[3] * 200 / wy[3] + SH2
  // draw points
  if (wx[0] > 0 && wx[0] < SW && wy[0] > 0 && wy[0] < SH) {
    pixel(wx[0], wy[0], 0)
  }
  if (wx[0] > 0 && wx[0] < SW && wy[0] > 0 && wy[0] < SH) {
    pixel(wx[1], wy[1], 0)
  }
  drawWall(wx[0], wx[1], wy[0], wy[1], wy[2], wy[3])
}


function init() {
  
}

function main(timestamp) {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
  playerMovement()
  draw3D()
  requestAnimationFrame(main)
}

let P = new Player(70, -110, z = 20, a = 0, l = 0)
userInput()
requestAnimationFrame(main)
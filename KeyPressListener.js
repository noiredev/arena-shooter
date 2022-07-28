function userInput() {
  document.addEventListener('keydown', (e) => {
    if (e.code === "KeyA") {
      left = true
    }
    if (e.code === "KeyD") {
      right = true
    }
    if (e.code === "KeyW") {
      up = true
    }
    if (e.code === "KeyS") {
      down = true
    }
    if (e.code === "Space") {
      action = true
    }
  })
  
  document.addEventListener('keyup', (e) => {
    if (e.code === "KeyA") {
      left = false
    }
    if (e.code === "KeyD") {
      right = false
    }
    if (e.code === "KeyW") {
      up = false
    }
    if (e.code === "KeyS") {
      down = false
    }
    if (e.code === "Space") {
      action = true
    }
  })
}
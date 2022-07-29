function userInput() {
  document.addEventListener('keydown', (e) => {
    if (e.code === "KeyA" && !e.shiftKey) {
      left = true
    }
    
    if (e.code === "KeyD" && !e.shiftKey) {
      right = true
    }
    if (e.code === "KeyW" && !e.shiftKey) {
      up = true
    }
    if (e.code === "KeyS" && !e.shiftKey) {
      down = true
    }
    if (e.code === "KeyQ") {
      strafeLeft = true
    }
    if (e.code === "KeyE") {
      strafeRight = true
    }

    if (e.code === "KeyA" && e.shiftKey) {
      e.preventDefault();
      lookUp = true
    }
    if (e.code === "KeyD" && e.shiftKey) {
      e.preventDefault();
      lookDown = true
    }
    if (e.code === "KeyW" && e.shiftKey) {
      e.preventDefault();
      moveUp = true
    }
    if (e.code === "KeyS" && e.shiftKey) {
      e.preventDefault();
      moveDown = true
    }
    
    if (e.code === "Space") {
      action = true
    }
  })
  
  document.addEventListener('keyup', (e) => {
    if (e.code === "KeyA" && !e.shiftKey) {
      left = false
    }
    if (e.code === "KeyD" && !e.shiftKey) {
      right = false
    }
    if (e.code === "KeyW" && !e.shiftKey) {
      up = false
    }
    if (e.code === "KeyS" && !e.shiftKey) {
      down = false
    }
    if (e.code === "KeyQ") {
      strafeLeft = false
    }
    if (e.code === "KeyE") {
      strafeRight = false
    }

    if (e.code === "KeyA" && e.shiftKey) {
      lookUp = false
    }

    if (e.code === "KeyD" && e.shiftKey) {
      lookDown = false
    }
    if (e.code === "KeyW" && e.shiftKey) {
      moveUp = false
    }
    if (e.code === "KeyS" && e.shiftKey) {
      moveDown = false
    }
    if (e.code === "Space") {
      action = false
    }
  })
}
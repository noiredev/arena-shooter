function userInput(){
  document.addEventListener('keydown', (e) => {
    if (e.code === "ArrowLeft") {
      left = true
    }
    if (e.code === "ArrowRight") {
      right = true
    }
    if (e.code === "ArrowUp") {
      up = true
    }
    if (e.code === "ArrowDown") {
      down = true
    }
    if (e.code === "space") {
      action = true
    }
  })
  
  document.addEventListener('keyup', (e) => {
    if (e.code === "ArrowLeft") {
      left = false
    }
    if (e.code === "ArrowRight") {
      right = false
    }
    if (e.code === "ArrowUp") {
      up = false
    }
    if (e.code === "ArrowDown") {
      down = false
    }
    if (e.code === "space") {
      action = true
    }
  })
}
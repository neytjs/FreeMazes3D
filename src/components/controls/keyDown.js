function keyDown() {
  let key = event.keyCode;
  let ctrl = event.ctrlKey;

// disable F11
  if (key === 122) {
    event.preventDefault();
  }
// disable Ctrl+A
  if (ctrl === true && key === 65) {
    event.preventDefault();
  }
// disable Ctrl+R
  if (ctrl === true && key === 82) {
    event.preventDefault();
  }
// disable Ctrl+Q
  if (ctrl === true && key === 81) {
    event.preventDefault();
  }
// disable Ctrl+W
  if (ctrl === true && key === 87) {
    event.preventDefault();
  }
// disable Ctrl+-
  if (ctrl === true && key === 189) {
    event.preventDefault();
  }
  if (ctrl === true && key === 109) {
    event.preventDefault();
  }
// disable Ctrl++
  if (ctrl === true && key === 107) {
    event.preventDefault();
  }
// disable Ctrl+=
  if (ctrl === true && key === 187) {
    event.preventDefault();
  }
}

export {keyDown};

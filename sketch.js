let colors = [];
let img;

document.getElementById('imageUploader').addEventListener('change', function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    const sourceImage = document.getElementById('sourceImage');
    sourceImage.src = e.target.result;
    sourceImage.onload = function() {
      const colorThief = new ColorThief();
      colors = colorThief.getPalette(sourceImage, 5);
      redraw();
    };
  };
  reader.readAsDataURL(file);
});

function setup() {
  let canvas = createCanvas(400, 600);
  canvas.parent('canvas-container');
  noLoop();
}

function draw() {
  if (colors.length > 0) {
    let bandHeight = height / colors.length;
    for (let i = 0; i < colors.length; i++) {
      fill(colors[i][0], colors[i][1], colors[i][2]);
      rect(0, i * bandHeight, width, bandHeight);
    }
  } else {
    background(255);
    fill(0);
    textAlign(CENTER, CENTER);
    text('Upload an image to begin', width / 2, height / 2);
  }
}

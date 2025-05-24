let img;
let colors = [];
let colorThief;

function setup() {
  createCanvas(600, 800);
  noLoop(); // only redraw when needed
  colorThief = new ColorThief();

  const uploader = document.getElementById('imageUpload');
  uploader.addEventListener('change', handleImageUpload);
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const imgElement = new Image();
  imgElement.crossOrigin = "Anonymous";

  imgElement.onload = () => {
    // Create temporary canvas to use Color Thief
    const tempCanvas = document.createElement('canvas');
    const ctx = tempCanvas.getContext('2d');
    tempCanvas.width = imgElement.width;
    tempCanvas.height = imgElement.height;
    ctx.drawImage(imgElement, 0, 0);

    try {
      colors = colorThief.getPalette(tempCanvas, 5);
    } catch (err) {
      console.error('Color extraction failed:', err);
      return;
    }

    redraw(); // redraw the canvas with new colors
  };

  imgElement.src = URL.createObjectURL(file);
}

function draw() {
  background(240);
  if (colors.length === 0) {
    fill(0);
    textAlign(CENTER, CENTER);
    text('Upload an image to generate artwork', width / 2, height / 2);
    return;
  }

  let y = 80;

  for (let i = 0; i < colors.length; i++) {
    let col = colors[i];
    let h = random(100, 160);
    let marginX = random(30, 60);

    drawingContext.shadowBlur = 40;
    drawingContext.shadowColor = color(col[0], col[1], col[2]);

    fill(col[0], col[1], col[2]);
    noStroke();
    rect(marginX, y, width - marginX * 2, h, 20);
    y += h + random(30, 50);
  }

  drawingContext.shadowBlur = 0;
}

// Wrap everything in an IIFE to prevent global namespace pollution
(function() {
  const pixelCanvas = document.getElementById('pinkboard');
  const pixelCtx = pixelCanvas.getContext('2d');

  pixelCanvas.width = window.innerWidth;
  pixelCanvas.height = window.innerHeight;

  const size = 15;
  let columns = Math.floor(pixelCanvas.width / size);

  // Rain state
  const drops = [];
  for (let x = 0; x < columns; x++) {
    drops[x] = Math.floor(Math.random() * (pixelCanvas.height / size)); 
  }

  // Digital ecosystem state
  let plants = [];

  // Renamed the animation loop to guarantee no collisions with main.js or universe.js
  function drawPixelEcosystem() {
    pixelCtx.clearRect(0, 0, pixelCanvas.width, pixelCanvas.height);

    // 1. DRAW THE RAIN
    for (let i = 0; i < drops.length; i++) {
      const pixelX = i * size;
      const pixelY = drops[i] * size;

      pixelCtx.fillStyle = '#ff417d'; 
      pixelCtx.fillRect(pixelX, pixelY, size - 2, size - 2); 

      for (let tail = 1; tail < 6; tail++) {
        pixelCtx.fillStyle = `rgba(255, 65, 125, ${1 - tail * 0.2})`;
        pixelCtx.fillRect(pixelX, pixelY - (tail * size), size - 2, size - 2);
      }

      if (pixelY > pixelCanvas.height) {
        if (Math.random() > 0.97) {
          plants.push({
            x: pixelX,
            maxHeight: (Math.floor(Math.random() * 8) + 4) * size, 
            currentHeight: 0,
            isBlooming: false
          });
        }
        drops[i] = 0; 
      }
      drops[i]++;
    }

    // 2. DRAW THE DIGITAL PLANTS
    for (let p = plants.length - 1; p >= 0; p--) {
      let plant = plants[p];
      const groundY = pixelCanvas.height;

      if (plant.currentHeight < plant.maxHeight) {
        plant.currentHeight += 2; 
      } else {
        plant.isBlooming = true;
      }

      pixelCtx.fillStyle = 'rgba(200, 30, 90, 0.8)';
      pixelCtx.fillRect(plant.x, groundY - plant.currentHeight, size - 2, plant.currentHeight);

      if (plant.isBlooming) {
        pixelCtx.fillStyle = '#ff417d'; 
        const topY = groundY - plant.currentHeight;
        pixelCtx.fillRect(plant.x - size, topY, size - 2, size - 2); 
        pixelCtx.fillRect(plant.x + size, topY, size - 2, size - 2); 
        pixelCtx.fillRect(plant.x, topY - size, size - 2, size - 2); 
        pixelCtx.fillRect(plant.x, topY, size - 2, size - 2);        
      }

      if (plants.length > columns * 1.5) {
          plants.shift(); 
      }
    }
    
    setTimeout(() => {
      // Safely call our uniquely named loop
      requestAnimationFrame(drawPixelEcosystem);
    }, 45); 
  }

  window.addEventListener('resize', () => {
    pixelCanvas.width = window.innerWidth;
    pixelCanvas.height = window.innerHeight;
    
    const newColumns = Math.floor(pixelCanvas.width / size);
    if (newColumns > drops.length) {
      for(let i = drops.length; i < newColumns; i++) {
         drops[i] = Math.floor(Math.random() * (pixelCanvas.height / size));
      }
    }
    plants = []; 
  });

  // Start the animation
  drawPixelEcosystem();
})();
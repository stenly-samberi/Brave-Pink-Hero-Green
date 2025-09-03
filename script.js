const uploadInput = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('download');

uploadInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const img = new Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw original image
    ctx.drawImage(img, 0, 0);

    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Apply duotone effect
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Convert to grayscale
      const gray = 0.3 * r + 0.59 * g + 0.11 * b;

      // Apply green shadows and pink highlights
      data[i]     = gray * 1.2; // Red (pink highlight)
      data[i + 1] = gray * 0.6; // Green (shadow)
      data[i + 2] = gray * 0.8; // Blue (soft tone)
    }

    ctx.putImageData(imageData, 0, 0);
  };

  img.src = URL.createObjectURL(file);
});

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'duotone-image.png';
  link.href = canvas.toDataURL();
  link.click();
});
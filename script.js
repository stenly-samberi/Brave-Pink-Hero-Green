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

    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const gray = 0.3 * r + 0.59 * g + 0.11 * b;
      const t = gray / 255;

      // Warna lebih soft
      const shadowColor = { r: 60, g: 180, b: 140 };   // Hijau lembut
      const highlightColor = { r: 255, g: 160, b: 200 }; // Pink pastel

      // Interpolasi lembut
      data[i]     = shadowColor.r + t * (highlightColor.r - shadowColor.r);
      data[i + 1] = shadowColor.g + t * (highlightColor.g - shadowColor.g);
      data[i + 2] = shadowColor.b + t * (highlightColor.b - shadowColor.b);
    }

    ctx.putImageData(imageData, 0, 0);
  };

  img.src = URL.createObjectURL(file);
});

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'duotone-soft.png';
  link.href = canvas.toDataURL();
  link.click();
});
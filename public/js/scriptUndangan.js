import "https://html2canvas.hertzen.com/dist/html2canvas.min.js";
const btnDownload = document.querySelector("#btn-download");

btnDownload.addEventListener("click", () => {
  const screenshotTarget = document.querySelector("#QRimage");
  html2canvas(screenshotTarget).then((canvas) => {
    const base64image = canvas.toDataURL("image/png");
    const anchor = document.createElement("a");
    anchor.setAttribute("href", base64image);
    anchor.setAttribute("download", "qr-code.png");
    anchor.click();
    anchor.remove();
  });
});

document.querySelector("#main").addEventListener("scroll", function (e) {
  let horizontal = e.currentTarget.scrollLeft;
  const sign = document.querySelector("#sign");
  if (horizontal > 0) {
    sign?.remove();
  }
});

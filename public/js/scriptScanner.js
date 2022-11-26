let lastScan = 0; //debounce
let delay = 3000; //debounce
function onScanSuccess(qrCodeMessage) {
  if (lastScan >= Date.now() - delay) return; //debaounce
  lastScan = Date.now(); //debounce
  fetch(`${window.location.origin}/kedatangan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: qrCodeMessage,
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("status").outerHTML = `<span id="status" class="${data.class}">${data.status}</span>`;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function onScanError(errorMessage) {
  console.loc(errorMessage);
}

var html5QrcodeScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess, onScanError);

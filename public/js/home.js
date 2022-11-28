(() => {
  const date = new Date();
  let year = date.getFullYear();
  document.querySelector("#year").innerHTML = year;
  return year;
})();

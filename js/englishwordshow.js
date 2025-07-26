fetch('https://api.eatrice.top')
  .then(response => response.json())
  .then(data => {
    var rainbow = document.getElementById('rainbow');
    rainbow.innerHTML = data.Content;
    rainbow.href = "https://rainbow.eatrice.top/?ID=" + data.ID;
  })
  .catch(console.error)
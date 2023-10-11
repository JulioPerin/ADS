let ts = "1681802982683";
let apiKey = "7dd1dc0915f641454507cc2f17fda9aa";
let hash = "e9a77da11945bcc94aebc63a5f56c312";

// Fazer a requisição à API
const url = `https://gateway.marvel.com/v1/public/characters?ts=${Date.now()}&apikey=${apiKey}&hash=${hash}&limit=10`;
document.getElementById("url").textContent = url;

// Obter o resultado da requisição
const response = await fetch(url);
const data = await response.json();

// Percorrer os heróis
for (const heroi of data.data.results) {
  // Criar um elemento <li> para cada herói
  const li = document.createElement("li");

  // Adicionar uma imagem ao elemento <li>
  const img = document.createElement("img");
  img.src = heroi.thumbnail.path + "." + heroi.thumbnail.extension;
  li.appendChild(img);

  // Adicionar o nome do herói ao elemento <li>
  const h2 = document.createElement("h2");
  h2.textContent = heroi.name;
  li.appendChild(h2);

  // Adicionar o elemento <li> à lista de heróis
  document.getElementById("herois").appendChild(li);
}


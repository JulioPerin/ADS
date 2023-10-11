let listContainer = document.querySelector(".list");
let showContainer = document.getElementById("show-container");

let date = new Date();
console.log(date.getTime());

const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal];

function removeElements() {
  listContainer.innerHTML = "";
}

window.onload = async () => {
  removeElements();

  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&limit=20`;

  const response = await fetch(url);
  const jsonData = await response.json();

  jsonData.data["results"].forEach((result) => {
    let name = result.name;
    let img = result.thumbnail.path + "/portrait_xlarge.jpg";
    let description = result.description;
  
    // Cria um novo elemento div para a imagem
    let imageElement = document.createElement("div");
    imageElement.classList.add("image");
    imageElement.innerHTML = `<img src="${img}" />`;
  
    // Cria um novo elemento div para o nome
    let nameElement = document.createElement("div");
    nameElement.classList.add("name");
    nameElement.textContent = name;

    // Cria um novo elemento div para a descricao
    let descElement = document.createElement("div");
    descElement.classList.add("description");
    descElement.textContent = description;
  
    // Cria um elemento li para o item da lista
    let li = document.createElement("li");
    li.classList.add("list-item");
  
    // Adiciona a imagem e o nome ao item da lista
    li.appendChild(imageElement);
    li.appendChild(nameElement);
    
    if (typeof descElement !== 'undefined' && descElement !== null) {
      li.appendChild(descElement);
    } else {
      const descPlaceholder = document.createElement("div");
      descPlaceholder.textContent = "Descrição Não Disponível";
      li.appendChild(descPlaceholder);
    }
    console.log(descElement);
    // Adiciona o item da lista ao container da lista
    listContainer.appendChild(li);
  });
};



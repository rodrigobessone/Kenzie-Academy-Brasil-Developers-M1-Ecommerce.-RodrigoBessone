const main = document.querySelector("main");

// A função renderItems recebe um argumento data, que é um array de objetos contendo 
// informações sobre os itens que serão renderizados na página. Dentro da função, 
// é criado um elemento section e adicionado à variável newSection, que recebe a classe 
// main-cards. Em seguida, são criados dois elementos ul e adicionados à variável list1 
// e list2, que recebem as classes superior e inferior, respectivamente. A newSection 
// recebe os elementos list1 e list2.*/

function renderItems(data) {

    const newSection = document.createElement("section");
    newSection.classList.add("main-cards");
    main.appendChild(newSection);

    const list1 = document.createElement("ul");
    list1.classList.add("superior");
    const list2 = document.createElement("ul");
    list2.classList.add("inferior");

    newSection.appendChild(list1);
    newSection.appendChild(list2);

    // Em um laço for é percorrido cada objeto no array data. Se i for menor que 3, o elemento 
    // list1 é selecionado e, caso contrário, o elemento list2 é selecionado. Um elemento li é 
    // criado e recebe a classe list-cards. São criados outros elementos HTML para cada uma das 
    // informações dos itens (imagem, categoria, título, descrição, preço e botão de carrinho de 
    // compras). Esses elementos recebem as classes apropriadas e são adicionados ao elemento 
    // li. O elemento li é adicionado à lista selecionada (ou list1 ou list2) 
    // dentro da newSection.

    for (let i = 0; i < data.length; i++) {
        const list = i < 3 ? list1 : list2;
        const item = document.createElement("li");
        item.classList.add("list-cards");

        const image = document.createElement("img");
        image.classList.add("image");
        image.src = data[i].img;

        const category = document.createElement("button");
        category.classList.add("button-tag");
        category.innerText = data[i].tag;

        const title = document.createElement("h3");
        title.classList.add("title-name");
        title.innerText = data[i].nameItem;

        const description = document.createElement("p");
        description.classList.add("description");
        description.innerText = data[i].description;

        const priceValue = document.createElement("p");
        priceValue.classList.add("price");
        priceValue.innerText = `R$ ${data[i].value.toFixed(2)}`;

        const cartButton = document.createElement("button");
        cartButton.classList.add("add-cart");
        cartButton.innerText = data[i].addCart;
        cartButton.id = i;

        item.appendChild(image);
        item.appendChild(category);
        item.appendChild(title);
        item.appendChild(description);
        item.appendChild(priceValue);
        item.appendChild(cartButton);

        list.appendChild(item);
    }

}

// A função removeItems é responsável por remover a seção de itens do DOM.

function removeItems() {
    const itemsSection = document.querySelector('.main-cards');
    itemsSection.remove();
}

// A função filterCards recebe um argumento filterButton, que é a categoria selecionada pelo usuário. 
// Se a categoria for "Todos", a função retorna o array data. Caso contrário, um novo array 
// cardsFiltered é criado e preenchido com os objetos do array data que tenham a categoria 
// selecionada pelo usuário. A função retorna o array cardsFiltered.*/

function filterCards(filterButton) {
    if (filterButton === "Todos") {
        return data;
    }

    const cardsFiltered = [];

    for (let i = 0; i < data.length; i++) {
        if (data[i].tag === filterButton) {
            cardsFiltered.push(data[i]);
        }
    }

    return cardsFiltered;

}

// A função updateCards é responsável por atualizar a lista de itens exibidos na página quando o 
// usuário seleciona uma categoria. Primeiro, a função filterCards é chamada com o argumento 
// this.innerText, que é a categoria selecionada pelo usuário. O resultado é armazenado em uma 
// variável filteredCards. Em seguida, a função removeItems é chamada para remover a seção de 
// itens do DOM e, por fim, a função renderItems é chamada com o argumento filteredCards para 
// renderizar a nova lista de itens na página.

function updateCards() {
    const filteredCards = filterCards(this.innerText);
    removeItems();
    renderItems(filteredCards);
}

// A variável filterButtons seleciona todos os elementos com a classe button-header do HTML. 
// Em seguida, um laço for é usado para adicionar um evento de clique a cada elemento selecionado. 
// O evento chama a função updateCards.

const filterButtons = document.querySelectorAll(".button-header");

for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener("click", updateCards);
}

renderItems(data);

// A função filterItems() é responsável por filtrar os itens do array data, com base no que é digitado 
// na caixa de pesquisa #search-input. A busca é feita comparando os valores de nameItem, description e 
// tag de cada item com o valor de searchTerm.

function filterItems() {
    const searchTerm = document.querySelector("#search-input").value.toLowerCase();
    const filteredClothing = data.filter(clothing => {
        const clothingName = clothing.nameItem.toLowerCase();
        const clothingDescription = clothing.description.toLowerCase();
        const clothingTag = clothing.tag.toLowerCase();
        return (
            clothingName.includes(searchTerm) ||
            clothingDescription.includes(searchTerm) ||
            clothingTag.includes(searchTerm)
        );
    }
    )
    removeItems();
    renderItems(filteredClothing);
}

// A função resetClothing() é responsável por renderizar todos os itens novamente

function resetClothing() {
    renderItems(data);
}

// Dois eventos são adicionados com addEventListener():
// O evento de clique do botão de pesquisa (search-button), que dispara a função filterItems().

document.getElementById("search-button").addEventListener("click", filterItems);

// O evento de entrada na caixa de pesquisa (search-input), que verifica se o valor é vazio e, caso 
// seja, renderiza todos os itens novamente utilizando a função resetClothing().

document.getElementById("search-input").addEventListener("input", event => {
    if (event.target.value === "") {
        removeItems();
        renderItems(data);;
    }
});

// Essas linhas são responsáveis por armazenar referências a elementos do HTML que serão utilizados 
// no código. cardAddCart é uma referência à lista de itens no carrinho, emptyCart é uma referência 
// a um elemento que é exibido quando o carrinho está vazio, quantity é uma referência ao elemento 
// que mostra a quantidade de itens no carrinho e countQuantity é uma variável que armazena o valor 
// atual da quantidade de itens no carrinho.

const cardAddCart = document.querySelector("#list-cart");
const emptyCart = document.querySelector(".cart-empty");
const quantity = document.querySelector("#quantity");
let countQuantity = 0;

// Este código adiciona um ouvinte de eventos "click" ao documento. Quando ocorre um clique em qualquer 
// parte do documento, a função anônima é executada. Dentro da função, é verificado se o alvo do evento 
// de clique tem a classe "add-cart". Se tiver, algumas informações do item adicionado ao carrinho são 
// coletadas, incluindo a imagem, o título e o preço. Em seguida, a função "renderItemsToCart" é chamada, 
// passando essas informações como argumentos para adicionar o item ao carrinho. Também é atualizado o 
// contador de quantidade de itens e o valor exibido na tela. Por fim, a função "updateTotalValue" é chamada 
// para atualizar o valor total do carrinho.

document.addEventListener("click", function(e) {
    if (e.target.classList.contains("add-cart")) {
        const itemToAdd = e.target.parentElement;
        console.log(itemToAdd)
        emptyCart.classList.add("display-None");
        const card = e.target.parentElement;
        const imageCard = card.querySelector(".image").src;
        const titleCard = card.querySelector(".title-name").textContent;
        const priceCard = card.querySelector(".price").innerText;

        renderItemsToCart(imageCard, titleCard, priceCard);
        countQuantity++;
        quantity.innerText = countQuantity;
        updateTotalValue()
}})

// Este código também adiciona um ouvinte de eventos "click" ao documento. Quando ocorre um clique em qualquer parte 
// do documento, a função anônima é executada. Dentro da função, é verificado se o alvo do evento de clique tem a 
// classe "button-remove". Se tiver, é obtido o elemento pai do botão clicado (que é a li do item do carrinho) e ele 
// é removido da lista. Também é atualizado o contador de quantidade de itens e o valor exibido na tela. Em seguida, 
// é verificado se a lista de itens do carrinho está vazia e, se estiver, a classe "display-None" é removida do 
// elemento "emptyCart", o que faz com que a mensagem "carrinho vazio" seja exibida novamente. Por fim, a função 
// "updateTotalValue" é chamada para atualizar o valor total do carrinho.

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("button-remove")) {
        const liToRemove = e.target.parentElement;
        liToRemove.remove();
        countQuantity--;
        quantity.innerText = countQuantity;
        if (cardAddCart.children.length == 0) {
            emptyCart.classList.remove("display-None");
        }   updateTotalValue()
    }


})

// Este código é uma função chamada "renderItemsToCart" que cria elementos HTML dinamicamente e adiciona esses elementos 
// a um carrinho de compras na página. A função recebe três parâmetros: "img", que é a URL da imagem do produto, "name", 
// que é o nome do produto e "price", que é o preço do produto. A função começa criando um elemento "li" para representar 
// o item do carrinho e adicionando a classe "li-cart-item" a esse elemento. Em seguida, são criados elementos "h3", "img" 
// e "price" para representar o nome, imagem e preço do produto, respectivamente. O texto do nome e preço é definido usando 
// "textContent" ou "innerText" e a URL da imagem é definida usando "src". As classes "h3-cart" e "price-cart" são 
// adicionadas aos elementos "h3" e "price", respectivamente. Por fim, um botão "Remover" é criado usando um elemento "button",
// adicionando a classe "button-remove" e definindo o texto do botão usando "textContent". Todos os elementos são anexados 
// ao elemento "li" usando o método "appendChild" e, em seguida, o elemento "li" é adicionado ao carrinho de compras usando 
// o objeto "cardAddCart".

function renderItemsToCart(img, name, price) {
    const liCart = document.createElement("li");
    liCart.classList.add("li-cart-item")
    const h3Cart = document.createElement("h3");
    h3Cart.textContent = name;
    h3Cart.classList.add("h3-cart");
    const imgCart = document.createElement("img");
    imgCart.src = img;
    const priceCart = document.createElement("price");
    priceCart.classList.add("price-cart");
    priceCart.innerText = price;
    const buttonRemove = document.createElement("button");
    buttonRemove.classList.add("button-remove");
    buttonRemove.textContent = "Remover";

    liCart.appendChild(h3Cart);
    liCart.appendChild(imgCart);
    liCart.appendChild(priceCart);
    liCart.appendChild(buttonRemove);

    cardAddCart.appendChild(liCart);
}

// A função updateTotalValue() atualiza o valor total do carrinho de compras em uma página da web. Ela seleciona os elementos 
// <li> que representam os itens do carrinho, percorre cada item do carrinho em um loop for, converte o preço do item em um 
// número de ponto flutuante com a função parseFloat() e adiciona-o ao valor total. Depois que o loop é concluído, o valor 
// total é arredondado para duas casas decimais e atualizado no elemento HTML que exibe o valor total. A função atualiza 
// automaticamente o valor total do carrinho de compras em uma página da web, sempre que um item é adicionado ou removido 
// do carrinho.

function updateTotalValue() {
    const cartItems = document.querySelectorAll("#list-cart li");
    let totalValue = 0;
  
    for (let i = 0; i < cartItems.length; i++) {
      const itemPrice = cartItems[i].querySelector(".price-cart").innerText;
      const itemValue = parseFloat(itemPrice.replace("R$ ", ""));
      totalValue += itemValue;
    }
  
    const totalValueElement = document.querySelector("#value");
    totalValueElement.innerText = `R$ ${totalValue.toFixed(2)}`;
  }






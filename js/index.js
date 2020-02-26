// main JS file that initiates this App/page JS modules
//Create elements
  //Inside this div
  console.log('moñeco');
  let allCars = [];
  const carList = document.getElementById('cars');

  //Create Elements & show Data
  const itemCar = (car) => {
    const card = document.createElement('div')
    card.classList.add('card');


    card.innerHTML = `
      <p class="model">${car.model}</p>
      <img src='${car.imagePath}'/>
      <p class="price">${car.priceEuros}</p>
    `;
    return card;
  }

  //Toggle Shopping Bag

  const toggleShoppingBag = (car) => {
    allCars.map((itm) => {
      if(itm.model === car.model) {
        itm.isInShoppingBag = !itm.isInShoppingBag;
      }
      return itm;

    });
    render();
  }

  //Create Button
  const itemButton = (car) => {
    const itemBtn = document.createElement('button');
    itemBtn.innerText = car.isInShoppingBag ? 'Remove from Shopping Bag' : 'Add to Shopping Bag';
    itemBtn.addEventListener('click', () => toggleShoppingBag(car));

    return itemBtn;
  }

  const getCars = () => {
    fetch('./json/datalist.json')
    .then((res) => res.json())
    .then((data) => {
      allCars = data;
      renderItems();
    })

  }


  // Fetch
  const renderItems = () => {
    carList.innerHTML = '';
    allCars.forEach((car) => {
      //Show data on card div
      const carCard = itemCar(car);
      carList.appendChild(carCard);
      //Button
      const carButton = itemButton(car);
      carCard.appendChild(carButton);

    })
  }


  const totalPrices = () => {
    const totalCart = document.getElementById('total');
    const totalPrice = allCars.reduce(
      (acc, curr) => curr.isInShoppingBag ? acc + +curr.price : acc,
      0
    )
    totalCart.innerText = totalPrice;
  }


  const render = () => {
    renderItems();
    totalPrices();
  }

  window.addEventListener('load', () => {
    render();
    getCars();
  })

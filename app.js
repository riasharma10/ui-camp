// Make a GET request to the fruityvice api to retrieve some fruit data
const apiRequest = async () => {
  const BASE_URL = 'https://www.fruityvice.com/api/';

  // This endpoint (https://www.fruityvice.com/doc/index.html#api-GET-getAll) returns a list of all the fruits and their info, feel free to play around with different endpoints!
  const resourcePath = 'fruit/all';

  // Making a fetch request to an API endpoint
  // Note: a fetch request is an asynchronous operation, and `await` tells the program to wait until the request has been completed before continuing
  const endpoint = BASE_URL + resourcePath;
  const response = await fetch(buildProxyEndpoint(endpoint), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Await the Promise returned by response.json() to get the actual data from the response.
  const data = await response.json();

  console.log(data);

  // Return the response in JSON format
  return data;
};

function calorieCheck(fruit) {
  return fruit.nutritions.calories > 50
}

const updatePage = async () => {
  const gallery = document.getElementById('ui-camp-gallery');

  // Make API request and get an array of fruit objects
  const fruitsArray = await apiRequest();
  console.log(fruitsArray);

  // TODO: Use either `map` and/or `filter` to extract some data from the array of fruit objects
  // For example, find "name of all fruits whose sugar > 15",

  const filteredFruit = fruitsArray.filter(calorieCheck)


  // TODO: Create a new HTML element to display your data
  const table = document.createElement('table');
  table.className = 'fruit-table'; // Add a class for styling if you want

  // Create table header
  // const thead = document.createElement('thead');
  // const headerRow = document.createElement('tr');
  // const headerCell = document.createElement('th');
  // headerCell.textContent = 'Fruit Names';
  // headerRow.appendChild(headerCell);
  // thead.appendChild(headerRow);
  // table.appendChild(thead);

  // Create table header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  // Define the headers
  const headers = ['Fruit Names', 'Calories', 'Carbohydrates', 'Fat', 'Protein', 'Sugar'];
  headers.forEach(headerText => {
      const headerCell = document.createElement('th');
      headerCell.textContent = headerText;
      headerRow.appendChild(headerCell);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  const tbody = document.createElement('tbody');

  // Iterate over each fruit in the filteredFruits array and create a table row
  filteredFruit.forEach(fruit => {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.textContent = fruit.name; // Assign the fruit name to the cell
      row.appendChild(cell); // Add the cell to the row

      const cellCalories = document.createElement('td');
      cellCalories.textContent = fruit.nutritions.calories;
      row.appendChild(cellCalories);

      const cellCarbs = document.createElement('td');
      cellCarbs.textContent = fruit.nutritions.carbohydrates
      row.appendChild(cellCarbs);

      const cellFat = document.createElement('td');
      cellFat.textContent = fruit.nutritions.fat
      row.appendChild(cellFat);

      const cellProtein = document.createElement('td');
      cellProtein.textContent = fruit.nutritions.protein
      row.appendChild(cellProtein);

      const cellSugar = document.createElement('td');
      cellSugar.textContent = fruit.nutritions.sugar
      row.appendChild(cellSugar);

      tbody.appendChild(row); // Add the row to the tbody
  });

  table.appendChild(tbody); // Add the tbody to the table
  gallery.appendChild(table); // Add the table to the newElement div

  // Append the newElement div to your document, you might want to append it to a specific container
  // document.body.appendChild(newElement); // Append to body or replace with your specific container



  // TODO: Append your new element to the page
};

// SAMPLE CODE of how to create and append a new HTML element to the page
const exampleAddElement = () => {
  // Create a new HTML element and set its properties
  const newElement = document.createElement('div');
  newElement.innerHTML = 'this text is inside a div';

  // Append the new element to an existing part of the webpage
  const existingElement = document.getElementById('example-id');
  existingElement.append(newElement);
};

/**
 * To access information in this API, we need to send our requests through a proxy due to CORS restrictions.
 * This will be used as our proxy to avoid CORS issues.
 */
// do not touch - stencil code to add the proxy to avoid CORS
const PROXY_URL = 'https://cors-hijacker.vercel.app/api?url=';
const buildProxyEndpoint = (endpoint) => `${PROXY_URL}${endpoint}`;

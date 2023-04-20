let duckArray = [];
let DuckArrayFromStorage = localStorage.getItem('duckArray');
if (DuckArrayFromStorage){
  duckArray = JSON.parse(DuckArrayFromStorage);
} else {
  // These are your instances: 19
  let bag = new Duck('bag');
  let banana = new Duck('banana');
  let bathroom = new Duck('bathroom');
  let boots = new Duck('boots');
  let breakfast = new Duck('breakfast');
  let bubblegum = new Duck('bubblegum');
  let chair = new Duck('chair');
  let cthulhu = new Duck('cthulu');
  let dogduck = new Duck('dogduck');
  let dragon = new Duck('dragon');
  let pen = new Duck('pen');
  let petsweep = new Duck('petsweep');
  let scissors = new Duck('scissors');
  let shark = new Duck('shark');
  // What's going on here???
  let sweep = new Duck('sweep', 'png');
  let tauntaun = new Duck('tauntaun');
  let unicorn = new Duck('unicorn');
  let watercan = new Duck('watercan');
  let wineglass = new Duck('wineglass');
  
  duckArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogduck, dragon, pen, petsweep, scissors, shark, sweep, tauntaun, unicorn, watercan, wineglass);
}

let imageIndex = [];

let myContainer = document.querySelector('section');

let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');

let viewResultsBtn = document.querySelector('section ~ div')

let counter = 0;
let maxCounter = 5;

function Duck(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.votes = 0;
}

// console.log(duckArray);

// - get a random number to use with duck array to get a random duck
function selectRandomDuckNumber() {
  // the effect here is that a random number between 0 and 6.9 will be generated by Math.random() * allDuck.length and then Math.floor will round it down so we will get a number a number between 0 and 6
  return Math.floor(Math.random() * duckArray.length);
}
// - update the DOM (change duck photos in the DOM)
//     - increment the number of views on the ducks
function renderDucks() {

  while (imageIndex.length < 6) {
    // get random number included in duck array
    let random = selectRandomDuckNumber();
    // while that random number is included in the image index array
    while (imageIndex.includes(random)) {
      // get a new random number included in duck array
      random = selectRandomDuckNumber();
      // Break out of loop when random number is not included in index array
    }
    // We know we have a unique random number, which we push into the array.
    imageIndex.push(random)
  }
  console.log(imageIndex)
  let duck1 = imageIndex.shift(); // 5
  let duck2 = imageIndex.shift(); // 5
  let duck3 = imageIndex.shift(); // 5
  console.log(duck1, duck2, duck3);
  // as long as duck1 === duck2 we need a new number for duck2
  let selectImage = []

  while (duck1 === duck2) {
    duck2 = selectRandomDuckNumber(); // 5
    console.log(duck1, duck2); 0
  }

  // seriously consider using an array — you can push things to an array
  // remember: how do you find if an array includes something?
  // look it up - Google

  image1.src = duckArray[duck1].src;
  image1.alt = duckArray[duck1].name;
  duckArray[duck1].views++;
  image2.src = duckArray[duck2].src;
  image2.alt = duckArray[duck2].name;
  duckArray[duck2].views++;
  image3.src = duckArray[duck3].src;
  image3.alt = duckArray[duck3].name;
  duckArray[duck3].views++;

}

// - handle duck clicks
//     - what duck was click on
//     - increment the number of votes on that duck

function handleDuckClick(event) {
  counter++;
  console.log(event.target.alt);
  let clickedDuck = event.target.alt;
  // find a the duck instance in the duck array whose name property equals the clickedDuck value.
  for (let i = 0; i < duckArray.length; i++) {
    if (clickedDuck === duckArray[i].name) {
      duckArray[i].votes++;
      console.log(duckArray);
    }
  }
  // check to see if the round has ended
  if (counter < maxCounter) {
    // the round can continue, new ducks should render
    renderDucks();
  } else {
    // After voting rounds have been completed, remove the event listeners on the product.
    myContainer.removeEventListener('click', handleDuckClick);
    // make the button clickable
    viewResultsBtn.addEventListener('click', viewResults);
    // stop the game and render the results
  }

  let stringifiedDuckArray = JSON.stringify(duckArray);
  localStorage.setItem('duckArray', stringifiedDuckArray);
}

function viewResults() {
  // let ul = document.querySelector('ul');
  // for (let i = 0; i < duckArray.length; i++) {
  //   let li = document.createElement('li');
  //   li.textContent = `${duckArray[i].name} had ${duckArray[i].views} views and ${duckArray[i].votes} votes.`;
  //   ul.appendChild(li);
  // }
  renderChart();
}
renderDucks();

myContainer.addEventListener('click', handleDuckClick);





// We use render to cause chart to appear
function renderChart() {

  // When using render, we need a window into the DOM
  // const ctx = document.getElementById('myChart');

  let duckNames = []
  let duckVotes = []
  let duckViews = []

  for (let i = 0; i < duckArray.length; i++) {


    // we use let for name because ????
    let name = duckArray[i].name;
    duckNames.push(name);
    // Using .push takes values received from the user and pushes this information back to the array
    duckVotes.push(duckArray[i].votes);
    duckViews.push(duckArray[i].views);
  }

  const data = {
    type: 'bar',
    data: {
      labels: duckNames,
      datasets: [{
        label: 'votes',
        data: duckVotes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)'
        ],
        borderWidth: 1
      },
      {
        label: 'Views',
        data: duckViews,
        backgroundColor: [
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgb(255, 159, 64)'
        ],
        borderWidth: 1
      }]
    },

    // const config = {
    //   type: 'bar',
    //   data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    };

    let canvasChart = document.getElementById('myChart');
    let chart = new Chart (canvasChart, data)
  //   const myChart = new Chart(canvasChart, config);
  // }
}
// renderChart()


// const config = {
//   type: 'bar',
//   data: {
//     labels: duckNames,
//     datasets: [
//       {
//         label: '# of Votes',
//         data: duckVotes,
//         borderWidth: 1,
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(255, 159, 64, 0.2)'
//         ],
//         borderColor: [
//           'rgb(255, 99, 132)',
//           'rgb(255, 159, 64)'
//         ]
//       },
//       {
//         label: '# of Views',
//         data: duckViews,
//         borderWidth: 1,
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(255, 159, 64, 0.2)'
//         ],
//         borderColor: [
//           'rgb(255, 99, 132)',
//           'rgb(255, 159, 64)'
//         ]
//       }
//     ]
//   },
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     }
//   }
// };
// new Chart(ctx, config);


renderDucks();

myContainer.addEventListener('click', handleDuckClick);


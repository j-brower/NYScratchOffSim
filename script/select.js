var tickets = [];

axios.get('https://j-brower.github.io/NYScratchOffSim/tickets.json').then(response => {

  ticketsRes = response.data;
  for(var i = 0; i < tickets.length; i++) {
    var obj = {
      name: ticketsRes[i].name;
      price: ticketsRes[i].price;
      imgURL: ticketsRes[i].imgURL;
      chances: ticketsRes[i].chances;
      quantity: 0;
    }
    tickets.append(obj);
  }
  for(var i = 0; i < tickets.length; i++) {
    console.log(tickets[i].name);
  }
  }, response => {
    console.log(this.results);
    console.log("Could not retrieve data.");
  });
var select = new Vue({

  el: '#select',
  data: {


  }

})

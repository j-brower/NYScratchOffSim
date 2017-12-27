var ticketsArray = [];

axios.get('https://j-brower.github.io/NYScratchOffSim/tickets.json').then(response => {

  ticketsRes = response.data.tickets;
  for(i = 0; i < ticketsRes.length; i++) {
    var obj = {
      name: ticketsRes[i].name,
      price: ticketsRes[i].price,
      imgURL: ticketsRes[i].imgURL,
      chances: ticketsRes[i].chances,
      quantity: 0
    }
    ticketsArray.push(obj);
  }
  for(i = 0; i < ticketsArray.length; i++) {
    console.log(ticketsArray[i].name + " Available");
  }
  }, response => {
    console.log(this.results);
    console.log("Could not retrieve data.");
  });


var app = new Vue({

  data: {
    tickets: ticketsArray,
    selecting: true,
    showingResults: false

  },
  methods: {
    buyTickets: function(event) {
      //alert("not implemented");
      this.selecting = false;
      this.showingResults = true;

    },
    saveResults: function(event) {
      //alert("not implemented");
      this.showingResults = false;
      this.selecting = true;
      for(var i=0; i<this.tickets.length; i++) {
        this.tickets[i].quantity = 0;
      }
    }
  }


})

app.$mount('.ticketapp')

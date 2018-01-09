function readBalance() {
  var name="balance";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length + 1, c.length);
      }
  }
  return "";
}

function simulateScratch(ticket) {
  return 1;
}


var ticketsArray = [];
var initialBalance = parseInt(readBalance());
console.log(initialBalance);
if(isNaN(initialBalance)) {
  initialBalance = 0;
  document.cookie = "balance=0; expires=Sat, 01 Jan 2118 12:00:00 UTC; path=/";
}

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
    balance: initialBalance,
    resultsArray: [],
    selecting: true,
    showingResults: false

  },
  methods: {
    buyTickets: function(event) {
      //alert("not implemented");
      this.selecting = false;
      for(var i = 0; i < this.tickets.length; i++) {
        if(this.tickets[i].quantity > 0) {
          var result = 0;
          for(var j = 0; j < this.tickets[i].quantity; j++) {
            result += simulateScratch(this.tickets[i]);
          }
          var resultTicket = this.tickets[i];
          resultTicket.result = result;
          this.resultsArray.push(resultTicket);
          this.balance += result;
        }
      }
      this.showingResults = true;
    },
    endResults: function(event) {
      //alert("not implemented");
      this.showingResults = false;
      this.selecting = true;
      for(var i=0; i<this.tickets.length; i++) {
        this.tickets[i].quantity = 0;
      }
      document.cookie = "balance=" + this.balance +
        "; expires=Sat, 01 Jan 2118 12:00:00 UTC; path=/";
    }
  }


})

app.$mount('.ticketapp')

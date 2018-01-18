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
  var wins = [];
  for(var i = 0; i < ticket.chances.length; i++) {
    if(isWinner(ticket.chances[i].chance)) {
      wins.push(ticket.chances[i].prize);
    }
  }
  if(wins.length > 1) { //pick a pseudorandom prize from winners
    var index = Math.floor(Math.random() * Math.floor(wins.length));
    console.log("won " + wins[index]);
    if(wins[index] == "Free Take 5") {
      return wins[index];
    }
    return wins[index] - ticket.price;
  } else if(wins.length == 1) {
    console.log("won " + wins[0]);
    if(wins[0] == "Free Take 5") {
      return wins[0];
    }
    return wins[0] - ticket.price;
  }
  return (ticket.price * -1);
}
function isWinner(chance) {
  //TODO: figure out how to get numbers from random.org with axios

  if((chance % 1) == 0) {
    //console.log(chance + " has no decimal component");
    return 1 == Math.floor(Math.random() * Math.floor(chance));
  } else if(((chance * 10) % 1) == 0) {
    return 10 > Math.floor(Math.random() * Math.floor(chance * 10));
  } else if(((chance * 100) % 1) == 0) {
    return 100 > Math.floor(Math.random() * Math.floor(chance * 100));
  }
  return false;
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
          for(var j = 0; j < this.tickets[i].quantity; j++) {
            var result = 0;
            result = simulateScratch(this.tickets[i]);
            var resultTicket = {};
            resultTicket.price = this.tickets[i].price;
            resultTicket.imgURL = this.tickets[i].imgURL;
            resultTicket.result = result;
            this.resultsArray.push(resultTicket);
            if(result != "Free Take 5") {
              this.balance += result;
            } else { //deduct cost of ticket for quickpick
              this.balance -= 1;
            }
          }
        }
      }
      this.showingResults = true;
      window.scrollTo(0, 0);
      document.cookie = "balance=" + this.balance +
        "; expires=Sat, 01 Jan 2118 12:00:00 UTC; path=/";
    },
    endResults: function(event) {
      //alert("not implemented");
      this.showingResults = false;
      this.selecting = true;
      window.scrollTo(0, 0);
      for(var i=0; i<this.tickets.length; i++) {
        this.tickets[i].quantity = 0;
      }
      this.resultsArray = [];
    }
  }


})

app.$mount('.ticketapp')

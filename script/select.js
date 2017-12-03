var data = {};

axios.get('https://j-brower.github.io/NYScratchOffSim/tickets.json').then(response => {

    console.log(response.data.results);

  }, response => {
    console.log(this.results);
    console.log("Could not retrieve data.");
  });
var select = new Vue({

  el: '#select',
  data: {
    tickets: function() {
      ticketArray = [];
      var jsonTicketArray = data.get("tickets");
      for(i = 0; i < jsonTicketArray.length; i++) {
        console.log(jsonTicketArray[i]);
      }
      return ticketArray;
    }

  }

})

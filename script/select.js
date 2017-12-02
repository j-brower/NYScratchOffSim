var data = {};

Vue.http.get('https://j-brower.github.io/NYScratchOffSim/tickets.json').then(response => {

    // get body data
    data = response.json();
  }, response => {
    console.log(response);
    console.log("Could not retrieve data.");
  });
console.log(data);
var select = new Vue({

  el: '#select',
  data: {
    tickets: function() {
      ticketArray = [];
      var jsonTicketArray = yourJSONObject.get("tickets");
      for(i = 0; i < jsonTicketArray.length; i++) {
        console.log(jsonTicketArray[i]);
      }
      return ticketArray;
    }

  }

})

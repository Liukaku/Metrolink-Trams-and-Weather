

let APIKEY0 = "";
const proxyURL = "https://cors-anywhere.herokuapp.com/";


const xhr = new XMLHttpRequest();
    console.log(xhr.readyState);
    function buildrequest(){
    xhr.onreadystatechange = function(){
      document.getElementById('overlayScreen').classList.add('goodbyeOverlay');
        if (this.readyState == 4) {
            if (xhr.status == 200) {
                      createTimes(); //see metro1.js this is done to clean this doc up
                      
            } 
            if (xhr.status == 404) {
                console.log('File or resourse not found');
            }
        }
    };
  }



    

    function autocomplete(inp, arr) {
        /*the autocomplete function takes two arguments,
        the text field element and an array of possible autocompleted values:*/
        var currentFocus;
        /*execute a function when someone writes in the text field:*/
        inp.addEventListener("input", function(e) {
            var a, b, i, val = this.value;
            /*close any already open lists of autocompleted values*/
            closeAllLists();
            if (!val) { return false;}
            currentFocus = -1;
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            /*append the DIV element as a child of the autocomplete container:*/
            this.parentNode.appendChild(a);
            /*for each item in the array...*/
            for (i = 0; i < arr.length; i++) {
              /*check if the item starts with the same letters as the text field value:*/
              if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
              }
            }
        });
        /*execute a function presses a key on the keyboard:*/
        inp.addEventListener("keydown", function(e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
              /*If the arrow DOWN key is pressed,
              increase the currentFocus variable:*/
              currentFocus++;
              /*and and make the current item more visible:*/
              addActive(x);
            } else if (e.keyCode == 38) { //up
              /*If the arrow UP key is pressed,
              decrease the currentFocus variable:*/
              currentFocus--;
              /*and and make the current item more visible:*/
              addActive(x);
            } else if (e.keyCode == 13) {
              /*If the ENTER key is pressed, prevent the form from being submitted,*/
              e.preventDefault();
              if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
              }
            }
        });
        function addActive(x) {
          /*a function to classify an item as "active":*/
          if (!x) return false;
          /*start by removing the "active" class on all items:*/
          removeActive(x);
          if (currentFocus >= x.length) currentFocus = 0;
          if (currentFocus < 0) currentFocus = (x.length - 1);
          /*add class "autocomplete-active":*/
          x[currentFocus].classList.add("autocomplete-active");
        }
        function removeActive(x) {
          /*a function to remove the "active" class from all autocomplete items:*/
          for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
          }
        }
        function closeAllLists(elmnt) {
          /*close all autocomplete lists in the document,
          except the one passed as an argument:*/
          var x = document.getElementsByClassName("autocomplete-items");
          for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
          }
        }
      }
      /*execute a function when someone clicks in the document:*/
      document.addEventListener("click", function (e) {
          closeAllLists(e.target);
      });
      }

      
      
    //view the stops.js file for a list of the stops
    //how many are in the array
    var stopsLength = stops.length;

    console.log(newStops[2]);

    //creates a blank array to push all the names and IDs into for the text boxes
    let stopNames = [];

    for ( var a = 0; a < stopsLength; a++ ) {
      stopNames.push(newStops[a].StationLocation + " to "  + newStops[a].Dest0 + " " + newStops[a].Id)
    }

    autocomplete(document.getElementById("search"), stopNames);
    autocomplete(document.getElementById("search1"), stopNames);

   

    
    document.getElementById('btnSearch').addEventListener('click', () => {
      document.getElementById('overlayScreen').classList.add('hideOptions');
      document.getElementById('hiddenFormControl').classList.remove('hiddenForm');
      document.getElementById('hiddenFormControl').classList.add('visibleForm');
      document.getElementById('overlayScreen').classList.add('goodbyeOverlay');

      var searchBoxWord = document.getElementById('search').value;

    
      let uwuWhatsThis = searchBoxWord.split(' ').pop();
      let theNumbersMason = parseInt(uwuWhatsThis, 10);
      let words = searchBoxWord.split(' ');
      let wordNumber = words.length - 2;
      let last3 = uwuWhatsThis;

      xhr.open('GET', proxyURL + 'https://api.tfgm.com/odata/Metrolinks(' + last3 + ')', true);
      xhr.setRequestHeader("Ocp-Apim-Subscription-Key", APIKEY0);
      xhr.send();
      
      setTimeout( buildrequest(), 500);
    });
    
    document.getElementById('btnSearch1').addEventListener('click', () => {
      document.getElementById('overlayScreen').classList.add('hideOptions');
      document.getElementById('hiddenFormControl').classList.remove('hiddenForm');
      document.getElementById('hiddenFormControl').classList.add('visibleForm');
      

      var searchBoxWord = document.getElementById('search1').value;
      let searchTerm = document.getElementById('search1').value;
    
      let uwuWhatsThis = searchBoxWord.split(' ').pop();
      let theNumbersMason = parseInt(uwuWhatsThis, 10);
      let words = searchBoxWord.split(' ');
      let wordNumber = words.length - 2;
      let last3 = uwuWhatsThis;

      xhr.open('GET', proxyURL + 'https://api.tfgm.com/odata/Metrolinks(' + last3 + ')', true);
      xhr.setRequestHeader("Ocp-Apim-Subscription-Key", APIKEY0);
      xhr.send();
      

      buildrequest();
    });



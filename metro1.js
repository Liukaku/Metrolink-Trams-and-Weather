function createTimes(){
    console.log(xhr.response);
    let metroReply = JSON.parse(xhr.response);
    console.log(metroReply);
     let metroID = metroReply.Id;
       
         console.log("ping");
    let createDiv = document.createElement("div");
    let createStop = document.createElement("p");
    let createTime0 = document.createElement("p");
    let createTime1 = document.createElement("p");
    let createTime2 = document.createElement("p");
    let createDest0 = document.createElement("p");
    let createMessage = document.createElement("p");
    let createUpdated = document.createElement("p");
    createStop.textContent = "From " + metroReply.StationLocation;
      //document.getElementsByTagName("p")[0].setAttribute("class", "stopCreated");
    createTime0.textContent = "Next Tram In " + metroReply.Wait0; //it's .value. for interacting with the array of objects
    createTime1.textContent = "And then " + metroReply.Wait1;
    createTime2.textContent = "and then " + metroReply.Wait2;
    createDest0.textContent = "going to " + metroReply.Dest0;
    createMessage.textContent = metroReply.MessageBoard;
    createUpdated.textContent = "Last Updated " + metroReply.LastUpdated;
    let out = document.querySelector("#bottle")
    out.insertAdjacentElement("afterbegin", createTime2);
    out.insertAdjacentElement("afterbegin", createTime1);
    out.insertAdjacentElement("afterbegin", createTime0);
    out.insertAdjacentElement("afterbegin", createStop);
    out.insertAdjacentElement("afterbegin", createDest0);
    out.insertAdjacentElement("beforeend", createMessage);
    out.insertAdjacentElement("beforeend", createUpdated);
    
    
}


  document.getElementById('btnSearch').addEventListener('click', () => {
    var searchTerm = document.getElementById('search').value;

        let uwuWhatsThis = searchTerm.split('to').pop();
        let theNumbersMason = parseInt(uwuWhatsThis, 10);
        let words = searchTerm.split(' ');
        let wordNumber = words.length - 2;
        let lettTheBoardDecide = words[wordNumber].toString().includes('Victoria');
        console.log(wordNumber);
        console.log(words[wordNumber]);
        console.log(lettTheBoardDecide);

        console.log(searchTerm);
        if(lettTheBoardDecide = "true") {
          const searchTerm = "Manchester";
        }
});

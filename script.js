function showLinks() {
  let Url = localStorage.getItem("Url");
  if (Url == null) {
    urlObj = [];
  } else {
    urlObj = JSON.parse(Url);
  }
  let html = "";
  urlObj.forEach(function(element, index) {
    html += `
    <div class="lowwer">
    <p id="message"><a href="${element[1]}">${element[1].split("://")[1]}</a></p>
    </div>`;
  });
  let temp = document.getElementById(
    "links"
  )
  temp.innerHTML= html;
}

document.getElementById("myinput").onclick = () => {
  var link = document.getElementById("linkinput").value;

  if (link != "") {
    var element = document.getElementById("links");
    var data = {
      domain: "Dojeto.cf",
      originalURL: link,
      allowDuplicates: false,
    };
    fetch("https://api.short.cm/links/public", {
      method: "post",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        authorization: "pk_3mwBBe1KpOKh5mEC",
      },
      body: JSON.stringify(data),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var test = data.shortURL.split("://")[1];
        var test2 = data.shortURL;
        let Url = localStorage.getItem("Url");
        if (Url == null) {
          urlObj = [];
        } else {
          urlObj = JSON.parse(Url);
        }
        urlObj.push([link,test2]);
        localStorage.setItem("Url", JSON.stringify(urlObj));
    
        console.log(element.value,test2);
        showLinks(test,test2);
      });

  } else {
    console.log("no");
  }
};

showLinks();

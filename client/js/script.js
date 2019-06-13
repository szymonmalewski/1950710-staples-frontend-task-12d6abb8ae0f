
fetch('http://localhost:3005/products')
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        let result = `<h2> Products: </h2>`;

        var i = 1;    
        data.forEach((user) => {

            
            var { 
            	general: { presentable_id, name, description },
            	brand: { name }, 
            	images: {primary: { large }}} = user;
            result +=
            `<div class = "box box${i}">
                <img class= "photo" src=${large}>

                <div class="info">
                	<p class="mainText">${user.general.name}</p>
	                <p class="mainText"> ID: ${presentable_id} </p>
	            </div>
                <div class="buttons">
                    <input type="text" class="quantity" id="quantity${i}" placeholder="1">
                    <button class="addCart" id="addCart${i}">Add to cart</button>
                </div>
                <button class="modal-button"  href="#myModal${i}">MORE</button>
                <div id="myModal${i}" class="moreInfo">
                    <div class="modal-content">
                        <span class="close">×</span>
                        <img class= "photoModal" src=${large}>
                        <div class="infoModal">
                            <p class="textModal">${user.general.name}</p>
                            <p class="textModal"> ID: ${presentable_id} </p>
                            <p class="textModal"> Brand : ${name}</p>
                            <div class="textModal description">${description}</div>
                        </div>
                        <div class="buttonsModal">
                            <input type="text" class="quantity" id="quantity${i}" placeholder="1">
                            <button class="addCart" id="addCart${i}">Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>`;

            document.getElementById('result').innerHTML = result;
            i++;
        });
    })
    .then(function(){

        $('#result').easyPaginate({
            paginateElement: '.box',
            elementsPerPage: 6,
            effect: 'climb'
        });
    })
    .then(function(){

        var btn = document.querySelectorAll("button.modal-button");
        var modals = document.querySelectorAll('.moreInfo');
        var spans = document.getElementsByClassName("close");

        for (var i = 0; i < btn.length; i++) {
         btn[i].onclick = function(e) {
            e.preventDefault();
            modal = document.querySelector(e.target.getAttribute("href"));
            modal.style.display = "block";
         }
        }

        for (var i = 0; i < spans.length; i++) {
         spans[i].onclick = function() {
            for (var index in modals) {
              if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";    
            }
         }
        }

        window.onclick = function(event) {
            if (event.target.classList.contains('modal')) {
             for (var index in modals) {
              if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";    
             }
            }
        }

    });

    $("#search-criteria").on("keyup", function() {
        var g = $(this).val().toLowerCase();
        $(".box").each(function() {
            var s = $(this).text().toLowerCase();
           $(this).closest('.box')[ s.indexOf(g) !== -1 ? 'show' : 'hide' ]();
       });
    });



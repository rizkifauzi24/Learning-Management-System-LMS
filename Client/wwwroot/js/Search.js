$(document).ready(() => {
    //let CardDiv = document.getElementById("card2");

    $.ajax({
        url: "https://localhost:44306/API/Course/GetCourse",
    }).done((result) => {

        let CardDiv = document.getElementById("#card2");
        let text = '';


        $('#pagination-container').pagination({
            dataSource: result,
            pageSize: 2,
            ulClassName: 'pagination',
            callback: function (data, pagination) {

                $.each(data, function (key, val) {
                    console.log(val.name);
                    text += `

                        <div class="card" id="card23">
                        <!-- Card header -->
                        <div class="card-header">
                          <div class="row align-items-center">
                            <div class="col-8">
                              <!-- Title -->
                              <h5 class="h3 mb-0">${val.name}</h5>
                            </div>
                            <div class="col-4 text-right">
                  
                              <a href="#!" class="btn btn-sm btn-neutral">${val.topic}</a>
                            </div>
                          </div>
                        </div>
                        <!-- Card image -->
                        <!-- List group -->
                        <!-- Card body -->
                        <div class="card-body">
                          <span class="h3 mb-0">Rp.${val.price}</span>
                          <p class="card-text mb-4 text-justify">${val.description}</p>
              
                          <a href="#" onClick="detailBuyCourse('${val.courseId}')" class="btn btn-primary" data-toggle="modal" data-target="#modalsBuyCourse">Buy Course</a>
                        </div>
                      </div>`
                });
                $("#card2").html(text);
                text = '';
                $(".pagination li").addClass("page-item");
                $(".pagination li a").addClass("page-link");
                $(".pagination li").css("border", "0px");

                // template method of yourself
                console.log(data);
                //CardDiv.html(text);
            }
        })
    })

    //FILTER BUY PAGINATION WITH TOPIC
    $.ajax({
        url: "https://localhost:44306/API/Topic"
    }).done((res) => {

        let top = "";
        for (var i = 0; i < res.length; i++) {
            top += `<option value="${res[i].name}"  onclick="filterTopic('${res[i].name}')"  >${res[i].name}</option>`
        }

        let option = `<option value="Show All">Show All</option>` + top
        $("#inputState").html(option);
    })

})

function checkAlert(evt) {

    $.ajax({
        url: "https://localhost:44306/API/Topic",
    }).done((hasil) => {

        $.ajax({
            url: "https://localhost:44306/API/Course/GetCourse",
        }).done((hasil2) => {



            if (evt.target.value === "Show All") {

                let CardDiv = document.getElementById("#card2");
                let text = '';


                $('#pagination-container').pagination({
                    dataSource: hasil2,
                    pageSize: 5,
                    ulClassName: 'pagination',
                    callback: function (data, pagination) {

                        $.each(data, function (key, val) {
                            console.log(val.name);
                            text += `

                        <div class="card" id="card23">
                        <!-- Card header -->
                        <div class="card-header">
                          <div class="row align-items-center">
                            <div class="col-8">
                              <!-- Title -->
                              <h5 class="h3 mb-0">${val.name}</h5>
                            </div>
                            <div class="col-4 text-right">
                  
                              <a href="#!" class="btn btn-sm btn-neutral">${val.topic}</a>
                            </div>
                          </div>
                        </div>
                        <!-- Card image -->
                        <!-- List group -->
                        <!-- Card body -->
                        <div class="card-body">
                          <span class="h3 mb-0">Rp.${val.price}</span>
                          <p class="card-text mb-4 text-justify">${val.description}</p>
              
                          <a href="#" onClick="detailBuyCourse('${val.courseId}')" class="btn btn-primary" data-toggle="modal" data-target="#modalsBuyCourse">Buy Course</a>
                        </div>
                      </div>`
                        });
                        $("#card2").html(text);
                        text = '';
                        $(".pagination li").addClass("page-item");
                        $(".pagination li a").addClass("page-link");
                        $(".pagination li").css("border", "0px");

                        // template method of yourself
                        console.log(data);
                        //CardDiv.html(text);
                    }
                })

            } else if (evt.target.value === $("#inputState").val()) {

                itemGetCourse = hasil2.filter(g => g.topic == $("#inputState").val());


                let CardDiv = document.getElementById("#card2");
                let text = '';


                $('#pagination-container').pagination({
                    dataSource: itemGetCourse,
                    pageSize: 2,
                    ulClassName: 'pagination',
                    callback: function (data, pagination) {

                        $.each(data, function (key, val) {
                            console.log(val.name);
                            text += `

                        <div class="card" id="card23">
                        <!-- Card header -->
                        <div class="card-header">
                          <div class="row align-items-center">
                            <div class="col-8">
                              <!-- Title -->
                              <h5 class="h3 mb-0">${val.name}</h5>
                            </div>
                            <div class="col-4 text-right">
                  
                              <a href="#!" class="btn btn-sm btn-neutral">${val.topic}</a>
                            </div>
                          </div>
                        </div>
                        <!-- Card image -->
                        <!-- List group -->
                        <!-- Card body -->
                        <div class="card-body">
                          <span class="h3 mb-0">Rp.${val.price}</span>
                          <p class="card-text mb-4 text-justify">${val.description}</p>
              
                          <a href="#" onClick="detailBuyCourse('${val.courseId}')" class="btn btn-primary" data-toggle="modal" data-target="#modalsBuyCourse">Buy Course</a>
                        </div>
                      </div>`
                        });
                        $("#card2").html(text);
                        text = '';
                        $(".pagination li").addClass("page-item");
                        $(".pagination li a").addClass("page-link");
                        $(".pagination li").css("border", "0px");

                        // template method of yourself
                        console.log(data);
                        //CardDiv.html(text);
                    }
                })

            }


        })



    })


}




//$.ajax({
//    url: "https://localhost:44306/API/Course/GetCourse",
//}).done((result) => {
//    console.log(result);
//	let text = "";
//	//let list_items = val.name;
//    $.each(result, function (key, val) {
//		console.log(val.name);
//        text += `

//            <div class="card" id="card23">
//            <!-- Card header -->
//            <div class="card-header">
//              <div class="row align-items-center">
//                <div class="col-8">
//                  <!-- Title -->
//                  <h5 class="h3 mb-0">${val.name}</h5>
//                </div>
//                <div class="col-4 text-right">

//                  <a href="#!" class="btn btn-sm btn-neutral">${val.topic}</a>
//                </div>
//              </div>
//            </div>
//            <!-- Card image -->
//            <!-- List group -->
//            <!-- Card body -->
//            <div class="card-body">
//              <span class="h3 mb-0">Rp.${val.price}</span>
//              <p class="card-text mb-4 text-justify">${val.description}</p>

//              <a href="#" onClick="detailBuyCourse('${val.courseId}')" class="btn btn-primary" data-toggle="modal" data-target="#modalsBuyCourse">Buy Course</a>
//            </div>
//          </div>`
//    });
//    //console.log(text);
//    $("#card2").html(text);


//}).fail((error) => {
//    console.log(error);
//})







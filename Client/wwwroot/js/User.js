//const list_items = {};
function liveSearch() {
    // Locate the card elements
    let cards = document.querySelectorAll('#card27')
    // Locate the search input
    let search_query = document.getElementById("searchbox").value;
    // Loop through the cards
    for (var i = 0; i < cards.length; i++) {
        // If the text is within the card...
        if (cards[i].innerText.toLowerCase()
            // ...and the text matches the search query...
            .includes(search_query.toLowerCase())) {
            // ...remove the `.is-hidden` class.
            cards[i].classList.remove("is-hidden");
        } else {
            // Otherwise, add the class.
            cards[i].classList.add("is-hidden");
        }
    }
}








//Testimony
$.ajax({
    url: "https://localhost:44306/API/Testimony/GetTestimony"
}).done((item) => {
    console.log(item);
    let testitmp = " ";
    for (let i = item.length - 1; i > item.length - 3; i--) {
        testitmp += `    <div class="slide">
                            <div class="testi-content">
                                <p>`+ item[i].deskripsi + `</p>
                                <div class="testi-meta">
                                    `+ item[i].username + `
                                </div>
                            </div>
                         </div>`;
    }

    console.log(testitmp);
    $("#iniTestiloh").html(testitmp);
})

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



function detailBuyCourse(data) {
    $.ajax({
        url: "https://localhost:44306/API/Course/" + data
    }).done((item) => {
        /*let item = e.find(item => item.courseId === data)*/
        $("#UcourseId").attr("value", item.courseId);
        $("#UnameCourse").html(item.name);
        $("#UDescCourse").html(item.description);
        $("#CoursePrice").html("Rp."+item.price);
        $.ajax({
            url: "https://localhost:44306/API/Section",
        }).done((section) => {
            let tmp1 = "";

            itemSection = section.filter(g => g.courseId == item.courseId);
            console.log(itemSection)

          
            $.each(itemSection, function (key, val) {
                tmp1 += `<a class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">${val.name}</h5></div><p class="mb-1">${val.description}</p></a >`;
            })
            console.log(tmp1);
            $("#SectionGrup").html(tmp1);
            
        })






        $.ajax({
            url: "https://localhost:44306/API/Topic",
        }).done((result) => {

            let itemTopic = result.find(e => e.topicId === item.topicId);
            console.log(itemTopic);

            $(".topics").val(itemTopic.topicId);
        })







       /* $("#UnameCourse").attr("value", item.name);
        $("#Udescription").val(item.description);
        $("#Uprice").attr("value", item.price);
        console.log(item);
*/

     /*   
        $('#DataTable_SectionTransaction').DataTable({
            "bDestroy": true,
            language: {
                paginate: {
                    next: '<i class="fas fa-angle-right">',
                    previous: '<i class="fas fa-angle-left">'
                }
            },
            "ajax": {
                "url": "https://localhost:44306/API/Section",
                "dataType": "json",
                "dataSrc": function (json) {
                    return json.filter(function (section) {
                        return section.courseId == item.courseId;
                    });
                },
            },
            "columns": [
                {
                    "data": null, "sortable": false,
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {
                    "data": "name"
                },
            ]

        });*/



       
    })
}




function readURL(input) {
    var _validFilejpeg = [".jpeg", ".jpg", ".png"];


    if (input.type == "file") {
        var sFileName = input.value;
        if (sFileName.length > 0) {
            var blnValid = false;
            for (var j = 0; j < _validFilejpeg.length; j++) {
                var sCurExtension = _validFilejpeg[j];
                if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length)
                    .toLowerCase() == sCurExtension.toLowerCase()) {
                    blnValid = true;
                    break;
                }
            }

            if (!blnValid) {
                //alert("Sorry, this file is invalid, allowed extension is: " + _validFilejpeg.join(", "));
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Sorry, this file is invalid, allowed extension is: " + _validFilejpeg.join(", "),
                })
                input.value = "";
                return false;
            }
        }
    }

   


    if (fileSizeValidatejpeg(input, 10, 2048) == true ) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#falseinput').attr('src', e.target.result);
                $('#base').val(/base64,(.+)/.exec(e.target.result)[1]);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }



    
}

function fileSizeValidatejpeg(fdata, minSize, maxSizejpeg) {
    if (fdata.files && fdata.files[0]) {
        var fsize = fdata.files[0].size / 1024; //The files property of an input element returns a FileList. fdata is an input element,fdata.files[0] returns a File object at the index 0.
        //alert(fsize)
        if (fsize > maxSizejpeg || fsize < minSize) {
            //alert('This file size is: ' + fsize.toFixed(2) +
            //    "KB. Files should be in " + (minSize) + " to " + (maxSizejpeg) + " KB ");
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'This file size is: ' + fsize.toFixed(2) +
                    "KB. Files should be in " + (minSize) + " to " + (maxSizejpeg) + " KB ",
            })
            fdata.value = ""; //so that the file name is not displayed on the side of the choose file button
            return false;
        } else {
            return true;
            console.log("");
        }
    }
}



function AddTransaction() {
    var obj = new Object();
    obj.userId = parseInt($("#UuserId").val());
    obj.courseId = parseInt($("#UcourseId").val());
    obj.status = 2;
    var tgl = new Date().toLocaleString();
    obj.date = moment(tgl).format();
    obj.bukti_pembayaran = $("#base").val();
    console.log(obj);

    if (obj.bukti_pembayaran == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to make payment !',
        })
    } else {
        $.ajax({
            url: ("https://localhost:44306/API/Transaction"),
        }).done((result) => {
            let item = result.find(item => item.courseId === parseInt($("#UcourseId").val()) && item.userId === parseInt($("#UuserId").val()));

            let item2 = result.filter(item => item.courseId == parseInt($("#UcourseId").val()) && item.userId == parseInt($("#UuserId").val()));

            console.log(item2)
    

            var coba = item2.length

            let i  = coba - 1;

            //console.log(item)
            
            if (item == null) {


                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, Buy it!',
                    cancelButtonText: 'No, cancel!',
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            url: ("https://localhost:44306/API/Transaction"),
                            type: "POST",
                            contentType: "application/json",
                            data: JSON.stringify(obj)
                        }).done((result) => {
                           
                            $("#modalsBuyCourse").modal('hide');
                            Swal.fire({
                                icon: 'success',
                                title: 'Proof of payment has been uploaded successfully',
                            })
                            document.getElementById("base").attr("val", "");
                        }).fail((error) => {
                            console.log(error)
                        })
                    } else if (

                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        swalWithBootstrapButtons.fire(
                            'Cancelled',
                            'Your imaginary file is safe :)',
                            'error'
                        )
                    }
                })
            } else if (item2[i].status == 2) {

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Course already purchased, please wait for confirmation',
                })
                document.getElementById("form_AddTransaction").reset();
                $("#modalsBuyCourse").modal('hide');

            }
            else if (item2[i].status == 0) {

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Course already purchased',
                })
                document.getElementById("form_AddTransaction").reset();
                $("#modalsBuyCourse").modal('hide');

            }
            else {

               if (item.status == 1) {
                    $.ajax({
                        url: ("https://localhost:44306/API/Transaction"),
                        type: "POST",
                        contentType: "application/json",
                        data: JSON.stringify(obj)
                    }).done((result) => {

                        $("#modalsBuyCourse").modal('hide');
                        Swal.fire({
                            icon: 'success',
                            title: 'Proof of payment has been uploaded successfully',
                        })
                        document.getElementById("base").attr("val", "");
                    }).fail((error) => {
                        console.log(error)
                    })

                }
               
                else {

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Course already purchased',
                    })
                    document.getElementById("form_AddTransaction").reset();
                    $("#modalsBuyCourse").modal('hide');
                }

                
               
            }

        }).fail((error) => {
            console.log(error)
        })

    }


}


//Insert
/*$("#form_AddTransaction").submit(function (e) {
    e.preventDefault();
    var obj = new Object(); 
    obj.userId = parseInt($("#UuserId").val());
    obj.courseId = parseInt($("#UcourseId").val());
    obj.status = 2;
    var tgl = new Date().toLocaleString();
    obj.date = moment(tgl).format();


    obj.bukti_pembayaran = $("#base").val();
    console.log(obj);

    if (obj.bukti_pembayaran == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to make payment !',
        })
    } else {
        $.ajax({
            url: ("https://localhost:44306/API/Transaction"),
            //type: "POST",
            //contentType: "application/json",
            //data: JSON.stringify(obj) //jika terkena 415 unsupported media type (tambahkan headertype Json & JSON.Stringify(obj);)
        }).done((result) => {
            let item = result.find(item => item.courseId === parseInt($("#UcourseId").val()) && item.userId === parseInt($("#UuserId").val()));
            //console.log(item)

            if (item == null) {
                

                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'No, cancel!',
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            url: ("https://localhost:44306/API/Transaction"),
                            type: "POST",
                            contentType: "application/json",
                            data: JSON.stringify(obj) 
                        }).done((result) => {
                            document.getElementById("form_AddTransaction").reset();
                            $("#modalsBuyCourse").modal('hide');
                            Swal.fire({
                                icon: 'success',
                                title: 'Proof of payment has been uploaded successfully',
                            })
                            $("#form_addTransaction").attr("class", "needs-validation");
                        }).fail((error) => {
                            console.log(error)
                        })
                    } else if (
                    
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        swalWithBootstrapButtons.fire(
                            'Cancelled',
                            'Your imaginary file is safe :)',
                            'error'
                        )
                    }
                })
            } else {
                console.log(item)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Course already purchased',
                })
                document.getElementById("form_AddTransaction").reset();
                $("#modalsBuyCourse").modal('hide');
            }
            
        }).fail((error) => {
            console.log(error)
        })
      
    }
})
*/

/*FILTER DI LANDINGPAGE*/
$.ajax({
    url: "https://localhost:44306/API/Topic",
    context: document.body
}).done((result) => {
    console.log(result);
    let text = "";


    $.each(result, function (key, val) {
        var namatopic = val.name;
        var change = namatopic.replace(/\s/g, '');
        text += `<li><a href=" " data-filter=".${change}" id="${change}" >${val.name}</a></li>`;

    });
    console.log(text);
    var gabung = `<li class="activeFilter"><a href=" " data-filter="*">Show All</a></li>` + text
    $("#menuIndra").html(gabung);

}).fail((error) => {
    console.log(error);
});


$.ajax({
    url: "https://localhost:44306/API/Course/GetCourse",
    context: document.body
}).done((ress) => {

    let articleall = "";
    $.each(ress, function (key, val) {

        var namatopic2 = val.topic;
        var change2 = namatopic2.replace(/\s/g, '');

        console.log(change2)

        articleall += `<article class="portfolio-item pf-uielements ${change2}" >
                        <div class="portfolio-image">
                            <a href="portfolio-single.html">
                                <div backgroundColor="red"></div>
                            </a>
                        </div>
                        <div class="portfolio-desc">
                            <h3>${val.name}</h3>
                            <span>${val.topic}</span>
                        </div>
                    </article>`;
    })

    $("#portfolio").html(articleall);
});



/*Data Total Transaction*/
$.ajax({
    url: "https://localhost:44306/API/Transaction/GetTransaction"
}).done((item) => {
    $("#totalTransactions").attr("data-to", item.length);
    console.log(item.length);
})

/*Data Total Topics*/
$.ajax({
    url: "https://localhost:44306/API/Topic"
}).done((item) => {
    $("#totalTopics").attr("data-to", item.length);
    console.log(item.length);
})

/*Data Total Courses*/
$.ajax({
    url: "https://localhost:44306/API/Course"
}).done((item) => {
    $("#totalCourses").attr("data-to", item.length);
    console.log(item.length);
})

/*Data Total Users*/
$.ajax({
    url: "https://localhost:44306/API/User"
}).done((item) => {
    $("#totalUsers").attr("data-to", item.length);
    console.log(item.length);
})


//Profile
$(document).ready(function () {

    var data2 = document.getElementById("UserId").value;
    console.log(data2);


    //get data customer
    $.ajax({
        url: "https://localhost:44306/API/User/" + data2

    }).done((res) => {

        console.log(res);

        $("#myUserId").attr("value", res.userId);
        $("#myFirstName").attr("value", res.firstName);
        $("#myLastName").attr("value", res.lastName);
        //$("#BirthDate2").attr("value", res.birthdate);
        document.getElementById("myBirthDate").value = moment(res.birthdate).format("yyyy-MM-DD");
        if (res.gender === 0) {
            //$("#male").attr("selected", "selected");
            $("#myGender").val(0);
        }
        if (res.gender === 1) {
            //$("#female").attr("selected", "selected");
            $("#myGender").val(1);
        }
        $("#myPhone").attr("value", res.phone);
        $("#myEmail").attr("value", res.email);
    })

})

//change data customer
$('#formMyProfile').submit(function (e) {
    e.preventDefault();

    let obj = new Object(); //sesuaikan sendiri nama objectnya dan beserta isinya
    //ini ngambil value dari tiap inputan di form nya
    obj.UserId = parseInt($("#myUserId").val());
    obj.firstName = $("#myFirstName").val();
    obj.lastName = $("#myLastName").val();
    obj.Birthdate = $("#myBirthdate").val();
    obj.Gender = parseInt($("#myGender").val());
    obj.Phone = $("#myPhone").val();
    obj.Email = $("#myEmail").val();


    console.log(obj);
    $.ajax({
        url: "https://localhost:44306/API/User"
    }).done((res1) => {



        let item1 = res1.find(a => a.userId == obj.UserId)
        console.log(item1);
        if (item1.email === obj.Email && item1.phone === obj.Phone) {

            $.ajax({
                url: "https://localhost:44306/API/User",
                type: "PUT",
                contentType: 'application/json',
                data: JSON.stringify(obj), //jika terkena 415 unsupported media type (tambahkan headertype Json & JSON.Stringify();)
            }).done((result) => {
                //buat alert pemberitahuan jika success

                $('#updateData').modal('hide');
                console.log(result);
                $('#DataTable_User').DataTable().ajax.reload();
                Swal.fire({
                    icon: 'success',
                    title: 'Data has been updated',
                })

            }).fail((error) => {

                console.log(error)
            })
        } else {
            $.ajax({
                url: "https://localhost:44306/API/User"
            }).done((res2) => {

                let item2 = res2.filter(a => a.email == obj.Email)
                console.log(item2)
                let item3 = item2.filter(f => f.phone == obj.phone)
                console.log(item3)


                if (item3.length == 0 && item2.length == 0) {
                    $.ajax({
                        url: "https://localhost:44306/API/User",
                        type: "PUT",
                        contentType: 'application/json',
                        data: JSON.stringify(obj), //jika terkena 415 unsupported media type (tambahkan headertype Json & JSON.Stringify();)
                    }).done((result) => {
                        //buat alert pemberitahuan jika success

                        $('#updateData').modal('hide');
                        console.log(result);
                        $('#DataTable_User').DataTable().ajax.reload();
                        Swal.fire({
                            icon: 'success',
                            title: 'Data has been updated',
                        })

                    }).fail((error) => {

                        console.log(error)
                    })
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Email / Phone Sudah Terpakai',
                    })
                }
            })
        }
    })
    //isi dari object kalian buat sesuai dengan bentuk object yang akan di pos
})



// Table History
$(document).ready(function () {

    var data = parseInt(document.getElementById("UserId").value)

    $('#DataTable_History').DataTable({
        language: {
            paginate: {
                next: '<i class="fas fa-angle-right">',
                previous: '<i class="fas fa-angle-left">'
            }
        },
        dom: 'lBfrtip',
        buttons: [
            //'copy', 'csv', 'excel', 'pdf', 'print'
            {
                extend: 'pdf', title: 'Data History User',
                className: 'btn btn-sm btn-danger glyphicon glyphicon-file',
                text: '<i class="far fa-file-pdf"></i>',
                titleAttr: 'PDF',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4]
                }
            },
            {
                extend: 'excel', title: 'Data History User',
                className: 'btn btn-sm btn-success  glyphicon glyphicon-list-alt',
                text: '<i class="fas fa-file-excel"></i>',
                titleAttr: 'Excel',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4]
                }
            },
            {
                extend: 'csv', title: 'Data History User',
                className: 'btn btn-sm btn-success  glyphicon glyphicon-save-file',
                text: '<i class="fas fa-file-csv"></i>',
                titleAttr: 'CSV',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4]
                }
            },
            {
                extend: 'copy', title: 'Data History User',
                className: 'btn btn-sm btn-warning  glyphicon glyphicon-duplicate',
                text: '<i class="far fa-copy"></i>',
                titleAttr: 'COPY',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4]
                }
            },
            {
                extend: 'print', title: 'Data History User',
                className: 'btn btn-sm btn-dark  glyphicon glyphicon-print',
                text: '<i class="fas fa-print"></i>',
                titleAttr: 'PRINT',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4]
                }
            }
        ],
        initComplete: function () {
            var btns = $('.dt-button');
            //btns.addClass('btn btn-primary btn-sm');
            btns.removeClass('dt-button');
        },
        "ajax": {
            "url": "https://localhost:44306/API/Transaction/GetTransaction",
            "dataType": "json",
            "dataSrc": function (json) {
                return json.filter(function (item) {
                    return item.userId == data;
                });
            },
        },
        "columns": [
            {
                "data": null, "sortable": false,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {
                "data": "course"
            },
            {
                "data": "price",
                render: function (data) {
                    var result = data;
                    return `<span>Rp.${result}</span>`
                }
            },
            {
                "data": "status",
                "render": function (data) {

                    if (data == "Waiting") {
                        return `<span class="badge badge-pill badge-info badge-lg">${data}</span>`
                    } else if (data == "Decline") {
                        return `<span class="badge badge-pill badge-warning badge-lg">${data}</span>`
                    } else if (data == "Accept") {
                        return `<span class="badge badge-pill badge-success badge-lg">${data}</span>`
                    }
                }
            },
            {
                "data": "date",
                "render": function (data) {
                    var date = new Date(data);
                    var month = date.getMonth() + 1;
                    return date.getDate() + "/" + (month.length > 1 ? month : "0" + month) + "/" + date.getFullYear();
                    //    //return date;
                }
            }
        ]

    });

})

//MY COURSE
let UserrId = document.getElementById("UserIdNihh").value;
console.log(UserrId)

$.ajax({
    url: "https://localhost:44306/API/Transaction/GetTransaction",
}).done((result) => {
    console.log(result);
    let itemUser = result.filter(e => e.userId === parseInt(UserrId) && e.status == "Accept");
    console.log(itemUser.length);

    if (itemUser < 1) {
        //swal.fire({
        //    icon: 'error',
        //    title: "you haven't bought the course",
        //});
        //window.location.href = "/Customer";    
        let timerInterval
        Swal.fire({
            title: "you haven't bought the course!",
            html: 'I will close in <b></b> milliseconds.',
            timer: 3000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
                window.location.href = "/Customer";   
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        })
        
          
        
    } else {
        let text = "";
        //let list_items = val.name;
        $.each(itemUser, function (key, val) {
            //console.log(val.name);
            text +=

                `<div class="card" id="card27">
                <!-- Card header -->
                <div class="card-header">
                    <div class="row align-items-center">
                        <div class="col-8">
                            <!-- Title -->
                            <h5 class="h3 mb-0">${val.course}</h5>
                        </div>
                    </div>
                </div>
                <!-- Card image -->
                <!-- List group -->
                <!-- Card body -->
                <div class="card-body">
                    <p class="card-text mb-4 text-justify">${val.description}</p>

                    <a href="#" onClick="LearnCourse('${val.courseId}')" class="btn btn-primary">Learn</a>
                </div>
            </div>`
        });
        //console.log(text);
        $("#card3").html(text);
    }

}).fail((error) => {
    console.log(error);
})

//SECTION
function LearnCourse(data) {

    window.location.replace("/Customer/Section")
    localStorage.setItem("course", data)

}

$.ajax({
    url: "https://localhost:44306/API/Section",
}).done((result) => {


    var courseIDs = localStorage.getItem("course")


    GrupSections = result.filter(g => g.courseId == courseIDs);

    console.log(GrupSections);

    let text = "";
    //let list_items = val.name;
    $.each(GrupSections, function (key, val) {
        //console.log(val.name);
        text +=

            `<div class="card card-pricing bg-gradient-secondary border-0 mb-4">
                <div class="card-header bg-transparent" id="headingOne">
                   <div class="row">
                        <div class="col-11">
                          <h5 class="mb-0">
                            <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne${key + 1}" aria-expanded="true" aria-controls="collapseOne">
                              ${val.name}
                            </button>
                          </h5>
                        </div>
                        <div class="col-1">
                        <h5><b>#${key + 1}</b></h5>
                        </div>
                    </div>
                  
                </div>

                <div id="collapseOne${key + 1}" class="collapse " aria-labelledby="headingOne" data-parent="#accordion">
                   
                   <div class="card-body">
                        <div class="embed-responsive embed-responsive-21by9">
                       <iframe class="embed-responsive-item" width="500" height="500" style="border-radius: 8px;" src="${val.link}" allowfullscreen></iframe>
                   </div>
                    <br><br>
                        <h4 class="card-text mb-4 text-justify">${val.description}</h4>
                   </div>
                </div>
             </div>`
    });
    //console.log(text);
    $("#accordion").html(text);
})








//TESTIMONY
function AddTesti() {



    var courseIDs = localStorage.getItem("course")

    let obj = {
        userId: parseInt($("#UserIdNihh").val()),
        courseId: parseInt(courseIDs),
        deskripsi: $("#testi").val()
    }


    console.log(obj)
    $.ajax({
        url: "https://localhost:44306/API/Testimony",
    }).done((ressT) => {
        let item = ressT.filter(item => item.courseId === obj.courseId && item.userId === obj.userId)

        /* JSON.stringify(obj)*/
        console.log(item);

        if (item.length == 0) {

            $.ajax({
                url: "https://localhost:44306/API/Testimony",
                type: "POST",
                contentType: 'application/json',
                data: JSON.stringify(obj),
            }).done((resultt) => {


                $('#TestimonyModal').modal('hide');
                document.getElementById("formTesti").reset();

                Swal.fire({
                    icon: 'success',
                    title: 'Your testimony has been uploaded successfully',
                })


            }).fail((error) => {
                console.log(error);
            })
        } else {


            Swal.fire({
                icon: 'error',
                title: 'You Allready Put Your Testimony',
            })

        }




    })

}








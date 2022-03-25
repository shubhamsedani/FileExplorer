$(document).ready(function() { 
  fetch_data();

  function fetch_data(){
    var action = "fetch";
    $.ajax({
      url: 'php/main.php',
      method: "POST",
      data: {action:action},
      dataType: "json",
      success: function(response)
      {
        if (response.status == "true") {
          $(".sub-panel").empty();
          $(".rigthContent").empty();
          for($i=0; $i< ((response.data.files).length); $i++){
              $(".sub-panel").append('<div class="parent"><button class="children" data-path= "'+response.rootpath +'"><img src="./assets/images/'+response.data.files[$i].type +'.png" alt="">' +response.data.files[$i].name+ '</button><div class="sub-panel-2"></div></div>');
              $(".rigthContent").append('<div class="parent"><button class="children1" data-path= "'+response.rootpath +'" data-text='+  response.data.files[$i].name +'><img src="./assets/images/'+response.data.files[$i].type +'.png" alt="">' +response.data.files[$i].name+ '</button><div class="sub-panel-2"></div></div>');
            }
            for($i=0; $i< ((response.data.folders).length); $i++){
              $(".sub-panel").append('<div class="parent"><button class="children" data-path= "'+response.rootpath +'"><img src="./assets/images/'+response.data.folders[$i].type +'.png" alt="">' +response.data.folders[$i].name+ '</button><div class="sub-panel-2"></div></div>');
              $(".rigthContent").append('<div class="parent"><button class="children1" data-path= "'+response.rootpath +'" data-text='+  response.data.folders[$i].name +'><img src="./assets/images/'+response.data.folders[$i].type +'.png" alt="">' +response.data.folders[$i].name+ '</button><div class="sub-panel-2"></div></div>');
            }
        } else {
          bootbox.alert("Something went wrong!");
        }
      }
    });
  }

  $(".operations.create").click(function(){
      bootbox.prompt({
        title: "Enter a name to create a folder", 
        centerVertical: true,
        callback: function(result){ 
          if(result == ""){
            // bootbox.alert(result);
            bootbox.alert("The field was empty, try again!");
          }else{
            var action = "create";
            var DirectoryPath = $(".rigthContent").attr('data-path');
            $.ajax({
              url: 'php/folder_create.php',
              method: "POST",
              data: {action:action, FolderName:result, DirectoryPath:DirectoryPath},
              dataType: "json",
              success: function(response)
              {
                if (response.status == "true") {
                  fetch_data();
                } else {
                  bootbox.alert("Something went wrong!");
                }
              }
            });
          } 
        }
    });
  });


});



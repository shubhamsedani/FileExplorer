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
            $(".sub-panel").append('<div class="parent"><button class="children folder" data-path= "'+response.rootpath +'"><img src="./assets/images/'+response.data.folders[$i].type +'.png" alt="">' +response.data.folders[$i].name+ '</button><div class="sub-panel-2"></div></div>');
            $(".rigthContent").append('<div class="parent"><button class="children1 folder" data-path= "'+response.rootpath +'" data-text='+  response.data.folders[$i].name +'><img src="./assets/images/'+response.data.folders[$i].type +'.png" alt="">' +response.data.folders[$i].name+ '</button><div class="sub-panel-2"></div></div>');
          }
        } else {
          bootbox.alert("Something went wrong!");
        }
      }
    });
  }

  $(document).on('click', '.operations.create', function () {
      bootbox.prompt({
        title: "Enter a name to create a folder", 
        centerVertical: true,
        callback: function(result){ 
          var newName = new RegExp("^[a-zA-Z0-9]*$").test(result);
          if(!newName){
            bootbox.alert("The input is not allowed. Please try with proper name!");
          }else if( result == ""){
            bootbox.alert("The field is empty, please try again");
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
                  $(".sub-panel").empty();
                  $(".rigthContent").empty();
                  for($i=0; $i< ((response.data.files).length); $i++){
                      $(".sub-panel").append('<div class="parent"><button class="children" data-path= "'+response.rootpath +'"><img src="./assets/images/'+response.data.files[$i].type +'.png" alt="">' +response.data.files[$i].name+ '</button><div class="sub-panel-2"></div></div>');
                      $(".rigthContent").append('<div class="parent"><button class="children1" data-path= "'+response.rootpath +'" data-text='+  response.data.files[$i].name +'><img src="./assets/images/'+response.data.files[$i].type +'.png" alt="">' +response.data.files[$i].name+ '</button><div class="sub-panel-2"></div></div>');
                    }
                    for($i=0; $i< ((response.data.folders).length); $i++){
                      $(".sub-panel").append('<div class="parent"><button class="children folder" data-path= "'+response.rootpath +'"><img src="./assets/images/'+response.data.folders[$i].type +'.png" alt="">' +response.data.folders[$i].name+ '</button><div class="sub-panel-2"></div></div>');
                      $(".rigthContent").append('<div class="parent"><button class="children1 folder" data-path= "'+response.rootpath +'" data-text='+  response.data.folders[$i].name +'><img src="./assets/images/'+response.data.folders[$i].type +'.png" alt="">' +response.data.folders[$i].name+ '</button><div class="sub-panel-2"></div></div>');
                    }
                } else {
                  bootbox.alert(response.message);
                }
              }
            });
          }
        }
    });
  });

  $(document).on('dblclick', '.folder', function () {
    var FolderPath = $(this).attr("data-path");
    var FolderName = $(this).attr("data-text");
    // bootbox.alert(FolderPath +"/"+ FolderName);
    $(".rigthContent").attr("data-path", FolderPath +"/"+ FolderName);

    var action = "EnterFolder";
    $.ajax({
      url: 'php/main.php',
      method: "POST",
      data: {action:action, FolderPath:FolderPath, FolderName:FolderName},
      dataType: "json",
      success: function(response)
      {
        if (response.status == "true") {
          $(".sub-panel").empty();
          $(".rigthContent").empty();
          if((response.data.folders).length < 1 && (response.data.files).length < 1 ){
            $(".rigthContent").append('<div class="EmptyFolder">The folder is empty</div>');
          }
          for($i=0; $i< ((response.data.files).length); $i++){
              $(".sub-panel").append('<div class="parent"><button class="children" data-path= "'+response.rootpath +'"><img src="./assets/images/'+response.data.files[$i].type +'.png" alt="">' +response.data.files[$i].name+ '</button><div class="sub-panel-2"></div></div>');
              $(".rigthContent").append('<div class="parent"><button class="children1" data-path= "'+response.rootpath +'" data-text='+  response.data.files[$i].name +'><img src="./assets/images/'+response.data.files[$i].type +'.png" alt="">' +response.data.files[$i].name+ '</button><div class="sub-panel-2"></div></div>');
            }
            for($i=0; $i< ((response.data.folders).length); $i++){
              $(".sub-panel").append('<div class="parent"><button class="children folder" data-path= "'+response.rootpath +'"><img src="./assets/images/'+response.data.folders[$i].type +'.png" alt="">' +response.data.folders[$i].name+ '</button><div class="sub-panel-2"></div></div>');
              $(".rigthContent").append('<div class="parent"><button class="children1 folder" data-path= "'+response.rootpath +'" data-text='+  response.data.folders[$i].name +'><img src="./assets/images/'+response.data.folders[$i].type +'.png" alt="">' +response.data.folders[$i].name+ '</button><div class="sub-panel-2"></div></div>');
            }
        } else {
          bootbox.alert("Something went wrong!");
        }
      }
    }); 
  });

  $(document).on('click', '.back', function () {
    var CurrentPath = $(".rigthContent").attr('data-path');
    var NewPath = CurrentPath.substring(0, CurrentPath.lastIndexOf('/'));

    if(CurrentPath == "../root"){
      bootbox.alert("There is no going back!");
    }else{
      var action = "back";
      $.ajax({
        url: 'php/main.php',
        method: "POST",
        data: {action:action, CurrentPath:NewPath},
        dataType: "json",
        success: function(response)
        {
          if (response.status == "true") {
            $(".sub-panel").empty();
            $(".rigthContent").empty();
            $(".rigthContent").attr('data-path', NewPath); // update the main path 
            for($i=0; $i< ((response.data.files).length); $i++){
                $(".sub-panel").append('<div class="parent"><button class="children" data-path= "'+response.rootpath +'"><img src="./assets/images/'+response.data.files[$i].type +'.png" alt="">' +response.data.files[$i].name+ '</button><div class="sub-panel-2"></div></div>');
                $(".rigthContent").append('<div class="parent"><button class="children1" data-path= "'+response.rootpath +'" data-text='+  response.data.files[$i].name +'><img src="./assets/images/'+response.data.files[$i].type +'.png" alt="">' +response.data.files[$i].name+ '</button><div class="sub-panel-2"></div></div>');
              }
              for($i=0; $i< ((response.data.folders).length); $i++){
                $(".sub-panel").append('<div class="parent"><button class="children folder" data-path= "'+response.rootpath +'"><img src="./assets/images/'+response.data.folders[$i].type +'.png" alt="">' +response.data.folders[$i].name+ '</button><div class="sub-panel-2"></div></div>');
                $(".rigthContent").append('<div class="parent"><button class="children1 folder" data-path= "'+response.rootpath +'" data-text='+  response.data.folders[$i].name +'><img src="./assets/images/'+response.data.folders[$i].type +'.png" alt="">' +response.data.folders[$i].name+ '</button><div class="sub-panel-2"></div></div>');
              }
          } else {
            bootbox.alert(response.message);
          }
        }
      });
    }
  });
});



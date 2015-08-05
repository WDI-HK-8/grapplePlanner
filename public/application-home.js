$(document).ready(function(){

  //sign user out
  $('#sign-out-btn').click(function(){
    $.ajax({
      method:   'DELETE',
      url:      '/sessions',
      success:  function(response){
        console.log("delete session / logged out", response);
          window.location.replace('./');
      }
    });
  });

  //add new submission
   $('#new-sub-btn').click(function(){
    var newSub = $('#new-sub').val();
    var html = '';
    html+=    '<div class="list-group">';
    html+=      '<a href="#" class="list-group-item">';
    html+=        '<i class="fa fa-fw"></i>';
    html+=     newSub;
    html+=      '</a>';
    html+=    '</div>';
    $('#sub-list').append(html);
  });

  //add new sweep
   $('#new-sweep-btn').click(function(){
    var newSweep = $('#new-sweep').val();
    var html = '';
    html+=    '<div class="list-group">';
    html+=      '<a href="#" class="list-group-item">';
    html+=        '<i class="fa fa-fw"></i>';
    html+=     newSweep;
    html+=      '</a>';
    html+=    '</div>';
    $('#sweep-list').append(html);
  });   

  //add new passes
   $('#new-passes-btn').click(function(){
    var newPasses = $('#new-passes').val();
    var html = '';
    html+=    '<div class="list-group">';
    html+=      '<a href="#" class="list-group-item">';
    html+=        '<i class="fa fa-fw"></i>';
    html+=     newPasses;
    html+=      '</a>';
    html+=    '</div>';
    $('#passes-list').append(html);
  });   

  //add new escapes
   $('#new-escapes-btn').click(function(){
    var newEscapes = $('#new-escapes').val();
    var html = '';
    html+=    '<div class="list-group">';
    html+=      '<a href="#" class="list-group-item">';
    html+=        '<i class="fa fa-fw"></i>';
    html+=     newEscapes;
    html+=      '</a>';
    html+=    '</div>';
    $('#escapes-list').append(html);

    $('#new-escapes').val() == "";

  });   

   //video
  $('#tech-vid .btn').click(function(){
    $('#previousVideo').remove();
    vidURL = $('#tech-vid input').val();

    var split = vidURL.split('=');

    console.log(split[1])

    html = '<iframe width="420" height="345" id="previousVideo" src="http://www.youtube.com/embed/'+ split[1] +'" frameborder="0" allowfullscreen></iframe>'
    $('#video').append(html);
  })

});

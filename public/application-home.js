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
});


  // var Signout = function() {
  // };



  // Signout.prototype.signoutDelete = function() {
  //   var successCallBack = function(reply) {
  //     console.log("create session / logged out", response)
  //     window.location.replace('./');
  //   };
  //   $.ajax({
  //     method:   'DELETE',
  //     url:      '/sessions',
  //     success:  successCallBack
  //   });
  // };

  // $('#sign-out-btn').click(function(e){
  //   e.preventDefault();
  //   var signout = new Signout();
  //   signout.signoutDelete();
  // });

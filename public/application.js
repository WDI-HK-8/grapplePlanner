$(document).ready(function(){
  
  //sign up
  $('#submit-signup').click(function(){

    var name = $('#sign-up-name');
    var email = $('#sign-up-email');
    var password = $('#sign-up-password');

    event.preventDefault();

    //Sign up
    $.ajax({
      type: 'POST',
      url: '/users',
      data: {
        user: {
          username: name.val(),
          email: email.val(),
          password: password.val(),
        }
      },
      dataType: 'JSON',
      success: function(response){
        console.log(response);
       },
      error: function(xhr, status, error){
        $('#signup-form-message').text(xhr.responseText);
      }
    });
  });


  //sign in
  $('#submit-signin').click(function(){
      event.preventDefault();

    console.log("working")

    var si_password = $('#signin-password');
    var si_username = $('#signin-username');
    
    $.ajax({
      type: 'POST',
      url: '/sessions',
      data: {
        user: {
          username: si_username.val(),
          password: si_password.val()
        }
      },
      dataType: 'JSON',
      xhrFields: {
        withCredentials: true
      },
      success: function(response){
        console.log("create session / logged in", response);
        if(response.authorized === true){
          console.log('working')
          window.location.replace('./home');
        }
      }
    });
  });
});

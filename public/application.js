$(document).ready(function(){
  $('#signup-btn').click(function(){
    //declare input variables
    var name = $('#sign-up-name');
    var email = $('#sign-up-email');
    var password = $('#sign-up-password');

    //prevent form from redirecting
    event.preventDefault();

    //Sign up
    $.ajax({
      type: 'POST',
      url: '/users',
      data: {
        user: {
          name: name.val(),
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
});

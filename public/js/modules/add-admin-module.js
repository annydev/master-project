var AddUsersModule = (function () {
  // Preperties

  var self = this;

  

  // Public functions

  self.Init = function () {
    $("#submit").click((e) => {
      var password = $("#exampleInputPassword").val();
      var confirmPassword = $("#exampleRepeatPassword").val();

      if (password != confirmPassword) {
        toastr.error("Passwords Don't Match");

        e.stopPropagation();
      } else {
        $("#addUser").submit();
      }
    });

    $(document).ready(function () {
      jQuery.validator.addMethod('username_rule', function (value, element) {
        if (/^[a-zA-Z0-9_-]+$/.test(value)) {
          return true;
        } else {
          return false;
        };
      });
      jQuery.validator.addMethod('email_rule', function (value, element) {
        if (/^([a-zA-Z0-9_\-\.]+)\+?([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(value)) {
          return true;
        } else {
          return false;
        };
      });
      $('#addUser').validate({
        rules: {
          'username': {
            required: true,
            email_rule: true
          },
          'password': {
            required: true,
          },
          'confirmPassword': {
            required: true
          }
        },
        messages: {
          'username': "Va rugam sa introduceti corect adresa electronica",
          'password': "Va rugam sa introduceti parola",
          'confirmPassword': "Acest camp este obligatoriu"
        }
      });
    });
  };

  return self;
})();

$(document).ready(function () {
  AddUsersModule.Init();
});

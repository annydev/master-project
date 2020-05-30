var AddUsersModule = (function () {
  // Preperties

  var self = {};

  // Public functions

  function addAdmin() {

    var data = {
      username: $("#username").val(),
      password:  $("#exampleInputPassword").val()
    };

    if (!data.username) {
      toastr.error("Please fill username field!");
      $("#username").addClass("input-error-border");
      return;
    } else if(!data.password) {
      toastr.error("Please fill password field!");
    }

    $.post("add", data, function (json) {
      console.log(json);
      window.location.href = "/admin/users";
    });
  }

  // Public functions

  self.Init = function () {
    $("#submit").click((e) => {
      var password = $("#exampleInputPassword").val();
      var confirmPassword = $("#exampleRepeatPassword").val();

      if (password != confirmPassword) {
        toastr.error("Passwords Don't Match");

        e.stopPropagation();
      } else {
        addAdmin();
      }
      
    });
  };

  return self;
})();

$(document).ready(function () {
  AddUsersModule.Init();
});

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
  };

  return self;
})();

$(document).ready(function () {
  AddUsersModule.Init();
});

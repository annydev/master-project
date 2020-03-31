var AddUsersModule = (function () {
    // Preperties

    var self = this;

    // Private functions

    function addAdmin() {
        var password = $("#exampleInputPassword").val();
        var confirmPassword = $("#exampleRepeatPassword").val();

        if (password != confirmPassword) {
            alert("Passwords Don't Match");
            return false;
        }
        return true;
    }

    // Public functions

    self.Init = function () {
        $("#submit").click(() => {

            addAdmin()
        });
    };

    return self;
})();

$(document).ready(function () {
    AddUsersModule.Init()
});

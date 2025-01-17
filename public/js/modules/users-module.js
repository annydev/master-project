var UsersModule = (function() {
    // Preperties

    var self = {};

    // Private functions
  
    function deleteAdmin(id) {
        var data = {
            id: id
        };
    
        $.post("/admin/users/delete", data, function (result) {
            location.reload();
        });
    }

    // Public functions
  
    self.Init = function() {
        $("button.delete-admin").click((e) => { 
            let id = $(e.currentTarget).data("id");

            deleteAdmin(id) 
        });
    };

    return self;
})();

$(document).ready(function() {
    UsersModule.Init()
});

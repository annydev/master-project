var ShopsModule = (function() {
    // Preperties

    var self = this;

    // Private functions
  
    function deleteShops(id) {
        var data = {
            id: id
        };
    
        $.post("/admin/shops/delete", data, function (result) {
            location.reload();
        });
    }

    // Public functions
  
    self.Init = function() {
        $("button.del").click((e) => { 
            let id = $(e.currentTarget).data("id");

            deleteShops(id) 
        });
    };

    return self;
})();

$(document).ready(function() {
    ShopsModule.Init()
});

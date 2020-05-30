var EditShopsModule = (function () {
    // Properties

    var self = { 
    };

    // Private functions

    function updateShop() {
  
        var data = {
          id: $("#shop-id").val(),
          title: $("#shop-title").val()
        };
    
        if (!data.title) {
          toastr.error("Please fill title of the shop!");
          $("#shop-title").addClass("input-error-border");
          return;
        } 
    
        $.post("/admin/shops/edit", data, function (json) {
          console.log(json);
          window.location.href = "/admin/shops";
        });
      }

    // Public functions

    self.Init = function () {

        $("button.updated-shop-save").click(() => {
            updateShop();
          });
    };

    return self;
})();

$(document).ready(function () {
    EditShopsModule.Init()
});

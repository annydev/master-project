var ProductsModule = (function() {
    // Preperties

    var self = {};

    // Private functions
  
    function deleteProduct(id) {
        var data = {
            id: id
        };
    
        $.post("/admin/products/delete", data, function () { //result came from server
            location.reload();
        });
    }

    function updateProductStatus(id) {
        var data = {
            id: id
        };

        $.post("/admin/products/statusUpdate", data, function () {
            location.reload();
        });
    }

    // Public functions
  
    self.Init = function() {
        $("button.delete-product").click((e) => { 
            let id = $(e.currentTarget).data("id");

            deleteProduct(id) 
        });

        $("button.update-product-status").click((e) => { 
            let id = $(e.currentTarget).data("id");

            updateProductStatus(id) 
        });  
    };

    return self;
})();

$(document).ready(function() {
    ProductsModule.Init()
});

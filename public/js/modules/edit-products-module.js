var EditProductsModule = (function () {
    // Preperties

    var self = this;

    // Private functions
    function currentDate() {
        var date = new Date();
        return date;
    }

    function addProductPrice() {

        var data = {
            price: $("#price").val(),
            productId: $("#product-id").val(),
            shopId: $("#shop-id").val(),
            date: currentDate("ru")
        }

        $.post("/admin/prices/add", data, function (json) {
            console.log(json)
            location.reload();
        });
    }

    function deletePrice(id) {
        var data = {
            id: id
        };

        $.post("/admin/prices/delete", data, function () { //result came from server
            location.reload();
        });
    }

    // Public functions

    self.Init = function () {
        $(".add-price").click(() => {

            addProductPrice()
        });

        $("button.delete-price").click((e) => { 
            let id = $(e.target).data("id");

            deletePrice(id) 
        });
    };

    return self;
})();

$(document).ready(function () {
    EditProductsModule.Init()
});

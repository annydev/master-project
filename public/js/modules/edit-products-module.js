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

        if(!data.price) {
            toastr.error("Please add product price!");
            return;
        } else if (!data.shopId) {
            toastr.error("Please choose the shop!");
            return;
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

    function updateStatusPrice(id) {
        var data = {
            id: id
        };

        $.post("/admin/prices/statusUpdate", data, function () { //result came from server
            location.reload();
        });
    }

    

    // Public functions

    self.Init = function () {
        $(".add-price").click(() => {

            addProductPrice()
        });

        $("button.delete-price").click((e) => { 
            let id = $(e.currentTarget).data("id");

            deletePrice(id) 
        });

        $("button.update-price-status").click((e) => { 
            let id = $(e.currentTarget).data("id");

            updateStatusPrice(id) 
        });   
        
        $("button.view-image").click(function(e) {
            let src = $(e.currentTarget).data("src");
            
            $("#price-image").attr("src", src);

            $("#price-image-modal").modal("show");
        })
    };
    

    return self;
})();

$(document).ready(function () {
    EditProductsModule.Init();
});

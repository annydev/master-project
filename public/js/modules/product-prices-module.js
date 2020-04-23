var AddNewProductsPriceModule = (function () {
    // Preperties

    var self = this;

    // Private functions
    function currentDate() {
        var date = new Date();
        return date;
    }

    function suggestedPrice() {

        var data = {
            price: $("#price").val(),
            productId: $("#product-id").val(),
            shopId: $("#shop-id").val(),
            date: currentDate(),
            image: $("#image").val(),
            expirationDate: $("#expiration-date").val(),
            isApproved: false
        }

        $.post("/prices/suggestPrice", data, function (json) {
            console.log(json);         
            location.reload();
        });
    }

    // Public functions

    self.Init = function () {
        $(".suggest-price").click((e) => {
            let productId = $(".product").val();
            let shopId = $(e.currentTarget).closest("li").data("id");

            $("#product-id").val(productId);
            $("#shop-id").val(shopId);
        });

        $(".save-modal-content").click(() => {
            suggestedPrice()
        });
    };

    return self;
})();

$(document).ready(function () {
    AddNewProductsPriceModule.Init()
});
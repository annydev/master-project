var AddProductsModule = (function () {
    // Preperties

    var self = this;

    // Private functions

    function addProduct() {
        let resultCategoryId;
        let categoryId = $("#categoryTitle").val();
        let subcategoryId = $("#subcategoryTitle").val();

        if (subcategoryId === null) {
            resultCategoryId = categoryId
        } else {
            resultCategoryId = subcategoryId
        }

        var data = {
            titleProduct: $("#product").val(),
            productCategory: resultCategoryId,
            productImage: $("#imageURLProduct").val()
        }
        $.post("/addProduct", data, function (json) {
            console.log(json);
            window.location.href = "/admin/products";
        });

    }

    // Public functions

    self.Init = function () {
        $("button.product-save").click(() => {

            addProduct()
        });
    };

    return self;
})();

$(document).ready(function () {
    AddProductsModule.Init()
});

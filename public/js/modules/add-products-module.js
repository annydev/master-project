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

    function createOptionSelectForSubcategories() {
        let data = {
            categoryId: $("#categoryTitle").val()
        }
    
        $.post("/admin/getSubcategories", data, function (json) {
            $('#subcategoryTitle').html("");
    
            if (json.subcategories.length > 0) {
                $('#subcategoryTitle').removeClass("d-none");
                $('#subcategoryTitle').append("<option selected disabled>Choose subcategory</option>")
    
                json.subcategories.forEach(function (subcategory) {
                    $('#subcategoryTitle').append($(`<option value="${subcategory._id}">${subcategory.title}</option>`));
                });
            } else {
                $('#subcategoryTitle').addClass("d-none");
            }
        });
    }

    // Public functions

    self.Init = function () {
        $("button.product-save").click(() => {

            addProduct()
        });

        $("#categoryTitle").on("change", () => {
            createOptionSelectForSubcategories();
        });
    };

    return self;
})();

$(document).ready(function () {
    AddProductsModule.Init()
});

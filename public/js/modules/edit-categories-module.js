var EditCategoriesModule = (function () {
    // Properties

    var self = this;

    // Private functions

    function addSubcategory() {
        let data = {
            subId: $("#subId").val(),
            titleSubcategory: $("#titleSubcategory").val()
        }

        $.post("/admin/categories/addSubcategory", data, function (json) {
            location.reload();
        });
    }

    function deleteSubcategory() {
        var data = {
            subId: $("#subId").val()
        }
        $.post("/admin/categories/deleteSubcategory", data, function (json) {
            location.reload();
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

    self.Init = function (lang) {
        
        $("button.add-subcategory").click(() => {
            addSubcategory();
        });

        $("button.delete-subcategory").click(() => {
            deleteSubcategory();
        });

        $("#categoryTitle").on("change", () => {
            createOptionSelectForSubcategories();
        });
    };

    return self;
})();

$(document).ready(function () {
    EditCategoriesModule.Init()
});
var EditCategoriesModule = (function () {
    // Properties

    var self = {};

    // Private functions

    function addSubcategory() {
        let data = {
            categoryId: $("#categoryId").val(),
            titleSubcategory: $("#titleSubcategory").val()
        }

        if(!data.titleSubcategory) {
            return toastr.error("Please fill title of the subcategory!");
        }

        $.post("/admin/categories/addSubcategory", data, function (json) {
            location.reload();
        });
    }

    function deleteSubcategory(id) {
        var data = {
            subId: id
        }
        
        $.post("/admin/categories/deleteSubcategory", data, function (json) {
            location.reload();
        });
    }

    // Public functions

    self.Init = function () {
        
        $("button.add-subcategory").click(() => {
            
            addSubcategory();
        });

        $("button.delete-subcategory").click((e) => {
            let subcategoryId = $(e.currentTarget).data("id");

            deleteSubcategory(subcategoryId);
        });

    };

    return self;
})();

$(document).ready(function () {
    EditCategoriesModule.Init()
});

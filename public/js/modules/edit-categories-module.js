var EditCategoriesModule = (function () {
    // Properties

    var self = this;

    // Private functions

    function addSubcategory() {
        let data = {
            categoryId: $("#categoryId").val(),
            titleSubcategory: $("#titleSubcategory").val()
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

    self.Init = function (lang) {
        
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

var CategoriesModule = (function () {
    // Properties

    var self = this;

    // Private functions

    function deleteCategory(id) {
        var data = {
            id: id
        };

        $.post("/admin/categories/delete", data, function (result) { //result came from server
            location.reload();
        });
    }

    // Public functions

    self.Init = function (lang) {
        $("button.delete").on("click", (e) => {
            let id = $(e.target).data("id");

            deleteCategory(id);
        });
    };
    return self;
})();

$(document).ready(function () {
    CategoriesModule.Init()
});
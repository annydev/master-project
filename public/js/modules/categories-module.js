var CategoriesModule = (function () {
    // Properties

    var self = this;

    // Private functions

    function deleteCategory(id) {
        var data = {
            id: id
        };

        $.post("/admin/categories/delete", data, function () {
            location.reload();
        });
    }

    // Public functions

    self.Init = function () {
        $("button.delete").click((e) => {
            let id = $(e.currentTarget).data("id");

            deleteCategory(id);
        });
    };
    return self;
})();

$(document).ready(function () {
    CategoriesModule.Init()
});

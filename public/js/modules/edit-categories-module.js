var EditCategoriesModule = (function () {
    // Properties

    var self = { 
        acqImageFile: "",
    };

    // Private functions
    function convertToBase64(file, cb) {
        var reader = new FileReader();
        reader.onload = function (e) {
          cb(null, e.target.result);
        };
        reader.onerror = function (e) {
          cb(e);
        };
        reader.readAsDataURL(file);
      }

      const resizeImage = (base64Str, maxWidth = 1000, maxHeight = 1000) => {
        return new Promise((resolve) => {
          let img = new Image();
          img.src = base64Str;
          img.onload = () => {
            let canvas = document.createElement("canvas");
            const MAX_WIDTH = maxWidth;
            const MAX_HEIGHT = maxHeight;
            let width = img.width;
            let height = img.height;
    
            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }
            canvas.width = width;
            canvas.height = height;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL("image/jpeg", 0.9));
          };
        });
      };

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

    function updateCategory() {
        var imgData = self.acqImageFile;
  
        var data = {
          id: $("#category-id").val(),
          title: $("#category-title").val(),
          image: imgData
        };
    
        if (!data.title) {
          toastr.error("Please fill title of the category!");
          $("#category-title").addClass("input-error-border");
          return;
        } else if (!data.image) {
          toastr.error("Please choose the category image!");
          return;
        } 
    
        $.post("/admin/categories/edit", data, function (json) {
          console.log(json);
          window.location.href = "/admin/categories";
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

        $("button.updated-category-save").click(() => {
            updateCategory();
          });

        $("#image").on("change", function (e) {
            e.preventDefault();
            var file = e.target.files[0];
      
            convertToBase64(file, function (err, data) {
              if (err) {
                console.log(err);
                return;
              }
      
              resizeImage(data).then((resizedImage) => {
                self.acqImageFile = resizedImage; // store reference to file
                $("#imagePreview").removeClass("d-none");
                $("#previous-category-image").addClass("d-none");
                $("#imagePreview").attr("src", resizedImage);
              });
            });
          });

    };

    return self;
})();

$(document).ready(function () {
    EditCategoriesModule.Init()
});

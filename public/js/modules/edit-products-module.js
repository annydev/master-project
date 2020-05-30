var EditProductsModule = (function () {
    // Preperties

    var self = {
        acqImageFile: "",
    };

    // Private functions
    function currentDate() {
        var date = new Date();
        return date;
    }

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

        $.post("/admin/prices/delete", data, function () { 
            location.reload();
        });
    }

    function updateStatusPrice(id) {
        var data = {
            id: id
        };

        $.post("/admin/prices/statusUpdate", data, function () {
            location.reload();
        });
    }

    function updateProduct() {
        var imgData = self.acqImageFile;
  
        var data = {
          id: $("#product-id").val(),
          title: $("#product-title").val(),
          description: $("#description").val(),
          imageURL: imgData
        };
    
        if (!data.title) {
          toastr.error("Please fill title of the product!");
          $("#category").addClass("input-error-border");
          return;
        } else if (!data.imageURL) {
          toastr.error("Please choose the product image!");
          return;
        } else if (!data.description) {
            toastr.error("Please add product description!");
            return;
          } 
    
        $.post("/admin/products/edit", data, function (json) {
          console.log(json);
          window.location.href = "/admin/products";
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
        });

        $("button.updated-product-save").click(() => {
            updateProduct();
          });

        $("#imageURL").on("change", function (e) {
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
                $("#imagePreview").attr("src", resizedImage);
              });
            });
          });
    };
    

    return self;
})();

$(document).ready(function () {
    EditProductsModule.Init();
});

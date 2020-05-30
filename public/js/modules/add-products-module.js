var AddProductsModule = (function () {
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

  function addProduct() {
    var imgData = self.acqImageFile;
    let resultCategoryId;
    let categoryId = $("#categoryTitle").val();
    let subcategoryId = $("#subcategoryTitle").val();

    if (subcategoryId === null) {
      resultCategoryId = categoryId;
    } else {
      resultCategoryId = subcategoryId;
    }

    var data = {
      titleProduct: $("#product").val(),
      productDescription: $("#description").val(),
      productCategory: resultCategoryId,
      productImage: imgData,
      date: currentDate()
    };

    if (!data.titleProduct) {
      toastr.error("Please fill title of the product!");
      return;
    } else if (!data.productDescription) {
      toastr.error("Please fill description of the product!");
      return;
    } else if (!data.productCategory) {
      toastr.error("Please fill category to the product!");
      return;
    } else if (!data.productImage) {
      toastr.error("Please add image to the product!");
      return;
    }

    $.post("add", data, function (json) {
      console.log(json);
      window.location.href = "/admin/products";
    });
  }

  function createOptionSelectForSubcategories() {
    let data = {
      categoryId: $("#categoryTitle").val(),
    };

    $.post("getSubcategories", data, function (json) {
      $("#subcategoryTitle").html("");

      if (json.subcategories.length > 0) {
        $("#subcategoryTitle").removeClass("d-none");
        $("#subcategoryTitle").append(
          "<option selected disabled>Choose subcategory</option>"
        );

        json.subcategories.forEach(function (subcategory) {
          $("#subcategoryTitle").append(
            $(
              `<option value="${subcategory._id}">${subcategory.title}</option>`
            )
          );
        });
      } else {
        $("#subcategoryTitle").addClass("d-none");
      }
    });
  }

  // Public functions

  self.Init = function () {
    $("button.product-save").click(() => {
      addProduct();
    });

    $("#imageURLProduct").on("change", function (e) {
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

    $("#categoryTitle").on("change", () => {
      createOptionSelectForSubcategories();
    });
  };

  return self;
})();

$(document).ready(function () {
  AddProductsModule.Init();
});

var AddNewProductsPriceModule = (function () {
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

  function suggestedPrice() {
    var imgData = self.acqImageFile;

    var priceInfo = {
      price: $("#price").val(),
      productId: $("#product-id").val(),
      shopId: $("#shop-id").val(),
      date: currentDate(),
      image: imgData,
      isApproved: false,
    };

    if (!priceInfo.price) {
      toastr.error("Va rugam sa indicati pretul!");
      return;
    } else if (!priceInfo.image) {
      toastr.error("Va rugam sa selectati imaginea!");
      return;
    }

    $.post("/prices/suggestPrice", priceInfo, function () {
      $("#exampleModal").modal("hide");

      Swal.fire({
        icon: "success",
        title: "Va multumim!",
        text: "In curind informatia Dvs va fi verificata!",
      });
    });
  }

  // Public functions

  self.Init = function () {
    $(".suggest-price").click((e) => {
      let productId = $(".product").val();
      let shopId = $(e.currentTarget).data("id");

      $("#product-id").val(productId);
      $("#shop-id").val(shopId);

      $("#exampleModal").modal("show");
    });

    $("button.save-modal-content").click(() => {
      suggestedPrice();
    });

    $("[data-dismiss=modal]").on("click", function (e) {
      var $t = $(this);
      var target =
        $t[0].href || $t.data("target") || $t.parents(".modal") || [];

      $(target).find("input").val("").end();
      $(target).find("#imagePreview").addClass("d-none");;
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
          $("#imagePreview").attr("src", resizedImage);
        });
      });
    });
  };

  return self;
})();

$(document).ready(function () {
  AddNewProductsPriceModule.Init();
});

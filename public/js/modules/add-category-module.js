var AddCategoriesModule = (function () {
    // Preperties
  
    var self = {
      acqImageFile: "",
    };

    //Private functions

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
  
    function addCategory() {
      var imgData = self.acqImageFile;

      var data = {
        titleCategory: $("#category").val(),
        categoryImage: imgData
      };
  
      if (!data.titleCategory) {
        toastr.error("Please fill title of the category!");
        $("#category").addClass("input-error-border");
        return;
      } else if (!data.categoryImage) {
        toastr.error("Please choose the category image!");
        return;
      } 
  
      $.post("add", data, function (json) {
        console.log(json);
        window.location.href = "/admin/categories";
      });
    }
    
  
    // Public functions
  
    self.Init = function () {
      $("button.category-save").click(() => {
        addCategory();
      });

      $("#categoryImage").on("change", function (e) {
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
    AddCategoriesModule.Init();
  });
  
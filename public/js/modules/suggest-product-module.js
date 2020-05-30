var SuggestNewProductsModule = (function () {
    // Preperties
  
    var self = {};
  
    // Private functions
    function currentDate() {
      var date = new Date();
      return date;
    }
  
    function suggestedProduct() {
  
      var productInfo = {
        productName: $("#product").val(),
        categoryId: $("#category-id").val(),
        date: currentDate(),
        isApproved: false,
      };
  
      if (!productInfo.productName) {
        toastr.error("Va rugam sa indicati denumirea produsului!");
        return;
      } 
  
      $.post("/product/suggestProduct", productInfo, function () {
        $("#sugest-product-modal").modal("hide");
  
        Swal.fire({
          icon: "success",
          title: "Va multumim!",
          text: "In curind informatia Dvs va fi verificata!",
        });
      });
    }
  
    // Public functions
  
    self.Init = function () {
      $(".suggest-product").click((e) => {
          let categoryId =  $(e.currentTarget).data("id");

          $("#category-id").val(categoryId);
  
        $("#sugest-product-modal").modal("show");
      });
  
      $("button.save-modal-content").click(() => {
        suggestedProduct();
      });

      $('#sugest-product-modal').on('hidden.bs.modal', function (e) {
          $('#sugest-product-modal').find("input").val("");
      });
    };
  
    return self;
  })();
  
  $(document).ready(function () {
    SuggestNewProductsModule.Init();
  });
  
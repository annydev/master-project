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
      $(".suggest-product").click((e) => {
          let categoryId =  $(e.currentTarget).data("id");

          $("#category-id").val(categoryId);
  
        $("#exampleModal").modal("show");
      });
  
      $("button.save-modal-content").click(() => {
        suggestedProduct();
      });
  
      $("[data-dismiss=modal]").on("click", function (e) {
        var $t = $(this);
        var target =
          $t[0].href || $t.data("target") || $t.parents(".modal") || [];
  
        $(target).find("input").val("").end();
      });
    };
  
    return self;
  })();
  
  $(document).ready(function () {
    SuggestNewProductsModule.Init();
  });
  
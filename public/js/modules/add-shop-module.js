var AddShopsModule = (function () {
    // Preperties
  
    var self = {};

    function addShop() {

      var data = {
        title: $("#shopName").val()
      };
  
      if (!data.title) {
        toastr.error("Please fill title of the shop!");
        $("#shopName").addClass("input-error-border");
        return;
      } 
  
      $.post("add", data, function (json) {
        console.log(json);
        window.location.href = "/admin/shops";
      });
    }
    
  
    // Public functions
  
    self.Init = function () {
      $("button.shop-save").click(() => {
        addShop();
      });
   
    };
  
    return self;
  })();
  
  $(document).ready(function () {
    AddShopsModule.Init();
  });
  
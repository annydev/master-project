var NotificationsModule = (function () {
  // Properties

  var self = {};

  // Private functions

  function findNotifications() {
    $.post("/admin/dashboard/notifications", function (json) {
      $("#links").html("");

      if (json.prices.length > 0) {
        json.prices.forEach(function (sugestedPrice) {
          let div = `<div class="mr-3">
            <div class="icon-circle bg-success">
                 <i class="fas fa-donate text-white"></i>
                </div>
            </div>
            <div>
            <div class="small text-gray-500">${sugestedPrice.date}</div>
            <span class="font-weight-bold"> ${sugestedPrice.productName} </span>
            <h6>${sugestedPrice.price} lei</h6>
          </div>`;

          $("#links").append($(`<a href="/admin/products/edit/${sugestedPrice.productId}" class="dropdown-item d-flex align-items-center" value="">${div}</a>`));
        });

        let notificationsCount = json.prices.length;

        $(".notifications").append($(`<span class="badge badge-danger badge-counter">${notificationsCount}+</span>`));
      } else {
        console.log("error found");
      }
    });
  }

  // Public functions

  self.Init = function () {
    findNotifications();
  };
  return self;
})();

$(document).ready(function () {
  NotificationsModule.Init();
});

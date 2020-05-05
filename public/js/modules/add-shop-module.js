var AddShopsModule = (function () {
    // Preperties
  
    var self = this;
  
    
  
    // Public functions
  
    self.Init = function () {
      $(document).ready(function () {
        jQuery.validator.addMethod('username_rule', function (value, element) {
          if (/^[a-zA-Z0-9_-]+$/.test(value)) {
            return true;
          } else {
            return false;
          };
        });
        jQuery.validator.addMethod('email_rule', function (value, element) {
          if (/^([a-zA-Z0-9_\-\.]+)\+?([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(value)) {
            return true;
          } else {
            return false;
          };
        });
        $('#add-shop').validate({
          rules: {
            'shop': {
              required: true
            }
          },
          messages: {
            'shop': "Acest camp este obligatoriu"
          }
        });
      });
    };
  
    return self;
  })();
  
  $(document).ready(function () {
    AddShopsModule.Init();
  });
  
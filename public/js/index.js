
$(function () {
    $("#submit").click(function () {
        var password = $("#exampleInputPassword").val();
        var confirmPassword = $("#exampleRepeatPassword").val();

        if (password != confirmPassword) {
            alert("Passwords Don't Match");
            return false;
        }
        return true;
    });
});


// making post request to delete item using the id of the item from the client-side and then send this to server.

// $("button.delete").click(function () {
//     var data = {
//         id: this.dataset.id
//     };

//     $.post("/admin/categories/delete", data, function (result) { //result came from server
//         location.reload();
//     });
// });

$("button.delete-price").click(function () {
    var data = {
        id: this.dataset.id
    };

    $.post("/admin/prices/delete", data, function () { //result came from server
        location.reload();
    });
});

$("button.delete-product").click(function () {
    var data = {
        id: this.dataset.id
    };

    $.post("/admin/product/delete", data, function () { //result came from server
        location.reload();
    });
});

$("button.del").click(function () {
    var data = {
        id: this.dataset.id
    };

    $.post("/admin/shops/delete", data, function (result) {
        location.reload();
    });
});

// $("button.add-subcategory").click(function () {
//     let data = {
//         subId: $("#subId").val(),
//         titleSubcategory: $("#titleSubcategory").val()
//     }

//     $.post("/admin/categories/addSubcategory", data, function (json) {
//         location.reload();
//     });
// });

// $("button.delete-subcategory").click(function () {
//     var data = {
//         subId: $("#subId").val()
//     }
//     $.post("/admin/categories/deleteSubcategory", data, function (json) {
//         location.reload();
//     });
// });

$("button.product-save").click(function () {
    let resultCategoryId;
    let categoryId = $("#categoryTitle").val();
    let subcategoryId = $("#subcategoryTitle").val();

    if (subcategoryId === null) {
        resultCategoryId = categoryId
    } else {
        resultCategoryId = subcategoryId
    }

    var data = {
        titleProduct: $("#product").val(),
        productCategory: resultCategoryId,
        productImage:$("#imageURLProduct").val()
    }
    $.post("/addProduct", data, function (json) {
        console.log(json);
        window.location.href = "/admin/products";
    });
    
});

$(".add-price").click(function() {
    function currentDate() {
        var date = new Date();
        return date;
    }
    var data = {
        price: $("#price").val(),
        productId: $("#product-id").val(),
        shopId: $("#shop-id").val(),
        date: currentDate("ru")
    }

    $.post("/admin/prices/add", data, function(json) {
        console.log(json)
        location.reload();
    });
});

// $("#categoryTitle").on("change", function (e) {
//     let data = {
//         categoryId: $("#categoryTitle").val()
//     }

//     $.post("/admin/getSubcategories", data, function (json) {
//         $('#subcategoryTitle').html("");

//         if (json.subcategories.length > 0) {
//             $('#subcategoryTitle').removeClass("d-none");
//             $('#subcategoryTitle').append("<option selected disabled>Choose subcategory</option>")

//             json.subcategories.forEach(function (subcategory) {
//                 $('#subcategoryTitle').append($(`<option value="${subcategory._id}">${subcategory.title}</option>`));
//             });
//         } else {
//             $('#subcategoryTitle').addClass("d-none");
//         }
//     });
// });


// var password = document.getElementById("exampleInputPassword")
//   , confirmPassword = document.getElementById("exampleRepeatPassword");

// function validatePassword(){
//   if(password.value != confirmPassword.value) {
//     confirmPassword.setCustomValidity("Passwords Don't Match");
//   } else {
//     confirmPassword.setCustomValidity('');
//   }
// }

// password.onchange = validatePassword;
// confirmPassword.onkeyup = validatePassword;

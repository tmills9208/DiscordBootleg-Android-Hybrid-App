/** File: util.js
 *  Assignment 2
 *
 *  Revision History:
 *      Tyler Mills, Feb 17, 2020: Created
 */

function getCurrentAge(dob) {
    var year = Number(dob.substr(0,4));
    var month = Number(dob.substr(5,2)) - 1;
    var day = Number(dob.substr(8,2));
    var today = new Date();
    var age = today.getFullYear() - year;
    if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
        age--;
    }
    return age;
}

function isChecked(id){
    if ($(id).is(":checked"))
    {
        return true;
    }
    else
    {
        return false;
    }
}

function doValidate_tmAddReview() {
    var form = $("#tmAddForm");
    form.validate({
        rules:{
            tmAddFormBusinessName:{
                required: true,
                rangelength: [2, 30]
            },
            tmAddFormReviewerEmail:{
                required: true,
                email: true
            },
            tmAddFormReviewDate:{
                required: true,
                date: true
            },
            tmAddFormFoodRating:{
                required: isChecked("#tmAddFormChkRatings"),
                range: [0, 5]
            },
            tmAddFormServiceRating:{
                required: isChecked("#tmAddFormChkRatings"),
                range: [0, 5]
            },
            tmAddFormValueRating:{
                required: isChecked("#tmAddFormChkRatings"),
                range: [0, 5]
            },
        },
        messages:{
            tmAddFormBusinessName:{
                required: "Business name is required",
                rangelength: "Length must be 2-30 characters long"
            },
            tmAddFormReviewerEmail:{
                required: "Reviewer email is required",
                email: "Please enter a valid email address"
            },
            tmAddFormReviewDate:{
                required: "Review date is required",
                date: "Invalid date format"
            },
            tmAddFormFoodRating:{
                required: "Food Rating is required",
                range: "Value must be 0-5"
            },
            tmAddFormServiceRating:{
                required: "Service Rating is required",
                range: "Value must be 0-5"
            },
            tmAddFormValueRating:{
                required: "Value Rating is required",
                range: "Value must be 0-5"
            },
        }
    });
    return form.valid();
}

function doValidate_tmEditReview() {
    var form = $("#tmEditForm");
    form.validate({
        rules:{
            tmEditFormBusinessName:{
                required: true,
                rangelength: [2, 30]
            },
            tmEditFormReviewerEmail:{
                required: true,
                email: true
            },
            tmEditFormReviewDate:{
                required: true,
                date: true
            },
            tmEditFormFoodRating:{
                required: isChecked("#tmEditFormChkRatings"),
                range: [0, 5]
            },
            tmEditFormServiceRating:{
                required: isChecked("#tmEditFormChkRatings"),
                range: [0, 5]
            },
            tmEditFormValueRating:{
                required: isChecked("#tmEditFormChkRatings"),
                range: [0, 5]
            },
        },
        messages:{
            tmEditFormBusinessName:{
                required: "Business name is required",
                rangelength: "Length must be 2-30 characters long"
            },
            tmEditFormReviewerEmail:{
                required: "Reviewer email is required",
                email: "Please enter a valid email address"
            },
            tmEditFormReviewDate:{
                required: "Review date is required",
                date: "Invalid date format"
            },
            tmEditFormFoodRating:{
                required: "Food Rating is required",
                range: "Value must be 0-5"
            },
            tmEditFormServiceRating:{
                required: "Service Rating is required",
                range: "Value must be 0-5"
            },
            tmEditFormValueRating:{
                required: "Value Rating is required",
                range: "Value must be 0-5"
            },
        }
    });
    return form.valid();
}

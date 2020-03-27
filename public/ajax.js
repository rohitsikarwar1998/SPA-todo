$.get("/todos", data => {
    console.log(data);
});

// $('form').submit(e => {
//     e.preventDefault();
//     var formData = $('form').serialize();
//     var formAction = $('form').attr('action');
//     // $.post('/todos', formData, function (data) {
//     //     console.log(data);
//     // });
//     // var formAction = $(this).attr('action');
//     $.ajax({
//         type: "POST",
//         url: formAction,
//         data: formData,
//         success: function (response) {
//             console.log(response);
//         },
//         dataType: "json"
//     });
// });

$('form').submit(e => {
    e.preventDefault();
    var formData = $('form').serialize();
    var formAction = $('form').attr('action');
    $.ajax({
        type: 'PUT',
        url: formAction,
        data: formData,
        dataType: 'json',
        success: function (response) {
            console.log(response);
        }
    });
})


$('form').submit(e => {
    e.preventDefault();
    var formAction = $('form').attr('action');
    $.ajax({
        url: formAction,
        type: 'DELETE',
        success: function (response) {
            console.log(response);
        }
    });
});
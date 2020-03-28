'use strict'

$(document).ready(function () {

    $.get('http://localhost:3000/todos', function (todos) {
        todos.forEach(todo => {
            $('#list-item').append(
                `
                <li class="list-group-item">

						<form action="/todos/${todo._id}" method="POST" id="edit-todo-form">
							<div class="form-group">
								<label>Item Text</label>
								<input type="text" value="${todo.text}" name="todo[text]" class="form-control">
							</div>
							<button class="btn btn-primary">Update Item</button>
						</form>

						<span class="lead">
                           ${todo.text}
						</span>
						<div class="pull-right">
							<a class="btn btn-sm btn-warning edit-button">Edit</a>
							<form style="display: inline" method="POST" id="delete-todo-form"
								action="/todos/${todo._id}">
								<button type=" submit" class="btn btn-sm btn-danger">Delete</button>
							</form>
						</div>
						<div class="clearfix"></div>
					</li>
                `
            );
        });
    });

    $('#new-todo-form').submit(e => {
        e.preventDefault();
        var formData = $('#new-todo-form').serialize();
        $.post('http://localhost:3000/todos', formData, data => {
            $('#list-item').append(
                `
            <li class="list-group-item">

                <form action="/todos/${data._id}" method="POST" id="edit-todo-form">
					<div class="form-group">
						<label>Item Text</label>
						<input type="text" value="${data.text}" name="todo[text]" class="form-control">
					</div>
					<button class="btn btn-primary">Update Item</button>
				</form>

				<span class="lead">
                ${data.text}
				</span>
				<div class="pull-right">
					<a class="btn btn-sm btn-warning edit-button">Edit</a>
					<form style="display: inline" method="POST" id="delete-todo-form" action="/todos/${data._id}">
						<button type=" submit" class="btn btn-sm btn-danger">Delete</button>
					</form>
				</div>
				<div class="clearfix"></div>
			</li>
            `
            );
            $('#new-todo-form').find('.form-control').val('');
        });
    });

    $('#list-item').on('click', '.edit-button', function () {
        $(this).parent().siblings('#edit-todo-form').toggle();
    });

    $('#list-item').on('submit', '#edit-todo-form', function (e) {
        e.preventDefault();
        var updatedData = $(this).serialize();
        var actionUrl = 'http://localhost:3000' + $(this).attr('action');
        var originalItem = $(this).parent('.list-group-item');
        $.ajax({
            type: 'PUT',
            url: actionUrl,
            data: updatedData,
            dataType: 'json',
            originalItem: originalItem,
            success: function (data) {
                (this.originalItem).html(
                    `
                <form action="/todos/${data._id}" method="POST" id="edit-todo-form">
					<div class="form-group">
						<label>Item Text</label>
						<input type="text" value="${data.text}" name="todo[text]" class="form-control">
					</div>
					<button class="btn btn-primary">Update Item</button>
				</form>

				<span class="lead">
                ${data.text}
				</span>
				<div class="pull-right">
					<a class="btn btn-sm btn-warning edit-button">Edit</a>
					<form style="display: inline" method="POST" id="delete-todo-form" action="/todos/${data._id}">
						<button type=" submit" class="btn btn-sm btn-danger">Delete</button>
					</form>
				</div>
				<div class="clearfix"></div>

                `
                );
            }
        });
    });

    $('#list-item').on('submit', '#delete-todo-form', function (e) {
        e.preventDefault();
        var isConfirm = confirm("Are you sure ?");
        if (isConfirm) {
            var formAction = 'http://localhost:3000' + $(this).attr('action');
            var itemToDelete = $(this).closest('.list-group-item');
            $.ajax({
                type: 'DELETE',
                url: formAction,
                itemToDelete: itemToDelete,
                success: function (data) {
                    // console.log(data);
                    (this.itemToDelete).remove();
                }
            });
        }
        else {
            $(this).find('button').blur();
        }
    })

});








// $.get("/todos", data => {
//     console.log(data);
// });

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

// $('form').submit(e => {
//     e.preventDefault();
//     var formData = $('form').serialize();
//     var formAction = $('form').attr('action');
//     $.ajax({
//         type: 'PUT',
//         url: formAction,
//         data: formData,
//         dataType: 'json',
//         success: function (response) {
//             console.log(response);
//         }
//     });
// })


// $('form').submit(e => {
//     e.preventDefault();
//     var formAction = $('form').attr('action');
//     $.ajax({
//         url: formAction,
//         type: 'DELETE',
//         success: function (response) {
//             console.log(response);
//         }
//     });
// });
/**
 * Generates a new todo (<li> tag) and appends it to the <ul> of todos
 * @param {string} item.title - the todo's title
 */
const generateTodo = (item) => {
    if (item.done) {
        const newSpan = $('<span></span>').text(item.title);
        const newListItem = $('<li></li>').addClass('done-li').append(newSpan);
        const newDeleteBtn = $('<div></div>').addClass('icon material-icons md-red delete-btn').text('remove_circle_outline');

        newListItem.append(newDeleteBtn);
        $('#done-container').append(newListItem).hide().fadeIn('fast');
    } else {
        const inputContainer = $('<div></div>').addClass('mdl-textfield mdl-js-textfield');
        const newInput = $('<input/>').addClass('todo-field mdl-textfield__input').val(item.title);
        inputContainer.append(newInput);

        const newListItem = $('<li></li>').addClass('todo-li').append(inputContainer);

        const newDeleteBtn = $('<div></div>').addClass('icon material-icons md-red delete-btn').text('remove_circle_outline');

        const newDoneButton = $('<div></div>').addClass('icon material-icons done-btn').text('check');
        newListItem.append(newDeleteBtn);
        newListItem.append(newDoneButton);
        $('#todos-container').append(newListItem).hide().fadeIn('fast');
    }
};

/**
 * Saves the state of todos in localStorage
 */
const save = () => {
    let numberTodos = 0;
    let iterator = 0;

    //we clear storage everytime and regenerates it from dom elements
    localStorage.clear();

    //Save undone todos
    $('.todo-li div input').each(function () {
        const newTodo = {
            title: $(this).val(),
            done: false
        }
        const serializedTodo = JSON.stringify(newTodo).toString();
        localStorage.setItem(`todo${iterator}`, serializedTodo);
        numberTodos++;
        iterator++;
    });

    //Save done todos
    $('.done-li span').each(function () {
        const doneTodo = {
            title: $(this).text(),
            done: true
        }
        const serializedTodo = JSON.stringify(doneTodo).toString();
        localStorage.setItem(`todo${iterator}`, serializedTodo);
        iterator++;
    });

    //Displays the number of unfinished todos
    // $('#todos-number').text(numberTodos);
    $('#todos-number').attr('data-badge', numberTodos);

};

/**
 * Load previous todos stored in localStorage
 */
const loadPreviousTodos = () => {
    let numberTodos = 0;
    if (localStorage.length > 0) {
        for (let i = 0; i < localStorage.length; i++) {
            const item = JSON.parse(localStorage.getItem(`todo${i}`));
            generateTodo(item);
            if (!item.done) {
                numberTodos++;
            }
        }
    }
    $('#todos-number').attr('data-badge', numberTodos);
};

/**
 * Displays a toast to alert the user
 * @param message - The message to be displayed
 */
const displayFlashMessage = (message) => {
    const data = {
        message,
    };
    const notification = document.querySelector('#snackbar');
    notification.MaterialSnackbar.showSnackbar(data);
}


$(function () {
    //Load previous todos on document ready
    loadPreviousTodos();

    //Save todos on each input key press to keep up-to-date todos
    $('.todo-field').each(function () {
        $(this).on('keyup', function () {
            save();
        })
    })

    //Save todos on list sorting
    $("#todos-container").sortable({
        update: function (event, ui) {
            save();
        },
    });

    //Add todo
    $('form').on('submit', function (e) {
        e.preventDefault();
        const todoTitle = $('#title').val();
        if (todoTitle !== '') {
            const newTodo = {
                title: todoTitle,
                done: false
            }
            generateTodo(newTodo);
            save();
            displayFlashMessage('Todo added successfully !');
        }
        $(this).children('.mdl-textfield').children('input').val(null);

        //Material design adds a is-dirty class once the input has been touched
        //We need to remove it for the label to be displayed again
        $(this).children('.mdl-textfield').removeClass('is-dirty');
    });

    //Saves todo as done
    $('body').on('click', '.done-btn', function () {
        const doneTodoTitle = $(this).siblings('div').find('input').val();

        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                const item = JSON.parse(localStorage.getItem(`todo${i}`));
                if (item.title === doneTodoTitle) {
                    item.done = true;
                    const serializedTodo = JSON.stringify(item).toString();
                    localStorage.removeItem(`todo${i}`);
                    localStorage.setItem(`todo${i}`, serializedTodo);
                    break;
                }
            }
        }

        generateTodo({ title: doneTodoTitle, done: true });
        $(this).parent().fadeOut('fast', function () {
            $(this).remove();
            save();
            displayFlashMessage('Todo marked as done !');
        });
    });

    //Delete one todo
    $('body').on('click', '.delete-btn', function () {
        $(this).parent().fadeOut('fast', function () {
            $(this).remove();
            save();
            displayFlashMessage('Todo removed successfully !');
        });
    });

    //Delete all done todos
    $('body').on('click', '#clear-done', function () {
        if ($('#done-container').children('li').length > 0) {
            $('#done-container').children().fadeOut('fast', function () {
                $(this).remove();
                save();
            });
            displayFlashMessage('Done todos removed !');
            $('#wtf').append($('<img/>').attr('src', 'goodjob.gif'));
            window.setTimeout(function () {
                $('#wtf').children().remove();
            }, 3200);
        }
    });

    //Delete all todos
    $('body').on('click', '#clear-todos', function () {
        if ($('#todos-container').children('li').length > 0) {
            $('#todos-container').children().fadeOut('fast', function () {
                $(this).remove();
                save();
            });
            displayFlashMessage('All todos removed !');
        }
    });
});
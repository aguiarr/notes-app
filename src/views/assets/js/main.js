const $noteBody = document.getElementById('noteBody');
const $titleNote = document.getElementById('titleNote');
const $removeList = document.getElementById('removeNote');
const $addNote = document.getElementById('new');

const $noteList = document.querySelector('.note-list');
const $noteLi = document.querySelector('.note-li');
var selectedNoteId;
var lastNote;


window.addEventListener("load", getNotes);

window.addEventListener("click", (envent) => {
    let li = envent.target;
    if (li.id == 'new') {
        $titleNote.value = 'Title';
        $noteBody.value = '';
        lastNote = li;
    } else {
        if (li.getAttribute('class') == 'note-li') {
            li.getAttribute('class')
            selectedNoteId = li.id;
            getNoteById(li.id);

            if (lastNote) {
                lastNote.className = "note-li";
            }

            li.className = "selected-list"
            lastNote = li;
        }
    }
});

$addNote.addEventListener("click", addNote);


var i;
$titleNote.addEventListener("keydown", () => {
    i = 0;
});

$noteBody.addEventListener("keydown", () => {
    i = 0;
});

setInterval(() => {
    if (i == 1) updateNote(selectedNoteId);
    i++;
}, 1000);

$removeList.addEventListener("click", () => {
    let a = confirm("Atencion! Do really you wnat to delete this note?");
    if (a == true) {
        console.log(selectedNoteId)
        console.log(lastNote)
        deleteNote(selectedNoteId);
        $noteList.removeChild(lastNote);
    } else {
        getNoteById(selectedNoteId);
        return;
    }
});

function getNotes() {
    (function ($) {
        $.get("http://localhost:3000/notes", function (data, status) {

            data.forEach(value => {
                var noteLi = document.createElement("LI");
                var textnode = document.createTextNode(value.title);

                noteLi.appendChild(textnode);
                noteLi.className = "note-li";
                noteLi.setAttribute("id", value.id);

                $noteList.appendChild(noteLi);
            });

            $titleNote.value = '';
            $noteBody.value = '';
        });

    })(jQuery);
}

function getNoteById(id) {

    (function ($) {
        $.get("http://localhost:3000/notes/" + id, function (data, status) {
            console.log(data);

            $titleNote.value = data.title;
            $noteBody.value = data.note;
        });

    })(jQuery);
}

function addNote() {

    var noteLi = document.createElement("LI");
    var textnode = document.createTextNode('Title');

    lastNote.className = "note-li"

    noteLi.appendChild(textnode);
    $noteList.appendChild(noteLi);

    noteLi.className = "selected-list";
    lastNote = noteLi;

    (function ($) {

        $.post("http://localhost:3000/notes/", { title: 'Title', note: '' });

        $.get("http://localhost:3000/notes", (data, status) => {
            noteLi.setAttribute("id", data[0].id);
            selectedNoteId = data[0].id;
        });

    })(jQuery);
}

function deleteNote(id) {
    (function ($) {
        $.ajax({
            url: "http://localhost:3000/notes/" + id,
            type: 'DELETE',
            success: function (data) {
                console.log("id deletado: " + id);
                if (data.id == id) {
                    return true;
                } else {
                    return false;
                }
            }
        });
    })(jQuery);
}

function updateNote(id) {
    (function ($) {
        data = { title: $titleNote.value, note: $noteBody.value };
        $.ajax({
            url: "http://localhost:3000/notes/" + id,
            type: 'PATCH',
            data: data
        });

        $.get("http://localhost:3000/notes/" + id, (data, status) => {

            $titleNote.innerHTML = data.title;
            $noteBody.innerHTML = data.note;

            let a = document.getElementById(data.id);
            a.innerHTML = data.title;
        })

    })(jQuery);
}




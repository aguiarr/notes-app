const $noteBody = document.getElementById('noteBody');
const $titleNote = document.getElementById('titleNote');

const $removeList = document.getElementById('removeNote');

const $noteLi = document.querySelector('.note-li');
const $notes = document.querySelector('.side-notes');

var $noteList;
var selectedNoteId;
var lastNote;


window.addEventListener("load", getNotes);

window.addEventListener("click", (envent) => {
    selectedItem(envent.target);
});
window.addEventListener("resize", () => {

    var width = $(document).width();
    var heigth = $(document).height();
    if($(window).width() > 800){
        $noteBody.style.width = (width - 220) + 'px';
        $noteBody.style.height = (heigth - 70)+ 'px'

        
    }
});


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
}, 500);

$removeList.addEventListener("click", () => {
    $noteList = document.querySelector('.note-list');
    let a = confirm("Atencion! Do really you wnat to delete this note?");
    if (a == true) {

        deleteNote(selectedNoteId);
        $noteList.removeChild(lastNote);

        $titleNote.value = '';
        $noteBody.value = '';
    } else {
        getNoteById(selectedNoteId);
        return;
    }
});

function selectedItem(element){
    if (element.id == 'new') {

        $noteList = document.querySelector('.note-list');
        if($noteList) $notes.removeChild($noteList);
        
        addNote();
    } else {
        if (element.getAttribute('class') == 'note-li') {
            element.getAttribute('class')
            selectedNoteId = element.id;
            getNoteById(element.id);

            if (lastNote) {
                lastNote.className = "note-li";
            }

            element.className = "selected-list"
            lastNote = element;
        }
    }
}

function getNotes() {
    (function ($) {
        var noteUl = document.createElement("UL");
        noteUl.className = "note-list";

        var notes = [];
        $.get("http://localhost:4000/notes", function (data, status) {
            data.forEach(value => {
                var noteLi = document.createElement("LI");
                var textnode = document.createTextNode(value.title);

                noteLi.appendChild(textnode);
                noteLi.className = "note-li";
                noteLi.setAttribute("id", value.id);

                noteUl.appendChild(noteLi);
                $notes.appendChild(noteUl);
                notes.push(noteLi);
            });

            if(notes.length > 0) selectedItem(notes[0])

            $titleNote.value = '';
            $noteBody.value = '';
        });

    })(jQuery);
}

function getNoteById(id) {

    (function ($) {
        $.get("http://localhost:4000/notes/" + id, function (data, status) {

            $titleNote.value = data.title;
            $noteBody.value = data.note;
        });

    })(jQuery);
}

function addNote() {

    (function ($) {

        $.post("http://localhost:4000/notes/", { title: 'Title', note: '' });

    })(jQuery);

    getNotes();

}

function deleteNote(id) {
    (function ($) {
        $.ajax({
            url: "http://localhost:4000/notes/" + id,
            type: 'DELETE',
            success: function (data) {
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
            url: "http://localhost:4000/notes/" + id,
            type: 'PATCH',
            data: data
        });

        $.get("http://localhost:4000/notes/" + id, (data, status) => {

            $titleNote.innerHTML = data.title;
            $noteBody.innerHTML = data.note;

            let a = document.getElementById(data.id);
            a.innerHTML = data.title;
        })

    })(jQuery);
}




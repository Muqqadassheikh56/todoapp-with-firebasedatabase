var list = document.getElementById("list");
var isnew = false;
function addTodo() {
    var todo_item = document.getElementById("todo-item");
    if (todo_item.value == "") {
        alert("Please enter something");
        editBtn.disabled = true;
        return
    }

    var key = firebase.database().ref('student').push().key
    var student = {
        name: todo_item.value,
        key: key

    }
    firebase.database().ref('student/' + key).set(student)

    showdata()

    todo_item.value = ""
    // console.log(li)
}

function showdata() {
    var cd;
    if (isnew == true) {
        list.innerHTML = ""
        firebase.database().ref('student').on('child_added', function (data) {
            cd = data.val();
            create_list(cd)
        });
    }
    else {
        isnew = true
        firebase.database().ref('student').once('value', function (data) {
            data.forEach(function (c) {
                cd = c.val();
                create_list(cd)
                // console.log(cd.name)
            });
        });
    }
}
function create_list(cd) {
    var list = document.getElementById("list");
    var li = document.createElement("li");
    var liText = document.createTextNode(cd.name)
    li.appendChild(liText);
    var dkey = document.createTextNode(cd.key);
    var list1 = document.createElement("span");
list1.appendChild(dkey)

    list1.setAttribute("class", "hide");
    li.appendChild(list1);
    

    //  create dlt button
    var dltBtn = document.createElement("button");
    var dltText = document.createTextNode("");
    dltBtn.setAttribute("class", "fa fa-trash");
    dltBtn.appendChild(dltText);
    dltBtn.setAttribute("onclick", "dltItem(this)");
    li.appendChild(dltBtn)

    // create edit button
    var editBtn = document.createElement("button");
    var editText = document.createTextNode("");
    editBtn.setAttribute("class", " fa fa-pencil ");
    editBtn.appendChild(editText);
    editBtn.setAttribute("onclick", "editItem(this)");
    li.appendChild(editBtn)

    list.appendChild(li)
}

function dltItem(e) {
    // firebase.database().ref('student').remove()

    // 
    var delkey = e.parentNode.childNodes[1].innerHTML
    firebase.database().ref('student/' + delkey).remove()
    // showdata()
    e.parentNode.remove()
    

}
function editItem(e) {
    var val = prompt("Enter a new value", e.parentNode.firstChild.nodeValue);
    var editkey = e.parentNode.childNodes[1].innerHTML
    firebase.database().ref('student/' + editkey).set({
        key: editkey ,
        name: val 
    })
    
    e.parentNode.firstChild.nodeValue = val;
}

function dltAll() {
    list.innerHTML = ""
    firebase.database().ref('student').remove()
}






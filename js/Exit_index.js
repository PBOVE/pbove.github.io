function Node_li(dom) {
    var span = document.createElement('span');
    span.classList.add('iconfont');
    span.innerHTML = '&#xe68b;';

    var Input = document.createElement('input');
    Input.setAttribute('type', 'text');

    var li = document.createElement('li');
    li.appendChild(span);
    li.appendChild(Input);
    dom.appendChild(li);
}

function Node_ul(dom) {
    var ul = document.createElement('ul');
    dom.appendChild(ul);
    Node_li(ul);
    ul_init_function(dom)
}

function Remove_Node(ul, li) {
    ul.removeChild(li);
}

function ul_init_click() {
    var ul = document.querySelectorAll('#Main_page .left ul');
    console.log(ul);
    for (var i = 0; i < ul.length; i++) {
        (function (dom) {

            ul_init_function(dom);
        })(ul[i])
    }
}


function ul_init_function(dom) {

    dom.onclick = function (event) {
        var event = event || window.event;
        event.stopPropagation();
        var Target = event.target;
        //console.log(event.target.nodeName.toUpperCase());
        if (Target.nodeName.toUpperCase() == 'INPUT') {
            // console.log(Target);
            Target.oninput = function () {
                var Input = dom.lastChild.getElementsByTagName('input');
                var Input_len = Input.length
                console.log(Input_len);
                //console.log(Target.value + "      "+dom);
                if (Input[Input_len - 1].value != '') {
                    // console.log(Input.value);
                    Node_li(dom);
                }
            }
            Target.onblur = function () {
                var li = Target.parentNode;
                //console.log(Target.parentNode);
                //console.log(Target);
                if (Target.value == '' && dom.children.length != 1) {
                    Remove_Node(dom, li)
                }
            }
        }
        else if (Target.nodeName.toUpperCase() == 'SPAN') {
            var li = Target.parentNode;
            if (Target.style.transform == 'rotate(90deg)') {
                Target.style.transform = 'rotate(0deg)';
                var ul = li.getElementsByTagName('ul');
                ul[0].style.display='none';
            }
            else {
                Target.style.transform = 'rotate(90deg)';
                var ul = li.getElementsByTagName('ul');
                if(ul.length==1)
                    ul[0].style.display='block';
                else 
                    Node_ul(li);
                
                // console.log(ul.length);
                // console.log(Target);
            }


        }

    }
    // dom.addEventListener('click', function (event) {
    // })
}


ul_init_click();
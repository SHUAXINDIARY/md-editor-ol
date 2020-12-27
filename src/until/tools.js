// 阻止textarea失效问题
export function preventTab(e) {
    let dom = e.target;
    if (e.keyCode == 9) {
        e.preventDefault();
        var indent = "    ";
        var start = dom.selectionStart;
        var end = dom.selectionEnd;
        var selected = window.getSelection().toString();
        selected = indent + selected.replace(/\n/g, "\n" + indent);
        dom.value =
            dom.value.substring(0, start) + selected + dom.value.substring(end);
        dom.setSelectionRange(start + indent.length, start + selected.length);
    }
}
var container = document.getElementById('editor');
var editor = new Quill(container, {
  theme: 'snow'
});

editor.on('editor-change', function(eventName, options) {
  if (eventName === 'text-change') {
    var textarea = document.getElementById('textarea-content')
    textarea.value = editor.root.innerHTML
  }
});
import Ember from 'ember';

export default Ember.Component.extend({
  lastValue : '',

  regex: RegExp(/\[\[+(.*?)\]\]+/g),

  variables: [],


  getCaretPosition: function() {
    if (window.getSelection && window.getSelection().getRangeAt && window.getSelection().rangeCount > 0) {
      const range = window.getSelection().getRangeAt(0);
      const selection = window.getSelection();



      var selectedObj = window.getSelection();
      var rangeCount = 0;
      var childNodes = selectedObj.anchorNode.parentNode.childNodes;

      for (var i = 0; i < childNodes.length; i++) {
        if (childNodes[i] == selectedObj.anchorNode) {
          break;
        }

        if (childNodes[i].innerHTML){
          rangeCount += childNodes[i].innerHTML.length;
        }

        else if (childNodes[i].nodeType == 3) {
          rangeCount += childNodes[i].textContent.length;
        }
      }

      return range.startOffset + rangeCount;
    }
    return -1;
  },

  setCaretPosition: function(position){
    var element = Ember.$("div [contenteditable=true]")[0];
    var range = document.createRange();
    var selection = window.getSelection();

    for(let i=0; i<element.childNodes.length; i++){
      const child = element.childNodes[i];

      const content = (child.nodeType === Node.TEXT_NODE) ? child.nodeValue : child.innerHTML;

      if(content.length < position){
        position -= content.length;
      }else{
        if(child.nodeType !== Node.TEXT_NODE){

          // add a zero width character if the variable is the last word in the
          // active text node. In this way the focus can be set to the text
          // node after the bold element for the new variable
          var t = document.createTextNode("\u200B");
          element.appendChild(t);

          setTimeout(function(){
            range.setStart(t, 1);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
          }, 100)

        }else{
          range.setStart(child, position);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    }
  },

  setWordCount: function(){
    this.set('wordCount', Ember.$("div [contenteditable=true]")[0].innerHTML.split(" ").length);
  },

  didInsertElement() {
    this._super(...arguments);

    const self = this;
    this.setWordCount();

    $("div [contenteditable=true]").bind("DOMSubtreeModified",function(){
      self.setWordCount();
    });
    $("div [contenteditable=true]").bind('blur keyup paste copy cut', function() {
      const element = Ember.$("div [contenteditable=true]")[0];
      const childNodes = element.childNodes;

      // save current caret position in order to reset it after
      // inserting the bold elements for variable highlighting
      const caretPosition = self.getCaretPosition();

      const regex = self.get('regex');
      for(let i=0; i<childNodes.length; i++){
        const child = childNodes[i];

        // only check text nodes for unparsed variables.
        // If the editor supports text formatting in future, this behaviour
        // has to be modified in order to find variables within formatted text
        if(child.nodeType == Node.TEXT_NODE){
          const text = child.nodeValue;
          const index = text.search(regex);

          if(index !== -1){
            let replacementNode = child.splitText(index);
            let highlightedNode = document.createElement('span');
            highlightedNode.className="md-variable";
            highlightedNode.appendChild(document.createTextNode(text.match(regex)));

            // add new variable to the list of defined variables
            self.get('variables').pushObject(text.match(regex)[0].replace('[[', '').replace(']]', ''));

            element.insertBefore(highlightedNode, replacementNode);

            i+=2;

            // delete the regex from the old text node to avoid displaying it
            // double.
            childNodes[i].nodeValue = childNodes[i].nodeValue.replace(regex, '');
          }
        }
      }


      // only update the caret position if the user did not select more than
      // one character
      const range = window.getSelection().getRangeAt(0);
      if(range.startOffset === range.endOffset){
        self.setCaretPosition(caretPosition);
      }
    });
  },

  actions: {
    onSave(){
      this.get("onSave")();
    },

    onCancel(){
      this.get("onCancel")();
    }
  }
});

import Component from '@ember/component';
import franc from 'npm:franc';
import Langs from 'npm:langs';

export default Component.extend({
  lastValue : '',

  regex: RegExp(/\[+(.*?)\]+/g),

  variables: [],

  wordCount: 10,


  localLanguageName: Ember.computed('language', 'wordCount', function() {
    const language = this.get('language');
    const languageObject = Langs.where("2", language);
    if(language === ''){
      return `Type ${10-this.get('wordCount')} more words to autodetect used language`;
    }
    if(languageObject === undefined){
      return "";
    }

    return languageObject.local;
  }),

  getCaretPosition: function() {
    if (window.getSelection && window.getSelection().getRangeAt && window.getSelection().rangeCount > 0) {
      const range = window.getSelection().getRangeAt(0);

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
    var element = Ember.$(this.element).find("div [contenteditable=true]")[0];

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

  setWordCountFromText: function(text){
    const length = text.split(" ").length;

    this.set('wordCount', length);
  },

  setLanguageFromText(text) {
    if(text.split(" ").length >= 10){
      this.set('language', franc(text));

      if(this.get('language') === ""){
        this.set('language', "Unknown Language");
      }
    }else{
      this.set('language', '');
    }
  },

  valueChanged: Ember.observer('tempValue', function() {
    const tempValue = this.get('tempValue');

    this.setLanguageFromText(tempValue);
    this.setWordCountFromText(tempValue);
  }),


  didReceiveAttrs() {
    this._super(...arguments);

    this.set('tempValue', this.get('value'));
    const tempValue = this.get('tempValue');

    this.setLanguageFromText(tempValue);
    this.setWordCountFromText(tempValue);
  },

  getEditableElement() {
    return Ember.$(this.element).find("div [contenteditable=true]");
  },

  updateUsedVariables() {
    let variables = element.text().match(self.get('regex'));
    if(variables !== null){
      let a = variables.map(variable => {
        return variable.replace('[', '').replace(']', '');
      })
      self.set("variables", a);
    }else{
      self.set("variables", null);
    }
  },


  didInsertElement() {
    this._super(...arguments);

    const self = this;

    const element = this.getEditableElement();
    element.bind("DOMSubtreeModified", function(){
      self.set('tempValue', this.innerHTML);
    });
    element.bind('blur keyup paste copy cut', function(e) {
      // return immediatly in case the user presses backspace
      if(e.keyCode === 8){
        return;
      }

      const childNodes = element[0].childNodes;

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

            element[0].insertBefore(highlightedNode, replacementNode);

            i += 2;

            // delete the regex from the old text node to avoid displaying it double.
            childNodes[i].nodeValue = childNodes[i].nodeValue.replace(regex, '');
          }
        }
      }

      // remove empty text nodes
      element[0].normalize();

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
      this.set('value', this.get('tempValue'));
      this.get("onSave")(this.get('tempValue'));
    },

    onCancel(){
      this.get("onCancel")();
    }
  }
});

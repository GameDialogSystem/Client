import Component from '@ember/component';
import Ember from 'ember';
import franc from 'npm:franc';
import Langs from 'npm:langs';

/**
 *
 * @module
 * @augments Ember/Component
 */
export default Component.extend({
  tagName: 'md-lineedit',

  regex: RegExp(/\[+(.*?)\]+/g),

  variables: [],

  wordCount: 10,


  /**
   * localLanguageName - Computes the used language of the editor.
   * In order to compute it the function will listen for every change of the
   * variables language and wordCount. Therefore with each new word the language
   * will be evaluated. It may happens that a language is not detected. In this
   * case the return value will be empty. Otherwise the local language will be
   * returned e.g. German will be returned as 'Deutsch'.
   *
   * @function
   * @param  {string} 'language'  The language of the content as calculated before
   * @param  {number} 'wordCount' the count of words within the content. The detection
   * does not work properly with short sentences. Therefore it might change in
   * future that you need to provide a defined number of words before the
   * language will be derived.
   *
   * @return {string}  The calculated language as local string. In case the algorithm
   * could not determine a language an empty string will be returned
   */
  localLanguageName: Ember.computed('language', 'wordCount', function() {
    const language = this.get('language');
    const languageObject = Langs.where("2", language);

    if (language === '' || languageObject === undefined) {
      return "";
    }

    return languageObject.local;
  }),


  /**
   * getSelection - Gets the current selection within the browser window
   *
   * @function
   * @return {Selection}  the selection made by the user or undefined if the browser
   * does not support the window.getSelection function.
   */
  getSelection() {
    if (window.getSelection) {
      return window.getSelection();
    } else {
      return undefined;
    }
  },


  /**
   * getRangeFromSelection - Gets the range of a user selection within the
   * browser window
   *
   * @function
   * @param  {Selection} selection the selection made by the user
   * @return {Range} the range of the user selection if the browser support the
   * corresponding functions. Otherwise undefined will be returned.
   */
  getRangeFromSelection(selection) {
    if (selection !== undefined && selection.getRangeAt && selection.rangeCount > 0) {
      return selection.getRangeAt(0);
    } else {
      return undefined;
    }
  },


  /**
   * getRange - Gets the range of the current active selection made by the user
   * within the browser window
   *
   * @function
   * @return {Range}  the range of the user selection if the browser support the
   * corresponding functions and a valid user selection exists.
   * Otherwise undefined will be returned.
   */
  getRange() {
    const selection = this.getSelection();
    if (selection === undefined) {
      return null;
    }

    const range = this.getRangeFromSelection(selection);
    if (range === undefined) {
      return null;
    }

    return range;
  },


  /**
   * getCaretPositionFromElement - Gets the caret position (aka cursor position)
   * of the current range within the browser. The caret position defines the
   * offset between cursor and the beginning of the content of the element that
   * is focused. Therefore the caret position shows a local offset.
   *
   * @function
   * @return {number}  the offset within the currently selected element between
   * cursor and beginning.
   */
  getCaretPositionFromElement() {
    const range = this.getRange();

    if (range === null) {
      return -1;
    }

    return range.startOffset;
  },


  /**
   * getCaretPosition - Calculates the caret position related to the contenteditable
   * input element. Contrary to the {@link getCaretPositionFromElement} function
   * will this function consider multiple elements.
   *
   * @function
   * @return {number}  the offset within the currently selected element between
   * cursor and beginning of the contenteditable content.
   */
  getCaretPosition() {
    var selectedNode = this.getSelection();
    if (selectedNode.anchorNode === null) {
      return 0;
    }

    var rangeCount = 0;

    const anchorNode = selectedNode.anchorNode;
    var childNodes = anchorNode.parentNode.childNodes;

    for (var i = 0; i < childNodes.length; i++) {
      if (childNodes[i] == anchorNode) {
        break;
      }

      const innerHTML = childNodes[i].innerHTML;
      if (innerHTML) {
        rangeCount += innerHTML.length;
      } else if (childNodes[i].nodeType == 3) {
        rangeCount += childNodes[i].textContent.length;
      }
    }

    const caretPosition = this.getCaretPositionFromElement();
    if (caretPosition === -1) {
      return -1;
    }

    return caretPosition + rangeCount;
  },


  /**
   * setCaretPositionOnElement - Sets the caret position within the passed element
   * at the desired position
   *
   * @function
   * @param  {Object} element  The element where the caret will be positioned
   * @param  {number} position The offset between the beginning of the element
   * content and the cursor position.
   * @return {undefined}
   */
  setCaretPositionOnElement(element, position) {
    let selection = this.getSelection();

    if (selection == undefined) {

      return;
    }

    var range = document.createRange();
    range.setStart(element, position);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  },


  /**
   * setCaretPosition - Sets the caret position within the contenteditable
   * element. In order to do so, the function will calculate the correct
   * element that will receive the focus and sets the caret position accordingly.
   *
   * @function
   * @param  {number} position The offset between the beginning of the element
   * content and the cursor position.
   * @return {undefined}
   */
  setCaretPosition(position) {
    const element = this.getEditableElement()[0];
    //const range = document.createRange();
    //const selection = window.getSelection();
    const childNodes = element.childNodes;

    for (let i = 0; i < childNodes.length; i++) {
      const child = childNodes[i];
      const content = (child.nodeType === Node.TEXT_NODE) ? child.nodeValue : child.innerHTML;

      if (content.length < position) {
        position -= content.length;
      } else {
        if (child.nodeType !== Node.TEXT_NODE) {
          // add a zero width character if the variable is the last word in the
          // active text node. In this way the focus can be set to the text
          // node after the bold element for the new variable
          var t = document.createTextNode("\u200B");
          element.appendChild(t);

          const self = this;
          setTimeout(function() {
            self.setCaretPositionOnElement(t, 1);
          }, 100)

        } else {
          this.setCaretPositionOnElement(child, position);
        }
      }
    }
  },


  /**
   * setWordCountFromText - Calculates the number of words by splitting the
   * text argument at each space. Be aware that this method is very primitive
   * and may consider punctuation characters for whole words. The value will
   * be saved within the wordCount variable.
   *
   * @param  {string} text From where the text count should be calculated
   */
  setWordCountFromText(text) {
    // return in case the text is empty
    if (text === null || text === undefined) {
      return;
    }

    const length = text.split(" ").length;
    this.set('wordCount', length);
  },

  setLanguageFromText(text) {
    if (text === null || text === undefined) {
      return;
    }

    if (text.split(" ").length >= 10) {
      this.set('language', franc(text));

      if (this.get('language') === "") {
        this.set('language', "Unknown Language");
      }
    } else {
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

    const value = this.get('value');

    this.setLanguageFromText(value);
    this.setWordCountFromText(value);
  },

  getEditableElement() {
    return Ember.$(this.element).find("div [contenteditable=true]");
  },

  modify(e) {
    const self = (e !== undefined && e.data !== undefined) ? e.data.context : this;
    const element = self.getEditableElement();
    const childNodes = element[0].childNodes;

    if (e !== undefined && e.keyCode && e.keyCode === 37) {
      return;
    }

    // save current caret position in order to reset it after
    // inserting the bold elements for variable highlighting
    const caretPosition = self.getCaretPosition();

    const regex = self.get('regex');
    for (let i = 0; i < childNodes.length; i++) {
      const child = childNodes[i];

      // only check text nodes for unparsed variables.
      // If the editor supports text formatting in future, this behaviour
      // has to be modified in order to find variables within formatted text
      if (child.nodeType == Node.TEXT_NODE) {
        const text = child.nodeValue;
        const index = text.search(regex);

        // continue only if the text contains the regex that defines variable strings
        if (index !== -1) {
          let replacementNode = child.splitText(index);
          let highlightedNode = document.createElement('span');
          highlightedNode.className = "md-variable";
          highlightedNode.appendChild(document.createTextNode(text.match(regex)));

          element[0].insertBefore(highlightedNode, replacementNode);

          i += 2;

          // delete the regex from the old text node to avoid displaying it double.
          childNodes[i].nodeValue = childNodes[i].nodeValue.replace(regex, '');

          // only update the caret position if the user did not select more than
          // one character
          const range = window.getSelection().getRangeAt(0);
          if (range.startOffset === range.endOffset) {
            self.setCaretPosition(caretPosition);
          }
        }
      }
    }

    // remove empty text nodes
    element[0].normalize();

    let dirtyVariables = element[0].innerHTML.match(regex);
    if (dirtyVariables !== null) {
      const variables = dirtyVariables.map(str => {
        return str.replace("[", "").replace("]", "");
      });

      self.set("variables", variables);
    } else {
      self.set("variables", null);
    }

  },

  didInsertElement() {
    this._super(...arguments);

    const self = this;

    const element = this.getEditableElement();



    // stop propagation to prevent setting caret position handled by the
    // component element click function
    element.click((e) => {
      e.stopPropagation();
    })

    // auto focus in case the user clicks outside of the contenteditable element
    this.$().click(() => {
      element.focus();
      this.setCaretPosition(element.text().length)
    })

    // save the content each time it changed into a temporal value
    element.bind("DOMSubtreeModified", function() {
      //const caretPosition = self.getCaretPosition();

      const value = self.get('value');
      if (value !== this.innerHTML) {
        self.set('value', Ember.$(this).text());
      }

      //self.setCaretPosition(caretPosition)
    });

    element.bind('blur paste copy cut keyup', {
      context: this
    }, this.modify);

    element.bind('keydown', {
      context: this
    }, this.actions.keyDown);


    element[0].innerHTML = this.get('value');
    this.modify();
  },



  actions: {
    keyDown(e) {
      const self = e.data.context;

      const selection = self.getSelection();
      const containsSelection = self.getSelection() !== undefined;

      if (!containsSelection) {
        return true;
      }

      const selectedNode = selection.baseNode;
      const previousSibling = selectedNode.previousSibling;

      let nextSibling = null;
      if (selectedNode.parentNode.tagName === "SPAN") {
        nextSibling = selectedNode.parentNode.nextSibling;
      } else {
        nextSibling = selectedNode.nextSibling;
      }

      // return in case there is no context within the editor
      if (selectedNode.nodeValue === null) {
        return true;
      }

      if (containsSelection) {
        // ignore left/right key click
        if (e.keyCode === 37) {
          const caretPosition = self.getCaretPositionFromElement();

          if (previousSibling && caretPosition == 1) {
            e.preventDefault();
            e.stopPropagation();

            const previousTextNode = previousSibling.childNodes[0];
            self.setCaretPositionOnElement(previousTextNode, previousTextNode.nodeValue.length - 1);
          }

          return;
        }

        if (e.keyCode == 39) {
          const caretPosition = self.getCaretPositionFromElement();

          // skip the zero space width character if the next sibling is a plain
          // text node
          if (nextSibling && nextSibling.tagName !== "SPAN" && caretPosition == selectedNode.nodeValue.length - 1) {
            e.preventDefault();
            e.stopPropagation();

            self.setCaretPositionOnElement(nextSibling, 1);
          }
        }

        // handle backspace key
        if (e.keyCode == 8) {
          const range = window.getSelection().getRangeAt(0);
          const contains = selectedNode.nodeValue.indexOf("\u200B") !== -1;

          // continue only if the caret position is at the beginning of the current node
          if (range.startOffset == 1 && contains) {
            // remove span element in case there is at least one variable defined
            // before the caret position
            if (previousSibling[0] !== undefined) {
              let previousTextNode = selectedNode.previousSibling.previousSibling;
              let previousContent = previousSibling.text();
              const newContent = previousContent.substring(0, previousContent.length - 1);

              if (previousTextNode !== null) {
                // add the variable span content to the text node
                previousTextNode.nodeValue += newContent;
              } else {
                // create a new text node in case there is no text node
                // defined before the variable span tag
                const t = document.createTextNode(newContent);
                self.getEditableElement()[0].appendChild(t);
              }

              // remove the broken variable span element
              previousSibling.remove();
            }
          }
        }
      }
    },
  }
});

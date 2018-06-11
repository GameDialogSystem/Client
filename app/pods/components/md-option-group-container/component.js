import Component from '@ember/component';

export default Component.extend({
    classNames: ['md-option-group-container'],

    currentExpandedGroup : null,

    actions: {
      change(e){
        if(this.currentExpandedGroup !== null && this.currentExpandedGroup !== e){

          this.currentExpandedGroup.set('isExpanded', false);
        }

        this.set("currentExpandedGroup", e);
      }
    }
});

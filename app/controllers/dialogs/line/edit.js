import Ember from 'ember';

export default Ember.Controller.extend({
tabs: [
  {
    label: "Dialog Line",
    value: "dialog_line",

    groups: [
      {
        label: "Formattings",

        buttons: [
          {
            icon: "format_bold",
            tooltip: "Bold"
          },

          {
            icon: "format_italic",
            tooltip: "Italic"
          },

          {
            icon: "format_underline",
            tooltip: "Underline"
          },

          {
            icon: "format_clear",
            tooltip: "Clear Formattings"
          }
        ]
      },

      {
        label: "Text Direction",

        buttons: [
          {
            icon: "format_textdirection_l_to_r",
            tooltip: "Left To Right"
          },

          {
            icon: "format_textdirection_r_to_l",
            tooltip: "Right To Left"
          }
        ]
      },

      {
        label: "Emotion",

        buttons: [
          {
            icon: "mood",
            tooltip: "Set Character Mood"
          }
        ]
      },

      {
        label: "Translations",

        buttons : [
          {
            icon: "translate",
            tooltip: "Translate Line"
          }
        ]
      }
    ]
  }
],

actions: {
  save() {
    this.transitionToRoute('dialogs.edit', 1);
  },

  cancel() {
    this.transitionToRoute('dialogs.edit', 1);
  }
}
});

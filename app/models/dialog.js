import DS from 'ember-data';


/**
 * @module
 * @augments EmberData/Model
 */
export default DS.Model.extend({
  /**
  * Defines the name of a dialog. This is needed to distingish between different
  * dialogs within the editor
  */
  name: DS.attr('string'),

  /**
   * Defines a description that helps distingishing multiple dialog files
   * in a project with many dialog files. This attribute is optionial although
   * it is highly recommended to use it.
   *
   */
   description: DS.attr('string'),

  /**
  * Each dialog needs to have a starting line as an entry point.
  * This entry point is defined explicitly by this relationship
  */
  startingLine: DS.belongsTo('dialog-line'),

  /**
  * All dialog lines are part of one dialog. This relationship is defined by this
  * property.
  */
  lines: DS.hasMany('dialog-line'),
});

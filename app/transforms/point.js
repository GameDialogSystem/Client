import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    let values = serialized.split(',');
    return {
      x: values[0],
      y: values[1]
    };
  },

  serialize(deserialized) {
    return deserialized.x+','+deserialized.y;
  }
});

import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    let values = serialized.split(',');
    return {
      width: values[0],
      height: values[1]
    };
  },

  serialize(deserialized) {
    return deserialized.width+','+deserialized.height;
  }
});

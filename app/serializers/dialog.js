import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  keyForAttribute(key) { return key; },
/*
  serialize(snapshot, options) {
    var json = {
       id: snapshot.id
     };

     snapshot.eachAttribute((key, attribute) => {
       json[key] = snapshot.attr(key);
     });

     snapshot.eachRelationship((key, relationship) => {
       if (relationship.kind === 'belongsTo') {
         json[key] = snapshot.belongsTo(key, { id: true });
       } else if (relationship.kind === 'hasMany') {
         json[key] = snapshot.hasMany(key, { ids: true });
         console.log(json[key]);
       }
     });

     return json;
  }
  */
});

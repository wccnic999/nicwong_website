const keystone = require('keystone');

const EnhancedList = require(`${global.__base}/models/lib/EnhancedList`);
const Types = keystone.Field.Types;

const categoryEnhancedList = new EnhancedList('Category', {});

categoryEnhancedList.add({
    name: { type: Types.Text, initial: true, required: true },
    slug: { type: Types.Text },
    status: { type: Types.Boolean, default: true },
    // game: { type: Types.Relationship, ref: 'Game', index: true },
    // server: { type: Types.Select, options: gender.options },
});

categoryEnhancedList.register();

module.exports = categoryEnhancedList;

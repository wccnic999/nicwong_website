const keystone = require('keystone');

const EnhancedList = require(`${global.__base}/models/lib/EnhancedList`);
const Types = keystone.Field.Types;

const workEnhancedList = new EnhancedList('Work', {
    track: true,
    defaultColumns:
        'name, thumbnail, link, order'
});

workEnhancedList.add({
    name: { type: Types.Text, initial: true, required: true },
    thumbnail: {
        type: Types.CloudinaryImage,
        autoCleanup: true,
        select: true,
        selectPrefix:
            keystone.get('cloudinary prefix') +
            '/' +
            workEnhancedList.keystoneList.path,
        note: 'recommended pixel: 1600 x 900'
    },
    link: {
        type: Types.Url,
    },
    Categories: { type: Types.Relationship, ref: 'Category', many: true, initial: true, required: true },
    order: {
        type: Types.Number
    },
    status: { type: Types.Boolean, default: true}
});

workEnhancedList.register();

module.exports = workEnhancedList;
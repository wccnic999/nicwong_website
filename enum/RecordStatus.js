const Enum = require('enum');

const Utility = require(global.__base + '/helper/Utility');

const RecordStatus = new Enum({
   	'Enabled': 1,
    'Disabled': 0
});

RecordStatus.options = Utility.enumToKeystonOptionStr(RecordStatus);

module.exports = RecordStatus;

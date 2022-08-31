
const mongoose = require("mongoose");
const schema = new mongoose.Schema({ address: 'string', token: 'Number' }, { timestamps: true });
const Mintinfo = mongoose.model('Mintinfo', schema)

module.exports = { Mintinfo }

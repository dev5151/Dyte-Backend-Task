const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WebhookSchema = new Schema({
    _id:{
      type:String,
      required:true
    },
    
    url: {
    type: String,
    required: true
   }
  });

const Webhook = mongoose.model('webhook', WebhookSchema);

module.exports = Webhook;
const Webhook = require('../../models/webhook.model');
const { nanoid } = require('nanoid')
const axios = require('axios');

//Actions defined here
module.exports = {
	name: "webhooks",
	actions: {
        async register(ctx) {
			var id = nanoid(10).toString();
        
            await Webhook.create({_id: id, url: ctx.params.url }, function(err,res){
                if(err){
                   console.log(err);
                }else{
                    console.log(res);
                }
           })
           return id;
		},

		async update(ctx) {
			var updated = "";
            await Webhook.updateOne({_id: ctx.params.id}, { $set:{ url:ctx.params.url }}, function(err,res){
                 if(err){
					console.log(err);
				 };
				updated = res.nModified;
            })
			var response = (updated>0)?"Data Updated.":response="Id not found.";

			return response;
		},

		async delete(ctx) {
			var deleted = "";
            await Webhook.deleteOne({_id: ctx.params.id}, function(err,res){
                 if(err){
					console.log(err);
				 };
				deleted = res.deletedCount;
            })
			var response = (deleted>0)?"Data Deleted.":response="Id not found.";

			return response;
		},

		async list() {
			var result = "";
            await Webhook.find({}, function(err,res){
                 if(err){
					console.log(err);
				 };
				 console.log(res);
				result = res;
            })

			return result;
		},

		async trigger(ctx) {
			var ipAddress = ctx.params.ip;
			var urls = [];
            await Webhook.find().then((webhooks)=>{
				webhooks.forEach(async(webhook) =>{
					urls.push(webhook.url);
				})
			})

            //Pinging all urls one by one with post request
			axios.all(urls.map((url)=>{
				axios.post(url,{
					ipAddress:ipAddress,
					timestamp:Math.floor(new Date().getTime() / 1000)
				}).then((response)=>{
					console.log(response.status);
				})
				.catch((error)=>{
						console.log(error.response.status);
					})
			}))

            //Dispplay the list of all the urls
			return urls;
		}
	}
};
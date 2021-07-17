"use strict";

const axios = require('axios');
const DbMixin = require("../mixins/db.mixin");
const { ServiceBroker } = require("moleculer");
const broker = new ServiceBroker({
    logger: console,
    transporter: null
});

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "webhooks",
    // version: 1

	/**
	 * Mixins
	 */
	mixins: [DbMixin("webhooks")],

	/**
	 * Settings
	 */
	settings: {
        fields:[
            "targetUrl"
        ]
	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {

		/**
		 * Say a 'Hello' action.
		 *
		 * @returns
		 */
		register: {
			rest: {
				method: "POST",
				path: "/register"
			},
            params:{
                targetUrl:"string",
             },
			async handler(ctx) {
				return "Added"+ctx.params.targetUrl;
			}
		},


		fetch: {
			rest: {
                method:"GET",
                path:"/list"
            },
			/** @param {Context} ctx  */
			async handler() {
				return this.fetchDB();
			}
		},
		

        update: {
			rest: {
                method:"PUT",
                path:"/webhook"
            },
			params: {
                _id:"string",
                targetUrl:"string",
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				return "Updated"+ctx.params.id+" "+ctx.params.targetUrl;
			}
		},

        delete: {
			rest: {
                method:"DELETE",
                path:"/delete"
            },
			params: {
				_id:"string"
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				return `Deleted, ${ctx.params._id}`;
			}
		},

		trigger:{
			rest:{
				method:"POST",
				path:"/ip"
			},
			params:{
				ipAddress:"string",
			},
			async handler(ctx){
				var ipAddress=ctx.params.ipAddress;
				urls=this.fetchDB();
				axios.all(urls.map((url)=>{
					axios.post(url,{
						ipAddress,
						timestamp:Math.floor(new Date().getTime() / 1000)
					}).then((response)=>{
						console.log(response.status);
					})
					.catch((error)=>{
							console.log(error.response.status);
						})
				}))

				return urls;
			}
		}
	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {
        async seedDB() {
			await this.adapter.insertMany([
				{targetUrl:"www.google.com"},
                {targetUrl:"www.gmail.com"},
                {targetUrl:"www.zed.com"}
			]);
		},

		async fetchDB(){
			var data = await this.broker.call("webhooks.list");
			return (data.rows);
		}
	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};

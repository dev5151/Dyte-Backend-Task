const url = require('url');
const services=require('../services/services')

const { ServiceBroker } = require("moleculer");
const broker = new ServiceBroker({
    logger: console,
    transporter: null
});

broker.loadService(__dirname + "/services.js");

// register a webhook 
exports.register = async (req, res, next) => {
    var domain = url.parse(req.url,true).query.dname;
        broker.start()
            .then(()=>{
                console.log(url);
                return broker.call("webhooks.register", {url: domain}).then(resp =>{ 
                    broker.logger.info(resp); 
                    res.send({message:"URL added", url_id:resp})
            });
            }).catch(err => {
                broker.logger.error(`Error in /register route - ${err.message}`);
            })
}

// update the webhook data
exports.update = async (req, res) => {
    var id = url.parse(req.url,true).query.id;
    var newTargetUrl = url.parse(req.url,true).query.url;

        broker.start()
            .then(()=>{
                return broker.call("webhooks.update", {url: newTargetUrl, id: id}).then(resp =>{ 
                    broker.logger.info(resp); 
                    res.send({message:resp})
            });
            }).catch(err => {
                broker.logger.error(`Error in /update route - ${err.message}`);
            })
}

// list all webhook data
exports.list = async (req, res) => {
        broker.start()
            .then(()=>{
                return broker.call("webhooks.list").then(resp =>{ 
                    broker.logger.info(resp); 
                    res.send({message:resp})
            });
            }).catch(err => {
                broker.logger.error(`Error in /list route - ${err.message}`);
            })
}

// delete webhook data
exports.delete = async (req, res) => {
    var id = url.parse(req.url,true).query.id;

    broker.start()
        .then(()=>{
            return broker.call("webhooks.delete", {id:id}).then(resp =>{ 
                broker.logger.info(resp); 
                res.send({message:resp})
        });
        }).catch(err => {
            broker.logger.error(`Error in /delete route - ${err.message}`);
        })
}

// trigger requests to all webhook url's
exports.trigger = async (req, res) => {
    var ip = url.parse(req.url,true).query.ip;

    broker.start()
        .then(()=>{
            return broker.call("webhooks.trigger", {ip:ip}).then(resp =>{ 
                broker.logger.info(resp); 
                res.send({message:"Requests sent to -> "+resp})
        });
        }).catch(err => {
            broker.logger.error(`Error in /trigger route - ${err.message}`);
        })
}

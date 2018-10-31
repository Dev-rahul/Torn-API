const  request = require('request');

var apiKey = 'tuPYURs1gjH55SHZ';
var data = [];
var catgry = 'torn';

var ApiCall = (stockId) => {
	return new Promise((resolve, reject) => {
        request({
            url: `https://api.torn.com/${catgry}/?selections=stocks&key=${apiKey}`,
            json: true
        
        },(error, response, body) => {
            if(error) {
                console.log(body.error);
            }
            else {
                data = body.stocks;
                var stockData = [];
                
                for( var key in data)
                {
                    stockId.forEach(function(element) {
                        if(element===data[key].acronym && data[key].available_shares>0)
                        {
                            stockData.push(data[key]);
    
                        }  
                      })
                }
                resolve(stockData);
            }
        })
		
	})
}

/* var  = (stockId) => {
	return new Promise((resolve, reject) => {
        request({
            url: `https://api.torn.com/${catgry}/?selections=stocks&key=${apiKey}`,
            json: true
        
        },(error, response, body) => {
            if(error) {
                console.log(body.error);
            } */


        
module.exports = {
    ApiCall,
    data
};

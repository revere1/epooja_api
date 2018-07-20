var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('./config/config.json')['system'];
var multer = require("multer");
//var OAuth2 = require("oauth").OAuth2;
var models = require('./models');
//var utils = require('./helpers/utils.js');

// Routes
module.exports = function (app) {

    app.get('/', (req, res) => {
        res.send('Revere Watch API is running at <a href="' + config.api_endpoint + '">' + config.api_endpoint + '</a>');
    });

    app.get('/fb',(req, res) => {
       
        var FB = require('fb');
        FB.setAccessToken('EAACEdEose0cBAJjLjbUmgEgD0BzDxHJltFyLseyBX1mPoRURXNZCvhcbfD88H65l2hLxwbKhEAiyNwUN8Nq3p813opeboTaMFHwY0Ww3Nv0jSstXB5em6xDQwU0gZBaNf9qNcnDBe1QTAqpAntQZCcZB7ZBljeifZB87tK6MmLnS5sNvaDwdeq5nHZASobw1TNSBbuGf1NmpQZDZD');
    
        var body = 'My first post using facebook-node-sdk';
        FB.api('me/feed', 'post', { message: body, link: 'http://ec2-35-178-115-252.eu-west-2.compute.amazonaws.com/insights/preview/23'}, function (res) {
        if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
        }
        });
        res.json({'hi':res.id});
    });
    accessToken = null;

    // function handshake(code, ores) {
    //     let  querystring = require('querystring');     
    //     //set all required post parameters
    //     var data = querystring.stringify({
    //         grant_type: "authorization_code",
    //         code: code,
    //         redirect_uri: config.domain+'linked-in',//should match as in Linkedin application setup
    //         client_id: '75mokwxxgpgynx',
    //         client_secret:'OOuPyGj2sWmJ3p6X'// the secret
    //     });
    
    //     var options = {
    //         host: 'www.linkedin.com',
    //         path: '/oauth/v2/accessToken',
    //         protocol: 'https:',
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //             'Content-Length': Buffer.byteLength(data)
    //         }
    //     };
    //     let  http = require('https');   
    //     var req = http.request(options, function (res) {
    //          var data = '';
    //         res.setEncoding('utf8');
    //         res.on('data', function (chunk) {
    //             data += chunk;
    
    //         });
    //         res.on('end', function () {
    //             //once the access token is received store in DB           
    //             let postData = JSON.parse(data);    
    //             if(postData.access_token){
    //                 models.settings.findOne({where:{social:'linkedin'}}).then(data=>{
    //                     let lindate= parseInt(postData.expires_in/(60*60*24));             
    //                     postData.expires_at=utils.addDate(lindate);
    //                 if(data){
    //                 data.updateAttributes(postData).then(settings => {
    //                     postData.access_token;
    //                     return ores.json(settings);
    //                 })
    //                 }else{
    //                     postData.social='linkedin';                 
    //                     models.settings.create(postData).then(settings => {
    //                         return ores.json(settings);
    //                     })
    //                 }
    //                 });
    //             }         
    //         });
    //         req.on('error', function (e) {
    //             return ores.json({'error':e.message});
    //         });
    
    //     });
    //     req.write(data);
    //     req.end();    
    
    // }


    app.get('/linked-in',(req, response) => {

     // return  response.json({'error':utils.addDate(60)});
        
        if(req.query.code){
            handshake(req.query.code, response);      
        }       
    })
    
    var apiRoutes = express.Router();
    apiRoutes.get('/', (req, res) => {
        res.send('Welcome to Revere API service');
    });    

    /******Testing*****/
     //apiRoutes.get('/search', UserController.test);
    /******END - Testing*****/
    app.use('/v1', apiRoutes);
};

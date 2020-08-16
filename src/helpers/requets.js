const request = require('request');

module.exports = {
    send_post_request: async  (url, data_post) => {
        return new Promise(function (resolve, reject) {
            request.post({
                headers: {
                    "Content-Type": "application/json",
                    "fcode": 2
                },
                'url': url,
                'body': JSON.stringify(data_post)
            }, function (error, response, body) {
                if (!error) {
                    resolve(body);
                } else {
                    console.log(error)
                    resolve(error);
                }
            });
        });
    },
    send_firebase_request : async (data_post, firebase_key) => {
        let dataSend = {
            to: data_post.to,
            "notification": {
                "title": data_post.title,
                "body": data_post.body,
                "sound": "default",
                "click_action": data_post.click_action
            },
            "data": {
                "title": data_post.title,
                "body": data_post.body,
                "sound": "default",
                "click_action": data_post.click_action,
            }
        };
        // console.log({dataSend})
        request.post({
            headers: {
                "Content-Type": "application/json",
                "Authorization": firebase_key
            },
            url: 'https://fcm.googleapis.com/fcm/send',
            body: JSON.stringify(dataSend)
        }, function (error, response, body) {
            if (!error) {
                console.log(body)
    
            } else {
                console.log(2)
            }
        });
        return true;
    
    },
    send_get_request: (url, data_post) => {
        return new Promise(function (resolve, reject) {
            request.get({
                headers: {
                    "Content-Type": "application/json"
                },
                url: url,// "http://vja.vemaybay.website/index.php/flights/Api_v1/searchs",
                body: JSON.stringify(data_post)
            }, function (error, response, body) {
                if (!error) {
                    resolve(body);
                } else {
                    resolve('{"status":false}');
                }
    
            });
        });
    }
}

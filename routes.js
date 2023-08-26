// const fs = require('fs');

// const requestHandler = (req, res) => {

//     console.log('The user is requesting to Server 3000');

//     res.setHeader('Content-Type', 'text/html');


//     const url = req.url;
//     const method = req.method;
//     if (url === '/') {
//         res.write('<html>');
//         res.write('<head><title>My First node server program</title></head>');
//         res.write('<body><form action = "/message" method = "POST" ><input type="text" name = "message"><button type="submit">Send</button></form></body >');
//         res.write('</html>');
//         return res.end();
//     }


//     if (url === '/message' && method === 'POST') {
//         const requestBody = [];
//         req.on('data', (chunkofData) => {
//             console.log(chunkofData);
//             requestBody.push(chunkofData);
//         });
//         return req.on('end', () => {
//             const parsedBody = Buffer.concat(requestBody).toString();
//             console.log(parsedBody);
//             const messageValue = parsedBody.split('=')[1];
//             fs.writeFile('message.txt', messageValue, (err) => {
//                 res.statusCode = 302;
//                 res.setHeader('Location', '/');
//                 // res.writeHead(302, { 'Location': '/' })
//                 return res.end();
//             });
//         })
//     }

//     res.write('<html>');
//     res.write('<head> <title> Hello Everyone </title> </head>');
//     res.write(' <body> Hello </body>');
//     res.write('</html>');
//     res.end();

//     //process.exit();

// }

// module.exports = requestHandler;  

/*

This whole file is commented bcoz this file was created before learning Express.js
but after learning express.js this file is not needed any long instead you created 
a different file using express.js 

*/

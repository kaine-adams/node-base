const shortid = require('shortid');
const Account = require('Data/Account');

var totalRunningCount = 100;

module.exports = function(io) {
    io.on('connection', function(socket) {
        socket.id = shortid.generate();
        socket.user_id = socket.request.user.id;
        
        console.log("Client connected [", socket.id, "]; User [", socket.user_id,"]");
        socket.emit('updateSum', {sum: totalRunningCount});

        socket.on('sum', function(data) {
            if(data.action=='increment') {
                totalRunningCount++
            }
            else if (data.action=='decrement'){
                totalRunningCount--
            }
            io.emit('updateSum', {sum: totalRunningCount});
        })

        socket.on('profile.changeName', function(data) {
            let username = data.username;
            if(username.length >= 4 && username.length <= 16)
            {
                Account.updateName(socket.user_id, username)
                    .then(()=>{
                        socket.emit('profile.changeName.result', {success: true});
                    })
                    .catch(()=>{
                        socket.emit('profile.changeName.result', {success: false, error: 'Unable to save to the database.'});
                    }) ;
            }
            else {
                socket.emit('profile.changeName.result', {success: false, error: "Must be between 4 and 16 characters."});
            }
        })

        socket.on('disconnect', function(){
            console.log("Client disconnected: ", socket.id);
        });
    });
}
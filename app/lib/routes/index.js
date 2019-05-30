
module.exports = function({app, io}) {
    require('./http')(app);
    require('./socket')(io);
}
var moment = require('moment');

module.exports = {
    fromNow: function(date) {
        return date ? moment(date).fromNow() : '';
    },
    dateFormat: function(date) {
        return date ? moment(date).format('dddd Do MMMM YYYY, h:mma') : '';
    },
    importanceValue: function(importance) {
        return { low: 1, medium: 2, high: 3, critical: 4 }[importance] || 0;
    }
}
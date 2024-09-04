const momentTimezone = require("moment-timezone")

// Get User Timezone from req 
const getTimeZone = (req) => req.headers['x-user-timezone'];

const getFullDateTime = (time, userTimeZone) => {
    return momentTimezone(time).tz(userTimeZone).format('YYYY-MM-DD HH:mm:ss')
}

const getMonthYear = (time, userTimeZone) => {
    return momentTimezone(time).tz(userTimeZone).format('MMM YYYY')
}

module.exports = {
    getTimeZone,
    getFullDateTime,
    getMonthYear
}
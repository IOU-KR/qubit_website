const deadline = new Date(process.env.APPLICATION_DEADLINE);
const result_date = new Date(process.env.RESULTS_DATE);

function isClosed() {
    return Date.now() > deadline.getTime();
}

function isResultPublished() {
    return Date.now() > result_date.getTime();
}


module.exports = { isClosed, isResultPublished, deadline, result_date };

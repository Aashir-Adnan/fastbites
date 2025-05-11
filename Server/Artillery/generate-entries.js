let counter = 7100;
function setUserVars (context, events, done) {
    context.vars.roll_no = counter++;
    return done();
}
function logResponse(requestParams, response, context, ee, next) {
  console.log(`\n[${requestParams.method}] ${requestParams.url}`);
  console.log(`Status: ${response.statusCode}`);
  console.log('Response:', response.body);
  return next(); // must call next to continue
}

function setDiningHallVars  (context, events, done) {
  context.vars.price = Math.floor(Math.random() * 400) + 100;
  context.vars.name = "Entry" + counter;
  return done();
}
module.exports = {
  setUserVars, logResponse, setDiningHallVars
};

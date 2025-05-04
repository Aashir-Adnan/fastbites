function getColumnNameFromMapper(mapper, column) {
    const mapperObject = parseMapperStringToObject(mapper);
    let returnValue= column;
    if(mapperObject)
     {returnValue= mapperObject[column] || returnValue;}
    return returnValue;
  }
  
  module.exports = getColumnNameFromMapper;
  
  function parseMapperStringToObject(mapperString) {
    try {
        // Replace single quotes with double quotes to make it JSON compatible
        const jsonCompatibleString = mapperString.replace(/'/g, '"');

        // Parse the JSON string into a JavaScript object
        const parsedObject = JSON.parse(jsonCompatibleString);

        return parsedObject;
    } catch (error) {
        console.error("Failed to parse mapper string:", error.message);
        return null;
    }
}
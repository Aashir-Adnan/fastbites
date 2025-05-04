function convertStringToNumber(obj) {
    
    const result = {};
  
    
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        
        result[key] = isNaN(obj[key]) ? obj[key] : parseFloat(obj[key]);
      }
    }
  
    return result;
  }
module.exports=convertStringToNumber
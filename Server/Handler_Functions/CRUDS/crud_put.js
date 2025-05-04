// const sendResponse = require('../../Constants/response');
// const getAttributes = require('../../Database/getAttributes');

// const crudPost = async (req, res) => {
//     try {
//         const attributes = getAttributes(req.body.table);
//         const columns = attributes.array.join(', ');
//         const values = req.body.entry.map(entry => {
//             return `(${attributes.array.map(col => {
//                 return `'${entry[col]}'`; 
//             }).join(', ')})`;
//         }).join(', '); 

//         let query = `INSERT INTO ${req.body.table} (${columns}) VALUES ${values}`;

//         const insertedRecord = await database.query(query);

//         sendResponse(res, '200', "Successfully Inserted", insertedRecord);
//     } catch (error) {
//         sendResponse(res, 500, "An Error Occurred In The CRUD Post Handler Function", error.message);
//     }
// };

// module.exports = crudPost;

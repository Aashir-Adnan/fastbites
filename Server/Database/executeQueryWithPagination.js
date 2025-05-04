const getColumnNameFromMapper = require("../Constants/getColumnNameFromMapper");
const { executeQuery } = require("./queryExecution");
const projectDB = require("./projectDb");


async function executeQueryWithPagination(req,  query, values, connection, page, limit,mapper=null) {
    const { 
        page_size, page_no = 1, sort_by, sort_order, 
        filter_columns_and = "[]", filter_values_and = "[]", 
        filter_columns_or = "[]", filter_values_or = "[]",
        filter_conditions_and = "[]", filter_conditions_or = "[]"
    } = req.query;
    
    const pageSize = parseInt(page_size, 10) || 'All';
    const pageNo = parseInt(page_no, 10) || 1;

    if (pageSize <= 0 && pageSize !== 'All') {
        throw new Error("Invalid Page Size Provided");
        //LogError( 400, "executeQueryWithPagination", "Invalid Page Size Provided", "E39");
        return;
    }

    if (pageNo <= 0) {
        throw new Error("Invalid Page No Provided");
        //LogError( 400, "executeQueryWithPagination", "Invalid Page No Provided", "E39");
        return;
    }

    const offset = (pageNo - 1) * pageSize;

    const parseJsonArray = (jsonStr, defaultValue) => {
        try {
            return JSON.parse(jsonStr);
        } catch (err) {
            return defaultValue;
        }
    };

    // const parsedFilterColumnsAnd = parseJsonArray(filter_columns_and, []);
    // const parsedFilterValuesAnd = parseJsonArray(filter_values_and, []);
    // const parsedFilterColumnsOr = parseJsonArray(filter_columns_or, []);
    // const parsedFilterValuesOr = parseJsonArray(filter_values_or, []);
    // const parsedFilterConditionsOr = parseJsonArray(filter_conditions_or, []);
    // const parsedFilterConditionsAnd = parseJsonArray(filter_conditions_and, []);

    const parsedFilterColumnsAnd = parseJsonArray(filter_columns_and, []);
    const parsedFilterValuesAnd = parseJsonArray(decodeURIComponent(filter_values_and), []);
    const parsedFilterColumnsOr = parseJsonArray(filter_columns_or, []);
    const parsedFilterValuesOr = parseJsonArray(decodeURIComponent(filter_values_or), []);
    const parsedFilterConditionsOr = parseJsonArray(filter_conditions_or, []);
    const parsedFilterConditionsAnd = parseJsonArray(filter_conditions_and, []);

    console.log("EXEC WITH PAGINATION PARSED FILTER CONDITIONS AND/OR", [parsedFilterConditionsAnd, parsedFilterConditionsOr]);
    let filterConditionsAnd = "";
    let filterParamsAnd = [];
    console.log(" FILTER VALUES AND: ", filter_values_and)
    console.log("PARSED FILTER VALUES AND: ", parsedFilterValuesAnd)
    
    if (parsedFilterColumnsAnd.length> 0) {
        parsedFilterColumnsAnd.forEach((column, index) => {
            filterConditionsAnd += ` AND ${getColumnNameFromMapper(mapper,column)} ${parsedFilterConditionsAnd[index]||"LIKE"} ?`;
            filterParamsAnd.push(parsedFilterConditionsAnd[index]? parsedFilterValuesAnd[index] : `%${parsedFilterValuesAnd[index]}%`);
        });
    }

    let filterConditionsOr = "";
    let filterParamsOr = [];

    if (parsedFilterColumnsOr.includes('all')) {
        const tableAliasMap = extractTableAliases(query);
        console.log("TABLE ALIAS MAP ", tableAliasMap)
        const { orConditions, params } = await constructOrConditions(connection, tableAliasMap, parsedFilterValuesOr[0]);
        filterConditionsOr = orConditions;
        console.log("filter conditions or with all:: ", filterConditionsOr)
        filterParamsOr = params;
    } else if (parsedFilterColumnsOr.length > 0) {
        parsedFilterColumnsOr.forEach((column, index) => {
            filterConditionsOr += ` OR ${column} ${parsedFilterConditionsOr[index]||"LIKE"} ?`;
            filterParamsOr.push(`${parsedFilterConditionsOr[index]  ? `${parsedFilterValuesOr[index]}` : `%${parsedFilterValuesOr[index]}%`}`);
        });
    }

    const sortingClause = sort_by ? ` ORDER BY ${getColumnNameFromMapper(mapper,sort_by)} ${sort_order.toUpperCase() === "DESC" ? "DESC" : "ASC"}` : "";

    const hasWhereClause = query?.toLowerCase()?.includes("where");
    let conditionalQuery = query;

    if (!hasWhereClause) {
        if (filterConditionsOr) {
            conditionalQuery += " WHERE " + filterConditionsOr.slice(4); // Remove leading " OR"
        } else if (filterConditionsAnd) {
            conditionalQuery += " WHERE " + filterConditionsAnd.slice(5); // Remove leading " AND"
        }
    } else {
        if (filterConditionsOr){
            conditionalQuery += "AND (" + filterConditionsOr.slice(4) + ")"
        }
        if (filterConditionsAnd){
            conditionalQuery += "AND (" + filterConditionsAnd.slice(5) + ")"
        }
    }

    const finalQuery = pageSize !== 'All'
        ? `${conditionalQuery} ${sortingClause} LIMIT ?, ?`
        : `${conditionalQuery} ${sortingClause}`;
    const finalValues = pageSize !== 'All'
        ? [...values, ...filterParamsOr, ...filterParamsAnd, offset, pageSize]
        : [...values, ...filterParamsOr, ...filterParamsAnd];
    console.log("Executing Query With Pagination: ", finalQuery, finalValues);
    // logMessage(["Executing Query With Pagination: ", finalQuery, finalValues]);
    const results = await executeQuery(finalQuery, finalValues, connection, false);
    return results;

}


// Utility Functions
function extractTableAliases(query) {
    const tableAliasMap = {};
    const tableRegex = /\b(?:FROM|JOIN)\s+([^\s]+)(?:\s+AS\s+([^\s]+)|\s+([^\s]+))?/gi;
    let match;

    while ((match = tableRegex.exec(query)) !== null) {
        console.log("MATCH: ", match    )
        const tableName = match[1];
        const alias = (match[2] == "JOIN" || match[2] == "LEFT") ? tableName : match[2] || tableName;
        tableAliasMap[tableName] = alias?.toLowerCase() !== 'where' ? alias : tableName;
    }
    return tableAliasMap;
}

function generateAlias(tableName) {
    return tableName
        .split('_')
        .map(word => word[0]?.toLowerCase())
        .join('');
}

async function constructOrConditions(connection, tableAliasMap, filterValue) {
    let orConditions = '';
    let params = [];
    const columnMap = {};

    for (const [table, alias] of Object.entries(tableAliasMap)) {
        connection = projectDB()
        const columnQuery = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?`;
        const columns = await executeQuery(columnQuery, [connection.config.database, table], connection);
        columnMap[table] = columns.map(({ COLUMN_NAME }) => COLUMN_NAME);
        console.log("COLUMNS FROM ", table, columnMap)

        columnMap[table].forEach(column => {
            orConditions += ` OR ${alias}.${column} LIKE ?`;
            params.push(`%${filterValue}%`);
        });
    }

    return { orConditions, params };
}


module.exports = executeQueryWithPagination;

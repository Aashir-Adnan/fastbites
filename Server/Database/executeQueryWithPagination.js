const logMessage = require("../Log_Functions/consoleLog");
const LogError = require("./Errorlog");
const projectDB = require("./projectDb");
const { executeQuery } = require("./queryExecution");

async function executeQueryWithPagination(req, res, query, values, connection) {
    try {
        const { 
            page_size, page_no = 1, sort_by, sort_order, 
            filter_columns_and = "[]", filter_values_and = "[]", 
            filter_columns_or = "[]", filter_values_or = "[]" 
        } = req.query;

        const pageSize = parseInt(page_size, 10) || 'All';
        const pageNo = parseInt(page_no, 10) || 1;

        if (pageSize <= 0 && pageSize !== 'All') {
            LogError(req, res, 400, "executeQueryWithPagination", "Invalid Page Size Provided", "E39");
            return;
        }

        if (pageNo <= 0) {
            LogError(req, res, 400, "executeQueryWithPagination", "Invalid Page No Provided", "E39");
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

        const parsedFilterColumnsAnd = parseJsonArray(filter_columns_and, []);
        const parsedFilterValuesAnd = parseJsonArray(filter_values_and, []);
        const parsedFilterColumnsOr = parseJsonArray(filter_columns_or, []);
        const parsedFilterValuesOr = parseJsonArray(filter_values_or, []);

        let filterConditionsAnd = "";
        let filterParamsAnd = [];
        if (parsedFilterColumnsAnd.length === parsedFilterValuesAnd.length) {
            parsedFilterColumnsAnd.forEach((column, index) => {
                filterConditionsAnd += ` AND ${column} LIKE ?`;
                filterParamsAnd.push(`%${parsedFilterValuesAnd[index]}%`);
            });
        }

        let filterConditionsOr = "";
        let filterParamsOr = [];

        if (parsedFilterColumnsOr.includes('all')) {
            const tableAliasMap = extractTableAliases(query);
            const { orConditions, params } = await constructOrConditions(connection, tableAliasMap, parsedFilterValuesOr[0], res);
            filterConditionsOr = orConditions;
            filterParamsOr = params;
        } else if (parsedFilterColumnsOr.length === parsedFilterValuesOr.length) {
            parsedFilterColumnsOr.forEach((column, index) => {
                filterConditionsOr += ` OR ${column} LIKE ?`;
                filterParamsOr.push(`%${parsedFilterValuesOr[index]}%`);
            });
        }

        const sortingClause = sort_by ? ` ORDER BY ${sort_by} ${sort_order.toUpperCase() === "DESC" ? "DESC" : "ASC"}` : "";

        const hasWhereClause = query.toLowerCase().includes("where");
        let conditionalQuery = query;

        if (!hasWhereClause) {
            if (filterConditionsOr) {
                conditionalQuery += " WHERE" + filterConditionsOr.slice(4); 
            } else if (filterConditionsAnd) {
                conditionalQuery += " WHERE" + filterConditionsAnd.slice(5); 
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

        logMessage(["Executing Query With Pagination: ", finalQuery, finalValues]);
        connection = projectDB();
        const results = await executeQuery(res, finalQuery, finalValues, connection, false);
        return results;
    } catch (err) {
        LogError(req, res, 500, "executeQueryWithPagination", err.message, "E39");
        throw new Error(err.message);
    }
}



function extractTableAliases(query) {
    const tableAliasMap = {};
    const tableRegex = /\b(?:FROM|JOIN)\s+([^\s]+)(?:\s+AS\s+([^\s]+)|\s+([^\s]+))?/gi;
    let match;

    while ((match = tableRegex.exec(query)) !== null) {
        const tableName = match[1];
        const alias = match[2] || match[3] || generateAlias(tableName);
        tableAliasMap[tableName] = alias;
    }

    return tableAliasMap;
}

function generateAlias(tableName) {
    return tableName
        .split('_')
        .map(word => word[0].toLowerCase())
        .join('');
}

async function constructOrConditions(connection, tableAliasMap, filterValue, res) {
    let orConditions = '';
    let params = [];
    const columnMap = {};

    for (const [table, alias] of Object.entries(tableAliasMap)) {
        connection = projectDB()
        const columnQuery = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'projectdb_new' AND TABLE_NAME = ?`;
        const columns = await executeQuery(res, columnQuery, [table], connection);

        columnMap[table] = columns.map(({ COLUMN_NAME }) => COLUMN_NAME);

        columnMap[table].forEach(column => {
            orConditions += ` OR ${alias}.${column} LIKE ?`;
            params.push(`%${filterValue}%`);
        });
    }

    return { orConditions, params };
}


module.exports = executeQueryWithPagination;

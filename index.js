const skygearCloud = require("skygear/cloud");

/*
  Docs:
    https://docs.skygear.io/js/reference/latest/variable/index.html#static-variable-pool
    https://node-postgres.com/features/pooling#single-query
*/
skygearCloud.op("query_polling_results", () =>
  skygearCloud.pool
    .query(
      `SELECT dish, COUNT(*) FROM app_${
        skygearCloud.settings.appName
      }.vote GROUP BY dish ORDER BY dish`
    )
    .then(res => {
      return {
        results: res.rows
      };
    })
    .catch(err => {
      console.error(err.stack);
      return null;
    })
);

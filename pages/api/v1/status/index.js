import database from "infra/database.js"

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const { used } = await database.query(`
  select
    max_conn,
    used,
    res_for_super,
    max_conn-used-res_for_super res_for_normal 
  from 
    (select count(*) used from pg_stat_activity) t1,
    (
      select
        setting::int res_for_super 
      from 
        pg_settings 
      where 
        name=$$superuser_reserved_connections$$
    ) t2,
    (select setting::int max_conn from pg_settings where name=$$max_connections$$) t3
  `).then(result => result.rows[0])

  const databaseVersionResult = await database.query('SHOW server_version;');
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsResult = await database.query('SHOW max_connections;');
  const databaseMaxConnectionsValue = databaseMaxConnectionsResult.rows[0].max_connections;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: used
      }
    }
  })
}

export default status;
import database from "infra/database.js"

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const { max_conn, used } = await database.query(`
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

  const databaseVersion = await database.query('SHOW server_version')
    .then(result => result.rows[0].server_version)

  response.status(200).json({
    updated_at: updatedAt,
    version: databaseVersion,
    max_connections: max_conn,
    opened_connections: used
  })
}

export default status;
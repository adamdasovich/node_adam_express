// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/lessons.db3'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
    
  },
  production: {
    client: 'pg',
    connection: 'postgres://dfhhtommiamqjm:69f56c67f8f36fd164936712cc544991aca60c7607c024629460f26b3dabfd32@ec2-54-235-108-217.compute-1.amazonaws.com:5432/d2gjc58ugrdbek'
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tablename: 'knex_migrations',
      directory: './migrations',
    }, 
  },
};

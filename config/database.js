module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DATABASE_HOST', 'dpg-chf6ffm4dad1jqb5ddhg-a.oregon-postgres.render.com'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'narrowfoxy'),
        username: env('DATABASE_USERNAME', 'narrowfoxy'),
        password: env('DATABASE_PASSWORD', 'm4q0iyjxUguPMJxCJ7gLbG8RI6T2XaWS'),
        ssl: env.bool('DATABASE_SSL', true),
      },
      options: {}
    },
  },
});

const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres.zmjjdidghudjorhdaods:Ajackman1245123@aws-1-us-east-2.pooler.supabase.com:5432/postgres'
});

client.connect()
  .then(() => {
    console.log('Connected successfully!');
    return client.end();
  })
  .catch(err => {
    console.error('Connection failed:', err.message);
  });

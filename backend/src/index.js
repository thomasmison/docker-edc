const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const { Pool } = require('pg')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const port = 3000

// Enable CORS for all origins
app.use(cors({ origin: '*' }))

// Add request logging
app.use(morgan('combined'))

// Créer un pool de connexions PostgreSQL
const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,  
})

// Middleware pour vérifier la version de PostgreSQL
app.use(async (req, res, next) => {
  try {
    const client = await pool.connect()
    try {
      const result = await client.query('SHOW server_version;')
      const version = result.rows[0].server_version
      // Vérifier si la version commence par '14.'
      if (!version.startsWith('14.')) {
        throw new Error(`PostgreSQL version 14 required, found: ${version}`)
      }
      next()
    } finally {
      client.release()
    }
  } catch (err) {
    console.error('Database error:', err)
    res.status(500).send('Database error: ' + err.message)
  }
})

// Initialiser la table si elle n'existe pas
async function initializeDatabase() {
  const client = await pool.connect()
  try {
    
    // Vérifier si une ligne avec id=1 existe, la créer si non
    const result = await client.query('SELECT * FROM count WHERE id = 1')
    if (result.rowCount === 0) {
      await client.query('INSERT INTO count (id, count) VALUES (1, 0)')
    }
  } catch (err) {
    console.error('Failed to initialize database:', err)
    throw err
  } finally {
    client.release()
  }
}


// Endpoint GET pour retourner le compteur actuel
app.get('/api/counter', async (req, res) => {
  try {
    const client = await pool.connect()
    try {
      const result = await client.query('SELECT count FROM count WHERE id = 1')
      res.json({ count: result.rows[0].count })
    } finally {
      client.release()
    }
  } catch (err) {
    console.error('Error fetching count:', err)
    res.status(500).send('Database error: ' + err.message)
  }
})

// Endpoint PUT pour incrémenter le compteur
app.put('/api/counter', async (req, res) => {
  try {
    const client = await pool.connect()
    try {
      const result = await client.query(
        'UPDATE count SET count = count + 1 WHERE id = 1 RETURNING count'
      )
      res.json({ count: result.rows[0].count })
    } finally {
      client.release()
    }
  } catch (err) {
    console.error('Error incrementing count:', err)
    res.status(500).send('Database error: ' + err.message)
  }
})

app.listen(port, async () => {
  console.log('Waiting 10 seconds to mock a long startup time...')
  await new Promise(resolve => setTimeout(resolve, 10000))
  await initializeDatabase()
  console.log(`Example app listening on port ${port}`)
})
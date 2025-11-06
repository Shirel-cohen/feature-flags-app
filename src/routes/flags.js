const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/flags
router.post('/', (req, res) => {
  const { feature, userId, enabled } = req.body;

  // Basic validation
  if (typeof feature !== 'string' || typeof enabled !== 'boolean') {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const intEnabled = enabled ? 1 : 0;

  if (userId) {
    // User-specific flag
    db.run(
      `
      INSERT INTO user_flags (feature, userId, enabled)
      VALUES (?, ?, ?)
      ON CONFLICT(feature, userId) DO UPDATE SET enabled=excluded.enabled
      `,
      [feature, userId, intEnabled],
      function (err) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Flag saved successfully' });
      }
    );
  } else {
    // Global flag
    db.run(
      `
      INSERT INTO global_flags (feature, enabled)
      VALUES (?, ?)
      ON CONFLICT(feature) DO UPDATE SET enabled=excluded.enabled
      `,
      [feature, intEnabled],
      function (err) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Flag saved successfully' });
      }
    );
  }
});

// GET /api/flags
router.get('/', (req, res) => {
  const { feature, userId } = req.query;

  if (!feature) return res.status(400).json({ error: 'Missing feature' });

  const sendResult = (enabled, reason) => res.json({ enabled, reason });

  if (userId) {
    // Check user-specific flag first
    db.get(
      `SELECT enabled FROM user_flags WHERE feature=? AND userId=?`,
      [feature, userId],
      (err, row) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Database error' });
        }

        if (row) return sendResult(!!row.enabled, 'user');

        // If no user flag, check global
        db.get(
          `SELECT enabled FROM global_flags WHERE feature=?`,
          [feature],
          (err2, row2) => {
            if (err2) {
              console.error(err2);
              return res.status(500).json({ error: 'Database error' });
            }

            if (row2) return sendResult(!!row2.enabled, 'global');

            // Default fallback
            return sendResult(false, 'default');
          }
        );
      }
    );
  } else {
    // No userId, check global only
    db.get(
      `SELECT enabled FROM global_flags WHERE feature=?`,
      [feature],
      (err, row) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Database error' });
        }

        if (row) return sendResult(!!row.enabled, 'global');

        // Default fallback
        return sendResult(false, 'default');
      }
    );
  }
});

module.exports = router;

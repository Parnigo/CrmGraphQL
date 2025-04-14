import db from '../db/db.js';

const resolvers = {
  users: (_, { username, limit, offset }) => {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM users';
      const params = [];

      if (username) {
        query += ' WHERE username = ?';
        params.push(username);
      }

      if (limit != null) {
        query += ' LIMIT ?';
        params.push(Number(limit));
      }

      if (offset != null) {
        query += ' OFFSET ?';
        params.push(Number(offset));
      }

      db.query(query, params, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  getContacts: (_, { contId, firstName, lastName, limit, offset }) => {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM contacts';
      const conditions = [];
      const params = [];

      if (contId) {
        conditions.push('contId = ?');
        params.push(contId);
      } else {
        if (firstName) {
          conditions.push('firstName LIKE ?');
          params.push(`%${firstName}%`);
        }
        if (lastName) {
          conditions.push('lastName LIKE ?');
          params.push(`%${lastName}%`);
        }
      }

      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }

      if (limit != null) {
        query += ' LIMIT ?';
        params.push(Number(limit));
      }

      if (offset != null) {
        query += ' OFFSET ?';
        params.push(Number(offset));
      }

      db.query(query, params, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  getContactsWithNotes: (_, { contId, firstName, lastName, limit, offset }) => {
    return new Promise((resolve, reject) => {
      let contactQuery = 'SELECT * FROM contacts';
      const conditions = [];
      const params = [];

      if (contId) {
        conditions.push('contId = ?');
        params.push(contId);
      } else {
        if (firstName) {
          conditions.push('firstName LIKE ?');
          params.push(`%${firstName}%`);
        }
        if (lastName) {
          conditions.push('lastName LIKE ?');
          params.push(`%${lastName}%`);
        }
      }

      if (conditions.length > 0) {
        contactQuery += ' WHERE ' + conditions.join(' AND ');
      }

      if (limit != null) {
        contactQuery += ' LIMIT ?';
        params.push(Number(limit));
      }

      if (offset != null) {
        contactQuery += ' OFFSET ?';
        params.push(Number(offset));
      }

      db.query(contactQuery, params, (err, contacts) => {
        if (err) return reject(err);
        if (contacts.length === 0) return resolve([]);

        const contIds = contacts.map(c => c.contId);
        const placeholders = contIds.map(() => '?').join(',');

        db.query(`SELECT * FROM notes WHERE contId IN (${placeholders})`, contIds, (err, notes) => {
          if (err) return reject(err);

          const groupedNotes = {};
          notes.forEach(note => {
            if (!groupedNotes[note.contId]) groupedNotes[note.contId] = [];
            groupedNotes[note.contId].push(note);
          });

          const results = contacts.map(contact => ({
            ...contact,
            notes: groupedNotes[contact.contId] || []
          }));

          resolve(results);
        });
      });
    });
  }
};

export default resolvers;

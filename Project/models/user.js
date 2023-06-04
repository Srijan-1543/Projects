const { getDb } = require('../models/database');

class User {
  static collectionName = 'users';

  constructor(name, email, contact, password, role = 'user') {
    this.name = name;
    this.email = email;
    this.contact = contact;
    this.password = password;
    this.role = role;
  }

  static async save(user) {
    const db = getDb();
    const collection = db.collection(User.collectionName);
    await collection.insertOne(user);
  }

  static async findByEmail(email) {
    const db = getDb();
    const collection = db.collection(User.collectionName);
    return collection.findOne({ email: email });
  }

  static async isEmailUnique(email) {
    const db = getDb();
    const collection = db.collection(User.collectionName);
    const existingUser = await collection.findOne({ email: email });
    return !existingUser;
  }

  static async getRole(email) {
    const db = getDb();
    const collection = db.collection(User.collectionName);
    const user = await collection.findOne({ email: email });
    return user ? user.role : null;
  }
}

module.exports = User;

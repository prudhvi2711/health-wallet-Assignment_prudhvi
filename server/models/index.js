const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// 1. User Model
const User = sequelize.define('User', {
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING }
});

// 2. Report Model
const Report = sequelize.define('Report', {
  fileName: { type: DataTypes.STRING, allowNull: false },
  filePath: { type: DataTypes.STRING, allowNull: false },
  reportType: { type: DataTypes.STRING }, 
  date: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW }
});

// 3. Vital Model
const Vital = sequelize.define('Vital', {
  type: { type: DataTypes.STRING }, 
  value: { type: DataTypes.FLOAT },
  unit: { type: DataTypes.STRING }
});

// A User owns many Reports
User.hasMany(Report, { onDelete: 'CASCADE' });
Report.belongsTo(User);

// A Report can contain many Vitals
Report.hasMany(Vital, { onDelete: 'CASCADE' });
Vital.belongsTo(Report);

// A User owns many Vitals (for easy retrieval)
User.hasMany(Vital);
Vital.belongsTo(User);

module.exports = { sequelize, User, Report, Vital };
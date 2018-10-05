const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL, { logging: false });

const School = db.define('school', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

const Student = db.define('student', {
  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  gpa: {
    type: Sequelize.DECIMAL(3, 2),
    allowNull: true,
    validate: {
      isDecimal: true,
      min: 0,
      max: 4,
    },
  },
});

School.hasMany(Student);
Student.belongsTo(School);

const syncAndSeed = () => {
  return db.sync({ force: true }).then(() =>
    Promise.all([
      School.create({
        name: 'Lincoln College',
        address: '1 Ocean Parkway, Brooklyn, NY 11235',
        description: 'Railsplitters',
      }),
      School.create({
        name: 'Midwood College',
        address: '2 Bedford Ave, Brooklyn, NY 11236',
        description: 'Hornets',
      }),
      School.create({
        name: 'Murrow University',
        address: '3 Avenue M, Brooklyn, NY 11237',
        description: 'Magic',
      }),
      Student.create({
        firstname: 'Sanjai',
        lastname: 'Syamaprasad',
        gpa: 4,
      }),
      Student.create({
        firstname: 'Sindhu',
        lastname: 'Syamaprasad',
        gpa: 3.444,
      }),
      Student.create({ firstname: 'Mike', lastname: 'Tse', gpa: 4.0 }),
      Student.create({
        firstname: 'Ingrid',
        lastname: 'Labossierre',
        gpa: 3.5,
      }),
      Student.create({ firstname: 'Benzy', lastname: 'Bennykutty', gpa: 3.5 }),
      Student.create({ firstname: 'Finlay', lastname: 'Thomas', gpa: 3.7 }),
      Student.create({ firstname: 'Steven', lastname: 'John', gpa: 3.3 }),
      Student.create({ firstname: 'Tien', lastname: 'Hu' }),
    ]).then(
      ([
        lincoln,
        midwood,
        murrow,
        sanjai,
        sindhu,
        mike,
        ingrid,
        benzy,
        finlay,
        steven,
      ]) =>
        Promise.all([
          sanjai.setSchool(midwood),
          mike.setSchool(midwood),
          benzy.setSchool(lincoln),
          finlay.setSchool(lincoln),
          steven.setSchool(lincoln),
          ingrid.setSchool(murrow),
          sindhu.setSchool(murrow),
        ])
    )
  );
};

module.exports = {
  syncAndSeed,
  models: {
    School,
    Student,
  },
};

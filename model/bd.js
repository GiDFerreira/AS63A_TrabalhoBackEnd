const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

const PersonagemModel = sequelize.define('Personagem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  idade: {
    type: DataTypes.INTEGER,
    allowNull: false, 
  },
  raca: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  classe: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nivel: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  habilidadeEspecial: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


sequelize.sync({ force: true })
  .then(() => {
    console.log('Modelo de Personagem sincronizado com o banco de dados.');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o modelo com o banco de dados:', err);
  });


  module.exports = {
    sequelize: sequelize,
    PersonagemModel: PersonagemModel,
  };

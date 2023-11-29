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

const MestreModel = sequelize.define('Mestre', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  nomeJogo: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
});

const JogadorModel = sequelize.define('Jogador', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  experiencia: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

const AnimalModel = sequelize.define('Animal', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  vida: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
})

sequelize.sync({ force: true })
  .then(() => {
    console.log('Modelos sincronizados com o banco de dados.');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar os modelos com o banco de dados:', err);
  });

  PersonagemModel.belongsTo(JogadorModel)
  MestreModel.hasMany(PersonagemModel)
  AnimalModel.belongsTo(PersonagemModel)

  module.exports = {
    sequelize: sequelize,
    PersonagemModel: PersonagemModel,
    MestreModel: MestreModel,
    JogadorModel: JogadorModel,
    AnimalModel: AnimalModel,
  };

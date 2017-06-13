module.exports = (sequelize, DataTypes) {
  const Store = sequelize.define('Store', {
    shopify_domain: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: DataTypes.STRING,
    domain: DataTypes.STRING,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    supportEmail: DataTypes.STRING,
    nonce: DataTypes.STRING,
    accessToken: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return Store;
};

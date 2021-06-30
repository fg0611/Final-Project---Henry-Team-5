const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "order_lines",
    {
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
    },
    { timestamps: false }
  );
};

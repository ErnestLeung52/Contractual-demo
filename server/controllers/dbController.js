const db = require('../models/dbModels');

const dbController = {};

// Add user
dbController.addUser = async (req, res, next) => {
  const { fullname, age } = req.body;
  try {
    const addUserQuery = `
    INSERT INTO users (name, age)
    VALUES($1, $2)
    RETURNING *
    `;
    await db.query(addUserQuery, [fullname, age]);
  } catch (error) {
    return next({
      // log: 'Express error in addUser middleware when adding to users',
      // status: 400,
      // message: {
      //   err: `dbController.addUser: ERROR: ${error}`,
      // },
      status: 400,
      success: false,
    });
  }

  try {
    const addUserBalanceQuery = `
        INSERT INTO user_balance (name, balance)
          VALUES($1, 0)
          RETURNING *
        `;
    await db.query(addUserBalanceQuery, [fullname]);
    return next();
  } catch (error) {
    return next({
      log: 'Express error in addUser middleware when adding to user_balance',
      status: 400,
      message: {
        err: `dbController.addUser: ERROR: ${error}`,
      },
    });
  }
};

// Add Balance
dbController.changeBalance = async (req, res, next) => {
  const { fullname, change } = req.body;
  try {
    const addHistoryQuery = `
        INSERT INTO history (name, change)
          VALUES($1, $2)
          RETURNING *
        `;
    await db.query(addHistoryQuery, [fullname, change]);
  } catch (error) {
    return next({
      status: 400,
      success: false,
    });
  }

  try {
    const changeBalanceQuery = `
        UPDATE user_balance
          SET balance = balance + $2
          WHERE name = $1
          RETURNING user_balance.balance
        `;
    const result = await db.query(changeBalanceQuery, [fullname, change]);
    res.locals.balance = result.rows[0].balance;
    return next();
  } catch (error) {
    return next({
      status: 400,
      success: false,
    });
  }
};

// Get History
dbController.getHistory = async (req, res, next) => {
  console.log(req.body);
  const { fullname } = req.body;
  try {
    const getHistoryQuery = `
        SELECT change FROM history 
        WHERE name = $1
        `;
    const result = await db.query(getHistoryQuery, [fullname]);
    res.locals.history = [];
    for (let record of result.rows) {
      res.locals.history.push(record.change);
    }
    return next();
  } catch (error) {
    console.log(error);
    return next({
      status: 400,
      success: false,
    });
  }
};
module.exports = dbController;

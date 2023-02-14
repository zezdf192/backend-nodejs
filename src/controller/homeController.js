import db from '../models/index';

export const getHomePage = async (req, res) => {
    const data = await db.User.findAll({ raw: true });
    console.log('>>> check data ');
    console.log(data);
    return res.render('index.ejs');
};

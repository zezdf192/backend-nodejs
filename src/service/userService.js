import bcrypt from 'bcryptjs';
import db from '../models/index';

export const handleLoginUser = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataUser = {};
            const check = await checkEmailuser(email);
            if (check) {
                const user = await db.User.findOne({
                    attributes: ['email', 'password', 'roleId'],
                    raw: true,
                    where: {
                        email: email,
                    },
                });
                const checkPassword = bcrypt.compareSync(password, user.password);
                if (checkPassword) {
                    dataUser.errCode = 0;
                    dataUser.message = 'Ok';
                    delete user.password;
                    dataUser.user = user;
                } else {
                    dataUser.errCode = 3;
                    dataUser.message = 'Password mismatch';
                }
            } else {
                dataUser.errCode = 2;
                dataUser.message = 'Email not found';
            }
            resolve(dataUser);
        } catch (error) {
            reject(error);
        }
    });
};

const checkEmailuser = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: {
                    email: email,
                },
            });

            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
};

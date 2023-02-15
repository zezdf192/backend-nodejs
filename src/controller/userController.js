import { handleLoginUser } from '../service/userService';

export const handleLogin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameters',
        });
    }

    const dataUser = await handleLoginUser(email, password);

    return res.status(200).json({
        errCode: dataUser.errCode,
        message: dataUser.message,
        user: dataUser.user,
    });
};

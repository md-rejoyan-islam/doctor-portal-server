import bcrypt from 'bcryptjs';

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    return passwordHash;
    }

export default hashPassword;
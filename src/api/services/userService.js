import _User from '../models/User.model';

const getUserById = async (data) => {
    try {
        const { id } = data;
        const user = await _User.findOne({ _id: id });
        if (user) {
            return {
                status: 'success',
                message: 'Get user detail success !',
                data: user,
            };
        }
        return {
            status: 'error',
            message: 'can not get user detail !',
            data: '',
        };
    } catch (error) {
        console.log(error);
        return {
            status: 'error',
            message: 'something was wrong in service',
            data: '',
        };
    }
};
const disableUserById = async (data) => {
    try {
        const { id } = data;
        const user = await _User.findOne({ _id: id });
        if (user.isDisabled == true) {
            user.isDisabled = false;
            await user.save();
            return {
                status: 'success',
                message: 'Disable user success !',
                data: user,
            };
        } else if (user.isDisabled == false) {
            user.isDisabled = true;
            await user.save();
            return {
                status: 'success',
                message: 'Disable user success !',
                data: user,
            };
        }

        return {
            status: 'error',
            message: 'can not find user !',
            data: '',
        };
    } catch (error) {
        console.log(error);
        return {
            status: 'error',
            message: 'something was wrong in service',
            data: '',
        };
    }
};
const getAllUser = async (data) => {
    try {
        const users = await _User.find({ role: { $ne: 'ADMIN' } });

        return {
            status: 'success',
            message: 'get all user successfully',
            data: users,
        };
    } catch (error) {
        console.log(error);
        return {
            status: 'error',
            message: 'something was wrong in service',
            data: '',
        };
    }
};

module.exports = {
    getUserById,
    disableUserById,
    getAllUser,
};

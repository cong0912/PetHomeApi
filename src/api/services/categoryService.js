const _ProductCategory = require('../models/ProductCategory.model');

const getCategory = async (data) => {
    try {
        const { name, species } = data;
        const categories = await _ProductCategory.findOne({ name, species });
        if (categories) {
            return {
                status: 'succes',
                message: 'get category successfully !',
                data: categories,
            };
        }
        return {
            status: 'error',
            message: 'can not find category',
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

module.exports = {
    getCategory,
};

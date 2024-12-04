import categoryService from '../services/categoryService';

const getCategory = async (req, res) => {
    try {
        let data = await categoryService.getCategory(req.query);
        return res.status(200).json({
            status: data.status,
            message: data.message,
            data: data.data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'error',
            message: 'error from server',
            data: '',
        });
    }
};

module.exports = {
    getCategory,
};

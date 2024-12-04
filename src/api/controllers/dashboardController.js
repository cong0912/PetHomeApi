import dashboardService from '../services/dashboardService';

const getRevenueByDay = async (req, res) => {
    try {
        let data = await dashboardService.getRevenueByDay(req.query);
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
const getRevenueByMonth = async (req, res) => {
    try {
        let data = await dashboardService.getRevenueByMonth(req.query);
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
    getRevenueByDay,
    getRevenueByMonth,
};

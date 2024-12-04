const _Order = require('../models/Order.model');
const _ServiceRecords = require('../models/ServiceRecords.model');

const getRevenueByDay = async (data) => {
    try {
        const { startTime, endTime } = data;
        const startDate = new Date(startTime);
        const endDate = new Date(endTime);
        endDate.setUTCHours(23, 59, 59, 999);

        const orderRevenue = await _Order.aggregate([
            {
                $match: {
                    dateOrder: { $gte: startDate, $lte: endDate },
                    'payment.status': 'PAID',
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$dateOrder' },
                    },
                    total: { $sum: '$totalPrice' },
                },
            },
            {
                $sort: { _id: 1 },
            },
        ]);

        const bookingServiceRevenue = await _ServiceRecords.aggregate([
            {
                $match: {
                    timeStartService: { $gte: startDate, $lte: endDate },
                    status: 'Completed',
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$timeStartService' },
                    },
                    total: { $sum: '$price' },
                },
            },
            {
                $sort: { _id: 1 },
            },
        ]);

        const getDateArray = (start, end) => {
            const arr = [];
            const dt = new Date(start);
            while (dt <= end) {
                arr.push(new Date(dt).toISOString().split('T')[0]);
                dt.setDate(dt.getDate() + 1);
            }
            return arr;
        };

        const allDates = getDateArray(startDate, endDate);

        const combinedRevenue = {};

        orderRevenue.forEach(({ _id, total }) => {
            combinedRevenue[_id] = total;
        });

        bookingServiceRevenue.forEach(({ _id, total }) => {
            if (combinedRevenue[_id]) {
                combinedRevenue[_id] += total;
            } else {
                combinedRevenue[_id] = total;
            }
        });

        const result = allDates.map((date) => ({
            date,
            total: combinedRevenue[date] || 0,
        }));

        return {
            status: 'success',
            message: 'Get revenue by day successfully!',
            data: result,
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
const getRevenueByMonth = async (data) => {
    try {
        const { year } = data;
        const startDate = new Date(`${year}-01-01T00:00:00Z`);
        const endDate = new Date(`${year}-12-31T23:59:59Z`);

        const orderRevenue = await _Order.aggregate([
            {
                $match: {
                    dateOrder: { $gte: startDate, $lte: endDate },
                    'payment.status': 'PAID',
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m', date: '$dateOrder' },
                    },
                    total: { $sum: '$totalPrice' },
                },
            },
            {
                $sort: { _id: 1 },
            },
        ]);

        const bookingServiceRevenue = await _ServiceRecords.aggregate([
            {
                $match: {
                    timeStartService: { $gte: startDate, $lte: endDate },
                    status: 'Completed',
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m', date: '$timeStartService' },
                    },
                    total: { $sum: '$price' },
                },
            },
            {
                $sort: { _id: 1 },
            },
        ]);

        // Tạo danh sách các tháng trong năm
        const getMonthArray = (year) => {
            return Array.from({ length: 12 }, (v, k) => `${year}-${String(k + 1).padStart(2, '0')}`);
        };

        const allMonths = getMonthArray(year);

        const combinedRevenue = {};

        orderRevenue.forEach(({ _id, total }) => {
            combinedRevenue[_id] = total;
        });

        bookingServiceRevenue.forEach(({ _id, total }) => {
            if (combinedRevenue[_id]) {
                combinedRevenue[_id] += total;
            } else {
                combinedRevenue[_id] = total;
            }
        });

        const result = allMonths.map((month) => ({
            month,
            total: combinedRevenue[month] || 0,
        }));

        return {
            status: 'success',
            message: 'Get revenue by month successfully!',
            data: result,
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
    getRevenueByDay,
    getRevenueByMonth,
};

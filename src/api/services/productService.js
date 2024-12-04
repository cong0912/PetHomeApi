import _Product from '../models/Product.model';
import _ProductCategory from '../models/ProductCategory.model';

const getProductsByCategory = async (data) => {
    try {
        const { name, species, type } = data;
        let products = [];
        let category = [];
        let categoryId = [];
        if (!name && !species) {
            products = await _Product.find({ type }).select('_id name image des price quantity status');
        } else if (!name) {
            category = await _ProductCategory.find({ species });
            categoryId = category.map((c) => c._id);
            products = await _Product
                .find({ category: { $in: categoryId }, type })
                .select('_id name image des price quantity status');
        } else {
            category = await _ProductCategory.findOne({ name, species });
            products = await _Product
                .find({ category: category._id, type })
                .select('_id name image des price quantity status');
        }
        if (products.length > 0) {
            return {
                status: 'success',
                message: 'get list products success !',
                data: products,
            };
        }
        return {
            status: 'success',
            message: 'There are not any products',
            data: [],
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
const getProductsAndSortByPrice = async (data) => {
    try {
        const { name, species, type, sort } = data;
        let sortValue = 0;
        if (sort == 'asc') {
            sortValue = 1;
        }
        if (sort == 'desc') {
            sortValue = -1;
        }

        let products = [];
        let category = [];
        let categoryId = [];
        if (!name && !species) {
            products = await _Product
                .find({ type })
                .select('_id name image des price quantity status')
                .sort({ price: sortValue });
        } else if (!name) {
            category = await _ProductCategory.find({ species });
            categoryId = category.map((c) => c._id);
            products = await _Product
                .find({ category: { $in: categoryId }, type })
                .select('_id name image des price quantity status')
                .sort({ price: sortValue });
        } else {
            category = await _ProductCategory.findOne({ name, species });
            products = await _Product
                .find({ category: category._id, type })
                .select('_id name image des price quantity status')
                .sort({ price: sortValue });
        }

        if (products.length > 0) {
            return {
                status: 'success',
                message: 'get list products success !',
                data: products,
            };
        }
        return {
            status: 'success',
            message: 'There are not any products',
            data: [],
        };
    } catch (error) {
        return {
            status: 'error',
            message: 'something was wrong in service',
            data: '',
        };
    }
};
const getProductsById = async (id) => {
    try {
        const product = await _Product.findOne({ _id: id }).select('_id name image des price quantity status');
        if (product) {
            return {
                status: 'success',
                message: 'get product detail success !',
                data: product,
            };
        }
        return {
            status: 'success',
            message: 'not found product',
            data: [],
        };
    } catch (error) {
        return {
            status: 'error',
            message: 'something was wrong in service',
            data: '',
        };
    }
};
const getProductsByName = async (data) => {
    try {
        const { name, type } = data;
        if (type) {
            const product = await _Product
                .find({ name: { $regex: name, $options: 'i' }, type })
                .select('_id name image des price quantity status');
            if (product) {
                return {
                    status: 'success',
                    message: 'get product detail success !',
                    data: product,
                };
            }
        } else {
            const product = await _Product
                .find({ name: { $regex: name, $options: 'i' } })
                .select('_id name image des price quantity status');
            if (product) {
                return {
                    status: 'success',
                    message: 'get product detail success !',
                    data: product,
                };
            }
        }
        return {
            status: 'success',
            message: 'not found product',
            data: [],
        };
    } catch (error) {
        return {
            status: 'error',
            message: 'something was wrong in service',
            data: '',
        };
    }
};

const getPriceByProductId = async (id) => {
    try {
        const product = await _Product.findOne({ _id: id });
        return product.price;
    } catch (error) {
        console.log(error);
    }
};
const createProduct = async (req) => {
    try {
        const { path, filename } = req.file;
        const { name, des, price, quantity, nameCategory, species } = req.body;
        const image = path;
        const category = await _ProductCategory.findOne({ name: nameCategory, species });
        if (category) {
            const product = await _Product.findOne({ name });
            if (product) {
                return {
                    status: 'error',
                    message: 'Name of product is exist !',
                    data: '',
                };
            }
            const newProduct = await _Product.create({
                name,
                des,
                price,
                quantity,
                category: category._id,
                image,
                type: 'product',
            });
            if (newProduct) {
                return {
                    status: 'success',
                    message: 'Product created successfully !',
                    data: newProduct,
                };
            }
        }

        return {
            status: 'error',
            message: 'Create product fail !',
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
const createService = async (req) => {
    try {
        const { path, filename } = req.file;
        const { name, des, price } = req.body;
        const image = path;
        const product = await _Product.findOne({ name });
        if (product) {
            return {
                status: 'error',
                message: 'Name of product is exist !',
                data: '',
            };
        }
        const newProduct = await _Product.create({
            name,
            des,
            price,
            quantity: 1,
            category: '665f0bc8c8e4653ac6b3c1ea',
            image,
            type: 'service',
        });
        if (newProduct) {
            return {
                status: 'success',
                message: 'Service created successfully !',
                data: newProduct,
            };
        }

        return {
            status: 'error',
            message: 'Create service fail !',
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
const updateProduct = async (data) => {
    try {
        const { productId, name, des, price, quantity } = data;
        const newProduct = await _Product.findByIdAndUpdate(productId, { name, des, price, quantity }, { new: true });
        if (newProduct) {
            if (newProduct.quantity > 0) {
                newProduct.status = 'In stock';
                await newProduct.save();
            } else if (newProduct.quantity == 0) {
                newProduct.status = 'out of stock';
                await newProduct.save();
            }
            return {
                status: 'success',
                message: 'Update product successfully !',
                data: '',
            };
        }
        return {
            status: 'error',
            message: 'Can not find product !',
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
const disableProduct = async (data) => {
    try {
        const { productId } = data;
        const newProduct = await _Product.findByIdAndUpdate(productId, { status: 'Disabled' }, { new: true });
        if (newProduct) {
            return {
                status: 'success',
                message: 'Disable product successfully !',
                data: '',
            };
        }
        return {
            status: 'error',
            message: 'Can not find product !',
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
const unDisableProduct = async (data) => {
    try {
        const { productId } = data;
        const product = await _Product.findOne({ _id: productId });
        if (product && product.status == 'Disabled') {
            const quantity = product.quantity;
            if (quantity > 0) {
                product.status = 'In stock';
            } else {
                product.status = 'out of stock';
            }
            const newProduct = await product.save();
            if (newProduct) {
                return {
                    status: 'success',
                    message: 'Undisable product successfully !',
                    data: '',
                };
            }
        }

        return {
            status: 'error',
            message: 'Can not find product or status of product is not Disabled !',
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
    getProductsByCategory,
    getProductsById,
    getProductsAndSortByPrice,
    getProductsByName,
    getPriceByProductId,
    createProduct,
    updateProduct,
    disableProduct,
    unDisableProduct,
    createService,
};

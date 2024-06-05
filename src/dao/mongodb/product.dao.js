import { ProductModel } from "./models/product.model.js";

const getProductById = async (id) => {
  try {
    return await ProductModel.findById(id);
  } catch (error) {
    throw new Error(error);
  }
};

const getAllProducts = async (
  page = 1,
  limit = 10,
  query,
  sort,
  available = true
) => {
  try {
    const queryFilter = query ? { category: query } : {};
    const availableFilter = { status: available };
    const filter = { ...queryFilter, ...availableFilter };
    let sortOrder = {};
    if (sort)
      sortOrder.price = sort === "asc" ? 1 : sort === "desc" ? -1 : null;

    return await ProductModel.paginate(filter, {
      page,
      limit,
      sort: sortOrder,
    });
  } catch (error) {
    console.log(error);
  }
};

const createProduct = async (obj) => {
  try {
    await ProductModel.create(obj);
    return obj;
  } catch (error) {
    throw new Error(error);
  }
};

const updateProduct = async (id, obj) => {
  try {
    return await ProductModel.findByIdAndUpdate(id, obj, { new: true });
  } catch (error) {
    throw new Error(error);
  }
};

const deleteProduct = async (id) => {
  try {
    return await ProductModel.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const ProductMongoDAO = {
  getProductById,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};

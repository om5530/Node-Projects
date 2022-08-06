const { query } = require('express');
const product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  // const products = await product.find({featured:true})
  const products = await product.find({}).sort('-name price');
  // const products = await product
  //   .find({ price: { $gt: 125 } })
  //   .sort('name')
  //   .select('company rating price')
  //   .limit(10)
  //   .skip(1);
  res.status(200).json({ nbHits: products.length, msg: products });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  if (numericFilters) {
     console.log(numericFilters);
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(regEx, (match) => {
      return `-${operatorMap[match]}-`;
    });

    //understanding
    // let x = (match)=>{
    //   return `-${operatorMap[match]}-`;
    // }
    // console.log(x('<='))
    // console.log(filters); //result price-$gt-50 , rating-$gt-4.5
//    const x= filters.split(',')
// console.log(x);

    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      console.log(item)
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };

        // console.log(queryObject)
        console.log(queryObject[field])
      }
    });
  }

  console.log(queryObject);
  let result = product.find(queryObject);
  if (sort) {
    // console.log(sort);
    const sortList = sort.split(',').join(' '); //sort('-name price') ',' is not allowed while sort on multiple properties
    //  console.log(sortList);
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  if (fields) {
    const fieldsList = fields.split(',').join(' '); //select('-company rating') ','  is not allowed while selecting on multiple properties
    // console.log(fieldsList);
    result = result.select(fieldsList);
  }

  const page = Number(req.query.page) || 1 //if we enter page in query params then it will be in string so to convert in number we did this
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  //23 pages we want to divide with 7
  //we will get 4 pages with 7 item ,7 ,7 ,2 items

  let products = await result;
  res.status(200).json({ msg: products, nbHits: products.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};

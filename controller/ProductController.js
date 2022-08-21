const Product = require("../model/productModel");
const ErrorHander = require("../servers/backend/utils/errorhander");
const catchAsyncErrors = require("../servers/backend/middleware/catchAsyncErrors");
const ApiFeatures = require("../servers/backend/utils/apifeatures");


// create product

exports.createProduct = catchAsyncErrors(async (req,res,next)=>{
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product,
    });
});
//getting products

exports.getAllProducts =catchAsyncErrors(async (req,res)=>{

    const resultPerPage = 8;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(),req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    const products = await apiFeature.query;

    res.status(200).json({
        success:true,
        products,
        productCount,
    });
});
//Get details

exports.getProductDetails =catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHander("Product not Found",405));

    }

    res.status(200).json({
        success:true,
        product,
    });
});

//update product(admin)

exports.updateProduct =catchAsyncErrors(async (req,res,next)=>{

    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHander("Product Found",405));
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false});
    res.status(200).json({
        success:true,
        product,
    });
});

//Delete Product

exports.deleteProduct =catchAsyncErrors(async(req,res,next)=>{

    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHander("Product Found",405));
    }
    await product.remove();

    res.status(200).json({
        success:true,
        message:"Product Deleted",
    });

});

// review
exports.createProductReview =catchAsyncErrors(async(req,res,next)=>{
    const {rating,comment,productId} = req.body
    const review = {
        user:req.user._id,
        name:req.user.name,
        rating: Number(rating),
        comment,
    }
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find((rev)=> rev.user.toString() === req.user._id.toString());
    if(isReviewed){
        product.reviews.forEach((rev) =>{
            if(rev.user.toString()===req.user._id.toString())
            (rev.rating=rating),
            (rev.comment=comment);
        })
    }
    else{
        product.reviews.push(review);
        product.numofReviews = product.reviews.length;
    }
    let avg=0;
    product.reviews.forEach((rev)=>{
        avg+=rev.rating;
    })
    product.ratings = avg /product.reviews.length;
    await product.save({validateBeforeSave: false});
    res.status(200).json({
        success:true,

    })

})

// All reviews

exports.getProductReviews = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.query.id);
    if(!product){
        return next(new ErrorHander("Product not Found",404));
    }

    res.status(200).json({
        success:true,
        reviews: product.reviews,
    });


})


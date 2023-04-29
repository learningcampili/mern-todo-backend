const errorHandler = (err,req,res,next)=>{
    const status = err.status || 500
    res.status(status);
    res.send({error:true,status,message:err.message || 'Internal Server error'})
}
module.exports = errorHandler
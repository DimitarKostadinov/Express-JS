const Car=require('mongoose').model('Car')
module.exports = {
    queryAll: (req, res) => {
        let page=Number(req.query.page)
        
        let prevPage=page-1
        let nextPage=page+1

        Car.find({}).sort('-creationDate').where('rented').equals(false).skip(page*10).limit(10).then((data)=>{
            if(prevPage<0){
                prevPage=0
            }

            let page={
                prevPage:prevPage,
                nextPage:nextPage
            }
            
            res.render('query/viewAll',{data, page})
        })
        
    },
    
};
const categoryController=require('../modules/category/controller');
const makaleController=require('../modules/makale/controller');

module.exports=function(app){

    //Kategoriler 
    app.get('/category/list',categoryController.list);
    app.get('/category/get',categoryController.get);
    app.post('/category/create',categoryController.create);
    app.put('/category/update',categoryController.update);
    app.delete('/category/delete',categoryController.remove);

    //Makaleler 
    app.get('/makale/list',makaleController.list);
    app.get('/makale/get',makaleController.get);
    app.post('/makale/create',makaleController.create);
    app.put('/makale/update',makaleController.update);
    app.delete('/makale/delete',makaleController.remove);
}
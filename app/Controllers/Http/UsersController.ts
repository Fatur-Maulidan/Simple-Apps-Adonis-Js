// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import SimpleBlogValidator from 'App/Validators/SimpleBlogValidator' 

export default class UsersController {
    public async getData() {
        return Database.from('blog').select('*')
    }

    public async addData({request, response}) {

        var payload = await request.validate(SimpleBlogValidator)
        
        if(await User.findBy('name',request.input('name'))){
            return response.json({
                'response' :  409,
                'message' : request.input('name')+' is Exist'   
            }) 
        }

        var user = new User()

        await user.fill(request.all()).save()

        if(user.$isPersisted){
            return response.json({
                'response' : 200,
                'message' : user
            })
        }

        return response.json({
            'response' : 404,
            'message' : "Error While Insert Data"
        })
    }

    // public async updateData({request, response}) {

    // }

    public async deleteData({request, response}){
        var user = await User.findOrFail(request.param('id'))
        await user.delete()

        return response.json({
            'response' : 200,
            'message' : "Successfully deleted"
        })
    }
}

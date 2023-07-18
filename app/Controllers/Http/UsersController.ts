// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import SimpleBlogValidator from 'App/Validators/SimpleBlogValidator' 

export default class UsersController {
    public async getData() {
        return await User.all()
    }

    public async addData({request, response}) {
        // Instantiate Object from model user
        var user = new User()

        // Validation Input
        await request.validate(SimpleBlogValidator)
        
        // User insert data using object
        await user.fill(request.all()).save()

        // true
        if(user.$isPersisted){
            return response.json({
                'response' : 200,
                'message' : user
            })
        }

        // false
        return response.json({
            'response' : 404,
            'message' : "Error While Insert Data"
        })
    }

    // public async updateData({request, response}) {

    // }

    public async deleteData({request, response}){
        var user = await User.find(request.param('id'))
        
        if(!user) {
            return response.json({
                'response' : 404,
                'message' : "Data Not Found"
            })
        }
        
        await user.delete()
        
        return response.json({
            'response' : 200,
            'message' : user
        })
    }
}

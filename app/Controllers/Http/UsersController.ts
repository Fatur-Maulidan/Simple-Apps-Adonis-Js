// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UsersController {
    public async getData() {
        return Database.from('blog').select('*')
    }

    public async addData({request, response}) {
        // if(request.body.length === 0) {
        //     return response.json({
        //         'response' : 404,
        //         'message' : Object.keys(request.body).length
        //     })
        // } 
        var user = new User()
        await user.fill(request.body).save()

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

    public async update({request, response}) {

    }

    public async delete({request, response}){
        var user = await User.findOrFail(request.param('id'))
        await user.delete()

        return response.json({
            'response' : 200,
            'message' : "Successfully deleted"
        })
    }
}

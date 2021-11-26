import type {NextApiRequest, NextApiResponse} from 'next';
import { DefaultResponseMsg } from '../../types/DefaultResponseMsg';
import { UserRequest } from '../../types/UserRequest';
import { connectDb} from '../../middlewares/connectDb'
import md5 from 'md5';
import { UserModel } from '../../models/UserModel';


const userEndpoint = async (req : NextApiRequest, res : NextApiResponse<DefaultResponseMsg>) => {

    if(req.method === 'POST'){
        const body = req.body as UserRequest;

        if(!body.name || body.name.length < 1){
            return res.status(400).json({ msg: 'name required'});
        }

        if(!body.email || body.email.length < 5){
            return res.status(400).json({ msg: 'email required'});
        }

        if(!body.pass || body.pass.length < 4){
            return res.status(400).json({ msg: 'pass required'});
        }


        const existingUserWithEmail = await UserModel.find({email : body.email});
        if(existingUserWithEmail && existingUserWithEmail.length){
            return res.status(400).json({ error : 'Já existe usuário com o email informado'});
        }


        const user = {
            name: body.name,
            email: body.email,
            pass: md5(body.pass)
        }

        // c# por padrao é sincrono
        // javascript por padrao é assincrono
        // await é quero esperar isso terminar
        // tudo que e promise é assincrono
        await UserModel.create(user);

        return res.status(200).json({ msg: 'create sucess' });
 
    }

    return res.status(405).json({ msg: 'not authorized'});

  }

  export default connectDb(userEndpoint);
  
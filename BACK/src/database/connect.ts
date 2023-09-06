import mongoose from 'mongoose'
import {modelBook, modelSelfService, modelUsers} from '../models/model'
import * as dotenv from 'dotenv'

// dotenv.config({path: `./env.${process.env.NODE_ENV}`})
dotenv.config()
const url = `mongodb+srv://${process.env.DATABASE}`;

export const connectDb = async () => {


    mongoose.set('strictQuery', false)
    mongoose.connect(url)
        .then(() => console.log('COOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONect'))
        .catch(error => console.log(error))
}

export const createData = async () => {
    try {
        const book = new modelBook({
            title: '20 Milles lieux sous la merde',
            author: 'Jules Verges',
            available: true,
            self_service_id: null,
            borrow_date: new Date(-35),
            user_id: '34RNJ3D',
        });

        await book.save();

        const selfService = new modelSelfService({
            location: 'Boulogne-sur-mer',
            address: '33 rue de la poupée qui tousse',
            zip_code: 62200,
        });

        await selfService.save();

        const users = new modelUsers({
            name: 'Quentin',
            code: '34RNJ3D',
        });

        await users.save();

        console.log('Data created successfully');
    } catch (error) {
        console.error('Failed to create data:', error);
    }
};

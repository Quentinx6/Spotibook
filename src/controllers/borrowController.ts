import axios from "axios";
import { log } from "console";
import { Request, Response } from "express";
import { modelBook } from "../models/model";

const borrowBook = async (req: Request, res: Response) => {
    const resultAxios = await axios
        .get("http://141.94.247.187:3000/api/v1/list")
        .then((response) => {
            return response.data;
        });

    let code_user = false;

    const data = req.body

    resultAxios.forEach((item: any) => {
        if (item.code === data.user_id) {
            code_user = true;
        }
    });

    let borrow = await modelBook.findOne({title: req.params.title })
    
 
    switch(borrow) {
        case null: 
            res.status(404).json("Rien trouver")
        break;
        case undefined: 
            res.status(404).json("Rien trouver")
        break;
        // 
        default: 
            borrow.user_id = data.user_id
            borrow.borrow_date = new Date()
            borrow.available = false
            borrow.self_service_id = undefined
            borrow.save()
            res.status(200).json({message: 'Book borrowed', borrow})
        break;
    }




    // if (code_user) {
    //     req.body.user_id = {user_id}
    //     req.body.user_id == null
    //         ? req.body.borrow_date = new Date()
    //         : req.body.borrow_date = null
    //     req.body.user_id == null
    //         ? req.body.available = true
    //         : req.body.available = false;
    //     const result = await modelBook.findOneAndUpdate(
    //         { title: req.params.title },
    //         req.body.user_id
    //     );
    //     res.status(200).json({ message: "book borrow", result });
    // } else {
    //     res.status(401).json({ message: "Wrong code user" });
    // }
};

export default {
    borrowBook,
};

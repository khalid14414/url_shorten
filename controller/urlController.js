import { url } from "../model/urlModel.js";
import { urlShorten } from "../util/helper.js";

import validUrl from 'valid-url';


export const createUrl = async (req,res,next)=>{
    const {originalUrl} = req.body
    if (!validUrl.isWebUri(originalUrl)) {
        return res.status(422).json({error:"Invalid Link"})
    }
    const existingUrl = await url.findOne({originalUrl})
    console.log("new"+ existingUrl)
    if (existingUrl) {
           const  shortId = `${process.env.BASELINK}/${existingUrl.shortId}`
           return res.render('index',{pageTitle:'Home', shortUrl: shortId})
    }

   const newUrl = await url.create({originalUrl:originalUrl,
        shortId:urlShorten()
    })

    const shortUrl = `${process.env.BASELINK}/${newUrl.shortId}`
    res.render('index',{pageTitle:'Home',shortUrl,error:null})
    console.log(newUrl)
}

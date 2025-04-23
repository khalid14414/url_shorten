import { url } from "../model/urlModel.js";
import { urlShorten } from "../util/helper.js";

import validUrl from 'valid-url';


export const createUrl = async (req,res,next)=>{
    const {originalUrl} = req.body
    if (!validUrl.isWebUri(originalUrl)) {
        return res.status(422).json({error:"Invalid Link"})
    }
    const existingUrl = await url.findOne({originalUrl})
    if (existingUrl) {
        return res.status(422).json("Hi")
    }

   const newUrl = await url.create({originalUrl:originalUrl,
        shortId:urlShorten()
    })

    const shortenLink = `${process.env.BASELINK}/${newUrl.shortId}`
    console.log(shortenLink)

    console.log(newUrl)
}


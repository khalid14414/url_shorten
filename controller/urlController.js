import { url } from "../model/urlModel.js";
import { urlShorten } from "../util/helper.js";

import validUrl from 'valid-url';


export const createUrl = async (req,res,next)=>{
    try {
        const {originalUrl} = req.body
        if (!validUrl.isWebUri(originalUrl)) {
            return res.status(422).json({error:"Invalid Link"})
        }
        const existingUrl = await url.findOne({originalUrl})
        if (existingUrl) {
               const  shortId = `${process.env.BASELINK}/${existingUrl.shortId}`
               return res.render('index',{pageTitle:'Home', shortUrl: shortId})
        }
    
       const newUrl = await url.create({originalUrl:originalUrl,
            shortId:urlShorten()
        })
    
        const shortUrl = `${process.env.BASELINK}/${newUrl.shortId}`
        res.render('index',{pageTitle:'Home',shortUrl,error:null})
       
    } catch (error) {
        res.status(500).json({message:"Server error",error})
    }
}


export const handleRedirect = async(req,res,next)=>{
  try {
      const {shortId} = req.params
      const urlMatch= await url.findOne({shortId})
      if(!urlMatch){
          return res.status(422).json({message:"Url not found"})
      }
      res.redirect(urlMatch.originalUrl)
  } catch (error) {
    res.status(500).json({message:"Server error",error})
  }
}
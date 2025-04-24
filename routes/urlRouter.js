import { Router } from "express";
import { createUrl, handleRedirect } from "../controller/urlController.js";


const url = Router();


url.post('/url',createUrl)
url.get('/:shortId',handleRedirect)


export default url

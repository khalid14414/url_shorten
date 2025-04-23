import { Router } from "express";
import { createUrl } from "../controller/urlController.js";


const url = Router();


url.post('/url',createUrl)


export default url

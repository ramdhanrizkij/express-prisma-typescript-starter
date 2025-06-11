import { Request, Response } from "express";
import { PermissionService } from "../services/permission.service";

export class PermissionController{
    private permissionService:PermissionService

    constructor(){
        this.permissionService = new PermissionService();
    }

    createPermission = async(req:Request, res:Response):Promise<Response> => {
       try{
        const {name} = req.body
        const permission = await this.permissionService.createPermission({name})
        return res.status(201).json({message:"Permission created successfully", data:permission})

       }catch(error:any){
        return res.status(400).json({message:error.message || "Failed to create Permission"})
       }
    }

    getPermissionById = async(req:Request, res:Response): Promise<Response>=>{
        try{
            const {id} = req.params
            const permission = await this.permissionService.getPermissionById(Number(id))
            if(!permission){
                return res.status(404).json({message:"Permission not found"})
            }
            return res.status(200).json({message:"Permission fetched successfully", data:permission})
        }catch(error:any){
            return res.status(400).json({message:error.message || "Failed to get Permission"})
        }
    }

    getAllPermission = async(req:Request, res:Response): Promise<Response>=>{
        try{
            const permissions = await this.permissionService.getAllPermissions()
            return res.status(200).json({message:"Permissions fetched successfully", data:permissions})
        }catch(error:any){
            return res.status(400).json({message:error.message || "Failed to get permission"})
        }
    }

    updatePermission = async(req:Request, res:Response): Promise<Response> =>{
        try{
            const {id} = req.params
            const {name} = req.body
            const permission = await this.permissionService.updatePermission(Number(id), {name});
            return res.status(200).json({message:"Permission update successfully", data:permission})
        }catch(error: any){
            return res.status(400).json({message:error.message || "Failed to update permission"})
        }
    }

    deletePermission = async(req:Request, res:Response): Promise<Response>=>{
        try{
            const {id} = req.params
            const permission = await this.permissionService.deletePermission(Number(id))
            return res.status(200).json({message:"Permission deleted successfully", data:permission})
        }catch(error:any){
            return res.status(400).json({message:error.message || "Failed to delete permission"})
        }
    }

}
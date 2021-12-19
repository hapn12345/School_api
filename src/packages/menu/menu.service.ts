import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Menu } from "./models/menu.schema";
import {IMenu} from "./models/menu.interface"
import { JsonWebTokenError } from "jsonwebtoken";
@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(Menu)
        private menuRepos: Repository<Menu>
    ) { }

    async findAll(): Promise<IMenu[]> {
        const menu = await this.menuRepos.find()
        let res = menu.map(x=>{
            return new IMenu(
              {
                menu: JSON.parse(x.content),
                date: x.date,
                id: x.id

              }
            )
        })
        return res;
    }

    async findMany({
        query
    }): Promise<IMenu[]> {
        const menu =  await this.menuRepos.find({
            where: query
        })
        let res = menu.map(x=>{
            return new IMenu(
              {
                menu: JSON.parse(x.content),
                date: x.date,
                id: x.id
              }
            )
        })
        return res;
    }

    async findOne(id): Promise<IMenu> {
        
        const menu =  await this.menuRepos.findOne(id)
        return new IMenu(
            {
              menu: JSON.parse(menu.content),
              date: menu.date,
              id: menu.id
            }
          )
    }

    async create(data: IMenu): Promise<Menu> {
        const menu  = new Menu(
            {
                content: JSON.stringify(data.menu),
                date: data.date,
                classID: data.classID
            }
        ) 
        return await this.menuRepos.save(menu)
    }

    async update(updateData: IMenu, id): Promise<Menu> {
        try {
            const oneMenu = await this.menuRepos.findOne(id)
            if (!oneMenu) {
                throw new NotFoundException('MenuNotFound')
            }
            const menu  = new Menu(
                {
                    content: JSON.stringify(updateData.menu),
                    date: updateData.date,
                    classID: updateData.classID
                }
            ) 
            const updateMenu = await this.menuRepos.save({
                ...oneMenu,
                ...menu
            })
            return updateMenu
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async delete(id): Promise<DeleteResult> {
        try {
            const oneMenu = await this.menuRepos.findOne(id)
            if (!oneMenu) {
                throw new NotFoundException('MenuNotFound')
            }
            return await this.menuRepos.delete(id)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}
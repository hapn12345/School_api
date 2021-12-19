import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MenuController } from "./menu.controller";
import { MenuService } from "./menu.service";
import { Menu } from "./models/menu.schema";

@Module({
    imports: [TypeOrmModule.forFeature([Menu])],
    providers: [MenuService],
    controllers: [MenuController],
    exports: [MenuService]
})

export class MenuModule { }
import { AdminService } from './admin.service';
import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { eventLog } from './admin.decorator';

@Controller('admin')
@ApiTags('管理模块')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    // 新建文章
    @Post('article')
    @eventLog(1000)
    addArticle() {
        return {
            msg: `success`,
            status: 0
        }
    }
}

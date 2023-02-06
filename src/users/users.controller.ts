import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){};
    //signup, signin, findid, edit user

    @Post('signup')
    signup(@Body() createUserDto: CreateUserDto): User  {
        const {username, password} = createUserDto
        // console.log(username,', ', password)
        return this.usersService.signup(createUserDto);
    }

    @Post('signin')
    signin(@Body() createUserDto: CreateUserDto):boolean {
        return this.usersService.signin(createUserDto);

    }

    @Get(':user_idx')
    findId(
        @Param('user_idx', new ParseIntPipe())  user_idx: number,
    ):string {
        console.log("id : ",user_idx);
        return this.usersService.findId(user_idx);
    }

    @Patch()
    editUser(@Body() updateUserDto:UpdateUserDto):any {
        return this.usersService.updateUser(updateUserDto);
    }

}

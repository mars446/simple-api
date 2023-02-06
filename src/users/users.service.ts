import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { findIndex } from 'rxjs';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private readonly users:User[] = [];

    signup(createUserDto:CreateUserDto): User  {
        const {username, password} = createUserDto;
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        const user:User = {
            username:username,
            password:hash,
            salt:salt
        }

        this.users.push(user)
        return user;
    }
    signin(createUserDto:CreateUserDto):boolean {
        const {username, password} = createUserDto
        let authCheck = false;
        // const saltRounds = 10;
        // const salt = bcrypt.genSaltSync(saltRounds);
        
        this.users.forEach(item => {
            const hash = bcrypt.hashSync(password, item.salt);
            if(item.username == username && item.password == hash) {
                authCheck = true;
            }
        });
        return authCheck;

    }
    
    findId(user_idx:number):string{
        if (this.users.length > user_idx) {
            return this.users[user_idx].username;
        } else {
            return 'user not found';
        }
        
    }

    updateUser(updateUserDto:UpdateUserDto):any{
        const {user_idx, username, password} = updateUserDto;
        console.log(this.users.length)
        // console.log(parseInt(user_idx))
        if (this.users.length > user_idx){
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);
            const user:User = {
                username:username,
                password:hash,
                salt:salt
            }
            this.users[user_idx] = user;
            return user;
        } else {
            return 'User not found..!!';
        }
        
    }
}

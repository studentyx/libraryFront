import { Component } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { User } from '../../shared/user.model';

@Component({
    templateUrl: 'signUp.component.html',
    styleUrls: ['signUp.component.css']
})

export class SignUpComponent {

    static URL = 'register';
    user: User;
    confirmPassword: string;

    constructor(private userService: UserService) {
        this.user = { username: "diego", password: "diego" };
        this.confirmPassword = "";
    }

    private validateRegister(): boolean {
        let result = true;

        if (this.user.password !== this.confirmPassword) {
            result = false;
        }

        return result;
    }

    register() {
        if (this.validateRegister()) {
            this.userService.create(this.user).subscribe();
        }
    }

}
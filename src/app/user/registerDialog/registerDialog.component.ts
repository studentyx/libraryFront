import { Component } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { User } from '../../shared/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'app-registerDialog',
    templateUrl: 'registerDialog.component.html',
    styleUrls: ['registerDialog.component.css']
})

export class RegisterDialogComponent {

    user: User;
    confirmPassword: string;
    recaptcha: string;

    username: FormControl;
    email: FormControl;
    password: FormControl;
    repeatPassword: FormControl;

    registerForm: FormGroup = new FormGroup({
        username: this.username = new FormControl('', [Validators.required]),
        email: this.email = new FormControl('', [Validators.required, Validators.email]),
        password: this.password = new FormControl('', [Validators.required]),
        repeatPassword: this.repeatPassword = new FormControl('', [Validators.required]),
    });

    constructor(private userService: UserService) {
        this.user = { username: "diego", password: "diego" };
        this.confirmPassword = "";
        this.recaptcha = undefined;
    }



    public resolved(captchaResponse: string) {
        this.recaptcha = captchaResponse;
    }

    nonEqualPasswords() {
        return this.user.password !== this.confirmPassword;
    }

    invalidRegisterData() {

        let result: boolean = false;

        if ( this.registerForm.get('username').invalid || this.registerForm.get('password').invalid || this.registerForm.get('email').invalid ) {
            result = true;
        } else if ( this.nonEqualPasswords() ) {
            result = true;
        } else if (this.recaptcha === undefined) {
            result = true;
        }

        return result;
    }

    register() {
        this.userService.create(this.user, this.recaptcha).subscribe();
    }


}

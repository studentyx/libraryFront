import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { User } from '../../shared/user.model';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.css']
})

export class ProfileComponent implements OnInit {

    static URL = 'profile';
    user: User;

    propertyString: string;


    constructor(private userService: UserService, private router: Router) {
        this.user = { username: "", password: "" };
    }

    ngOnInit(): void {
        if (this.userService.getLoginUser() === null) {
            this.router.navigate(['home/libraryBooks']);
        } else {
            this.synchronize();
        }
    }

    synchronize() {
        this.userService.read(this.userService.getLoginUser()).subscribe(data => {
            this.user = data;
        });
    }

    editProperty(propertyKey: string) {
        this.propertyString = propertyKey;
    }

    cancelProperty() {
        this.propertyString = '';
    }

    saveProperty() {
        this.propertyString = '';

        this.userService.update(this.user).subscribe();
    }

    editPropertyActive(property: string) {
        return this.propertyString === property;
    }

}
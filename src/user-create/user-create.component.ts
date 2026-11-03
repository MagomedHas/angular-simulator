import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { IUser } from '../interfaces/IUser';

type UserWithoutId = Omit<IUser, 'id'>;

type ControlsOf<T> = {
  [K in keyof T]: T[K] extends object
    ? FormGroup<ControlsOf<T[K]>>
    : FormControl<T[K] >;
};

type UserFormGroup = FormGroup<ControlsOf<UserWithoutId>>;

@Component({
  selector: 'app-user-create',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent {

  @Output() createUser: EventEmitter<IUser> = new EventEmitter<IUser>();
  private fb: NonNullableFormBuilder = inject(FormBuilder).nonNullable;


  userForm: UserFormGroup = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100)
  ]],
    username: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]],
    email: ['', [
      Validators.required,
      Validators.email,
      Validators.maxLength(100)
    ]],
    address: this.fb.group({
      street: ['', [
        Validators.required,
        Validators.maxLength(100)]],
      suite: ['', Validators.maxLength(50)],
      city: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      zipcode: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10)
      ]],
      geo: this.fb.group({
        lat:  ['', Validators.required],
        lng:  ['', Validators.required],
      })
    }),
    phone: ['', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(25)
    ]],
    website: ['', Validators.maxLength(100)],
    company: this.fb.group({
      name:  ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      catchPhrase: ['', Validators.maxLength(200)],
      bs: ['', Validators.maxLength(100)],
    })
  })

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    const user: IUser = {
      id: Date.now(),
      ...this.userForm.getRawValue(),
    };
    this.createUser.emit(user)
    this.userForm.reset();
  }

}

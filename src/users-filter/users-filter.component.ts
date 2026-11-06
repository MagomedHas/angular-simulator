import { Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-users-filter',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent {

  @Output() filterChange: EventEmitter<string> = new EventEmitter<string>();
  filterControl: FormControl<string> = new FormControl('', {
    nonNullable: true,
  });
  private destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit() {
    this.filterControl.valueChanges
      .pipe(
        map(value => value.trim().toLowerCase()),
        debounceTime(200),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(value => {
        this.filterChange.emit(value);
      });
  }

}

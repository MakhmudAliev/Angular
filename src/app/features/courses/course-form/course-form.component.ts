import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Author } from '../model/authors.model';
import { CoursesFacade } from '@app/store/courses/courses.facade';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    public library: FaIconLibrary,
    private coursesStore: CoursesStoreService,
    private coursesFacade: CoursesFacade
  ) {
    library.addIconPacks(fas);
  }
  courseForm!: FormGroup;
  authors$ = this.coursesStore.authors$;
  private addedAuthors: string[] = [];

  ngOnInit() {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      newAuthor: ['', [Validators.pattern(/^[a-zA-Z0-9 ]*$/), Validators.minLength(2)]],
      authors: this.fb.array([]),
      duration: [0, [Validators.required, Validators.min(0)]],
    });

    this.coursesStore.getAllAuthors();
  }

  get authors() {
    return this.courseForm.get('authors') as FormArray;
  }

  getAuthorName(author: AbstractControl) {
    return author.get('name')?.value;
  }

  addAuthor(author: Author) {
    if (!this.addedAuthors.includes(author.id)) {
      this.authors.push(
        this.fb.group({
          name: [author.name, Validators.required],
          id: [author.id],
        })
      );
      this.addedAuthors.push(author.id);
    }
  }

  removeAuthor(index: number) {
    this.authors.removeAt(index);
  }

  isAddAuthorButtonDisabled() {
    return !this.courseForm.get('newAuthor')?.valid || this.courseForm.get('newAuthor')?.value === '';
  }

  get titleFormControl() {
    return this.courseForm.controls.title;
  }

  get descriptionFormControl() {
    return this.courseForm.controls.description;
  }

  get durationFormControl() {
    return this.courseForm.controls.duration;
  }

  createAuthor() {
    const newAuthorName = this.courseForm.get('newAuthor')?.value;
    this.coursesStore.createAuthor(newAuthorName);
    this.courseForm.get('newAuthor')?.reset();
  }

  onSubmit() {
    if (this.courseForm.valid) {
      const course = {
        ...this.courseForm.value,
        authors: this.courseForm.value.authors?.map((a: Author) => a.id),
      };
      this.coursesFacade.createCourse(course);
    }
  }
}

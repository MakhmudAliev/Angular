import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuid } from 'uuid';

export type Author = {
  id: string;
  name: string;
};

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
  courseForm!: FormGroup;
  createdAuthors: Author[] = [];
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.

  ngOnInit() {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      newAuthor: ['', [Validators.pattern(/^[a-zA-Z0-9 ]*$/), Validators.minLength(2)]],
      authors: this.fb.array([]),
      duration: [0, [Validators.required, Validators.min(0)]],
    });
  }

  get authors() {
    return this.courseForm.get('authors') as FormArray;
  }

  addAuthor() {
    const newAuthorName = this.courseForm.get('newAuthor')?.value;

    if (newAuthorName) {
      this.authors.push(
        this.fb.group({
          name: [newAuthorName, Validators.required],
        })
      );
      this.courseForm.get('newAuthor')?.reset();
    }
  }

  removeAuthor(index: number) {
    this.authors.removeAt(index);
  }

  isAddAuthorButtonDisabled() {
    console.log("🚀 ~ this.courseForm.get('newAuthor')?.value:", this.courseForm.get('newAuthor'));
    return !this.courseForm.get('newAuthor')?.valid || this.courseForm.get('newAuthor')?.value === '';
  }

  get formControls() {
    return this.courseForm.controls;
  }

  createAuthor(authorName: string) {
    if (!this.createdAuthors.find(author => author.name === authorName)) {
      this.createdAuthors.push({ name: authorName, id: uuid() });
    }
  }

  onSubmit() {
    if (this.courseForm.valid) {
      const courseTitle = this.courseForm.value.title;
      console.log('🚀 ~ Submitted form for:', courseTitle);
      this.courseForm.reset();
    }
  }
}

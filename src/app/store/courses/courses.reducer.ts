import { Action, createReducer, on } from '@ngrx/store';
import * as CourseActions from './courses.actions';
import { Course } from '@app/features/courses/model/courses.model';

// Add your code here
export const coursesFeatureKey = 'courses';

export interface CoursesState {
  allCourses: Course[];
  course: Course | null;
  isAllCoursesLoading: boolean;
  isSingleCourseLoading: boolean;
  isSearchState: boolean;
  errorMessage: string | null;
}

export const initialState: CoursesState = {
  allCourses: [],
  course: null,
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false,
  errorMessage: null,
};

export const coursesReducer = createReducer(
  initialState,
  on(CourseActions.requestAllCourses, state => ({
    ...state,
    isAllCoursesLoading: true,
    errorMessage: null,
  })),
  on(CourseActions.requestAllCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
    errorMessage: null,
  })),
  on(CourseActions.requestAllCoursesFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error,
  })),
  on(CourseActions.requestSingleCourse, state => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: null,
  })),
  on(CourseActions.requestSingleCourseSuccess, (state, { course }) => ({
    ...state,
    course,
    isSingleCourseLoading: false,
    errorMessage: null,
  })),
  on(CourseActions.requestSingleCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error,
  })),
  on(CourseActions.requestFilteredCourses, state => ({
    ...state,
    isSearchState: true,
    errorMessage: null,
  })),
  on(CourseActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isSearchState: false,
    errorMessage: null,
  })),
  on(CourseActions.requestFilteredCoursesFail, (state, { error }) => ({
    ...state,
    isSearchState: false,
    errorMessage: error,
  })),
  on(CourseActions.requestDeleteCourseSuccess, state => ({
    ...state,
    errorMessage: null,
  })),
  on(CourseActions.requestDeleteCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
  })),
  on(CourseActions.requestEditCourseSuccess, (state, { course }) => ({
    ...state,
    course,
    errorMessage: null,
  })),
  on(CourseActions.requestEditCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
  })),
  on(CourseActions.requestCreateCourseSuccess, (state, { course }) => ({
    ...state,
    allCourses: [...state.allCourses, course],
    errorMessage: null,
  })),
  on(CourseActions.requestCreateCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
  }))
);

export const reducer = (state: CoursesState, action: Action): CoursesState => coursesReducer(state, action);

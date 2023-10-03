import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState } from './courses.reducer';

// Select the feature state
const selectCoursesState = createFeatureSelector<CoursesState>('courses');

// Selectors for loading states
const isAllCoursesLoadingSelector = createSelector(selectCoursesState, state => state.isAllCoursesLoading);

const isSearchingStateSelector = createSelector(selectCoursesState, state => state.isSearchState);

const isSingleCourseLoadingSelector = createSelector(selectCoursesState, state => state.isSingleCourseLoading);

// Selectors for data
const getAllCourses = createSelector(selectCoursesState, state => state.allCourses);

const getCourse = createSelector(selectCoursesState, state => state.course);

// Selector for error message
const getErrorMessage = createSelector(selectCoursesState, state => state.errorMessage);

export const coursesQuery = {
  isAllCoursesLoadingSelector,
  isSearchingStateSelector,
  isSingleCourseLoadingSelector,
  getAllCourses,
  getCourse,
  getErrorMessage,
};

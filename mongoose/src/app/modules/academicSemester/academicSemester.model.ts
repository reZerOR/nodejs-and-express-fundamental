import { TAcademicSemester, TMonth } from './academicSemester.interface';
import { Schema, model } from 'mongoose';

export const month: TMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: ['Autumn', 'Summer', 'Fall'],
      require: true,
    },
    code: {
      type: String,
      enum: ['01', '02', '03'],
      require: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: month,
      required: true,
    },
    endMonth: {
      type: String,
      enum: month,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AcademicSemesterModel = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema
);

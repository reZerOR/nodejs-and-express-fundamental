import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await academicDepartmentModel.findOne({
    name: this.name,
  });

  if (isDepartmentExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'this departement is already exist'
    );
  }
  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await academicDepartmentModel.findOne(query);

  if (!isDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'this departement does not exist');
  }
  next();
});

export const academicDepartmentModel = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema
);

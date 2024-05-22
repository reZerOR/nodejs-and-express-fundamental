import { Model } from 'mongoose';

export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
export interface Student {
  id: string;
  password: string
  name: UserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  contactNo: string;
  email: string;
  emergencyContactNo: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'blocked';
  isDeleted: boolean
}

export interface StudentMethod extends Model<Student> {
  isUserExists(id: string): Promise<string | null>;
}

// for creating instance model

// export type StudentMethods = {
//   isUserExists(id: string): Promise<Student| null>;
// };

// export type StudentMethodModel = Model<
//   Student,
//   Record<string, never>,
//   StudentMethods
// >;

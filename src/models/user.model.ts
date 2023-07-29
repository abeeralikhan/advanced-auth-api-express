import {
  Severity,
  getModelForClass,
  modelOptions,
  pre,
  prop,
} from "@typegoose/typegoose";
import { nanoid } from "nanoid";
import argon2 from "argon2";
import log from "../utils/logger";

interface UserDocumentType extends DocumentType, User {}

@pre<User>("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const hashedPassword = await argon2.hash(this.password);

  this.password = hashedPassword;

  return;
})
@modelOptions({
  schemaOptions: {
    // will automatically add createdAt and updatedAt properties
    timestamps: true,
  },
  options: {
    // so fields are allowed to have multiple types --> string | null
    allowMixed: Severity.ALLOW,
  },
})
export class User {
  // Will use this class as type
  @prop({ lowercase: true, required: true, unique: true })
  email: string;

  @prop({ required: true })
  fristName: string;

  @prop({ required: true })
  lastName: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true, default: () => nanoid() })
  verificationCode: string;

  @prop()
  passwordRestCode: string | null;

  @prop({ default: false })
  verified: boolean;

  async validatePassword(this: UserDocumentType, password: string) {
    try {
      return await argon2.verify(this.password, password);
    } catch (error) {
      log.error(error, "Could not validate password");
      return false;
    }
  }
}

const UserModel = getModelForClass(User);

export default UserModel;

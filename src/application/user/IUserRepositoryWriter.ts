import { User } from "../../domain";
import { IRepositoryWriter } from "../repositories";

export interface IUserRepositoryWriter extends IRepositoryWriter<User> { }
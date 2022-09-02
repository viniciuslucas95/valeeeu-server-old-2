import { IQueryHandler } from "../../shared";
import { VerifyQuery } from './VerifyQuery'

export interface IVerifyQueryHandler
    extends IQueryHandler<boolean, VerifyQuery> { }
import { User } from "../../domain";

export interface IUserCreationNotifier {
    notify: (user: User) => Promise<void>
}
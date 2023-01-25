import { User } from "../../src/models/user";

// declare global{
//     namespace Express {
//        export interface Request {
//             currentUser: User
//         }
//     }
// }
// declare global{
//  namespace Express {
//     export interface Request {
//         currentUser:  import("express-serve-static-core").Request<import("../../src/models/user").User>;
//     }
//   }
// }
declare module 'express-serve-static-core' {
    export interface Request {
        currentUser: User;
    }
    }
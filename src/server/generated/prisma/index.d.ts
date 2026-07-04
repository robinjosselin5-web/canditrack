
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model CandidateProfile
 * 
 */
export type CandidateProfile = $Result.DefaultSelection<Prisma.$CandidateProfilePayload>
/**
 * Model CandidateCv
 * 
 */
export type CandidateCv = $Result.DefaultSelection<Prisma.$CandidateCvPayload>
/**
 * Model CvExperience
 * 
 */
export type CvExperience = $Result.DefaultSelection<Prisma.$CvExperiencePayload>
/**
 * Model CvSkill
 * 
 */
export type CvSkill = $Result.DefaultSelection<Prisma.$CvSkillPayload>
/**
 * Model CvTraining
 * 
 */
export type CvTraining = $Result.DefaultSelection<Prisma.$CvTrainingPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Company
 * 
 */
export type Company = $Result.DefaultSelection<Prisma.$CompanyPayload>
/**
 * Model Resume
 * 
 */
export type Resume = $Result.DefaultSelection<Prisma.$ResumePayload>
/**
 * Model Application
 * 
 */
export type Application = $Result.DefaultSelection<Prisma.$ApplicationPayload>
/**
 * Model Note
 * 
 */
export type Note = $Result.DefaultSelection<Prisma.$NotePayload>
/**
 * Model ActionHistory
 * 
 */
export type ActionHistory = $Result.DefaultSelection<Prisma.$ActionHistoryPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const CompanyStatus: {
  DRAFT: 'DRAFT',
  PENDING: 'PENDING',
  NO_RESPONSE: 'NO_RESPONSE',
  FOLLOW_UP: 'FOLLOW_UP',
  INTERVIEW: 'INTERVIEW',
  REJECTED: 'REJECTED',
  ACCEPTED: 'ACCEPTED'
};

export type CompanyStatus = (typeof CompanyStatus)[keyof typeof CompanyStatus]


export const CandidateCvAnalysisStatus: {
  NOT_ANALYZED: 'NOT_ANALYZED',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export type CandidateCvAnalysisStatus = (typeof CandidateCvAnalysisStatus)[keyof typeof CandidateCvAnalysisStatus]


export const CvSkillCategory: {
  LANGUAGES: 'LANGUAGES',
  FRAMEWORKS_LIBRARIES: 'FRAMEWORKS_LIBRARIES',
  TOOLS_TECHNOLOGIES: 'TOOLS_TECHNOLOGIES',
  METHODOLOGIES: 'METHODOLOGIES',
  SOFT_SKILLS: 'SOFT_SKILLS',
  OTHER: 'OTHER'
};

export type CvSkillCategory = (typeof CvSkillCategory)[keyof typeof CvSkillCategory]

}

export type CompanyStatus = $Enums.CompanyStatus

export const CompanyStatus: typeof $Enums.CompanyStatus

export type CandidateCvAnalysisStatus = $Enums.CandidateCvAnalysisStatus

export const CandidateCvAnalysisStatus: typeof $Enums.CandidateCvAnalysisStatus

export type CvSkillCategory = $Enums.CvSkillCategory

export const CvSkillCategory: typeof $Enums.CvSkillCategory

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.candidateProfile`: Exposes CRUD operations for the **CandidateProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CandidateProfiles
    * const candidateProfiles = await prisma.candidateProfile.findMany()
    * ```
    */
  get candidateProfile(): Prisma.CandidateProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.candidateCv`: Exposes CRUD operations for the **CandidateCv** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CandidateCvs
    * const candidateCvs = await prisma.candidateCv.findMany()
    * ```
    */
  get candidateCv(): Prisma.CandidateCvDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cvExperience`: Exposes CRUD operations for the **CvExperience** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CvExperiences
    * const cvExperiences = await prisma.cvExperience.findMany()
    * ```
    */
  get cvExperience(): Prisma.CvExperienceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cvSkill`: Exposes CRUD operations for the **CvSkill** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CvSkills
    * const cvSkills = await prisma.cvSkill.findMany()
    * ```
    */
  get cvSkill(): Prisma.CvSkillDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cvTraining`: Exposes CRUD operations for the **CvTraining** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CvTrainings
    * const cvTrainings = await prisma.cvTraining.findMany()
    * ```
    */
  get cvTraining(): Prisma.CvTrainingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.company`: Exposes CRUD operations for the **Company** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companies
    * const companies = await prisma.company.findMany()
    * ```
    */
  get company(): Prisma.CompanyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.resume`: Exposes CRUD operations for the **Resume** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Resumes
    * const resumes = await prisma.resume.findMany()
    * ```
    */
  get resume(): Prisma.ResumeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.application`: Exposes CRUD operations for the **Application** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Applications
    * const applications = await prisma.application.findMany()
    * ```
    */
  get application(): Prisma.ApplicationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.note`: Exposes CRUD operations for the **Note** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notes
    * const notes = await prisma.note.findMany()
    * ```
    */
  get note(): Prisma.NoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.actionHistory`: Exposes CRUD operations for the **ActionHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActionHistories
    * const actionHistories = await prisma.actionHistory.findMany()
    * ```
    */
  get actionHistory(): Prisma.ActionHistoryDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    CandidateProfile: 'CandidateProfile',
    CandidateCv: 'CandidateCv',
    CvExperience: 'CvExperience',
    CvSkill: 'CvSkill',
    CvTraining: 'CvTraining',
    Category: 'Category',
    Company: 'Company',
    Resume: 'Resume',
    Application: 'Application',
    Note: 'Note',
    ActionHistory: 'ActionHistory'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "candidateProfile" | "candidateCv" | "cvExperience" | "cvSkill" | "cvTraining" | "category" | "company" | "resume" | "application" | "note" | "actionHistory"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      CandidateProfile: {
        payload: Prisma.$CandidateProfilePayload<ExtArgs>
        fields: Prisma.CandidateProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CandidateProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidateProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CandidateProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidateProfilePayload>
          }
          findFirst: {
            args: Prisma.CandidateProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidateProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CandidateProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidateProfilePayload>
          }
          findMany: {
            args: Prisma.CandidateProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidateProfilePayload>[]
          }
          create: {
            args: Prisma.CandidateProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidateProfilePayload>
          }
          createMany: {
            args: Prisma.CandidateProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CandidateProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidateProfilePayload>[]
          }
          delete: {
            args: Prisma.CandidateProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidateProfilePayload>
          }
          update: {
            args: Prisma.CandidateProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidateProfilePayload>
          }
          deleteMany: {
            args: Prisma.CandidateProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CandidateProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CandidateProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidateProfilePayload>[]
          }
          upsert: {
            args: Prisma.CandidateProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidateProfilePayload>
          }
          aggregate: {
            args: Prisma.CandidateProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCandidateProfile>
          }
          groupBy: {
            args: Prisma.CandidateProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<CandidateProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.CandidateProfileCountArgs<ExtArgs>
            result: $Utils.Optional<CandidateProfileCountAggregateOutputType> | number
          }
        }
      }
      CandidateCv: {
        payload: Prisma.$CandidateCvPayload<ExtArgs>
        fields: Prisma.CandidateCvFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CandidateCvFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidateCvPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CandidateCvFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidateCvPayload>
          }
          findFirst: {
            args: Prisma.CandidateCvFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidateCvPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CandidateCvFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidateCvPayload>
          }
          findMany: {
            args: Prisma.CandidateCvFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidateCvPayload>[]
          }
          create: {
            args: Prisma.CandidateCvCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidateCvPayload>
          }
          createMany: {
            args: Prisma.CandidateCvCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CandidateCvCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidateCvPayload>[]
          }
          delete: {
            args: Prisma.CandidateCvDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidateCvPayload>
          }
          update: {
            args: Prisma.CandidateCvUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidateCvPayload>
          }
          deleteMany: {
            args: Prisma.CandidateCvDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CandidateCvUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CandidateCvUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidateCvPayload>[]
          }
          upsert: {
            args: Prisma.CandidateCvUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidateCvPayload>
          }
          aggregate: {
            args: Prisma.CandidateCvAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCandidateCv>
          }
          groupBy: {
            args: Prisma.CandidateCvGroupByArgs<ExtArgs>
            result: $Utils.Optional<CandidateCvGroupByOutputType>[]
          }
          count: {
            args: Prisma.CandidateCvCountArgs<ExtArgs>
            result: $Utils.Optional<CandidateCvCountAggregateOutputType> | number
          }
        }
      }
      CvExperience: {
        payload: Prisma.$CvExperiencePayload<ExtArgs>
        fields: Prisma.CvExperienceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CvExperienceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvExperiencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CvExperienceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvExperiencePayload>
          }
          findFirst: {
            args: Prisma.CvExperienceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvExperiencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CvExperienceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvExperiencePayload>
          }
          findMany: {
            args: Prisma.CvExperienceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvExperiencePayload>[]
          }
          create: {
            args: Prisma.CvExperienceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvExperiencePayload>
          }
          createMany: {
            args: Prisma.CvExperienceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CvExperienceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvExperiencePayload>[]
          }
          delete: {
            args: Prisma.CvExperienceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvExperiencePayload>
          }
          update: {
            args: Prisma.CvExperienceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvExperiencePayload>
          }
          deleteMany: {
            args: Prisma.CvExperienceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CvExperienceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CvExperienceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvExperiencePayload>[]
          }
          upsert: {
            args: Prisma.CvExperienceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvExperiencePayload>
          }
          aggregate: {
            args: Prisma.CvExperienceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCvExperience>
          }
          groupBy: {
            args: Prisma.CvExperienceGroupByArgs<ExtArgs>
            result: $Utils.Optional<CvExperienceGroupByOutputType>[]
          }
          count: {
            args: Prisma.CvExperienceCountArgs<ExtArgs>
            result: $Utils.Optional<CvExperienceCountAggregateOutputType> | number
          }
        }
      }
      CvSkill: {
        payload: Prisma.$CvSkillPayload<ExtArgs>
        fields: Prisma.CvSkillFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CvSkillFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvSkillPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CvSkillFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvSkillPayload>
          }
          findFirst: {
            args: Prisma.CvSkillFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvSkillPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CvSkillFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvSkillPayload>
          }
          findMany: {
            args: Prisma.CvSkillFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvSkillPayload>[]
          }
          create: {
            args: Prisma.CvSkillCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvSkillPayload>
          }
          createMany: {
            args: Prisma.CvSkillCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CvSkillCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvSkillPayload>[]
          }
          delete: {
            args: Prisma.CvSkillDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvSkillPayload>
          }
          update: {
            args: Prisma.CvSkillUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvSkillPayload>
          }
          deleteMany: {
            args: Prisma.CvSkillDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CvSkillUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CvSkillUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvSkillPayload>[]
          }
          upsert: {
            args: Prisma.CvSkillUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvSkillPayload>
          }
          aggregate: {
            args: Prisma.CvSkillAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCvSkill>
          }
          groupBy: {
            args: Prisma.CvSkillGroupByArgs<ExtArgs>
            result: $Utils.Optional<CvSkillGroupByOutputType>[]
          }
          count: {
            args: Prisma.CvSkillCountArgs<ExtArgs>
            result: $Utils.Optional<CvSkillCountAggregateOutputType> | number
          }
        }
      }
      CvTraining: {
        payload: Prisma.$CvTrainingPayload<ExtArgs>
        fields: Prisma.CvTrainingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CvTrainingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvTrainingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CvTrainingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvTrainingPayload>
          }
          findFirst: {
            args: Prisma.CvTrainingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvTrainingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CvTrainingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvTrainingPayload>
          }
          findMany: {
            args: Prisma.CvTrainingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvTrainingPayload>[]
          }
          create: {
            args: Prisma.CvTrainingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvTrainingPayload>
          }
          createMany: {
            args: Prisma.CvTrainingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CvTrainingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvTrainingPayload>[]
          }
          delete: {
            args: Prisma.CvTrainingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvTrainingPayload>
          }
          update: {
            args: Prisma.CvTrainingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvTrainingPayload>
          }
          deleteMany: {
            args: Prisma.CvTrainingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CvTrainingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CvTrainingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvTrainingPayload>[]
          }
          upsert: {
            args: Prisma.CvTrainingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvTrainingPayload>
          }
          aggregate: {
            args: Prisma.CvTrainingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCvTraining>
          }
          groupBy: {
            args: Prisma.CvTrainingGroupByArgs<ExtArgs>
            result: $Utils.Optional<CvTrainingGroupByOutputType>[]
          }
          count: {
            args: Prisma.CvTrainingCountArgs<ExtArgs>
            result: $Utils.Optional<CvTrainingCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Company: {
        payload: Prisma.$CompanyPayload<ExtArgs>
        fields: Prisma.CompanyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findFirst: {
            args: Prisma.CompanyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findMany: {
            args: Prisma.CompanyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          create: {
            args: Prisma.CompanyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          createMany: {
            args: Prisma.CompanyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          delete: {
            args: Prisma.CompanyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          update: {
            args: Prisma.CompanyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          deleteMany: {
            args: Prisma.CompanyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompanyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          upsert: {
            args: Prisma.CompanyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          aggregate: {
            args: Prisma.CompanyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompany>
          }
          groupBy: {
            args: Prisma.CompanyGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyCountAggregateOutputType> | number
          }
        }
      }
      Resume: {
        payload: Prisma.$ResumePayload<ExtArgs>
        fields: Prisma.ResumeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResumeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResumeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          findFirst: {
            args: Prisma.ResumeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResumeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          findMany: {
            args: Prisma.ResumeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>[]
          }
          create: {
            args: Prisma.ResumeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          createMany: {
            args: Prisma.ResumeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResumeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>[]
          }
          delete: {
            args: Prisma.ResumeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          update: {
            args: Prisma.ResumeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          deleteMany: {
            args: Prisma.ResumeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResumeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResumeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>[]
          }
          upsert: {
            args: Prisma.ResumeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          aggregate: {
            args: Prisma.ResumeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResume>
          }
          groupBy: {
            args: Prisma.ResumeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResumeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResumeCountArgs<ExtArgs>
            result: $Utils.Optional<ResumeCountAggregateOutputType> | number
          }
        }
      }
      Application: {
        payload: Prisma.$ApplicationPayload<ExtArgs>
        fields: Prisma.ApplicationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApplicationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApplicationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          findFirst: {
            args: Prisma.ApplicationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApplicationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          findMany: {
            args: Prisma.ApplicationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>[]
          }
          create: {
            args: Prisma.ApplicationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          createMany: {
            args: Prisma.ApplicationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApplicationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>[]
          }
          delete: {
            args: Prisma.ApplicationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          update: {
            args: Prisma.ApplicationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          deleteMany: {
            args: Prisma.ApplicationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApplicationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ApplicationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>[]
          }
          upsert: {
            args: Prisma.ApplicationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          aggregate: {
            args: Prisma.ApplicationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApplication>
          }
          groupBy: {
            args: Prisma.ApplicationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApplicationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApplicationCountArgs<ExtArgs>
            result: $Utils.Optional<ApplicationCountAggregateOutputType> | number
          }
        }
      }
      Note: {
        payload: Prisma.$NotePayload<ExtArgs>
        fields: Prisma.NoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          findFirst: {
            args: Prisma.NoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          findMany: {
            args: Prisma.NoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>[]
          }
          create: {
            args: Prisma.NoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          createMany: {
            args: Prisma.NoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>[]
          }
          delete: {
            args: Prisma.NoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          update: {
            args: Prisma.NoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          deleteMany: {
            args: Prisma.NoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>[]
          }
          upsert: {
            args: Prisma.NoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          aggregate: {
            args: Prisma.NoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNote>
          }
          groupBy: {
            args: Prisma.NoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<NoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.NoteCountArgs<ExtArgs>
            result: $Utils.Optional<NoteCountAggregateOutputType> | number
          }
        }
      }
      ActionHistory: {
        payload: Prisma.$ActionHistoryPayload<ExtArgs>
        fields: Prisma.ActionHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActionHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActionHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionHistoryPayload>
          }
          findFirst: {
            args: Prisma.ActionHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActionHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionHistoryPayload>
          }
          findMany: {
            args: Prisma.ActionHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionHistoryPayload>[]
          }
          create: {
            args: Prisma.ActionHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionHistoryPayload>
          }
          createMany: {
            args: Prisma.ActionHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActionHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionHistoryPayload>[]
          }
          delete: {
            args: Prisma.ActionHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionHistoryPayload>
          }
          update: {
            args: Prisma.ActionHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionHistoryPayload>
          }
          deleteMany: {
            args: Prisma.ActionHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActionHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActionHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionHistoryPayload>[]
          }
          upsert: {
            args: Prisma.ActionHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionHistoryPayload>
          }
          aggregate: {
            args: Prisma.ActionHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActionHistory>
          }
          groupBy: {
            args: Prisma.ActionHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActionHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActionHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<ActionHistoryCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    candidateProfile?: CandidateProfileOmit
    candidateCv?: CandidateCvOmit
    cvExperience?: CvExperienceOmit
    cvSkill?: CvSkillOmit
    cvTraining?: CvTrainingOmit
    category?: CategoryOmit
    company?: CompanyOmit
    resume?: ResumeOmit
    application?: ApplicationOmit
    note?: NoteOmit
    actionHistory?: ActionHistoryOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    categories: number
    companies: number
    resumes: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categories?: boolean | UserCountOutputTypeCountCategoriesArgs
    companies?: boolean | UserCountOutputTypeCountCompaniesArgs
    resumes?: boolean | UserCountOutputTypeCountResumesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCompaniesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountResumesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResumeWhereInput
  }


  /**
   * Count Type CandidateProfileCountOutputType
   */

  export type CandidateProfileCountOutputType = {
    cvs: number
  }

  export type CandidateProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cvs?: boolean | CandidateProfileCountOutputTypeCountCvsArgs
  }

  // Custom InputTypes
  /**
   * CandidateProfileCountOutputType without action
   */
  export type CandidateProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateProfileCountOutputType
     */
    select?: CandidateProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CandidateProfileCountOutputType without action
   */
  export type CandidateProfileCountOutputTypeCountCvsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CandidateCvWhereInput
  }


  /**
   * Count Type CandidateCvCountOutputType
   */

  export type CandidateCvCountOutputType = {
    cvExperiences: number
    cvSkills: number
    cvTrainings: number
  }

  export type CandidateCvCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cvExperiences?: boolean | CandidateCvCountOutputTypeCountCvExperiencesArgs
    cvSkills?: boolean | CandidateCvCountOutputTypeCountCvSkillsArgs
    cvTrainings?: boolean | CandidateCvCountOutputTypeCountCvTrainingsArgs
  }

  // Custom InputTypes
  /**
   * CandidateCvCountOutputType without action
   */
  export type CandidateCvCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateCvCountOutputType
     */
    select?: CandidateCvCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CandidateCvCountOutputType without action
   */
  export type CandidateCvCountOutputTypeCountCvExperiencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CvExperienceWhereInput
  }

  /**
   * CandidateCvCountOutputType without action
   */
  export type CandidateCvCountOutputTypeCountCvSkillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CvSkillWhereInput
  }

  /**
   * CandidateCvCountOutputType without action
   */
  export type CandidateCvCountOutputTypeCountCvTrainingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CvTrainingWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    companies: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    companies?: boolean | CategoryCountOutputTypeCountCompaniesArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountCompaniesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyWhereInput
  }


  /**
   * Count Type CompanyCountOutputType
   */

  export type CompanyCountOutputType = {
    applications: number
    notes: number
    actionHistory: number
  }

  export type CompanyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | CompanyCountOutputTypeCountApplicationsArgs
    notes?: boolean | CompanyCountOutputTypeCountNotesArgs
    actionHistory?: boolean | CompanyCountOutputTypeCountActionHistoryArgs
  }

  // Custom InputTypes
  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCountOutputType
     */
    select?: CompanyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NoteWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountActionHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActionHistoryWhereInput
  }


  /**
   * Count Type ResumeCountOutputType
   */

  export type ResumeCountOutputType = {
    applications: number
  }

  export type ResumeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | ResumeCountOutputTypeCountApplicationsArgs
  }

  // Custom InputTypes
  /**
   * ResumeCountOutputType without action
   */
  export type ResumeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeCountOutputType
     */
    select?: ResumeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ResumeCountOutputType without action
   */
  export type ResumeCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    firstname: string | null
    lastname: string | null
    email: string | null
    passwordHash: string | null
    passwordResetToken: string | null
    passwordResetExpiresAt: Date | null
    emailVerifiedAt: Date | null
    emailVerificationCode: string | null
    emailVerificationExpiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    firstname: string | null
    lastname: string | null
    email: string | null
    passwordHash: string | null
    passwordResetToken: string | null
    passwordResetExpiresAt: Date | null
    emailVerifiedAt: Date | null
    emailVerificationCode: string | null
    emailVerificationExpiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    firstname: number
    lastname: number
    email: number
    passwordHash: number
    passwordResetToken: number
    passwordResetExpiresAt: number
    emailVerifiedAt: number
    emailVerificationCode: number
    emailVerificationExpiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    firstname?: true
    lastname?: true
    email?: true
    passwordHash?: true
    passwordResetToken?: true
    passwordResetExpiresAt?: true
    emailVerifiedAt?: true
    emailVerificationCode?: true
    emailVerificationExpiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    firstname?: true
    lastname?: true
    email?: true
    passwordHash?: true
    passwordResetToken?: true
    passwordResetExpiresAt?: true
    emailVerifiedAt?: true
    emailVerificationCode?: true
    emailVerificationExpiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    firstname?: true
    lastname?: true
    email?: true
    passwordHash?: true
    passwordResetToken?: true
    passwordResetExpiresAt?: true
    emailVerifiedAt?: true
    emailVerificationCode?: true
    emailVerificationExpiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    firstname: string
    lastname: string
    email: string
    passwordHash: string
    passwordResetToken: string | null
    passwordResetExpiresAt: Date | null
    emailVerifiedAt: Date | null
    emailVerificationCode: string | null
    emailVerificationExpiresAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstname?: boolean
    lastname?: boolean
    email?: boolean
    passwordHash?: boolean
    passwordResetToken?: boolean
    passwordResetExpiresAt?: boolean
    emailVerifiedAt?: boolean
    emailVerificationCode?: boolean
    emailVerificationExpiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    categories?: boolean | User$categoriesArgs<ExtArgs>
    companies?: boolean | User$companiesArgs<ExtArgs>
    resumes?: boolean | User$resumesArgs<ExtArgs>
    candidateProfile?: boolean | User$candidateProfileArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstname?: boolean
    lastname?: boolean
    email?: boolean
    passwordHash?: boolean
    passwordResetToken?: boolean
    passwordResetExpiresAt?: boolean
    emailVerifiedAt?: boolean
    emailVerificationCode?: boolean
    emailVerificationExpiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstname?: boolean
    lastname?: boolean
    email?: boolean
    passwordHash?: boolean
    passwordResetToken?: boolean
    passwordResetExpiresAt?: boolean
    emailVerifiedAt?: boolean
    emailVerificationCode?: boolean
    emailVerificationExpiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    firstname?: boolean
    lastname?: boolean
    email?: boolean
    passwordHash?: boolean
    passwordResetToken?: boolean
    passwordResetExpiresAt?: boolean
    emailVerifiedAt?: boolean
    emailVerificationCode?: boolean
    emailVerificationExpiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstname" | "lastname" | "email" | "passwordHash" | "passwordResetToken" | "passwordResetExpiresAt" | "emailVerifiedAt" | "emailVerificationCode" | "emailVerificationExpiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categories?: boolean | User$categoriesArgs<ExtArgs>
    companies?: boolean | User$companiesArgs<ExtArgs>
    resumes?: boolean | User$resumesArgs<ExtArgs>
    candidateProfile?: boolean | User$candidateProfileArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      categories: Prisma.$CategoryPayload<ExtArgs>[]
      companies: Prisma.$CompanyPayload<ExtArgs>[]
      resumes: Prisma.$ResumePayload<ExtArgs>[]
      candidateProfile: Prisma.$CandidateProfilePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstname: string
      lastname: string
      email: string
      passwordHash: string
      passwordResetToken: string | null
      passwordResetExpiresAt: Date | null
      emailVerifiedAt: Date | null
      emailVerificationCode: string | null
      emailVerificationExpiresAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    categories<T extends User$categoriesArgs<ExtArgs> = {}>(args?: Subset<T, User$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    companies<T extends User$companiesArgs<ExtArgs> = {}>(args?: Subset<T, User$companiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    resumes<T extends User$resumesArgs<ExtArgs> = {}>(args?: Subset<T, User$resumesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    candidateProfile<T extends User$candidateProfileArgs<ExtArgs> = {}>(args?: Subset<T, User$candidateProfileArgs<ExtArgs>>): Prisma__CandidateProfileClient<$Result.GetResult<Prisma.$CandidateProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly firstname: FieldRef<"User", 'String'>
    readonly lastname: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly passwordResetToken: FieldRef<"User", 'String'>
    readonly passwordResetExpiresAt: FieldRef<"User", 'DateTime'>
    readonly emailVerifiedAt: FieldRef<"User", 'DateTime'>
    readonly emailVerificationCode: FieldRef<"User", 'String'>
    readonly emailVerificationExpiresAt: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.categories
   */
  export type User$categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    cursor?: CategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * User.companies
   */
  export type User$companiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    where?: CompanyWhereInput
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    cursor?: CompanyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * User.resumes
   */
  export type User$resumesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    where?: ResumeWhereInput
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    cursor?: ResumeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * User.candidateProfile
   */
  export type User$candidateProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateProfile
     */
    select?: CandidateProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CandidateProfile
     */
    omit?: CandidateProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateProfileInclude<ExtArgs> | null
    where?: CandidateProfileWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model CandidateProfile
   */

  export type AggregateCandidateProfile = {
    _count: CandidateProfileCountAggregateOutputType | null
    _min: CandidateProfileMinAggregateOutputType | null
    _max: CandidateProfileMaxAggregateOutputType | null
  }

  export type CandidateProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CandidateProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CandidateProfileCountAggregateOutputType = {
    id: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CandidateProfileMinAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CandidateProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CandidateProfileCountAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CandidateProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CandidateProfile to aggregate.
     */
    where?: CandidateProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CandidateProfiles to fetch.
     */
    orderBy?: CandidateProfileOrderByWithRelationInput | CandidateProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CandidateProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CandidateProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CandidateProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CandidateProfiles
    **/
    _count?: true | CandidateProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CandidateProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CandidateProfileMaxAggregateInputType
  }

  export type GetCandidateProfileAggregateType<T extends CandidateProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateCandidateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCandidateProfile[P]>
      : GetScalarType<T[P], AggregateCandidateProfile[P]>
  }




  export type CandidateProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CandidateProfileWhereInput
    orderBy?: CandidateProfileOrderByWithAggregationInput | CandidateProfileOrderByWithAggregationInput[]
    by: CandidateProfileScalarFieldEnum[] | CandidateProfileScalarFieldEnum
    having?: CandidateProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CandidateProfileCountAggregateInputType | true
    _min?: CandidateProfileMinAggregateInputType
    _max?: CandidateProfileMaxAggregateInputType
  }

  export type CandidateProfileGroupByOutputType = {
    id: string
    userId: string
    createdAt: Date
    updatedAt: Date
    _count: CandidateProfileCountAggregateOutputType | null
    _min: CandidateProfileMinAggregateOutputType | null
    _max: CandidateProfileMaxAggregateOutputType | null
  }

  type GetCandidateProfileGroupByPayload<T extends CandidateProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CandidateProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CandidateProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CandidateProfileGroupByOutputType[P]>
            : GetScalarType<T[P], CandidateProfileGroupByOutputType[P]>
        }
      >
    >


  export type CandidateProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    cvs?: boolean | CandidateProfile$cvsArgs<ExtArgs>
    _count?: boolean | CandidateProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["candidateProfile"]>

  export type CandidateProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["candidateProfile"]>

  export type CandidateProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["candidateProfile"]>

  export type CandidateProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CandidateProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["candidateProfile"]>
  export type CandidateProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    cvs?: boolean | CandidateProfile$cvsArgs<ExtArgs>
    _count?: boolean | CandidateProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CandidateProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CandidateProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CandidateProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CandidateProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      cvs: Prisma.$CandidateCvPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["candidateProfile"]>
    composites: {}
  }

  type CandidateProfileGetPayload<S extends boolean | null | undefined | CandidateProfileDefaultArgs> = $Result.GetResult<Prisma.$CandidateProfilePayload, S>

  type CandidateProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CandidateProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CandidateProfileCountAggregateInputType | true
    }

  export interface CandidateProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CandidateProfile'], meta: { name: 'CandidateProfile' } }
    /**
     * Find zero or one CandidateProfile that matches the filter.
     * @param {CandidateProfileFindUniqueArgs} args - Arguments to find a CandidateProfile
     * @example
     * // Get one CandidateProfile
     * const candidateProfile = await prisma.candidateProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CandidateProfileFindUniqueArgs>(args: SelectSubset<T, CandidateProfileFindUniqueArgs<ExtArgs>>): Prisma__CandidateProfileClient<$Result.GetResult<Prisma.$CandidateProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CandidateProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CandidateProfileFindUniqueOrThrowArgs} args - Arguments to find a CandidateProfile
     * @example
     * // Get one CandidateProfile
     * const candidateProfile = await prisma.candidateProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CandidateProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, CandidateProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CandidateProfileClient<$Result.GetResult<Prisma.$CandidateProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CandidateProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateProfileFindFirstArgs} args - Arguments to find a CandidateProfile
     * @example
     * // Get one CandidateProfile
     * const candidateProfile = await prisma.candidateProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CandidateProfileFindFirstArgs>(args?: SelectSubset<T, CandidateProfileFindFirstArgs<ExtArgs>>): Prisma__CandidateProfileClient<$Result.GetResult<Prisma.$CandidateProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CandidateProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateProfileFindFirstOrThrowArgs} args - Arguments to find a CandidateProfile
     * @example
     * // Get one CandidateProfile
     * const candidateProfile = await prisma.candidateProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CandidateProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, CandidateProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__CandidateProfileClient<$Result.GetResult<Prisma.$CandidateProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CandidateProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CandidateProfiles
     * const candidateProfiles = await prisma.candidateProfile.findMany()
     * 
     * // Get first 10 CandidateProfiles
     * const candidateProfiles = await prisma.candidateProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const candidateProfileWithIdOnly = await prisma.candidateProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CandidateProfileFindManyArgs>(args?: SelectSubset<T, CandidateProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandidateProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CandidateProfile.
     * @param {CandidateProfileCreateArgs} args - Arguments to create a CandidateProfile.
     * @example
     * // Create one CandidateProfile
     * const CandidateProfile = await prisma.candidateProfile.create({
     *   data: {
     *     // ... data to create a CandidateProfile
     *   }
     * })
     * 
     */
    create<T extends CandidateProfileCreateArgs>(args: SelectSubset<T, CandidateProfileCreateArgs<ExtArgs>>): Prisma__CandidateProfileClient<$Result.GetResult<Prisma.$CandidateProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CandidateProfiles.
     * @param {CandidateProfileCreateManyArgs} args - Arguments to create many CandidateProfiles.
     * @example
     * // Create many CandidateProfiles
     * const candidateProfile = await prisma.candidateProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CandidateProfileCreateManyArgs>(args?: SelectSubset<T, CandidateProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CandidateProfiles and returns the data saved in the database.
     * @param {CandidateProfileCreateManyAndReturnArgs} args - Arguments to create many CandidateProfiles.
     * @example
     * // Create many CandidateProfiles
     * const candidateProfile = await prisma.candidateProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CandidateProfiles and only return the `id`
     * const candidateProfileWithIdOnly = await prisma.candidateProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CandidateProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, CandidateProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandidateProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CandidateProfile.
     * @param {CandidateProfileDeleteArgs} args - Arguments to delete one CandidateProfile.
     * @example
     * // Delete one CandidateProfile
     * const CandidateProfile = await prisma.candidateProfile.delete({
     *   where: {
     *     // ... filter to delete one CandidateProfile
     *   }
     * })
     * 
     */
    delete<T extends CandidateProfileDeleteArgs>(args: SelectSubset<T, CandidateProfileDeleteArgs<ExtArgs>>): Prisma__CandidateProfileClient<$Result.GetResult<Prisma.$CandidateProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CandidateProfile.
     * @param {CandidateProfileUpdateArgs} args - Arguments to update one CandidateProfile.
     * @example
     * // Update one CandidateProfile
     * const candidateProfile = await prisma.candidateProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CandidateProfileUpdateArgs>(args: SelectSubset<T, CandidateProfileUpdateArgs<ExtArgs>>): Prisma__CandidateProfileClient<$Result.GetResult<Prisma.$CandidateProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CandidateProfiles.
     * @param {CandidateProfileDeleteManyArgs} args - Arguments to filter CandidateProfiles to delete.
     * @example
     * // Delete a few CandidateProfiles
     * const { count } = await prisma.candidateProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CandidateProfileDeleteManyArgs>(args?: SelectSubset<T, CandidateProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CandidateProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CandidateProfiles
     * const candidateProfile = await prisma.candidateProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CandidateProfileUpdateManyArgs>(args: SelectSubset<T, CandidateProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CandidateProfiles and returns the data updated in the database.
     * @param {CandidateProfileUpdateManyAndReturnArgs} args - Arguments to update many CandidateProfiles.
     * @example
     * // Update many CandidateProfiles
     * const candidateProfile = await prisma.candidateProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CandidateProfiles and only return the `id`
     * const candidateProfileWithIdOnly = await prisma.candidateProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CandidateProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, CandidateProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandidateProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CandidateProfile.
     * @param {CandidateProfileUpsertArgs} args - Arguments to update or create a CandidateProfile.
     * @example
     * // Update or create a CandidateProfile
     * const candidateProfile = await prisma.candidateProfile.upsert({
     *   create: {
     *     // ... data to create a CandidateProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CandidateProfile we want to update
     *   }
     * })
     */
    upsert<T extends CandidateProfileUpsertArgs>(args: SelectSubset<T, CandidateProfileUpsertArgs<ExtArgs>>): Prisma__CandidateProfileClient<$Result.GetResult<Prisma.$CandidateProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CandidateProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateProfileCountArgs} args - Arguments to filter CandidateProfiles to count.
     * @example
     * // Count the number of CandidateProfiles
     * const count = await prisma.candidateProfile.count({
     *   where: {
     *     // ... the filter for the CandidateProfiles we want to count
     *   }
     * })
    **/
    count<T extends CandidateProfileCountArgs>(
      args?: Subset<T, CandidateProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CandidateProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CandidateProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CandidateProfileAggregateArgs>(args: Subset<T, CandidateProfileAggregateArgs>): Prisma.PrismaPromise<GetCandidateProfileAggregateType<T>>

    /**
     * Group by CandidateProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CandidateProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CandidateProfileGroupByArgs['orderBy'] }
        : { orderBy?: CandidateProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CandidateProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCandidateProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CandidateProfile model
   */
  readonly fields: CandidateProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CandidateProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CandidateProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    cvs<T extends CandidateProfile$cvsArgs<ExtArgs> = {}>(args?: Subset<T, CandidateProfile$cvsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandidateCvPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CandidateProfile model
   */
  interface CandidateProfileFieldRefs {
    readonly id: FieldRef<"CandidateProfile", 'String'>
    readonly userId: FieldRef<"CandidateProfile", 'String'>
    readonly createdAt: FieldRef<"CandidateProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"CandidateProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CandidateProfile findUnique
   */
  export type CandidateProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateProfile
     */
    select?: CandidateProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CandidateProfile
     */
    omit?: CandidateProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateProfileInclude<ExtArgs> | null
    /**
     * Filter, which CandidateProfile to fetch.
     */
    where: CandidateProfileWhereUniqueInput
  }

  /**
   * CandidateProfile findUniqueOrThrow
   */
  export type CandidateProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateProfile
     */
    select?: CandidateProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CandidateProfile
     */
    omit?: CandidateProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateProfileInclude<ExtArgs> | null
    /**
     * Filter, which CandidateProfile to fetch.
     */
    where: CandidateProfileWhereUniqueInput
  }

  /**
   * CandidateProfile findFirst
   */
  export type CandidateProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateProfile
     */
    select?: CandidateProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CandidateProfile
     */
    omit?: CandidateProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateProfileInclude<ExtArgs> | null
    /**
     * Filter, which CandidateProfile to fetch.
     */
    where?: CandidateProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CandidateProfiles to fetch.
     */
    orderBy?: CandidateProfileOrderByWithRelationInput | CandidateProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CandidateProfiles.
     */
    cursor?: CandidateProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CandidateProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CandidateProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CandidateProfiles.
     */
    distinct?: CandidateProfileScalarFieldEnum | CandidateProfileScalarFieldEnum[]
  }

  /**
   * CandidateProfile findFirstOrThrow
   */
  export type CandidateProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateProfile
     */
    select?: CandidateProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CandidateProfile
     */
    omit?: CandidateProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateProfileInclude<ExtArgs> | null
    /**
     * Filter, which CandidateProfile to fetch.
     */
    where?: CandidateProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CandidateProfiles to fetch.
     */
    orderBy?: CandidateProfileOrderByWithRelationInput | CandidateProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CandidateProfiles.
     */
    cursor?: CandidateProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CandidateProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CandidateProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CandidateProfiles.
     */
    distinct?: CandidateProfileScalarFieldEnum | CandidateProfileScalarFieldEnum[]
  }

  /**
   * CandidateProfile findMany
   */
  export type CandidateProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateProfile
     */
    select?: CandidateProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CandidateProfile
     */
    omit?: CandidateProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateProfileInclude<ExtArgs> | null
    /**
     * Filter, which CandidateProfiles to fetch.
     */
    where?: CandidateProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CandidateProfiles to fetch.
     */
    orderBy?: CandidateProfileOrderByWithRelationInput | CandidateProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CandidateProfiles.
     */
    cursor?: CandidateProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CandidateProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CandidateProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CandidateProfiles.
     */
    distinct?: CandidateProfileScalarFieldEnum | CandidateProfileScalarFieldEnum[]
  }

  /**
   * CandidateProfile create
   */
  export type CandidateProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateProfile
     */
    select?: CandidateProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CandidateProfile
     */
    omit?: CandidateProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a CandidateProfile.
     */
    data: XOR<CandidateProfileCreateInput, CandidateProfileUncheckedCreateInput>
  }

  /**
   * CandidateProfile createMany
   */
  export type CandidateProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CandidateProfiles.
     */
    data: CandidateProfileCreateManyInput | CandidateProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CandidateProfile createManyAndReturn
   */
  export type CandidateProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateProfile
     */
    select?: CandidateProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CandidateProfile
     */
    omit?: CandidateProfileOmit<ExtArgs> | null
    /**
     * The data used to create many CandidateProfiles.
     */
    data: CandidateProfileCreateManyInput | CandidateProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CandidateProfile update
   */
  export type CandidateProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateProfile
     */
    select?: CandidateProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CandidateProfile
     */
    omit?: CandidateProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a CandidateProfile.
     */
    data: XOR<CandidateProfileUpdateInput, CandidateProfileUncheckedUpdateInput>
    /**
     * Choose, which CandidateProfile to update.
     */
    where: CandidateProfileWhereUniqueInput
  }

  /**
   * CandidateProfile updateMany
   */
  export type CandidateProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CandidateProfiles.
     */
    data: XOR<CandidateProfileUpdateManyMutationInput, CandidateProfileUncheckedUpdateManyInput>
    /**
     * Filter which CandidateProfiles to update
     */
    where?: CandidateProfileWhereInput
    /**
     * Limit how many CandidateProfiles to update.
     */
    limit?: number
  }

  /**
   * CandidateProfile updateManyAndReturn
   */
  export type CandidateProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateProfile
     */
    select?: CandidateProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CandidateProfile
     */
    omit?: CandidateProfileOmit<ExtArgs> | null
    /**
     * The data used to update CandidateProfiles.
     */
    data: XOR<CandidateProfileUpdateManyMutationInput, CandidateProfileUncheckedUpdateManyInput>
    /**
     * Filter which CandidateProfiles to update
     */
    where?: CandidateProfileWhereInput
    /**
     * Limit how many CandidateProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CandidateProfile upsert
   */
  export type CandidateProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateProfile
     */
    select?: CandidateProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CandidateProfile
     */
    omit?: CandidateProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the CandidateProfile to update in case it exists.
     */
    where: CandidateProfileWhereUniqueInput
    /**
     * In case the CandidateProfile found by the `where` argument doesn't exist, create a new CandidateProfile with this data.
     */
    create: XOR<CandidateProfileCreateInput, CandidateProfileUncheckedCreateInput>
    /**
     * In case the CandidateProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CandidateProfileUpdateInput, CandidateProfileUncheckedUpdateInput>
  }

  /**
   * CandidateProfile delete
   */
  export type CandidateProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateProfile
     */
    select?: CandidateProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CandidateProfile
     */
    omit?: CandidateProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateProfileInclude<ExtArgs> | null
    /**
     * Filter which CandidateProfile to delete.
     */
    where: CandidateProfileWhereUniqueInput
  }

  /**
   * CandidateProfile deleteMany
   */
  export type CandidateProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CandidateProfiles to delete
     */
    where?: CandidateProfileWhereInput
    /**
     * Limit how many CandidateProfiles to delete.
     */
    limit?: number
  }

  /**
   * CandidateProfile.cvs
   */
  export type CandidateProfile$cvsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateCv
     */
    select?: CandidateCvSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CandidateCv
     */
    omit?: CandidateCvOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateCvInclude<ExtArgs> | null
    where?: CandidateCvWhereInput
    orderBy?: CandidateCvOrderByWithRelationInput | CandidateCvOrderByWithRelationInput[]
    cursor?: CandidateCvWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CandidateCvScalarFieldEnum | CandidateCvScalarFieldEnum[]
  }

  /**
   * CandidateProfile without action
   */
  export type CandidateProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateProfile
     */
    select?: CandidateProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CandidateProfile
     */
    omit?: CandidateProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateProfileInclude<ExtArgs> | null
  }


  /**
   * Model CandidateCv
   */

  export type AggregateCandidateCv = {
    _count: CandidateCvCountAggregateOutputType | null
    _avg: CandidateCvAvgAggregateOutputType | null
    _sum: CandidateCvSumAggregateOutputType | null
    _min: CandidateCvMinAggregateOutputType | null
    _max: CandidateCvMaxAggregateOutputType | null
  }

  export type CandidateCvAvgAggregateOutputType = {
    fileSize: number | null
  }

  export type CandidateCvSumAggregateOutputType = {
    fileSize: number | null
  }

  export type CandidateCvMinAggregateOutputType = {
    id: string | null
    candidateProfileId: string | null
    label: string | null
    originalFilename: string | null
    storageFilename: string | null
    storageKey: string | null
    fileHash: string | null
    mimeType: string | null
    fileSize: number | null
    isDefault: boolean | null
    analysisStatus: $Enums.CandidateCvAnalysisStatus | null
    extractedText: string | null
    lastAnalyzedAt: Date | null
    uploadedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CandidateCvMaxAggregateOutputType = {
    id: string | null
    candidateProfileId: string | null
    label: string | null
    originalFilename: string | null
    storageFilename: string | null
    storageKey: string | null
    fileHash: string | null
    mimeType: string | null
    fileSize: number | null
    isDefault: boolean | null
    analysisStatus: $Enums.CandidateCvAnalysisStatus | null
    extractedText: string | null
    lastAnalyzedAt: Date | null
    uploadedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CandidateCvCountAggregateOutputType = {
    id: number
    candidateProfileId: number
    label: number
    originalFilename: number
    storageFilename: number
    storageKey: number
    fileHash: number
    mimeType: number
    fileSize: number
    isDefault: number
    analysisStatus: number
    extractedText: number
    lastAnalyzedAt: number
    uploadedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CandidateCvAvgAggregateInputType = {
    fileSize?: true
  }

  export type CandidateCvSumAggregateInputType = {
    fileSize?: true
  }

  export type CandidateCvMinAggregateInputType = {
    id?: true
    candidateProfileId?: true
    label?: true
    originalFilename?: true
    storageFilename?: true
    storageKey?: true
    fileHash?: true
    mimeType?: true
    fileSize?: true
    isDefault?: true
    analysisStatus?: true
    extractedText?: true
    lastAnalyzedAt?: true
    uploadedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CandidateCvMaxAggregateInputType = {
    id?: true
    candidateProfileId?: true
    label?: true
    originalFilename?: true
    storageFilename?: true
    storageKey?: true
    fileHash?: true
    mimeType?: true
    fileSize?: true
    isDefault?: true
    analysisStatus?: true
    extractedText?: true
    lastAnalyzedAt?: true
    uploadedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CandidateCvCountAggregateInputType = {
    id?: true
    candidateProfileId?: true
    label?: true
    originalFilename?: true
    storageFilename?: true
    storageKey?: true
    fileHash?: true
    mimeType?: true
    fileSize?: true
    isDefault?: true
    analysisStatus?: true
    extractedText?: true
    lastAnalyzedAt?: true
    uploadedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CandidateCvAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CandidateCv to aggregate.
     */
    where?: CandidateCvWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CandidateCvs to fetch.
     */
    orderBy?: CandidateCvOrderByWithRelationInput | CandidateCvOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CandidateCvWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CandidateCvs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CandidateCvs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CandidateCvs
    **/
    _count?: true | CandidateCvCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CandidateCvAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CandidateCvSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CandidateCvMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CandidateCvMaxAggregateInputType
  }

  export type GetCandidateCvAggregateType<T extends CandidateCvAggregateArgs> = {
        [P in keyof T & keyof AggregateCandidateCv]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCandidateCv[P]>
      : GetScalarType<T[P], AggregateCandidateCv[P]>
  }




  export type CandidateCvGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CandidateCvWhereInput
    orderBy?: CandidateCvOrderByWithAggregationInput | CandidateCvOrderByWithAggregationInput[]
    by: CandidateCvScalarFieldEnum[] | CandidateCvScalarFieldEnum
    having?: CandidateCvScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CandidateCvCountAggregateInputType | true
    _avg?: CandidateCvAvgAggregateInputType
    _sum?: CandidateCvSumAggregateInputType
    _min?: CandidateCvMinAggregateInputType
    _max?: CandidateCvMaxAggregateInputType
  }

  export type CandidateCvGroupByOutputType = {
    id: string
    candidateProfileId: string
    label: string
    originalFilename: string
    storageFilename: string
    storageKey: string
    fileHash: string | null
    mimeType: string
    fileSize: number
    isDefault: boolean
    analysisStatus: $Enums.CandidateCvAnalysisStatus
    extractedText: string | null
    lastAnalyzedAt: Date | null
    uploadedAt: Date
    createdAt: Date
    updatedAt: Date
    _count: CandidateCvCountAggregateOutputType | null
    _avg: CandidateCvAvgAggregateOutputType | null
    _sum: CandidateCvSumAggregateOutputType | null
    _min: CandidateCvMinAggregateOutputType | null
    _max: CandidateCvMaxAggregateOutputType | null
  }

  type GetCandidateCvGroupByPayload<T extends CandidateCvGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CandidateCvGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CandidateCvGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CandidateCvGroupByOutputType[P]>
            : GetScalarType<T[P], CandidateCvGroupByOutputType[P]>
        }
      >
    >


  export type CandidateCvSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    candidateProfileId?: boolean
    label?: boolean
    originalFilename?: boolean
    storageFilename?: boolean
    storageKey?: boolean
    fileHash?: boolean
    mimeType?: boolean
    fileSize?: boolean
    isDefault?: boolean
    analysisStatus?: boolean
    extractedText?: boolean
    lastAnalyzedAt?: boolean
    uploadedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    candidateProfile?: boolean | CandidateProfileDefaultArgs<ExtArgs>
    cvExperiences?: boolean | CandidateCv$cvExperiencesArgs<ExtArgs>
    cvSkills?: boolean | CandidateCv$cvSkillsArgs<ExtArgs>
    cvTrainings?: boolean | CandidateCv$cvTrainingsArgs<ExtArgs>
    _count?: boolean | CandidateCvCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["candidateCv"]>

  export type CandidateCvSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    candidateProfileId?: boolean
    label?: boolean
    originalFilename?: boolean
    storageFilename?: boolean
    storageKey?: boolean
    fileHash?: boolean
    mimeType?: boolean
    fileSize?: boolean
    isDefault?: boolean
    analysisStatus?: boolean
    extractedText?: boolean
    lastAnalyzedAt?: boolean
    uploadedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    candidateProfile?: boolean | CandidateProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["candidateCv"]>

  export type CandidateCvSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    candidateProfileId?: boolean
    label?: boolean
    originalFilename?: boolean
    storageFilename?: boolean
    storageKey?: boolean
    fileHash?: boolean
    mimeType?: boolean
    fileSize?: boolean
    isDefault?: boolean
    analysisStatus?: boolean
    extractedText?: boolean
    lastAnalyzedAt?: boolean
    uploadedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    candidateProfile?: boolean | CandidateProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["candidateCv"]>

  export type CandidateCvSelectScalar = {
    id?: boolean
    candidateProfileId?: boolean
    label?: boolean
    originalFilename?: boolean
    storageFilename?: boolean
    storageKey?: boolean
    fileHash?: boolean
    mimeType?: boolean
    fileSize?: boolean
    isDefault?: boolean
    analysisStatus?: boolean
    extractedText?: boolean
    lastAnalyzedAt?: boolean
    uploadedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CandidateCvOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "candidateProfileId" | "label" | "originalFilename" | "storageFilename" | "storageKey" | "fileHash" | "mimeType" | "fileSize" | "isDefault" | "analysisStatus" | "extractedText" | "lastAnalyzedAt" | "uploadedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["candidateCv"]>
  export type CandidateCvInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidateProfile?: boolean | CandidateProfileDefaultArgs<ExtArgs>
    cvExperiences?: boolean | CandidateCv$cvExperiencesArgs<ExtArgs>
    cvSkills?: boolean | CandidateCv$cvSkillsArgs<ExtArgs>
    cvTrainings?: boolean | CandidateCv$cvTrainingsArgs<ExtArgs>
    _count?: boolean | CandidateCvCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CandidateCvIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidateProfile?: boolean | CandidateProfileDefaultArgs<ExtArgs>
  }
  export type CandidateCvIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidateProfile?: boolean | CandidateProfileDefaultArgs<ExtArgs>
  }

  export type $CandidateCvPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CandidateCv"
    objects: {
      candidateProfile: Prisma.$CandidateProfilePayload<ExtArgs>
      cvExperiences: Prisma.$CvExperiencePayload<ExtArgs>[]
      cvSkills: Prisma.$CvSkillPayload<ExtArgs>[]
      cvTrainings: Prisma.$CvTrainingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      candidateProfileId: string
      label: string
      originalFilename: string
      storageFilename: string
      storageKey: string
      fileHash: string | null
      mimeType: string
      fileSize: number
      isDefault: boolean
      analysisStatus: $Enums.CandidateCvAnalysisStatus
      extractedText: string | null
      lastAnalyzedAt: Date | null
      uploadedAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["candidateCv"]>
    composites: {}
  }

  type CandidateCvGetPayload<S extends boolean | null | undefined | CandidateCvDefaultArgs> = $Result.GetResult<Prisma.$CandidateCvPayload, S>

  type CandidateCvCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CandidateCvFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CandidateCvCountAggregateInputType | true
    }

  export interface CandidateCvDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CandidateCv'], meta: { name: 'CandidateCv' } }
    /**
     * Find zero or one CandidateCv that matches the filter.
     * @param {CandidateCvFindUniqueArgs} args - Arguments to find a CandidateCv
     * @example
     * // Get one CandidateCv
     * const candidateCv = await prisma.candidateCv.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CandidateCvFindUniqueArgs>(args: SelectSubset<T, CandidateCvFindUniqueArgs<ExtArgs>>): Prisma__CandidateCvClient<$Result.GetResult<Prisma.$CandidateCvPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CandidateCv that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CandidateCvFindUniqueOrThrowArgs} args - Arguments to find a CandidateCv
     * @example
     * // Get one CandidateCv
     * const candidateCv = await prisma.candidateCv.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CandidateCvFindUniqueOrThrowArgs>(args: SelectSubset<T, CandidateCvFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CandidateCvClient<$Result.GetResult<Prisma.$CandidateCvPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CandidateCv that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateCvFindFirstArgs} args - Arguments to find a CandidateCv
     * @example
     * // Get one CandidateCv
     * const candidateCv = await prisma.candidateCv.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CandidateCvFindFirstArgs>(args?: SelectSubset<T, CandidateCvFindFirstArgs<ExtArgs>>): Prisma__CandidateCvClient<$Result.GetResult<Prisma.$CandidateCvPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CandidateCv that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateCvFindFirstOrThrowArgs} args - Arguments to find a CandidateCv
     * @example
     * // Get one CandidateCv
     * const candidateCv = await prisma.candidateCv.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CandidateCvFindFirstOrThrowArgs>(args?: SelectSubset<T, CandidateCvFindFirstOrThrowArgs<ExtArgs>>): Prisma__CandidateCvClient<$Result.GetResult<Prisma.$CandidateCvPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CandidateCvs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateCvFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CandidateCvs
     * const candidateCvs = await prisma.candidateCv.findMany()
     * 
     * // Get first 10 CandidateCvs
     * const candidateCvs = await prisma.candidateCv.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const candidateCvWithIdOnly = await prisma.candidateCv.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CandidateCvFindManyArgs>(args?: SelectSubset<T, CandidateCvFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandidateCvPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CandidateCv.
     * @param {CandidateCvCreateArgs} args - Arguments to create a CandidateCv.
     * @example
     * // Create one CandidateCv
     * const CandidateCv = await prisma.candidateCv.create({
     *   data: {
     *     // ... data to create a CandidateCv
     *   }
     * })
     * 
     */
    create<T extends CandidateCvCreateArgs>(args: SelectSubset<T, CandidateCvCreateArgs<ExtArgs>>): Prisma__CandidateCvClient<$Result.GetResult<Prisma.$CandidateCvPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CandidateCvs.
     * @param {CandidateCvCreateManyArgs} args - Arguments to create many CandidateCvs.
     * @example
     * // Create many CandidateCvs
     * const candidateCv = await prisma.candidateCv.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CandidateCvCreateManyArgs>(args?: SelectSubset<T, CandidateCvCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CandidateCvs and returns the data saved in the database.
     * @param {CandidateCvCreateManyAndReturnArgs} args - Arguments to create many CandidateCvs.
     * @example
     * // Create many CandidateCvs
     * const candidateCv = await prisma.candidateCv.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CandidateCvs and only return the `id`
     * const candidateCvWithIdOnly = await prisma.candidateCv.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CandidateCvCreateManyAndReturnArgs>(args?: SelectSubset<T, CandidateCvCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandidateCvPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CandidateCv.
     * @param {CandidateCvDeleteArgs} args - Arguments to delete one CandidateCv.
     * @example
     * // Delete one CandidateCv
     * const CandidateCv = await prisma.candidateCv.delete({
     *   where: {
     *     // ... filter to delete one CandidateCv
     *   }
     * })
     * 
     */
    delete<T extends CandidateCvDeleteArgs>(args: SelectSubset<T, CandidateCvDeleteArgs<ExtArgs>>): Prisma__CandidateCvClient<$Result.GetResult<Prisma.$CandidateCvPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CandidateCv.
     * @param {CandidateCvUpdateArgs} args - Arguments to update one CandidateCv.
     * @example
     * // Update one CandidateCv
     * const candidateCv = await prisma.candidateCv.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CandidateCvUpdateArgs>(args: SelectSubset<T, CandidateCvUpdateArgs<ExtArgs>>): Prisma__CandidateCvClient<$Result.GetResult<Prisma.$CandidateCvPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CandidateCvs.
     * @param {CandidateCvDeleteManyArgs} args - Arguments to filter CandidateCvs to delete.
     * @example
     * // Delete a few CandidateCvs
     * const { count } = await prisma.candidateCv.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CandidateCvDeleteManyArgs>(args?: SelectSubset<T, CandidateCvDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CandidateCvs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateCvUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CandidateCvs
     * const candidateCv = await prisma.candidateCv.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CandidateCvUpdateManyArgs>(args: SelectSubset<T, CandidateCvUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CandidateCvs and returns the data updated in the database.
     * @param {CandidateCvUpdateManyAndReturnArgs} args - Arguments to update many CandidateCvs.
     * @example
     * // Update many CandidateCvs
     * const candidateCv = await prisma.candidateCv.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CandidateCvs and only return the `id`
     * const candidateCvWithIdOnly = await prisma.candidateCv.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CandidateCvUpdateManyAndReturnArgs>(args: SelectSubset<T, CandidateCvUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandidateCvPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CandidateCv.
     * @param {CandidateCvUpsertArgs} args - Arguments to update or create a CandidateCv.
     * @example
     * // Update or create a CandidateCv
     * const candidateCv = await prisma.candidateCv.upsert({
     *   create: {
     *     // ... data to create a CandidateCv
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CandidateCv we want to update
     *   }
     * })
     */
    upsert<T extends CandidateCvUpsertArgs>(args: SelectSubset<T, CandidateCvUpsertArgs<ExtArgs>>): Prisma__CandidateCvClient<$Result.GetResult<Prisma.$CandidateCvPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CandidateCvs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateCvCountArgs} args - Arguments to filter CandidateCvs to count.
     * @example
     * // Count the number of CandidateCvs
     * const count = await prisma.candidateCv.count({
     *   where: {
     *     // ... the filter for the CandidateCvs we want to count
     *   }
     * })
    **/
    count<T extends CandidateCvCountArgs>(
      args?: Subset<T, CandidateCvCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CandidateCvCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CandidateCv.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateCvAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CandidateCvAggregateArgs>(args: Subset<T, CandidateCvAggregateArgs>): Prisma.PrismaPromise<GetCandidateCvAggregateType<T>>

    /**
     * Group by CandidateCv.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateCvGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CandidateCvGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CandidateCvGroupByArgs['orderBy'] }
        : { orderBy?: CandidateCvGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CandidateCvGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCandidateCvGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CandidateCv model
   */
  readonly fields: CandidateCvFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CandidateCv.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CandidateCvClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    candidateProfile<T extends CandidateProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CandidateProfileDefaultArgs<ExtArgs>>): Prisma__CandidateProfileClient<$Result.GetResult<Prisma.$CandidateProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    cvExperiences<T extends CandidateCv$cvExperiencesArgs<ExtArgs> = {}>(args?: Subset<T, CandidateCv$cvExperiencesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CvExperiencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    cvSkills<T extends CandidateCv$cvSkillsArgs<ExtArgs> = {}>(args?: Subset<T, CandidateCv$cvSkillsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CvSkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    cvTrainings<T extends CandidateCv$cvTrainingsArgs<ExtArgs> = {}>(args?: Subset<T, CandidateCv$cvTrainingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CvTrainingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CandidateCv model
   */
  interface CandidateCvFieldRefs {
    readonly id: FieldRef<"CandidateCv", 'String'>
    readonly candidateProfileId: FieldRef<"CandidateCv", 'String'>
    readonly label: FieldRef<"CandidateCv", 'String'>
    readonly originalFilename: FieldRef<"CandidateCv", 'String'>
    readonly storageFilename: FieldRef<"CandidateCv", 'String'>
    readonly storageKey: FieldRef<"CandidateCv", 'String'>
    readonly fileHash: FieldRef<"CandidateCv", 'String'>
    readonly mimeType: FieldRef<"CandidateCv", 'String'>
    readonly fileSize: FieldRef<"CandidateCv", 'Int'>
    readonly isDefault: FieldRef<"CandidateCv", 'Boolean'>
    readonly analysisStatus: FieldRef<"CandidateCv", 'CandidateCvAnalysisStatus'>
    readonly extractedText: FieldRef<"CandidateCv", 'String'>
    readonly lastAnalyzedAt: FieldRef<"CandidateCv", 'DateTime'>
    readonly uploadedAt: FieldRef<"CandidateCv", 'DateTime'>
    readonly createdAt: FieldRef<"CandidateCv", 'DateTime'>
    readonly updatedAt: FieldRef<"CandidateCv", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CandidateCv findUnique
   */
  export type CandidateCvFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateCv
     */
    select?: CandidateCvSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CandidateCv
     */
    omit?: CandidateCvOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateCvInclude<ExtArgs> | null
    /**
     * Filter, which CandidateCv to fetch.
     */
    where: CandidateCvWhereUniqueInput
  }

  /**
   * CandidateCv findUniqueOrThrow
   */
  export type CandidateCvFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateCv
     */
    select?: CandidateCvSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CandidateCv
     */
    omit?: CandidateCvOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateCvInclude<ExtArgs> | null
    /**
     * Filter, which CandidateCv to fetch.
     */
    where: CandidateCvWhereUniqueInput
  }

  /**
   * CandidateCv findFirst
   */
  export type CandidateCvFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateCv
     */
    select?: CandidateCvSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CandidateCv
     */
    omit?: CandidateCvOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateCvInclude<ExtArgs> | null
    /**
     * Filter, which CandidateCv to fetch.
     */
    where?: CandidateCvWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CandidateCvs to fetch.
     */
    orderBy?: CandidateCvOrderByWithRelationInput | CandidateCvOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CandidateCvs.
     */
    cursor?: CandidateCvWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CandidateCvs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CandidateCvs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CandidateCvs.
     */
    distinct?: CandidateCvScalarFieldEnum | CandidateCvScalarFieldEnum[]
  }

  /**
   * CandidateCv findFirstOrThrow
   */
  export type CandidateCvFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateCv
     */
    select?: CandidateCvSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CandidateCv
     */
    omit?: CandidateCvOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateCvInclude<ExtArgs> | null
    /**
     * Filter, which CandidateCv to fetch.
     */
    where?: CandidateCvWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CandidateCvs to fetch.
     */
    orderBy?: CandidateCvOrderByWithRelationInput | CandidateCvOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CandidateCvs.
     */
    cursor?: CandidateCvWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CandidateCvs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CandidateCvs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CandidateCvs.
     */
    distinct?: CandidateCvScalarFieldEnum | CandidateCvScalarFieldEnum[]
  }

  /**
   * CandidateCv findMany
   */
  export type CandidateCvFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateCv
     */
    select?: CandidateCvSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CandidateCv
     */
    omit?: CandidateCvOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateCvInclude<ExtArgs> | null
    /**
     * Filter, which CandidateCvs to fetch.
     */
    where?: CandidateCvWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CandidateCvs to fetch.
     */
    orderBy?: CandidateCvOrderByWithRelationInput | CandidateCvOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CandidateCvs.
     */
    cursor?: CandidateCvWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CandidateCvs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CandidateCvs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CandidateCvs.
     */
    distinct?: CandidateCvScalarFieldEnum | CandidateCvScalarFieldEnum[]
  }

  /**
   * CandidateCv create
   */
  export type CandidateCvCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateCv
     */
    select?: CandidateCvSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CandidateCv
     */
    omit?: CandidateCvOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateCvInclude<ExtArgs> | null
    /**
     * The data needed to create a CandidateCv.
     */
    data: XOR<CandidateCvCreateInput, CandidateCvUncheckedCreateInput>
  }

  /**
   * CandidateCv createMany
   */
  export type CandidateCvCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CandidateCvs.
     */
    data: CandidateCvCreateManyInput | CandidateCvCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CandidateCv createManyAndReturn
   */
  export type CandidateCvCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateCv
     */
    select?: CandidateCvSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CandidateCv
     */
    omit?: CandidateCvOmit<ExtArgs> | null
    /**
     * The data used to create many CandidateCvs.
     */
    data: CandidateCvCreateManyInput | CandidateCvCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateCvIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CandidateCv update
   */
  export type CandidateCvUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateCv
     */
    select?: CandidateCvSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CandidateCv
     */
    omit?: CandidateCvOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateCvInclude<ExtArgs> | null
    /**
     * The data needed to update a CandidateCv.
     */
    data: XOR<CandidateCvUpdateInput, CandidateCvUncheckedUpdateInput>
    /**
     * Choose, which CandidateCv to update.
     */
    where: CandidateCvWhereUniqueInput
  }

  /**
   * CandidateCv updateMany
   */
  export type CandidateCvUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CandidateCvs.
     */
    data: XOR<CandidateCvUpdateManyMutationInput, CandidateCvUncheckedUpdateManyInput>
    /**
     * Filter which CandidateCvs to update
     */
    where?: CandidateCvWhereInput
    /**
     * Limit how many CandidateCvs to update.
     */
    limit?: number
  }

  /**
   * CandidateCv updateManyAndReturn
   */
  export type CandidateCvUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateCv
     */
    select?: CandidateCvSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CandidateCv
     */
    omit?: CandidateCvOmit<ExtArgs> | null
    /**
     * The data used to update CandidateCvs.
     */
    data: XOR<CandidateCvUpdateManyMutationInput, CandidateCvUncheckedUpdateManyInput>
    /**
     * Filter which CandidateCvs to update
     */
    where?: CandidateCvWhereInput
    /**
     * Limit how many CandidateCvs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateCvIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CandidateCv upsert
   */
  export type CandidateCvUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateCv
     */
    select?: CandidateCvSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CandidateCv
     */
    omit?: CandidateCvOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateCvInclude<ExtArgs> | null
    /**
     * The filter to search for the CandidateCv to update in case it exists.
     */
    where: CandidateCvWhereUniqueInput
    /**
     * In case the CandidateCv found by the `where` argument doesn't exist, create a new CandidateCv with this data.
     */
    create: XOR<CandidateCvCreateInput, CandidateCvUncheckedCreateInput>
    /**
     * In case the CandidateCv was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CandidateCvUpdateInput, CandidateCvUncheckedUpdateInput>
  }

  /**
   * CandidateCv delete
   */
  export type CandidateCvDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateCv
     */
    select?: CandidateCvSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CandidateCv
     */
    omit?: CandidateCvOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateCvInclude<ExtArgs> | null
    /**
     * Filter which CandidateCv to delete.
     */
    where: CandidateCvWhereUniqueInput
  }

  /**
   * CandidateCv deleteMany
   */
  export type CandidateCvDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CandidateCvs to delete
     */
    where?: CandidateCvWhereInput
    /**
     * Limit how many CandidateCvs to delete.
     */
    limit?: number
  }

  /**
   * CandidateCv.cvExperiences
   */
  export type CandidateCv$cvExperiencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvExperience
     */
    select?: CvExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvExperience
     */
    omit?: CvExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvExperienceInclude<ExtArgs> | null
    where?: CvExperienceWhereInput
    orderBy?: CvExperienceOrderByWithRelationInput | CvExperienceOrderByWithRelationInput[]
    cursor?: CvExperienceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CvExperienceScalarFieldEnum | CvExperienceScalarFieldEnum[]
  }

  /**
   * CandidateCv.cvSkills
   */
  export type CandidateCv$cvSkillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvSkill
     */
    select?: CvSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvSkill
     */
    omit?: CvSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvSkillInclude<ExtArgs> | null
    where?: CvSkillWhereInput
    orderBy?: CvSkillOrderByWithRelationInput | CvSkillOrderByWithRelationInput[]
    cursor?: CvSkillWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CvSkillScalarFieldEnum | CvSkillScalarFieldEnum[]
  }

  /**
   * CandidateCv.cvTrainings
   */
  export type CandidateCv$cvTrainingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvTraining
     */
    select?: CvTrainingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvTraining
     */
    omit?: CvTrainingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvTrainingInclude<ExtArgs> | null
    where?: CvTrainingWhereInput
    orderBy?: CvTrainingOrderByWithRelationInput | CvTrainingOrderByWithRelationInput[]
    cursor?: CvTrainingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CvTrainingScalarFieldEnum | CvTrainingScalarFieldEnum[]
  }

  /**
   * CandidateCv without action
   */
  export type CandidateCvDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateCv
     */
    select?: CandidateCvSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CandidateCv
     */
    omit?: CandidateCvOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateCvInclude<ExtArgs> | null
  }


  /**
   * Model CvExperience
   */

  export type AggregateCvExperience = {
    _count: CvExperienceCountAggregateOutputType | null
    _min: CvExperienceMinAggregateOutputType | null
    _max: CvExperienceMaxAggregateOutputType | null
  }

  export type CvExperienceMinAggregateOutputType = {
    id: string | null
    candidateCvId: string | null
    jobTitle: string | null
    companyName: string | null
    startDate: string | null
    endDate: string | null
    isCurrent: boolean | null
    location: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CvExperienceMaxAggregateOutputType = {
    id: string | null
    candidateCvId: string | null
    jobTitle: string | null
    companyName: string | null
    startDate: string | null
    endDate: string | null
    isCurrent: boolean | null
    location: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CvExperienceCountAggregateOutputType = {
    id: number
    candidateCvId: number
    jobTitle: number
    companyName: number
    startDate: number
    endDate: number
    isCurrent: number
    location: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CvExperienceMinAggregateInputType = {
    id?: true
    candidateCvId?: true
    jobTitle?: true
    companyName?: true
    startDate?: true
    endDate?: true
    isCurrent?: true
    location?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CvExperienceMaxAggregateInputType = {
    id?: true
    candidateCvId?: true
    jobTitle?: true
    companyName?: true
    startDate?: true
    endDate?: true
    isCurrent?: true
    location?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CvExperienceCountAggregateInputType = {
    id?: true
    candidateCvId?: true
    jobTitle?: true
    companyName?: true
    startDate?: true
    endDate?: true
    isCurrent?: true
    location?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CvExperienceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CvExperience to aggregate.
     */
    where?: CvExperienceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CvExperiences to fetch.
     */
    orderBy?: CvExperienceOrderByWithRelationInput | CvExperienceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CvExperienceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CvExperiences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CvExperiences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CvExperiences
    **/
    _count?: true | CvExperienceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CvExperienceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CvExperienceMaxAggregateInputType
  }

  export type GetCvExperienceAggregateType<T extends CvExperienceAggregateArgs> = {
        [P in keyof T & keyof AggregateCvExperience]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCvExperience[P]>
      : GetScalarType<T[P], AggregateCvExperience[P]>
  }




  export type CvExperienceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CvExperienceWhereInput
    orderBy?: CvExperienceOrderByWithAggregationInput | CvExperienceOrderByWithAggregationInput[]
    by: CvExperienceScalarFieldEnum[] | CvExperienceScalarFieldEnum
    having?: CvExperienceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CvExperienceCountAggregateInputType | true
    _min?: CvExperienceMinAggregateInputType
    _max?: CvExperienceMaxAggregateInputType
  }

  export type CvExperienceGroupByOutputType = {
    id: string
    candidateCvId: string
    jobTitle: string
    companyName: string | null
    startDate: string | null
    endDate: string | null
    isCurrent: boolean
    location: string | null
    description: string | null
    createdAt: Date
    updatedAt: Date
    _count: CvExperienceCountAggregateOutputType | null
    _min: CvExperienceMinAggregateOutputType | null
    _max: CvExperienceMaxAggregateOutputType | null
  }

  type GetCvExperienceGroupByPayload<T extends CvExperienceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CvExperienceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CvExperienceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CvExperienceGroupByOutputType[P]>
            : GetScalarType<T[P], CvExperienceGroupByOutputType[P]>
        }
      >
    >


  export type CvExperienceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    candidateCvId?: boolean
    jobTitle?: boolean
    companyName?: boolean
    startDate?: boolean
    endDate?: boolean
    isCurrent?: boolean
    location?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    candidateCv?: boolean | CandidateCvDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cvExperience"]>

  export type CvExperienceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    candidateCvId?: boolean
    jobTitle?: boolean
    companyName?: boolean
    startDate?: boolean
    endDate?: boolean
    isCurrent?: boolean
    location?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    candidateCv?: boolean | CandidateCvDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cvExperience"]>

  export type CvExperienceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    candidateCvId?: boolean
    jobTitle?: boolean
    companyName?: boolean
    startDate?: boolean
    endDate?: boolean
    isCurrent?: boolean
    location?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    candidateCv?: boolean | CandidateCvDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cvExperience"]>

  export type CvExperienceSelectScalar = {
    id?: boolean
    candidateCvId?: boolean
    jobTitle?: boolean
    companyName?: boolean
    startDate?: boolean
    endDate?: boolean
    isCurrent?: boolean
    location?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CvExperienceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "candidateCvId" | "jobTitle" | "companyName" | "startDate" | "endDate" | "isCurrent" | "location" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["cvExperience"]>
  export type CvExperienceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidateCv?: boolean | CandidateCvDefaultArgs<ExtArgs>
  }
  export type CvExperienceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidateCv?: boolean | CandidateCvDefaultArgs<ExtArgs>
  }
  export type CvExperienceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidateCv?: boolean | CandidateCvDefaultArgs<ExtArgs>
  }

  export type $CvExperiencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CvExperience"
    objects: {
      candidateCv: Prisma.$CandidateCvPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      candidateCvId: string
      jobTitle: string
      companyName: string | null
      startDate: string | null
      endDate: string | null
      isCurrent: boolean
      location: string | null
      description: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cvExperience"]>
    composites: {}
  }

  type CvExperienceGetPayload<S extends boolean | null | undefined | CvExperienceDefaultArgs> = $Result.GetResult<Prisma.$CvExperiencePayload, S>

  type CvExperienceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CvExperienceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CvExperienceCountAggregateInputType | true
    }

  export interface CvExperienceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CvExperience'], meta: { name: 'CvExperience' } }
    /**
     * Find zero or one CvExperience that matches the filter.
     * @param {CvExperienceFindUniqueArgs} args - Arguments to find a CvExperience
     * @example
     * // Get one CvExperience
     * const cvExperience = await prisma.cvExperience.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CvExperienceFindUniqueArgs>(args: SelectSubset<T, CvExperienceFindUniqueArgs<ExtArgs>>): Prisma__CvExperienceClient<$Result.GetResult<Prisma.$CvExperiencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CvExperience that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CvExperienceFindUniqueOrThrowArgs} args - Arguments to find a CvExperience
     * @example
     * // Get one CvExperience
     * const cvExperience = await prisma.cvExperience.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CvExperienceFindUniqueOrThrowArgs>(args: SelectSubset<T, CvExperienceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CvExperienceClient<$Result.GetResult<Prisma.$CvExperiencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CvExperience that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvExperienceFindFirstArgs} args - Arguments to find a CvExperience
     * @example
     * // Get one CvExperience
     * const cvExperience = await prisma.cvExperience.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CvExperienceFindFirstArgs>(args?: SelectSubset<T, CvExperienceFindFirstArgs<ExtArgs>>): Prisma__CvExperienceClient<$Result.GetResult<Prisma.$CvExperiencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CvExperience that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvExperienceFindFirstOrThrowArgs} args - Arguments to find a CvExperience
     * @example
     * // Get one CvExperience
     * const cvExperience = await prisma.cvExperience.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CvExperienceFindFirstOrThrowArgs>(args?: SelectSubset<T, CvExperienceFindFirstOrThrowArgs<ExtArgs>>): Prisma__CvExperienceClient<$Result.GetResult<Prisma.$CvExperiencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CvExperiences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvExperienceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CvExperiences
     * const cvExperiences = await prisma.cvExperience.findMany()
     * 
     * // Get first 10 CvExperiences
     * const cvExperiences = await prisma.cvExperience.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cvExperienceWithIdOnly = await prisma.cvExperience.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CvExperienceFindManyArgs>(args?: SelectSubset<T, CvExperienceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CvExperiencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CvExperience.
     * @param {CvExperienceCreateArgs} args - Arguments to create a CvExperience.
     * @example
     * // Create one CvExperience
     * const CvExperience = await prisma.cvExperience.create({
     *   data: {
     *     // ... data to create a CvExperience
     *   }
     * })
     * 
     */
    create<T extends CvExperienceCreateArgs>(args: SelectSubset<T, CvExperienceCreateArgs<ExtArgs>>): Prisma__CvExperienceClient<$Result.GetResult<Prisma.$CvExperiencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CvExperiences.
     * @param {CvExperienceCreateManyArgs} args - Arguments to create many CvExperiences.
     * @example
     * // Create many CvExperiences
     * const cvExperience = await prisma.cvExperience.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CvExperienceCreateManyArgs>(args?: SelectSubset<T, CvExperienceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CvExperiences and returns the data saved in the database.
     * @param {CvExperienceCreateManyAndReturnArgs} args - Arguments to create many CvExperiences.
     * @example
     * // Create many CvExperiences
     * const cvExperience = await prisma.cvExperience.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CvExperiences and only return the `id`
     * const cvExperienceWithIdOnly = await prisma.cvExperience.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CvExperienceCreateManyAndReturnArgs>(args?: SelectSubset<T, CvExperienceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CvExperiencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CvExperience.
     * @param {CvExperienceDeleteArgs} args - Arguments to delete one CvExperience.
     * @example
     * // Delete one CvExperience
     * const CvExperience = await prisma.cvExperience.delete({
     *   where: {
     *     // ... filter to delete one CvExperience
     *   }
     * })
     * 
     */
    delete<T extends CvExperienceDeleteArgs>(args: SelectSubset<T, CvExperienceDeleteArgs<ExtArgs>>): Prisma__CvExperienceClient<$Result.GetResult<Prisma.$CvExperiencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CvExperience.
     * @param {CvExperienceUpdateArgs} args - Arguments to update one CvExperience.
     * @example
     * // Update one CvExperience
     * const cvExperience = await prisma.cvExperience.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CvExperienceUpdateArgs>(args: SelectSubset<T, CvExperienceUpdateArgs<ExtArgs>>): Prisma__CvExperienceClient<$Result.GetResult<Prisma.$CvExperiencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CvExperiences.
     * @param {CvExperienceDeleteManyArgs} args - Arguments to filter CvExperiences to delete.
     * @example
     * // Delete a few CvExperiences
     * const { count } = await prisma.cvExperience.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CvExperienceDeleteManyArgs>(args?: SelectSubset<T, CvExperienceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CvExperiences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvExperienceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CvExperiences
     * const cvExperience = await prisma.cvExperience.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CvExperienceUpdateManyArgs>(args: SelectSubset<T, CvExperienceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CvExperiences and returns the data updated in the database.
     * @param {CvExperienceUpdateManyAndReturnArgs} args - Arguments to update many CvExperiences.
     * @example
     * // Update many CvExperiences
     * const cvExperience = await prisma.cvExperience.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CvExperiences and only return the `id`
     * const cvExperienceWithIdOnly = await prisma.cvExperience.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CvExperienceUpdateManyAndReturnArgs>(args: SelectSubset<T, CvExperienceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CvExperiencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CvExperience.
     * @param {CvExperienceUpsertArgs} args - Arguments to update or create a CvExperience.
     * @example
     * // Update or create a CvExperience
     * const cvExperience = await prisma.cvExperience.upsert({
     *   create: {
     *     // ... data to create a CvExperience
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CvExperience we want to update
     *   }
     * })
     */
    upsert<T extends CvExperienceUpsertArgs>(args: SelectSubset<T, CvExperienceUpsertArgs<ExtArgs>>): Prisma__CvExperienceClient<$Result.GetResult<Prisma.$CvExperiencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CvExperiences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvExperienceCountArgs} args - Arguments to filter CvExperiences to count.
     * @example
     * // Count the number of CvExperiences
     * const count = await prisma.cvExperience.count({
     *   where: {
     *     // ... the filter for the CvExperiences we want to count
     *   }
     * })
    **/
    count<T extends CvExperienceCountArgs>(
      args?: Subset<T, CvExperienceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CvExperienceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CvExperience.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvExperienceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CvExperienceAggregateArgs>(args: Subset<T, CvExperienceAggregateArgs>): Prisma.PrismaPromise<GetCvExperienceAggregateType<T>>

    /**
     * Group by CvExperience.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvExperienceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CvExperienceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CvExperienceGroupByArgs['orderBy'] }
        : { orderBy?: CvExperienceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CvExperienceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCvExperienceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CvExperience model
   */
  readonly fields: CvExperienceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CvExperience.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CvExperienceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    candidateCv<T extends CandidateCvDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CandidateCvDefaultArgs<ExtArgs>>): Prisma__CandidateCvClient<$Result.GetResult<Prisma.$CandidateCvPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CvExperience model
   */
  interface CvExperienceFieldRefs {
    readonly id: FieldRef<"CvExperience", 'String'>
    readonly candidateCvId: FieldRef<"CvExperience", 'String'>
    readonly jobTitle: FieldRef<"CvExperience", 'String'>
    readonly companyName: FieldRef<"CvExperience", 'String'>
    readonly startDate: FieldRef<"CvExperience", 'String'>
    readonly endDate: FieldRef<"CvExperience", 'String'>
    readonly isCurrent: FieldRef<"CvExperience", 'Boolean'>
    readonly location: FieldRef<"CvExperience", 'String'>
    readonly description: FieldRef<"CvExperience", 'String'>
    readonly createdAt: FieldRef<"CvExperience", 'DateTime'>
    readonly updatedAt: FieldRef<"CvExperience", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CvExperience findUnique
   */
  export type CvExperienceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvExperience
     */
    select?: CvExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvExperience
     */
    omit?: CvExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvExperienceInclude<ExtArgs> | null
    /**
     * Filter, which CvExperience to fetch.
     */
    where: CvExperienceWhereUniqueInput
  }

  /**
   * CvExperience findUniqueOrThrow
   */
  export type CvExperienceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvExperience
     */
    select?: CvExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvExperience
     */
    omit?: CvExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvExperienceInclude<ExtArgs> | null
    /**
     * Filter, which CvExperience to fetch.
     */
    where: CvExperienceWhereUniqueInput
  }

  /**
   * CvExperience findFirst
   */
  export type CvExperienceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvExperience
     */
    select?: CvExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvExperience
     */
    omit?: CvExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvExperienceInclude<ExtArgs> | null
    /**
     * Filter, which CvExperience to fetch.
     */
    where?: CvExperienceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CvExperiences to fetch.
     */
    orderBy?: CvExperienceOrderByWithRelationInput | CvExperienceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CvExperiences.
     */
    cursor?: CvExperienceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CvExperiences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CvExperiences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CvExperiences.
     */
    distinct?: CvExperienceScalarFieldEnum | CvExperienceScalarFieldEnum[]
  }

  /**
   * CvExperience findFirstOrThrow
   */
  export type CvExperienceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvExperience
     */
    select?: CvExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvExperience
     */
    omit?: CvExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvExperienceInclude<ExtArgs> | null
    /**
     * Filter, which CvExperience to fetch.
     */
    where?: CvExperienceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CvExperiences to fetch.
     */
    orderBy?: CvExperienceOrderByWithRelationInput | CvExperienceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CvExperiences.
     */
    cursor?: CvExperienceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CvExperiences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CvExperiences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CvExperiences.
     */
    distinct?: CvExperienceScalarFieldEnum | CvExperienceScalarFieldEnum[]
  }

  /**
   * CvExperience findMany
   */
  export type CvExperienceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvExperience
     */
    select?: CvExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvExperience
     */
    omit?: CvExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvExperienceInclude<ExtArgs> | null
    /**
     * Filter, which CvExperiences to fetch.
     */
    where?: CvExperienceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CvExperiences to fetch.
     */
    orderBy?: CvExperienceOrderByWithRelationInput | CvExperienceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CvExperiences.
     */
    cursor?: CvExperienceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CvExperiences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CvExperiences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CvExperiences.
     */
    distinct?: CvExperienceScalarFieldEnum | CvExperienceScalarFieldEnum[]
  }

  /**
   * CvExperience create
   */
  export type CvExperienceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvExperience
     */
    select?: CvExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvExperience
     */
    omit?: CvExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvExperienceInclude<ExtArgs> | null
    /**
     * The data needed to create a CvExperience.
     */
    data: XOR<CvExperienceCreateInput, CvExperienceUncheckedCreateInput>
  }

  /**
   * CvExperience createMany
   */
  export type CvExperienceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CvExperiences.
     */
    data: CvExperienceCreateManyInput | CvExperienceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CvExperience createManyAndReturn
   */
  export type CvExperienceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvExperience
     */
    select?: CvExperienceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CvExperience
     */
    omit?: CvExperienceOmit<ExtArgs> | null
    /**
     * The data used to create many CvExperiences.
     */
    data: CvExperienceCreateManyInput | CvExperienceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvExperienceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CvExperience update
   */
  export type CvExperienceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvExperience
     */
    select?: CvExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvExperience
     */
    omit?: CvExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvExperienceInclude<ExtArgs> | null
    /**
     * The data needed to update a CvExperience.
     */
    data: XOR<CvExperienceUpdateInput, CvExperienceUncheckedUpdateInput>
    /**
     * Choose, which CvExperience to update.
     */
    where: CvExperienceWhereUniqueInput
  }

  /**
   * CvExperience updateMany
   */
  export type CvExperienceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CvExperiences.
     */
    data: XOR<CvExperienceUpdateManyMutationInput, CvExperienceUncheckedUpdateManyInput>
    /**
     * Filter which CvExperiences to update
     */
    where?: CvExperienceWhereInput
    /**
     * Limit how many CvExperiences to update.
     */
    limit?: number
  }

  /**
   * CvExperience updateManyAndReturn
   */
  export type CvExperienceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvExperience
     */
    select?: CvExperienceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CvExperience
     */
    omit?: CvExperienceOmit<ExtArgs> | null
    /**
     * The data used to update CvExperiences.
     */
    data: XOR<CvExperienceUpdateManyMutationInput, CvExperienceUncheckedUpdateManyInput>
    /**
     * Filter which CvExperiences to update
     */
    where?: CvExperienceWhereInput
    /**
     * Limit how many CvExperiences to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvExperienceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CvExperience upsert
   */
  export type CvExperienceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvExperience
     */
    select?: CvExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvExperience
     */
    omit?: CvExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvExperienceInclude<ExtArgs> | null
    /**
     * The filter to search for the CvExperience to update in case it exists.
     */
    where: CvExperienceWhereUniqueInput
    /**
     * In case the CvExperience found by the `where` argument doesn't exist, create a new CvExperience with this data.
     */
    create: XOR<CvExperienceCreateInput, CvExperienceUncheckedCreateInput>
    /**
     * In case the CvExperience was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CvExperienceUpdateInput, CvExperienceUncheckedUpdateInput>
  }

  /**
   * CvExperience delete
   */
  export type CvExperienceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvExperience
     */
    select?: CvExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvExperience
     */
    omit?: CvExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvExperienceInclude<ExtArgs> | null
    /**
     * Filter which CvExperience to delete.
     */
    where: CvExperienceWhereUniqueInput
  }

  /**
   * CvExperience deleteMany
   */
  export type CvExperienceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CvExperiences to delete
     */
    where?: CvExperienceWhereInput
    /**
     * Limit how many CvExperiences to delete.
     */
    limit?: number
  }

  /**
   * CvExperience without action
   */
  export type CvExperienceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvExperience
     */
    select?: CvExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvExperience
     */
    omit?: CvExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvExperienceInclude<ExtArgs> | null
  }


  /**
   * Model CvSkill
   */

  export type AggregateCvSkill = {
    _count: CvSkillCountAggregateOutputType | null
    _avg: CvSkillAvgAggregateOutputType | null
    _sum: CvSkillSumAggregateOutputType | null
    _min: CvSkillMinAggregateOutputType | null
    _max: CvSkillMaxAggregateOutputType | null
  }

  export type CvSkillAvgAggregateOutputType = {
    confidence: number | null
  }

  export type CvSkillSumAggregateOutputType = {
    confidence: number | null
  }

  export type CvSkillMinAggregateOutputType = {
    id: string | null
    candidateCvId: string | null
    name: string | null
    category: $Enums.CvSkillCategory | null
    confidence: number | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CvSkillMaxAggregateOutputType = {
    id: string | null
    candidateCvId: string | null
    name: string | null
    category: $Enums.CvSkillCategory | null
    confidence: number | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CvSkillCountAggregateOutputType = {
    id: number
    candidateCvId: number
    name: number
    category: number
    confidence: number
    source: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CvSkillAvgAggregateInputType = {
    confidence?: true
  }

  export type CvSkillSumAggregateInputType = {
    confidence?: true
  }

  export type CvSkillMinAggregateInputType = {
    id?: true
    candidateCvId?: true
    name?: true
    category?: true
    confidence?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CvSkillMaxAggregateInputType = {
    id?: true
    candidateCvId?: true
    name?: true
    category?: true
    confidence?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CvSkillCountAggregateInputType = {
    id?: true
    candidateCvId?: true
    name?: true
    category?: true
    confidence?: true
    source?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CvSkillAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CvSkill to aggregate.
     */
    where?: CvSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CvSkills to fetch.
     */
    orderBy?: CvSkillOrderByWithRelationInput | CvSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CvSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CvSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CvSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CvSkills
    **/
    _count?: true | CvSkillCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CvSkillAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CvSkillSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CvSkillMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CvSkillMaxAggregateInputType
  }

  export type GetCvSkillAggregateType<T extends CvSkillAggregateArgs> = {
        [P in keyof T & keyof AggregateCvSkill]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCvSkill[P]>
      : GetScalarType<T[P], AggregateCvSkill[P]>
  }




  export type CvSkillGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CvSkillWhereInput
    orderBy?: CvSkillOrderByWithAggregationInput | CvSkillOrderByWithAggregationInput[]
    by: CvSkillScalarFieldEnum[] | CvSkillScalarFieldEnum
    having?: CvSkillScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CvSkillCountAggregateInputType | true
    _avg?: CvSkillAvgAggregateInputType
    _sum?: CvSkillSumAggregateInputType
    _min?: CvSkillMinAggregateInputType
    _max?: CvSkillMaxAggregateInputType
  }

  export type CvSkillGroupByOutputType = {
    id: string
    candidateCvId: string
    name: string
    category: $Enums.CvSkillCategory
    confidence: number | null
    source: string | null
    createdAt: Date
    updatedAt: Date
    _count: CvSkillCountAggregateOutputType | null
    _avg: CvSkillAvgAggregateOutputType | null
    _sum: CvSkillSumAggregateOutputType | null
    _min: CvSkillMinAggregateOutputType | null
    _max: CvSkillMaxAggregateOutputType | null
  }

  type GetCvSkillGroupByPayload<T extends CvSkillGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CvSkillGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CvSkillGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CvSkillGroupByOutputType[P]>
            : GetScalarType<T[P], CvSkillGroupByOutputType[P]>
        }
      >
    >


  export type CvSkillSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    candidateCvId?: boolean
    name?: boolean
    category?: boolean
    confidence?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    candidateCv?: boolean | CandidateCvDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cvSkill"]>

  export type CvSkillSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    candidateCvId?: boolean
    name?: boolean
    category?: boolean
    confidence?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    candidateCv?: boolean | CandidateCvDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cvSkill"]>

  export type CvSkillSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    candidateCvId?: boolean
    name?: boolean
    category?: boolean
    confidence?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    candidateCv?: boolean | CandidateCvDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cvSkill"]>

  export type CvSkillSelectScalar = {
    id?: boolean
    candidateCvId?: boolean
    name?: boolean
    category?: boolean
    confidence?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CvSkillOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "candidateCvId" | "name" | "category" | "confidence" | "source" | "createdAt" | "updatedAt", ExtArgs["result"]["cvSkill"]>
  export type CvSkillInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidateCv?: boolean | CandidateCvDefaultArgs<ExtArgs>
  }
  export type CvSkillIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidateCv?: boolean | CandidateCvDefaultArgs<ExtArgs>
  }
  export type CvSkillIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidateCv?: boolean | CandidateCvDefaultArgs<ExtArgs>
  }

  export type $CvSkillPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CvSkill"
    objects: {
      candidateCv: Prisma.$CandidateCvPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      candidateCvId: string
      name: string
      category: $Enums.CvSkillCategory
      confidence: number | null
      source: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cvSkill"]>
    composites: {}
  }

  type CvSkillGetPayload<S extends boolean | null | undefined | CvSkillDefaultArgs> = $Result.GetResult<Prisma.$CvSkillPayload, S>

  type CvSkillCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CvSkillFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CvSkillCountAggregateInputType | true
    }

  export interface CvSkillDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CvSkill'], meta: { name: 'CvSkill' } }
    /**
     * Find zero or one CvSkill that matches the filter.
     * @param {CvSkillFindUniqueArgs} args - Arguments to find a CvSkill
     * @example
     * // Get one CvSkill
     * const cvSkill = await prisma.cvSkill.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CvSkillFindUniqueArgs>(args: SelectSubset<T, CvSkillFindUniqueArgs<ExtArgs>>): Prisma__CvSkillClient<$Result.GetResult<Prisma.$CvSkillPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CvSkill that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CvSkillFindUniqueOrThrowArgs} args - Arguments to find a CvSkill
     * @example
     * // Get one CvSkill
     * const cvSkill = await prisma.cvSkill.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CvSkillFindUniqueOrThrowArgs>(args: SelectSubset<T, CvSkillFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CvSkillClient<$Result.GetResult<Prisma.$CvSkillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CvSkill that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvSkillFindFirstArgs} args - Arguments to find a CvSkill
     * @example
     * // Get one CvSkill
     * const cvSkill = await prisma.cvSkill.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CvSkillFindFirstArgs>(args?: SelectSubset<T, CvSkillFindFirstArgs<ExtArgs>>): Prisma__CvSkillClient<$Result.GetResult<Prisma.$CvSkillPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CvSkill that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvSkillFindFirstOrThrowArgs} args - Arguments to find a CvSkill
     * @example
     * // Get one CvSkill
     * const cvSkill = await prisma.cvSkill.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CvSkillFindFirstOrThrowArgs>(args?: SelectSubset<T, CvSkillFindFirstOrThrowArgs<ExtArgs>>): Prisma__CvSkillClient<$Result.GetResult<Prisma.$CvSkillPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CvSkills that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvSkillFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CvSkills
     * const cvSkills = await prisma.cvSkill.findMany()
     * 
     * // Get first 10 CvSkills
     * const cvSkills = await prisma.cvSkill.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cvSkillWithIdOnly = await prisma.cvSkill.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CvSkillFindManyArgs>(args?: SelectSubset<T, CvSkillFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CvSkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CvSkill.
     * @param {CvSkillCreateArgs} args - Arguments to create a CvSkill.
     * @example
     * // Create one CvSkill
     * const CvSkill = await prisma.cvSkill.create({
     *   data: {
     *     // ... data to create a CvSkill
     *   }
     * })
     * 
     */
    create<T extends CvSkillCreateArgs>(args: SelectSubset<T, CvSkillCreateArgs<ExtArgs>>): Prisma__CvSkillClient<$Result.GetResult<Prisma.$CvSkillPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CvSkills.
     * @param {CvSkillCreateManyArgs} args - Arguments to create many CvSkills.
     * @example
     * // Create many CvSkills
     * const cvSkill = await prisma.cvSkill.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CvSkillCreateManyArgs>(args?: SelectSubset<T, CvSkillCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CvSkills and returns the data saved in the database.
     * @param {CvSkillCreateManyAndReturnArgs} args - Arguments to create many CvSkills.
     * @example
     * // Create many CvSkills
     * const cvSkill = await prisma.cvSkill.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CvSkills and only return the `id`
     * const cvSkillWithIdOnly = await prisma.cvSkill.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CvSkillCreateManyAndReturnArgs>(args?: SelectSubset<T, CvSkillCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CvSkillPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CvSkill.
     * @param {CvSkillDeleteArgs} args - Arguments to delete one CvSkill.
     * @example
     * // Delete one CvSkill
     * const CvSkill = await prisma.cvSkill.delete({
     *   where: {
     *     // ... filter to delete one CvSkill
     *   }
     * })
     * 
     */
    delete<T extends CvSkillDeleteArgs>(args: SelectSubset<T, CvSkillDeleteArgs<ExtArgs>>): Prisma__CvSkillClient<$Result.GetResult<Prisma.$CvSkillPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CvSkill.
     * @param {CvSkillUpdateArgs} args - Arguments to update one CvSkill.
     * @example
     * // Update one CvSkill
     * const cvSkill = await prisma.cvSkill.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CvSkillUpdateArgs>(args: SelectSubset<T, CvSkillUpdateArgs<ExtArgs>>): Prisma__CvSkillClient<$Result.GetResult<Prisma.$CvSkillPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CvSkills.
     * @param {CvSkillDeleteManyArgs} args - Arguments to filter CvSkills to delete.
     * @example
     * // Delete a few CvSkills
     * const { count } = await prisma.cvSkill.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CvSkillDeleteManyArgs>(args?: SelectSubset<T, CvSkillDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CvSkills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvSkillUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CvSkills
     * const cvSkill = await prisma.cvSkill.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CvSkillUpdateManyArgs>(args: SelectSubset<T, CvSkillUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CvSkills and returns the data updated in the database.
     * @param {CvSkillUpdateManyAndReturnArgs} args - Arguments to update many CvSkills.
     * @example
     * // Update many CvSkills
     * const cvSkill = await prisma.cvSkill.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CvSkills and only return the `id`
     * const cvSkillWithIdOnly = await prisma.cvSkill.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CvSkillUpdateManyAndReturnArgs>(args: SelectSubset<T, CvSkillUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CvSkillPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CvSkill.
     * @param {CvSkillUpsertArgs} args - Arguments to update or create a CvSkill.
     * @example
     * // Update or create a CvSkill
     * const cvSkill = await prisma.cvSkill.upsert({
     *   create: {
     *     // ... data to create a CvSkill
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CvSkill we want to update
     *   }
     * })
     */
    upsert<T extends CvSkillUpsertArgs>(args: SelectSubset<T, CvSkillUpsertArgs<ExtArgs>>): Prisma__CvSkillClient<$Result.GetResult<Prisma.$CvSkillPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CvSkills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvSkillCountArgs} args - Arguments to filter CvSkills to count.
     * @example
     * // Count the number of CvSkills
     * const count = await prisma.cvSkill.count({
     *   where: {
     *     // ... the filter for the CvSkills we want to count
     *   }
     * })
    **/
    count<T extends CvSkillCountArgs>(
      args?: Subset<T, CvSkillCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CvSkillCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CvSkill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvSkillAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CvSkillAggregateArgs>(args: Subset<T, CvSkillAggregateArgs>): Prisma.PrismaPromise<GetCvSkillAggregateType<T>>

    /**
     * Group by CvSkill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvSkillGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CvSkillGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CvSkillGroupByArgs['orderBy'] }
        : { orderBy?: CvSkillGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CvSkillGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCvSkillGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CvSkill model
   */
  readonly fields: CvSkillFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CvSkill.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CvSkillClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    candidateCv<T extends CandidateCvDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CandidateCvDefaultArgs<ExtArgs>>): Prisma__CandidateCvClient<$Result.GetResult<Prisma.$CandidateCvPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CvSkill model
   */
  interface CvSkillFieldRefs {
    readonly id: FieldRef<"CvSkill", 'String'>
    readonly candidateCvId: FieldRef<"CvSkill", 'String'>
    readonly name: FieldRef<"CvSkill", 'String'>
    readonly category: FieldRef<"CvSkill", 'CvSkillCategory'>
    readonly confidence: FieldRef<"CvSkill", 'Float'>
    readonly source: FieldRef<"CvSkill", 'String'>
    readonly createdAt: FieldRef<"CvSkill", 'DateTime'>
    readonly updatedAt: FieldRef<"CvSkill", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CvSkill findUnique
   */
  export type CvSkillFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvSkill
     */
    select?: CvSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvSkill
     */
    omit?: CvSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvSkillInclude<ExtArgs> | null
    /**
     * Filter, which CvSkill to fetch.
     */
    where: CvSkillWhereUniqueInput
  }

  /**
   * CvSkill findUniqueOrThrow
   */
  export type CvSkillFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvSkill
     */
    select?: CvSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvSkill
     */
    omit?: CvSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvSkillInclude<ExtArgs> | null
    /**
     * Filter, which CvSkill to fetch.
     */
    where: CvSkillWhereUniqueInput
  }

  /**
   * CvSkill findFirst
   */
  export type CvSkillFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvSkill
     */
    select?: CvSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvSkill
     */
    omit?: CvSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvSkillInclude<ExtArgs> | null
    /**
     * Filter, which CvSkill to fetch.
     */
    where?: CvSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CvSkills to fetch.
     */
    orderBy?: CvSkillOrderByWithRelationInput | CvSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CvSkills.
     */
    cursor?: CvSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CvSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CvSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CvSkills.
     */
    distinct?: CvSkillScalarFieldEnum | CvSkillScalarFieldEnum[]
  }

  /**
   * CvSkill findFirstOrThrow
   */
  export type CvSkillFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvSkill
     */
    select?: CvSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvSkill
     */
    omit?: CvSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvSkillInclude<ExtArgs> | null
    /**
     * Filter, which CvSkill to fetch.
     */
    where?: CvSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CvSkills to fetch.
     */
    orderBy?: CvSkillOrderByWithRelationInput | CvSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CvSkills.
     */
    cursor?: CvSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CvSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CvSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CvSkills.
     */
    distinct?: CvSkillScalarFieldEnum | CvSkillScalarFieldEnum[]
  }

  /**
   * CvSkill findMany
   */
  export type CvSkillFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvSkill
     */
    select?: CvSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvSkill
     */
    omit?: CvSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvSkillInclude<ExtArgs> | null
    /**
     * Filter, which CvSkills to fetch.
     */
    where?: CvSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CvSkills to fetch.
     */
    orderBy?: CvSkillOrderByWithRelationInput | CvSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CvSkills.
     */
    cursor?: CvSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CvSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CvSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CvSkills.
     */
    distinct?: CvSkillScalarFieldEnum | CvSkillScalarFieldEnum[]
  }

  /**
   * CvSkill create
   */
  export type CvSkillCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvSkill
     */
    select?: CvSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvSkill
     */
    omit?: CvSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvSkillInclude<ExtArgs> | null
    /**
     * The data needed to create a CvSkill.
     */
    data: XOR<CvSkillCreateInput, CvSkillUncheckedCreateInput>
  }

  /**
   * CvSkill createMany
   */
  export type CvSkillCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CvSkills.
     */
    data: CvSkillCreateManyInput | CvSkillCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CvSkill createManyAndReturn
   */
  export type CvSkillCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvSkill
     */
    select?: CvSkillSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CvSkill
     */
    omit?: CvSkillOmit<ExtArgs> | null
    /**
     * The data used to create many CvSkills.
     */
    data: CvSkillCreateManyInput | CvSkillCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvSkillIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CvSkill update
   */
  export type CvSkillUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvSkill
     */
    select?: CvSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvSkill
     */
    omit?: CvSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvSkillInclude<ExtArgs> | null
    /**
     * The data needed to update a CvSkill.
     */
    data: XOR<CvSkillUpdateInput, CvSkillUncheckedUpdateInput>
    /**
     * Choose, which CvSkill to update.
     */
    where: CvSkillWhereUniqueInput
  }

  /**
   * CvSkill updateMany
   */
  export type CvSkillUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CvSkills.
     */
    data: XOR<CvSkillUpdateManyMutationInput, CvSkillUncheckedUpdateManyInput>
    /**
     * Filter which CvSkills to update
     */
    where?: CvSkillWhereInput
    /**
     * Limit how many CvSkills to update.
     */
    limit?: number
  }

  /**
   * CvSkill updateManyAndReturn
   */
  export type CvSkillUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvSkill
     */
    select?: CvSkillSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CvSkill
     */
    omit?: CvSkillOmit<ExtArgs> | null
    /**
     * The data used to update CvSkills.
     */
    data: XOR<CvSkillUpdateManyMutationInput, CvSkillUncheckedUpdateManyInput>
    /**
     * Filter which CvSkills to update
     */
    where?: CvSkillWhereInput
    /**
     * Limit how many CvSkills to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvSkillIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CvSkill upsert
   */
  export type CvSkillUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvSkill
     */
    select?: CvSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvSkill
     */
    omit?: CvSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvSkillInclude<ExtArgs> | null
    /**
     * The filter to search for the CvSkill to update in case it exists.
     */
    where: CvSkillWhereUniqueInput
    /**
     * In case the CvSkill found by the `where` argument doesn't exist, create a new CvSkill with this data.
     */
    create: XOR<CvSkillCreateInput, CvSkillUncheckedCreateInput>
    /**
     * In case the CvSkill was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CvSkillUpdateInput, CvSkillUncheckedUpdateInput>
  }

  /**
   * CvSkill delete
   */
  export type CvSkillDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvSkill
     */
    select?: CvSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvSkill
     */
    omit?: CvSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvSkillInclude<ExtArgs> | null
    /**
     * Filter which CvSkill to delete.
     */
    where: CvSkillWhereUniqueInput
  }

  /**
   * CvSkill deleteMany
   */
  export type CvSkillDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CvSkills to delete
     */
    where?: CvSkillWhereInput
    /**
     * Limit how many CvSkills to delete.
     */
    limit?: number
  }

  /**
   * CvSkill without action
   */
  export type CvSkillDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvSkill
     */
    select?: CvSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvSkill
     */
    omit?: CvSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvSkillInclude<ExtArgs> | null
  }


  /**
   * Model CvTraining
   */

  export type AggregateCvTraining = {
    _count: CvTrainingCountAggregateOutputType | null
    _min: CvTrainingMinAggregateOutputType | null
    _max: CvTrainingMaxAggregateOutputType | null
  }

  export type CvTrainingMinAggregateOutputType = {
    id: string | null
    candidateCvId: string | null
    title: string | null
    organizationName: string | null
    degree: string | null
    fieldOfStudy: string | null
    startDate: string | null
    endDate: string | null
    description: string | null
    location: string | null
    isCertification: boolean | null
    certificationType: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CvTrainingMaxAggregateOutputType = {
    id: string | null
    candidateCvId: string | null
    title: string | null
    organizationName: string | null
    degree: string | null
    fieldOfStudy: string | null
    startDate: string | null
    endDate: string | null
    description: string | null
    location: string | null
    isCertification: boolean | null
    certificationType: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CvTrainingCountAggregateOutputType = {
    id: number
    candidateCvId: number
    title: number
    organizationName: number
    degree: number
    fieldOfStudy: number
    startDate: number
    endDate: number
    description: number
    location: number
    isCertification: number
    certificationType: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CvTrainingMinAggregateInputType = {
    id?: true
    candidateCvId?: true
    title?: true
    organizationName?: true
    degree?: true
    fieldOfStudy?: true
    startDate?: true
    endDate?: true
    description?: true
    location?: true
    isCertification?: true
    certificationType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CvTrainingMaxAggregateInputType = {
    id?: true
    candidateCvId?: true
    title?: true
    organizationName?: true
    degree?: true
    fieldOfStudy?: true
    startDate?: true
    endDate?: true
    description?: true
    location?: true
    isCertification?: true
    certificationType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CvTrainingCountAggregateInputType = {
    id?: true
    candidateCvId?: true
    title?: true
    organizationName?: true
    degree?: true
    fieldOfStudy?: true
    startDate?: true
    endDate?: true
    description?: true
    location?: true
    isCertification?: true
    certificationType?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CvTrainingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CvTraining to aggregate.
     */
    where?: CvTrainingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CvTrainings to fetch.
     */
    orderBy?: CvTrainingOrderByWithRelationInput | CvTrainingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CvTrainingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CvTrainings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CvTrainings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CvTrainings
    **/
    _count?: true | CvTrainingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CvTrainingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CvTrainingMaxAggregateInputType
  }

  export type GetCvTrainingAggregateType<T extends CvTrainingAggregateArgs> = {
        [P in keyof T & keyof AggregateCvTraining]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCvTraining[P]>
      : GetScalarType<T[P], AggregateCvTraining[P]>
  }




  export type CvTrainingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CvTrainingWhereInput
    orderBy?: CvTrainingOrderByWithAggregationInput | CvTrainingOrderByWithAggregationInput[]
    by: CvTrainingScalarFieldEnum[] | CvTrainingScalarFieldEnum
    having?: CvTrainingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CvTrainingCountAggregateInputType | true
    _min?: CvTrainingMinAggregateInputType
    _max?: CvTrainingMaxAggregateInputType
  }

  export type CvTrainingGroupByOutputType = {
    id: string
    candidateCvId: string
    title: string
    organizationName: string | null
    degree: string | null
    fieldOfStudy: string | null
    startDate: string | null
    endDate: string | null
    description: string | null
    location: string | null
    isCertification: boolean
    certificationType: string | null
    createdAt: Date
    updatedAt: Date
    _count: CvTrainingCountAggregateOutputType | null
    _min: CvTrainingMinAggregateOutputType | null
    _max: CvTrainingMaxAggregateOutputType | null
  }

  type GetCvTrainingGroupByPayload<T extends CvTrainingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CvTrainingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CvTrainingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CvTrainingGroupByOutputType[P]>
            : GetScalarType<T[P], CvTrainingGroupByOutputType[P]>
        }
      >
    >


  export type CvTrainingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    candidateCvId?: boolean
    title?: boolean
    organizationName?: boolean
    degree?: boolean
    fieldOfStudy?: boolean
    startDate?: boolean
    endDate?: boolean
    description?: boolean
    location?: boolean
    isCertification?: boolean
    certificationType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    candidateCv?: boolean | CandidateCvDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cvTraining"]>

  export type CvTrainingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    candidateCvId?: boolean
    title?: boolean
    organizationName?: boolean
    degree?: boolean
    fieldOfStudy?: boolean
    startDate?: boolean
    endDate?: boolean
    description?: boolean
    location?: boolean
    isCertification?: boolean
    certificationType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    candidateCv?: boolean | CandidateCvDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cvTraining"]>

  export type CvTrainingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    candidateCvId?: boolean
    title?: boolean
    organizationName?: boolean
    degree?: boolean
    fieldOfStudy?: boolean
    startDate?: boolean
    endDate?: boolean
    description?: boolean
    location?: boolean
    isCertification?: boolean
    certificationType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    candidateCv?: boolean | CandidateCvDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cvTraining"]>

  export type CvTrainingSelectScalar = {
    id?: boolean
    candidateCvId?: boolean
    title?: boolean
    organizationName?: boolean
    degree?: boolean
    fieldOfStudy?: boolean
    startDate?: boolean
    endDate?: boolean
    description?: boolean
    location?: boolean
    isCertification?: boolean
    certificationType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CvTrainingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "candidateCvId" | "title" | "organizationName" | "degree" | "fieldOfStudy" | "startDate" | "endDate" | "description" | "location" | "isCertification" | "certificationType" | "createdAt" | "updatedAt", ExtArgs["result"]["cvTraining"]>
  export type CvTrainingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidateCv?: boolean | CandidateCvDefaultArgs<ExtArgs>
  }
  export type CvTrainingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidateCv?: boolean | CandidateCvDefaultArgs<ExtArgs>
  }
  export type CvTrainingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidateCv?: boolean | CandidateCvDefaultArgs<ExtArgs>
  }

  export type $CvTrainingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CvTraining"
    objects: {
      candidateCv: Prisma.$CandidateCvPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      candidateCvId: string
      title: string
      organizationName: string | null
      degree: string | null
      fieldOfStudy: string | null
      startDate: string | null
      endDate: string | null
      description: string | null
      location: string | null
      isCertification: boolean
      certificationType: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cvTraining"]>
    composites: {}
  }

  type CvTrainingGetPayload<S extends boolean | null | undefined | CvTrainingDefaultArgs> = $Result.GetResult<Prisma.$CvTrainingPayload, S>

  type CvTrainingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CvTrainingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CvTrainingCountAggregateInputType | true
    }

  export interface CvTrainingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CvTraining'], meta: { name: 'CvTraining' } }
    /**
     * Find zero or one CvTraining that matches the filter.
     * @param {CvTrainingFindUniqueArgs} args - Arguments to find a CvTraining
     * @example
     * // Get one CvTraining
     * const cvTraining = await prisma.cvTraining.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CvTrainingFindUniqueArgs>(args: SelectSubset<T, CvTrainingFindUniqueArgs<ExtArgs>>): Prisma__CvTrainingClient<$Result.GetResult<Prisma.$CvTrainingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CvTraining that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CvTrainingFindUniqueOrThrowArgs} args - Arguments to find a CvTraining
     * @example
     * // Get one CvTraining
     * const cvTraining = await prisma.cvTraining.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CvTrainingFindUniqueOrThrowArgs>(args: SelectSubset<T, CvTrainingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CvTrainingClient<$Result.GetResult<Prisma.$CvTrainingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CvTraining that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvTrainingFindFirstArgs} args - Arguments to find a CvTraining
     * @example
     * // Get one CvTraining
     * const cvTraining = await prisma.cvTraining.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CvTrainingFindFirstArgs>(args?: SelectSubset<T, CvTrainingFindFirstArgs<ExtArgs>>): Prisma__CvTrainingClient<$Result.GetResult<Prisma.$CvTrainingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CvTraining that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvTrainingFindFirstOrThrowArgs} args - Arguments to find a CvTraining
     * @example
     * // Get one CvTraining
     * const cvTraining = await prisma.cvTraining.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CvTrainingFindFirstOrThrowArgs>(args?: SelectSubset<T, CvTrainingFindFirstOrThrowArgs<ExtArgs>>): Prisma__CvTrainingClient<$Result.GetResult<Prisma.$CvTrainingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CvTrainings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvTrainingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CvTrainings
     * const cvTrainings = await prisma.cvTraining.findMany()
     * 
     * // Get first 10 CvTrainings
     * const cvTrainings = await prisma.cvTraining.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cvTrainingWithIdOnly = await prisma.cvTraining.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CvTrainingFindManyArgs>(args?: SelectSubset<T, CvTrainingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CvTrainingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CvTraining.
     * @param {CvTrainingCreateArgs} args - Arguments to create a CvTraining.
     * @example
     * // Create one CvTraining
     * const CvTraining = await prisma.cvTraining.create({
     *   data: {
     *     // ... data to create a CvTraining
     *   }
     * })
     * 
     */
    create<T extends CvTrainingCreateArgs>(args: SelectSubset<T, CvTrainingCreateArgs<ExtArgs>>): Prisma__CvTrainingClient<$Result.GetResult<Prisma.$CvTrainingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CvTrainings.
     * @param {CvTrainingCreateManyArgs} args - Arguments to create many CvTrainings.
     * @example
     * // Create many CvTrainings
     * const cvTraining = await prisma.cvTraining.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CvTrainingCreateManyArgs>(args?: SelectSubset<T, CvTrainingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CvTrainings and returns the data saved in the database.
     * @param {CvTrainingCreateManyAndReturnArgs} args - Arguments to create many CvTrainings.
     * @example
     * // Create many CvTrainings
     * const cvTraining = await prisma.cvTraining.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CvTrainings and only return the `id`
     * const cvTrainingWithIdOnly = await prisma.cvTraining.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CvTrainingCreateManyAndReturnArgs>(args?: SelectSubset<T, CvTrainingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CvTrainingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CvTraining.
     * @param {CvTrainingDeleteArgs} args - Arguments to delete one CvTraining.
     * @example
     * // Delete one CvTraining
     * const CvTraining = await prisma.cvTraining.delete({
     *   where: {
     *     // ... filter to delete one CvTraining
     *   }
     * })
     * 
     */
    delete<T extends CvTrainingDeleteArgs>(args: SelectSubset<T, CvTrainingDeleteArgs<ExtArgs>>): Prisma__CvTrainingClient<$Result.GetResult<Prisma.$CvTrainingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CvTraining.
     * @param {CvTrainingUpdateArgs} args - Arguments to update one CvTraining.
     * @example
     * // Update one CvTraining
     * const cvTraining = await prisma.cvTraining.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CvTrainingUpdateArgs>(args: SelectSubset<T, CvTrainingUpdateArgs<ExtArgs>>): Prisma__CvTrainingClient<$Result.GetResult<Prisma.$CvTrainingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CvTrainings.
     * @param {CvTrainingDeleteManyArgs} args - Arguments to filter CvTrainings to delete.
     * @example
     * // Delete a few CvTrainings
     * const { count } = await prisma.cvTraining.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CvTrainingDeleteManyArgs>(args?: SelectSubset<T, CvTrainingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CvTrainings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvTrainingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CvTrainings
     * const cvTraining = await prisma.cvTraining.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CvTrainingUpdateManyArgs>(args: SelectSubset<T, CvTrainingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CvTrainings and returns the data updated in the database.
     * @param {CvTrainingUpdateManyAndReturnArgs} args - Arguments to update many CvTrainings.
     * @example
     * // Update many CvTrainings
     * const cvTraining = await prisma.cvTraining.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CvTrainings and only return the `id`
     * const cvTrainingWithIdOnly = await prisma.cvTraining.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CvTrainingUpdateManyAndReturnArgs>(args: SelectSubset<T, CvTrainingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CvTrainingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CvTraining.
     * @param {CvTrainingUpsertArgs} args - Arguments to update or create a CvTraining.
     * @example
     * // Update or create a CvTraining
     * const cvTraining = await prisma.cvTraining.upsert({
     *   create: {
     *     // ... data to create a CvTraining
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CvTraining we want to update
     *   }
     * })
     */
    upsert<T extends CvTrainingUpsertArgs>(args: SelectSubset<T, CvTrainingUpsertArgs<ExtArgs>>): Prisma__CvTrainingClient<$Result.GetResult<Prisma.$CvTrainingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CvTrainings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvTrainingCountArgs} args - Arguments to filter CvTrainings to count.
     * @example
     * // Count the number of CvTrainings
     * const count = await prisma.cvTraining.count({
     *   where: {
     *     // ... the filter for the CvTrainings we want to count
     *   }
     * })
    **/
    count<T extends CvTrainingCountArgs>(
      args?: Subset<T, CvTrainingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CvTrainingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CvTraining.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvTrainingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CvTrainingAggregateArgs>(args: Subset<T, CvTrainingAggregateArgs>): Prisma.PrismaPromise<GetCvTrainingAggregateType<T>>

    /**
     * Group by CvTraining.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvTrainingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CvTrainingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CvTrainingGroupByArgs['orderBy'] }
        : { orderBy?: CvTrainingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CvTrainingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCvTrainingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CvTraining model
   */
  readonly fields: CvTrainingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CvTraining.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CvTrainingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    candidateCv<T extends CandidateCvDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CandidateCvDefaultArgs<ExtArgs>>): Prisma__CandidateCvClient<$Result.GetResult<Prisma.$CandidateCvPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CvTraining model
   */
  interface CvTrainingFieldRefs {
    readonly id: FieldRef<"CvTraining", 'String'>
    readonly candidateCvId: FieldRef<"CvTraining", 'String'>
    readonly title: FieldRef<"CvTraining", 'String'>
    readonly organizationName: FieldRef<"CvTraining", 'String'>
    readonly degree: FieldRef<"CvTraining", 'String'>
    readonly fieldOfStudy: FieldRef<"CvTraining", 'String'>
    readonly startDate: FieldRef<"CvTraining", 'String'>
    readonly endDate: FieldRef<"CvTraining", 'String'>
    readonly description: FieldRef<"CvTraining", 'String'>
    readonly location: FieldRef<"CvTraining", 'String'>
    readonly isCertification: FieldRef<"CvTraining", 'Boolean'>
    readonly certificationType: FieldRef<"CvTraining", 'String'>
    readonly createdAt: FieldRef<"CvTraining", 'DateTime'>
    readonly updatedAt: FieldRef<"CvTraining", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CvTraining findUnique
   */
  export type CvTrainingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvTraining
     */
    select?: CvTrainingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvTraining
     */
    omit?: CvTrainingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvTrainingInclude<ExtArgs> | null
    /**
     * Filter, which CvTraining to fetch.
     */
    where: CvTrainingWhereUniqueInput
  }

  /**
   * CvTraining findUniqueOrThrow
   */
  export type CvTrainingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvTraining
     */
    select?: CvTrainingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvTraining
     */
    omit?: CvTrainingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvTrainingInclude<ExtArgs> | null
    /**
     * Filter, which CvTraining to fetch.
     */
    where: CvTrainingWhereUniqueInput
  }

  /**
   * CvTraining findFirst
   */
  export type CvTrainingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvTraining
     */
    select?: CvTrainingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvTraining
     */
    omit?: CvTrainingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvTrainingInclude<ExtArgs> | null
    /**
     * Filter, which CvTraining to fetch.
     */
    where?: CvTrainingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CvTrainings to fetch.
     */
    orderBy?: CvTrainingOrderByWithRelationInput | CvTrainingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CvTrainings.
     */
    cursor?: CvTrainingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CvTrainings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CvTrainings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CvTrainings.
     */
    distinct?: CvTrainingScalarFieldEnum | CvTrainingScalarFieldEnum[]
  }

  /**
   * CvTraining findFirstOrThrow
   */
  export type CvTrainingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvTraining
     */
    select?: CvTrainingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvTraining
     */
    omit?: CvTrainingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvTrainingInclude<ExtArgs> | null
    /**
     * Filter, which CvTraining to fetch.
     */
    where?: CvTrainingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CvTrainings to fetch.
     */
    orderBy?: CvTrainingOrderByWithRelationInput | CvTrainingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CvTrainings.
     */
    cursor?: CvTrainingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CvTrainings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CvTrainings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CvTrainings.
     */
    distinct?: CvTrainingScalarFieldEnum | CvTrainingScalarFieldEnum[]
  }

  /**
   * CvTraining findMany
   */
  export type CvTrainingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvTraining
     */
    select?: CvTrainingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvTraining
     */
    omit?: CvTrainingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvTrainingInclude<ExtArgs> | null
    /**
     * Filter, which CvTrainings to fetch.
     */
    where?: CvTrainingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CvTrainings to fetch.
     */
    orderBy?: CvTrainingOrderByWithRelationInput | CvTrainingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CvTrainings.
     */
    cursor?: CvTrainingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CvTrainings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CvTrainings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CvTrainings.
     */
    distinct?: CvTrainingScalarFieldEnum | CvTrainingScalarFieldEnum[]
  }

  /**
   * CvTraining create
   */
  export type CvTrainingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvTraining
     */
    select?: CvTrainingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvTraining
     */
    omit?: CvTrainingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvTrainingInclude<ExtArgs> | null
    /**
     * The data needed to create a CvTraining.
     */
    data: XOR<CvTrainingCreateInput, CvTrainingUncheckedCreateInput>
  }

  /**
   * CvTraining createMany
   */
  export type CvTrainingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CvTrainings.
     */
    data: CvTrainingCreateManyInput | CvTrainingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CvTraining createManyAndReturn
   */
  export type CvTrainingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvTraining
     */
    select?: CvTrainingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CvTraining
     */
    omit?: CvTrainingOmit<ExtArgs> | null
    /**
     * The data used to create many CvTrainings.
     */
    data: CvTrainingCreateManyInput | CvTrainingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvTrainingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CvTraining update
   */
  export type CvTrainingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvTraining
     */
    select?: CvTrainingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvTraining
     */
    omit?: CvTrainingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvTrainingInclude<ExtArgs> | null
    /**
     * The data needed to update a CvTraining.
     */
    data: XOR<CvTrainingUpdateInput, CvTrainingUncheckedUpdateInput>
    /**
     * Choose, which CvTraining to update.
     */
    where: CvTrainingWhereUniqueInput
  }

  /**
   * CvTraining updateMany
   */
  export type CvTrainingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CvTrainings.
     */
    data: XOR<CvTrainingUpdateManyMutationInput, CvTrainingUncheckedUpdateManyInput>
    /**
     * Filter which CvTrainings to update
     */
    where?: CvTrainingWhereInput
    /**
     * Limit how many CvTrainings to update.
     */
    limit?: number
  }

  /**
   * CvTraining updateManyAndReturn
   */
  export type CvTrainingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvTraining
     */
    select?: CvTrainingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CvTraining
     */
    omit?: CvTrainingOmit<ExtArgs> | null
    /**
     * The data used to update CvTrainings.
     */
    data: XOR<CvTrainingUpdateManyMutationInput, CvTrainingUncheckedUpdateManyInput>
    /**
     * Filter which CvTrainings to update
     */
    where?: CvTrainingWhereInput
    /**
     * Limit how many CvTrainings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvTrainingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CvTraining upsert
   */
  export type CvTrainingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvTraining
     */
    select?: CvTrainingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvTraining
     */
    omit?: CvTrainingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvTrainingInclude<ExtArgs> | null
    /**
     * The filter to search for the CvTraining to update in case it exists.
     */
    where: CvTrainingWhereUniqueInput
    /**
     * In case the CvTraining found by the `where` argument doesn't exist, create a new CvTraining with this data.
     */
    create: XOR<CvTrainingCreateInput, CvTrainingUncheckedCreateInput>
    /**
     * In case the CvTraining was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CvTrainingUpdateInput, CvTrainingUncheckedUpdateInput>
  }

  /**
   * CvTraining delete
   */
  export type CvTrainingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvTraining
     */
    select?: CvTrainingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvTraining
     */
    omit?: CvTrainingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvTrainingInclude<ExtArgs> | null
    /**
     * Filter which CvTraining to delete.
     */
    where: CvTrainingWhereUniqueInput
  }

  /**
   * CvTraining deleteMany
   */
  export type CvTrainingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CvTrainings to delete
     */
    where?: CvTrainingWhereInput
    /**
     * Limit how many CvTrainings to delete.
     */
    limit?: number
  }

  /**
   * CvTraining without action
   */
  export type CvTrainingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvTraining
     */
    select?: CvTrainingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvTraining
     */
    omit?: CvTrainingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvTrainingInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryAvgAggregateOutputType = {
    position: number | null
  }

  export type CategorySumAggregateOutputType = {
    position: number | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    color: string | null
    position: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    color: string | null
    position: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    color: number
    position: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CategoryAvgAggregateInputType = {
    position?: true
  }

  export type CategorySumAggregateInputType = {
    position?: true
  }

  export type CategoryMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    color?: true
    position?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    color?: true
    position?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    color?: true
    position?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _avg?: CategoryAvgAggregateInputType
    _sum?: CategorySumAggregateInputType
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    userId: string
    name: string
    color: string
    position: number
    createdAt: Date
    updatedAt: Date
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    color?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    companies?: boolean | Category$companiesArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    color?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    color?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    color?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "color" | "position" | "createdAt" | "updatedAt", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    companies?: boolean | Category$companiesArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      companies: Prisma.$CompanyPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      color: string
      position: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    companies<T extends Category$companiesArgs<ExtArgs> = {}>(args?: Subset<T, Category$companiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'String'>
    readonly userId: FieldRef<"Category", 'String'>
    readonly name: FieldRef<"Category", 'String'>
    readonly color: FieldRef<"Category", 'String'>
    readonly position: FieldRef<"Category", 'Int'>
    readonly createdAt: FieldRef<"Category", 'DateTime'>
    readonly updatedAt: FieldRef<"Category", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category updateManyAndReturn
   */
  export type CategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category.companies
   */
  export type Category$companiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    where?: CompanyWhereInput
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    cursor?: CompanyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model Company
   */

  export type AggregateCompany = {
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  export type CompanyMinAggregateOutputType = {
    id: string | null
    userId: string | null
    categoryId: string | null
    name: string | null
    website: string | null
    sector: string | null
    city: string | null
    country: string | null
    email: string | null
    phone: string | null
    recruiterName: string | null
    aiSummary: string | null
    status: $Enums.CompanyStatus | null
    isFavorite: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanyMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    categoryId: string | null
    name: string | null
    website: string | null
    sector: string | null
    city: string | null
    country: string | null
    email: string | null
    phone: string | null
    recruiterName: string | null
    aiSummary: string | null
    status: $Enums.CompanyStatus | null
    isFavorite: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanyCountAggregateOutputType = {
    id: number
    userId: number
    categoryId: number
    name: number
    website: number
    sector: number
    city: number
    country: number
    email: number
    phone: number
    recruiterName: number
    aiSummary: number
    status: number
    isFavorite: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CompanyMinAggregateInputType = {
    id?: true
    userId?: true
    categoryId?: true
    name?: true
    website?: true
    sector?: true
    city?: true
    country?: true
    email?: true
    phone?: true
    recruiterName?: true
    aiSummary?: true
    status?: true
    isFavorite?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanyMaxAggregateInputType = {
    id?: true
    userId?: true
    categoryId?: true
    name?: true
    website?: true
    sector?: true
    city?: true
    country?: true
    email?: true
    phone?: true
    recruiterName?: true
    aiSummary?: true
    status?: true
    isFavorite?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanyCountAggregateInputType = {
    id?: true
    userId?: true
    categoryId?: true
    name?: true
    website?: true
    sector?: true
    city?: true
    country?: true
    email?: true
    phone?: true
    recruiterName?: true
    aiSummary?: true
    status?: true
    isFavorite?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CompanyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Company to aggregate.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Companies
    **/
    _count?: true | CompanyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyMaxAggregateInputType
  }

  export type GetCompanyAggregateType<T extends CompanyAggregateArgs> = {
        [P in keyof T & keyof AggregateCompany]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompany[P]>
      : GetScalarType<T[P], AggregateCompany[P]>
  }




  export type CompanyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyWhereInput
    orderBy?: CompanyOrderByWithAggregationInput | CompanyOrderByWithAggregationInput[]
    by: CompanyScalarFieldEnum[] | CompanyScalarFieldEnum
    having?: CompanyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyCountAggregateInputType | true
    _min?: CompanyMinAggregateInputType
    _max?: CompanyMaxAggregateInputType
  }

  export type CompanyGroupByOutputType = {
    id: string
    userId: string
    categoryId: string | null
    name: string
    website: string | null
    sector: string | null
    city: string | null
    country: string | null
    email: string | null
    phone: string | null
    recruiterName: string | null
    aiSummary: string | null
    status: $Enums.CompanyStatus
    isFavorite: boolean
    createdAt: Date
    updatedAt: Date
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  type GetCompanyGroupByPayload<T extends CompanyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyGroupByOutputType[P]>
        }
      >
    >


  export type CompanySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    categoryId?: boolean
    name?: boolean
    website?: boolean
    sector?: boolean
    city?: boolean
    country?: boolean
    email?: boolean
    phone?: boolean
    recruiterName?: boolean
    aiSummary?: boolean
    status?: boolean
    isFavorite?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | Company$categoryArgs<ExtArgs>
    applications?: boolean | Company$applicationsArgs<ExtArgs>
    notes?: boolean | Company$notesArgs<ExtArgs>
    actionHistory?: boolean | Company$actionHistoryArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    categoryId?: boolean
    name?: boolean
    website?: boolean
    sector?: boolean
    city?: boolean
    country?: boolean
    email?: boolean
    phone?: boolean
    recruiterName?: boolean
    aiSummary?: boolean
    status?: boolean
    isFavorite?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | Company$categoryArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    categoryId?: boolean
    name?: boolean
    website?: boolean
    sector?: boolean
    city?: boolean
    country?: boolean
    email?: boolean
    phone?: boolean
    recruiterName?: boolean
    aiSummary?: boolean
    status?: boolean
    isFavorite?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | Company$categoryArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectScalar = {
    id?: boolean
    userId?: boolean
    categoryId?: boolean
    name?: boolean
    website?: boolean
    sector?: boolean
    city?: boolean
    country?: boolean
    email?: boolean
    phone?: boolean
    recruiterName?: boolean
    aiSummary?: boolean
    status?: boolean
    isFavorite?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CompanyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "categoryId" | "name" | "website" | "sector" | "city" | "country" | "email" | "phone" | "recruiterName" | "aiSummary" | "status" | "isFavorite" | "createdAt" | "updatedAt", ExtArgs["result"]["company"]>
  export type CompanyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | Company$categoryArgs<ExtArgs>
    applications?: boolean | Company$applicationsArgs<ExtArgs>
    notes?: boolean | Company$notesArgs<ExtArgs>
    actionHistory?: boolean | Company$actionHistoryArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CompanyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | Company$categoryArgs<ExtArgs>
  }
  export type CompanyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | Company$categoryArgs<ExtArgs>
  }

  export type $CompanyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Company"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      category: Prisma.$CategoryPayload<ExtArgs> | null
      applications: Prisma.$ApplicationPayload<ExtArgs>[]
      notes: Prisma.$NotePayload<ExtArgs>[]
      actionHistory: Prisma.$ActionHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      categoryId: string | null
      name: string
      website: string | null
      sector: string | null
      city: string | null
      country: string | null
      email: string | null
      phone: string | null
      recruiterName: string | null
      aiSummary: string | null
      status: $Enums.CompanyStatus
      isFavorite: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["company"]>
    composites: {}
  }

  type CompanyGetPayload<S extends boolean | null | undefined | CompanyDefaultArgs> = $Result.GetResult<Prisma.$CompanyPayload, S>

  type CompanyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyCountAggregateInputType | true
    }

  export interface CompanyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Company'], meta: { name: 'Company' } }
    /**
     * Find zero or one Company that matches the filter.
     * @param {CompanyFindUniqueArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyFindUniqueArgs>(args: SelectSubset<T, CompanyFindUniqueArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Company that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanyFindUniqueOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyFindFirstArgs>(args?: SelectSubset<T, CompanyFindFirstArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Companies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Companies
     * const companies = await prisma.company.findMany()
     * 
     * // Get first 10 Companies
     * const companies = await prisma.company.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyWithIdOnly = await prisma.company.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanyFindManyArgs>(args?: SelectSubset<T, CompanyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Company.
     * @param {CompanyCreateArgs} args - Arguments to create a Company.
     * @example
     * // Create one Company
     * const Company = await prisma.company.create({
     *   data: {
     *     // ... data to create a Company
     *   }
     * })
     * 
     */
    create<T extends CompanyCreateArgs>(args: SelectSubset<T, CompanyCreateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Companies.
     * @param {CompanyCreateManyArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyCreateManyArgs>(args?: SelectSubset<T, CompanyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Companies and returns the data saved in the database.
     * @param {CompanyCreateManyAndReturnArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanyCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Company.
     * @param {CompanyDeleteArgs} args - Arguments to delete one Company.
     * @example
     * // Delete one Company
     * const Company = await prisma.company.delete({
     *   where: {
     *     // ... filter to delete one Company
     *   }
     * })
     * 
     */
    delete<T extends CompanyDeleteArgs>(args: SelectSubset<T, CompanyDeleteArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Company.
     * @param {CompanyUpdateArgs} args - Arguments to update one Company.
     * @example
     * // Update one Company
     * const company = await prisma.company.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyUpdateArgs>(args: SelectSubset<T, CompanyUpdateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Companies.
     * @param {CompanyDeleteManyArgs} args - Arguments to filter Companies to delete.
     * @example
     * // Delete a few Companies
     * const { count } = await prisma.company.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyDeleteManyArgs>(args?: SelectSubset<T, CompanyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyUpdateManyArgs>(args: SelectSubset<T, CompanyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies and returns the data updated in the database.
     * @param {CompanyUpdateManyAndReturnArgs} args - Arguments to update many Companies.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CompanyUpdateManyAndReturnArgs>(args: SelectSubset<T, CompanyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Company.
     * @param {CompanyUpsertArgs} args - Arguments to update or create a Company.
     * @example
     * // Update or create a Company
     * const company = await prisma.company.upsert({
     *   create: {
     *     // ... data to create a Company
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Company we want to update
     *   }
     * })
     */
    upsert<T extends CompanyUpsertArgs>(args: SelectSubset<T, CompanyUpsertArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCountArgs} args - Arguments to filter Companies to count.
     * @example
     * // Count the number of Companies
     * const count = await prisma.company.count({
     *   where: {
     *     // ... the filter for the Companies we want to count
     *   }
     * })
    **/
    count<T extends CompanyCountArgs>(
      args?: Subset<T, CompanyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanyAggregateArgs>(args: Subset<T, CompanyAggregateArgs>): Prisma.PrismaPromise<GetCompanyAggregateType<T>>

    /**
     * Group by Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompanyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyGroupByArgs['orderBy'] }
        : { orderBy?: CompanyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompanyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Company model
   */
  readonly fields: CompanyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Company.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    category<T extends Company$categoryArgs<ExtArgs> = {}>(args?: Subset<T, Company$categoryArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    applications<T extends Company$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, Company$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notes<T extends Company$notesArgs<ExtArgs> = {}>(args?: Subset<T, Company$notesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    actionHistory<T extends Company$actionHistoryArgs<ExtArgs> = {}>(args?: Subset<T, Company$actionHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Company model
   */
  interface CompanyFieldRefs {
    readonly id: FieldRef<"Company", 'String'>
    readonly userId: FieldRef<"Company", 'String'>
    readonly categoryId: FieldRef<"Company", 'String'>
    readonly name: FieldRef<"Company", 'String'>
    readonly website: FieldRef<"Company", 'String'>
    readonly sector: FieldRef<"Company", 'String'>
    readonly city: FieldRef<"Company", 'String'>
    readonly country: FieldRef<"Company", 'String'>
    readonly email: FieldRef<"Company", 'String'>
    readonly phone: FieldRef<"Company", 'String'>
    readonly recruiterName: FieldRef<"Company", 'String'>
    readonly aiSummary: FieldRef<"Company", 'String'>
    readonly status: FieldRef<"Company", 'CompanyStatus'>
    readonly isFavorite: FieldRef<"Company", 'Boolean'>
    readonly createdAt: FieldRef<"Company", 'DateTime'>
    readonly updatedAt: FieldRef<"Company", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Company findUnique
   */
  export type CompanyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findUniqueOrThrow
   */
  export type CompanyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findFirst
   */
  export type CompanyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findFirstOrThrow
   */
  export type CompanyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findMany
   */
  export type CompanyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Companies to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company create
   */
  export type CompanyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to create a Company.
     */
    data: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
  }

  /**
   * Company createMany
   */
  export type CompanyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company createManyAndReturn
   */
  export type CompanyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Company update
   */
  export type CompanyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to update a Company.
     */
    data: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
    /**
     * Choose, which Company to update.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company updateMany
   */
  export type CompanyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company updateManyAndReturn
   */
  export type CompanyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Company upsert
   */
  export type CompanyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The filter to search for the Company to update in case it exists.
     */
    where: CompanyWhereUniqueInput
    /**
     * In case the Company found by the `where` argument doesn't exist, create a new Company with this data.
     */
    create: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
    /**
     * In case the Company was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
  }

  /**
   * Company delete
   */
  export type CompanyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter which Company to delete.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company deleteMany
   */
  export type CompanyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Companies to delete
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to delete.
     */
    limit?: number
  }

  /**
   * Company.category
   */
  export type Company$categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
  }

  /**
   * Company.applications
   */
  export type Company$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    where?: ApplicationWhereInput
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    cursor?: ApplicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * Company.notes
   */
  export type Company$notesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    where?: NoteWhereInput
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    cursor?: NoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * Company.actionHistory
   */
  export type Company$actionHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionHistory
     */
    select?: ActionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionHistory
     */
    omit?: ActionHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionHistoryInclude<ExtArgs> | null
    where?: ActionHistoryWhereInput
    orderBy?: ActionHistoryOrderByWithRelationInput | ActionHistoryOrderByWithRelationInput[]
    cursor?: ActionHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActionHistoryScalarFieldEnum | ActionHistoryScalarFieldEnum[]
  }

  /**
   * Company without action
   */
  export type CompanyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
  }


  /**
   * Model Resume
   */

  export type AggregateResume = {
    _count: ResumeCountAggregateOutputType | null
    _avg: ResumeAvgAggregateOutputType | null
    _sum: ResumeSumAggregateOutputType | null
    _min: ResumeMinAggregateOutputType | null
    _max: ResumeMaxAggregateOutputType | null
  }

  export type ResumeAvgAggregateOutputType = {
    fileSize: number | null
  }

  export type ResumeSumAggregateOutputType = {
    fileSize: number | null
  }

  export type ResumeMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    fileUrl: string | null
    fileType: string | null
    fileSize: number | null
    createdAt: Date | null
    uploadedAt: Date | null
  }

  export type ResumeMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    fileUrl: string | null
    fileType: string | null
    fileSize: number | null
    createdAt: Date | null
    uploadedAt: Date | null
  }

  export type ResumeCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    fileUrl: number
    fileType: number
    fileSize: number
    createdAt: number
    uploadedAt: number
    _all: number
  }


  export type ResumeAvgAggregateInputType = {
    fileSize?: true
  }

  export type ResumeSumAggregateInputType = {
    fileSize?: true
  }

  export type ResumeMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    fileUrl?: true
    fileType?: true
    fileSize?: true
    createdAt?: true
    uploadedAt?: true
  }

  export type ResumeMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    fileUrl?: true
    fileType?: true
    fileSize?: true
    createdAt?: true
    uploadedAt?: true
  }

  export type ResumeCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    fileUrl?: true
    fileType?: true
    fileSize?: true
    createdAt?: true
    uploadedAt?: true
    _all?: true
  }

  export type ResumeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resume to aggregate.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Resumes
    **/
    _count?: true | ResumeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResumeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResumeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResumeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResumeMaxAggregateInputType
  }

  export type GetResumeAggregateType<T extends ResumeAggregateArgs> = {
        [P in keyof T & keyof AggregateResume]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResume[P]>
      : GetScalarType<T[P], AggregateResume[P]>
  }




  export type ResumeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResumeWhereInput
    orderBy?: ResumeOrderByWithAggregationInput | ResumeOrderByWithAggregationInput[]
    by: ResumeScalarFieldEnum[] | ResumeScalarFieldEnum
    having?: ResumeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResumeCountAggregateInputType | true
    _avg?: ResumeAvgAggregateInputType
    _sum?: ResumeSumAggregateInputType
    _min?: ResumeMinAggregateInputType
    _max?: ResumeMaxAggregateInputType
  }

  export type ResumeGroupByOutputType = {
    id: string
    userId: string
    name: string
    fileUrl: string
    fileType: string
    fileSize: number
    createdAt: Date
    uploadedAt: Date
    _count: ResumeCountAggregateOutputType | null
    _avg: ResumeAvgAggregateOutputType | null
    _sum: ResumeSumAggregateOutputType | null
    _min: ResumeMinAggregateOutputType | null
    _max: ResumeMaxAggregateOutputType | null
  }

  type GetResumeGroupByPayload<T extends ResumeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResumeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResumeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResumeGroupByOutputType[P]>
            : GetScalarType<T[P], ResumeGroupByOutputType[P]>
        }
      >
    >


  export type ResumeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    fileUrl?: boolean
    fileType?: boolean
    fileSize?: boolean
    createdAt?: boolean
    uploadedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    applications?: boolean | Resume$applicationsArgs<ExtArgs>
    _count?: boolean | ResumeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resume"]>

  export type ResumeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    fileUrl?: boolean
    fileType?: boolean
    fileSize?: boolean
    createdAt?: boolean
    uploadedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resume"]>

  export type ResumeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    fileUrl?: boolean
    fileType?: boolean
    fileSize?: boolean
    createdAt?: boolean
    uploadedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resume"]>

  export type ResumeSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    fileUrl?: boolean
    fileType?: boolean
    fileSize?: boolean
    createdAt?: boolean
    uploadedAt?: boolean
  }

  export type ResumeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "fileUrl" | "fileType" | "fileSize" | "createdAt" | "uploadedAt", ExtArgs["result"]["resume"]>
  export type ResumeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    applications?: boolean | Resume$applicationsArgs<ExtArgs>
    _count?: boolean | ResumeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ResumeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ResumeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ResumePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Resume"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      applications: Prisma.$ApplicationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      fileUrl: string
      fileType: string
      fileSize: number
      createdAt: Date
      uploadedAt: Date
    }, ExtArgs["result"]["resume"]>
    composites: {}
  }

  type ResumeGetPayload<S extends boolean | null | undefined | ResumeDefaultArgs> = $Result.GetResult<Prisma.$ResumePayload, S>

  type ResumeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResumeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResumeCountAggregateInputType | true
    }

  export interface ResumeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Resume'], meta: { name: 'Resume' } }
    /**
     * Find zero or one Resume that matches the filter.
     * @param {ResumeFindUniqueArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResumeFindUniqueArgs>(args: SelectSubset<T, ResumeFindUniqueArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Resume that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResumeFindUniqueOrThrowArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResumeFindUniqueOrThrowArgs>(args: SelectSubset<T, ResumeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Resume that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindFirstArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResumeFindFirstArgs>(args?: SelectSubset<T, ResumeFindFirstArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Resume that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindFirstOrThrowArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResumeFindFirstOrThrowArgs>(args?: SelectSubset<T, ResumeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Resumes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Resumes
     * const resumes = await prisma.resume.findMany()
     * 
     * // Get first 10 Resumes
     * const resumes = await prisma.resume.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resumeWithIdOnly = await prisma.resume.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResumeFindManyArgs>(args?: SelectSubset<T, ResumeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Resume.
     * @param {ResumeCreateArgs} args - Arguments to create a Resume.
     * @example
     * // Create one Resume
     * const Resume = await prisma.resume.create({
     *   data: {
     *     // ... data to create a Resume
     *   }
     * })
     * 
     */
    create<T extends ResumeCreateArgs>(args: SelectSubset<T, ResumeCreateArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Resumes.
     * @param {ResumeCreateManyArgs} args - Arguments to create many Resumes.
     * @example
     * // Create many Resumes
     * const resume = await prisma.resume.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResumeCreateManyArgs>(args?: SelectSubset<T, ResumeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Resumes and returns the data saved in the database.
     * @param {ResumeCreateManyAndReturnArgs} args - Arguments to create many Resumes.
     * @example
     * // Create many Resumes
     * const resume = await prisma.resume.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Resumes and only return the `id`
     * const resumeWithIdOnly = await prisma.resume.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResumeCreateManyAndReturnArgs>(args?: SelectSubset<T, ResumeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Resume.
     * @param {ResumeDeleteArgs} args - Arguments to delete one Resume.
     * @example
     * // Delete one Resume
     * const Resume = await prisma.resume.delete({
     *   where: {
     *     // ... filter to delete one Resume
     *   }
     * })
     * 
     */
    delete<T extends ResumeDeleteArgs>(args: SelectSubset<T, ResumeDeleteArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Resume.
     * @param {ResumeUpdateArgs} args - Arguments to update one Resume.
     * @example
     * // Update one Resume
     * const resume = await prisma.resume.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResumeUpdateArgs>(args: SelectSubset<T, ResumeUpdateArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Resumes.
     * @param {ResumeDeleteManyArgs} args - Arguments to filter Resumes to delete.
     * @example
     * // Delete a few Resumes
     * const { count } = await prisma.resume.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResumeDeleteManyArgs>(args?: SelectSubset<T, ResumeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Resumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Resumes
     * const resume = await prisma.resume.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResumeUpdateManyArgs>(args: SelectSubset<T, ResumeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Resumes and returns the data updated in the database.
     * @param {ResumeUpdateManyAndReturnArgs} args - Arguments to update many Resumes.
     * @example
     * // Update many Resumes
     * const resume = await prisma.resume.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Resumes and only return the `id`
     * const resumeWithIdOnly = await prisma.resume.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResumeUpdateManyAndReturnArgs>(args: SelectSubset<T, ResumeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Resume.
     * @param {ResumeUpsertArgs} args - Arguments to update or create a Resume.
     * @example
     * // Update or create a Resume
     * const resume = await prisma.resume.upsert({
     *   create: {
     *     // ... data to create a Resume
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Resume we want to update
     *   }
     * })
     */
    upsert<T extends ResumeUpsertArgs>(args: SelectSubset<T, ResumeUpsertArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Resumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeCountArgs} args - Arguments to filter Resumes to count.
     * @example
     * // Count the number of Resumes
     * const count = await prisma.resume.count({
     *   where: {
     *     // ... the filter for the Resumes we want to count
     *   }
     * })
    **/
    count<T extends ResumeCountArgs>(
      args?: Subset<T, ResumeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResumeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Resume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResumeAggregateArgs>(args: Subset<T, ResumeAggregateArgs>): Prisma.PrismaPromise<GetResumeAggregateType<T>>

    /**
     * Group by Resume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResumeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResumeGroupByArgs['orderBy'] }
        : { orderBy?: ResumeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResumeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResumeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Resume model
   */
  readonly fields: ResumeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Resume.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResumeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    applications<T extends Resume$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, Resume$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Resume model
   */
  interface ResumeFieldRefs {
    readonly id: FieldRef<"Resume", 'String'>
    readonly userId: FieldRef<"Resume", 'String'>
    readonly name: FieldRef<"Resume", 'String'>
    readonly fileUrl: FieldRef<"Resume", 'String'>
    readonly fileType: FieldRef<"Resume", 'String'>
    readonly fileSize: FieldRef<"Resume", 'Int'>
    readonly createdAt: FieldRef<"Resume", 'DateTime'>
    readonly uploadedAt: FieldRef<"Resume", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Resume findUnique
   */
  export type ResumeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume findUniqueOrThrow
   */
  export type ResumeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume findFirst
   */
  export type ResumeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resumes.
     */
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume findFirstOrThrow
   */
  export type ResumeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resumes.
     */
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume findMany
   */
  export type ResumeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resumes to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resumes.
     */
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume create
   */
  export type ResumeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The data needed to create a Resume.
     */
    data: XOR<ResumeCreateInput, ResumeUncheckedCreateInput>
  }

  /**
   * Resume createMany
   */
  export type ResumeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Resumes.
     */
    data: ResumeCreateManyInput | ResumeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Resume createManyAndReturn
   */
  export type ResumeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * The data used to create many Resumes.
     */
    data: ResumeCreateManyInput | ResumeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Resume update
   */
  export type ResumeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The data needed to update a Resume.
     */
    data: XOR<ResumeUpdateInput, ResumeUncheckedUpdateInput>
    /**
     * Choose, which Resume to update.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume updateMany
   */
  export type ResumeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Resumes.
     */
    data: XOR<ResumeUpdateManyMutationInput, ResumeUncheckedUpdateManyInput>
    /**
     * Filter which Resumes to update
     */
    where?: ResumeWhereInput
    /**
     * Limit how many Resumes to update.
     */
    limit?: number
  }

  /**
   * Resume updateManyAndReturn
   */
  export type ResumeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * The data used to update Resumes.
     */
    data: XOR<ResumeUpdateManyMutationInput, ResumeUncheckedUpdateManyInput>
    /**
     * Filter which Resumes to update
     */
    where?: ResumeWhereInput
    /**
     * Limit how many Resumes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Resume upsert
   */
  export type ResumeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The filter to search for the Resume to update in case it exists.
     */
    where: ResumeWhereUniqueInput
    /**
     * In case the Resume found by the `where` argument doesn't exist, create a new Resume with this data.
     */
    create: XOR<ResumeCreateInput, ResumeUncheckedCreateInput>
    /**
     * In case the Resume was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResumeUpdateInput, ResumeUncheckedUpdateInput>
  }

  /**
   * Resume delete
   */
  export type ResumeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter which Resume to delete.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume deleteMany
   */
  export type ResumeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resumes to delete
     */
    where?: ResumeWhereInput
    /**
     * Limit how many Resumes to delete.
     */
    limit?: number
  }

  /**
   * Resume.applications
   */
  export type Resume$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    where?: ApplicationWhereInput
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    cursor?: ApplicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * Resume without action
   */
  export type ResumeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
  }


  /**
   * Model Application
   */

  export type AggregateApplication = {
    _count: ApplicationCountAggregateOutputType | null
    _min: ApplicationMinAggregateOutputType | null
    _max: ApplicationMaxAggregateOutputType | null
  }

  export type ApplicationMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    resumeId: string | null
    emailSubject: string | null
    emailBody: string | null
    status: $Enums.CompanyStatus | null
    sentAt: Date | null
    createdAt: Date | null
  }

  export type ApplicationMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    resumeId: string | null
    emailSubject: string | null
    emailBody: string | null
    status: $Enums.CompanyStatus | null
    sentAt: Date | null
    createdAt: Date | null
  }

  export type ApplicationCountAggregateOutputType = {
    id: number
    companyId: number
    resumeId: number
    emailSubject: number
    emailBody: number
    status: number
    sentAt: number
    createdAt: number
    _all: number
  }


  export type ApplicationMinAggregateInputType = {
    id?: true
    companyId?: true
    resumeId?: true
    emailSubject?: true
    emailBody?: true
    status?: true
    sentAt?: true
    createdAt?: true
  }

  export type ApplicationMaxAggregateInputType = {
    id?: true
    companyId?: true
    resumeId?: true
    emailSubject?: true
    emailBody?: true
    status?: true
    sentAt?: true
    createdAt?: true
  }

  export type ApplicationCountAggregateInputType = {
    id?: true
    companyId?: true
    resumeId?: true
    emailSubject?: true
    emailBody?: true
    status?: true
    sentAt?: true
    createdAt?: true
    _all?: true
  }

  export type ApplicationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Application to aggregate.
     */
    where?: ApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Applications
    **/
    _count?: true | ApplicationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApplicationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApplicationMaxAggregateInputType
  }

  export type GetApplicationAggregateType<T extends ApplicationAggregateArgs> = {
        [P in keyof T & keyof AggregateApplication]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApplication[P]>
      : GetScalarType<T[P], AggregateApplication[P]>
  }




  export type ApplicationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationWhereInput
    orderBy?: ApplicationOrderByWithAggregationInput | ApplicationOrderByWithAggregationInput[]
    by: ApplicationScalarFieldEnum[] | ApplicationScalarFieldEnum
    having?: ApplicationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApplicationCountAggregateInputType | true
    _min?: ApplicationMinAggregateInputType
    _max?: ApplicationMaxAggregateInputType
  }

  export type ApplicationGroupByOutputType = {
    id: string
    companyId: string
    resumeId: string
    emailSubject: string
    emailBody: string
    status: $Enums.CompanyStatus
    sentAt: Date | null
    createdAt: Date
    _count: ApplicationCountAggregateOutputType | null
    _min: ApplicationMinAggregateOutputType | null
    _max: ApplicationMaxAggregateOutputType | null
  }

  type GetApplicationGroupByPayload<T extends ApplicationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApplicationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApplicationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApplicationGroupByOutputType[P]>
            : GetScalarType<T[P], ApplicationGroupByOutputType[P]>
        }
      >
    >


  export type ApplicationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    resumeId?: boolean
    emailSubject?: boolean
    emailBody?: boolean
    status?: boolean
    sentAt?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["application"]>

  export type ApplicationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    resumeId?: boolean
    emailSubject?: boolean
    emailBody?: boolean
    status?: boolean
    sentAt?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["application"]>

  export type ApplicationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    resumeId?: boolean
    emailSubject?: boolean
    emailBody?: boolean
    status?: boolean
    sentAt?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["application"]>

  export type ApplicationSelectScalar = {
    id?: boolean
    companyId?: boolean
    resumeId?: boolean
    emailSubject?: boolean
    emailBody?: boolean
    status?: boolean
    sentAt?: boolean
    createdAt?: boolean
  }

  export type ApplicationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "resumeId" | "emailSubject" | "emailBody" | "status" | "sentAt" | "createdAt", ExtArgs["result"]["application"]>
  export type ApplicationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
  }
  export type ApplicationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
  }
  export type ApplicationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
  }

  export type $ApplicationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Application"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      resume: Prisma.$ResumePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      resumeId: string
      emailSubject: string
      emailBody: string
      status: $Enums.CompanyStatus
      sentAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["application"]>
    composites: {}
  }

  type ApplicationGetPayload<S extends boolean | null | undefined | ApplicationDefaultArgs> = $Result.GetResult<Prisma.$ApplicationPayload, S>

  type ApplicationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApplicationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApplicationCountAggregateInputType | true
    }

  export interface ApplicationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Application'], meta: { name: 'Application' } }
    /**
     * Find zero or one Application that matches the filter.
     * @param {ApplicationFindUniqueArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApplicationFindUniqueArgs>(args: SelectSubset<T, ApplicationFindUniqueArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Application that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApplicationFindUniqueOrThrowArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApplicationFindUniqueOrThrowArgs>(args: SelectSubset<T, ApplicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Application that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationFindFirstArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApplicationFindFirstArgs>(args?: SelectSubset<T, ApplicationFindFirstArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Application that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationFindFirstOrThrowArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApplicationFindFirstOrThrowArgs>(args?: SelectSubset<T, ApplicationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Applications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Applications
     * const applications = await prisma.application.findMany()
     * 
     * // Get first 10 Applications
     * const applications = await prisma.application.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const applicationWithIdOnly = await prisma.application.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApplicationFindManyArgs>(args?: SelectSubset<T, ApplicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Application.
     * @param {ApplicationCreateArgs} args - Arguments to create a Application.
     * @example
     * // Create one Application
     * const Application = await prisma.application.create({
     *   data: {
     *     // ... data to create a Application
     *   }
     * })
     * 
     */
    create<T extends ApplicationCreateArgs>(args: SelectSubset<T, ApplicationCreateArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Applications.
     * @param {ApplicationCreateManyArgs} args - Arguments to create many Applications.
     * @example
     * // Create many Applications
     * const application = await prisma.application.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApplicationCreateManyArgs>(args?: SelectSubset<T, ApplicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Applications and returns the data saved in the database.
     * @param {ApplicationCreateManyAndReturnArgs} args - Arguments to create many Applications.
     * @example
     * // Create many Applications
     * const application = await prisma.application.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Applications and only return the `id`
     * const applicationWithIdOnly = await prisma.application.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApplicationCreateManyAndReturnArgs>(args?: SelectSubset<T, ApplicationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Application.
     * @param {ApplicationDeleteArgs} args - Arguments to delete one Application.
     * @example
     * // Delete one Application
     * const Application = await prisma.application.delete({
     *   where: {
     *     // ... filter to delete one Application
     *   }
     * })
     * 
     */
    delete<T extends ApplicationDeleteArgs>(args: SelectSubset<T, ApplicationDeleteArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Application.
     * @param {ApplicationUpdateArgs} args - Arguments to update one Application.
     * @example
     * // Update one Application
     * const application = await prisma.application.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApplicationUpdateArgs>(args: SelectSubset<T, ApplicationUpdateArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Applications.
     * @param {ApplicationDeleteManyArgs} args - Arguments to filter Applications to delete.
     * @example
     * // Delete a few Applications
     * const { count } = await prisma.application.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApplicationDeleteManyArgs>(args?: SelectSubset<T, ApplicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Applications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Applications
     * const application = await prisma.application.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApplicationUpdateManyArgs>(args: SelectSubset<T, ApplicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Applications and returns the data updated in the database.
     * @param {ApplicationUpdateManyAndReturnArgs} args - Arguments to update many Applications.
     * @example
     * // Update many Applications
     * const application = await prisma.application.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Applications and only return the `id`
     * const applicationWithIdOnly = await prisma.application.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ApplicationUpdateManyAndReturnArgs>(args: SelectSubset<T, ApplicationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Application.
     * @param {ApplicationUpsertArgs} args - Arguments to update or create a Application.
     * @example
     * // Update or create a Application
     * const application = await prisma.application.upsert({
     *   create: {
     *     // ... data to create a Application
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Application we want to update
     *   }
     * })
     */
    upsert<T extends ApplicationUpsertArgs>(args: SelectSubset<T, ApplicationUpsertArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Applications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationCountArgs} args - Arguments to filter Applications to count.
     * @example
     * // Count the number of Applications
     * const count = await prisma.application.count({
     *   where: {
     *     // ... the filter for the Applications we want to count
     *   }
     * })
    **/
    count<T extends ApplicationCountArgs>(
      args?: Subset<T, ApplicationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApplicationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Application.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ApplicationAggregateArgs>(args: Subset<T, ApplicationAggregateArgs>): Prisma.PrismaPromise<GetApplicationAggregateType<T>>

    /**
     * Group by Application.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ApplicationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApplicationGroupByArgs['orderBy'] }
        : { orderBy?: ApplicationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ApplicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApplicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Application model
   */
  readonly fields: ApplicationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Application.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApplicationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    resume<T extends ResumeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ResumeDefaultArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Application model
   */
  interface ApplicationFieldRefs {
    readonly id: FieldRef<"Application", 'String'>
    readonly companyId: FieldRef<"Application", 'String'>
    readonly resumeId: FieldRef<"Application", 'String'>
    readonly emailSubject: FieldRef<"Application", 'String'>
    readonly emailBody: FieldRef<"Application", 'String'>
    readonly status: FieldRef<"Application", 'CompanyStatus'>
    readonly sentAt: FieldRef<"Application", 'DateTime'>
    readonly createdAt: FieldRef<"Application", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Application findUnique
   */
  export type ApplicationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Application to fetch.
     */
    where: ApplicationWhereUniqueInput
  }

  /**
   * Application findUniqueOrThrow
   */
  export type ApplicationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Application to fetch.
     */
    where: ApplicationWhereUniqueInput
  }

  /**
   * Application findFirst
   */
  export type ApplicationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Application to fetch.
     */
    where?: ApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Applications.
     */
    cursor?: ApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Applications.
     */
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * Application findFirstOrThrow
   */
  export type ApplicationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Application to fetch.
     */
    where?: ApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Applications.
     */
    cursor?: ApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Applications.
     */
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * Application findMany
   */
  export type ApplicationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Applications to fetch.
     */
    where?: ApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Applications.
     */
    cursor?: ApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Applications.
     */
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * Application create
   */
  export type ApplicationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * The data needed to create a Application.
     */
    data: XOR<ApplicationCreateInput, ApplicationUncheckedCreateInput>
  }

  /**
   * Application createMany
   */
  export type ApplicationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Applications.
     */
    data: ApplicationCreateManyInput | ApplicationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Application createManyAndReturn
   */
  export type ApplicationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * The data used to create many Applications.
     */
    data: ApplicationCreateManyInput | ApplicationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Application update
   */
  export type ApplicationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * The data needed to update a Application.
     */
    data: XOR<ApplicationUpdateInput, ApplicationUncheckedUpdateInput>
    /**
     * Choose, which Application to update.
     */
    where: ApplicationWhereUniqueInput
  }

  /**
   * Application updateMany
   */
  export type ApplicationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Applications.
     */
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyInput>
    /**
     * Filter which Applications to update
     */
    where?: ApplicationWhereInput
    /**
     * Limit how many Applications to update.
     */
    limit?: number
  }

  /**
   * Application updateManyAndReturn
   */
  export type ApplicationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * The data used to update Applications.
     */
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyInput>
    /**
     * Filter which Applications to update
     */
    where?: ApplicationWhereInput
    /**
     * Limit how many Applications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Application upsert
   */
  export type ApplicationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * The filter to search for the Application to update in case it exists.
     */
    where: ApplicationWhereUniqueInput
    /**
     * In case the Application found by the `where` argument doesn't exist, create a new Application with this data.
     */
    create: XOR<ApplicationCreateInput, ApplicationUncheckedCreateInput>
    /**
     * In case the Application was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApplicationUpdateInput, ApplicationUncheckedUpdateInput>
  }

  /**
   * Application delete
   */
  export type ApplicationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter which Application to delete.
     */
    where: ApplicationWhereUniqueInput
  }

  /**
   * Application deleteMany
   */
  export type ApplicationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Applications to delete
     */
    where?: ApplicationWhereInput
    /**
     * Limit how many Applications to delete.
     */
    limit?: number
  }

  /**
   * Application without action
   */
  export type ApplicationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
  }


  /**
   * Model Note
   */

  export type AggregateNote = {
    _count: NoteCountAggregateOutputType | null
    _min: NoteMinAggregateOutputType | null
    _max: NoteMaxAggregateOutputType | null
  }

  export type NoteMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NoteMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NoteCountAggregateOutputType = {
    id: number
    companyId: number
    content: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NoteMinAggregateInputType = {
    id?: true
    companyId?: true
    content?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NoteMaxAggregateInputType = {
    id?: true
    companyId?: true
    content?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NoteCountAggregateInputType = {
    id?: true
    companyId?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Note to aggregate.
     */
    where?: NoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notes to fetch.
     */
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notes
    **/
    _count?: true | NoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NoteMaxAggregateInputType
  }

  export type GetNoteAggregateType<T extends NoteAggregateArgs> = {
        [P in keyof T & keyof AggregateNote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNote[P]>
      : GetScalarType<T[P], AggregateNote[P]>
  }




  export type NoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NoteWhereInput
    orderBy?: NoteOrderByWithAggregationInput | NoteOrderByWithAggregationInput[]
    by: NoteScalarFieldEnum[] | NoteScalarFieldEnum
    having?: NoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NoteCountAggregateInputType | true
    _min?: NoteMinAggregateInputType
    _max?: NoteMaxAggregateInputType
  }

  export type NoteGroupByOutputType = {
    id: string
    companyId: string
    content: string
    createdAt: Date
    updatedAt: Date
    _count: NoteCountAggregateOutputType | null
    _min: NoteMinAggregateOutputType | null
    _max: NoteMaxAggregateOutputType | null
  }

  type GetNoteGroupByPayload<T extends NoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NoteGroupByOutputType[P]>
            : GetScalarType<T[P], NoteGroupByOutputType[P]>
        }
      >
    >


  export type NoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["note"]>

  export type NoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["note"]>

  export type NoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["note"]>

  export type NoteSelectScalar = {
    id?: boolean
    companyId?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "content" | "createdAt" | "updatedAt", ExtArgs["result"]["note"]>
  export type NoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type NoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type NoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $NotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Note"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      content: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["note"]>
    composites: {}
  }

  type NoteGetPayload<S extends boolean | null | undefined | NoteDefaultArgs> = $Result.GetResult<Prisma.$NotePayload, S>

  type NoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NoteCountAggregateInputType | true
    }

  export interface NoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Note'], meta: { name: 'Note' } }
    /**
     * Find zero or one Note that matches the filter.
     * @param {NoteFindUniqueArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NoteFindUniqueArgs>(args: SelectSubset<T, NoteFindUniqueArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Note that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NoteFindUniqueOrThrowArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NoteFindUniqueOrThrowArgs>(args: SelectSubset<T, NoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Note that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteFindFirstArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NoteFindFirstArgs>(args?: SelectSubset<T, NoteFindFirstArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Note that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteFindFirstOrThrowArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NoteFindFirstOrThrowArgs>(args?: SelectSubset<T, NoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notes
     * const notes = await prisma.note.findMany()
     * 
     * // Get first 10 Notes
     * const notes = await prisma.note.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const noteWithIdOnly = await prisma.note.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NoteFindManyArgs>(args?: SelectSubset<T, NoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Note.
     * @param {NoteCreateArgs} args - Arguments to create a Note.
     * @example
     * // Create one Note
     * const Note = await prisma.note.create({
     *   data: {
     *     // ... data to create a Note
     *   }
     * })
     * 
     */
    create<T extends NoteCreateArgs>(args: SelectSubset<T, NoteCreateArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notes.
     * @param {NoteCreateManyArgs} args - Arguments to create many Notes.
     * @example
     * // Create many Notes
     * const note = await prisma.note.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NoteCreateManyArgs>(args?: SelectSubset<T, NoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notes and returns the data saved in the database.
     * @param {NoteCreateManyAndReturnArgs} args - Arguments to create many Notes.
     * @example
     * // Create many Notes
     * const note = await prisma.note.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notes and only return the `id`
     * const noteWithIdOnly = await prisma.note.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NoteCreateManyAndReturnArgs>(args?: SelectSubset<T, NoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Note.
     * @param {NoteDeleteArgs} args - Arguments to delete one Note.
     * @example
     * // Delete one Note
     * const Note = await prisma.note.delete({
     *   where: {
     *     // ... filter to delete one Note
     *   }
     * })
     * 
     */
    delete<T extends NoteDeleteArgs>(args: SelectSubset<T, NoteDeleteArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Note.
     * @param {NoteUpdateArgs} args - Arguments to update one Note.
     * @example
     * // Update one Note
     * const note = await prisma.note.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NoteUpdateArgs>(args: SelectSubset<T, NoteUpdateArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notes.
     * @param {NoteDeleteManyArgs} args - Arguments to filter Notes to delete.
     * @example
     * // Delete a few Notes
     * const { count } = await prisma.note.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NoteDeleteManyArgs>(args?: SelectSubset<T, NoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notes
     * const note = await prisma.note.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NoteUpdateManyArgs>(args: SelectSubset<T, NoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notes and returns the data updated in the database.
     * @param {NoteUpdateManyAndReturnArgs} args - Arguments to update many Notes.
     * @example
     * // Update many Notes
     * const note = await prisma.note.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notes and only return the `id`
     * const noteWithIdOnly = await prisma.note.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NoteUpdateManyAndReturnArgs>(args: SelectSubset<T, NoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Note.
     * @param {NoteUpsertArgs} args - Arguments to update or create a Note.
     * @example
     * // Update or create a Note
     * const note = await prisma.note.upsert({
     *   create: {
     *     // ... data to create a Note
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Note we want to update
     *   }
     * })
     */
    upsert<T extends NoteUpsertArgs>(args: SelectSubset<T, NoteUpsertArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteCountArgs} args - Arguments to filter Notes to count.
     * @example
     * // Count the number of Notes
     * const count = await prisma.note.count({
     *   where: {
     *     // ... the filter for the Notes we want to count
     *   }
     * })
    **/
    count<T extends NoteCountArgs>(
      args?: Subset<T, NoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Note.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NoteAggregateArgs>(args: Subset<T, NoteAggregateArgs>): Prisma.PrismaPromise<GetNoteAggregateType<T>>

    /**
     * Group by Note.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NoteGroupByArgs['orderBy'] }
        : { orderBy?: NoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Note model
   */
  readonly fields: NoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Note.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Note model
   */
  interface NoteFieldRefs {
    readonly id: FieldRef<"Note", 'String'>
    readonly companyId: FieldRef<"Note", 'String'>
    readonly content: FieldRef<"Note", 'String'>
    readonly createdAt: FieldRef<"Note", 'DateTime'>
    readonly updatedAt: FieldRef<"Note", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Note findUnique
   */
  export type NoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Note to fetch.
     */
    where: NoteWhereUniqueInput
  }

  /**
   * Note findUniqueOrThrow
   */
  export type NoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Note to fetch.
     */
    where: NoteWhereUniqueInput
  }

  /**
   * Note findFirst
   */
  export type NoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Note to fetch.
     */
    where?: NoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notes to fetch.
     */
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notes.
     */
    cursor?: NoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notes.
     */
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * Note findFirstOrThrow
   */
  export type NoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Note to fetch.
     */
    where?: NoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notes to fetch.
     */
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notes.
     */
    cursor?: NoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notes.
     */
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * Note findMany
   */
  export type NoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Notes to fetch.
     */
    where?: NoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notes to fetch.
     */
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notes.
     */
    cursor?: NoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notes.
     */
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * Note create
   */
  export type NoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * The data needed to create a Note.
     */
    data: XOR<NoteCreateInput, NoteUncheckedCreateInput>
  }

  /**
   * Note createMany
   */
  export type NoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notes.
     */
    data: NoteCreateManyInput | NoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Note createManyAndReturn
   */
  export type NoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * The data used to create many Notes.
     */
    data: NoteCreateManyInput | NoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Note update
   */
  export type NoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * The data needed to update a Note.
     */
    data: XOR<NoteUpdateInput, NoteUncheckedUpdateInput>
    /**
     * Choose, which Note to update.
     */
    where: NoteWhereUniqueInput
  }

  /**
   * Note updateMany
   */
  export type NoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notes.
     */
    data: XOR<NoteUpdateManyMutationInput, NoteUncheckedUpdateManyInput>
    /**
     * Filter which Notes to update
     */
    where?: NoteWhereInput
    /**
     * Limit how many Notes to update.
     */
    limit?: number
  }

  /**
   * Note updateManyAndReturn
   */
  export type NoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * The data used to update Notes.
     */
    data: XOR<NoteUpdateManyMutationInput, NoteUncheckedUpdateManyInput>
    /**
     * Filter which Notes to update
     */
    where?: NoteWhereInput
    /**
     * Limit how many Notes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Note upsert
   */
  export type NoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * The filter to search for the Note to update in case it exists.
     */
    where: NoteWhereUniqueInput
    /**
     * In case the Note found by the `where` argument doesn't exist, create a new Note with this data.
     */
    create: XOR<NoteCreateInput, NoteUncheckedCreateInput>
    /**
     * In case the Note was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NoteUpdateInput, NoteUncheckedUpdateInput>
  }

  /**
   * Note delete
   */
  export type NoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter which Note to delete.
     */
    where: NoteWhereUniqueInput
  }

  /**
   * Note deleteMany
   */
  export type NoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notes to delete
     */
    where?: NoteWhereInput
    /**
     * Limit how many Notes to delete.
     */
    limit?: number
  }

  /**
   * Note without action
   */
  export type NoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
  }


  /**
   * Model ActionHistory
   */

  export type AggregateActionHistory = {
    _count: ActionHistoryCountAggregateOutputType | null
    _min: ActionHistoryMinAggregateOutputType | null
    _max: ActionHistoryMaxAggregateOutputType | null
  }

  export type ActionHistoryMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    actionType: string | null
    description: string | null
    createdAt: Date | null
  }

  export type ActionHistoryMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    actionType: string | null
    description: string | null
    createdAt: Date | null
  }

  export type ActionHistoryCountAggregateOutputType = {
    id: number
    companyId: number
    actionType: number
    description: number
    createdAt: number
    _all: number
  }


  export type ActionHistoryMinAggregateInputType = {
    id?: true
    companyId?: true
    actionType?: true
    description?: true
    createdAt?: true
  }

  export type ActionHistoryMaxAggregateInputType = {
    id?: true
    companyId?: true
    actionType?: true
    description?: true
    createdAt?: true
  }

  export type ActionHistoryCountAggregateInputType = {
    id?: true
    companyId?: true
    actionType?: true
    description?: true
    createdAt?: true
    _all?: true
  }

  export type ActionHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActionHistory to aggregate.
     */
    where?: ActionHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActionHistories to fetch.
     */
    orderBy?: ActionHistoryOrderByWithRelationInput | ActionHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActionHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActionHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActionHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActionHistories
    **/
    _count?: true | ActionHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActionHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActionHistoryMaxAggregateInputType
  }

  export type GetActionHistoryAggregateType<T extends ActionHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateActionHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActionHistory[P]>
      : GetScalarType<T[P], AggregateActionHistory[P]>
  }




  export type ActionHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActionHistoryWhereInput
    orderBy?: ActionHistoryOrderByWithAggregationInput | ActionHistoryOrderByWithAggregationInput[]
    by: ActionHistoryScalarFieldEnum[] | ActionHistoryScalarFieldEnum
    having?: ActionHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActionHistoryCountAggregateInputType | true
    _min?: ActionHistoryMinAggregateInputType
    _max?: ActionHistoryMaxAggregateInputType
  }

  export type ActionHistoryGroupByOutputType = {
    id: string
    companyId: string
    actionType: string
    description: string | null
    createdAt: Date
    _count: ActionHistoryCountAggregateOutputType | null
    _min: ActionHistoryMinAggregateOutputType | null
    _max: ActionHistoryMaxAggregateOutputType | null
  }

  type GetActionHistoryGroupByPayload<T extends ActionHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActionHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActionHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActionHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], ActionHistoryGroupByOutputType[P]>
        }
      >
    >


  export type ActionHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    actionType?: boolean
    description?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["actionHistory"]>

  export type ActionHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    actionType?: boolean
    description?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["actionHistory"]>

  export type ActionHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    actionType?: boolean
    description?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["actionHistory"]>

  export type ActionHistorySelectScalar = {
    id?: boolean
    companyId?: boolean
    actionType?: boolean
    description?: boolean
    createdAt?: boolean
  }

  export type ActionHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "actionType" | "description" | "createdAt", ExtArgs["result"]["actionHistory"]>
  export type ActionHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type ActionHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type ActionHistoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $ActionHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActionHistory"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      actionType: string
      description: string | null
      createdAt: Date
    }, ExtArgs["result"]["actionHistory"]>
    composites: {}
  }

  type ActionHistoryGetPayload<S extends boolean | null | undefined | ActionHistoryDefaultArgs> = $Result.GetResult<Prisma.$ActionHistoryPayload, S>

  type ActionHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActionHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActionHistoryCountAggregateInputType | true
    }

  export interface ActionHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActionHistory'], meta: { name: 'ActionHistory' } }
    /**
     * Find zero or one ActionHistory that matches the filter.
     * @param {ActionHistoryFindUniqueArgs} args - Arguments to find a ActionHistory
     * @example
     * // Get one ActionHistory
     * const actionHistory = await prisma.actionHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActionHistoryFindUniqueArgs>(args: SelectSubset<T, ActionHistoryFindUniqueArgs<ExtArgs>>): Prisma__ActionHistoryClient<$Result.GetResult<Prisma.$ActionHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ActionHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActionHistoryFindUniqueOrThrowArgs} args - Arguments to find a ActionHistory
     * @example
     * // Get one ActionHistory
     * const actionHistory = await prisma.actionHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActionHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, ActionHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActionHistoryClient<$Result.GetResult<Prisma.$ActionHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActionHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionHistoryFindFirstArgs} args - Arguments to find a ActionHistory
     * @example
     * // Get one ActionHistory
     * const actionHistory = await prisma.actionHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActionHistoryFindFirstArgs>(args?: SelectSubset<T, ActionHistoryFindFirstArgs<ExtArgs>>): Prisma__ActionHistoryClient<$Result.GetResult<Prisma.$ActionHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActionHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionHistoryFindFirstOrThrowArgs} args - Arguments to find a ActionHistory
     * @example
     * // Get one ActionHistory
     * const actionHistory = await prisma.actionHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActionHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, ActionHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActionHistoryClient<$Result.GetResult<Prisma.$ActionHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ActionHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActionHistories
     * const actionHistories = await prisma.actionHistory.findMany()
     * 
     * // Get first 10 ActionHistories
     * const actionHistories = await prisma.actionHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const actionHistoryWithIdOnly = await prisma.actionHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActionHistoryFindManyArgs>(args?: SelectSubset<T, ActionHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ActionHistory.
     * @param {ActionHistoryCreateArgs} args - Arguments to create a ActionHistory.
     * @example
     * // Create one ActionHistory
     * const ActionHistory = await prisma.actionHistory.create({
     *   data: {
     *     // ... data to create a ActionHistory
     *   }
     * })
     * 
     */
    create<T extends ActionHistoryCreateArgs>(args: SelectSubset<T, ActionHistoryCreateArgs<ExtArgs>>): Prisma__ActionHistoryClient<$Result.GetResult<Prisma.$ActionHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ActionHistories.
     * @param {ActionHistoryCreateManyArgs} args - Arguments to create many ActionHistories.
     * @example
     * // Create many ActionHistories
     * const actionHistory = await prisma.actionHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActionHistoryCreateManyArgs>(args?: SelectSubset<T, ActionHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActionHistories and returns the data saved in the database.
     * @param {ActionHistoryCreateManyAndReturnArgs} args - Arguments to create many ActionHistories.
     * @example
     * // Create many ActionHistories
     * const actionHistory = await prisma.actionHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActionHistories and only return the `id`
     * const actionHistoryWithIdOnly = await prisma.actionHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActionHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, ActionHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ActionHistory.
     * @param {ActionHistoryDeleteArgs} args - Arguments to delete one ActionHistory.
     * @example
     * // Delete one ActionHistory
     * const ActionHistory = await prisma.actionHistory.delete({
     *   where: {
     *     // ... filter to delete one ActionHistory
     *   }
     * })
     * 
     */
    delete<T extends ActionHistoryDeleteArgs>(args: SelectSubset<T, ActionHistoryDeleteArgs<ExtArgs>>): Prisma__ActionHistoryClient<$Result.GetResult<Prisma.$ActionHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ActionHistory.
     * @param {ActionHistoryUpdateArgs} args - Arguments to update one ActionHistory.
     * @example
     * // Update one ActionHistory
     * const actionHistory = await prisma.actionHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActionHistoryUpdateArgs>(args: SelectSubset<T, ActionHistoryUpdateArgs<ExtArgs>>): Prisma__ActionHistoryClient<$Result.GetResult<Prisma.$ActionHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ActionHistories.
     * @param {ActionHistoryDeleteManyArgs} args - Arguments to filter ActionHistories to delete.
     * @example
     * // Delete a few ActionHistories
     * const { count } = await prisma.actionHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActionHistoryDeleteManyArgs>(args?: SelectSubset<T, ActionHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActionHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActionHistories
     * const actionHistory = await prisma.actionHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActionHistoryUpdateManyArgs>(args: SelectSubset<T, ActionHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActionHistories and returns the data updated in the database.
     * @param {ActionHistoryUpdateManyAndReturnArgs} args - Arguments to update many ActionHistories.
     * @example
     * // Update many ActionHistories
     * const actionHistory = await prisma.actionHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ActionHistories and only return the `id`
     * const actionHistoryWithIdOnly = await prisma.actionHistory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActionHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, ActionHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ActionHistory.
     * @param {ActionHistoryUpsertArgs} args - Arguments to update or create a ActionHistory.
     * @example
     * // Update or create a ActionHistory
     * const actionHistory = await prisma.actionHistory.upsert({
     *   create: {
     *     // ... data to create a ActionHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActionHistory we want to update
     *   }
     * })
     */
    upsert<T extends ActionHistoryUpsertArgs>(args: SelectSubset<T, ActionHistoryUpsertArgs<ExtArgs>>): Prisma__ActionHistoryClient<$Result.GetResult<Prisma.$ActionHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ActionHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionHistoryCountArgs} args - Arguments to filter ActionHistories to count.
     * @example
     * // Count the number of ActionHistories
     * const count = await prisma.actionHistory.count({
     *   where: {
     *     // ... the filter for the ActionHistories we want to count
     *   }
     * })
    **/
    count<T extends ActionHistoryCountArgs>(
      args?: Subset<T, ActionHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActionHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActionHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActionHistoryAggregateArgs>(args: Subset<T, ActionHistoryAggregateArgs>): Prisma.PrismaPromise<GetActionHistoryAggregateType<T>>

    /**
     * Group by ActionHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActionHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActionHistoryGroupByArgs['orderBy'] }
        : { orderBy?: ActionHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActionHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActionHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActionHistory model
   */
  readonly fields: ActionHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActionHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActionHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ActionHistory model
   */
  interface ActionHistoryFieldRefs {
    readonly id: FieldRef<"ActionHistory", 'String'>
    readonly companyId: FieldRef<"ActionHistory", 'String'>
    readonly actionType: FieldRef<"ActionHistory", 'String'>
    readonly description: FieldRef<"ActionHistory", 'String'>
    readonly createdAt: FieldRef<"ActionHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ActionHistory findUnique
   */
  export type ActionHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionHistory
     */
    select?: ActionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionHistory
     */
    omit?: ActionHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ActionHistory to fetch.
     */
    where: ActionHistoryWhereUniqueInput
  }

  /**
   * ActionHistory findUniqueOrThrow
   */
  export type ActionHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionHistory
     */
    select?: ActionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionHistory
     */
    omit?: ActionHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ActionHistory to fetch.
     */
    where: ActionHistoryWhereUniqueInput
  }

  /**
   * ActionHistory findFirst
   */
  export type ActionHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionHistory
     */
    select?: ActionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionHistory
     */
    omit?: ActionHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ActionHistory to fetch.
     */
    where?: ActionHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActionHistories to fetch.
     */
    orderBy?: ActionHistoryOrderByWithRelationInput | ActionHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActionHistories.
     */
    cursor?: ActionHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActionHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActionHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActionHistories.
     */
    distinct?: ActionHistoryScalarFieldEnum | ActionHistoryScalarFieldEnum[]
  }

  /**
   * ActionHistory findFirstOrThrow
   */
  export type ActionHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionHistory
     */
    select?: ActionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionHistory
     */
    omit?: ActionHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ActionHistory to fetch.
     */
    where?: ActionHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActionHistories to fetch.
     */
    orderBy?: ActionHistoryOrderByWithRelationInput | ActionHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActionHistories.
     */
    cursor?: ActionHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActionHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActionHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActionHistories.
     */
    distinct?: ActionHistoryScalarFieldEnum | ActionHistoryScalarFieldEnum[]
  }

  /**
   * ActionHistory findMany
   */
  export type ActionHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionHistory
     */
    select?: ActionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionHistory
     */
    omit?: ActionHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ActionHistories to fetch.
     */
    where?: ActionHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActionHistories to fetch.
     */
    orderBy?: ActionHistoryOrderByWithRelationInput | ActionHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActionHistories.
     */
    cursor?: ActionHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActionHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActionHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActionHistories.
     */
    distinct?: ActionHistoryScalarFieldEnum | ActionHistoryScalarFieldEnum[]
  }

  /**
   * ActionHistory create
   */
  export type ActionHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionHistory
     */
    select?: ActionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionHistory
     */
    omit?: ActionHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a ActionHistory.
     */
    data: XOR<ActionHistoryCreateInput, ActionHistoryUncheckedCreateInput>
  }

  /**
   * ActionHistory createMany
   */
  export type ActionHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActionHistories.
     */
    data: ActionHistoryCreateManyInput | ActionHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActionHistory createManyAndReturn
   */
  export type ActionHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionHistory
     */
    select?: ActionHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActionHistory
     */
    omit?: ActionHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many ActionHistories.
     */
    data: ActionHistoryCreateManyInput | ActionHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActionHistory update
   */
  export type ActionHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionHistory
     */
    select?: ActionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionHistory
     */
    omit?: ActionHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a ActionHistory.
     */
    data: XOR<ActionHistoryUpdateInput, ActionHistoryUncheckedUpdateInput>
    /**
     * Choose, which ActionHistory to update.
     */
    where: ActionHistoryWhereUniqueInput
  }

  /**
   * ActionHistory updateMany
   */
  export type ActionHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActionHistories.
     */
    data: XOR<ActionHistoryUpdateManyMutationInput, ActionHistoryUncheckedUpdateManyInput>
    /**
     * Filter which ActionHistories to update
     */
    where?: ActionHistoryWhereInput
    /**
     * Limit how many ActionHistories to update.
     */
    limit?: number
  }

  /**
   * ActionHistory updateManyAndReturn
   */
  export type ActionHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionHistory
     */
    select?: ActionHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActionHistory
     */
    omit?: ActionHistoryOmit<ExtArgs> | null
    /**
     * The data used to update ActionHistories.
     */
    data: XOR<ActionHistoryUpdateManyMutationInput, ActionHistoryUncheckedUpdateManyInput>
    /**
     * Filter which ActionHistories to update
     */
    where?: ActionHistoryWhereInput
    /**
     * Limit how many ActionHistories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionHistoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActionHistory upsert
   */
  export type ActionHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionHistory
     */
    select?: ActionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionHistory
     */
    omit?: ActionHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the ActionHistory to update in case it exists.
     */
    where: ActionHistoryWhereUniqueInput
    /**
     * In case the ActionHistory found by the `where` argument doesn't exist, create a new ActionHistory with this data.
     */
    create: XOR<ActionHistoryCreateInput, ActionHistoryUncheckedCreateInput>
    /**
     * In case the ActionHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActionHistoryUpdateInput, ActionHistoryUncheckedUpdateInput>
  }

  /**
   * ActionHistory delete
   */
  export type ActionHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionHistory
     */
    select?: ActionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionHistory
     */
    omit?: ActionHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionHistoryInclude<ExtArgs> | null
    /**
     * Filter which ActionHistory to delete.
     */
    where: ActionHistoryWhereUniqueInput
  }

  /**
   * ActionHistory deleteMany
   */
  export type ActionHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActionHistories to delete
     */
    where?: ActionHistoryWhereInput
    /**
     * Limit how many ActionHistories to delete.
     */
    limit?: number
  }

  /**
   * ActionHistory without action
   */
  export type ActionHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionHistory
     */
    select?: ActionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionHistory
     */
    omit?: ActionHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionHistoryInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    firstname: 'firstname',
    lastname: 'lastname',
    email: 'email',
    passwordHash: 'passwordHash',
    passwordResetToken: 'passwordResetToken',
    passwordResetExpiresAt: 'passwordResetExpiresAt',
    emailVerifiedAt: 'emailVerifiedAt',
    emailVerificationCode: 'emailVerificationCode',
    emailVerificationExpiresAt: 'emailVerificationExpiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CandidateProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CandidateProfileScalarFieldEnum = (typeof CandidateProfileScalarFieldEnum)[keyof typeof CandidateProfileScalarFieldEnum]


  export const CandidateCvScalarFieldEnum: {
    id: 'id',
    candidateProfileId: 'candidateProfileId',
    label: 'label',
    originalFilename: 'originalFilename',
    storageFilename: 'storageFilename',
    storageKey: 'storageKey',
    fileHash: 'fileHash',
    mimeType: 'mimeType',
    fileSize: 'fileSize',
    isDefault: 'isDefault',
    analysisStatus: 'analysisStatus',
    extractedText: 'extractedText',
    lastAnalyzedAt: 'lastAnalyzedAt',
    uploadedAt: 'uploadedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CandidateCvScalarFieldEnum = (typeof CandidateCvScalarFieldEnum)[keyof typeof CandidateCvScalarFieldEnum]


  export const CvExperienceScalarFieldEnum: {
    id: 'id',
    candidateCvId: 'candidateCvId',
    jobTitle: 'jobTitle',
    companyName: 'companyName',
    startDate: 'startDate',
    endDate: 'endDate',
    isCurrent: 'isCurrent',
    location: 'location',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CvExperienceScalarFieldEnum = (typeof CvExperienceScalarFieldEnum)[keyof typeof CvExperienceScalarFieldEnum]


  export const CvSkillScalarFieldEnum: {
    id: 'id',
    candidateCvId: 'candidateCvId',
    name: 'name',
    category: 'category',
    confidence: 'confidence',
    source: 'source',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CvSkillScalarFieldEnum = (typeof CvSkillScalarFieldEnum)[keyof typeof CvSkillScalarFieldEnum]


  export const CvTrainingScalarFieldEnum: {
    id: 'id',
    candidateCvId: 'candidateCvId',
    title: 'title',
    organizationName: 'organizationName',
    degree: 'degree',
    fieldOfStudy: 'fieldOfStudy',
    startDate: 'startDate',
    endDate: 'endDate',
    description: 'description',
    location: 'location',
    isCertification: 'isCertification',
    certificationType: 'certificationType',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CvTrainingScalarFieldEnum = (typeof CvTrainingScalarFieldEnum)[keyof typeof CvTrainingScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    color: 'color',
    position: 'position',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const CompanyScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    categoryId: 'categoryId',
    name: 'name',
    website: 'website',
    sector: 'sector',
    city: 'city',
    country: 'country',
    email: 'email',
    phone: 'phone',
    recruiterName: 'recruiterName',
    aiSummary: 'aiSummary',
    status: 'status',
    isFavorite: 'isFavorite',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum]


  export const ResumeScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    fileUrl: 'fileUrl',
    fileType: 'fileType',
    fileSize: 'fileSize',
    createdAt: 'createdAt',
    uploadedAt: 'uploadedAt'
  };

  export type ResumeScalarFieldEnum = (typeof ResumeScalarFieldEnum)[keyof typeof ResumeScalarFieldEnum]


  export const ApplicationScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    resumeId: 'resumeId',
    emailSubject: 'emailSubject',
    emailBody: 'emailBody',
    status: 'status',
    sentAt: 'sentAt',
    createdAt: 'createdAt'
  };

  export type ApplicationScalarFieldEnum = (typeof ApplicationScalarFieldEnum)[keyof typeof ApplicationScalarFieldEnum]


  export const NoteScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    content: 'content',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NoteScalarFieldEnum = (typeof NoteScalarFieldEnum)[keyof typeof NoteScalarFieldEnum]


  export const ActionHistoryScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    actionType: 'actionType',
    description: 'description',
    createdAt: 'createdAt'
  };

  export type ActionHistoryScalarFieldEnum = (typeof ActionHistoryScalarFieldEnum)[keyof typeof ActionHistoryScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'CandidateCvAnalysisStatus'
   */
  export type EnumCandidateCvAnalysisStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CandidateCvAnalysisStatus'>
    


  /**
   * Reference to a field of type 'CandidateCvAnalysisStatus[]'
   */
  export type ListEnumCandidateCvAnalysisStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CandidateCvAnalysisStatus[]'>
    


  /**
   * Reference to a field of type 'CvSkillCategory'
   */
  export type EnumCvSkillCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CvSkillCategory'>
    


  /**
   * Reference to a field of type 'CvSkillCategory[]'
   */
  export type ListEnumCvSkillCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CvSkillCategory[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'CompanyStatus'
   */
  export type EnumCompanyStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CompanyStatus'>
    


  /**
   * Reference to a field of type 'CompanyStatus[]'
   */
  export type ListEnumCompanyStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CompanyStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: UuidFilter<"User"> | string
    firstname?: StringFilter<"User"> | string
    lastname?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    passwordResetToken?: StringNullableFilter<"User"> | string | null
    passwordResetExpiresAt?: DateTimeNullableFilter<"User"> | Date | string | null
    emailVerifiedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    emailVerificationCode?: StringNullableFilter<"User"> | string | null
    emailVerificationExpiresAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    categories?: CategoryListRelationFilter
    companies?: CompanyListRelationFilter
    resumes?: ResumeListRelationFilter
    candidateProfile?: XOR<CandidateProfileNullableScalarRelationFilter, CandidateProfileWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    passwordResetToken?: SortOrderInput | SortOrder
    passwordResetExpiresAt?: SortOrderInput | SortOrder
    emailVerifiedAt?: SortOrderInput | SortOrder
    emailVerificationCode?: SortOrderInput | SortOrder
    emailVerificationExpiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categories?: CategoryOrderByRelationAggregateInput
    companies?: CompanyOrderByRelationAggregateInput
    resumes?: ResumeOrderByRelationAggregateInput
    candidateProfile?: CandidateProfileOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstname?: StringFilter<"User"> | string
    lastname?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    passwordResetToken?: StringNullableFilter<"User"> | string | null
    passwordResetExpiresAt?: DateTimeNullableFilter<"User"> | Date | string | null
    emailVerifiedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    emailVerificationCode?: StringNullableFilter<"User"> | string | null
    emailVerificationExpiresAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    categories?: CategoryListRelationFilter
    companies?: CompanyListRelationFilter
    resumes?: ResumeListRelationFilter
    candidateProfile?: XOR<CandidateProfileNullableScalarRelationFilter, CandidateProfileWhereInput> | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    passwordResetToken?: SortOrderInput | SortOrder
    passwordResetExpiresAt?: SortOrderInput | SortOrder
    emailVerifiedAt?: SortOrderInput | SortOrder
    emailVerificationCode?: SortOrderInput | SortOrder
    emailVerificationExpiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"User"> | string
    firstname?: StringWithAggregatesFilter<"User"> | string
    lastname?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    passwordResetToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordResetExpiresAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    emailVerifiedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    emailVerificationCode?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailVerificationExpiresAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CandidateProfileWhereInput = {
    AND?: CandidateProfileWhereInput | CandidateProfileWhereInput[]
    OR?: CandidateProfileWhereInput[]
    NOT?: CandidateProfileWhereInput | CandidateProfileWhereInput[]
    id?: UuidFilter<"CandidateProfile"> | string
    userId?: UuidFilter<"CandidateProfile"> | string
    createdAt?: DateTimeFilter<"CandidateProfile"> | Date | string
    updatedAt?: DateTimeFilter<"CandidateProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    cvs?: CandidateCvListRelationFilter
  }

  export type CandidateProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    cvs?: CandidateCvOrderByRelationAggregateInput
  }

  export type CandidateProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: CandidateProfileWhereInput | CandidateProfileWhereInput[]
    OR?: CandidateProfileWhereInput[]
    NOT?: CandidateProfileWhereInput | CandidateProfileWhereInput[]
    createdAt?: DateTimeFilter<"CandidateProfile"> | Date | string
    updatedAt?: DateTimeFilter<"CandidateProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    cvs?: CandidateCvListRelationFilter
  }, "id" | "userId">

  export type CandidateProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CandidateProfileCountOrderByAggregateInput
    _max?: CandidateProfileMaxOrderByAggregateInput
    _min?: CandidateProfileMinOrderByAggregateInput
  }

  export type CandidateProfileScalarWhereWithAggregatesInput = {
    AND?: CandidateProfileScalarWhereWithAggregatesInput | CandidateProfileScalarWhereWithAggregatesInput[]
    OR?: CandidateProfileScalarWhereWithAggregatesInput[]
    NOT?: CandidateProfileScalarWhereWithAggregatesInput | CandidateProfileScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"CandidateProfile"> | string
    userId?: UuidWithAggregatesFilter<"CandidateProfile"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CandidateProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CandidateProfile"> | Date | string
  }

  export type CandidateCvWhereInput = {
    AND?: CandidateCvWhereInput | CandidateCvWhereInput[]
    OR?: CandidateCvWhereInput[]
    NOT?: CandidateCvWhereInput | CandidateCvWhereInput[]
    id?: UuidFilter<"CandidateCv"> | string
    candidateProfileId?: UuidFilter<"CandidateCv"> | string
    label?: StringFilter<"CandidateCv"> | string
    originalFilename?: StringFilter<"CandidateCv"> | string
    storageFilename?: StringFilter<"CandidateCv"> | string
    storageKey?: StringFilter<"CandidateCv"> | string
    fileHash?: StringNullableFilter<"CandidateCv"> | string | null
    mimeType?: StringFilter<"CandidateCv"> | string
    fileSize?: IntFilter<"CandidateCv"> | number
    isDefault?: BoolFilter<"CandidateCv"> | boolean
    analysisStatus?: EnumCandidateCvAnalysisStatusFilter<"CandidateCv"> | $Enums.CandidateCvAnalysisStatus
    extractedText?: StringNullableFilter<"CandidateCv"> | string | null
    lastAnalyzedAt?: DateTimeNullableFilter<"CandidateCv"> | Date | string | null
    uploadedAt?: DateTimeFilter<"CandidateCv"> | Date | string
    createdAt?: DateTimeFilter<"CandidateCv"> | Date | string
    updatedAt?: DateTimeFilter<"CandidateCv"> | Date | string
    candidateProfile?: XOR<CandidateProfileScalarRelationFilter, CandidateProfileWhereInput>
    cvExperiences?: CvExperienceListRelationFilter
    cvSkills?: CvSkillListRelationFilter
    cvTrainings?: CvTrainingListRelationFilter
  }

  export type CandidateCvOrderByWithRelationInput = {
    id?: SortOrder
    candidateProfileId?: SortOrder
    label?: SortOrder
    originalFilename?: SortOrder
    storageFilename?: SortOrder
    storageKey?: SortOrder
    fileHash?: SortOrderInput | SortOrder
    mimeType?: SortOrder
    fileSize?: SortOrder
    isDefault?: SortOrder
    analysisStatus?: SortOrder
    extractedText?: SortOrderInput | SortOrder
    lastAnalyzedAt?: SortOrderInput | SortOrder
    uploadedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    candidateProfile?: CandidateProfileOrderByWithRelationInput
    cvExperiences?: CvExperienceOrderByRelationAggregateInput
    cvSkills?: CvSkillOrderByRelationAggregateInput
    cvTrainings?: CvTrainingOrderByRelationAggregateInput
  }

  export type CandidateCvWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CandidateCvWhereInput | CandidateCvWhereInput[]
    OR?: CandidateCvWhereInput[]
    NOT?: CandidateCvWhereInput | CandidateCvWhereInput[]
    candidateProfileId?: UuidFilter<"CandidateCv"> | string
    label?: StringFilter<"CandidateCv"> | string
    originalFilename?: StringFilter<"CandidateCv"> | string
    storageFilename?: StringFilter<"CandidateCv"> | string
    storageKey?: StringFilter<"CandidateCv"> | string
    fileHash?: StringNullableFilter<"CandidateCv"> | string | null
    mimeType?: StringFilter<"CandidateCv"> | string
    fileSize?: IntFilter<"CandidateCv"> | number
    isDefault?: BoolFilter<"CandidateCv"> | boolean
    analysisStatus?: EnumCandidateCvAnalysisStatusFilter<"CandidateCv"> | $Enums.CandidateCvAnalysisStatus
    extractedText?: StringNullableFilter<"CandidateCv"> | string | null
    lastAnalyzedAt?: DateTimeNullableFilter<"CandidateCv"> | Date | string | null
    uploadedAt?: DateTimeFilter<"CandidateCv"> | Date | string
    createdAt?: DateTimeFilter<"CandidateCv"> | Date | string
    updatedAt?: DateTimeFilter<"CandidateCv"> | Date | string
    candidateProfile?: XOR<CandidateProfileScalarRelationFilter, CandidateProfileWhereInput>
    cvExperiences?: CvExperienceListRelationFilter
    cvSkills?: CvSkillListRelationFilter
    cvTrainings?: CvTrainingListRelationFilter
  }, "id">

  export type CandidateCvOrderByWithAggregationInput = {
    id?: SortOrder
    candidateProfileId?: SortOrder
    label?: SortOrder
    originalFilename?: SortOrder
    storageFilename?: SortOrder
    storageKey?: SortOrder
    fileHash?: SortOrderInput | SortOrder
    mimeType?: SortOrder
    fileSize?: SortOrder
    isDefault?: SortOrder
    analysisStatus?: SortOrder
    extractedText?: SortOrderInput | SortOrder
    lastAnalyzedAt?: SortOrderInput | SortOrder
    uploadedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CandidateCvCountOrderByAggregateInput
    _avg?: CandidateCvAvgOrderByAggregateInput
    _max?: CandidateCvMaxOrderByAggregateInput
    _min?: CandidateCvMinOrderByAggregateInput
    _sum?: CandidateCvSumOrderByAggregateInput
  }

  export type CandidateCvScalarWhereWithAggregatesInput = {
    AND?: CandidateCvScalarWhereWithAggregatesInput | CandidateCvScalarWhereWithAggregatesInput[]
    OR?: CandidateCvScalarWhereWithAggregatesInput[]
    NOT?: CandidateCvScalarWhereWithAggregatesInput | CandidateCvScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"CandidateCv"> | string
    candidateProfileId?: UuidWithAggregatesFilter<"CandidateCv"> | string
    label?: StringWithAggregatesFilter<"CandidateCv"> | string
    originalFilename?: StringWithAggregatesFilter<"CandidateCv"> | string
    storageFilename?: StringWithAggregatesFilter<"CandidateCv"> | string
    storageKey?: StringWithAggregatesFilter<"CandidateCv"> | string
    fileHash?: StringNullableWithAggregatesFilter<"CandidateCv"> | string | null
    mimeType?: StringWithAggregatesFilter<"CandidateCv"> | string
    fileSize?: IntWithAggregatesFilter<"CandidateCv"> | number
    isDefault?: BoolWithAggregatesFilter<"CandidateCv"> | boolean
    analysisStatus?: EnumCandidateCvAnalysisStatusWithAggregatesFilter<"CandidateCv"> | $Enums.CandidateCvAnalysisStatus
    extractedText?: StringNullableWithAggregatesFilter<"CandidateCv"> | string | null
    lastAnalyzedAt?: DateTimeNullableWithAggregatesFilter<"CandidateCv"> | Date | string | null
    uploadedAt?: DateTimeWithAggregatesFilter<"CandidateCv"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"CandidateCv"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CandidateCv"> | Date | string
  }

  export type CvExperienceWhereInput = {
    AND?: CvExperienceWhereInput | CvExperienceWhereInput[]
    OR?: CvExperienceWhereInput[]
    NOT?: CvExperienceWhereInput | CvExperienceWhereInput[]
    id?: UuidFilter<"CvExperience"> | string
    candidateCvId?: UuidFilter<"CvExperience"> | string
    jobTitle?: StringFilter<"CvExperience"> | string
    companyName?: StringNullableFilter<"CvExperience"> | string | null
    startDate?: StringNullableFilter<"CvExperience"> | string | null
    endDate?: StringNullableFilter<"CvExperience"> | string | null
    isCurrent?: BoolFilter<"CvExperience"> | boolean
    location?: StringNullableFilter<"CvExperience"> | string | null
    description?: StringNullableFilter<"CvExperience"> | string | null
    createdAt?: DateTimeFilter<"CvExperience"> | Date | string
    updatedAt?: DateTimeFilter<"CvExperience"> | Date | string
    candidateCv?: XOR<CandidateCvScalarRelationFilter, CandidateCvWhereInput>
  }

  export type CvExperienceOrderByWithRelationInput = {
    id?: SortOrder
    candidateCvId?: SortOrder
    jobTitle?: SortOrder
    companyName?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    isCurrent?: SortOrder
    location?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    candidateCv?: CandidateCvOrderByWithRelationInput
  }

  export type CvExperienceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CvExperienceWhereInput | CvExperienceWhereInput[]
    OR?: CvExperienceWhereInput[]
    NOT?: CvExperienceWhereInput | CvExperienceWhereInput[]
    candidateCvId?: UuidFilter<"CvExperience"> | string
    jobTitle?: StringFilter<"CvExperience"> | string
    companyName?: StringNullableFilter<"CvExperience"> | string | null
    startDate?: StringNullableFilter<"CvExperience"> | string | null
    endDate?: StringNullableFilter<"CvExperience"> | string | null
    isCurrent?: BoolFilter<"CvExperience"> | boolean
    location?: StringNullableFilter<"CvExperience"> | string | null
    description?: StringNullableFilter<"CvExperience"> | string | null
    createdAt?: DateTimeFilter<"CvExperience"> | Date | string
    updatedAt?: DateTimeFilter<"CvExperience"> | Date | string
    candidateCv?: XOR<CandidateCvScalarRelationFilter, CandidateCvWhereInput>
  }, "id">

  export type CvExperienceOrderByWithAggregationInput = {
    id?: SortOrder
    candidateCvId?: SortOrder
    jobTitle?: SortOrder
    companyName?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    isCurrent?: SortOrder
    location?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CvExperienceCountOrderByAggregateInput
    _max?: CvExperienceMaxOrderByAggregateInput
    _min?: CvExperienceMinOrderByAggregateInput
  }

  export type CvExperienceScalarWhereWithAggregatesInput = {
    AND?: CvExperienceScalarWhereWithAggregatesInput | CvExperienceScalarWhereWithAggregatesInput[]
    OR?: CvExperienceScalarWhereWithAggregatesInput[]
    NOT?: CvExperienceScalarWhereWithAggregatesInput | CvExperienceScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"CvExperience"> | string
    candidateCvId?: UuidWithAggregatesFilter<"CvExperience"> | string
    jobTitle?: StringWithAggregatesFilter<"CvExperience"> | string
    companyName?: StringNullableWithAggregatesFilter<"CvExperience"> | string | null
    startDate?: StringNullableWithAggregatesFilter<"CvExperience"> | string | null
    endDate?: StringNullableWithAggregatesFilter<"CvExperience"> | string | null
    isCurrent?: BoolWithAggregatesFilter<"CvExperience"> | boolean
    location?: StringNullableWithAggregatesFilter<"CvExperience"> | string | null
    description?: StringNullableWithAggregatesFilter<"CvExperience"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CvExperience"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CvExperience"> | Date | string
  }

  export type CvSkillWhereInput = {
    AND?: CvSkillWhereInput | CvSkillWhereInput[]
    OR?: CvSkillWhereInput[]
    NOT?: CvSkillWhereInput | CvSkillWhereInput[]
    id?: UuidFilter<"CvSkill"> | string
    candidateCvId?: UuidFilter<"CvSkill"> | string
    name?: StringFilter<"CvSkill"> | string
    category?: EnumCvSkillCategoryFilter<"CvSkill"> | $Enums.CvSkillCategory
    confidence?: FloatNullableFilter<"CvSkill"> | number | null
    source?: StringNullableFilter<"CvSkill"> | string | null
    createdAt?: DateTimeFilter<"CvSkill"> | Date | string
    updatedAt?: DateTimeFilter<"CvSkill"> | Date | string
    candidateCv?: XOR<CandidateCvScalarRelationFilter, CandidateCvWhereInput>
  }

  export type CvSkillOrderByWithRelationInput = {
    id?: SortOrder
    candidateCvId?: SortOrder
    name?: SortOrder
    category?: SortOrder
    confidence?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    candidateCv?: CandidateCvOrderByWithRelationInput
  }

  export type CvSkillWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CvSkillWhereInput | CvSkillWhereInput[]
    OR?: CvSkillWhereInput[]
    NOT?: CvSkillWhereInput | CvSkillWhereInput[]
    candidateCvId?: UuidFilter<"CvSkill"> | string
    name?: StringFilter<"CvSkill"> | string
    category?: EnumCvSkillCategoryFilter<"CvSkill"> | $Enums.CvSkillCategory
    confidence?: FloatNullableFilter<"CvSkill"> | number | null
    source?: StringNullableFilter<"CvSkill"> | string | null
    createdAt?: DateTimeFilter<"CvSkill"> | Date | string
    updatedAt?: DateTimeFilter<"CvSkill"> | Date | string
    candidateCv?: XOR<CandidateCvScalarRelationFilter, CandidateCvWhereInput>
  }, "id">

  export type CvSkillOrderByWithAggregationInput = {
    id?: SortOrder
    candidateCvId?: SortOrder
    name?: SortOrder
    category?: SortOrder
    confidence?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CvSkillCountOrderByAggregateInput
    _avg?: CvSkillAvgOrderByAggregateInput
    _max?: CvSkillMaxOrderByAggregateInput
    _min?: CvSkillMinOrderByAggregateInput
    _sum?: CvSkillSumOrderByAggregateInput
  }

  export type CvSkillScalarWhereWithAggregatesInput = {
    AND?: CvSkillScalarWhereWithAggregatesInput | CvSkillScalarWhereWithAggregatesInput[]
    OR?: CvSkillScalarWhereWithAggregatesInput[]
    NOT?: CvSkillScalarWhereWithAggregatesInput | CvSkillScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"CvSkill"> | string
    candidateCvId?: UuidWithAggregatesFilter<"CvSkill"> | string
    name?: StringWithAggregatesFilter<"CvSkill"> | string
    category?: EnumCvSkillCategoryWithAggregatesFilter<"CvSkill"> | $Enums.CvSkillCategory
    confidence?: FloatNullableWithAggregatesFilter<"CvSkill"> | number | null
    source?: StringNullableWithAggregatesFilter<"CvSkill"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CvSkill"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CvSkill"> | Date | string
  }

  export type CvTrainingWhereInput = {
    AND?: CvTrainingWhereInput | CvTrainingWhereInput[]
    OR?: CvTrainingWhereInput[]
    NOT?: CvTrainingWhereInput | CvTrainingWhereInput[]
    id?: UuidFilter<"CvTraining"> | string
    candidateCvId?: UuidFilter<"CvTraining"> | string
    title?: StringFilter<"CvTraining"> | string
    organizationName?: StringNullableFilter<"CvTraining"> | string | null
    degree?: StringNullableFilter<"CvTraining"> | string | null
    fieldOfStudy?: StringNullableFilter<"CvTraining"> | string | null
    startDate?: StringNullableFilter<"CvTraining"> | string | null
    endDate?: StringNullableFilter<"CvTraining"> | string | null
    description?: StringNullableFilter<"CvTraining"> | string | null
    location?: StringNullableFilter<"CvTraining"> | string | null
    isCertification?: BoolFilter<"CvTraining"> | boolean
    certificationType?: StringNullableFilter<"CvTraining"> | string | null
    createdAt?: DateTimeFilter<"CvTraining"> | Date | string
    updatedAt?: DateTimeFilter<"CvTraining"> | Date | string
    candidateCv?: XOR<CandidateCvScalarRelationFilter, CandidateCvWhereInput>
  }

  export type CvTrainingOrderByWithRelationInput = {
    id?: SortOrder
    candidateCvId?: SortOrder
    title?: SortOrder
    organizationName?: SortOrderInput | SortOrder
    degree?: SortOrderInput | SortOrder
    fieldOfStudy?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    isCertification?: SortOrder
    certificationType?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    candidateCv?: CandidateCvOrderByWithRelationInput
  }

  export type CvTrainingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CvTrainingWhereInput | CvTrainingWhereInput[]
    OR?: CvTrainingWhereInput[]
    NOT?: CvTrainingWhereInput | CvTrainingWhereInput[]
    candidateCvId?: UuidFilter<"CvTraining"> | string
    title?: StringFilter<"CvTraining"> | string
    organizationName?: StringNullableFilter<"CvTraining"> | string | null
    degree?: StringNullableFilter<"CvTraining"> | string | null
    fieldOfStudy?: StringNullableFilter<"CvTraining"> | string | null
    startDate?: StringNullableFilter<"CvTraining"> | string | null
    endDate?: StringNullableFilter<"CvTraining"> | string | null
    description?: StringNullableFilter<"CvTraining"> | string | null
    location?: StringNullableFilter<"CvTraining"> | string | null
    isCertification?: BoolFilter<"CvTraining"> | boolean
    certificationType?: StringNullableFilter<"CvTraining"> | string | null
    createdAt?: DateTimeFilter<"CvTraining"> | Date | string
    updatedAt?: DateTimeFilter<"CvTraining"> | Date | string
    candidateCv?: XOR<CandidateCvScalarRelationFilter, CandidateCvWhereInput>
  }, "id">

  export type CvTrainingOrderByWithAggregationInput = {
    id?: SortOrder
    candidateCvId?: SortOrder
    title?: SortOrder
    organizationName?: SortOrderInput | SortOrder
    degree?: SortOrderInput | SortOrder
    fieldOfStudy?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    isCertification?: SortOrder
    certificationType?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CvTrainingCountOrderByAggregateInput
    _max?: CvTrainingMaxOrderByAggregateInput
    _min?: CvTrainingMinOrderByAggregateInput
  }

  export type CvTrainingScalarWhereWithAggregatesInput = {
    AND?: CvTrainingScalarWhereWithAggregatesInput | CvTrainingScalarWhereWithAggregatesInput[]
    OR?: CvTrainingScalarWhereWithAggregatesInput[]
    NOT?: CvTrainingScalarWhereWithAggregatesInput | CvTrainingScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"CvTraining"> | string
    candidateCvId?: UuidWithAggregatesFilter<"CvTraining"> | string
    title?: StringWithAggregatesFilter<"CvTraining"> | string
    organizationName?: StringNullableWithAggregatesFilter<"CvTraining"> | string | null
    degree?: StringNullableWithAggregatesFilter<"CvTraining"> | string | null
    fieldOfStudy?: StringNullableWithAggregatesFilter<"CvTraining"> | string | null
    startDate?: StringNullableWithAggregatesFilter<"CvTraining"> | string | null
    endDate?: StringNullableWithAggregatesFilter<"CvTraining"> | string | null
    description?: StringNullableWithAggregatesFilter<"CvTraining"> | string | null
    location?: StringNullableWithAggregatesFilter<"CvTraining"> | string | null
    isCertification?: BoolWithAggregatesFilter<"CvTraining"> | boolean
    certificationType?: StringNullableWithAggregatesFilter<"CvTraining"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CvTraining"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CvTraining"> | Date | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: UuidFilter<"Category"> | string
    userId?: UuidFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    color?: StringFilter<"Category"> | string
    position?: IntFilter<"Category"> | number
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    companies?: CompanyListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    color?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    companies?: CompanyOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    userId?: UuidFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    color?: StringFilter<"Category"> | string
    position?: IntFilter<"Category"> | number
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    companies?: CompanyListRelationFilter
  }, "id">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    color?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _avg?: CategoryAvgOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
    _sum?: CategorySumOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Category"> | string
    userId?: UuidWithAggregatesFilter<"Category"> | string
    name?: StringWithAggregatesFilter<"Category"> | string
    color?: StringWithAggregatesFilter<"Category"> | string
    position?: IntWithAggregatesFilter<"Category"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
  }

  export type CompanyWhereInput = {
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    id?: UuidFilter<"Company"> | string
    userId?: UuidFilter<"Company"> | string
    categoryId?: UuidNullableFilter<"Company"> | string | null
    name?: StringFilter<"Company"> | string
    website?: StringNullableFilter<"Company"> | string | null
    sector?: StringNullableFilter<"Company"> | string | null
    city?: StringNullableFilter<"Company"> | string | null
    country?: StringNullableFilter<"Company"> | string | null
    email?: StringNullableFilter<"Company"> | string | null
    phone?: StringNullableFilter<"Company"> | string | null
    recruiterName?: StringNullableFilter<"Company"> | string | null
    aiSummary?: StringNullableFilter<"Company"> | string | null
    status?: EnumCompanyStatusFilter<"Company"> | $Enums.CompanyStatus
    isFavorite?: BoolFilter<"Company"> | boolean
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    category?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
    applications?: ApplicationListRelationFilter
    notes?: NoteListRelationFilter
    actionHistory?: ActionHistoryListRelationFilter
  }

  export type CompanyOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    categoryId?: SortOrderInput | SortOrder
    name?: SortOrder
    website?: SortOrderInput | SortOrder
    sector?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    recruiterName?: SortOrderInput | SortOrder
    aiSummary?: SortOrderInput | SortOrder
    status?: SortOrder
    isFavorite?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    category?: CategoryOrderByWithRelationInput
    applications?: ApplicationOrderByRelationAggregateInput
    notes?: NoteOrderByRelationAggregateInput
    actionHistory?: ActionHistoryOrderByRelationAggregateInput
  }

  export type CompanyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    userId?: UuidFilter<"Company"> | string
    categoryId?: UuidNullableFilter<"Company"> | string | null
    name?: StringFilter<"Company"> | string
    website?: StringNullableFilter<"Company"> | string | null
    sector?: StringNullableFilter<"Company"> | string | null
    city?: StringNullableFilter<"Company"> | string | null
    country?: StringNullableFilter<"Company"> | string | null
    email?: StringNullableFilter<"Company"> | string | null
    phone?: StringNullableFilter<"Company"> | string | null
    recruiterName?: StringNullableFilter<"Company"> | string | null
    aiSummary?: StringNullableFilter<"Company"> | string | null
    status?: EnumCompanyStatusFilter<"Company"> | $Enums.CompanyStatus
    isFavorite?: BoolFilter<"Company"> | boolean
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    category?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
    applications?: ApplicationListRelationFilter
    notes?: NoteListRelationFilter
    actionHistory?: ActionHistoryListRelationFilter
  }, "id">

  export type CompanyOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    categoryId?: SortOrderInput | SortOrder
    name?: SortOrder
    website?: SortOrderInput | SortOrder
    sector?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    recruiterName?: SortOrderInput | SortOrder
    aiSummary?: SortOrderInput | SortOrder
    status?: SortOrder
    isFavorite?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CompanyCountOrderByAggregateInput
    _max?: CompanyMaxOrderByAggregateInput
    _min?: CompanyMinOrderByAggregateInput
  }

  export type CompanyScalarWhereWithAggregatesInput = {
    AND?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    OR?: CompanyScalarWhereWithAggregatesInput[]
    NOT?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Company"> | string
    userId?: UuidWithAggregatesFilter<"Company"> | string
    categoryId?: UuidNullableWithAggregatesFilter<"Company"> | string | null
    name?: StringWithAggregatesFilter<"Company"> | string
    website?: StringNullableWithAggregatesFilter<"Company"> | string | null
    sector?: StringNullableWithAggregatesFilter<"Company"> | string | null
    city?: StringNullableWithAggregatesFilter<"Company"> | string | null
    country?: StringNullableWithAggregatesFilter<"Company"> | string | null
    email?: StringNullableWithAggregatesFilter<"Company"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Company"> | string | null
    recruiterName?: StringNullableWithAggregatesFilter<"Company"> | string | null
    aiSummary?: StringNullableWithAggregatesFilter<"Company"> | string | null
    status?: EnumCompanyStatusWithAggregatesFilter<"Company"> | $Enums.CompanyStatus
    isFavorite?: BoolWithAggregatesFilter<"Company"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
  }

  export type ResumeWhereInput = {
    AND?: ResumeWhereInput | ResumeWhereInput[]
    OR?: ResumeWhereInput[]
    NOT?: ResumeWhereInput | ResumeWhereInput[]
    id?: UuidFilter<"Resume"> | string
    userId?: UuidFilter<"Resume"> | string
    name?: StringFilter<"Resume"> | string
    fileUrl?: StringFilter<"Resume"> | string
    fileType?: StringFilter<"Resume"> | string
    fileSize?: IntFilter<"Resume"> | number
    createdAt?: DateTimeFilter<"Resume"> | Date | string
    uploadedAt?: DateTimeFilter<"Resume"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    applications?: ApplicationListRelationFilter
  }

  export type ResumeOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    fileUrl?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    createdAt?: SortOrder
    uploadedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    applications?: ApplicationOrderByRelationAggregateInput
  }

  export type ResumeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ResumeWhereInput | ResumeWhereInput[]
    OR?: ResumeWhereInput[]
    NOT?: ResumeWhereInput | ResumeWhereInput[]
    userId?: UuidFilter<"Resume"> | string
    name?: StringFilter<"Resume"> | string
    fileUrl?: StringFilter<"Resume"> | string
    fileType?: StringFilter<"Resume"> | string
    fileSize?: IntFilter<"Resume"> | number
    createdAt?: DateTimeFilter<"Resume"> | Date | string
    uploadedAt?: DateTimeFilter<"Resume"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    applications?: ApplicationListRelationFilter
  }, "id">

  export type ResumeOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    fileUrl?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    createdAt?: SortOrder
    uploadedAt?: SortOrder
    _count?: ResumeCountOrderByAggregateInput
    _avg?: ResumeAvgOrderByAggregateInput
    _max?: ResumeMaxOrderByAggregateInput
    _min?: ResumeMinOrderByAggregateInput
    _sum?: ResumeSumOrderByAggregateInput
  }

  export type ResumeScalarWhereWithAggregatesInput = {
    AND?: ResumeScalarWhereWithAggregatesInput | ResumeScalarWhereWithAggregatesInput[]
    OR?: ResumeScalarWhereWithAggregatesInput[]
    NOT?: ResumeScalarWhereWithAggregatesInput | ResumeScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Resume"> | string
    userId?: UuidWithAggregatesFilter<"Resume"> | string
    name?: StringWithAggregatesFilter<"Resume"> | string
    fileUrl?: StringWithAggregatesFilter<"Resume"> | string
    fileType?: StringWithAggregatesFilter<"Resume"> | string
    fileSize?: IntWithAggregatesFilter<"Resume"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Resume"> | Date | string
    uploadedAt?: DateTimeWithAggregatesFilter<"Resume"> | Date | string
  }

  export type ApplicationWhereInput = {
    AND?: ApplicationWhereInput | ApplicationWhereInput[]
    OR?: ApplicationWhereInput[]
    NOT?: ApplicationWhereInput | ApplicationWhereInput[]
    id?: UuidFilter<"Application"> | string
    companyId?: UuidFilter<"Application"> | string
    resumeId?: UuidFilter<"Application"> | string
    emailSubject?: StringFilter<"Application"> | string
    emailBody?: StringFilter<"Application"> | string
    status?: EnumCompanyStatusFilter<"Application"> | $Enums.CompanyStatus
    sentAt?: DateTimeNullableFilter<"Application"> | Date | string | null
    createdAt?: DateTimeFilter<"Application"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    resume?: XOR<ResumeScalarRelationFilter, ResumeWhereInput>
  }

  export type ApplicationOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    resumeId?: SortOrder
    emailSubject?: SortOrder
    emailBody?: SortOrder
    status?: SortOrder
    sentAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
    resume?: ResumeOrderByWithRelationInput
  }

  export type ApplicationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ApplicationWhereInput | ApplicationWhereInput[]
    OR?: ApplicationWhereInput[]
    NOT?: ApplicationWhereInput | ApplicationWhereInput[]
    companyId?: UuidFilter<"Application"> | string
    resumeId?: UuidFilter<"Application"> | string
    emailSubject?: StringFilter<"Application"> | string
    emailBody?: StringFilter<"Application"> | string
    status?: EnumCompanyStatusFilter<"Application"> | $Enums.CompanyStatus
    sentAt?: DateTimeNullableFilter<"Application"> | Date | string | null
    createdAt?: DateTimeFilter<"Application"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    resume?: XOR<ResumeScalarRelationFilter, ResumeWhereInput>
  }, "id">

  export type ApplicationOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    resumeId?: SortOrder
    emailSubject?: SortOrder
    emailBody?: SortOrder
    status?: SortOrder
    sentAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ApplicationCountOrderByAggregateInput
    _max?: ApplicationMaxOrderByAggregateInput
    _min?: ApplicationMinOrderByAggregateInput
  }

  export type ApplicationScalarWhereWithAggregatesInput = {
    AND?: ApplicationScalarWhereWithAggregatesInput | ApplicationScalarWhereWithAggregatesInput[]
    OR?: ApplicationScalarWhereWithAggregatesInput[]
    NOT?: ApplicationScalarWhereWithAggregatesInput | ApplicationScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Application"> | string
    companyId?: UuidWithAggregatesFilter<"Application"> | string
    resumeId?: UuidWithAggregatesFilter<"Application"> | string
    emailSubject?: StringWithAggregatesFilter<"Application"> | string
    emailBody?: StringWithAggregatesFilter<"Application"> | string
    status?: EnumCompanyStatusWithAggregatesFilter<"Application"> | $Enums.CompanyStatus
    sentAt?: DateTimeNullableWithAggregatesFilter<"Application"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Application"> | Date | string
  }

  export type NoteWhereInput = {
    AND?: NoteWhereInput | NoteWhereInput[]
    OR?: NoteWhereInput[]
    NOT?: NoteWhereInput | NoteWhereInput[]
    id?: UuidFilter<"Note"> | string
    companyId?: UuidFilter<"Note"> | string
    content?: StringFilter<"Note"> | string
    createdAt?: DateTimeFilter<"Note"> | Date | string
    updatedAt?: DateTimeFilter<"Note"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }

  export type NoteOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
  }

  export type NoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NoteWhereInput | NoteWhereInput[]
    OR?: NoteWhereInput[]
    NOT?: NoteWhereInput | NoteWhereInput[]
    companyId?: UuidFilter<"Note"> | string
    content?: StringFilter<"Note"> | string
    createdAt?: DateTimeFilter<"Note"> | Date | string
    updatedAt?: DateTimeFilter<"Note"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }, "id">

  export type NoteOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NoteCountOrderByAggregateInput
    _max?: NoteMaxOrderByAggregateInput
    _min?: NoteMinOrderByAggregateInput
  }

  export type NoteScalarWhereWithAggregatesInput = {
    AND?: NoteScalarWhereWithAggregatesInput | NoteScalarWhereWithAggregatesInput[]
    OR?: NoteScalarWhereWithAggregatesInput[]
    NOT?: NoteScalarWhereWithAggregatesInput | NoteScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Note"> | string
    companyId?: UuidWithAggregatesFilter<"Note"> | string
    content?: StringWithAggregatesFilter<"Note"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Note"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Note"> | Date | string
  }

  export type ActionHistoryWhereInput = {
    AND?: ActionHistoryWhereInput | ActionHistoryWhereInput[]
    OR?: ActionHistoryWhereInput[]
    NOT?: ActionHistoryWhereInput | ActionHistoryWhereInput[]
    id?: UuidFilter<"ActionHistory"> | string
    companyId?: UuidFilter<"ActionHistory"> | string
    actionType?: StringFilter<"ActionHistory"> | string
    description?: StringNullableFilter<"ActionHistory"> | string | null
    createdAt?: DateTimeFilter<"ActionHistory"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }

  export type ActionHistoryOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    actionType?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
  }

  export type ActionHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActionHistoryWhereInput | ActionHistoryWhereInput[]
    OR?: ActionHistoryWhereInput[]
    NOT?: ActionHistoryWhereInput | ActionHistoryWhereInput[]
    companyId?: UuidFilter<"ActionHistory"> | string
    actionType?: StringFilter<"ActionHistory"> | string
    description?: StringNullableFilter<"ActionHistory"> | string | null
    createdAt?: DateTimeFilter<"ActionHistory"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }, "id">

  export type ActionHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    actionType?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ActionHistoryCountOrderByAggregateInput
    _max?: ActionHistoryMaxOrderByAggregateInput
    _min?: ActionHistoryMinOrderByAggregateInput
  }

  export type ActionHistoryScalarWhereWithAggregatesInput = {
    AND?: ActionHistoryScalarWhereWithAggregatesInput | ActionHistoryScalarWhereWithAggregatesInput[]
    OR?: ActionHistoryScalarWhereWithAggregatesInput[]
    NOT?: ActionHistoryScalarWhereWithAggregatesInput | ActionHistoryScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ActionHistory"> | string
    companyId?: UuidWithAggregatesFilter<"ActionHistory"> | string
    actionType?: StringWithAggregatesFilter<"ActionHistory"> | string
    description?: StringNullableWithAggregatesFilter<"ActionHistory"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ActionHistory"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    firstname: string
    lastname: string
    email: string
    passwordHash: string
    passwordResetToken?: string | null
    passwordResetExpiresAt?: Date | string | null
    emailVerifiedAt?: Date | string | null
    emailVerificationCode?: string | null
    emailVerificationExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: CategoryCreateNestedManyWithoutUserInput
    companies?: CompanyCreateNestedManyWithoutUserInput
    resumes?: ResumeCreateNestedManyWithoutUserInput
    candidateProfile?: CandidateProfileCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    firstname: string
    lastname: string
    email: string
    passwordHash: string
    passwordResetToken?: string | null
    passwordResetExpiresAt?: Date | string | null
    emailVerifiedAt?: Date | string | null
    emailVerificationCode?: string | null
    emailVerificationExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: CategoryUncheckedCreateNestedManyWithoutUserInput
    companies?: CompanyUncheckedCreateNestedManyWithoutUserInput
    resumes?: ResumeUncheckedCreateNestedManyWithoutUserInput
    candidateProfile?: CandidateProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerificationExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: CategoryUpdateManyWithoutUserNestedInput
    companies?: CompanyUpdateManyWithoutUserNestedInput
    resumes?: ResumeUpdateManyWithoutUserNestedInput
    candidateProfile?: CandidateProfileUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerificationExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: CategoryUncheckedUpdateManyWithoutUserNestedInput
    companies?: CompanyUncheckedUpdateManyWithoutUserNestedInput
    resumes?: ResumeUncheckedUpdateManyWithoutUserNestedInput
    candidateProfile?: CandidateProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    firstname: string
    lastname: string
    email: string
    passwordHash: string
    passwordResetToken?: string | null
    passwordResetExpiresAt?: Date | string | null
    emailVerifiedAt?: Date | string | null
    emailVerificationCode?: string | null
    emailVerificationExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerificationExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerificationExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CandidateProfileCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCandidateProfileInput
    cvs?: CandidateCvCreateNestedManyWithoutCandidateProfileInput
  }

  export type CandidateProfileUncheckedCreateInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cvs?: CandidateCvUncheckedCreateNestedManyWithoutCandidateProfileInput
  }

  export type CandidateProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCandidateProfileNestedInput
    cvs?: CandidateCvUpdateManyWithoutCandidateProfileNestedInput
  }

  export type CandidateProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cvs?: CandidateCvUncheckedUpdateManyWithoutCandidateProfileNestedInput
  }

  export type CandidateProfileCreateManyInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CandidateProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CandidateProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CandidateCvCreateInput = {
    id?: string
    label: string
    originalFilename: string
    storageFilename: string
    storageKey: string
    fileHash?: string | null
    mimeType: string
    fileSize: number
    isDefault?: boolean
    analysisStatus?: $Enums.CandidateCvAnalysisStatus
    extractedText?: string | null
    lastAnalyzedAt?: Date | string | null
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    candidateProfile: CandidateProfileCreateNestedOneWithoutCvsInput
    cvExperiences?: CvExperienceCreateNestedManyWithoutCandidateCvInput
    cvSkills?: CvSkillCreateNestedManyWithoutCandidateCvInput
    cvTrainings?: CvTrainingCreateNestedManyWithoutCandidateCvInput
  }

  export type CandidateCvUncheckedCreateInput = {
    id?: string
    candidateProfileId: string
    label: string
    originalFilename: string
    storageFilename: string
    storageKey: string
    fileHash?: string | null
    mimeType: string
    fileSize: number
    isDefault?: boolean
    analysisStatus?: $Enums.CandidateCvAnalysisStatus
    extractedText?: string | null
    lastAnalyzedAt?: Date | string | null
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    cvExperiences?: CvExperienceUncheckedCreateNestedManyWithoutCandidateCvInput
    cvSkills?: CvSkillUncheckedCreateNestedManyWithoutCandidateCvInput
    cvTrainings?: CvTrainingUncheckedCreateNestedManyWithoutCandidateCvInput
  }

  export type CandidateCvUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    storageFilename?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    fileHash?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    analysisStatus?: EnumCandidateCvAnalysisStatusFieldUpdateOperationsInput | $Enums.CandidateCvAnalysisStatus
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    lastAnalyzedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidateProfile?: CandidateProfileUpdateOneRequiredWithoutCvsNestedInput
    cvExperiences?: CvExperienceUpdateManyWithoutCandidateCvNestedInput
    cvSkills?: CvSkillUpdateManyWithoutCandidateCvNestedInput
    cvTrainings?: CvTrainingUpdateManyWithoutCandidateCvNestedInput
  }

  export type CandidateCvUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateProfileId?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    storageFilename?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    fileHash?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    analysisStatus?: EnumCandidateCvAnalysisStatusFieldUpdateOperationsInput | $Enums.CandidateCvAnalysisStatus
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    lastAnalyzedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cvExperiences?: CvExperienceUncheckedUpdateManyWithoutCandidateCvNestedInput
    cvSkills?: CvSkillUncheckedUpdateManyWithoutCandidateCvNestedInput
    cvTrainings?: CvTrainingUncheckedUpdateManyWithoutCandidateCvNestedInput
  }

  export type CandidateCvCreateManyInput = {
    id?: string
    candidateProfileId: string
    label: string
    originalFilename: string
    storageFilename: string
    storageKey: string
    fileHash?: string | null
    mimeType: string
    fileSize: number
    isDefault?: boolean
    analysisStatus?: $Enums.CandidateCvAnalysisStatus
    extractedText?: string | null
    lastAnalyzedAt?: Date | string | null
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CandidateCvUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    storageFilename?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    fileHash?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    analysisStatus?: EnumCandidateCvAnalysisStatusFieldUpdateOperationsInput | $Enums.CandidateCvAnalysisStatus
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    lastAnalyzedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CandidateCvUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateProfileId?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    storageFilename?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    fileHash?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    analysisStatus?: EnumCandidateCvAnalysisStatusFieldUpdateOperationsInput | $Enums.CandidateCvAnalysisStatus
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    lastAnalyzedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CvExperienceCreateInput = {
    id?: string
    jobTitle: string
    companyName?: string | null
    startDate?: string | null
    endDate?: string | null
    isCurrent?: boolean
    location?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    candidateCv: CandidateCvCreateNestedOneWithoutCvExperiencesInput
  }

  export type CvExperienceUncheckedCreateInput = {
    id?: string
    candidateCvId: string
    jobTitle: string
    companyName?: string | null
    startDate?: string | null
    endDate?: string | null
    isCurrent?: boolean
    location?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CvExperienceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobTitle?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableStringFieldUpdateOperationsInput | string | null
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidateCv?: CandidateCvUpdateOneRequiredWithoutCvExperiencesNestedInput
  }

  export type CvExperienceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateCvId?: StringFieldUpdateOperationsInput | string
    jobTitle?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableStringFieldUpdateOperationsInput | string | null
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CvExperienceCreateManyInput = {
    id?: string
    candidateCvId: string
    jobTitle: string
    companyName?: string | null
    startDate?: string | null
    endDate?: string | null
    isCurrent?: boolean
    location?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CvExperienceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobTitle?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableStringFieldUpdateOperationsInput | string | null
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CvExperienceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateCvId?: StringFieldUpdateOperationsInput | string
    jobTitle?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableStringFieldUpdateOperationsInput | string | null
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CvSkillCreateInput = {
    id?: string
    name: string
    category: $Enums.CvSkillCategory
    confidence?: number | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    candidateCv: CandidateCvCreateNestedOneWithoutCvSkillsInput
  }

  export type CvSkillUncheckedCreateInput = {
    id?: string
    candidateCvId: string
    name: string
    category: $Enums.CvSkillCategory
    confidence?: number | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CvSkillUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumCvSkillCategoryFieldUpdateOperationsInput | $Enums.CvSkillCategory
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidateCv?: CandidateCvUpdateOneRequiredWithoutCvSkillsNestedInput
  }

  export type CvSkillUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateCvId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumCvSkillCategoryFieldUpdateOperationsInput | $Enums.CvSkillCategory
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CvSkillCreateManyInput = {
    id?: string
    candidateCvId: string
    name: string
    category: $Enums.CvSkillCategory
    confidence?: number | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CvSkillUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumCvSkillCategoryFieldUpdateOperationsInput | $Enums.CvSkillCategory
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CvSkillUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateCvId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumCvSkillCategoryFieldUpdateOperationsInput | $Enums.CvSkillCategory
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CvTrainingCreateInput = {
    id?: string
    title: string
    organizationName?: string | null
    degree?: string | null
    fieldOfStudy?: string | null
    startDate?: string | null
    endDate?: string | null
    description?: string | null
    location?: string | null
    isCertification?: boolean
    certificationType?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    candidateCv: CandidateCvCreateNestedOneWithoutCvTrainingsInput
  }

  export type CvTrainingUncheckedCreateInput = {
    id?: string
    candidateCvId: string
    title: string
    organizationName?: string | null
    degree?: string | null
    fieldOfStudy?: string | null
    startDate?: string | null
    endDate?: string | null
    description?: string | null
    location?: string | null
    isCertification?: boolean
    certificationType?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CvTrainingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    fieldOfStudy?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableStringFieldUpdateOperationsInput | string | null
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isCertification?: BoolFieldUpdateOperationsInput | boolean
    certificationType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidateCv?: CandidateCvUpdateOneRequiredWithoutCvTrainingsNestedInput
  }

  export type CvTrainingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateCvId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    fieldOfStudy?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableStringFieldUpdateOperationsInput | string | null
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isCertification?: BoolFieldUpdateOperationsInput | boolean
    certificationType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CvTrainingCreateManyInput = {
    id?: string
    candidateCvId: string
    title: string
    organizationName?: string | null
    degree?: string | null
    fieldOfStudy?: string | null
    startDate?: string | null
    endDate?: string | null
    description?: string | null
    location?: string | null
    isCertification?: boolean
    certificationType?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CvTrainingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    fieldOfStudy?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableStringFieldUpdateOperationsInput | string | null
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isCertification?: BoolFieldUpdateOperationsInput | boolean
    certificationType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CvTrainingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateCvId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    fieldOfStudy?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableStringFieldUpdateOperationsInput | string | null
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isCertification?: BoolFieldUpdateOperationsInput | boolean
    certificationType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateInput = {
    id?: string
    name: string
    color: string
    position?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCategoriesInput
    companies?: CompanyCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    color: string
    position?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    companies?: CompanyUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCategoriesNestedInput
    companies?: CompanyUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companies?: CompanyUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: string
    userId: string
    name: string
    color: string
    position?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyCreateInput = {
    id?: string
    name: string
    website?: string | null
    sector?: string | null
    city?: string | null
    country?: string | null
    email?: string | null
    phone?: string | null
    recruiterName?: string | null
    aiSummary?: string | null
    status?: $Enums.CompanyStatus
    isFavorite?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCompaniesInput
    category?: CategoryCreateNestedOneWithoutCompaniesInput
    applications?: ApplicationCreateNestedManyWithoutCompanyInput
    notes?: NoteCreateNestedManyWithoutCompanyInput
    actionHistory?: ActionHistoryCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateInput = {
    id?: string
    userId: string
    categoryId?: string | null
    name: string
    website?: string | null
    sector?: string | null
    city?: string | null
    country?: string | null
    email?: string | null
    phone?: string | null
    recruiterName?: string | null
    aiSummary?: string | null
    status?: $Enums.CompanyStatus
    isFavorite?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    applications?: ApplicationUncheckedCreateNestedManyWithoutCompanyInput
    notes?: NoteUncheckedCreateNestedManyWithoutCompanyInput
    actionHistory?: ActionHistoryUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    recruiterName?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCompanyStatusFieldUpdateOperationsInput | $Enums.CompanyStatus
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCompaniesNestedInput
    category?: CategoryUpdateOneWithoutCompaniesNestedInput
    applications?: ApplicationUpdateManyWithoutCompanyNestedInput
    notes?: NoteUpdateManyWithoutCompanyNestedInput
    actionHistory?: ActionHistoryUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    recruiterName?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCompanyStatusFieldUpdateOperationsInput | $Enums.CompanyStatus
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUncheckedUpdateManyWithoutCompanyNestedInput
    notes?: NoteUncheckedUpdateManyWithoutCompanyNestedInput
    actionHistory?: ActionHistoryUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateManyInput = {
    id?: string
    userId: string
    categoryId?: string | null
    name: string
    website?: string | null
    sector?: string | null
    city?: string | null
    country?: string | null
    email?: string | null
    phone?: string | null
    recruiterName?: string | null
    aiSummary?: string | null
    status?: $Enums.CompanyStatus
    isFavorite?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompanyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    recruiterName?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCompanyStatusFieldUpdateOperationsInput | $Enums.CompanyStatus
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    recruiterName?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCompanyStatusFieldUpdateOperationsInput | $Enums.CompanyStatus
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeCreateInput = {
    id?: string
    name: string
    fileUrl: string
    fileType: string
    fileSize: number
    createdAt?: Date | string
    uploadedAt?: Date | string
    user: UserCreateNestedOneWithoutResumesInput
    applications?: ApplicationCreateNestedManyWithoutResumeInput
  }

  export type ResumeUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    fileUrl: string
    fileType: string
    fileSize: number
    createdAt?: Date | string
    uploadedAt?: Date | string
    applications?: ApplicationUncheckedCreateNestedManyWithoutResumeInput
  }

  export type ResumeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutResumesNestedInput
    applications?: ApplicationUpdateManyWithoutResumeNestedInput
  }

  export type ResumeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUncheckedUpdateManyWithoutResumeNestedInput
  }

  export type ResumeCreateManyInput = {
    id?: string
    userId: string
    name: string
    fileUrl: string
    fileType: string
    fileSize: number
    createdAt?: Date | string
    uploadedAt?: Date | string
  }

  export type ResumeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationCreateInput = {
    id?: string
    emailSubject: string
    emailBody: string
    status?: $Enums.CompanyStatus
    sentAt?: Date | string | null
    createdAt?: Date | string
    company: CompanyCreateNestedOneWithoutApplicationsInput
    resume: ResumeCreateNestedOneWithoutApplicationsInput
  }

  export type ApplicationUncheckedCreateInput = {
    id?: string
    companyId: string
    resumeId: string
    emailSubject: string
    emailBody: string
    status?: $Enums.CompanyStatus
    sentAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ApplicationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailSubject?: StringFieldUpdateOperationsInput | string
    emailBody?: StringFieldUpdateOperationsInput | string
    status?: EnumCompanyStatusFieldUpdateOperationsInput | $Enums.CompanyStatus
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutApplicationsNestedInput
    resume?: ResumeUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type ApplicationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    resumeId?: StringFieldUpdateOperationsInput | string
    emailSubject?: StringFieldUpdateOperationsInput | string
    emailBody?: StringFieldUpdateOperationsInput | string
    status?: EnumCompanyStatusFieldUpdateOperationsInput | $Enums.CompanyStatus
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationCreateManyInput = {
    id?: string
    companyId: string
    resumeId: string
    emailSubject: string
    emailBody: string
    status?: $Enums.CompanyStatus
    sentAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ApplicationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailSubject?: StringFieldUpdateOperationsInput | string
    emailBody?: StringFieldUpdateOperationsInput | string
    status?: EnumCompanyStatusFieldUpdateOperationsInput | $Enums.CompanyStatus
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    resumeId?: StringFieldUpdateOperationsInput | string
    emailSubject?: StringFieldUpdateOperationsInput | string
    emailBody?: StringFieldUpdateOperationsInput | string
    status?: EnumCompanyStatusFieldUpdateOperationsInput | $Enums.CompanyStatus
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoteCreateInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutNotesInput
  }

  export type NoteUncheckedCreateInput = {
    id?: string
    companyId: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutNotesNestedInput
  }

  export type NoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoteCreateManyInput = {
    id?: string
    companyId: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionHistoryCreateInput = {
    id?: string
    actionType: string
    description?: string | null
    createdAt?: Date | string
    company: CompanyCreateNestedOneWithoutActionHistoryInput
  }

  export type ActionHistoryUncheckedCreateInput = {
    id?: string
    companyId: string
    actionType: string
    description?: string | null
    createdAt?: Date | string
  }

  export type ActionHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutActionHistoryNestedInput
  }

  export type ActionHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionHistoryCreateManyInput = {
    id?: string
    companyId: string
    actionType: string
    description?: string | null
    createdAt?: Date | string
  }

  export type ActionHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CategoryListRelationFilter = {
    every?: CategoryWhereInput
    some?: CategoryWhereInput
    none?: CategoryWhereInput
  }

  export type CompanyListRelationFilter = {
    every?: CompanyWhereInput
    some?: CompanyWhereInput
    none?: CompanyWhereInput
  }

  export type ResumeListRelationFilter = {
    every?: ResumeWhereInput
    some?: ResumeWhereInput
    none?: ResumeWhereInput
  }

  export type CandidateProfileNullableScalarRelationFilter = {
    is?: CandidateProfileWhereInput | null
    isNot?: CandidateProfileWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResumeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    passwordResetToken?: SortOrder
    passwordResetExpiresAt?: SortOrder
    emailVerifiedAt?: SortOrder
    emailVerificationCode?: SortOrder
    emailVerificationExpiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    passwordResetToken?: SortOrder
    passwordResetExpiresAt?: SortOrder
    emailVerifiedAt?: SortOrder
    emailVerificationCode?: SortOrder
    emailVerificationExpiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    passwordResetToken?: SortOrder
    passwordResetExpiresAt?: SortOrder
    emailVerifiedAt?: SortOrder
    emailVerificationCode?: SortOrder
    emailVerificationExpiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type CandidateCvListRelationFilter = {
    every?: CandidateCvWhereInput
    some?: CandidateCvWhereInput
    none?: CandidateCvWhereInput
  }

  export type CandidateCvOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CandidateProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CandidateProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CandidateProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumCandidateCvAnalysisStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CandidateCvAnalysisStatus | EnumCandidateCvAnalysisStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CandidateCvAnalysisStatus[] | ListEnumCandidateCvAnalysisStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CandidateCvAnalysisStatus[] | ListEnumCandidateCvAnalysisStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCandidateCvAnalysisStatusFilter<$PrismaModel> | $Enums.CandidateCvAnalysisStatus
  }

  export type CandidateProfileScalarRelationFilter = {
    is?: CandidateProfileWhereInput
    isNot?: CandidateProfileWhereInput
  }

  export type CvExperienceListRelationFilter = {
    every?: CvExperienceWhereInput
    some?: CvExperienceWhereInput
    none?: CvExperienceWhereInput
  }

  export type CvSkillListRelationFilter = {
    every?: CvSkillWhereInput
    some?: CvSkillWhereInput
    none?: CvSkillWhereInput
  }

  export type CvTrainingListRelationFilter = {
    every?: CvTrainingWhereInput
    some?: CvTrainingWhereInput
    none?: CvTrainingWhereInput
  }

  export type CvExperienceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CvSkillOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CvTrainingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CandidateCvCountOrderByAggregateInput = {
    id?: SortOrder
    candidateProfileId?: SortOrder
    label?: SortOrder
    originalFilename?: SortOrder
    storageFilename?: SortOrder
    storageKey?: SortOrder
    fileHash?: SortOrder
    mimeType?: SortOrder
    fileSize?: SortOrder
    isDefault?: SortOrder
    analysisStatus?: SortOrder
    extractedText?: SortOrder
    lastAnalyzedAt?: SortOrder
    uploadedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CandidateCvAvgOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type CandidateCvMaxOrderByAggregateInput = {
    id?: SortOrder
    candidateProfileId?: SortOrder
    label?: SortOrder
    originalFilename?: SortOrder
    storageFilename?: SortOrder
    storageKey?: SortOrder
    fileHash?: SortOrder
    mimeType?: SortOrder
    fileSize?: SortOrder
    isDefault?: SortOrder
    analysisStatus?: SortOrder
    extractedText?: SortOrder
    lastAnalyzedAt?: SortOrder
    uploadedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CandidateCvMinOrderByAggregateInput = {
    id?: SortOrder
    candidateProfileId?: SortOrder
    label?: SortOrder
    originalFilename?: SortOrder
    storageFilename?: SortOrder
    storageKey?: SortOrder
    fileHash?: SortOrder
    mimeType?: SortOrder
    fileSize?: SortOrder
    isDefault?: SortOrder
    analysisStatus?: SortOrder
    extractedText?: SortOrder
    lastAnalyzedAt?: SortOrder
    uploadedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CandidateCvSumOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumCandidateCvAnalysisStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CandidateCvAnalysisStatus | EnumCandidateCvAnalysisStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CandidateCvAnalysisStatus[] | ListEnumCandidateCvAnalysisStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CandidateCvAnalysisStatus[] | ListEnumCandidateCvAnalysisStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCandidateCvAnalysisStatusWithAggregatesFilter<$PrismaModel> | $Enums.CandidateCvAnalysisStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCandidateCvAnalysisStatusFilter<$PrismaModel>
    _max?: NestedEnumCandidateCvAnalysisStatusFilter<$PrismaModel>
  }

  export type CandidateCvScalarRelationFilter = {
    is?: CandidateCvWhereInput
    isNot?: CandidateCvWhereInput
  }

  export type CvExperienceCountOrderByAggregateInput = {
    id?: SortOrder
    candidateCvId?: SortOrder
    jobTitle?: SortOrder
    companyName?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isCurrent?: SortOrder
    location?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CvExperienceMaxOrderByAggregateInput = {
    id?: SortOrder
    candidateCvId?: SortOrder
    jobTitle?: SortOrder
    companyName?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isCurrent?: SortOrder
    location?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CvExperienceMinOrderByAggregateInput = {
    id?: SortOrder
    candidateCvId?: SortOrder
    jobTitle?: SortOrder
    companyName?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isCurrent?: SortOrder
    location?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumCvSkillCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.CvSkillCategory | EnumCvSkillCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.CvSkillCategory[] | ListEnumCvSkillCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.CvSkillCategory[] | ListEnumCvSkillCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumCvSkillCategoryFilter<$PrismaModel> | $Enums.CvSkillCategory
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type CvSkillCountOrderByAggregateInput = {
    id?: SortOrder
    candidateCvId?: SortOrder
    name?: SortOrder
    category?: SortOrder
    confidence?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CvSkillAvgOrderByAggregateInput = {
    confidence?: SortOrder
  }

  export type CvSkillMaxOrderByAggregateInput = {
    id?: SortOrder
    candidateCvId?: SortOrder
    name?: SortOrder
    category?: SortOrder
    confidence?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CvSkillMinOrderByAggregateInput = {
    id?: SortOrder
    candidateCvId?: SortOrder
    name?: SortOrder
    category?: SortOrder
    confidence?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CvSkillSumOrderByAggregateInput = {
    confidence?: SortOrder
  }

  export type EnumCvSkillCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CvSkillCategory | EnumCvSkillCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.CvSkillCategory[] | ListEnumCvSkillCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.CvSkillCategory[] | ListEnumCvSkillCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumCvSkillCategoryWithAggregatesFilter<$PrismaModel> | $Enums.CvSkillCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCvSkillCategoryFilter<$PrismaModel>
    _max?: NestedEnumCvSkillCategoryFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type CvTrainingCountOrderByAggregateInput = {
    id?: SortOrder
    candidateCvId?: SortOrder
    title?: SortOrder
    organizationName?: SortOrder
    degree?: SortOrder
    fieldOfStudy?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    description?: SortOrder
    location?: SortOrder
    isCertification?: SortOrder
    certificationType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CvTrainingMaxOrderByAggregateInput = {
    id?: SortOrder
    candidateCvId?: SortOrder
    title?: SortOrder
    organizationName?: SortOrder
    degree?: SortOrder
    fieldOfStudy?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    description?: SortOrder
    location?: SortOrder
    isCertification?: SortOrder
    certificationType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CvTrainingMinOrderByAggregateInput = {
    id?: SortOrder
    candidateCvId?: SortOrder
    title?: SortOrder
    organizationName?: SortOrder
    degree?: SortOrder
    fieldOfStudy?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    description?: SortOrder
    location?: SortOrder
    isCertification?: SortOrder
    certificationType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    color?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryAvgOrderByAggregateInput = {
    position?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    color?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    color?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategorySumOrderByAggregateInput = {
    position?: SortOrder
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type EnumCompanyStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CompanyStatus | EnumCompanyStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CompanyStatus[] | ListEnumCompanyStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CompanyStatus[] | ListEnumCompanyStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCompanyStatusFilter<$PrismaModel> | $Enums.CompanyStatus
  }

  export type CategoryNullableScalarRelationFilter = {
    is?: CategoryWhereInput | null
    isNot?: CategoryWhereInput | null
  }

  export type ApplicationListRelationFilter = {
    every?: ApplicationWhereInput
    some?: ApplicationWhereInput
    none?: ApplicationWhereInput
  }

  export type NoteListRelationFilter = {
    every?: NoteWhereInput
    some?: NoteWhereInput
    none?: NoteWhereInput
  }

  export type ActionHistoryListRelationFilter = {
    every?: ActionHistoryWhereInput
    some?: ActionHistoryWhereInput
    none?: ActionHistoryWhereInput
  }

  export type ApplicationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActionHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    categoryId?: SortOrder
    name?: SortOrder
    website?: SortOrder
    sector?: SortOrder
    city?: SortOrder
    country?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    recruiterName?: SortOrder
    aiSummary?: SortOrder
    status?: SortOrder
    isFavorite?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    categoryId?: SortOrder
    name?: SortOrder
    website?: SortOrder
    sector?: SortOrder
    city?: SortOrder
    country?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    recruiterName?: SortOrder
    aiSummary?: SortOrder
    status?: SortOrder
    isFavorite?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    categoryId?: SortOrder
    name?: SortOrder
    website?: SortOrder
    sector?: SortOrder
    city?: SortOrder
    country?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    recruiterName?: SortOrder
    aiSummary?: SortOrder
    status?: SortOrder
    isFavorite?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumCompanyStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CompanyStatus | EnumCompanyStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CompanyStatus[] | ListEnumCompanyStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CompanyStatus[] | ListEnumCompanyStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCompanyStatusWithAggregatesFilter<$PrismaModel> | $Enums.CompanyStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCompanyStatusFilter<$PrismaModel>
    _max?: NestedEnumCompanyStatusFilter<$PrismaModel>
  }

  export type ResumeCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    fileUrl?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    createdAt?: SortOrder
    uploadedAt?: SortOrder
  }

  export type ResumeAvgOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type ResumeMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    fileUrl?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    createdAt?: SortOrder
    uploadedAt?: SortOrder
  }

  export type ResumeMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    fileUrl?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    createdAt?: SortOrder
    uploadedAt?: SortOrder
  }

  export type ResumeSumOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type CompanyScalarRelationFilter = {
    is?: CompanyWhereInput
    isNot?: CompanyWhereInput
  }

  export type ResumeScalarRelationFilter = {
    is?: ResumeWhereInput
    isNot?: ResumeWhereInput
  }

  export type ApplicationCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    resumeId?: SortOrder
    emailSubject?: SortOrder
    emailBody?: SortOrder
    status?: SortOrder
    sentAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ApplicationMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    resumeId?: SortOrder
    emailSubject?: SortOrder
    emailBody?: SortOrder
    status?: SortOrder
    sentAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ApplicationMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    resumeId?: SortOrder
    emailSubject?: SortOrder
    emailBody?: SortOrder
    status?: SortOrder
    sentAt?: SortOrder
    createdAt?: SortOrder
  }

  export type NoteCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NoteMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NoteMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActionHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    actionType?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type ActionHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    actionType?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type ActionHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    actionType?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type CategoryCreateNestedManyWithoutUserInput = {
    create?: XOR<CategoryCreateWithoutUserInput, CategoryUncheckedCreateWithoutUserInput> | CategoryCreateWithoutUserInput[] | CategoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutUserInput | CategoryCreateOrConnectWithoutUserInput[]
    createMany?: CategoryCreateManyUserInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type CompanyCreateNestedManyWithoutUserInput = {
    create?: XOR<CompanyCreateWithoutUserInput, CompanyUncheckedCreateWithoutUserInput> | CompanyCreateWithoutUserInput[] | CompanyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CompanyCreateOrConnectWithoutUserInput | CompanyCreateOrConnectWithoutUserInput[]
    createMany?: CompanyCreateManyUserInputEnvelope
    connect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
  }

  export type ResumeCreateNestedManyWithoutUserInput = {
    create?: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput> | ResumeCreateWithoutUserInput[] | ResumeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResumeCreateOrConnectWithoutUserInput | ResumeCreateOrConnectWithoutUserInput[]
    createMany?: ResumeCreateManyUserInputEnvelope
    connect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
  }

  export type CandidateProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<CandidateProfileCreateWithoutUserInput, CandidateProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: CandidateProfileCreateOrConnectWithoutUserInput
    connect?: CandidateProfileWhereUniqueInput
  }

  export type CategoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CategoryCreateWithoutUserInput, CategoryUncheckedCreateWithoutUserInput> | CategoryCreateWithoutUserInput[] | CategoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutUserInput | CategoryCreateOrConnectWithoutUserInput[]
    createMany?: CategoryCreateManyUserInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type CompanyUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CompanyCreateWithoutUserInput, CompanyUncheckedCreateWithoutUserInput> | CompanyCreateWithoutUserInput[] | CompanyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CompanyCreateOrConnectWithoutUserInput | CompanyCreateOrConnectWithoutUserInput[]
    createMany?: CompanyCreateManyUserInputEnvelope
    connect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
  }

  export type ResumeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput> | ResumeCreateWithoutUserInput[] | ResumeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResumeCreateOrConnectWithoutUserInput | ResumeCreateOrConnectWithoutUserInput[]
    createMany?: ResumeCreateManyUserInputEnvelope
    connect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
  }

  export type CandidateProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<CandidateProfileCreateWithoutUserInput, CandidateProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: CandidateProfileCreateOrConnectWithoutUserInput
    connect?: CandidateProfileWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CategoryUpdateManyWithoutUserNestedInput = {
    create?: XOR<CategoryCreateWithoutUserInput, CategoryUncheckedCreateWithoutUserInput> | CategoryCreateWithoutUserInput[] | CategoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutUserInput | CategoryCreateOrConnectWithoutUserInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutUserInput | CategoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CategoryCreateManyUserInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutUserInput | CategoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutUserInput | CategoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type CompanyUpdateManyWithoutUserNestedInput = {
    create?: XOR<CompanyCreateWithoutUserInput, CompanyUncheckedCreateWithoutUserInput> | CompanyCreateWithoutUserInput[] | CompanyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CompanyCreateOrConnectWithoutUserInput | CompanyCreateOrConnectWithoutUserInput[]
    upsert?: CompanyUpsertWithWhereUniqueWithoutUserInput | CompanyUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CompanyCreateManyUserInputEnvelope
    set?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    disconnect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    delete?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    connect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    update?: CompanyUpdateWithWhereUniqueWithoutUserInput | CompanyUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CompanyUpdateManyWithWhereWithoutUserInput | CompanyUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CompanyScalarWhereInput | CompanyScalarWhereInput[]
  }

  export type ResumeUpdateManyWithoutUserNestedInput = {
    create?: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput> | ResumeCreateWithoutUserInput[] | ResumeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResumeCreateOrConnectWithoutUserInput | ResumeCreateOrConnectWithoutUserInput[]
    upsert?: ResumeUpsertWithWhereUniqueWithoutUserInput | ResumeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ResumeCreateManyUserInputEnvelope
    set?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    disconnect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    delete?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    connect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    update?: ResumeUpdateWithWhereUniqueWithoutUserInput | ResumeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResumeUpdateManyWithWhereWithoutUserInput | ResumeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ResumeScalarWhereInput | ResumeScalarWhereInput[]
  }

  export type CandidateProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<CandidateProfileCreateWithoutUserInput, CandidateProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: CandidateProfileCreateOrConnectWithoutUserInput
    upsert?: CandidateProfileUpsertWithoutUserInput
    disconnect?: CandidateProfileWhereInput | boolean
    delete?: CandidateProfileWhereInput | boolean
    connect?: CandidateProfileWhereUniqueInput
    update?: XOR<XOR<CandidateProfileUpdateToOneWithWhereWithoutUserInput, CandidateProfileUpdateWithoutUserInput>, CandidateProfileUncheckedUpdateWithoutUserInput>
  }

  export type CategoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CategoryCreateWithoutUserInput, CategoryUncheckedCreateWithoutUserInput> | CategoryCreateWithoutUserInput[] | CategoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutUserInput | CategoryCreateOrConnectWithoutUserInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutUserInput | CategoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CategoryCreateManyUserInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutUserInput | CategoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutUserInput | CategoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type CompanyUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CompanyCreateWithoutUserInput, CompanyUncheckedCreateWithoutUserInput> | CompanyCreateWithoutUserInput[] | CompanyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CompanyCreateOrConnectWithoutUserInput | CompanyCreateOrConnectWithoutUserInput[]
    upsert?: CompanyUpsertWithWhereUniqueWithoutUserInput | CompanyUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CompanyCreateManyUserInputEnvelope
    set?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    disconnect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    delete?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    connect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    update?: CompanyUpdateWithWhereUniqueWithoutUserInput | CompanyUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CompanyUpdateManyWithWhereWithoutUserInput | CompanyUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CompanyScalarWhereInput | CompanyScalarWhereInput[]
  }

  export type ResumeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput> | ResumeCreateWithoutUserInput[] | ResumeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResumeCreateOrConnectWithoutUserInput | ResumeCreateOrConnectWithoutUserInput[]
    upsert?: ResumeUpsertWithWhereUniqueWithoutUserInput | ResumeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ResumeCreateManyUserInputEnvelope
    set?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    disconnect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    delete?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    connect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    update?: ResumeUpdateWithWhereUniqueWithoutUserInput | ResumeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResumeUpdateManyWithWhereWithoutUserInput | ResumeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ResumeScalarWhereInput | ResumeScalarWhereInput[]
  }

  export type CandidateProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<CandidateProfileCreateWithoutUserInput, CandidateProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: CandidateProfileCreateOrConnectWithoutUserInput
    upsert?: CandidateProfileUpsertWithoutUserInput
    disconnect?: CandidateProfileWhereInput | boolean
    delete?: CandidateProfileWhereInput | boolean
    connect?: CandidateProfileWhereUniqueInput
    update?: XOR<XOR<CandidateProfileUpdateToOneWithWhereWithoutUserInput, CandidateProfileUpdateWithoutUserInput>, CandidateProfileUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutCandidateProfileInput = {
    create?: XOR<UserCreateWithoutCandidateProfileInput, UserUncheckedCreateWithoutCandidateProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutCandidateProfileInput
    connect?: UserWhereUniqueInput
  }

  export type CandidateCvCreateNestedManyWithoutCandidateProfileInput = {
    create?: XOR<CandidateCvCreateWithoutCandidateProfileInput, CandidateCvUncheckedCreateWithoutCandidateProfileInput> | CandidateCvCreateWithoutCandidateProfileInput[] | CandidateCvUncheckedCreateWithoutCandidateProfileInput[]
    connectOrCreate?: CandidateCvCreateOrConnectWithoutCandidateProfileInput | CandidateCvCreateOrConnectWithoutCandidateProfileInput[]
    createMany?: CandidateCvCreateManyCandidateProfileInputEnvelope
    connect?: CandidateCvWhereUniqueInput | CandidateCvWhereUniqueInput[]
  }

  export type CandidateCvUncheckedCreateNestedManyWithoutCandidateProfileInput = {
    create?: XOR<CandidateCvCreateWithoutCandidateProfileInput, CandidateCvUncheckedCreateWithoutCandidateProfileInput> | CandidateCvCreateWithoutCandidateProfileInput[] | CandidateCvUncheckedCreateWithoutCandidateProfileInput[]
    connectOrCreate?: CandidateCvCreateOrConnectWithoutCandidateProfileInput | CandidateCvCreateOrConnectWithoutCandidateProfileInput[]
    createMany?: CandidateCvCreateManyCandidateProfileInputEnvelope
    connect?: CandidateCvWhereUniqueInput | CandidateCvWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutCandidateProfileNestedInput = {
    create?: XOR<UserCreateWithoutCandidateProfileInput, UserUncheckedCreateWithoutCandidateProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutCandidateProfileInput
    upsert?: UserUpsertWithoutCandidateProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCandidateProfileInput, UserUpdateWithoutCandidateProfileInput>, UserUncheckedUpdateWithoutCandidateProfileInput>
  }

  export type CandidateCvUpdateManyWithoutCandidateProfileNestedInput = {
    create?: XOR<CandidateCvCreateWithoutCandidateProfileInput, CandidateCvUncheckedCreateWithoutCandidateProfileInput> | CandidateCvCreateWithoutCandidateProfileInput[] | CandidateCvUncheckedCreateWithoutCandidateProfileInput[]
    connectOrCreate?: CandidateCvCreateOrConnectWithoutCandidateProfileInput | CandidateCvCreateOrConnectWithoutCandidateProfileInput[]
    upsert?: CandidateCvUpsertWithWhereUniqueWithoutCandidateProfileInput | CandidateCvUpsertWithWhereUniqueWithoutCandidateProfileInput[]
    createMany?: CandidateCvCreateManyCandidateProfileInputEnvelope
    set?: CandidateCvWhereUniqueInput | CandidateCvWhereUniqueInput[]
    disconnect?: CandidateCvWhereUniqueInput | CandidateCvWhereUniqueInput[]
    delete?: CandidateCvWhereUniqueInput | CandidateCvWhereUniqueInput[]
    connect?: CandidateCvWhereUniqueInput | CandidateCvWhereUniqueInput[]
    update?: CandidateCvUpdateWithWhereUniqueWithoutCandidateProfileInput | CandidateCvUpdateWithWhereUniqueWithoutCandidateProfileInput[]
    updateMany?: CandidateCvUpdateManyWithWhereWithoutCandidateProfileInput | CandidateCvUpdateManyWithWhereWithoutCandidateProfileInput[]
    deleteMany?: CandidateCvScalarWhereInput | CandidateCvScalarWhereInput[]
  }

  export type CandidateCvUncheckedUpdateManyWithoutCandidateProfileNestedInput = {
    create?: XOR<CandidateCvCreateWithoutCandidateProfileInput, CandidateCvUncheckedCreateWithoutCandidateProfileInput> | CandidateCvCreateWithoutCandidateProfileInput[] | CandidateCvUncheckedCreateWithoutCandidateProfileInput[]
    connectOrCreate?: CandidateCvCreateOrConnectWithoutCandidateProfileInput | CandidateCvCreateOrConnectWithoutCandidateProfileInput[]
    upsert?: CandidateCvUpsertWithWhereUniqueWithoutCandidateProfileInput | CandidateCvUpsertWithWhereUniqueWithoutCandidateProfileInput[]
    createMany?: CandidateCvCreateManyCandidateProfileInputEnvelope
    set?: CandidateCvWhereUniqueInput | CandidateCvWhereUniqueInput[]
    disconnect?: CandidateCvWhereUniqueInput | CandidateCvWhereUniqueInput[]
    delete?: CandidateCvWhereUniqueInput | CandidateCvWhereUniqueInput[]
    connect?: CandidateCvWhereUniqueInput | CandidateCvWhereUniqueInput[]
    update?: CandidateCvUpdateWithWhereUniqueWithoutCandidateProfileInput | CandidateCvUpdateWithWhereUniqueWithoutCandidateProfileInput[]
    updateMany?: CandidateCvUpdateManyWithWhereWithoutCandidateProfileInput | CandidateCvUpdateManyWithWhereWithoutCandidateProfileInput[]
    deleteMany?: CandidateCvScalarWhereInput | CandidateCvScalarWhereInput[]
  }

  export type CandidateProfileCreateNestedOneWithoutCvsInput = {
    create?: XOR<CandidateProfileCreateWithoutCvsInput, CandidateProfileUncheckedCreateWithoutCvsInput>
    connectOrCreate?: CandidateProfileCreateOrConnectWithoutCvsInput
    connect?: CandidateProfileWhereUniqueInput
  }

  export type CvExperienceCreateNestedManyWithoutCandidateCvInput = {
    create?: XOR<CvExperienceCreateWithoutCandidateCvInput, CvExperienceUncheckedCreateWithoutCandidateCvInput> | CvExperienceCreateWithoutCandidateCvInput[] | CvExperienceUncheckedCreateWithoutCandidateCvInput[]
    connectOrCreate?: CvExperienceCreateOrConnectWithoutCandidateCvInput | CvExperienceCreateOrConnectWithoutCandidateCvInput[]
    createMany?: CvExperienceCreateManyCandidateCvInputEnvelope
    connect?: CvExperienceWhereUniqueInput | CvExperienceWhereUniqueInput[]
  }

  export type CvSkillCreateNestedManyWithoutCandidateCvInput = {
    create?: XOR<CvSkillCreateWithoutCandidateCvInput, CvSkillUncheckedCreateWithoutCandidateCvInput> | CvSkillCreateWithoutCandidateCvInput[] | CvSkillUncheckedCreateWithoutCandidateCvInput[]
    connectOrCreate?: CvSkillCreateOrConnectWithoutCandidateCvInput | CvSkillCreateOrConnectWithoutCandidateCvInput[]
    createMany?: CvSkillCreateManyCandidateCvInputEnvelope
    connect?: CvSkillWhereUniqueInput | CvSkillWhereUniqueInput[]
  }

  export type CvTrainingCreateNestedManyWithoutCandidateCvInput = {
    create?: XOR<CvTrainingCreateWithoutCandidateCvInput, CvTrainingUncheckedCreateWithoutCandidateCvInput> | CvTrainingCreateWithoutCandidateCvInput[] | CvTrainingUncheckedCreateWithoutCandidateCvInput[]
    connectOrCreate?: CvTrainingCreateOrConnectWithoutCandidateCvInput | CvTrainingCreateOrConnectWithoutCandidateCvInput[]
    createMany?: CvTrainingCreateManyCandidateCvInputEnvelope
    connect?: CvTrainingWhereUniqueInput | CvTrainingWhereUniqueInput[]
  }

  export type CvExperienceUncheckedCreateNestedManyWithoutCandidateCvInput = {
    create?: XOR<CvExperienceCreateWithoutCandidateCvInput, CvExperienceUncheckedCreateWithoutCandidateCvInput> | CvExperienceCreateWithoutCandidateCvInput[] | CvExperienceUncheckedCreateWithoutCandidateCvInput[]
    connectOrCreate?: CvExperienceCreateOrConnectWithoutCandidateCvInput | CvExperienceCreateOrConnectWithoutCandidateCvInput[]
    createMany?: CvExperienceCreateManyCandidateCvInputEnvelope
    connect?: CvExperienceWhereUniqueInput | CvExperienceWhereUniqueInput[]
  }

  export type CvSkillUncheckedCreateNestedManyWithoutCandidateCvInput = {
    create?: XOR<CvSkillCreateWithoutCandidateCvInput, CvSkillUncheckedCreateWithoutCandidateCvInput> | CvSkillCreateWithoutCandidateCvInput[] | CvSkillUncheckedCreateWithoutCandidateCvInput[]
    connectOrCreate?: CvSkillCreateOrConnectWithoutCandidateCvInput | CvSkillCreateOrConnectWithoutCandidateCvInput[]
    createMany?: CvSkillCreateManyCandidateCvInputEnvelope
    connect?: CvSkillWhereUniqueInput | CvSkillWhereUniqueInput[]
  }

  export type CvTrainingUncheckedCreateNestedManyWithoutCandidateCvInput = {
    create?: XOR<CvTrainingCreateWithoutCandidateCvInput, CvTrainingUncheckedCreateWithoutCandidateCvInput> | CvTrainingCreateWithoutCandidateCvInput[] | CvTrainingUncheckedCreateWithoutCandidateCvInput[]
    connectOrCreate?: CvTrainingCreateOrConnectWithoutCandidateCvInput | CvTrainingCreateOrConnectWithoutCandidateCvInput[]
    createMany?: CvTrainingCreateManyCandidateCvInputEnvelope
    connect?: CvTrainingWhereUniqueInput | CvTrainingWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumCandidateCvAnalysisStatusFieldUpdateOperationsInput = {
    set?: $Enums.CandidateCvAnalysisStatus
  }

  export type CandidateProfileUpdateOneRequiredWithoutCvsNestedInput = {
    create?: XOR<CandidateProfileCreateWithoutCvsInput, CandidateProfileUncheckedCreateWithoutCvsInput>
    connectOrCreate?: CandidateProfileCreateOrConnectWithoutCvsInput
    upsert?: CandidateProfileUpsertWithoutCvsInput
    connect?: CandidateProfileWhereUniqueInput
    update?: XOR<XOR<CandidateProfileUpdateToOneWithWhereWithoutCvsInput, CandidateProfileUpdateWithoutCvsInput>, CandidateProfileUncheckedUpdateWithoutCvsInput>
  }

  export type CvExperienceUpdateManyWithoutCandidateCvNestedInput = {
    create?: XOR<CvExperienceCreateWithoutCandidateCvInput, CvExperienceUncheckedCreateWithoutCandidateCvInput> | CvExperienceCreateWithoutCandidateCvInput[] | CvExperienceUncheckedCreateWithoutCandidateCvInput[]
    connectOrCreate?: CvExperienceCreateOrConnectWithoutCandidateCvInput | CvExperienceCreateOrConnectWithoutCandidateCvInput[]
    upsert?: CvExperienceUpsertWithWhereUniqueWithoutCandidateCvInput | CvExperienceUpsertWithWhereUniqueWithoutCandidateCvInput[]
    createMany?: CvExperienceCreateManyCandidateCvInputEnvelope
    set?: CvExperienceWhereUniqueInput | CvExperienceWhereUniqueInput[]
    disconnect?: CvExperienceWhereUniqueInput | CvExperienceWhereUniqueInput[]
    delete?: CvExperienceWhereUniqueInput | CvExperienceWhereUniqueInput[]
    connect?: CvExperienceWhereUniqueInput | CvExperienceWhereUniqueInput[]
    update?: CvExperienceUpdateWithWhereUniqueWithoutCandidateCvInput | CvExperienceUpdateWithWhereUniqueWithoutCandidateCvInput[]
    updateMany?: CvExperienceUpdateManyWithWhereWithoutCandidateCvInput | CvExperienceUpdateManyWithWhereWithoutCandidateCvInput[]
    deleteMany?: CvExperienceScalarWhereInput | CvExperienceScalarWhereInput[]
  }

  export type CvSkillUpdateManyWithoutCandidateCvNestedInput = {
    create?: XOR<CvSkillCreateWithoutCandidateCvInput, CvSkillUncheckedCreateWithoutCandidateCvInput> | CvSkillCreateWithoutCandidateCvInput[] | CvSkillUncheckedCreateWithoutCandidateCvInput[]
    connectOrCreate?: CvSkillCreateOrConnectWithoutCandidateCvInput | CvSkillCreateOrConnectWithoutCandidateCvInput[]
    upsert?: CvSkillUpsertWithWhereUniqueWithoutCandidateCvInput | CvSkillUpsertWithWhereUniqueWithoutCandidateCvInput[]
    createMany?: CvSkillCreateManyCandidateCvInputEnvelope
    set?: CvSkillWhereUniqueInput | CvSkillWhereUniqueInput[]
    disconnect?: CvSkillWhereUniqueInput | CvSkillWhereUniqueInput[]
    delete?: CvSkillWhereUniqueInput | CvSkillWhereUniqueInput[]
    connect?: CvSkillWhereUniqueInput | CvSkillWhereUniqueInput[]
    update?: CvSkillUpdateWithWhereUniqueWithoutCandidateCvInput | CvSkillUpdateWithWhereUniqueWithoutCandidateCvInput[]
    updateMany?: CvSkillUpdateManyWithWhereWithoutCandidateCvInput | CvSkillUpdateManyWithWhereWithoutCandidateCvInput[]
    deleteMany?: CvSkillScalarWhereInput | CvSkillScalarWhereInput[]
  }

  export type CvTrainingUpdateManyWithoutCandidateCvNestedInput = {
    create?: XOR<CvTrainingCreateWithoutCandidateCvInput, CvTrainingUncheckedCreateWithoutCandidateCvInput> | CvTrainingCreateWithoutCandidateCvInput[] | CvTrainingUncheckedCreateWithoutCandidateCvInput[]
    connectOrCreate?: CvTrainingCreateOrConnectWithoutCandidateCvInput | CvTrainingCreateOrConnectWithoutCandidateCvInput[]
    upsert?: CvTrainingUpsertWithWhereUniqueWithoutCandidateCvInput | CvTrainingUpsertWithWhereUniqueWithoutCandidateCvInput[]
    createMany?: CvTrainingCreateManyCandidateCvInputEnvelope
    set?: CvTrainingWhereUniqueInput | CvTrainingWhereUniqueInput[]
    disconnect?: CvTrainingWhereUniqueInput | CvTrainingWhereUniqueInput[]
    delete?: CvTrainingWhereUniqueInput | CvTrainingWhereUniqueInput[]
    connect?: CvTrainingWhereUniqueInput | CvTrainingWhereUniqueInput[]
    update?: CvTrainingUpdateWithWhereUniqueWithoutCandidateCvInput | CvTrainingUpdateWithWhereUniqueWithoutCandidateCvInput[]
    updateMany?: CvTrainingUpdateManyWithWhereWithoutCandidateCvInput | CvTrainingUpdateManyWithWhereWithoutCandidateCvInput[]
    deleteMany?: CvTrainingScalarWhereInput | CvTrainingScalarWhereInput[]
  }

  export type CvExperienceUncheckedUpdateManyWithoutCandidateCvNestedInput = {
    create?: XOR<CvExperienceCreateWithoutCandidateCvInput, CvExperienceUncheckedCreateWithoutCandidateCvInput> | CvExperienceCreateWithoutCandidateCvInput[] | CvExperienceUncheckedCreateWithoutCandidateCvInput[]
    connectOrCreate?: CvExperienceCreateOrConnectWithoutCandidateCvInput | CvExperienceCreateOrConnectWithoutCandidateCvInput[]
    upsert?: CvExperienceUpsertWithWhereUniqueWithoutCandidateCvInput | CvExperienceUpsertWithWhereUniqueWithoutCandidateCvInput[]
    createMany?: CvExperienceCreateManyCandidateCvInputEnvelope
    set?: CvExperienceWhereUniqueInput | CvExperienceWhereUniqueInput[]
    disconnect?: CvExperienceWhereUniqueInput | CvExperienceWhereUniqueInput[]
    delete?: CvExperienceWhereUniqueInput | CvExperienceWhereUniqueInput[]
    connect?: CvExperienceWhereUniqueInput | CvExperienceWhereUniqueInput[]
    update?: CvExperienceUpdateWithWhereUniqueWithoutCandidateCvInput | CvExperienceUpdateWithWhereUniqueWithoutCandidateCvInput[]
    updateMany?: CvExperienceUpdateManyWithWhereWithoutCandidateCvInput | CvExperienceUpdateManyWithWhereWithoutCandidateCvInput[]
    deleteMany?: CvExperienceScalarWhereInput | CvExperienceScalarWhereInput[]
  }

  export type CvSkillUncheckedUpdateManyWithoutCandidateCvNestedInput = {
    create?: XOR<CvSkillCreateWithoutCandidateCvInput, CvSkillUncheckedCreateWithoutCandidateCvInput> | CvSkillCreateWithoutCandidateCvInput[] | CvSkillUncheckedCreateWithoutCandidateCvInput[]
    connectOrCreate?: CvSkillCreateOrConnectWithoutCandidateCvInput | CvSkillCreateOrConnectWithoutCandidateCvInput[]
    upsert?: CvSkillUpsertWithWhereUniqueWithoutCandidateCvInput | CvSkillUpsertWithWhereUniqueWithoutCandidateCvInput[]
    createMany?: CvSkillCreateManyCandidateCvInputEnvelope
    set?: CvSkillWhereUniqueInput | CvSkillWhereUniqueInput[]
    disconnect?: CvSkillWhereUniqueInput | CvSkillWhereUniqueInput[]
    delete?: CvSkillWhereUniqueInput | CvSkillWhereUniqueInput[]
    connect?: CvSkillWhereUniqueInput | CvSkillWhereUniqueInput[]
    update?: CvSkillUpdateWithWhereUniqueWithoutCandidateCvInput | CvSkillUpdateWithWhereUniqueWithoutCandidateCvInput[]
    updateMany?: CvSkillUpdateManyWithWhereWithoutCandidateCvInput | CvSkillUpdateManyWithWhereWithoutCandidateCvInput[]
    deleteMany?: CvSkillScalarWhereInput | CvSkillScalarWhereInput[]
  }

  export type CvTrainingUncheckedUpdateManyWithoutCandidateCvNestedInput = {
    create?: XOR<CvTrainingCreateWithoutCandidateCvInput, CvTrainingUncheckedCreateWithoutCandidateCvInput> | CvTrainingCreateWithoutCandidateCvInput[] | CvTrainingUncheckedCreateWithoutCandidateCvInput[]
    connectOrCreate?: CvTrainingCreateOrConnectWithoutCandidateCvInput | CvTrainingCreateOrConnectWithoutCandidateCvInput[]
    upsert?: CvTrainingUpsertWithWhereUniqueWithoutCandidateCvInput | CvTrainingUpsertWithWhereUniqueWithoutCandidateCvInput[]
    createMany?: CvTrainingCreateManyCandidateCvInputEnvelope
    set?: CvTrainingWhereUniqueInput | CvTrainingWhereUniqueInput[]
    disconnect?: CvTrainingWhereUniqueInput | CvTrainingWhereUniqueInput[]
    delete?: CvTrainingWhereUniqueInput | CvTrainingWhereUniqueInput[]
    connect?: CvTrainingWhereUniqueInput | CvTrainingWhereUniqueInput[]
    update?: CvTrainingUpdateWithWhereUniqueWithoutCandidateCvInput | CvTrainingUpdateWithWhereUniqueWithoutCandidateCvInput[]
    updateMany?: CvTrainingUpdateManyWithWhereWithoutCandidateCvInput | CvTrainingUpdateManyWithWhereWithoutCandidateCvInput[]
    deleteMany?: CvTrainingScalarWhereInput | CvTrainingScalarWhereInput[]
  }

  export type CandidateCvCreateNestedOneWithoutCvExperiencesInput = {
    create?: XOR<CandidateCvCreateWithoutCvExperiencesInput, CandidateCvUncheckedCreateWithoutCvExperiencesInput>
    connectOrCreate?: CandidateCvCreateOrConnectWithoutCvExperiencesInput
    connect?: CandidateCvWhereUniqueInput
  }

  export type CandidateCvUpdateOneRequiredWithoutCvExperiencesNestedInput = {
    create?: XOR<CandidateCvCreateWithoutCvExperiencesInput, CandidateCvUncheckedCreateWithoutCvExperiencesInput>
    connectOrCreate?: CandidateCvCreateOrConnectWithoutCvExperiencesInput
    upsert?: CandidateCvUpsertWithoutCvExperiencesInput
    connect?: CandidateCvWhereUniqueInput
    update?: XOR<XOR<CandidateCvUpdateToOneWithWhereWithoutCvExperiencesInput, CandidateCvUpdateWithoutCvExperiencesInput>, CandidateCvUncheckedUpdateWithoutCvExperiencesInput>
  }

  export type CandidateCvCreateNestedOneWithoutCvSkillsInput = {
    create?: XOR<CandidateCvCreateWithoutCvSkillsInput, CandidateCvUncheckedCreateWithoutCvSkillsInput>
    connectOrCreate?: CandidateCvCreateOrConnectWithoutCvSkillsInput
    connect?: CandidateCvWhereUniqueInput
  }

  export type EnumCvSkillCategoryFieldUpdateOperationsInput = {
    set?: $Enums.CvSkillCategory
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CandidateCvUpdateOneRequiredWithoutCvSkillsNestedInput = {
    create?: XOR<CandidateCvCreateWithoutCvSkillsInput, CandidateCvUncheckedCreateWithoutCvSkillsInput>
    connectOrCreate?: CandidateCvCreateOrConnectWithoutCvSkillsInput
    upsert?: CandidateCvUpsertWithoutCvSkillsInput
    connect?: CandidateCvWhereUniqueInput
    update?: XOR<XOR<CandidateCvUpdateToOneWithWhereWithoutCvSkillsInput, CandidateCvUpdateWithoutCvSkillsInput>, CandidateCvUncheckedUpdateWithoutCvSkillsInput>
  }

  export type CandidateCvCreateNestedOneWithoutCvTrainingsInput = {
    create?: XOR<CandidateCvCreateWithoutCvTrainingsInput, CandidateCvUncheckedCreateWithoutCvTrainingsInput>
    connectOrCreate?: CandidateCvCreateOrConnectWithoutCvTrainingsInput
    connect?: CandidateCvWhereUniqueInput
  }

  export type CandidateCvUpdateOneRequiredWithoutCvTrainingsNestedInput = {
    create?: XOR<CandidateCvCreateWithoutCvTrainingsInput, CandidateCvUncheckedCreateWithoutCvTrainingsInput>
    connectOrCreate?: CandidateCvCreateOrConnectWithoutCvTrainingsInput
    upsert?: CandidateCvUpsertWithoutCvTrainingsInput
    connect?: CandidateCvWhereUniqueInput
    update?: XOR<XOR<CandidateCvUpdateToOneWithWhereWithoutCvTrainingsInput, CandidateCvUpdateWithoutCvTrainingsInput>, CandidateCvUncheckedUpdateWithoutCvTrainingsInput>
  }

  export type UserCreateNestedOneWithoutCategoriesInput = {
    create?: XOR<UserCreateWithoutCategoriesInput, UserUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCategoriesInput
    connect?: UserWhereUniqueInput
  }

  export type CompanyCreateNestedManyWithoutCategoryInput = {
    create?: XOR<CompanyCreateWithoutCategoryInput, CompanyUncheckedCreateWithoutCategoryInput> | CompanyCreateWithoutCategoryInput[] | CompanyUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CompanyCreateOrConnectWithoutCategoryInput | CompanyCreateOrConnectWithoutCategoryInput[]
    createMany?: CompanyCreateManyCategoryInputEnvelope
    connect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
  }

  export type CompanyUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<CompanyCreateWithoutCategoryInput, CompanyUncheckedCreateWithoutCategoryInput> | CompanyCreateWithoutCategoryInput[] | CompanyUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CompanyCreateOrConnectWithoutCategoryInput | CompanyCreateOrConnectWithoutCategoryInput[]
    createMany?: CompanyCreateManyCategoryInputEnvelope
    connect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutCategoriesNestedInput = {
    create?: XOR<UserCreateWithoutCategoriesInput, UserUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCategoriesInput
    upsert?: UserUpsertWithoutCategoriesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCategoriesInput, UserUpdateWithoutCategoriesInput>, UserUncheckedUpdateWithoutCategoriesInput>
  }

  export type CompanyUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<CompanyCreateWithoutCategoryInput, CompanyUncheckedCreateWithoutCategoryInput> | CompanyCreateWithoutCategoryInput[] | CompanyUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CompanyCreateOrConnectWithoutCategoryInput | CompanyCreateOrConnectWithoutCategoryInput[]
    upsert?: CompanyUpsertWithWhereUniqueWithoutCategoryInput | CompanyUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: CompanyCreateManyCategoryInputEnvelope
    set?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    disconnect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    delete?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    connect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    update?: CompanyUpdateWithWhereUniqueWithoutCategoryInput | CompanyUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: CompanyUpdateManyWithWhereWithoutCategoryInput | CompanyUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: CompanyScalarWhereInput | CompanyScalarWhereInput[]
  }

  export type CompanyUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<CompanyCreateWithoutCategoryInput, CompanyUncheckedCreateWithoutCategoryInput> | CompanyCreateWithoutCategoryInput[] | CompanyUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CompanyCreateOrConnectWithoutCategoryInput | CompanyCreateOrConnectWithoutCategoryInput[]
    upsert?: CompanyUpsertWithWhereUniqueWithoutCategoryInput | CompanyUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: CompanyCreateManyCategoryInputEnvelope
    set?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    disconnect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    delete?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    connect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    update?: CompanyUpdateWithWhereUniqueWithoutCategoryInput | CompanyUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: CompanyUpdateManyWithWhereWithoutCategoryInput | CompanyUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: CompanyScalarWhereInput | CompanyScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCompaniesInput = {
    create?: XOR<UserCreateWithoutCompaniesInput, UserUncheckedCreateWithoutCompaniesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCompaniesInput
    connect?: UserWhereUniqueInput
  }

  export type CategoryCreateNestedOneWithoutCompaniesInput = {
    create?: XOR<CategoryCreateWithoutCompaniesInput, CategoryUncheckedCreateWithoutCompaniesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutCompaniesInput
    connect?: CategoryWhereUniqueInput
  }

  export type ApplicationCreateNestedManyWithoutCompanyInput = {
    create?: XOR<ApplicationCreateWithoutCompanyInput, ApplicationUncheckedCreateWithoutCompanyInput> | ApplicationCreateWithoutCompanyInput[] | ApplicationUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutCompanyInput | ApplicationCreateOrConnectWithoutCompanyInput[]
    createMany?: ApplicationCreateManyCompanyInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type NoteCreateNestedManyWithoutCompanyInput = {
    create?: XOR<NoteCreateWithoutCompanyInput, NoteUncheckedCreateWithoutCompanyInput> | NoteCreateWithoutCompanyInput[] | NoteUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutCompanyInput | NoteCreateOrConnectWithoutCompanyInput[]
    createMany?: NoteCreateManyCompanyInputEnvelope
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
  }

  export type ActionHistoryCreateNestedManyWithoutCompanyInput = {
    create?: XOR<ActionHistoryCreateWithoutCompanyInput, ActionHistoryUncheckedCreateWithoutCompanyInput> | ActionHistoryCreateWithoutCompanyInput[] | ActionHistoryUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ActionHistoryCreateOrConnectWithoutCompanyInput | ActionHistoryCreateOrConnectWithoutCompanyInput[]
    createMany?: ActionHistoryCreateManyCompanyInputEnvelope
    connect?: ActionHistoryWhereUniqueInput | ActionHistoryWhereUniqueInput[]
  }

  export type ApplicationUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<ApplicationCreateWithoutCompanyInput, ApplicationUncheckedCreateWithoutCompanyInput> | ApplicationCreateWithoutCompanyInput[] | ApplicationUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutCompanyInput | ApplicationCreateOrConnectWithoutCompanyInput[]
    createMany?: ApplicationCreateManyCompanyInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type NoteUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<NoteCreateWithoutCompanyInput, NoteUncheckedCreateWithoutCompanyInput> | NoteCreateWithoutCompanyInput[] | NoteUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutCompanyInput | NoteCreateOrConnectWithoutCompanyInput[]
    createMany?: NoteCreateManyCompanyInputEnvelope
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
  }

  export type ActionHistoryUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<ActionHistoryCreateWithoutCompanyInput, ActionHistoryUncheckedCreateWithoutCompanyInput> | ActionHistoryCreateWithoutCompanyInput[] | ActionHistoryUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ActionHistoryCreateOrConnectWithoutCompanyInput | ActionHistoryCreateOrConnectWithoutCompanyInput[]
    createMany?: ActionHistoryCreateManyCompanyInputEnvelope
    connect?: ActionHistoryWhereUniqueInput | ActionHistoryWhereUniqueInput[]
  }

  export type EnumCompanyStatusFieldUpdateOperationsInput = {
    set?: $Enums.CompanyStatus
  }

  export type UserUpdateOneRequiredWithoutCompaniesNestedInput = {
    create?: XOR<UserCreateWithoutCompaniesInput, UserUncheckedCreateWithoutCompaniesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCompaniesInput
    upsert?: UserUpsertWithoutCompaniesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCompaniesInput, UserUpdateWithoutCompaniesInput>, UserUncheckedUpdateWithoutCompaniesInput>
  }

  export type CategoryUpdateOneWithoutCompaniesNestedInput = {
    create?: XOR<CategoryCreateWithoutCompaniesInput, CategoryUncheckedCreateWithoutCompaniesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutCompaniesInput
    upsert?: CategoryUpsertWithoutCompaniesInput
    disconnect?: CategoryWhereInput | boolean
    delete?: CategoryWhereInput | boolean
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutCompaniesInput, CategoryUpdateWithoutCompaniesInput>, CategoryUncheckedUpdateWithoutCompaniesInput>
  }

  export type ApplicationUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<ApplicationCreateWithoutCompanyInput, ApplicationUncheckedCreateWithoutCompanyInput> | ApplicationCreateWithoutCompanyInput[] | ApplicationUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutCompanyInput | ApplicationCreateOrConnectWithoutCompanyInput[]
    upsert?: ApplicationUpsertWithWhereUniqueWithoutCompanyInput | ApplicationUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: ApplicationCreateManyCompanyInputEnvelope
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    update?: ApplicationUpdateWithWhereUniqueWithoutCompanyInput | ApplicationUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: ApplicationUpdateManyWithWhereWithoutCompanyInput | ApplicationUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
  }

  export type NoteUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<NoteCreateWithoutCompanyInput, NoteUncheckedCreateWithoutCompanyInput> | NoteCreateWithoutCompanyInput[] | NoteUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutCompanyInput | NoteCreateOrConnectWithoutCompanyInput[]
    upsert?: NoteUpsertWithWhereUniqueWithoutCompanyInput | NoteUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: NoteCreateManyCompanyInputEnvelope
    set?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    disconnect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    delete?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    update?: NoteUpdateWithWhereUniqueWithoutCompanyInput | NoteUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: NoteUpdateManyWithWhereWithoutCompanyInput | NoteUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: NoteScalarWhereInput | NoteScalarWhereInput[]
  }

  export type ActionHistoryUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<ActionHistoryCreateWithoutCompanyInput, ActionHistoryUncheckedCreateWithoutCompanyInput> | ActionHistoryCreateWithoutCompanyInput[] | ActionHistoryUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ActionHistoryCreateOrConnectWithoutCompanyInput | ActionHistoryCreateOrConnectWithoutCompanyInput[]
    upsert?: ActionHistoryUpsertWithWhereUniqueWithoutCompanyInput | ActionHistoryUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: ActionHistoryCreateManyCompanyInputEnvelope
    set?: ActionHistoryWhereUniqueInput | ActionHistoryWhereUniqueInput[]
    disconnect?: ActionHistoryWhereUniqueInput | ActionHistoryWhereUniqueInput[]
    delete?: ActionHistoryWhereUniqueInput | ActionHistoryWhereUniqueInput[]
    connect?: ActionHistoryWhereUniqueInput | ActionHistoryWhereUniqueInput[]
    update?: ActionHistoryUpdateWithWhereUniqueWithoutCompanyInput | ActionHistoryUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: ActionHistoryUpdateManyWithWhereWithoutCompanyInput | ActionHistoryUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: ActionHistoryScalarWhereInput | ActionHistoryScalarWhereInput[]
  }

  export type ApplicationUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<ApplicationCreateWithoutCompanyInput, ApplicationUncheckedCreateWithoutCompanyInput> | ApplicationCreateWithoutCompanyInput[] | ApplicationUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutCompanyInput | ApplicationCreateOrConnectWithoutCompanyInput[]
    upsert?: ApplicationUpsertWithWhereUniqueWithoutCompanyInput | ApplicationUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: ApplicationCreateManyCompanyInputEnvelope
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    update?: ApplicationUpdateWithWhereUniqueWithoutCompanyInput | ApplicationUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: ApplicationUpdateManyWithWhereWithoutCompanyInput | ApplicationUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
  }

  export type NoteUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<NoteCreateWithoutCompanyInput, NoteUncheckedCreateWithoutCompanyInput> | NoteCreateWithoutCompanyInput[] | NoteUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutCompanyInput | NoteCreateOrConnectWithoutCompanyInput[]
    upsert?: NoteUpsertWithWhereUniqueWithoutCompanyInput | NoteUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: NoteCreateManyCompanyInputEnvelope
    set?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    disconnect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    delete?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    update?: NoteUpdateWithWhereUniqueWithoutCompanyInput | NoteUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: NoteUpdateManyWithWhereWithoutCompanyInput | NoteUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: NoteScalarWhereInput | NoteScalarWhereInput[]
  }

  export type ActionHistoryUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<ActionHistoryCreateWithoutCompanyInput, ActionHistoryUncheckedCreateWithoutCompanyInput> | ActionHistoryCreateWithoutCompanyInput[] | ActionHistoryUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ActionHistoryCreateOrConnectWithoutCompanyInput | ActionHistoryCreateOrConnectWithoutCompanyInput[]
    upsert?: ActionHistoryUpsertWithWhereUniqueWithoutCompanyInput | ActionHistoryUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: ActionHistoryCreateManyCompanyInputEnvelope
    set?: ActionHistoryWhereUniqueInput | ActionHistoryWhereUniqueInput[]
    disconnect?: ActionHistoryWhereUniqueInput | ActionHistoryWhereUniqueInput[]
    delete?: ActionHistoryWhereUniqueInput | ActionHistoryWhereUniqueInput[]
    connect?: ActionHistoryWhereUniqueInput | ActionHistoryWhereUniqueInput[]
    update?: ActionHistoryUpdateWithWhereUniqueWithoutCompanyInput | ActionHistoryUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: ActionHistoryUpdateManyWithWhereWithoutCompanyInput | ActionHistoryUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: ActionHistoryScalarWhereInput | ActionHistoryScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutResumesInput = {
    create?: XOR<UserCreateWithoutResumesInput, UserUncheckedCreateWithoutResumesInput>
    connectOrCreate?: UserCreateOrConnectWithoutResumesInput
    connect?: UserWhereUniqueInput
  }

  export type ApplicationCreateNestedManyWithoutResumeInput = {
    create?: XOR<ApplicationCreateWithoutResumeInput, ApplicationUncheckedCreateWithoutResumeInput> | ApplicationCreateWithoutResumeInput[] | ApplicationUncheckedCreateWithoutResumeInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutResumeInput | ApplicationCreateOrConnectWithoutResumeInput[]
    createMany?: ApplicationCreateManyResumeInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type ApplicationUncheckedCreateNestedManyWithoutResumeInput = {
    create?: XOR<ApplicationCreateWithoutResumeInput, ApplicationUncheckedCreateWithoutResumeInput> | ApplicationCreateWithoutResumeInput[] | ApplicationUncheckedCreateWithoutResumeInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutResumeInput | ApplicationCreateOrConnectWithoutResumeInput[]
    createMany?: ApplicationCreateManyResumeInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutResumesNestedInput = {
    create?: XOR<UserCreateWithoutResumesInput, UserUncheckedCreateWithoutResumesInput>
    connectOrCreate?: UserCreateOrConnectWithoutResumesInput
    upsert?: UserUpsertWithoutResumesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutResumesInput, UserUpdateWithoutResumesInput>, UserUncheckedUpdateWithoutResumesInput>
  }

  export type ApplicationUpdateManyWithoutResumeNestedInput = {
    create?: XOR<ApplicationCreateWithoutResumeInput, ApplicationUncheckedCreateWithoutResumeInput> | ApplicationCreateWithoutResumeInput[] | ApplicationUncheckedCreateWithoutResumeInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutResumeInput | ApplicationCreateOrConnectWithoutResumeInput[]
    upsert?: ApplicationUpsertWithWhereUniqueWithoutResumeInput | ApplicationUpsertWithWhereUniqueWithoutResumeInput[]
    createMany?: ApplicationCreateManyResumeInputEnvelope
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    update?: ApplicationUpdateWithWhereUniqueWithoutResumeInput | ApplicationUpdateWithWhereUniqueWithoutResumeInput[]
    updateMany?: ApplicationUpdateManyWithWhereWithoutResumeInput | ApplicationUpdateManyWithWhereWithoutResumeInput[]
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
  }

  export type ApplicationUncheckedUpdateManyWithoutResumeNestedInput = {
    create?: XOR<ApplicationCreateWithoutResumeInput, ApplicationUncheckedCreateWithoutResumeInput> | ApplicationCreateWithoutResumeInput[] | ApplicationUncheckedCreateWithoutResumeInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutResumeInput | ApplicationCreateOrConnectWithoutResumeInput[]
    upsert?: ApplicationUpsertWithWhereUniqueWithoutResumeInput | ApplicationUpsertWithWhereUniqueWithoutResumeInput[]
    createMany?: ApplicationCreateManyResumeInputEnvelope
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    update?: ApplicationUpdateWithWhereUniqueWithoutResumeInput | ApplicationUpdateWithWhereUniqueWithoutResumeInput[]
    updateMany?: ApplicationUpdateManyWithWhereWithoutResumeInput | ApplicationUpdateManyWithWhereWithoutResumeInput[]
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
  }

  export type CompanyCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<CompanyCreateWithoutApplicationsInput, CompanyUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutApplicationsInput
    connect?: CompanyWhereUniqueInput
  }

  export type ResumeCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<ResumeCreateWithoutApplicationsInput, ResumeUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: ResumeCreateOrConnectWithoutApplicationsInput
    connect?: ResumeWhereUniqueInput
  }

  export type CompanyUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<CompanyCreateWithoutApplicationsInput, CompanyUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutApplicationsInput
    upsert?: CompanyUpsertWithoutApplicationsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutApplicationsInput, CompanyUpdateWithoutApplicationsInput>, CompanyUncheckedUpdateWithoutApplicationsInput>
  }

  export type ResumeUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<ResumeCreateWithoutApplicationsInput, ResumeUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: ResumeCreateOrConnectWithoutApplicationsInput
    upsert?: ResumeUpsertWithoutApplicationsInput
    connect?: ResumeWhereUniqueInput
    update?: XOR<XOR<ResumeUpdateToOneWithWhereWithoutApplicationsInput, ResumeUpdateWithoutApplicationsInput>, ResumeUncheckedUpdateWithoutApplicationsInput>
  }

  export type CompanyCreateNestedOneWithoutNotesInput = {
    create?: XOR<CompanyCreateWithoutNotesInput, CompanyUncheckedCreateWithoutNotesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutNotesInput
    connect?: CompanyWhereUniqueInput
  }

  export type CompanyUpdateOneRequiredWithoutNotesNestedInput = {
    create?: XOR<CompanyCreateWithoutNotesInput, CompanyUncheckedCreateWithoutNotesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutNotesInput
    upsert?: CompanyUpsertWithoutNotesInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutNotesInput, CompanyUpdateWithoutNotesInput>, CompanyUncheckedUpdateWithoutNotesInput>
  }

  export type CompanyCreateNestedOneWithoutActionHistoryInput = {
    create?: XOR<CompanyCreateWithoutActionHistoryInput, CompanyUncheckedCreateWithoutActionHistoryInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutActionHistoryInput
    connect?: CompanyWhereUniqueInput
  }

  export type CompanyUpdateOneRequiredWithoutActionHistoryNestedInput = {
    create?: XOR<CompanyCreateWithoutActionHistoryInput, CompanyUncheckedCreateWithoutActionHistoryInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutActionHistoryInput
    upsert?: CompanyUpsertWithoutActionHistoryInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutActionHistoryInput, CompanyUpdateWithoutActionHistoryInput>, CompanyUncheckedUpdateWithoutActionHistoryInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumCandidateCvAnalysisStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CandidateCvAnalysisStatus | EnumCandidateCvAnalysisStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CandidateCvAnalysisStatus[] | ListEnumCandidateCvAnalysisStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CandidateCvAnalysisStatus[] | ListEnumCandidateCvAnalysisStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCandidateCvAnalysisStatusFilter<$PrismaModel> | $Enums.CandidateCvAnalysisStatus
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumCandidateCvAnalysisStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CandidateCvAnalysisStatus | EnumCandidateCvAnalysisStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CandidateCvAnalysisStatus[] | ListEnumCandidateCvAnalysisStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CandidateCvAnalysisStatus[] | ListEnumCandidateCvAnalysisStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCandidateCvAnalysisStatusWithAggregatesFilter<$PrismaModel> | $Enums.CandidateCvAnalysisStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCandidateCvAnalysisStatusFilter<$PrismaModel>
    _max?: NestedEnumCandidateCvAnalysisStatusFilter<$PrismaModel>
  }

  export type NestedEnumCvSkillCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.CvSkillCategory | EnumCvSkillCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.CvSkillCategory[] | ListEnumCvSkillCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.CvSkillCategory[] | ListEnumCvSkillCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumCvSkillCategoryFilter<$PrismaModel> | $Enums.CvSkillCategory
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumCvSkillCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CvSkillCategory | EnumCvSkillCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.CvSkillCategory[] | ListEnumCvSkillCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.CvSkillCategory[] | ListEnumCvSkillCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumCvSkillCategoryWithAggregatesFilter<$PrismaModel> | $Enums.CvSkillCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCvSkillCategoryFilter<$PrismaModel>
    _max?: NestedEnumCvSkillCategoryFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumCompanyStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CompanyStatus | EnumCompanyStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CompanyStatus[] | ListEnumCompanyStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CompanyStatus[] | ListEnumCompanyStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCompanyStatusFilter<$PrismaModel> | $Enums.CompanyStatus
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumCompanyStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CompanyStatus | EnumCompanyStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CompanyStatus[] | ListEnumCompanyStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CompanyStatus[] | ListEnumCompanyStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCompanyStatusWithAggregatesFilter<$PrismaModel> | $Enums.CompanyStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCompanyStatusFilter<$PrismaModel>
    _max?: NestedEnumCompanyStatusFilter<$PrismaModel>
  }

  export type CategoryCreateWithoutUserInput = {
    id?: string
    name: string
    color: string
    position?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    companies?: CompanyCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    color: string
    position?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    companies?: CompanyUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutUserInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutUserInput, CategoryUncheckedCreateWithoutUserInput>
  }

  export type CategoryCreateManyUserInputEnvelope = {
    data: CategoryCreateManyUserInput | CategoryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CompanyCreateWithoutUserInput = {
    id?: string
    name: string
    website?: string | null
    sector?: string | null
    city?: string | null
    country?: string | null
    email?: string | null
    phone?: string | null
    recruiterName?: string | null
    aiSummary?: string | null
    status?: $Enums.CompanyStatus
    isFavorite?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    category?: CategoryCreateNestedOneWithoutCompaniesInput
    applications?: ApplicationCreateNestedManyWithoutCompanyInput
    notes?: NoteCreateNestedManyWithoutCompanyInput
    actionHistory?: ActionHistoryCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutUserInput = {
    id?: string
    categoryId?: string | null
    name: string
    website?: string | null
    sector?: string | null
    city?: string | null
    country?: string | null
    email?: string | null
    phone?: string | null
    recruiterName?: string | null
    aiSummary?: string | null
    status?: $Enums.CompanyStatus
    isFavorite?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    applications?: ApplicationUncheckedCreateNestedManyWithoutCompanyInput
    notes?: NoteUncheckedCreateNestedManyWithoutCompanyInput
    actionHistory?: ActionHistoryUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutUserInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutUserInput, CompanyUncheckedCreateWithoutUserInput>
  }

  export type CompanyCreateManyUserInputEnvelope = {
    data: CompanyCreateManyUserInput | CompanyCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ResumeCreateWithoutUserInput = {
    id?: string
    name: string
    fileUrl: string
    fileType: string
    fileSize: number
    createdAt?: Date | string
    uploadedAt?: Date | string
    applications?: ApplicationCreateNestedManyWithoutResumeInput
  }

  export type ResumeUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    fileUrl: string
    fileType: string
    fileSize: number
    createdAt?: Date | string
    uploadedAt?: Date | string
    applications?: ApplicationUncheckedCreateNestedManyWithoutResumeInput
  }

  export type ResumeCreateOrConnectWithoutUserInput = {
    where: ResumeWhereUniqueInput
    create: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput>
  }

  export type ResumeCreateManyUserInputEnvelope = {
    data: ResumeCreateManyUserInput | ResumeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CandidateProfileCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cvs?: CandidateCvCreateNestedManyWithoutCandidateProfileInput
  }

  export type CandidateProfileUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cvs?: CandidateCvUncheckedCreateNestedManyWithoutCandidateProfileInput
  }

  export type CandidateProfileCreateOrConnectWithoutUserInput = {
    where: CandidateProfileWhereUniqueInput
    create: XOR<CandidateProfileCreateWithoutUserInput, CandidateProfileUncheckedCreateWithoutUserInput>
  }

  export type CategoryUpsertWithWhereUniqueWithoutUserInput = {
    where: CategoryWhereUniqueInput
    update: XOR<CategoryUpdateWithoutUserInput, CategoryUncheckedUpdateWithoutUserInput>
    create: XOR<CategoryCreateWithoutUserInput, CategoryUncheckedCreateWithoutUserInput>
  }

  export type CategoryUpdateWithWhereUniqueWithoutUserInput = {
    where: CategoryWhereUniqueInput
    data: XOR<CategoryUpdateWithoutUserInput, CategoryUncheckedUpdateWithoutUserInput>
  }

  export type CategoryUpdateManyWithWhereWithoutUserInput = {
    where: CategoryScalarWhereInput
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyWithoutUserInput>
  }

  export type CategoryScalarWhereInput = {
    AND?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    OR?: CategoryScalarWhereInput[]
    NOT?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    id?: UuidFilter<"Category"> | string
    userId?: UuidFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    color?: StringFilter<"Category"> | string
    position?: IntFilter<"Category"> | number
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
  }

  export type CompanyUpsertWithWhereUniqueWithoutUserInput = {
    where: CompanyWhereUniqueInput
    update: XOR<CompanyUpdateWithoutUserInput, CompanyUncheckedUpdateWithoutUserInput>
    create: XOR<CompanyCreateWithoutUserInput, CompanyUncheckedCreateWithoutUserInput>
  }

  export type CompanyUpdateWithWhereUniqueWithoutUserInput = {
    where: CompanyWhereUniqueInput
    data: XOR<CompanyUpdateWithoutUserInput, CompanyUncheckedUpdateWithoutUserInput>
  }

  export type CompanyUpdateManyWithWhereWithoutUserInput = {
    where: CompanyScalarWhereInput
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyWithoutUserInput>
  }

  export type CompanyScalarWhereInput = {
    AND?: CompanyScalarWhereInput | CompanyScalarWhereInput[]
    OR?: CompanyScalarWhereInput[]
    NOT?: CompanyScalarWhereInput | CompanyScalarWhereInput[]
    id?: UuidFilter<"Company"> | string
    userId?: UuidFilter<"Company"> | string
    categoryId?: UuidNullableFilter<"Company"> | string | null
    name?: StringFilter<"Company"> | string
    website?: StringNullableFilter<"Company"> | string | null
    sector?: StringNullableFilter<"Company"> | string | null
    city?: StringNullableFilter<"Company"> | string | null
    country?: StringNullableFilter<"Company"> | string | null
    email?: StringNullableFilter<"Company"> | string | null
    phone?: StringNullableFilter<"Company"> | string | null
    recruiterName?: StringNullableFilter<"Company"> | string | null
    aiSummary?: StringNullableFilter<"Company"> | string | null
    status?: EnumCompanyStatusFilter<"Company"> | $Enums.CompanyStatus
    isFavorite?: BoolFilter<"Company"> | boolean
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
  }

  export type ResumeUpsertWithWhereUniqueWithoutUserInput = {
    where: ResumeWhereUniqueInput
    update: XOR<ResumeUpdateWithoutUserInput, ResumeUncheckedUpdateWithoutUserInput>
    create: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput>
  }

  export type ResumeUpdateWithWhereUniqueWithoutUserInput = {
    where: ResumeWhereUniqueInput
    data: XOR<ResumeUpdateWithoutUserInput, ResumeUncheckedUpdateWithoutUserInput>
  }

  export type ResumeUpdateManyWithWhereWithoutUserInput = {
    where: ResumeScalarWhereInput
    data: XOR<ResumeUpdateManyMutationInput, ResumeUncheckedUpdateManyWithoutUserInput>
  }

  export type ResumeScalarWhereInput = {
    AND?: ResumeScalarWhereInput | ResumeScalarWhereInput[]
    OR?: ResumeScalarWhereInput[]
    NOT?: ResumeScalarWhereInput | ResumeScalarWhereInput[]
    id?: UuidFilter<"Resume"> | string
    userId?: UuidFilter<"Resume"> | string
    name?: StringFilter<"Resume"> | string
    fileUrl?: StringFilter<"Resume"> | string
    fileType?: StringFilter<"Resume"> | string
    fileSize?: IntFilter<"Resume"> | number
    createdAt?: DateTimeFilter<"Resume"> | Date | string
    uploadedAt?: DateTimeFilter<"Resume"> | Date | string
  }

  export type CandidateProfileUpsertWithoutUserInput = {
    update: XOR<CandidateProfileUpdateWithoutUserInput, CandidateProfileUncheckedUpdateWithoutUserInput>
    create: XOR<CandidateProfileCreateWithoutUserInput, CandidateProfileUncheckedCreateWithoutUserInput>
    where?: CandidateProfileWhereInput
  }

  export type CandidateProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: CandidateProfileWhereInput
    data: XOR<CandidateProfileUpdateWithoutUserInput, CandidateProfileUncheckedUpdateWithoutUserInput>
  }

  export type CandidateProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cvs?: CandidateCvUpdateManyWithoutCandidateProfileNestedInput
  }

  export type CandidateProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cvs?: CandidateCvUncheckedUpdateManyWithoutCandidateProfileNestedInput
  }

  export type UserCreateWithoutCandidateProfileInput = {
    id?: string
    firstname: string
    lastname: string
    email: string
    passwordHash: string
    passwordResetToken?: string | null
    passwordResetExpiresAt?: Date | string | null
    emailVerifiedAt?: Date | string | null
    emailVerificationCode?: string | null
    emailVerificationExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: CategoryCreateNestedManyWithoutUserInput
    companies?: CompanyCreateNestedManyWithoutUserInput
    resumes?: ResumeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCandidateProfileInput = {
    id?: string
    firstname: string
    lastname: string
    email: string
    passwordHash: string
    passwordResetToken?: string | null
    passwordResetExpiresAt?: Date | string | null
    emailVerifiedAt?: Date | string | null
    emailVerificationCode?: string | null
    emailVerificationExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: CategoryUncheckedCreateNestedManyWithoutUserInput
    companies?: CompanyUncheckedCreateNestedManyWithoutUserInput
    resumes?: ResumeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCandidateProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCandidateProfileInput, UserUncheckedCreateWithoutCandidateProfileInput>
  }

  export type CandidateCvCreateWithoutCandidateProfileInput = {
    id?: string
    label: string
    originalFilename: string
    storageFilename: string
    storageKey: string
    fileHash?: string | null
    mimeType: string
    fileSize: number
    isDefault?: boolean
    analysisStatus?: $Enums.CandidateCvAnalysisStatus
    extractedText?: string | null
    lastAnalyzedAt?: Date | string | null
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    cvExperiences?: CvExperienceCreateNestedManyWithoutCandidateCvInput
    cvSkills?: CvSkillCreateNestedManyWithoutCandidateCvInput
    cvTrainings?: CvTrainingCreateNestedManyWithoutCandidateCvInput
  }

  export type CandidateCvUncheckedCreateWithoutCandidateProfileInput = {
    id?: string
    label: string
    originalFilename: string
    storageFilename: string
    storageKey: string
    fileHash?: string | null
    mimeType: string
    fileSize: number
    isDefault?: boolean
    analysisStatus?: $Enums.CandidateCvAnalysisStatus
    extractedText?: string | null
    lastAnalyzedAt?: Date | string | null
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    cvExperiences?: CvExperienceUncheckedCreateNestedManyWithoutCandidateCvInput
    cvSkills?: CvSkillUncheckedCreateNestedManyWithoutCandidateCvInput
    cvTrainings?: CvTrainingUncheckedCreateNestedManyWithoutCandidateCvInput
  }

  export type CandidateCvCreateOrConnectWithoutCandidateProfileInput = {
    where: CandidateCvWhereUniqueInput
    create: XOR<CandidateCvCreateWithoutCandidateProfileInput, CandidateCvUncheckedCreateWithoutCandidateProfileInput>
  }

  export type CandidateCvCreateManyCandidateProfileInputEnvelope = {
    data: CandidateCvCreateManyCandidateProfileInput | CandidateCvCreateManyCandidateProfileInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCandidateProfileInput = {
    update: XOR<UserUpdateWithoutCandidateProfileInput, UserUncheckedUpdateWithoutCandidateProfileInput>
    create: XOR<UserCreateWithoutCandidateProfileInput, UserUncheckedCreateWithoutCandidateProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCandidateProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCandidateProfileInput, UserUncheckedUpdateWithoutCandidateProfileInput>
  }

  export type UserUpdateWithoutCandidateProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerificationExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: CategoryUpdateManyWithoutUserNestedInput
    companies?: CompanyUpdateManyWithoutUserNestedInput
    resumes?: ResumeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCandidateProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerificationExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: CategoryUncheckedUpdateManyWithoutUserNestedInput
    companies?: CompanyUncheckedUpdateManyWithoutUserNestedInput
    resumes?: ResumeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CandidateCvUpsertWithWhereUniqueWithoutCandidateProfileInput = {
    where: CandidateCvWhereUniqueInput
    update: XOR<CandidateCvUpdateWithoutCandidateProfileInput, CandidateCvUncheckedUpdateWithoutCandidateProfileInput>
    create: XOR<CandidateCvCreateWithoutCandidateProfileInput, CandidateCvUncheckedCreateWithoutCandidateProfileInput>
  }

  export type CandidateCvUpdateWithWhereUniqueWithoutCandidateProfileInput = {
    where: CandidateCvWhereUniqueInput
    data: XOR<CandidateCvUpdateWithoutCandidateProfileInput, CandidateCvUncheckedUpdateWithoutCandidateProfileInput>
  }

  export type CandidateCvUpdateManyWithWhereWithoutCandidateProfileInput = {
    where: CandidateCvScalarWhereInput
    data: XOR<CandidateCvUpdateManyMutationInput, CandidateCvUncheckedUpdateManyWithoutCandidateProfileInput>
  }

  export type CandidateCvScalarWhereInput = {
    AND?: CandidateCvScalarWhereInput | CandidateCvScalarWhereInput[]
    OR?: CandidateCvScalarWhereInput[]
    NOT?: CandidateCvScalarWhereInput | CandidateCvScalarWhereInput[]
    id?: UuidFilter<"CandidateCv"> | string
    candidateProfileId?: UuidFilter<"CandidateCv"> | string
    label?: StringFilter<"CandidateCv"> | string
    originalFilename?: StringFilter<"CandidateCv"> | string
    storageFilename?: StringFilter<"CandidateCv"> | string
    storageKey?: StringFilter<"CandidateCv"> | string
    fileHash?: StringNullableFilter<"CandidateCv"> | string | null
    mimeType?: StringFilter<"CandidateCv"> | string
    fileSize?: IntFilter<"CandidateCv"> | number
    isDefault?: BoolFilter<"CandidateCv"> | boolean
    analysisStatus?: EnumCandidateCvAnalysisStatusFilter<"CandidateCv"> | $Enums.CandidateCvAnalysisStatus
    extractedText?: StringNullableFilter<"CandidateCv"> | string | null
    lastAnalyzedAt?: DateTimeNullableFilter<"CandidateCv"> | Date | string | null
    uploadedAt?: DateTimeFilter<"CandidateCv"> | Date | string
    createdAt?: DateTimeFilter<"CandidateCv"> | Date | string
    updatedAt?: DateTimeFilter<"CandidateCv"> | Date | string
  }

  export type CandidateProfileCreateWithoutCvsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCandidateProfileInput
  }

  export type CandidateProfileUncheckedCreateWithoutCvsInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CandidateProfileCreateOrConnectWithoutCvsInput = {
    where: CandidateProfileWhereUniqueInput
    create: XOR<CandidateProfileCreateWithoutCvsInput, CandidateProfileUncheckedCreateWithoutCvsInput>
  }

  export type CvExperienceCreateWithoutCandidateCvInput = {
    id?: string
    jobTitle: string
    companyName?: string | null
    startDate?: string | null
    endDate?: string | null
    isCurrent?: boolean
    location?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CvExperienceUncheckedCreateWithoutCandidateCvInput = {
    id?: string
    jobTitle: string
    companyName?: string | null
    startDate?: string | null
    endDate?: string | null
    isCurrent?: boolean
    location?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CvExperienceCreateOrConnectWithoutCandidateCvInput = {
    where: CvExperienceWhereUniqueInput
    create: XOR<CvExperienceCreateWithoutCandidateCvInput, CvExperienceUncheckedCreateWithoutCandidateCvInput>
  }

  export type CvExperienceCreateManyCandidateCvInputEnvelope = {
    data: CvExperienceCreateManyCandidateCvInput | CvExperienceCreateManyCandidateCvInput[]
    skipDuplicates?: boolean
  }

  export type CvSkillCreateWithoutCandidateCvInput = {
    id?: string
    name: string
    category: $Enums.CvSkillCategory
    confidence?: number | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CvSkillUncheckedCreateWithoutCandidateCvInput = {
    id?: string
    name: string
    category: $Enums.CvSkillCategory
    confidence?: number | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CvSkillCreateOrConnectWithoutCandidateCvInput = {
    where: CvSkillWhereUniqueInput
    create: XOR<CvSkillCreateWithoutCandidateCvInput, CvSkillUncheckedCreateWithoutCandidateCvInput>
  }

  export type CvSkillCreateManyCandidateCvInputEnvelope = {
    data: CvSkillCreateManyCandidateCvInput | CvSkillCreateManyCandidateCvInput[]
    skipDuplicates?: boolean
  }

  export type CvTrainingCreateWithoutCandidateCvInput = {
    id?: string
    title: string
    organizationName?: string | null
    degree?: string | null
    fieldOfStudy?: string | null
    startDate?: string | null
    endDate?: string | null
    description?: string | null
    location?: string | null
    isCertification?: boolean
    certificationType?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CvTrainingUncheckedCreateWithoutCandidateCvInput = {
    id?: string
    title: string
    organizationName?: string | null
    degree?: string | null
    fieldOfStudy?: string | null
    startDate?: string | null
    endDate?: string | null
    description?: string | null
    location?: string | null
    isCertification?: boolean
    certificationType?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CvTrainingCreateOrConnectWithoutCandidateCvInput = {
    where: CvTrainingWhereUniqueInput
    create: XOR<CvTrainingCreateWithoutCandidateCvInput, CvTrainingUncheckedCreateWithoutCandidateCvInput>
  }

  export type CvTrainingCreateManyCandidateCvInputEnvelope = {
    data: CvTrainingCreateManyCandidateCvInput | CvTrainingCreateManyCandidateCvInput[]
    skipDuplicates?: boolean
  }

  export type CandidateProfileUpsertWithoutCvsInput = {
    update: XOR<CandidateProfileUpdateWithoutCvsInput, CandidateProfileUncheckedUpdateWithoutCvsInput>
    create: XOR<CandidateProfileCreateWithoutCvsInput, CandidateProfileUncheckedCreateWithoutCvsInput>
    where?: CandidateProfileWhereInput
  }

  export type CandidateProfileUpdateToOneWithWhereWithoutCvsInput = {
    where?: CandidateProfileWhereInput
    data: XOR<CandidateProfileUpdateWithoutCvsInput, CandidateProfileUncheckedUpdateWithoutCvsInput>
  }

  export type CandidateProfileUpdateWithoutCvsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCandidateProfileNestedInput
  }

  export type CandidateProfileUncheckedUpdateWithoutCvsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CvExperienceUpsertWithWhereUniqueWithoutCandidateCvInput = {
    where: CvExperienceWhereUniqueInput
    update: XOR<CvExperienceUpdateWithoutCandidateCvInput, CvExperienceUncheckedUpdateWithoutCandidateCvInput>
    create: XOR<CvExperienceCreateWithoutCandidateCvInput, CvExperienceUncheckedCreateWithoutCandidateCvInput>
  }

  export type CvExperienceUpdateWithWhereUniqueWithoutCandidateCvInput = {
    where: CvExperienceWhereUniqueInput
    data: XOR<CvExperienceUpdateWithoutCandidateCvInput, CvExperienceUncheckedUpdateWithoutCandidateCvInput>
  }

  export type CvExperienceUpdateManyWithWhereWithoutCandidateCvInput = {
    where: CvExperienceScalarWhereInput
    data: XOR<CvExperienceUpdateManyMutationInput, CvExperienceUncheckedUpdateManyWithoutCandidateCvInput>
  }

  export type CvExperienceScalarWhereInput = {
    AND?: CvExperienceScalarWhereInput | CvExperienceScalarWhereInput[]
    OR?: CvExperienceScalarWhereInput[]
    NOT?: CvExperienceScalarWhereInput | CvExperienceScalarWhereInput[]
    id?: UuidFilter<"CvExperience"> | string
    candidateCvId?: UuidFilter<"CvExperience"> | string
    jobTitle?: StringFilter<"CvExperience"> | string
    companyName?: StringNullableFilter<"CvExperience"> | string | null
    startDate?: StringNullableFilter<"CvExperience"> | string | null
    endDate?: StringNullableFilter<"CvExperience"> | string | null
    isCurrent?: BoolFilter<"CvExperience"> | boolean
    location?: StringNullableFilter<"CvExperience"> | string | null
    description?: StringNullableFilter<"CvExperience"> | string | null
    createdAt?: DateTimeFilter<"CvExperience"> | Date | string
    updatedAt?: DateTimeFilter<"CvExperience"> | Date | string
  }

  export type CvSkillUpsertWithWhereUniqueWithoutCandidateCvInput = {
    where: CvSkillWhereUniqueInput
    update: XOR<CvSkillUpdateWithoutCandidateCvInput, CvSkillUncheckedUpdateWithoutCandidateCvInput>
    create: XOR<CvSkillCreateWithoutCandidateCvInput, CvSkillUncheckedCreateWithoutCandidateCvInput>
  }

  export type CvSkillUpdateWithWhereUniqueWithoutCandidateCvInput = {
    where: CvSkillWhereUniqueInput
    data: XOR<CvSkillUpdateWithoutCandidateCvInput, CvSkillUncheckedUpdateWithoutCandidateCvInput>
  }

  export type CvSkillUpdateManyWithWhereWithoutCandidateCvInput = {
    where: CvSkillScalarWhereInput
    data: XOR<CvSkillUpdateManyMutationInput, CvSkillUncheckedUpdateManyWithoutCandidateCvInput>
  }

  export type CvSkillScalarWhereInput = {
    AND?: CvSkillScalarWhereInput | CvSkillScalarWhereInput[]
    OR?: CvSkillScalarWhereInput[]
    NOT?: CvSkillScalarWhereInput | CvSkillScalarWhereInput[]
    id?: UuidFilter<"CvSkill"> | string
    candidateCvId?: UuidFilter<"CvSkill"> | string
    name?: StringFilter<"CvSkill"> | string
    category?: EnumCvSkillCategoryFilter<"CvSkill"> | $Enums.CvSkillCategory
    confidence?: FloatNullableFilter<"CvSkill"> | number | null
    source?: StringNullableFilter<"CvSkill"> | string | null
    createdAt?: DateTimeFilter<"CvSkill"> | Date | string
    updatedAt?: DateTimeFilter<"CvSkill"> | Date | string
  }

  export type CvTrainingUpsertWithWhereUniqueWithoutCandidateCvInput = {
    where: CvTrainingWhereUniqueInput
    update: XOR<CvTrainingUpdateWithoutCandidateCvInput, CvTrainingUncheckedUpdateWithoutCandidateCvInput>
    create: XOR<CvTrainingCreateWithoutCandidateCvInput, CvTrainingUncheckedCreateWithoutCandidateCvInput>
  }

  export type CvTrainingUpdateWithWhereUniqueWithoutCandidateCvInput = {
    where: CvTrainingWhereUniqueInput
    data: XOR<CvTrainingUpdateWithoutCandidateCvInput, CvTrainingUncheckedUpdateWithoutCandidateCvInput>
  }

  export type CvTrainingUpdateManyWithWhereWithoutCandidateCvInput = {
    where: CvTrainingScalarWhereInput
    data: XOR<CvTrainingUpdateManyMutationInput, CvTrainingUncheckedUpdateManyWithoutCandidateCvInput>
  }

  export type CvTrainingScalarWhereInput = {
    AND?: CvTrainingScalarWhereInput | CvTrainingScalarWhereInput[]
    OR?: CvTrainingScalarWhereInput[]
    NOT?: CvTrainingScalarWhereInput | CvTrainingScalarWhereInput[]
    id?: UuidFilter<"CvTraining"> | string
    candidateCvId?: UuidFilter<"CvTraining"> | string
    title?: StringFilter<"CvTraining"> | string
    organizationName?: StringNullableFilter<"CvTraining"> | string | null
    degree?: StringNullableFilter<"CvTraining"> | string | null
    fieldOfStudy?: StringNullableFilter<"CvTraining"> | string | null
    startDate?: StringNullableFilter<"CvTraining"> | string | null
    endDate?: StringNullableFilter<"CvTraining"> | string | null
    description?: StringNullableFilter<"CvTraining"> | string | null
    location?: StringNullableFilter<"CvTraining"> | string | null
    isCertification?: BoolFilter<"CvTraining"> | boolean
    certificationType?: StringNullableFilter<"CvTraining"> | string | null
    createdAt?: DateTimeFilter<"CvTraining"> | Date | string
    updatedAt?: DateTimeFilter<"CvTraining"> | Date | string
  }

  export type CandidateCvCreateWithoutCvExperiencesInput = {
    id?: string
    label: string
    originalFilename: string
    storageFilename: string
    storageKey: string
    fileHash?: string | null
    mimeType: string
    fileSize: number
    isDefault?: boolean
    analysisStatus?: $Enums.CandidateCvAnalysisStatus
    extractedText?: string | null
    lastAnalyzedAt?: Date | string | null
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    candidateProfile: CandidateProfileCreateNestedOneWithoutCvsInput
    cvSkills?: CvSkillCreateNestedManyWithoutCandidateCvInput
    cvTrainings?: CvTrainingCreateNestedManyWithoutCandidateCvInput
  }

  export type CandidateCvUncheckedCreateWithoutCvExperiencesInput = {
    id?: string
    candidateProfileId: string
    label: string
    originalFilename: string
    storageFilename: string
    storageKey: string
    fileHash?: string | null
    mimeType: string
    fileSize: number
    isDefault?: boolean
    analysisStatus?: $Enums.CandidateCvAnalysisStatus
    extractedText?: string | null
    lastAnalyzedAt?: Date | string | null
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    cvSkills?: CvSkillUncheckedCreateNestedManyWithoutCandidateCvInput
    cvTrainings?: CvTrainingUncheckedCreateNestedManyWithoutCandidateCvInput
  }

  export type CandidateCvCreateOrConnectWithoutCvExperiencesInput = {
    where: CandidateCvWhereUniqueInput
    create: XOR<CandidateCvCreateWithoutCvExperiencesInput, CandidateCvUncheckedCreateWithoutCvExperiencesInput>
  }

  export type CandidateCvUpsertWithoutCvExperiencesInput = {
    update: XOR<CandidateCvUpdateWithoutCvExperiencesInput, CandidateCvUncheckedUpdateWithoutCvExperiencesInput>
    create: XOR<CandidateCvCreateWithoutCvExperiencesInput, CandidateCvUncheckedCreateWithoutCvExperiencesInput>
    where?: CandidateCvWhereInput
  }

  export type CandidateCvUpdateToOneWithWhereWithoutCvExperiencesInput = {
    where?: CandidateCvWhereInput
    data: XOR<CandidateCvUpdateWithoutCvExperiencesInput, CandidateCvUncheckedUpdateWithoutCvExperiencesInput>
  }

  export type CandidateCvUpdateWithoutCvExperiencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    storageFilename?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    fileHash?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    analysisStatus?: EnumCandidateCvAnalysisStatusFieldUpdateOperationsInput | $Enums.CandidateCvAnalysisStatus
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    lastAnalyzedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidateProfile?: CandidateProfileUpdateOneRequiredWithoutCvsNestedInput
    cvSkills?: CvSkillUpdateManyWithoutCandidateCvNestedInput
    cvTrainings?: CvTrainingUpdateManyWithoutCandidateCvNestedInput
  }

  export type CandidateCvUncheckedUpdateWithoutCvExperiencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateProfileId?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    storageFilename?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    fileHash?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    analysisStatus?: EnumCandidateCvAnalysisStatusFieldUpdateOperationsInput | $Enums.CandidateCvAnalysisStatus
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    lastAnalyzedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cvSkills?: CvSkillUncheckedUpdateManyWithoutCandidateCvNestedInput
    cvTrainings?: CvTrainingUncheckedUpdateManyWithoutCandidateCvNestedInput
  }

  export type CandidateCvCreateWithoutCvSkillsInput = {
    id?: string
    label: string
    originalFilename: string
    storageFilename: string
    storageKey: string
    fileHash?: string | null
    mimeType: string
    fileSize: number
    isDefault?: boolean
    analysisStatus?: $Enums.CandidateCvAnalysisStatus
    extractedText?: string | null
    lastAnalyzedAt?: Date | string | null
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    candidateProfile: CandidateProfileCreateNestedOneWithoutCvsInput
    cvExperiences?: CvExperienceCreateNestedManyWithoutCandidateCvInput
    cvTrainings?: CvTrainingCreateNestedManyWithoutCandidateCvInput
  }

  export type CandidateCvUncheckedCreateWithoutCvSkillsInput = {
    id?: string
    candidateProfileId: string
    label: string
    originalFilename: string
    storageFilename: string
    storageKey: string
    fileHash?: string | null
    mimeType: string
    fileSize: number
    isDefault?: boolean
    analysisStatus?: $Enums.CandidateCvAnalysisStatus
    extractedText?: string | null
    lastAnalyzedAt?: Date | string | null
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    cvExperiences?: CvExperienceUncheckedCreateNestedManyWithoutCandidateCvInput
    cvTrainings?: CvTrainingUncheckedCreateNestedManyWithoutCandidateCvInput
  }

  export type CandidateCvCreateOrConnectWithoutCvSkillsInput = {
    where: CandidateCvWhereUniqueInput
    create: XOR<CandidateCvCreateWithoutCvSkillsInput, CandidateCvUncheckedCreateWithoutCvSkillsInput>
  }

  export type CandidateCvUpsertWithoutCvSkillsInput = {
    update: XOR<CandidateCvUpdateWithoutCvSkillsInput, CandidateCvUncheckedUpdateWithoutCvSkillsInput>
    create: XOR<CandidateCvCreateWithoutCvSkillsInput, CandidateCvUncheckedCreateWithoutCvSkillsInput>
    where?: CandidateCvWhereInput
  }

  export type CandidateCvUpdateToOneWithWhereWithoutCvSkillsInput = {
    where?: CandidateCvWhereInput
    data: XOR<CandidateCvUpdateWithoutCvSkillsInput, CandidateCvUncheckedUpdateWithoutCvSkillsInput>
  }

  export type CandidateCvUpdateWithoutCvSkillsInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    storageFilename?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    fileHash?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    analysisStatus?: EnumCandidateCvAnalysisStatusFieldUpdateOperationsInput | $Enums.CandidateCvAnalysisStatus
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    lastAnalyzedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidateProfile?: CandidateProfileUpdateOneRequiredWithoutCvsNestedInput
    cvExperiences?: CvExperienceUpdateManyWithoutCandidateCvNestedInput
    cvTrainings?: CvTrainingUpdateManyWithoutCandidateCvNestedInput
  }

  export type CandidateCvUncheckedUpdateWithoutCvSkillsInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateProfileId?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    storageFilename?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    fileHash?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    analysisStatus?: EnumCandidateCvAnalysisStatusFieldUpdateOperationsInput | $Enums.CandidateCvAnalysisStatus
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    lastAnalyzedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cvExperiences?: CvExperienceUncheckedUpdateManyWithoutCandidateCvNestedInput
    cvTrainings?: CvTrainingUncheckedUpdateManyWithoutCandidateCvNestedInput
  }

  export type CandidateCvCreateWithoutCvTrainingsInput = {
    id?: string
    label: string
    originalFilename: string
    storageFilename: string
    storageKey: string
    fileHash?: string | null
    mimeType: string
    fileSize: number
    isDefault?: boolean
    analysisStatus?: $Enums.CandidateCvAnalysisStatus
    extractedText?: string | null
    lastAnalyzedAt?: Date | string | null
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    candidateProfile: CandidateProfileCreateNestedOneWithoutCvsInput
    cvExperiences?: CvExperienceCreateNestedManyWithoutCandidateCvInput
    cvSkills?: CvSkillCreateNestedManyWithoutCandidateCvInput
  }

  export type CandidateCvUncheckedCreateWithoutCvTrainingsInput = {
    id?: string
    candidateProfileId: string
    label: string
    originalFilename: string
    storageFilename: string
    storageKey: string
    fileHash?: string | null
    mimeType: string
    fileSize: number
    isDefault?: boolean
    analysisStatus?: $Enums.CandidateCvAnalysisStatus
    extractedText?: string | null
    lastAnalyzedAt?: Date | string | null
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    cvExperiences?: CvExperienceUncheckedCreateNestedManyWithoutCandidateCvInput
    cvSkills?: CvSkillUncheckedCreateNestedManyWithoutCandidateCvInput
  }

  export type CandidateCvCreateOrConnectWithoutCvTrainingsInput = {
    where: CandidateCvWhereUniqueInput
    create: XOR<CandidateCvCreateWithoutCvTrainingsInput, CandidateCvUncheckedCreateWithoutCvTrainingsInput>
  }

  export type CandidateCvUpsertWithoutCvTrainingsInput = {
    update: XOR<CandidateCvUpdateWithoutCvTrainingsInput, CandidateCvUncheckedUpdateWithoutCvTrainingsInput>
    create: XOR<CandidateCvCreateWithoutCvTrainingsInput, CandidateCvUncheckedCreateWithoutCvTrainingsInput>
    where?: CandidateCvWhereInput
  }

  export type CandidateCvUpdateToOneWithWhereWithoutCvTrainingsInput = {
    where?: CandidateCvWhereInput
    data: XOR<CandidateCvUpdateWithoutCvTrainingsInput, CandidateCvUncheckedUpdateWithoutCvTrainingsInput>
  }

  export type CandidateCvUpdateWithoutCvTrainingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    storageFilename?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    fileHash?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    analysisStatus?: EnumCandidateCvAnalysisStatusFieldUpdateOperationsInput | $Enums.CandidateCvAnalysisStatus
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    lastAnalyzedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidateProfile?: CandidateProfileUpdateOneRequiredWithoutCvsNestedInput
    cvExperiences?: CvExperienceUpdateManyWithoutCandidateCvNestedInput
    cvSkills?: CvSkillUpdateManyWithoutCandidateCvNestedInput
  }

  export type CandidateCvUncheckedUpdateWithoutCvTrainingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateProfileId?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    storageFilename?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    fileHash?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    analysisStatus?: EnumCandidateCvAnalysisStatusFieldUpdateOperationsInput | $Enums.CandidateCvAnalysisStatus
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    lastAnalyzedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cvExperiences?: CvExperienceUncheckedUpdateManyWithoutCandidateCvNestedInput
    cvSkills?: CvSkillUncheckedUpdateManyWithoutCandidateCvNestedInput
  }

  export type UserCreateWithoutCategoriesInput = {
    id?: string
    firstname: string
    lastname: string
    email: string
    passwordHash: string
    passwordResetToken?: string | null
    passwordResetExpiresAt?: Date | string | null
    emailVerifiedAt?: Date | string | null
    emailVerificationCode?: string | null
    emailVerificationExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    companies?: CompanyCreateNestedManyWithoutUserInput
    resumes?: ResumeCreateNestedManyWithoutUserInput
    candidateProfile?: CandidateProfileCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCategoriesInput = {
    id?: string
    firstname: string
    lastname: string
    email: string
    passwordHash: string
    passwordResetToken?: string | null
    passwordResetExpiresAt?: Date | string | null
    emailVerifiedAt?: Date | string | null
    emailVerificationCode?: string | null
    emailVerificationExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    companies?: CompanyUncheckedCreateNestedManyWithoutUserInput
    resumes?: ResumeUncheckedCreateNestedManyWithoutUserInput
    candidateProfile?: CandidateProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCategoriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCategoriesInput, UserUncheckedCreateWithoutCategoriesInput>
  }

  export type CompanyCreateWithoutCategoryInput = {
    id?: string
    name: string
    website?: string | null
    sector?: string | null
    city?: string | null
    country?: string | null
    email?: string | null
    phone?: string | null
    recruiterName?: string | null
    aiSummary?: string | null
    status?: $Enums.CompanyStatus
    isFavorite?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCompaniesInput
    applications?: ApplicationCreateNestedManyWithoutCompanyInput
    notes?: NoteCreateNestedManyWithoutCompanyInput
    actionHistory?: ActionHistoryCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutCategoryInput = {
    id?: string
    userId: string
    name: string
    website?: string | null
    sector?: string | null
    city?: string | null
    country?: string | null
    email?: string | null
    phone?: string | null
    recruiterName?: string | null
    aiSummary?: string | null
    status?: $Enums.CompanyStatus
    isFavorite?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    applications?: ApplicationUncheckedCreateNestedManyWithoutCompanyInput
    notes?: NoteUncheckedCreateNestedManyWithoutCompanyInput
    actionHistory?: ActionHistoryUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutCategoryInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutCategoryInput, CompanyUncheckedCreateWithoutCategoryInput>
  }

  export type CompanyCreateManyCategoryInputEnvelope = {
    data: CompanyCreateManyCategoryInput | CompanyCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCategoriesInput = {
    update: XOR<UserUpdateWithoutCategoriesInput, UserUncheckedUpdateWithoutCategoriesInput>
    create: XOR<UserCreateWithoutCategoriesInput, UserUncheckedCreateWithoutCategoriesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCategoriesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCategoriesInput, UserUncheckedUpdateWithoutCategoriesInput>
  }

  export type UserUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerificationExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companies?: CompanyUpdateManyWithoutUserNestedInput
    resumes?: ResumeUpdateManyWithoutUserNestedInput
    candidateProfile?: CandidateProfileUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerificationExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companies?: CompanyUncheckedUpdateManyWithoutUserNestedInput
    resumes?: ResumeUncheckedUpdateManyWithoutUserNestedInput
    candidateProfile?: CandidateProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type CompanyUpsertWithWhereUniqueWithoutCategoryInput = {
    where: CompanyWhereUniqueInput
    update: XOR<CompanyUpdateWithoutCategoryInput, CompanyUncheckedUpdateWithoutCategoryInput>
    create: XOR<CompanyCreateWithoutCategoryInput, CompanyUncheckedCreateWithoutCategoryInput>
  }

  export type CompanyUpdateWithWhereUniqueWithoutCategoryInput = {
    where: CompanyWhereUniqueInput
    data: XOR<CompanyUpdateWithoutCategoryInput, CompanyUncheckedUpdateWithoutCategoryInput>
  }

  export type CompanyUpdateManyWithWhereWithoutCategoryInput = {
    where: CompanyScalarWhereInput
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyWithoutCategoryInput>
  }

  export type UserCreateWithoutCompaniesInput = {
    id?: string
    firstname: string
    lastname: string
    email: string
    passwordHash: string
    passwordResetToken?: string | null
    passwordResetExpiresAt?: Date | string | null
    emailVerifiedAt?: Date | string | null
    emailVerificationCode?: string | null
    emailVerificationExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: CategoryCreateNestedManyWithoutUserInput
    resumes?: ResumeCreateNestedManyWithoutUserInput
    candidateProfile?: CandidateProfileCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCompaniesInput = {
    id?: string
    firstname: string
    lastname: string
    email: string
    passwordHash: string
    passwordResetToken?: string | null
    passwordResetExpiresAt?: Date | string | null
    emailVerifiedAt?: Date | string | null
    emailVerificationCode?: string | null
    emailVerificationExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: CategoryUncheckedCreateNestedManyWithoutUserInput
    resumes?: ResumeUncheckedCreateNestedManyWithoutUserInput
    candidateProfile?: CandidateProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCompaniesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCompaniesInput, UserUncheckedCreateWithoutCompaniesInput>
  }

  export type CategoryCreateWithoutCompaniesInput = {
    id?: string
    name: string
    color: string
    position?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCategoriesInput
  }

  export type CategoryUncheckedCreateWithoutCompaniesInput = {
    id?: string
    userId: string
    name: string
    color: string
    position?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryCreateOrConnectWithoutCompaniesInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutCompaniesInput, CategoryUncheckedCreateWithoutCompaniesInput>
  }

  export type ApplicationCreateWithoutCompanyInput = {
    id?: string
    emailSubject: string
    emailBody: string
    status?: $Enums.CompanyStatus
    sentAt?: Date | string | null
    createdAt?: Date | string
    resume: ResumeCreateNestedOneWithoutApplicationsInput
  }

  export type ApplicationUncheckedCreateWithoutCompanyInput = {
    id?: string
    resumeId: string
    emailSubject: string
    emailBody: string
    status?: $Enums.CompanyStatus
    sentAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ApplicationCreateOrConnectWithoutCompanyInput = {
    where: ApplicationWhereUniqueInput
    create: XOR<ApplicationCreateWithoutCompanyInput, ApplicationUncheckedCreateWithoutCompanyInput>
  }

  export type ApplicationCreateManyCompanyInputEnvelope = {
    data: ApplicationCreateManyCompanyInput | ApplicationCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type NoteCreateWithoutCompanyInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NoteUncheckedCreateWithoutCompanyInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NoteCreateOrConnectWithoutCompanyInput = {
    where: NoteWhereUniqueInput
    create: XOR<NoteCreateWithoutCompanyInput, NoteUncheckedCreateWithoutCompanyInput>
  }

  export type NoteCreateManyCompanyInputEnvelope = {
    data: NoteCreateManyCompanyInput | NoteCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type ActionHistoryCreateWithoutCompanyInput = {
    id?: string
    actionType: string
    description?: string | null
    createdAt?: Date | string
  }

  export type ActionHistoryUncheckedCreateWithoutCompanyInput = {
    id?: string
    actionType: string
    description?: string | null
    createdAt?: Date | string
  }

  export type ActionHistoryCreateOrConnectWithoutCompanyInput = {
    where: ActionHistoryWhereUniqueInput
    create: XOR<ActionHistoryCreateWithoutCompanyInput, ActionHistoryUncheckedCreateWithoutCompanyInput>
  }

  export type ActionHistoryCreateManyCompanyInputEnvelope = {
    data: ActionHistoryCreateManyCompanyInput | ActionHistoryCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCompaniesInput = {
    update: XOR<UserUpdateWithoutCompaniesInput, UserUncheckedUpdateWithoutCompaniesInput>
    create: XOR<UserCreateWithoutCompaniesInput, UserUncheckedCreateWithoutCompaniesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCompaniesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCompaniesInput, UserUncheckedUpdateWithoutCompaniesInput>
  }

  export type UserUpdateWithoutCompaniesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerificationExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: CategoryUpdateManyWithoutUserNestedInput
    resumes?: ResumeUpdateManyWithoutUserNestedInput
    candidateProfile?: CandidateProfileUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCompaniesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerificationExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: CategoryUncheckedUpdateManyWithoutUserNestedInput
    resumes?: ResumeUncheckedUpdateManyWithoutUserNestedInput
    candidateProfile?: CandidateProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type CategoryUpsertWithoutCompaniesInput = {
    update: XOR<CategoryUpdateWithoutCompaniesInput, CategoryUncheckedUpdateWithoutCompaniesInput>
    create: XOR<CategoryCreateWithoutCompaniesInput, CategoryUncheckedCreateWithoutCompaniesInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutCompaniesInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutCompaniesInput, CategoryUncheckedUpdateWithoutCompaniesInput>
  }

  export type CategoryUpdateWithoutCompaniesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCategoriesNestedInput
  }

  export type CategoryUncheckedUpdateWithoutCompaniesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationUpsertWithWhereUniqueWithoutCompanyInput = {
    where: ApplicationWhereUniqueInput
    update: XOR<ApplicationUpdateWithoutCompanyInput, ApplicationUncheckedUpdateWithoutCompanyInput>
    create: XOR<ApplicationCreateWithoutCompanyInput, ApplicationUncheckedCreateWithoutCompanyInput>
  }

  export type ApplicationUpdateWithWhereUniqueWithoutCompanyInput = {
    where: ApplicationWhereUniqueInput
    data: XOR<ApplicationUpdateWithoutCompanyInput, ApplicationUncheckedUpdateWithoutCompanyInput>
  }

  export type ApplicationUpdateManyWithWhereWithoutCompanyInput = {
    where: ApplicationScalarWhereInput
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyWithoutCompanyInput>
  }

  export type ApplicationScalarWhereInput = {
    AND?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
    OR?: ApplicationScalarWhereInput[]
    NOT?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
    id?: UuidFilter<"Application"> | string
    companyId?: UuidFilter<"Application"> | string
    resumeId?: UuidFilter<"Application"> | string
    emailSubject?: StringFilter<"Application"> | string
    emailBody?: StringFilter<"Application"> | string
    status?: EnumCompanyStatusFilter<"Application"> | $Enums.CompanyStatus
    sentAt?: DateTimeNullableFilter<"Application"> | Date | string | null
    createdAt?: DateTimeFilter<"Application"> | Date | string
  }

  export type NoteUpsertWithWhereUniqueWithoutCompanyInput = {
    where: NoteWhereUniqueInput
    update: XOR<NoteUpdateWithoutCompanyInput, NoteUncheckedUpdateWithoutCompanyInput>
    create: XOR<NoteCreateWithoutCompanyInput, NoteUncheckedCreateWithoutCompanyInput>
  }

  export type NoteUpdateWithWhereUniqueWithoutCompanyInput = {
    where: NoteWhereUniqueInput
    data: XOR<NoteUpdateWithoutCompanyInput, NoteUncheckedUpdateWithoutCompanyInput>
  }

  export type NoteUpdateManyWithWhereWithoutCompanyInput = {
    where: NoteScalarWhereInput
    data: XOR<NoteUpdateManyMutationInput, NoteUncheckedUpdateManyWithoutCompanyInput>
  }

  export type NoteScalarWhereInput = {
    AND?: NoteScalarWhereInput | NoteScalarWhereInput[]
    OR?: NoteScalarWhereInput[]
    NOT?: NoteScalarWhereInput | NoteScalarWhereInput[]
    id?: UuidFilter<"Note"> | string
    companyId?: UuidFilter<"Note"> | string
    content?: StringFilter<"Note"> | string
    createdAt?: DateTimeFilter<"Note"> | Date | string
    updatedAt?: DateTimeFilter<"Note"> | Date | string
  }

  export type ActionHistoryUpsertWithWhereUniqueWithoutCompanyInput = {
    where: ActionHistoryWhereUniqueInput
    update: XOR<ActionHistoryUpdateWithoutCompanyInput, ActionHistoryUncheckedUpdateWithoutCompanyInput>
    create: XOR<ActionHistoryCreateWithoutCompanyInput, ActionHistoryUncheckedCreateWithoutCompanyInput>
  }

  export type ActionHistoryUpdateWithWhereUniqueWithoutCompanyInput = {
    where: ActionHistoryWhereUniqueInput
    data: XOR<ActionHistoryUpdateWithoutCompanyInput, ActionHistoryUncheckedUpdateWithoutCompanyInput>
  }

  export type ActionHistoryUpdateManyWithWhereWithoutCompanyInput = {
    where: ActionHistoryScalarWhereInput
    data: XOR<ActionHistoryUpdateManyMutationInput, ActionHistoryUncheckedUpdateManyWithoutCompanyInput>
  }

  export type ActionHistoryScalarWhereInput = {
    AND?: ActionHistoryScalarWhereInput | ActionHistoryScalarWhereInput[]
    OR?: ActionHistoryScalarWhereInput[]
    NOT?: ActionHistoryScalarWhereInput | ActionHistoryScalarWhereInput[]
    id?: UuidFilter<"ActionHistory"> | string
    companyId?: UuidFilter<"ActionHistory"> | string
    actionType?: StringFilter<"ActionHistory"> | string
    description?: StringNullableFilter<"ActionHistory"> | string | null
    createdAt?: DateTimeFilter<"ActionHistory"> | Date | string
  }

  export type UserCreateWithoutResumesInput = {
    id?: string
    firstname: string
    lastname: string
    email: string
    passwordHash: string
    passwordResetToken?: string | null
    passwordResetExpiresAt?: Date | string | null
    emailVerifiedAt?: Date | string | null
    emailVerificationCode?: string | null
    emailVerificationExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: CategoryCreateNestedManyWithoutUserInput
    companies?: CompanyCreateNestedManyWithoutUserInput
    candidateProfile?: CandidateProfileCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutResumesInput = {
    id?: string
    firstname: string
    lastname: string
    email: string
    passwordHash: string
    passwordResetToken?: string | null
    passwordResetExpiresAt?: Date | string | null
    emailVerifiedAt?: Date | string | null
    emailVerificationCode?: string | null
    emailVerificationExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: CategoryUncheckedCreateNestedManyWithoutUserInput
    companies?: CompanyUncheckedCreateNestedManyWithoutUserInput
    candidateProfile?: CandidateProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutResumesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutResumesInput, UserUncheckedCreateWithoutResumesInput>
  }

  export type ApplicationCreateWithoutResumeInput = {
    id?: string
    emailSubject: string
    emailBody: string
    status?: $Enums.CompanyStatus
    sentAt?: Date | string | null
    createdAt?: Date | string
    company: CompanyCreateNestedOneWithoutApplicationsInput
  }

  export type ApplicationUncheckedCreateWithoutResumeInput = {
    id?: string
    companyId: string
    emailSubject: string
    emailBody: string
    status?: $Enums.CompanyStatus
    sentAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ApplicationCreateOrConnectWithoutResumeInput = {
    where: ApplicationWhereUniqueInput
    create: XOR<ApplicationCreateWithoutResumeInput, ApplicationUncheckedCreateWithoutResumeInput>
  }

  export type ApplicationCreateManyResumeInputEnvelope = {
    data: ApplicationCreateManyResumeInput | ApplicationCreateManyResumeInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutResumesInput = {
    update: XOR<UserUpdateWithoutResumesInput, UserUncheckedUpdateWithoutResumesInput>
    create: XOR<UserCreateWithoutResumesInput, UserUncheckedCreateWithoutResumesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutResumesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutResumesInput, UserUncheckedUpdateWithoutResumesInput>
  }

  export type UserUpdateWithoutResumesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerificationExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: CategoryUpdateManyWithoutUserNestedInput
    companies?: CompanyUpdateManyWithoutUserNestedInput
    candidateProfile?: CandidateProfileUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutResumesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerificationExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: CategoryUncheckedUpdateManyWithoutUserNestedInput
    companies?: CompanyUncheckedUpdateManyWithoutUserNestedInput
    candidateProfile?: CandidateProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type ApplicationUpsertWithWhereUniqueWithoutResumeInput = {
    where: ApplicationWhereUniqueInput
    update: XOR<ApplicationUpdateWithoutResumeInput, ApplicationUncheckedUpdateWithoutResumeInput>
    create: XOR<ApplicationCreateWithoutResumeInput, ApplicationUncheckedCreateWithoutResumeInput>
  }

  export type ApplicationUpdateWithWhereUniqueWithoutResumeInput = {
    where: ApplicationWhereUniqueInput
    data: XOR<ApplicationUpdateWithoutResumeInput, ApplicationUncheckedUpdateWithoutResumeInput>
  }

  export type ApplicationUpdateManyWithWhereWithoutResumeInput = {
    where: ApplicationScalarWhereInput
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyWithoutResumeInput>
  }

  export type CompanyCreateWithoutApplicationsInput = {
    id?: string
    name: string
    website?: string | null
    sector?: string | null
    city?: string | null
    country?: string | null
    email?: string | null
    phone?: string | null
    recruiterName?: string | null
    aiSummary?: string | null
    status?: $Enums.CompanyStatus
    isFavorite?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCompaniesInput
    category?: CategoryCreateNestedOneWithoutCompaniesInput
    notes?: NoteCreateNestedManyWithoutCompanyInput
    actionHistory?: ActionHistoryCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutApplicationsInput = {
    id?: string
    userId: string
    categoryId?: string | null
    name: string
    website?: string | null
    sector?: string | null
    city?: string | null
    country?: string | null
    email?: string | null
    phone?: string | null
    recruiterName?: string | null
    aiSummary?: string | null
    status?: $Enums.CompanyStatus
    isFavorite?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: NoteUncheckedCreateNestedManyWithoutCompanyInput
    actionHistory?: ActionHistoryUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutApplicationsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutApplicationsInput, CompanyUncheckedCreateWithoutApplicationsInput>
  }

  export type ResumeCreateWithoutApplicationsInput = {
    id?: string
    name: string
    fileUrl: string
    fileType: string
    fileSize: number
    createdAt?: Date | string
    uploadedAt?: Date | string
    user: UserCreateNestedOneWithoutResumesInput
  }

  export type ResumeUncheckedCreateWithoutApplicationsInput = {
    id?: string
    userId: string
    name: string
    fileUrl: string
    fileType: string
    fileSize: number
    createdAt?: Date | string
    uploadedAt?: Date | string
  }

  export type ResumeCreateOrConnectWithoutApplicationsInput = {
    where: ResumeWhereUniqueInput
    create: XOR<ResumeCreateWithoutApplicationsInput, ResumeUncheckedCreateWithoutApplicationsInput>
  }

  export type CompanyUpsertWithoutApplicationsInput = {
    update: XOR<CompanyUpdateWithoutApplicationsInput, CompanyUncheckedUpdateWithoutApplicationsInput>
    create: XOR<CompanyCreateWithoutApplicationsInput, CompanyUncheckedCreateWithoutApplicationsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutApplicationsInput, CompanyUncheckedUpdateWithoutApplicationsInput>
  }

  export type CompanyUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    recruiterName?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCompanyStatusFieldUpdateOperationsInput | $Enums.CompanyStatus
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCompaniesNestedInput
    category?: CategoryUpdateOneWithoutCompaniesNestedInput
    notes?: NoteUpdateManyWithoutCompanyNestedInput
    actionHistory?: ActionHistoryUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    recruiterName?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCompanyStatusFieldUpdateOperationsInput | $Enums.CompanyStatus
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUncheckedUpdateManyWithoutCompanyNestedInput
    actionHistory?: ActionHistoryUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type ResumeUpsertWithoutApplicationsInput = {
    update: XOR<ResumeUpdateWithoutApplicationsInput, ResumeUncheckedUpdateWithoutApplicationsInput>
    create: XOR<ResumeCreateWithoutApplicationsInput, ResumeUncheckedCreateWithoutApplicationsInput>
    where?: ResumeWhereInput
  }

  export type ResumeUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: ResumeWhereInput
    data: XOR<ResumeUpdateWithoutApplicationsInput, ResumeUncheckedUpdateWithoutApplicationsInput>
  }

  export type ResumeUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutResumesNestedInput
  }

  export type ResumeUncheckedUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyCreateWithoutNotesInput = {
    id?: string
    name: string
    website?: string | null
    sector?: string | null
    city?: string | null
    country?: string | null
    email?: string | null
    phone?: string | null
    recruiterName?: string | null
    aiSummary?: string | null
    status?: $Enums.CompanyStatus
    isFavorite?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCompaniesInput
    category?: CategoryCreateNestedOneWithoutCompaniesInput
    applications?: ApplicationCreateNestedManyWithoutCompanyInput
    actionHistory?: ActionHistoryCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutNotesInput = {
    id?: string
    userId: string
    categoryId?: string | null
    name: string
    website?: string | null
    sector?: string | null
    city?: string | null
    country?: string | null
    email?: string | null
    phone?: string | null
    recruiterName?: string | null
    aiSummary?: string | null
    status?: $Enums.CompanyStatus
    isFavorite?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    applications?: ApplicationUncheckedCreateNestedManyWithoutCompanyInput
    actionHistory?: ActionHistoryUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutNotesInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutNotesInput, CompanyUncheckedCreateWithoutNotesInput>
  }

  export type CompanyUpsertWithoutNotesInput = {
    update: XOR<CompanyUpdateWithoutNotesInput, CompanyUncheckedUpdateWithoutNotesInput>
    create: XOR<CompanyCreateWithoutNotesInput, CompanyUncheckedCreateWithoutNotesInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutNotesInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutNotesInput, CompanyUncheckedUpdateWithoutNotesInput>
  }

  export type CompanyUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    recruiterName?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCompanyStatusFieldUpdateOperationsInput | $Enums.CompanyStatus
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCompaniesNestedInput
    category?: CategoryUpdateOneWithoutCompaniesNestedInput
    applications?: ApplicationUpdateManyWithoutCompanyNestedInput
    actionHistory?: ActionHistoryUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    recruiterName?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCompanyStatusFieldUpdateOperationsInput | $Enums.CompanyStatus
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUncheckedUpdateManyWithoutCompanyNestedInput
    actionHistory?: ActionHistoryUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateWithoutActionHistoryInput = {
    id?: string
    name: string
    website?: string | null
    sector?: string | null
    city?: string | null
    country?: string | null
    email?: string | null
    phone?: string | null
    recruiterName?: string | null
    aiSummary?: string | null
    status?: $Enums.CompanyStatus
    isFavorite?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCompaniesInput
    category?: CategoryCreateNestedOneWithoutCompaniesInput
    applications?: ApplicationCreateNestedManyWithoutCompanyInput
    notes?: NoteCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutActionHistoryInput = {
    id?: string
    userId: string
    categoryId?: string | null
    name: string
    website?: string | null
    sector?: string | null
    city?: string | null
    country?: string | null
    email?: string | null
    phone?: string | null
    recruiterName?: string | null
    aiSummary?: string | null
    status?: $Enums.CompanyStatus
    isFavorite?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    applications?: ApplicationUncheckedCreateNestedManyWithoutCompanyInput
    notes?: NoteUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutActionHistoryInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutActionHistoryInput, CompanyUncheckedCreateWithoutActionHistoryInput>
  }

  export type CompanyUpsertWithoutActionHistoryInput = {
    update: XOR<CompanyUpdateWithoutActionHistoryInput, CompanyUncheckedUpdateWithoutActionHistoryInput>
    create: XOR<CompanyCreateWithoutActionHistoryInput, CompanyUncheckedCreateWithoutActionHistoryInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutActionHistoryInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutActionHistoryInput, CompanyUncheckedUpdateWithoutActionHistoryInput>
  }

  export type CompanyUpdateWithoutActionHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    recruiterName?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCompanyStatusFieldUpdateOperationsInput | $Enums.CompanyStatus
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCompaniesNestedInput
    category?: CategoryUpdateOneWithoutCompaniesNestedInput
    applications?: ApplicationUpdateManyWithoutCompanyNestedInput
    notes?: NoteUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutActionHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    recruiterName?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCompanyStatusFieldUpdateOperationsInput | $Enums.CompanyStatus
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUncheckedUpdateManyWithoutCompanyNestedInput
    notes?: NoteUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CategoryCreateManyUserInput = {
    id?: string
    name: string
    color: string
    position?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompanyCreateManyUserInput = {
    id?: string
    categoryId?: string | null
    name: string
    website?: string | null
    sector?: string | null
    city?: string | null
    country?: string | null
    email?: string | null
    phone?: string | null
    recruiterName?: string | null
    aiSummary?: string | null
    status?: $Enums.CompanyStatus
    isFavorite?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResumeCreateManyUserInput = {
    id?: string
    name: string
    fileUrl: string
    fileType: string
    fileSize: number
    createdAt?: Date | string
    uploadedAt?: Date | string
  }

  export type CategoryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companies?: CompanyUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companies?: CompanyUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    recruiterName?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCompanyStatusFieldUpdateOperationsInput | $Enums.CompanyStatus
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneWithoutCompaniesNestedInput
    applications?: ApplicationUpdateManyWithoutCompanyNestedInput
    notes?: NoteUpdateManyWithoutCompanyNestedInput
    actionHistory?: ActionHistoryUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    recruiterName?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCompanyStatusFieldUpdateOperationsInput | $Enums.CompanyStatus
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUncheckedUpdateManyWithoutCompanyNestedInput
    notes?: NoteUncheckedUpdateManyWithoutCompanyNestedInput
    actionHistory?: ActionHistoryUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    recruiterName?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCompanyStatusFieldUpdateOperationsInput | $Enums.CompanyStatus
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUpdateManyWithoutResumeNestedInput
  }

  export type ResumeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUncheckedUpdateManyWithoutResumeNestedInput
  }

  export type ResumeUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CandidateCvCreateManyCandidateProfileInput = {
    id?: string
    label: string
    originalFilename: string
    storageFilename: string
    storageKey: string
    fileHash?: string | null
    mimeType: string
    fileSize: number
    isDefault?: boolean
    analysisStatus?: $Enums.CandidateCvAnalysisStatus
    extractedText?: string | null
    lastAnalyzedAt?: Date | string | null
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CandidateCvUpdateWithoutCandidateProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    storageFilename?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    fileHash?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    analysisStatus?: EnumCandidateCvAnalysisStatusFieldUpdateOperationsInput | $Enums.CandidateCvAnalysisStatus
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    lastAnalyzedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cvExperiences?: CvExperienceUpdateManyWithoutCandidateCvNestedInput
    cvSkills?: CvSkillUpdateManyWithoutCandidateCvNestedInput
    cvTrainings?: CvTrainingUpdateManyWithoutCandidateCvNestedInput
  }

  export type CandidateCvUncheckedUpdateWithoutCandidateProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    storageFilename?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    fileHash?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    analysisStatus?: EnumCandidateCvAnalysisStatusFieldUpdateOperationsInput | $Enums.CandidateCvAnalysisStatus
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    lastAnalyzedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cvExperiences?: CvExperienceUncheckedUpdateManyWithoutCandidateCvNestedInput
    cvSkills?: CvSkillUncheckedUpdateManyWithoutCandidateCvNestedInput
    cvTrainings?: CvTrainingUncheckedUpdateManyWithoutCandidateCvNestedInput
  }

  export type CandidateCvUncheckedUpdateManyWithoutCandidateProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    storageFilename?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    fileHash?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    analysisStatus?: EnumCandidateCvAnalysisStatusFieldUpdateOperationsInput | $Enums.CandidateCvAnalysisStatus
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    lastAnalyzedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CvExperienceCreateManyCandidateCvInput = {
    id?: string
    jobTitle: string
    companyName?: string | null
    startDate?: string | null
    endDate?: string | null
    isCurrent?: boolean
    location?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CvSkillCreateManyCandidateCvInput = {
    id?: string
    name: string
    category: $Enums.CvSkillCategory
    confidence?: number | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CvTrainingCreateManyCandidateCvInput = {
    id?: string
    title: string
    organizationName?: string | null
    degree?: string | null
    fieldOfStudy?: string | null
    startDate?: string | null
    endDate?: string | null
    description?: string | null
    location?: string | null
    isCertification?: boolean
    certificationType?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CvExperienceUpdateWithoutCandidateCvInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobTitle?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableStringFieldUpdateOperationsInput | string | null
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CvExperienceUncheckedUpdateWithoutCandidateCvInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobTitle?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableStringFieldUpdateOperationsInput | string | null
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CvExperienceUncheckedUpdateManyWithoutCandidateCvInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobTitle?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableStringFieldUpdateOperationsInput | string | null
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CvSkillUpdateWithoutCandidateCvInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumCvSkillCategoryFieldUpdateOperationsInput | $Enums.CvSkillCategory
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CvSkillUncheckedUpdateWithoutCandidateCvInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumCvSkillCategoryFieldUpdateOperationsInput | $Enums.CvSkillCategory
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CvSkillUncheckedUpdateManyWithoutCandidateCvInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumCvSkillCategoryFieldUpdateOperationsInput | $Enums.CvSkillCategory
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CvTrainingUpdateWithoutCandidateCvInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    fieldOfStudy?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableStringFieldUpdateOperationsInput | string | null
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isCertification?: BoolFieldUpdateOperationsInput | boolean
    certificationType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CvTrainingUncheckedUpdateWithoutCandidateCvInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    fieldOfStudy?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableStringFieldUpdateOperationsInput | string | null
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isCertification?: BoolFieldUpdateOperationsInput | boolean
    certificationType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CvTrainingUncheckedUpdateManyWithoutCandidateCvInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    organizationName?: NullableStringFieldUpdateOperationsInput | string | null
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    fieldOfStudy?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableStringFieldUpdateOperationsInput | string | null
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isCertification?: BoolFieldUpdateOperationsInput | boolean
    certificationType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyCreateManyCategoryInput = {
    id?: string
    userId: string
    name: string
    website?: string | null
    sector?: string | null
    city?: string | null
    country?: string | null
    email?: string | null
    phone?: string | null
    recruiterName?: string | null
    aiSummary?: string | null
    status?: $Enums.CompanyStatus
    isFavorite?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompanyUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    recruiterName?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCompanyStatusFieldUpdateOperationsInput | $Enums.CompanyStatus
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCompaniesNestedInput
    applications?: ApplicationUpdateManyWithoutCompanyNestedInput
    notes?: NoteUpdateManyWithoutCompanyNestedInput
    actionHistory?: ActionHistoryUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    recruiterName?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCompanyStatusFieldUpdateOperationsInput | $Enums.CompanyStatus
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUncheckedUpdateManyWithoutCompanyNestedInput
    notes?: NoteUncheckedUpdateManyWithoutCompanyNestedInput
    actionHistory?: ActionHistoryUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    recruiterName?: NullableStringFieldUpdateOperationsInput | string | null
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCompanyStatusFieldUpdateOperationsInput | $Enums.CompanyStatus
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationCreateManyCompanyInput = {
    id?: string
    resumeId: string
    emailSubject: string
    emailBody: string
    status?: $Enums.CompanyStatus
    sentAt?: Date | string | null
    createdAt?: Date | string
  }

  export type NoteCreateManyCompanyInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActionHistoryCreateManyCompanyInput = {
    id?: string
    actionType: string
    description?: string | null
    createdAt?: Date | string
  }

  export type ApplicationUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailSubject?: StringFieldUpdateOperationsInput | string
    emailBody?: StringFieldUpdateOperationsInput | string
    status?: EnumCompanyStatusFieldUpdateOperationsInput | $Enums.CompanyStatus
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resume?: ResumeUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type ApplicationUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    resumeId?: StringFieldUpdateOperationsInput | string
    emailSubject?: StringFieldUpdateOperationsInput | string
    emailBody?: StringFieldUpdateOperationsInput | string
    status?: EnumCompanyStatusFieldUpdateOperationsInput | $Enums.CompanyStatus
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    resumeId?: StringFieldUpdateOperationsInput | string
    emailSubject?: StringFieldUpdateOperationsInput | string
    emailBody?: StringFieldUpdateOperationsInput | string
    status?: EnumCompanyStatusFieldUpdateOperationsInput | $Enums.CompanyStatus
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoteUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoteUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoteUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionHistoryUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionHistoryUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionHistoryUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationCreateManyResumeInput = {
    id?: string
    companyId: string
    emailSubject: string
    emailBody: string
    status?: $Enums.CompanyStatus
    sentAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ApplicationUpdateWithoutResumeInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailSubject?: StringFieldUpdateOperationsInput | string
    emailBody?: StringFieldUpdateOperationsInput | string
    status?: EnumCompanyStatusFieldUpdateOperationsInput | $Enums.CompanyStatus
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type ApplicationUncheckedUpdateWithoutResumeInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    emailSubject?: StringFieldUpdateOperationsInput | string
    emailBody?: StringFieldUpdateOperationsInput | string
    status?: EnumCompanyStatusFieldUpdateOperationsInput | $Enums.CompanyStatus
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationUncheckedUpdateManyWithoutResumeInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    emailSubject?: StringFieldUpdateOperationsInput | string
    emailBody?: StringFieldUpdateOperationsInput | string
    status?: EnumCompanyStatusFieldUpdateOperationsInput | $Enums.CompanyStatus
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
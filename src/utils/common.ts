export const pipe = <T>(firstArg: T, ...rest: ((arg: T) => T)[]) => rest.reduce((acc, curr) => curr(acc), firstArg);

namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    DATABASE_URL: string;
    TOKEN_SECRET: string;
  }
}

namespace Express {
  export interface Request {
    userId?: string;
  }
}

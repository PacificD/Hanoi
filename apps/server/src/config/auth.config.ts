import env from 'env-var'

const get = env.get

export const authConfig = {
  secretKey: get('SECRET_KEY').required().asString()
  // jwtExpiresIn: get('JWT_EXPIRES_IN').required().asString()
}

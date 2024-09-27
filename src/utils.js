import { dirname } from "path";
import { fileURLToPath } from "url";
export const __dirname = dirname(fileURLToPath(import.meta.url));

/* ------------------------------------ - ----------------------------------- */

import bcryptjs from "bcryptjs";

/**
 * Funcion que realiza el hasheo de contraseña a través de bcryptjs con el método hashSync
 * @param {*} password tipo String
 * @returns password hasheada
 */
export const createHash = (password) =>
  bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));

/**
 * Funcion que compara password en string plano con password hasheada del usuario
 * @param {*} password tipo string
 * @param {*} user usuario existente en base de datos
 * @returns boolean
 */
export const isValidPassword = (password, user) =>
  bcryptjs.compareSync(password, user.password);

/* ------------------------------------ - ----------------------------------- */
/**
 * Recibe la fecha de la última conexión y retorna true si han pasado mas de X
 * tiempo desde esa fecha o false si no ha pasado ese tiempo
 * @param {*} lastConnectionDate Date
 * @returns boolean
 */
export const hasBeenMoreThanXTime = (lastConnectionDate) => {
  const dateNow = new Date();
  const diffMs = dateNow - lastConnectionDate;
  const hours48Ms = 48 * 60 * 60 * 1000; //48hs en ms
  const minMs = 60 * 1000; //1 minuto

  return diffMs > hours48Ms; //diferencia es mayor a 48hs en ms
};

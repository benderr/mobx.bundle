/**
 * Created by RobertSabiryanov on 24.05.17.
 */
import * as generator from 'node-uuid';

export const uuid = () => {
  return generator.v4();
};

export const generateNumber = () => {
  if (window.crypto && window.crypto.getRandomValues) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0];
  }
  return Math.round(Math.random() * 1e10);
};

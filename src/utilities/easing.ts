/*
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 * @author Gaëtan Renaudeau
 * @url https://gist.github.com/gre/1650294
 */
export default class Easing {
  // no easing, no acceleration
  static linear(t: number) { return t }
  // accelerating from zero velocity
  static easeInQuad(t: number) { return t * t }
  // decelerating to zero velocity
  static easeOutQuad(t: number) { return t * (2 - t) }
  // acceleration until halfway, then deceleration
  static easeInOutQuad(t: number) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t }
  // accelerating from zero velocity 
  static easeInCubic(t: number) { return t * t * t }
  // decelerating to zero velocity 
  static easeOutCubic(t: number) { return (--t) * t * t + 1 }
  // spike to the end in the last quarter
  static easeInExpo(t: number) { return t === 0 ? 0 : Math.pow(2, 10 * t - 10) }
  // spike to the end in the first quarter and slowly finish
  static easeOutExpo(t: number) { return -Math.pow(2, -10 * t / 1) + 1 }
  // acceleration until halfway, then deceleration 
  static easeInOutCubic(t: number) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 }
  // accelerating from zero velocity 
  static easeInQuart(t: number) { return t * t * t * t }
  // decelerating to zero velocity 
  static easeOutQuart(t: number) { return 1 - (--t) * t * t * t }
  // acceleration until halfway, then deceleration
  static easeInOutQuart(t: number) { return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t }
  // accelerating from zero velocity
  static easeInQuint(t: number) { return t * t * t * t * t }
  // decelerating to zero velocity
  static easeOutQuint(t: number) { return 1 + (--t) * t * t * t * t }
  // acceleration until halfway, then deceleration 
  static easeInOutQuint(t: number) { return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t }
}
import {
  // importing all the easing functions
  easeLinear as d3EaseLinear,
  easeQuadIn as d3EaseQuadIn,
  easeQuadOut as d3EaseQuadOut,
  easeQuadInOut as d3EaseQuadInOut,
  easeCubicIn as d3EaseCubicIn,
  easeCubicOut as d3EaseCubicOut,
  easeCubicInOut as d3EaseCubicInOut,
  easePolyIn as d3EasePolyIn,
  easePolyOut as d3EasePolyOut,
  easePolyInOut as d3EasePolyInOut,
  easeSinIn as d3EaseSinIn,
  easeSinOut as d3EaseSinOut,
  easeSinInOut as d3EaseSinInOut,
  easeExpIn as d3EaseExpIn,
  easeExpOut as d3EaseExpOut,
  easeExpInOut as d3EaseExpInOut,
  easeCircleIn as d3EaseCircleIn,
  easeCircleOut as d3EaseCircleOut,
  easeCircleInOut as d3EaseCircleInOut,
  easeBounceIn as d3EaseBounceIn,
  easeBounceOut as d3EaseBounceOut,
  easeBounceInOut as d3EaseBounceInOut,
  easeBackIn as d3EaseBackIn,
  easeBackOut as d3EaseBackOut,
  easeBackInOut as d3EaseBackInOut,
  easeElasticIn as d3EaseElasticIn,
  easeElasticOut as d3EaseElasticOut,
  easeElasticInOut as d3EaseElasticInOut,
  easeElastic as d3EaseElastic,
} from "d3"
import { Transition } from "../enums"

// takes a 'transition string' and returns a d3 transition method
// default is easeLinear
export function getNeedleTransition(transition) {
  switch (transition) {
    // easeLinear
    case Transition.easeLinear:
      return d3EaseLinear
    // easeQuadIn as d3EaseQuadIn,
    case Transition.easeQuadIn:
      return d3EaseQuadIn
    // easeQuadOut as d3EaseQuadOut
    case Transition.easeQuadOut:
      return d3EaseQuadOut
    // easeQuadInOut as d3EaseQuadInOut
    case Transition.easeQuadInOut:
      return d3EaseQuadInOut
    // easeCubicIn as d3EaseCubicIn
    case Transition.easeCubicIn:
      return d3EaseCubicIn
    // easeCubicOut as d3EaseCubicOut,
    case Transition.easeCubicOut:
      return d3EaseCubicOut
    // easeCubicInOut as d3EaseCubicInOut,
    case Transition.easeCubicInOut:
      return d3EaseCubicInOut
    // easePolyIn as d3EasePolyIn,
    case Transition.easePolyIn:
      return d3EasePolyIn
    // easePolyOut as d3EasePolyOut,
    case Transition.easePolyOut:
      return d3EasePolyOut
    // easePolyInOut as d3EasePolyInOut,
    case Transition.easePolyInOut:
      return d3EasePolyInOut
    // easeSinIn as d3EaseSinIn,
    case Transition.easeSinIn:
      return d3EaseSinIn
    // easeSinOut as d3EaseSinOut,
    case Transition.easeSinOut:
      return d3EaseSinOut
    // easeSinInOut as d3EaseSinInOut,
    case Transition.easeSinInOut:
      return d3EaseSinInOut
    // easeExpIn as d3EaseExpIn,
    case Transition.easeExpIn:
      return d3EaseExpIn
    // easeExpOut as d3EaseExpOut,
    case Transition.easeExpOut:
      return d3EaseExpOut
    // easeExpInOut as d3EaseExpInOut,
    case Transition.easeExpInOut:
      return d3EaseExpInOut
    // easeCircleIn as d3EaseCircleIn,
    case Transition.easeCircleIn:
      return d3EaseCircleIn
    // easeCircleOut as d3EaseCircleOut,
    case Transition.easeCircleOut:
      return d3EaseCircleOut
    // easeCircleInOut as d3EaseCircleInOut,
    case Transition.easeCircleInOut:
      return d3EaseCircleInOut
    // easeBounceIn as d3EaseBounceIn,
    case Transition.easeBounceIn:
      return d3EaseBounceIn
    // easeBounceOut as d3EaseBounceOut,
    case Transition.easeBounceOut:
      return d3EaseBounceOut
    // easeBounceInOut as d3EaseBounceInOut,
    case Transition.easeBounceInOut:
      return d3EaseBounceInOut
    // easeBackIn as d3EaseBackIn,
    case Transition.easeBackIn:
      return d3EaseBackIn
    // easeBackOut as d3EaseBackOut,
    case Transition.easeBackOut:
      return d3EaseBackOut
    // easeBackInOut as d3EaseBackInOut,
    case Transition.easeBackInOut:
      return d3EaseBackInOut
    // easeElasticIn as d3EaseElasticIn,
    case Transition.easeElasticIn:
      return d3EaseElasticIn
    // easeElasticOut as d3EaseElasticOut,
    case Transition.easeElasticOut:
      return d3EaseElasticOut
    // easeElasticInOut as d3EaseElasticInOut,
    case Transition.easeElasticInOut:
      return d3EaseElasticInOut
    // easeElastic as d3EaseElastic,
    case Transition.easeElastic:
      return d3EaseElastic

    // if not a valid transition; throw a warning and return the default transition
    default:
      console.warn(
        `Warning: Invalid needle transition '${transition}'. Switching to default transition 'easeQuadInOut'`
      )
      return d3EaseQuadInOut
  }
}

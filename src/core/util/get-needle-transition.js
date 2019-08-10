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
// takes a 'transition string' and returns a d3 transition method
// default is easeLinear
export function getNeedleTransition(transition) {
  switch (transition) {
    // ease linear
    case "easeLinear":
      return d3EaseLinear
      break
    // easeQuadIn as d3EaseQuadIn,
    case "easeQuadIn":
      return d3EaseQuadIn
      break
    // easeQuadOut as d3EaseQuadOut
    case "easeQuadOut":
      return d3EaseQuadOut
      break
    // easeQuadInOut as d3EaseQuadInOut
    case "easeQuadInOut":
      return d3EaseQuadInOut
      break
    // easeCubicIn as d3EaseCubicIn
    case "easeCubicIn":
      return d3EaseCubicIn
      break
    // easeCubicOut as d3EaseCubicOut,
    case "easeCubicOut":
      return d3EaseCubicOut
      break
    // easeCubicInOut as d3EaseCubicInOut,
    case "easeCubicInOut":
      return d3EaseCubicInOut
      break
    // easePolyIn as d3EasePolyIn,
    case "easePolyIn":
      return d3EasePolyIn
      break
    // easePolyOut as d3EasePolyOut,
    case "easePolyOut":
      return d3EasePolyOut
      break
    // easePolyInOut as d3EasePolyInOut,
    case "easePolyInOut":
      return d3EasePolyInOut
      break
    // easeSinIn as d3EaseSinIn,
    case "easeSinIn":
      return d3EaseSinIn
      break
    // easeSinOut as d3EaseSinOut,
    case "easeSinOut":
      return d3EaseSinOut
      break
    // easeSinInOut as d3EaseSinInOut,
    case "easeSinInOut":
      return d3EaseSinInOut
      break
    // easeExpIn as d3EaseExpIn,
    case "easeExpIn":
      return d3EaseExpIn
      break
    // easeExpOut as d3EaseExpOut,
    case "easeExpOut":
      return d3EaseExpOut
      break
    // easeExpInOut as d3EaseExpInOut,
    case "easeExpInOut":
      return d3EaseExpInOut
      break
    // easeCircleIn as d3EaseCircleIn,
    case "easeCircleIn":
      return d3EaseCircleIn
      break
    // easeCircleOut as d3EaseCircleOut,
    case "easeCircleOut":
      return d3EaseCircleOut
      break
    // easeCircleInOut as d3EaseCircleInOut,
    case "easeCircleInOut":
      return d3EaseCircleInOut
      break
    // easeBounceIn as d3EaseBounceIn,
    case "easeBounceIn":
      return d3EaseBounceIn
      break
    // easeBounceOut as d3EaseBounceOut,
    case "easeBounceOut":
      return d3EaseBounceOut
      break
    // easeBounceInOut as d3EaseBounceInOut,
    case "easeBounceInOut":
      return d3EaseBounceInOut
      break
    // easeBackIn as d3EaseBackIn,
    case "easeBackIn":
      return d3EaseBackIn
      break
    // easeBackOut as d3EaseBackOut,
    case "easeBackOut":
      return d3EaseBackOut
      break
    // easeBackInOut as d3EaseBackInOut,
    case "easeBackInOut":
      return d3EaseBackInOut
      break
    // easeElasticIn as d3EaseElasticIn,
    case "easeElasticIn":
      return d3EaseElasticIn
      break
    // easeElasticOut as d3EaseElasticOut,
    case "easeElasticOut":
      return d3EaseElasticOut
      break
    // easeElasticInOut as d3EaseElasticInOut,
    case "easeElasticInOut":
      return d3EaseElasticInOut
      break
    // easeElastic as d3EaseElastic,
    case "easeElastic":
      return d3EaseElastic
      break
    // ease elastic transition
    case "easeElastic":
      return d3EaseElastic
      break

    // if not a valid transition; throw a warning and return the default transition
    default:
      console.warn(
        `Warning: Invalid needle transition '${transition}'. Switching to default transition 'easeQuadInOut'`
      )
      return d3EaseQuadInOut
      break
  }
}

import { EqualStencilFunc, MaterialParameters, ReplaceStencilOp } from 'three'

export function writeToStencilBuffer(id = 0){
  const materialProps: MaterialParameters = {
    stencilWrite: true,
    stencilZPass: ReplaceStencilOp,
    stencilZFail: ReplaceStencilOp,
    stencilFail: ReplaceStencilOp,
    stencilRef: id,
  }
  return materialProps
}

export function useStencilMask(id = 0){
  const materialProps: MaterialParameters = {
    stencilWrite: true,
    stencilFunc: EqualStencilFunc,
    stencilRef: id
  }
  return materialProps
}
package com.riasdk

import com.facebook.react.bridge.ReactApplicationContext

class RiaSdkModule(reactContext: ReactApplicationContext) :
  NativeRiaSdkSpec(reactContext) {

  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }

  companion object {
    const val NAME = NativeRiaSdkSpec.NAME
  }
}

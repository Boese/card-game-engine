#include <node_api.h>

#include <assert.h>
#include <stdlib.h>
#include <iostream>
#include <time.h>
#include <cstring>

/// Specify seed for srand()
static napi_value Srand(napi_env env, napi_callback_info info) {

  std::cout << "Srand called" << std::endl;

  napi_status status;

  size_t argc = 1;
  napi_value args[1];
  status = napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
  assert(status == napi_ok);

  if (argc > 0) {

    napi_valuetype valuetype0;
    status = napi_typeof(env, args[0], &valuetype0);
    assert(status == napi_ok);

    if (valuetype0 != napi_number) {
        napi_throw_type_error(env, nullptr, "Wrong arguments. Expected number for seed");
        return nullptr;
    }

    int seed;
    status = napi_get_value_int32(env, args[0], &seed);
    assert(status == napi_ok);

    std::cout << "Seeding srand with seed: " << seed << std::endl;
    srand(seed);
  } else {
      std::cout << "Seed srand with time(NULL)" << std::endl;
      srand (time(NULL));
  }

  return nullptr;
}

/// Return int32 value from calling rand()
static napi_value Rand(napi_env env, napi_callback_info info) {
  napi_value result;
  assert(napi_create_int32(env,
                           rand(),
                           &result) == napi_ok);

  // Return the JavaScript integer back to JavaScript.
  return result;
}

/// Generate a sequence of random numbers using rand().
/// Expects 1 argument - size of sequence. Must be > 0.
/// Returns javascript ArrayBuffer of Uint8_t. To get int32 values, convert to DataView.
static napi_value RandSequence(napi_env env, napi_callback_info info) {

  napi_status status;

  size_t argc = 1;
  napi_value args[1];
  status = napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
  assert(status == napi_ok);

  if (argc != 1) {
    napi_throw_type_error(env, nullptr, "Wrong arguments. Expected unsigned int for size of sequence > 0");
    return nullptr;
  }

  napi_valuetype valuetype0;
  status = napi_typeof(env, args[0], &valuetype0);
  assert(status == napi_ok);

  if (valuetype0 != napi_number) {
      napi_throw_type_error(env, nullptr, "Wrong arguments. Expected unsigned int for size of sequence > 0");
      return nullptr;
  }

  int size;
  status = napi_get_value_int32(env, args[0], &size);
  assert(status == napi_ok);

  if (size < 1) {
    napi_throw_type_error(env, nullptr, "Wrong arguments. Expected unsigned int for size of sequence > 0");
      return nullptr;
  }

  const int32_t buffsize = size*4;
  std::cout << "Buffer size: " << buffsize << std::endl;

  uint8_t* buf = nullptr;
  napi_value result;
  assert(napi_create_arraybuffer(env,
                           buffsize,
                           (void**)&buf,
                           &result) == napi_ok);


  for (int32_t i = 0; i < size; i++) {
    const auto nextRand = rand();
    buf[i*4] = nextRand;
    buf[(i*4) + 1] = nextRand >> 8;
    buf[(i*4) + 2] = nextRand >> 16;
    buf[(i*4) + 3] = nextRand >> 24;
  }
  
  // Return the JavaScript array buffer
  return result;
}

#define DECLARE_NAPI_METHOD(name, func)                                        \
  { name, 0, func, 0, 0, 0, napi_default, 0 }

NAPI_MODULE_INIT(/*env, exports*/) {

  napi_property_descriptor bindings[] = {
      DECLARE_NAPI_METHOD("srand", Srand),
      DECLARE_NAPI_METHOD("rand", Rand),
      DECLARE_NAPI_METHOD("rsequence", RandSequence)
  };

  // Expose the two bindings declared above to JavaScript.
  assert(napi_define_properties(env,
                                exports,
                                sizeof(bindings) / sizeof(bindings[0]),
                                bindings) == napi_ok);

  // Return the `exports` object provided. It now has two new properties, which
  // are the functions we wish to expose to JavaScript.
  return exports;
}
#include <node_api.h>

#include <assert.h>
#include <stdlib.h>
#include <iostream>
#include <time.h>

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

  napi_value result;
  assert(napi_get_null(env, &result) == napi_ok);
  return result;
}

static napi_value Rand(napi_env env, napi_callback_info info) {
  napi_value result;
  assert(napi_create_int32(env,
                           rand(),
                           &result) == napi_ok);

  // Return the JavaScript integer back to JavaScript.
  return result;
}

#define DECLARE_NAPI_METHOD(name, func)                                        \
  { name, 0, func, 0, 0, 0, napi_default, 0 }

// Initialize the addon in such a way that it may be initialized multiple times
// per process. The function body following this macro is provided the value
// `env` which has type `napi_env` and the value `exports` which has type
// `napi_value` and which refers to a JavaScript object that ultimately contains
// the functions this addon wishes to expose. At the end, it must return a
// `napi_value`. It may return `exports`, or it may create a new `napi_value`
// and return that instead.
NAPI_MODULE_INIT(/*env, exports*/) {
//   // Create a new instance of the per-instance-data that will be associated with
//   // the instance of the addon being initialized here and that will be destroyed
//   // along with the instance of the addon.
//   AddonData* addon_data = CreateAddonData(env, exports);

  // Declare the bindings this addon provides. The data created above is given
  // as the last initializer parameter, and will be given to the binding when it
  // is called.

  napi_property_descriptor bindings[] = {
      DECLARE_NAPI_METHOD("srand", Srand),
      DECLARE_NAPI_METHOD("rand", Rand)
  };

  // Expose the two bindings declared above to JavaScript.
  assert(napi_define_properties(env,
                                exports,
                                2,
                                //sizeof(bindings) / sizeof(bindings[0]),
                                bindings) == napi_ok);

  // Return the `exports` object provided. It now has two new properties, which
  // are the functions we wish to expose to JavaScript.
  return exports;
}
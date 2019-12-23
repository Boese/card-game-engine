// TODO: Need to be able to instantiate multiple random_seed modules
// TODO: Need to expose Typescript wrapper in front of addon, User should interact with ts wrapper
//  > One issue is passing arrays from C to jS requires a buffer. Can abstract from user.
//  > Another issue is handling endiness from uint8_t buffer -> int32_t. Can abstract from user.
// TODO: Need to consolidate this module into a standalone module (push to npm_modules?)
// TODO: Move tests for random seed to this module

var random_seed = require('bindings')('random_seed.node')


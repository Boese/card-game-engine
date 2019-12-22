// TODO: Need to be able to instantiate multiple random_seed modules

var random_seed = require('bindings')('random_seed.node')

random_seed.srand();
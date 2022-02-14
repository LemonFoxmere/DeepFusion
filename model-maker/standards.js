/*
node type standard
in = input
ou = output
de = dense
ac = activation
do = dropout

element type standard
00 = node
01 = edge
02 = data file
...
FF = ?

activation type standard
li = linear
si = sigmoid
re = relu
se = selu
so = softmax
ta = tanh
el = elu
*/

const supported_file_types=[]

const recognized_node_code = ["in", "ou", "de", "ac", "do"]

const activation_name_std = {
    li : "Linear",
    si : "Sigmoid",
    re : "ReLU",
    se : "Selu",
    so : "Softmax",
    ta : "Tanh",
    el : "Elu", 
}

const activation_code_std = {
    li : "linear",
    si : "sigmoid",
    re : "relu",
    se : "selu",
    so : "softmax",
    ta : "tanh",
    el : "elu", 
}

const kernel_bias_init_name_std = {
    glu : "Glorot Uniform",
    gln : "Glorot Normal",
    con : "Constant",
    hen : "He-Normal",
    heu : "He-Uniform",
    ide : "Identity",
    lec : "LeCun Normal", 
    leu : "LeCun Uniform", 
    one : "Ones", 
    zer : "Zeros", 
    ort : "Orthogonal", 
    ran : "Random Normal", 
    rau : "Random Uniform", 
    trn : "Truncated Normal", 
    var : "Varience Scaling", 
}

const kernel_bias_init_code_std = {
    glu : "glorotUniform",
    gln : "glorotNormal",
    con : "constant",
    hen : "heNormal",
    heu : "heUniform",
    ide : "identity",
    lec : "leCunNormal", 
    leu : "leCunUniform", 
    one : "ones", 
    zer : "zeros", 
    ort : "orthogonal", 
    ran : "randomNormal", 
    rau : "randomUniform", 
    trn : "truncatedNormal", 
    var : "varienceScaling", 
}
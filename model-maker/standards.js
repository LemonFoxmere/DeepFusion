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
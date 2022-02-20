<div align="center" style="margin-top:1rem; font-family: Poppins">
    <a href="https://deepfusion.org" style="display:flex; justify-content:center; height:fit-content; padding:0; text-decoration:none; margin:0 0 1rem 0">
        <img src="./img/readme-icon.svg" style="height:20rem; margin:0"></img>
    </a>
    <h1 style="font-family: Poppins; font-weight:500; font-size:6rem; margin:0; line-height:6rem;" >DeepFusion</h1>
    <hr style="margin:0 0 1.5rem 0; width:10rem; height:0.05rem">
    <h3 style="font-family:Montserrat; font-weight:300; font-size:1.3rem; margin:0 0 1.5rem 0">An Intuitive Graphical Neural Network Playground</h3>

[![Website shields.io](https://img.shields.io/website?down_message=offline&style=for-the-badge&up_message=online&url=https%3A%2F%2Fdeepfusion.org)](https://deepfusion.org/)
[![Maintenance](https://img.shields.io/maintenance/yes/2021?color=blue&style=for-the-badge)](https://github.com/LemonOrangeWasTaken/DeepFusion/commits)
[![License: MIT](https://img.shields.io/github/license/LemonOrangeWasTaken/DeepFusion?color=orange&style=for-the-badge)](https://github.com/LemonOrangeWasTaken/DeepFusion/blob/master/LICENSE)

</div>

<hr style="height:0.1rem">

<!-- praises bs -->
<h2 align="center">Praises for DeepFusion</h2>
<div style="display:flex; flex-direction:row; justify-content:center; align-item:center">
    <section style="display:flex; flex-direction:column; width:fit-content; height:fit-content; align-items:flex-start; padding:0.7rem 2rem 2rem 1.5rem; border-radius:0.8rem; border: 1px #606060 solid; margin: 0 1rem 0 1rem; min-width:16.5rem">
        <h3 style="font-size: 1.3rem; font-weight:300; line-height:0rem; margin-bottom:1rem">"google.com looks better"</h3>
        <h4 style="font-size: 1.1rem; align-self:flex-end; margin-bottom:0; line-height:0">- A Discord User</h4>
    </section>
    <section style="display:flex; flex-direction:column; width:fit-content; height:fit-content; align-items:flex-start; padding:0.7rem 2rem 2rem 1.5rem; border-radius:0.8rem; border: 1px #606060 solid; margin: 0 1rem 0 1rem; min-width:12rem">
        <h3 style="font-size: 1.3rem; font-weight:300; line-height:0rem; margin-bottom:1rem">"Who are you?"</h3>
        <h4 style="font-size: 1.1rem; align-self:flex-end; margin-bottom:0; line-height:0">- Person On the Bus</h4>
    </section>
    <section style="display:flex; flex-direction:column; width:fit-content; height:fit-content; align-items:flex-start; padding:0.7rem 2rem 2rem 1.5rem; border-radius:0.8rem; border: 1px #606060 solid; margin: 0 1rem 0 1rem; min-width:13.5rem">
        <h3 style="font-size: 1.3rem; font-weight:300; line-height:0rem; margin-bottom:1rem">"based"</h3>
        <h4 style="font-size: 1.1rem; align-self:flex-end; margin-bottom:0; line-height:0">- Anonymous Reddit User</h4>
    </section>
</div>



<hr style="height:0.1rem">

<!-- table of content -->
<details open="open" style="margin:1rem 0 0 0; width:90%; font-family: Poppins; diplay:flex; align-items:flex-start; justify-content: center; flex-direction:column;">
    <summary style="font-size:2rem; font-weight:800; cursor:pointer">Table of Content</summary>
    <ol style="margin-left:2rem">
        <li>
            <a href="#about">About The Project</a>
        </li>
        <li><a href="#getting-started">Getting Started</a></li>
            <ul>
                <li><a href="#navigate-df">Navigating the Canvas</a></li>
                <li><a href="#create-model">Creating a Model</a></li>
                <li><a href="#upload-data">Uploading Datasets</a></li>
                <li><a href="#train-model">Training the Model</a></li>
                <li><a href="#test-model">Testing the Model</a></li>
                <li><a href="#export-model">Exporting the Model</a></li>
            </ul>
        <li><a href="#contributing">Contributing</a></li>
        <li><a href="#license">License</a></li>
        <li><a href="#contact">Contact & Social</a></li>
    </ol>
</details>

<hr style="height:0.1rem">

<!-- ABOUT THE PROJECT -->
<h2 id="about">About The Project</h2>

While there are apps out there that can create neural networks, or even more complex AI models, without the need for any code, none of them really satisfied my need for a simple, light weight, and easy to use app for making neural networks. Those which did satisfy those conditions, however, lacked many of the essential features needed in making and training neural networks. So I've decided to make one myself, and I think this is it.

Here's why:
* It has the ability to upload and train on custom data.
* There are virtually no limitation to the size of the network.
* You can train directly on the browser, although this is a double edge sword.
* The program itself have infinite scalability for features.
* It's designed to be easy to use.
* It's a good bar of eye candy. (at least for me)

But after all, this project isn't perfect, and I don't see it replace writing actual code in the near future, just like how scratch hasn't replaced javascript... yet. Plus, DeepFusion is still in its Beta stage, meaning that there's still a lot to be added. If YOU think this project isn't a terrible idea, you can suggest some features you would like to see <a href="https://github.com/LemonOrangeWasTaken/DeepFusion/discussions/categories/feature-requests">here</a>, and I'll most likely add it.

<hr style="height:0.1rem">

<!-- GETTING STARTED -->
<h2 id="getting-started">Getting Started</h2>

This is pretty much a manual on how to use the app, and I will be going over how to train, test, and export your work.

> <h3 id="navigate-df">> Navigating the Canvas</h3>

The canvas in DeepFusion is where you will be building your neural network. You can click and drag anywhere on the blank canvas to move it, and press the **`⛶`** button on the tool dock (located at the top) to recenter the canvas. There will two numbers displayed at the top right corner of the canvas, and those represent the X, Y position at which you are currently located.

To zoom in DeepFusion, you can scroll on your mouse wheel to zoom in and zoom out. If you are, however, on a track pad, the zooming may be very sensitive. I reccomend you to use the **`+`** and **`-`** button on the tool dock in order to zoom in and zoom out. The number below the tool dock will tell you the amount you are zoomed into, and pressing the **`⭯`** button in the tool dock will reset the zoom back to 100%.

**TLDR (Controls):**
*  Click and drag on the canvas to move it
*  **`⛶`** Recenters canvas
*  **`+`** Zoom in
*  **`-`** Zoom out
*  **`⭯`** Reset zoom

> <h3 id="create-model">> Creating a Model</h3>

DeepFusion uses a node graph system to make neural networks. This just means that layers will be represented as configurable boxes that can connect to other layers represented as boxes. Not only is this easy, it is also highly scalable and adaptable.

To create a neural network in DeepFusion, you need a couple of things to make it be able to at least compile.

Here's a list of layers that you need:
* Input Layer
* Output Layer
* Dense Layer (At least 1)

Layers are represenetd as nodes in DeepFusion, and can be added by clicking the buttons on the bottom menu titled "Add Layers". You may drag on each node to position it around the canvas.

To connect two layers together, hover your cursor over the yellow square at the bottom of a node, and dragging out a connection to desired node. When the node you want to connect to lights up, you may release your cursor, and a connection will be made between the two layers.

**Note**: You cannot connect a node to itself, or a node that already has connections on it. However, this might change in the future as support for more complex neural networks are added.

To edit the property of a node, click on the node that you would like to edit, and you will be able to see all of its parameters on the menu to the right. It will have the node's name as the title, with all of its configurable settings below.

A neural network must have at least one dense (fully connected) layer, an input & output layer, and proper connections made between the layers. If you're not sure your network is correctly configured, you can press the "Check Network" button located in the lower right menu of the app.

> <h3 id="upload-data">> Uploading Trainin/Testing Data</h3>

One of the greatest feature of DeepFusion is that you can train your neural network on your own data, so you can customize and train it to your need. If you do not have your own data and just want to play with neural networks, I have also provided default datasets for you to mess with.

To Upload Data, click on the input or output layer, and click the `Upload` button on the node configuration menu to the right. If you do NOT have proper data to upload, click the **`⋮`** button next to the `Upload` button to load in the default dataset. You must have data in both input and output in order for training to succeed.

**Important Note**: Only *CSV* formatted data are currently supported. I know this is very limiting, but there are plans to add more in future versions.

> <h3 id="train-model">> Training the Model</h3>

Assuming that you have done everything described above correctly, you can just click the `Train Network` button in the `Training Controls` menu. However, if you wish, you can customize some of the training behaviors such as Epoch and Batch size in the `Training Parameters` menu located at the bottom left. Again, as with everything in DeepFusion so far, more controls and features will be added in the future.

Do note, however, that your last Dense layer must have the same dimension as your output file. So for example if the output file shows to have a dimension of `2000 x 5 x 1`, your last Dense layer must have a size of `5`.

Break down of what a input/output layer means:
```
___________________
|   Dense Layer   |
|       ---       |
| File Name:      |
| RGB-inputs.csv <--- This is the name of the dataset
|                 |
| Dimensions:     |
| 2000 X 5 X 1    |
   ^     ^   ^
   |     |  /
   |     |_/
   |     |
   |    This is the size of one data sample. 5x1 means 5 numbers.
   |    If this was something like 5x2x1, it would mean 5 arrays w/ numbers of length 2. 
   |
   This is how many data samples are in RGB-inputs.csv. In this case there are 2K entries of trainable data samples.
```

If the training fails for some reason, **ALWAYS** read the error output of the terminal. It will tell you everything that went wrong and what you need to do to fix it.

> <h3 id="test-model">> Testing the Model</h3>

After you've trained your network, you can test it with the `Test Network` button in the `Training Controls` menu. This will automatically select a piece of data which the neural network have never seen before, and run it through the trained network. After this, the selected input, prediction, and ground truth of the test will be displayed in the terminal.

> <h3 id="export-model">> Exporting the Model</h3>

When the network has been trained or compiled without error, you may choose to export the network via the `Export Network` button in the `Training Controls` menu. This will export a `[Network Name].json` file for the network structure, as well as a `[Network Name].weights.bin` file for the network weights. This is a TFJS model, meaning if you want to integrate it into your code with libraries like keras, you will need to convert it. This feature will be added once DeepFusion have access to a backend, but this is what it is for now.

If you would like to change the title of your network's name, you can edit it on the top left corner in the canvas.

<hr style="height:0.1rem">

<h2 id="contributing">Contributing</h2>

Contributions are what allows open source programs like this one to grow. If you feel like this isn't a complete dumpster fire of a project, please consider contributing, which includes but is not limited to: 
* Writing a feature request / error report to this repo.
* Starring this repo
* Forking this repo
* Making pull requests to this repo
* Share this project with your friends or on social media
* Write me a nice email
* Write me a not so nice email

Any contributions that you make are greatly appreciated, and will make DeepFusion an even better place to play with AI. And if you've done any of the things listed above, I cannot thank you enough :pray:.

<hr style="height:0.1rem">

<h2 id="license">License</h2>

Distributed under the GPL-3.0 License. See `LICENSE` or click <a href="https://deepfusion.org/license-info/">here</a> for more information.

<hr style="height:0.1rem">

<!-- CONTACT -->
<h2 id="contact">Contact & Social</h2>

LemonOrange - [@LemonOrangeTW](https://twitter.com/LemonOrangeTW) - lemon@thelemonorange.com

<style>
    h2{
        font-family: Poppins;
        font-weight:500;
    }
    h3{
        font-family: Poppins;
        font-weight:300;
    }
    ol{
        font-size:1.25rem;
    }
    ul{
        font-size:1rem;
    }
</style>
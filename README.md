# 5G-Wireless-Communication-Simulations

This project simulates key concepts in 5G wireless communication technology. It was developed as part of the **5G Communication and Network(EC 431)** course. The project explores concepts such as network slicing, mmWave propagation, beamforming algorithms, and Modulation and Coding Scheme (MCS) simulations, providing an interactive environment to visualize 5G wireless communication parameters.

---

## Team Members
1. **Nupur Jain (202152325)**
2. **Spruha Thorat (202151172)**
3. **Sanjeevani Lakade (202151139)**
4. **Shilpi Giri (202151145)**

### Mentor
- **Dr. Bhupendra Kumar**

### Video Presentation
https://drive.google.com/file/d/1R93yGZgPrZWgbwpuLTRa-V8x71VopDF8/view?usp=sharing

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Simulation Modules](#simulation-modules)
    - [Network Slicing Performance](#network-slicing-performance)
    - [mmWave Propagation](#mmwave-propagation)
    - [Beamforming Algorithms](#beamforming-algorithms)
    - [MCS Simulation (BER & SNR)](#mcs-simulation-ber--snr)
4. [Technologies Used](#technologies-used)
5. [Installation](#installation)
6. [Usage](#usage)

## Project Overview

The **5G Wireless Communication Simulations** project is designed to help users understand various facets of 5G technologies by simulating real-world scenarios. These simulations can help students, engineers, and researchers to grasp the concepts of:
- Network slicing
- mmWave propagation
- Beamforming algorithms
- MCS and their effects on signal performance (BER & SNR)

By running these simulations, users can visualize key metrics like throughput, latency, and packet loss for different types of services (eMBB, URLLC, and mMTC).

## Key Features

- **Network Slicing Performance Simulation:** Simulates different 5G network slices, visualizing throughput, latency, and packet loss.
- **mmWave Propagation Simulation:** Simulates how mmWave signals propagate in various environments (urban, indoor), visualizing path loss and the impact of different path loss models.
- **Beamforming Algorithms Simulation:** Simulates beamforming in 5G networks to understand signal optimization and coverage.
- **MCS Simulation (BER & SNR):** Simulates the impact of different modulation and coding schemes (MCS) on Bit Error Rate (BER) and Signal-to-Noise Ratio (SNR).

![{E0FA2499-2DC2-47CE-B5F7-E13F7EEBEC88}](https://github.com/user-attachments/assets/45531aa5-c5e8-4279-9b24-823ea3c41d27)

## Simulation Modules

### Network Slicing Performance
This module allows you to simulate and visualize how different network slices (eMBB, URLLC, and mMTC) perform under varying traffic loads. It includes the following metrics:
- Throughput (Mbps)
- Latency (ms)
- Packet Loss (%)

Users can set the simulation duration and observe the performance of each slice over time.
![image](https://github.com/user-attachments/assets/457bd4ed-e11e-4a5d-9a10-cf92a2bc4f26)


### mmWave Propagation
The mmWave propagation simulation demonstrates how the signal attenuates over distance and how different environmental factors (urban or indoor) affect signal quality. Users can select:
- **Environment Type:** Urban or Indoor
- **Path Loss Model:** Free Space Path Loss (FSPL) or COST231 model
- **Frequency (GHz):** Range of 30 GHz to 300 GHz

The results include:
- Path loss vs. distance chart
- Heatmap of signal coverage in different environments
 ![image](https://github.com/user-attachments/assets/8829e754-c930-4c9f-9ede-dc52ef72492c)
![image](https://github.com/user-attachments/assets/68990332-f9cd-46f8-8122-6a8c9df14b61)


### Beamforming Algorithms
This module simulates beamforming techniques that are key to optimizing coverage and signal strength in 5G networks. The simulation results help in visualizing how different beamforming strategies affect network performance.
![image](https://github.com/user-attachments/assets/6ff9b84b-394c-4b6c-9c0c-7ad0ad9047ba)


### MCS Simulation (BER & SNR)
This module simulates how different Modulation and Coding Schemes (MCS) impact Bit Error Rate (BER) and Signal-to-Noise Ratio (SNR). It helps to understand the trade-offs between data rate and error performance.
![image](https://github.com/user-attachments/assets/e33cbb0c-867c-4bd3-9407-787a0b54f2a5)


## Technologies Used

- **HTML5:** Structure and layout of the web pages.
- **CSS3:** Styling of the web pages for a clean, modern UI.
- **JavaScript:** Simulation logic and data visualization.
- **Plotly.js:** A powerful library for creating interactive charts and visualizations.
- **Web Browser:** For running and viewing the simulations directly in the browser.

## Installation

To run the simulations locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/username/5G-Wireless-Communication-Simulations.git
   
#### Install Dependencies
The project does not require any additional dependencies beyond a modern web browser. Simply open the `index.html` files in your browser to run the simulations.

#### Run the Simulation
Navigate to any of the project modules (e.g., `Network Slicing Performance`, `mmWave Propagation`, etc.) by opening the respective HTML file in your browser.

---

### Usage

#### Network Slicing Performance Simulation
- Set the simulation duration (in seconds).
- Click **"Start Simulation"** to visualize the performance of different network slices.
- Metrics for each slice will be displayed in real-time.

#### mmWave Propagation
- Select the environment (**Urban**/**Indoor**) and path loss model.
- Adjust the frequency (in GHz).
- Click **"Run Simulation"** to see the path loss and environment map charts.

#### Beamforming Algorithms
- This section includes interactive charts and visuals to understand how beamforming affects network performance.

#### MCS Simulation (BER & SNR)
- Select different MCS schemes to observe the impact on signal quality.



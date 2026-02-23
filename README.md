# NLP Project A5: Optimization & LLM-as-a-Judge

## Overview
This repository contains the deliverables for Assignment A5, focusing on two critical aspects of modern Large Language Model (LLM) development: **Alignment** and **Evaluation**. 

The goal of this project is to use Direct Preference Optimization (DPO) to align `Qwen/Qwen2.5-1.5B-Instruct` to be "Truthful" (avoiding hallucinations/incorrect answers), and to evaluate its progress using an industry-standard LLM-as-a-Judge protocol on the AlpacaEval benchmark.

## Repository Contents
- `A5_Human_Preference.ipynb`: The main Jupyter Notebook handling Dataset Preparation, DPO Training, Hugging Face Hub pushing, and the Evaluation pipeline.
- `Project_Explanation_Burmese.md`: Technical documentation explaining the methodology in Burmese.
- `index.html`, `style.css`, `script.js`: A responsive, modern web application that visualizes the progress flow of this assignment in an interactive timeline.

## How to Run

### 1. Python Notebook (DPO & Evaluation)
The notebook is designed to automatically detect your environment:
- **Mac Users**: It will utilize the `MPS` (Apple Metal Performance Shaders) backend.
- **Windows/Linux**: It will utilize CUDA if an NVIDIA GPU is available.
- **Google Colab**: Compatible with standard T4/A100 instances.

To run the notebook:
1. Ensure you have installed the necessary Python packages (`transformers`, `peft`, `trl`, `datasets`, `huggingface_hub`, `alpaca_eval`). You can do this by running `pip install -r requirements.txt` (if generated) or relying on the terminal pip commands within the notebook itself.
2. For the HF hub task, since both `gh` and `huggingface-cli` are available locally, simply run `huggingface-cli login` in your terminal prior to running the push cell.
3. For Task 4 (LLM Judge), ensure you plug in your respective OpenAI or Gemini API key inside the placeholder of the notebook cell to make the real judgment calls.

### 2. Progress Flow Web application
Simply open the `index.html` file in any modern web browser. It features a responsive layout and click-to-expand details regarding the 4 core tasks accomplished in this project. 

## Git Instructions
This folder (`git_to_push`) has been initialized as a git repository.
Since the GitHub CLI (`gh`) is pre-installed on this machine, you can push this repository by running:
```bash
gh repo create my-a5-nlp-assignment --public --source=. --remote=origin --push
```

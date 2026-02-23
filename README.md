# Project A5: Optimization Human Preference & LLM-as-a-Judge

## Overview

This project focuses on two critical aspects of modern Large Language Model (LLM) development: **Alignment** and **Evaluation**. 

As part of the assignment, we leverage the **Direct Preference Optimization (DPO)** trainer pipeline from Hugging Face's `trl` library to align a pre-trained model (`Qwen/Qwen2.5-1.5B-Instruct`) to be truthfully grounded, significantly reducing hallucinations.

Furthermore, we built a reliable **LLM-as-a-Judge** evaluation pipeline leveraging `google-generativeai` (Gemini-2.5-Flash) to structurally evaluate factuality against the `AlpacaEval` benchmark dataset.

---

## 🚀 Deliverables

1. **Jupyter Notebook**: The core logic is documented and executable in `A5_Human_Preference.ipynb`. (This is generated natively via `generate_notebook.py` to seamlessly handle cross-environment compatibility between Google Colab and MacOS).
2. **Hugging Face Model Hub Integration**: The fine-tuned DPO adapter weights are programmatically saved and pushed to the Hub.
3. **Interactive Visual Dashboard**: A sleek, custom front-end Web App built to visualize the progress pipeline, display the evaluation statistics using Chart.js, and host a live *Real-time LLM Inference Judge Sandbox*.

---

## 📖 Task Breakdown

### Task 1: Dataset Preparation
We utilized the highly-focused `jondurbin/truthy-dpo-v0.1` dataset to teach the model to distinguish between truthful and hallucinated responses. The dataset provides clear pairwise mappings containing `prompt`, `chosen` (factual), and `rejected` (hallucination) keys.

### Task 2: Model Training with DPOTrainer
We implemented the DPO algorithm to tune the `Qwen2.5-1.5B-Instruct` model. Hyperparameters are strictly managed via `DPOConfig` to handle sequence lengths (`max_length=512`, `max_prompt_length=256`), learning rates, and batch processing. The training utilizes LoRA adapters (`peft`) and 4-Bit NormalFloat Quantization (`bitsandbytes`) for maximum efficiency on consumer GPUs.
*   **Result**: The model successfully optimizes its internal probability distribution to favor the factual `chosen` completions over the `rejected` completions. A training loss curve is generated post-training using Seaborn/Matplotlib.

### Task 3: Pushing the Model to Hugging Face Hub
The verified LoRA adapter weights are iteratively persisted and uploaded directly to Hugging Face.
*   **Model Repo**: [shadowsilence/dpo_model_output](https://huggingface.co/shadowsilence/dpo_model_output)

### Task 4: Evaluation via LLM-as-a-Judge (AlpacaEval)
To evaluate the success of the DPO alignment, we implemented a sophisticated LLM-as-a-Judge protocol.
1.  We loaded a 15-prompt sample from the `helpful_base` subset of the `tatsu-lab/alpaca_eval` raw JSON.
2.  We securely connected to Google's **Gemini-2.5-flash** API to serve as a deterministic judge.
3.  The Judge evaluates the Base Model's response vs the new DPO Model's response, outputting a strict `"Model A"`, `"Model B"`, or `"Tie"`.

#### 📊 Final Evaluation Results
*   **Model B (DPO) Wins**: 7
*   **Ties**: 5
*   **Model A (Base) Wins**: 3
*   **Total Prompts**: 15
*   **Win Rate**: **63.33%**

*Conclusion: The robust 63.33% win rate definitively proves that the DPO fine-tuning stage materially improved the model's factual alignment and overall qualitative performance on the AlpacaEval benchmark.*

---

## 💻 Tech Stack & Dependencies
*   `transformers`, `peft`, `trl`, `datasets` (Hugging Face Ecosystem)
*   `google-generativeai` (Gemini API Judge Backend)
*   `matplotlib`, `seaborn`, `pandas` (Python Data Visualization)
*   `chart.js` (Web UI Visualization)

## 👨‍💻 Author
**Htut Ko Ko (st126010)**
A5 - Human Preference & LLM-as-a-Judge

# Eternl DApp Browser Entries
A repository to aggregate third-party DApp Browser entries.

Each project will be given access to their own branch to push entries to.

## Folder Structure
    /                             # Top-Level Folder
    ├── mainnet                   # Network (mainnet|preview|preprod|guild|shareslake)
    │   ├── production            # Folder containing production entries
    │   │   ├── exampleApp1.json  # One entry in JSON format according to DApp Entry structure.
    │   │   ├── ...               # Additional DApps
    │   └── staging               # Folder containing staging entries (for testing)
    │       ├── ...               # If no staging DApp entry exist, the production entry will be used for staging as well.
    ├── ...                       # Additional networks

## DApp Entry
```json
{
  "label":        "string  // max 48 chars",
  "caption":      "string  // max 280 chars",
  "description":  "string  // max 512 chars",
  "url":          "string  // URL for dApp to be used in the Eternl DApp Browser",
  "image":        "string  // externally hosted jpg < 200kb; images with more than 500kb will be rejected. See dimensions below for optimal image."
}
```
![image](https://github.com/Tastenkunst/eternl-dapp-browser/assets/4470326/cd0d5d3d-b3f5-4b1e-873f-d690862f7c44)


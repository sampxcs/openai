# Node.js & OpenAI AI Terminal Project
**This readme.md was written by the artificial intelligence of OpenAI.**
This is a terminal project made in Node.js integrated with the Artificial Intelligence tools of the OpenAI API.

<img src="/media/chat.gif" width="49%"></img>
<img src="/media/moderation.gif" width="49%"></img>

This project is a demonstration of how to use the OpenAI APIs and their set of Artificial Intelligence tools. The project implements the `createCompletion`, `createImage`, `createChatCompletions`, `createEdit`, `createModeration`, `createTranscription` and `createTranslation` APIs.

## Getting Started

**Requirements**
* Have an account and API token in the [OpenAI Portal](https://beta.openai.com).

### Installing

1. Clone the repository from the [GitHub page](https://github.com/sampxcs/openai).
```bash 
git clone git@github.com:sampxcs/openai.git
```
2. Navigate to the project folder and install the dependencies by running `npm install` on your terminal.
```bash
npm install
```
3. Run the program with `npm start`
```bash
npm start
```

## Usage
* To use the app you need to have an account and API token in the [OpenAI Portal](https://beta.openai.com).
* The credentials of your OpenAI account will have to be set in `.env`
```env
OPENAI_API_KEY = '<your_api_key>'
```
* Listing the files are only possible to files stored in your OpenAI account.
* You can upload files to the OpenAI account, if necessary.
* The created contents will be uploaded to your OpenAI account and stored for retrieval.


Build PR agent without paid API
>Create Reactjs project name: react-ag-grid-app
>Create main and child branch name : march-23
>Create other project react-ag-grid-app
>Run 2 different terminal
>node server.js
>ollama run llama3

Great — this is exactly the kind of **real project** that will boost your career 🔥
I’ll show you a **simple, practical way to build a PR Review Agent WITHOUT paid APIs**.

---

# 🧠 Big Idea (Simple Architecture)

👉 You don’t need OpenAI paid API
👉 Use **FREE local models + simple Node.js backend**

```
GitHub PR → Fetch Code → Send to Local AI → Get Review → Show Output
```
<img width="1710" height="1112" alt="Screenshot 2026-03-23 at 9 47 08 PM" src="https://github.com/user-attachments/assets/986f3dbc-a908-41bd-b902-6631893168ba" />
<img width="1710" height="1112" alt="Screenshot 2026-03-23 at 9 48 13 PM" src="https://github.com/user-attachments/assets/ebc40b85-9a35-4e1a-ade0-20677cac05f1" />
<img width="1206" height="430" alt="Screenshot 2026-03-23 at 9 49 48 PM" src="https://github.com/user-attachments/assets/3928b39f-86b3-4d03-a4d1-27ef86cc24c1" />


---

# 🧰 Tools (All FREE ✅)

* Ollama → run AI locally
* Node.js → backend
* Express.js → API server
* GitHub API → fetch PR code

---

# 🚀 Step 1: Install Ollama (Local AI)

👉 Download & install:
[https://ollama.com](https://ollama.com)

Then run:

```bash
ollama run llama3
```

👉 This downloads a FREE model (no cost, no API key)

---

# 🚀 Step 2: Create Project

```bash
mkdir pr-review-agent
cd pr-review-agent
npm init -y
npm install express axios
```

---

# 🚀 Step 3: Basic Server

```js
// server.js
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/review", async (req, res) => {
  const { code } = req.body;

  const prompt = `
You are a senior frontend developer.

Review the following code and give:
- Issues
- Improvements
- Fixes

Code:
${code}
`;

  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "llama3",
      prompt: prompt,
      stream: false
    });

    res.json({ review: response.data.response });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error reviewing code");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

---

# 🚀 Step 4: Test Your Agent

Run:

```bash
node server.js
```

Then test using Postman / curl:

```bash
curl -X POST http://localhost:3000/review \
-H "Content-Type: application/json" \
-d '{"code":"const a = 1;"}'
```

👉 You’ll get AI review 🎉

---

# 🚀 Step 5: Connect with GitHub PR (REAL MAGIC 🔥)

Use GitHub API:

```js
const prFiles = await axios.get(
  "https://api.github.com/repos/{owner}/{repo}/pulls/{pr_number}/files",
  {
    headers: {
      Authorization: `Bearer YOUR_GITHUB_TOKEN`
    }
  }
);

const code = prFiles.data.map(file => file.patch).join("\n");
```

👉 Send this `code` to your AI

---

# 🚀 Step 6: (Optional but Powerful)

### Add features:

✅ Comment on PR automatically
✅ Only review changed lines
✅ Add scoring (quality / performance)
✅ Filter large files

---

# ⚡ Bonus: Better Prompt (Use this)

Replace your prompt with:

```text
You are a strict senior frontend engineer.

Review this code for:
- Bugs
- Performance issues
- React best practices
- Readability

Give output in:
1. Issues
2. Fixes with code
3. Final verdict

Code:
${code}
```

---

# 🧑‍💻 What You Just Built

👉 Your own **AI PR Review Agent (FREE version)**

This is:

* Resume-worthy project 💼
* Interview killer 💥
* Useful in real job 🚀

---

# 🔥 Next Level (Highly Recommended)

If you want, I can guide you to:

### 👉 Add UI (React dashboard)

### 👉 Auto-review on PR creation (GitHub webhook)

### 👉 Deploy locally for team usage

### 👉 Convert into Chrome Extension

---

Just tell me:

👉 **"Make UI for this agent"**
or
👉 **"Automate PR review fully"**

I’ll take you step-by-step 🚀

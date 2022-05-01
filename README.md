# Why such limited code example
I decided to look for jobs recently, dropping my goal of entrepreneurship for now. It's not that often that you see a cool startup like Gyfted hiring in Poland, and that's why I decided too apply, even though I don't have a portfolio ready.

I am realistically programming my whole life, starting in the primary school, where I was a laurate at country wide programming competition in Logo. But I was switching languages quite a bit, lately focusing on javascript with typescript.

I am happy to take programming assignment to show my capabilities.

# Why I decided on javascript
You can utilize javascript both on frontend and backend. It's ideal for someone working on one person projects, like my business ideas. Node has one of the biggest ecosystems, even though it comes with big security risks and lately I stopped using that many third parties libraries, scared of supply-chain attacks.

# Why only e2e tests
This is how you would check if your program works without any tests. You would run a backend / frontend and perform some action in the browser. It is also what ultimately users want. The whole system to work correctly. I am not against unit tests, but I find the confidence e2e tests give, that your web app is working, unparalled.

# How to run
In one window:
`cd backend-nabu/`
`npx ts-node index.ts`
the server will start at port 3001

In second window:
`cd frontend-nabu/`
`npm start`
Chat window should open with a very basic chat.

To run tests:
in project root
`npm install -D @playwright/test`
`npx playwright test`

# Nabu vision
Slack / slack-like team chat applications are ubiquitous in companies right now. Most people I talk to, are stressed by a constant need to monitor team chat, never knowing if notification is signaling a very important message from their boss or just another cool meme sent by a colleague. As a result our work is getting more chaotic, fragmented and we produce less valuable work. My esteemed reader have probably read Deep Work by Cal Newport. The other problem I find with team chat is ephemeral nature, where text messages are getting lost and forgotten, and you have to rely on memory about what was decided regarding specific tasks.

I envision Nabu as a team chat for teams that value getting things done / deep work. Some features I envision:
 - availibilty to set you have a deep work session / where you won't get distracted by notifications
 - every message you send, you can set a priority. If it's low signal message, we won't send anyone a notifcation. If it's something very urgent, we will send a notification even if recipients are in deep work mode
 - deep integration with task tools, availability to tag every message thread with a task being discussed, then clicking on task shows all discussion in all chats, showing everything that was decided
 - going further with tags - I envision ability nabu to work like a zettelkasten / roam system, where you can create [[links]] for other things than tasks. Like [[Places ideas for company offside]] [[Ideas how to improve onboarding]] 

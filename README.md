### **Tudoo Lisk – A Blockchain-Powered To-Do List**

**Tudoo Lisk** is a decentralized **to-do list** application built on the [Lisk blockchain](__https://lisk.com/__). It leverages **React, TypeScript, and Vite** for a fast and efficient frontend experience and integrates [Family ConnectKit](__https://docs.family.co/connectkit__) and [Reown](__https://walletconnect.com/__) for seamless wallet connectivity.

**Installation & Setup**

**1. Clone the Repository**

```sh
git clone https://github.com/i-abdulsalihu/tudoo-lisk.git
cd tudoo-lisk
```

**2. Install Dependencies**

```sh
npm install
# or
yarn install
# or
bun install
# or
pnpm install
```

**3. Set Up API Keys**

1. Go to [Reown](__https://cloud.reown.com/sign-in__), sign in or create an account.

2. Create a new project and enter the necessary details.

3. Select **“I am using another kit”** since we are using **Family ConnectKit**.

4. Click **Create** and copy the **Project ID**.

Then, navigate to the project directory and open **.env.example**. It should look like this:

```sh
VITE_REOWN_PROJECT_ID=<your_reown_project_id>
```

Replace **<your_reown_project_id>** with your actual **Project ID**.

**4. Start the Development Server**

```sh
npm run dev
# or
yarn dev
# or
bun dev
# or
pnpm run dev
```

The app should now be running at [port:5173](__http://localhost:5173__).

**🔗 Required Chains Configuration**

To specify the blockchain network, open the **config** folder in the project directory and edit **web3.config.ts**.

Since we are using **Lisk Sepolia**, import it from **viem/chains**:

```javascript
import { liskSepolia } from "viem/chains";

// ... //

export const web3Config = createConfig(
  getDefaultConfig({
    chains: [liskSepolia],
    // ... //
  })
);
```

Alternatively, use Lisk’s provided transporter:

```javascript
import { liskSepolia } from "viem/chains";

// ... //

export const web3Config = createConfig(
  getDefaultConfig({
    chains: [liskSepolia],
    transports: {
      [liskSepolia.id]: http(liskSepolia.rpcUrls.default.http[0]),
    },
    // ... //
  })
);
```

**🔧 Full web3.config.ts Example:**

```javascript
import { liskSepolia } from "viem/chains";
import { getDefaultConfig } from "connectkit";
import { createConfig, http, injected } from "wagmi";

import { siteConfig } from "./site.config";

export const projectId = import.meta.env.VITE_REOWN_PROJECT_ID;

export const web3Config = createConfig(
  getDefaultConfig({
    chains: [liskSepolia],
    connectors: [injected()],
    transports: {
      [liskSepolia.id]: http(liskSepolia.rpcUrls.default.http[0]),
    },
    walletConnectProjectId: projectId,
    appName: siteConfig.name,
    appDescription: siteConfig.description,
    appUrl: siteConfig.url,
    appIcon: siteConfig.icon,
  })
);
```

---

Please remember to rate this repository with a star. 🙂

**Happy Coding on Lisk! 🚀**

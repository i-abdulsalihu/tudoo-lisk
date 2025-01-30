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

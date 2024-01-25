export const SupportedNetworksArray = ["ethereum_mainnet", "ethereum_testnet", "bosagora_mainnet", "bosagora_testnet", "bosagora_devnet", "localhost"] as const;
export type SupportedNetworks = typeof SupportedNetworksArray[number];
export type NetworkDeployment = {
    MultiSigWalletFactoryAddress: string;
};

import { NetworkDeployment, SupportedNetworks } from "./interfaces/common";
import { activeContractsList } from "multisig-wallet-contracts-lib";

export const LIVE_CONTRACTS: { [K in SupportedNetworks]: NetworkDeployment } = {
    ethereum_mainnet: {
        MultiSigWalletFactoryAddress: activeContractsList.bosagora_mainnet.MultiSigWalletFactory,
    },
    ethereum_testnet: {
        MultiSigWalletFactoryAddress: activeContractsList.bosagora_testnet.MultiSigWalletFactory,
    },
    bosagora_mainnet: {
        MultiSigWalletFactoryAddress: activeContractsList.bosagora_mainnet.MultiSigWalletFactory,
    },
    bosagora_testnet: {
        MultiSigWalletFactoryAddress: activeContractsList.bosagora_testnet.MultiSigWalletFactory,
    },
    bosagora_devnet: {
        MultiSigWalletFactoryAddress: activeContractsList.bosagora_devnet.MultiSigWalletFactory,
    },
    localhost: {
        MultiSigWalletFactoryAddress: "",
    }
};

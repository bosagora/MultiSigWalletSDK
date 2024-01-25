import { ClientCore, Context, SupportedNetworks, SupportedNetworksArray } from "../../client-common";
import { IMultiSigWalletFactoryMethods } from "../../interface/IMultiSigWalletFactory";
import { NormalSteps, CreateMultiSigWallet } from "../../interfaces";
import { ContractUtils, GasPriceManager, NonceManager, FailedCreateWallet } from "../../utils";

import { NoProviderError, NoSignerError, UnsupportedNetworkError } from "multisig-wallet-sdk-common";
import { MultiSigWalletFactory, MultiSigWalletFactory__factory } from "multisig-wallet-contracts-lib";

import { getNetwork } from "@ethersproject/networks";
import { Provider } from "@ethersproject/providers";

export class MultiSigWalletFactoryMethods extends ClientCore implements IMultiSigWalletFactoryMethods {
    constructor(context: Context) {
        super(context);
        Object.freeze(MultiSigWalletFactoryMethods.prototype);
        Object.freeze(this);
    }

    public async *create(owners: string[], required: number): AsyncGenerator<CreateMultiSigWallet> {
        const signer = this.web3.getConnectedSigner();
        if (!signer) {
            throw new NoSignerError();
        } else if (!signer.provider) {
            throw new NoProviderError();
        }

        const network = getNetwork((await signer.provider.getNetwork()).chainId);
        const networkName = network.name as SupportedNetworks;
        if (!SupportedNetworksArray.includes(networkName)) {
            throw new UnsupportedNetworkError(networkName);
        }

        const nonceSigner = new NonceManager(new GasPriceManager(signer));
        const contract: MultiSigWalletFactory = MultiSigWalletFactory__factory.connect(
            this.web3.getWalletFactoryAddress(),
            nonceSigner
        );

        try {
            const tx = await contract.create(owners, required);
            yield {
                key: NormalSteps.SENT,
                creator: await signer.getAddress(),
                owners,
                required,
                txHash: tx.hash
            };

            const address = await ContractUtils.getEventValueString(
                tx,
                contract.interface,
                "ContractInstantiation",
                "wallet"
            );

            if (address !== undefined) {
                yield {
                    key: NormalSteps.SUCCESS,
                    address
                };
            } else {
                throw new FailedCreateWallet();
            }
        } catch (error) {
            throw new FailedCreateWallet();
        }
    }

    public async getNumberOfWalletsForCreator(creator: string): Promise<number> {
        const provider = this.web3.getProvider() as Provider;
        if (!provider) throw new NoProviderError();

        const network = getNetwork((await provider.getNetwork()).chainId);
        const networkName = network.name as SupportedNetworks;
        if (!SupportedNetworksArray.includes(networkName)) {
            throw new UnsupportedNetworkError(networkName);
        }

        const contract: MultiSigWalletFactory = MultiSigWalletFactory__factory.connect(
            this.web3.getWalletFactoryAddress(),
            provider
        );
        return (await contract.getNumberOfWalletsForCreator(creator)).toNumber();
    }
    public async getWalletsForCreator(creator: string, from: number, to: number): Promise<string[]> {
        const provider = this.web3.getProvider() as Provider;
        if (!provider) throw new NoProviderError();

        const network = getNetwork((await provider.getNetwork()).chainId);
        const networkName = network.name as SupportedNetworks;
        if (!SupportedNetworksArray.includes(networkName)) {
            throw new UnsupportedNetworkError(networkName);
        }

        const contract: MultiSigWalletFactory = MultiSigWalletFactory__factory.connect(
            this.web3.getWalletFactoryAddress(),
            provider
        );
        return await contract.getWalletsForCreator(creator, from, to);
    }

    public async getNumberOfWalletsForOwner(owner: string): Promise<number> {
        const provider = this.web3.getProvider() as Provider;
        if (!provider) throw new NoProviderError();

        const network = getNetwork((await provider.getNetwork()).chainId);
        const networkName = network.name as SupportedNetworks;
        if (!SupportedNetworksArray.includes(networkName)) {
            throw new UnsupportedNetworkError(networkName);
        }

        const contract: MultiSigWalletFactory = MultiSigWalletFactory__factory.connect(
            this.web3.getWalletFactoryAddress(),
            provider
        );
        return (await contract.getNumberOfWalletsForOwner(owner)).toNumber();
    }

    public async getWalletsForOwner(owner: string, from: number, to: number): Promise<string[]> {
        const provider = this.web3.getProvider() as Provider;
        if (!provider) throw new NoProviderError();

        const network = getNetwork((await provider.getNetwork()).chainId);
        const networkName = network.name as SupportedNetworks;
        if (!SupportedNetworksArray.includes(networkName)) {
            throw new UnsupportedNetworkError(networkName);
        }

        const contract: MultiSigWalletFactory = MultiSigWalletFactory__factory.connect(
            this.web3.getWalletFactoryAddress(),
            provider
        );
        return await contract.getWalletsForOwner(owner, from, to);
    }
}

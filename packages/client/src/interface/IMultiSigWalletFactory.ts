import { IClientCore } from "../client-common";
import { CreateMultiSigWallet } from "../interfaces";

export interface IMultiSigWalletFactory {
    multiSigWalletFactory: IMultiSigWalletFactoryMethods;
}

/** Defines the shape of the general purpose Client class */
export interface IMultiSigWalletFactoryMethods extends IClientCore {
    create: (owners: string[], required: number) => AsyncGenerator<CreateMultiSigWallet>;
    getNumberOfWalletsForCreator: (creator: string) => Promise<number>;
    getWalletsForCreator: (creator: string, from: number, to: number) => Promise<string[]>;

    getNumberOfWalletsForOwner: (owner: string) => Promise<number>;
    getWalletsForOwner: (owner: string, from: number, to: number) => Promise<string[]>;
}

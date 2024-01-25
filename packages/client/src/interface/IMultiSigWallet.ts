import { IClientCore } from "../client-common";
import { BigNumber } from "@ethersproject/bignumber";
import { SubmitTransaction, ConfirmTransaction, RevokeTransaction, ContractTransactionData } from "../interfaces";
import { BigNumberish } from "ethers";

export interface IMultiSigWallet {
    multiSigWallet: IMultiSigWalletMethods;
}

/** Defines the shape of the general purpose Client class */
export interface IMultiSigWalletMethods extends IClientCore {
    attach: (walletAddress: string) => void;
    getOwners: () => Promise<string[]>;
    getRequired: () => Promise<number>;

    isOwner: (account: string) => Promise<boolean>;

    getTransactionCount: () => Promise<number>;
    getTransaction: (transactionId: BigNumber) => Promise<ContractTransactionData>;
    getTransactionsInRange: (from: number, to: number) => Promise<ContractTransactionData[]>;

    getConfirmationCount: (transactionId: BigNumber) => Promise<number>;
    getConfirmations: (transactionId: BigNumber) => Promise<string[]>;

    submitTransaction: (destination: string, value: BigNumberish, data: string) => AsyncGenerator<SubmitTransaction>;
    confirmTransaction: (transactionId: BigNumber) => AsyncGenerator<ConfirmTransaction>;
    revokeConfirmation: (transactionId: BigNumber) => AsyncGenerator<RevokeTransaction>;

    getTransactionCountInCondition: (pending: boolean, executed: boolean) => Promise<number>;
    getTransactionIdsInCondition: (
        from: number,
        to: number,
        pending: boolean,
        executed: boolean
    ) => Promise<BigNumber[]>;

    submitTransactionAddOwner: (owner: string) => AsyncGenerator<SubmitTransaction>;
    submitTransactionRemoveOwner: (owner: string) => AsyncGenerator<SubmitTransaction>;
    submitTransactionReplaceOwner: (owner: string, newOwner: string) => AsyncGenerator<SubmitTransaction>;

    submitTransactionNativeTransfer: (to: string, amount: BigNumber) => AsyncGenerator<SubmitTransaction>;
    submitTransactionTokenTransfer: (
        destination: string,
        to: string,
        amount: BigNumber
    ) => AsyncGenerator<SubmitTransaction>;
    submitTransactionTokenApprove: (
        destination: string,
        spender: string,
        amount: BigNumber
    ) => AsyncGenerator<SubmitTransaction>;
}

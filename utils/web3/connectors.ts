import { AbstractConnector } from "@web3-react/abstract-connector";
import { FC } from "react";
import { SvgProps } from "../../components/svg/svg";

export type ConnectorType =  AbstractConnector | (() => AbstractConnector) | (() => Promise<AbstractConnector>);

export type Login = (connectorId: ConnectorNames) => void;

export enum ConnectorNames {
    Injected = "injected",
    WalletConnect = "walletconnect",
    BSC = "bsc",
    Blocto = "blocto",
    WalletLink = "walletlink",
    UAuthUnstoppable = "uauthunstoppable",
}

export interface ConnectorConfig {
    title: string;
    icon: FC<SvgProps>;
    connectorId: ConnectorNames;
    priority: number;
    mobileOnly?: boolean;
    href?: string;
}
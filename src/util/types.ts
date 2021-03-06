import { MarketBuySwapQuote, MarketSellSwapQuote } from '@0x/asset-swapper';
import { SignedOrder } from '@0x/connect';
import { OrderStatus } from '@0x/types';
import { BigNumber } from '@0x/utils';
import { RouterState } from 'connected-react-router';
import { Styles } from 'react-modal';
import { ActionCreator, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { TokenMetaData } from '../common/tokens_meta_data';
import { TokenIEOMetaData } from '../common/tokens_meta_data_ieo';
import { ExtraArgument } from '../store/index';
import { Theme, ThemeProperties } from '../themes/commons';

import { AaveState, ATokenData } from './aave/types';

export interface TabItem {
    active: boolean;
    onClick: any;
    text: string;
}

export type Maybe<T> = T | undefined;

export enum Network {
    Mainnet = 1,
    Ropsten = 3,
    Rinkeby = 4,
    Kovan = 42,
    Ganache = 50,
}

export interface Token {
    address: string;
    decimals: number;
    name: string;
    symbol: string;
    primaryColor: string;
    id?: string;
    c_id?: string; // coingecko id
    icon?: string;
    displayDecimals: number;
    minAmount?: number;
    maxAmount?: number;
    precision?: number;
    website?: string;
    description?: string;
    verisafe_sticker?: string;
    price_usd?: BigNumber | null;
    price_usd_24h_change?: BigNumber | null;
    listed: boolean;
    isStableCoin: boolean;
}

export interface TokenIEO {
    address: string;
    decimals: number;
    name: string;
    symbol: string;
    primaryColor: string;
    id?: string;
    c_id?: string; // coingecko id
    icon?: string;
    displayDecimals: number;
    minAmount?: number;
    maxAmount?: number;
    precision?: number;
    website?: string;
    description?: string;
    verisafe_sticker?: string;
    price_usd?: BigNumber | null;
    price_usd_24h_change?: BigNumber | null;
    owners: string[];
    social: {
        facebook_url?: string;
        reddit_url?: string;
        twitter_url?: string;
        telegram_url?: string;
        discord_url?: string;
        bitcointalk_url?: string;
        youtube_url?: string;
        medium_url?: string;
    };
    feePercentage?: string;
    endDate?: string | number;
    listed: boolean;
    isStableCoin: boolean;
}

export interface TokenPrice {
    c_id: string; // coingecko id
    price_usd: BigNumber;
    price_usd_24h_change: BigNumber;
}

export interface TokenBalance {
    balance: BigNumber;
    isUnlocked: boolean;
    token: Token;
}

export interface OrderFeeData {
    makerFee: BigNumber;
    takerFee: BigNumber;
    makerFeeAssetData: string;
    takerFeeAssetData: string;
}
export interface TokenBalanceIEO {
    balance: BigNumber;
    isUnlocked: boolean;
    token: TokenIEO;
}

export interface SearchTokenBalanceObject {
    tokenBalances: TokenBalance[];
    tokenToFind: Token | null;
    wethTokenBalance: TokenBalance | null;
}

export enum Web3State {
    Done = 'Done',
    Error = 'Error',
    Loading = 'Loading',
    NotInstalled = 'NotInstalled',
    Connect = 'Connect',
    Connecting = 'Connecting',
    Locked = 'Locked',
}

export enum ServerState {
    Done = 'Done',
    Error = 'Error',
    Loading = 'Loading',
    NotLoaded = 'NotLoaded',
}

export enum SwapQuoteState {
    Done = 'Done',
    Error = 'Error',
    Loading = 'Loading',
    NotLoaded = 'NotLoaded',
}

export enum BZXLoadingState {
    Done = 'Done',
    Error = 'Error',
    Loading = 'Loading',
}

export interface BlockchainState {
    readonly ethAccount: string;
    readonly wallet: Wallet | null;
    readonly web3State: Web3State;
    readonly tokenBalances: TokenBalance[];
    readonly ethBalance: BigNumber;
    readonly wethTokenBalance: TokenBalance | null;
    readonly gasInfo: GasInfo;
    readonly convertBalanceState: ConvertBalanceState;
    readonly tokenBaseIEO: TokenIEO | null;
    readonly tokenBaseBalanceIEO: TokenBalanceIEO | null;
    readonly tokenBalancesIEO: TokenBalanceIEO[];
}

export interface BZXState {
    readonly iTokensData: iTokenData[];
    readonly TokensList: TokenMetadataBZX[];
    readonly bzxLoadingState: BZXLoadingState;
}

export interface RelayerState {
    readonly orders: UIOrder[];
    readonly userOrders: UIOrder[];
    readonly orderBookState: ServerState;
    readonly marketsStatsState: ServerState;
    readonly marketFillsState: ServerState;
    readonly minOrderExpireTimeOnBooks?: number;
    readonly userIEOOrders?: UIOrder[];
    readonly ieoOrders?: SignedOrder[];
    readonly accountMarketStats?: AccountMarketStat[];
    readonly feeRecipient?: string;
    readonly feePercentage?: number;
    readonly orderExpireTime?: number;
}

export interface SwapState {
    readonly baseToken: Token;
    readonly quoteToken: Token;
    readonly quote?: MarketBuySwapQuote | MarketSellSwapQuote;
    readonly isBuy?: boolean;
    readonly quoteState: SwapQuoteState;
}

export interface UIState {
    readonly notifications: Notification[];
    readonly fills: Fill[];
    readonly marketFills: MarketFill;
    readonly userMarketFills: MarketFill;
    readonly userFills: Fill[];
    readonly hasUnreadNotifications: boolean;
    readonly stepsModal: StepsModalState;
    readonly startTour: boolean;
    readonly orderPriceSelected: BigNumber | null;
    readonly orderBuyPriceSelected: BigNumber | null;
    readonly orderSellPriceSelected: BigNumber | null;
    readonly makerAmountSelected: BigNumber | null;
    readonly sidebarOpen: boolean;
    readonly isAffiliate: boolean;
    readonly openFiatOnRampModal: boolean;
    readonly openFiatOnRampChooseModal: boolean;
    readonly fiatType: 'APPLE_PAY' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'CARDS';
    readonly erc20Theme: Theme;
    readonly erc20Layout: string;
    readonly isDynamicLayout: boolean;
    readonly themeName: string;
    readonly generalConfig?: GeneralConfig;
    readonly userConfigData: UserConfigData | null;
    readonly configData?: ConfigData | null;
    readonly orderSecondsExpirationTime?: BigNumber | null;
}

export interface MarketState {
    readonly currencyPair: CurrencyPair;
    readonly baseToken: Token | null;
    readonly quoteToken: Token | null;
    readonly ethInUsd: BigNumber | null;
    readonly quoteInUsd?: BigNumber | null;
    readonly markets: Market[] | null;
    readonly tokensPrice: TokenPrice[] | null;
    readonly marketStats: RelayerMarketStats | null;
    readonly makerAddresses: string[] | null;
    readonly marketsStats?: RelayerMarketStats[] | null;
    readonly marketMakerStats: MarketMakerStats[];
}

export interface StoreState {
    readonly router: RouterState;
    readonly blockchain: BlockchainState;
    readonly relayer: RelayerState;
    readonly ui: UIState;
    readonly market: MarketState;
    readonly collectibles: CollectiblesState;
    readonly bzx: BZXState;
    readonly swap: SwapState;
    readonly aave: AaveState;
}

export enum StepKind {
    WrapEth = 'WrapEth',
    ToggleTokenLock = 'ToggleTokenLock',
    TransferToken = 'TransferToken',
    LendingToken = 'LendingToken',
    BorrowToken = 'BorrowToken',
    RepayToken = 'RepayToken',
    UnLendingToken = 'UnLendingToken',
    BuySellLimit = 'BuySellLimit',
    BuySellLimitMatching = 'BuySellLimitMatching',
    BuySellMarket = 'BuySellMarket',
    UnlockCollectibles = 'UnlockCollectibles',
    SellCollectible = 'SellCollectible',
    BuyCollectible = 'BuyCollectible',
    SubmitConfig = 'SubmitConfig',
}

export interface StepWrapEth {
    kind: StepKind.WrapEth;
    currentWethBalance: BigNumber;
    newWethBalance: BigNumber;
    context: 'order' | 'standalone' | 'lending';
}

export interface StepToggleTokenLock {
    kind: StepKind.ToggleTokenLock;
    token: Token;
    isUnlocked: boolean;
    context: 'order' | 'standalone' | 'lending';
    address?: string;
}

export interface StepUnlockCollectibles {
    kind: StepKind.UnlockCollectibles;
    collectible: Collectible;
    isUnlocked: boolean;
}

export interface StepBuySellLimitOrder {
    kind: StepKind.BuySellLimit;
    amount: BigNumber;
    price: BigNumber;
    side: OrderSide;
    token: Token;
    is_ieo?: boolean;
}

export interface StepTransferToken {
    kind: StepKind.TransferToken;
    amount: BigNumber;
    address: string;
    token: Token;
    isEth: boolean;
}

export interface StepLendingToken {
    kind: StepKind.LendingToken;
    amount: BigNumber;
    token: Token;
    defiToken: iTokenData | ATokenData;
    isEth: boolean;
    isLending: boolean;
}

export interface StepBorrowToken {
    kind: StepKind.BorrowToken;
    amount: BigNumber;
    token: Token;
    defiToken: iTokenData | ATokenData;
    isEth: boolean;
    isBorrow: boolean;
}

export interface StepRepayToken {
    kind: StepKind.RepayToken;
    amount: BigNumber;
    token: Token;
    defiToken: iTokenData | ATokenData;
    isEth: boolean;
    isBorrow: boolean;
}

export interface StepUnLendingToken {
    kind: StepKind.UnLendingToken;
    amount: BigNumber;
    token: Token;
    defiToken: iTokenData | ATokenData;
    isEth: boolean;
    isLending: boolean;
}

export interface StepBuySellMarket {
    kind: StepKind.BuySellMarket;
    amount: BigNumber;
    side: OrderSide;
    token: Token;
    context: 'order' | 'swap';
    quote?: MarketBuySwapQuote | MarketSellSwapQuote;
}

export interface StepBuySellLimitMatching {
    kind: StepKind.BuySellLimitMatching;
    amount: BigNumber;
    price: BigNumber;
    price_avg: BigNumber;
    side: OrderSide;
    token: Token;
}

export interface StepSellCollectible {
    kind: StepKind.SellCollectible;
    collectible: Collectible;
    startPrice: BigNumber;
    endPrice: BigNumber | null;
    expirationDate: BigNumber;
    side: OrderSide;
}

export interface StepBuyCollectible {
    kind: StepKind.BuyCollectible;
    order: SignedOrder;
    collectible: Collectible;
}

export interface StepSubmitConfig {
    kind: StepKind.SubmitConfig;
    config: ConfigFile;
}

export type Step =
    | StepWrapEth
    | StepToggleTokenLock
    | StepBuySellLimitOrder
    | StepBuySellMarket
    | StepSellCollectible
    | StepBuyCollectible
    | StepUnlockCollectibles
    | StepBuySellLimitMatching
    | StepTransferToken
    | StepLendingToken
    | StepUnLendingToken
    | StepSubmitConfig
    | StepRepayToken
    | StepBorrowToken;

export interface StepsModalState {
    readonly doneSteps: Step[];
    readonly currentStep: Step | null;
    readonly pendingSteps: Step[];
}

export enum OrderSide {
    Sell,
    Buy,
}

export interface UIOrder {
    rawOrder: SignedOrder;
    side: OrderSide;
    size: BigNumber;
    filled: BigNumber | null;
    price: BigNumber;
    status: OrderStatus | null;
}

export interface OrderBookItem {
    side: OrderSide;
    size: BigNumber;
    price: BigNumber;
}

export interface Spread {
    absolute: BigNumber;
    percentage: BigNumber;
}

export interface OrderBook {
    buyOrders: OrderBookItem[];
    sellOrders: OrderBookItem[];
    mySizeOrders: OrderBookItem[];
}

export interface CurrencyPair {
    base: string;
    quote: string;
    config: {
        basePrecision: number;
        pricePrecision: number;
        minAmount: number;
        maxAmount: number;
        quotePrecision: number;
    };
}
export interface CurrencyPairMetaData {
    base: string;
    quote: string;
    config?: {
        basePrecision?: number;
        pricePrecision?: number;
        minAmount?: number;
        maxAmount?: number;
        quotePrecision?: number;
    };
}

export interface Market {
    currencyPair: CurrencyPair;
    price: BigNumber | null;
    spreadInPercentage: BigNumber | null;
    bestAsk: BigNumber | null;
    bestBid: BigNumber | null;
}

export enum NotificationKind {
    CancelOrder = 'CancelOrder',
    Market = 'Market',
    Limit = 'Limit',
    OrderFilled = 'OrderFilled',
    TokenTransferred = 'TokenTransferred',
    LendingComplete = 'LendingComplete',
    UnLendingComplete = 'UnLendingComplete',
    BorrowComplete = 'BorrowComplete',
    RepayComplete = 'RepayComplete',
}

export interface Fill {
    id: string;
    amountQuote: BigNumber;
    amountBase: BigNumber;
    tokenQuote: Token;
    tokenBase: Token;
    side: OrderSide;
    price: string;
    timestamp: Date;
    makerAddress: string;
    takerAddress: string;
    market: string;
}

export interface UserMarketMakerStats {
    [market: string]: MarketMakerStats;
}

export interface MarketMakerStats {
    market: string;
    account: string;
    protocolFeesCollected: BigNumber;
    totalWethFeesCollected: BigNumber;
    totalOrders: BigNumber;
    totalBuyOrders: BigNumber;
    totalSellOrders: BigNumber;
    medianBuyPrice: BigNumber;
    medianSellPrice: BigNumber;
    totalBuyQuoteVolume: BigNumber;
    totalBuyBaseVolume: BigNumber;
    totalSellQuoteVolume: BigNumber;
    totalSellBaseVolume: BigNumber;
    totalQuoteVolume: BigNumber;
    totalBaseVolume: BigNumber;
    startingStats: Date;
    endStats: Date;
}

export interface RelayerFill {
    id: string;
    tradeId: number;
    order_hash: string;
    senderAddress: string;
    makerAddress: string;
    takerAddress: string;
    tokenBaseAddress: string;
    tokenQuoteAddress: string;
    exchangeAddress: string;
    feeRecipientAddress: string;
    makerFee: string;
    takerFee: string;
    makerFeeAddress: string;
    takerFeeAddress: string;
    protocolFeePaid: string;
    filledTokenBaseAmount: string;
    filledTokenQuoteAmount: string;
    price: string;
    signature: string;
    from: string;
    created_at: number;
    side: 'BUY' | 'SELL';
    pair: string;
    blockNumber: number;
}

export interface PaginatedRelayerCollection<T> {
    total: number;
    page: number;
    perPage: number;
    records: T;
}

export interface RelayerMarketStats {
    base: string;
    quote: string;
    pair: string;
    volume_24: number;
    total_orders: number;
    price_max_24: number;
    open_price: number;
    close_price: number;
    price_min_24: number;
    last_price: number;
    last_price_change: number;
    last_price_change_24: number;
    last_price_usd: string;
    utc_date: string;
    utc_timestamp: number;
    updated_at: number;
    quote_volume_24: number;
    resolution: 'D';
}

export interface MarketFill {
    [market: string]: Fill[];
}

export interface OrderFilledMessage {
    action: 'FILL';
    event: {
        id: string;
        baseTokenAddress: string;
        quoteTokenAddress: string;
        transactionHash: string;
        type: 'SELL' | 'BUY';
        blockNumber: number;
        makerAddress: string;
        takerAddress: string;
        feeRecipientAddress: string;
        makerFeePaid: string;
        takerFeePaid: string;
        takerFeeAddress: string;
        makerFeeAddress: string;
        protocolFeePaid: string;
        filledBaseTokenAmount: string;
        filledQuoteTokenAmount: string;
        orderHash: string;
        timestamp: number;
        outlier: boolean;
        price: string;
        pair: string;
    };
    requestId: string;
}

export interface MarketData {
    bestAsk: null | BigNumber;
    bestBid: null | BigNumber;
    spreadInPercentage: null | BigNumber;
}

interface BaseNotification {
    id: string;
    kind: NotificationKind;
    timestamp: Date;
}

interface TransactionNotification extends BaseNotification {
    tx: Promise<any>;
}

interface CancelOrderNotification extends TransactionNotification {
    kind: NotificationKind.CancelOrder;
    amount: BigNumber;
    token: Token;
}

interface MarketNotification extends TransactionNotification {
    kind: NotificationKind.Market;
    amount: BigNumber;
    token: Token;
    side: OrderSide;
}

interface TransferTokenNotification extends TransactionNotification {
    kind: NotificationKind.TokenTransferred;
    amount: BigNumber;
    token: Token;
    address: string;
}

interface LimitNotification extends BaseNotification {
    kind: NotificationKind.Limit;
    amount: BigNumber;
    token: Token;
    side: OrderSide;
}

export interface OrderFilledNotification extends BaseNotification {
    kind: NotificationKind.OrderFilled;
    amount: BigNumber;
    token: Token;
    side: OrderSide;
}

interface LendingTokenNotification extends TransactionNotification {
    kind: NotificationKind.LendingComplete;
    amount: BigNumber;
    token: Token;
}

interface UnLendingTokenNotification extends TransactionNotification {
    kind: NotificationKind.UnLendingComplete;
    amount: BigNumber;
    token: Token;
}

interface BorrowTokenNotification extends TransactionNotification {
    kind: NotificationKind.BorrowComplete;
    amount: BigNumber;
    token: Token;
}

interface RepayTokenNotification extends TransactionNotification {
    kind: NotificationKind.RepayComplete;
    amount: BigNumber;
    token: Token;
}

export type Notification =
    | CancelOrderNotification
    | MarketNotification
    | LimitNotification
    | OrderFilledNotification
    | TransferTokenNotification
    | LendingTokenNotification
    | UnLendingTokenNotification
    | RepayTokenNotification
    | BorrowTokenNotification;

export enum OrderType {
    Limit = 'Limit',
    Market = 'Market',
}

export interface GasInfo {
    gasPriceInWei: BigNumber;
    estimatedTimeMs: number;
}

export enum ModalDisplay {
    InstallMetamask = 'INSTALL_METAMASK',
    EnablePermissions = 'ACCEPT_PERMISSIONS',
    ConnectWallet = 'CONNECT_WALLET',
}

export enum MARKETPLACES {
    ERC20 = 'ERC20',
    MarketTrade = 'MarketTrade',
    ERC721 = 'ERC721',
    LaunchPad = 'LAUNCHPAD',
    Margin = 'MARGIN',
    Instant = 'INSTANT',
    FiatRamp = 'FiatRamp',
    Defi = 'Defi',
}

export enum Wallet {
    Network = 'Network',
    Metamask = 'Metamask',
    Portis = 'Portis',
    Torus = 'Torus',
    Fortmatic = 'Fortmatic',
    WalletConnect = 'WalletConnect',
    Coinbase = 'Coinbase Wallet',
    Enjin = 'Enjin Wallet',
    Cipher = 'Cipher Wallet',
    Trust = 'Trust Wallet',
}

export interface Collectible {
    tokenId: string;
    name: string;
    color: string;
    image: string;
    currentOwner: string;
    assetUrl: string;
    description: string;
    order: SignedOrder | null;
}

export enum AllCollectiblesFetchStatus {
    Request = 'Request',
    Success = 'Success',
}

export enum ConvertBalanceState {
    Failure = 'Failure',
    Request = 'Request',
    Success = 'Success',
}

export interface CollectiblesState {
    readonly allCollectibles: { [tokenId: string]: Collectible };
    readonly isCollectionLoaded: boolean;
    readonly allCollectiblesFetchStatus: AllCollectiblesFetchStatus;
    readonly collectibleSelected: Collectible | null;
    readonly collectionSelected: CollectibleCollection;
}

export interface CollectibleMetadataSource {
    fetchAllUserCollectiblesAsync(userAddress: string, collectibleAddress: string): Promise<Collectible[]>;
    fetchCollectiblesAsync(tokenIds: string[], collectibleAddress: string): Promise<Collectible[]>;
    fetchCollectionAsync(collectibleCollectionAddress: string): Promise<CollectibleCollection | null>;
}

export type ThunkCreator<R = Promise<any>> = ActionCreator<ThunkAction<R, StoreState, ExtraArgument, AnyAction>>;

export enum ButtonVariant {
    Balance = 'balance',
    Buy = 'buy',
    Error = 'error',
    Primary = 'primary',
    Quaternary = 'quaternary',
    Secondary = 'secondary',
    Sell = 'sell',
    Tertiary = 'tertiary',
    Portis = 'portis',
    Torus = 'torus',
    Fortmatic = 'fortmatic',
}

export enum ButtonIcons {
    Warning = 'warning',
}

export interface Filter {
    text: string;
    value: null | string;
}

export interface PartialTheme {
    componentsTheme?: Partial<ThemeProperties>;
    modalTheme?: Partial<Styles>;
}

export interface GeneralConfig {
    title?: string;
    icon?: string;
    domain?: string;
    feeRecipient?: string;
    feePercentage?: number;
    social?: {
        facebook_url?: string;
        reddit_url?: string;
        twitter_url?: string;
        telegram_url?: string;
        discord_url?: string;
        bitcointalk_url?: string;
        youtube_url?: string;
        medium_url?: string;
    };
}

interface WalletsConfig {
    metamask: boolean;
    fortmatic: boolean;
    portis: boolean;
    torus: boolean;
}

export interface ConfigFile {
    tokens: TokenMetaData[];
    pairs: CurrencyPairMetaData[];
    marketFilters?: Filter[];
    wallets?: WalletsConfig;
    theme_name?: string;
    layout?: string;
    theme?: PartialTheme;
    theme_light?: PartialTheme;
    theme_dark?: PartialTheme;
    general?: GeneralConfig;
}

export interface ConfigData {
    config: ConfigFile;
    owner: string;
    signature: string;
    message: string;
    slug?: string;
    createdAt?: number;
}

export interface UserConfigData {
    config: ConfigFile;
}

export interface ConfigRelayerData {
    config: string;
    owner: string;
    signature: string;
    message: string;
    slug?: string;
    createdAt?: number;
}

export interface ConfigFileIEO {
    tokens: TokenIEOMetaData[];
}

export interface ConfigFileTipBot {
    tokens: AssetBot[];
}

export interface AssetBot {
    ticker: string;
    name: string;
    contract: string;
    decimals: number;
    whitelistAddresses: string[];
    feePercentage: string;
}

export enum Browser {
    Chrome = 'CHROME',
    Firefox = 'FIREFOX',
    Opera = 'OPERA',
    Safari = 'SAFARI',
    Edge = 'EDGE',
    Other = 'OTHER',
}

export enum OperatingSystem {
    Android = 'ANDROID',
    iOS = 'IOS', // tslint:disable-line:enum-naming
    Mac = 'MAC',
    Windows = 'WINDOWS',
    WindowsPhone = 'WINDOWS_PHONE',
    Linux = 'LINUX',
    Other = 'OTHER',
}

export enum ProviderType {
    Parity = 'PARITY',
    MetaMask = 'META_MASK',
    Mist = 'MIST',
    CoinbaseWallet = 'COINBASE_WALLET',
    EnjinWallet = 'ENJIN_WALLET',
    Cipher = 'CIPHER',
    TrustWallet = 'TRUST_WALLET',
    Opera = 'OPERA',
    Fallback = 'FALLBACK',
    // tslint:disable-next-line: max-file-line-count
}

export interface AccountMarketStat {
    pair: string;
    address: string;
    totalAmountQuote: string;
    totalAmountBase: string;
    totalMakerFeePaid?: string;
    totalTakerFeePaid?: string;
    totalClosedOrders: number;
    // tslint:disable-next-line: max-file-line-count
}

enum TokenTypeBZX {
    No,
    IToken,
    PToken,
}

export interface TokenMetadataBZX {
    token: string;
    asset: string;
    name: string;
    symbol: string;
    type: TokenTypeBZX;
    index: number;
}

export interface CollectibleCollectionMetadata {
    name: string;
    addresses: { [key: string]: string };
    description: string;
    icon: string;
    symbol: string;
}

export interface CollectibleCollection {
    slug: string;
    name: string;
    address: string;
    description: string;
    icon: string;
    symbol: string;
}

// tslint:disable-next-line: class-name
export interface iTokenData {
    token: Token;
    address: string;
    name: string;
    symbol: string;
    price: BigNumber;
    checkpointPrice: BigNumber;
    avgBorrowInterestRate: BigNumber;
    marketLiquidity: BigNumber;
    balance: BigNumber;
    supplyInterestRate: BigNumber;
    isUnlocked: boolean;
    // tslint:disable-next-line: max-file-line-count
}

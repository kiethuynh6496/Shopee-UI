export interface MarketPriceSocket {
  method: 'UPDATE' | 'SUBSCRIBE' | 'UNSUBSCRIBE';
  topic: 'MARKET_PRICE';
  data: Array<Array<string>>;
}

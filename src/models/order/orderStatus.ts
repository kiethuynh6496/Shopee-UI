export interface OrderStatus {
  status:
    | 'INITIAL'
    | 'PENDING'
    | 'PAID'
    | 'CANCELED'
    | 'ERROR'
    | 'REFUNDING'
    | 'REFUNDED'
    | 'EXPIRED';
}

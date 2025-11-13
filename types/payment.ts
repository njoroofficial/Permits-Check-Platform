// Shared payment data interface used across payment components
export interface PaymentData {
  method: string;
  amount: string;
  applicationId: string;
  transactionId: string;
  status: string;
  timestamp: string;
  phoneNumber?: string;
  cardLast4?: string;
}
